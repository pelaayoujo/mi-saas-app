import { NextResponse } from 'next/server'
import OpenAI from 'openai'
import { createPrompt, mapFormDataToPrompt, createFineTunePrompt, createContextualPrompt } from '../../../../lib/promptGenerator'
import { requireContentGeneration, handleAuthError } from '../../../../lib/authMiddleware'
import { incrementArticleUsage, incrementArticleAndTokenUsage, canUserGenerateContent } from '../../../../lib/usageTracker'
import { getUserPlanFromDB } from '../../../../lib/permissions'
import { clientPromise } from '../../../../lib/mongodb'

// Inicializar cliente de OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// Validar que tenemos API key
if (!process.env.OPENAI_API_KEY) {
  console.error('❌ OPENAI_API_KEY no configurada')
}

export async function POST(request) {
  
  // Validar API key temprano
  if (!process.env.OPENAI_API_KEY) {
    console.error('❌ OPENAI_API_KEY no está configurada')
    return NextResponse.json(
      { error: 'Configuración del servidor incompleta' },
      { status: 500 }
    )
  }
  
  try {
    // Verificar permisos y autenticación
    const authResult = await requireContentGeneration(request, 'article')
    
    if (!authResult.success) {
      return handleAuthError(authResult)
    }
    
    const user = authResult.user
    const formData = await request.json()
    
    // Validar datos requeridos
    if (!formData.topic || !formData.tone || !formData.length) {
      return NextResponse.json(
        { error: 'Faltan datos requeridos' },
        { status: 400 }
      )
    }

    // Mapear datos del formulario
    let mappedData
    try {
      mappedData = mapFormDataToPrompt(formData)
    } catch (mappingError) {
      console.error('❌ Error mapeando datos:', mappingError)
      return NextResponse.json(
        { error: 'Error procesando datos del formulario' },
        { status: 400 }
      )
    }
    
    // Verificar si tenemos modelo fine-tuned configurado
    const finetunedModel = process.env.OPENAI_FINETUNED_MODEL
    let generatedContent
    let response
    let generationMethod = 'unknown'
    
    if (finetunedModel) {
      // Usar modelo fine-tuned (dos pasos)
      
      try {
        // Usar fine-tune directamente para generar el artículo completo
        const fineTunePrompt = `TONO: ${formData.tone}
TEMA: ${formData.topic}
ENFOQUE: ${formData.professionalFocus}
EXTENSIÓN: ${formData.length}
ASPECTOS: ${formData.aspects}

INSTRUCCIONES CRÍTICAS:
- Genera un artículo de LinkedIn con el tono ${formData.tone}
- Extensión ${formData.length}: ${formData.length === 'corto' ? 'hasta 200 palabras' : formData.length === 'medio' ? 'hasta 350 palabras' : 'hasta 500 palabras'}
- Enfócate en: ${formData.aspects}
- NO uses símbolos markdown (#, ##, etc.) - solo texto plano
- TÍTULO: Debe ser específico sobre "${formData.topic}" y NO sobre "${formData.professionalFocus}" - NO uses hashtags en el título
- ESTRUCTURA OBLIGATORIA:
  1. Título llamativo sobre "${formData.topic}" (NO sobre "${formData.professionalFocus}")
  2. Párrafo inicial
  3. Desarrollo del contenido
  4. Conclusión
  5. Línea en blanco
  6. Hashtags relevantes al final (mínimo 3, máximo 5)
- Los hashtags SOLO van al final, NUNCA en el título`
        
        
        response = await openai.chat.completions.create({
          model: finetunedModel,
          messages: [
            {
              role: "user",
              content: fineTunePrompt
            }
          ],
          max_tokens: 2000,
          temperature: 0.7
        })
        
        generatedContent = response.choices[0].message.content
        generationMethod = 'fine-tuned direct'
      } catch (finetuneError) {
        console.error('❌ Error con modelo fine-tuned, usando fallback:', finetuneError)
        // Fallback al método tradicional
        const prompt = createPrompt(mappedData)
        
        response = await openai.chat.completions.create({
          model: "gpt-4",
          messages: [
            {
              role: "user",
              content: prompt
            }
          ],
          max_tokens: 2000,
          temperature: 0.7
        })
        
        generatedContent = response.choices[0].message.content
        generationMethod = 'gpt-4 fallback (fine-tune error)'
      }
    } else {
      // Usar método tradicional (fallback)
      const prompt = createPrompt(mappedData)
      
      response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "user",
            content: prompt
          }
        ],
        max_tokens: 2000,
        temperature: 0.7
      })
      
      generatedContent = response.choices[0].message.content
      generationMethod = 'gpt-4 standard (no fine-tune configured)'
    }
    
    // Validar que se generó contenido
    if (!generatedContent || !response.choices || !response.choices[0] || !response.choices[0].message) {
      console.error('Error: No se generó contenido válido')
      return NextResponse.json(
        { error: 'No se pudo generar el contenido' },
        { status: 500 }
      )
    }
    
    // Procesar la respuesta para extraer artículos
    const articles = processGeneratedContent(generatedContent, formData.resultsCount || 1)
    
    // Validar que tenemos artículos antes de continuar
    if (!articles || articles.length === 0) {
      console.error('No se generaron artículos:', generatedContent)
      return NextResponse.json(
        { error: 'No se pudieron generar artículos válidos' },
        { status: 500 }
      )
    }

    // Incrementar contador de uso según el plan del usuario
    try {
      const userPlan = await getUserPlanFromDB(user.email)
      
      const tokensUsed = response.usage?.total_tokens || 0
      
      if (userPlan && userPlan.id === 'trial') {
        // TRIAL: Solo incrementar artículos (3 máximo)
        await incrementArticleUsage(user.email)
      } else if (userPlan) {
        // PLANES PAGOS: Incrementar artículos y tokens
        await incrementArticleAndTokenUsage(user.email, tokensUsed)
      }
      
      // Los artículos se guardarán cuando el usuario haga clic en "Guardar"
      // No guardamos automáticamente para evitar duplicados
      
      // Obtener información actualizada de uso (sin fallar si hay error)
      let updatedUsageInfo = null
      try {
        updatedUsageInfo = await canUserGenerateContent(user.email, 'article')
      } catch (usageInfoError) {
        console.error('Error obteniendo info de uso:', usageInfoError)
      }
      
      return NextResponse.json({
        success: true,
        articles: articles,
        usage: response.usage || {},
        usageInfo: updatedUsageInfo,
        tokensUsed: tokensUsed,
        userPlan: userPlan?.id || 'unknown',
        generationMethod: generationMethod,
        finetunedModelConfigured: !!finetunedModel,
        finetunedModelName: finetunedModel || null
      })
    } catch (usageError) {
      console.error('Error tracking usage:', usageError)
      // No fallar la respuesta por error de tracking - devolver los artículos
      return NextResponse.json({
        success: true,
        articles: articles,
        usage: response.usage || {},
        error: 'Error tracking usage but content generated',
        generationMethod: generationMethod,
        finetunedModelConfigured: !!finetunedModel,
        finetunedModelName: finetunedModel || null
      })
    }

  } catch (error) {
    console.error('Error generando artículo:', error)
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      status: error.status,
      stack: error.stack
    })
    
    // Manejar errores específicos de OpenAI
    if (error.code === 'insufficient_quota') {
      return NextResponse.json(
        { error: 'Límite de API alcanzado', details: error.message },
        { status: 429 }
      )
    }
    
    if (error.code === 'invalid_api_key') {
      return NextResponse.json(
        { error: 'API Key inválida', details: error.message },
        { status: 401 }
      )
    }
    
    if (error.code === 'model_not_found') {
      return NextResponse.json(
        { error: 'Modelo no encontrado', details: error.message },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { 
        error: 'Error interno del servidor', 
        details: error.message,
        code: error.code 
      },
      { status: 500 }
    )
  }
}

