import { NextResponse } from 'next/server'
import OpenAI from 'openai'
import { createPrompt, mapFormDataToPrompt, createFineTunePrompt, createContextualPrompt } from '../../../../lib/promptGenerator'
import { requireContentGeneration, handleAuthError } from '../../../../lib/authMiddleware'
import { incrementArticleUsage, incrementArticleAndTokenUsage, canUserGenerateContent } from '../../../../lib/usageTracker'
import { getUserPlanFromDB } from '../../../../lib/permissions'

// Inicializar cliente de OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request) {
  try {
    // Verificar permisos y autenticación
    const authResult = await requireContentGeneration(request, 'article')
    
    if (!authResult.success) {
      return handleAuthError(authResult)
    }
    
    const user = authResult.user
    const formData = await request.json()
    
    // Validar datos requeridos
    if (!formData.topic || !formData.tone || !formData.length || !formData.objective) {
      return NextResponse.json(
        { error: 'Faltan datos requeridos' },
        { status: 400 }
      )
    }

    // Mapear datos del formulario
    const mappedData = mapFormDataToPrompt(formData)
    
    // Verificar si tenemos modelo fine-tuned configurado
    const finetunedModel = process.env.OPENAI_FINETUNED_MODEL
    let generatedContent
    
    let response
    
    if (finetunedModel) {
      // Usar modelo fine-tuned (dos pasos)
      console.log('Usando modelo fine-tuned:', finetunedModel)
      
      try {
        // Paso 1: Obtener ejemplo del tono usando fine-tune
        const toneExample = createFineTunePrompt(formData.tone)
        console.log('Prompt para fine-tune:', toneExample)
        
        const toneResponse = await openai.chat.completions.create({
          model: finetunedModel,
          messages: [
            {
              role: "user",
              content: toneExample
            }
          ],
          max_tokens: 1000,
          temperature: 0.7
        })
        
        const baseContent = toneResponse.choices[0].message.content
        console.log('Contenido base del tono:', baseContent)
        
        // Paso 2: Usar gpt-4 con el contexto específico
        const contextualPrompt = createContextualPrompt(formData, baseContent)
        console.log('Prompt contextual:', contextualPrompt)
        
        response = await openai.chat.completions.create({
          model: "gpt-4",
          messages: [
            {
              role: "user",
              content: contextualPrompt
            }
          ],
          max_tokens: 2000,
          temperature: 0.7
        })
        
        generatedContent = response.choices[0].message.content
      } catch (finetuneError) {
        console.error('Error con modelo fine-tuned, usando fallback:', finetuneError)
        // Fallback al método tradicional
        const prompt = createPrompt(mappedData)
        console.log('Prompt generado (fallback):', prompt)
        
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
      }
    } else {
      // Usar método tradicional (fallback)
      console.log('Usando modelo estándar gpt-4')
      const prompt = createPrompt(mappedData)
      console.log('Prompt generado:', prompt)
      
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
    
    // Incrementar contador de uso según el plan del usuario
    try {
      const userPlan = await getUserPlanFromDB(user.email)
      const tokensUsed = response.usage?.total_tokens || 0
      
      if (userPlan && userPlan.id === 'trial') {
        // TRIAL: Solo incrementar artículos (3 máximo)
        await incrementArticleUsage(user.email)
      } else {
        // PLANES PAGOS: Incrementar artículos y tokens
        await incrementArticleAndTokenUsage(user.email, tokensUsed)
      }
      
      // Obtener información actualizada de uso
      const updatedUsageInfo = await canUserGenerateContent(user.email, 'article')
      
      return NextResponse.json({
        success: true,
        articles: articles,
        usage: response.usage,
        usageInfo: updatedUsageInfo,
        tokensUsed: tokensUsed,
        userPlan: userPlan?.id || 'unknown'
      })
    } catch (usageError) {
      console.error('Error tracking usage:', usageError)
      // No fallar la respuesta por error de tracking
      return NextResponse.json({
        success: true,
        articles: articles,
        usage: response.usage
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
  
  if (resultsCount === 1) {
    // Un solo artículo - limpiar y formatear
    const cleanContent = cleanAndFormatContent(content)
    articles.push({
      id: 1,
      title: extractTitle(cleanContent),
      content: cleanContent,
      wordCount: countWords(cleanContent)
    })
  } else {
    // Múltiples artículos - separar por "---" o títulos
    const articleSections = content.split(/---+/).filter(section => section.trim())
    
    articleSections.forEach((section, index) => {
      if (section.trim()) {
        const cleanContent = cleanAndFormatContent(section.trim())
        articles.push({
          id: index + 1,
          title: extractTitle(cleanContent),
          content: cleanContent,
          wordCount: countWords(cleanContent)
        })
      }
    })
  }
  
  return articles
}

// Función para limpiar y formatear el contenido
function cleanAndFormatContent(content) {
  return content
    .replace(/^#+\s*Título[:\s]*/gmi, '') // Remover "Título:" o "## Título:"
    .replace(/^#+\s*Gancho inicial[:\s]*/gmi, '') // Remover "Gancho inicial:"
    .replace(/^#+\s*Cuerpo[:\s]*/gmi, '') // Remover "Cuerpo:"
    .replace(/^#+\s*Conclusión[:\s]*/gmi, '## Conclusión\n\n') // Limpiar "Conclusión:"
    .replace(/^#+\s*Hashtags[:\s]*/gmi, '') // Remover "Hashtags:"
    .replace(/\n{3,}/g, '\n\n') // Limitar saltos de línea múltiples
    .trim()
}

// Función para extraer el título del contenido
function extractTitle(content) {
  const titleMatch = content.match(/^#\s*(.+)$/m)
  return titleMatch ? titleMatch[1].trim() : 'Artículo Generado'
}

// Función para contar palabras
function countWords(text) {
  return text.split(/\s+/).filter(word => word.length > 0).length
}