// Función para procesar el contenido generado y separar los artículos
function processGeneratedContent(content, resultsCount) {
  const articles = []
  
  // Validar que tenemos contenido
  if (!content || typeof content !== 'string' || content.trim().length === 0) {
    console.error('Contenido generado está vacío o inválido:', content)
    return []
  }
  
  try {
    if (resultsCount === 1 || !resultsCount) {
      // Un solo artículo - limpiar y formatear
      const cleanContent = cleanAndFormatContent(content)
      if (cleanContent && cleanContent.trim().length > 0) {
        articles.push({
          id: 1,
          title: extractTitle(cleanContent),
          content: cleanContent,
          wordCount: countWords(cleanContent)
        })
      }
    } else {
      // Múltiples artículos - separar por "---" o títulos
      const articleSections = content.split(/---+/).filter(section => section.trim())
      
      if (articleSections.length === 0) {
        // Si no se separó correctamente, usar todo el contenido como un artículo
        const cleanContent = cleanAndFormatContent(content)
        if (cleanContent && cleanContent.trim().length > 0) {
          articles.push({
            id: 1,
            title: extractTitle(cleanContent),
            content: cleanContent,
            wordCount: countWords(cleanContent)
          })
        }
      } else {
        articleSections.forEach((section, index) => {
          if (section.trim()) {
            const cleanContent = cleanAndFormatContent(section.trim())
            if (cleanContent && cleanContent.trim().length > 0) {
              articles.push({
                id: index + 1,
                title: extractTitle(cleanContent),
                content: cleanContent,
                wordCount: countWords(cleanContent)
              })
            }
          }
        })
      }
    }
  } catch (processingError) {
    console.error('Error procesando contenido:', processingError)
    // Intentar devolver al menos el contenido básico
    if (content && content.trim().length > 0) {
      articles.push({
        id: 1,
        title: 'Artículo Generado',
        content: content.trim(),
        wordCount: countWords(content)
      })
    }
  }
  
  return articles
}

// Función para limpiar y formatear el contenido
function cleanAndFormatContent(content) {
  if (!content || typeof content !== 'string') {
    return ''
  }
  
  try {
    return content
      .replace(/^#+\s*Título[:\s]*/gmi, '') // Remover "Título:" o "## Título:"
      .replace(/^#+\s*Gancho inicial[:\s]*/gmi, '') // Remover "Gancho inicial:"
      .replace(/^#+\s*Cuerpo[:\s]*/gmi, '') // Remover "Cuerpo:"
      .replace(/^#+\s*Conclusión[:\s]*/gmi, '## Conclusión\n\n') // Limpiar "Conclusión:"
      .replace(/^#+\s*Hashtags[:\s]*/gmi, '') // Remover "Hashtags:"
      .replace(/\n{3,}/g, '\n\n') // Limitar saltos de línea múltiples
      .trim()
  } catch (error) {
    console.error('Error limpiando contenido:', error)
    return content || ''
  }
}

// Función para extraer el título del contenido
function extractTitle(content) {
  if (!content || typeof content !== 'string') {
    return 'Artículo Generado'
  }
  
  try {
    const titleMatch = content.match(/^#\s*(.+)$/m)
    return titleMatch ? titleMatch[1].trim() : 'Artículo Generado'
  } catch (error) {
    console.error('Error extrayendo título:', error)
    return 'Artículo Generado'
  }
}

// Función para contar palabras
function countWords(text) {
  if (!text || typeof text !== 'string') {
    return 0
  }
  
  try {
    return text.split(/\s+/).filter(word => word.length > 0).length
  } catch (error) {
    console.error('Error contando palabras:', error)
    return 0
  }
}
