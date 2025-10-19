import { NextResponse } from 'next/server'
import OpenAI from 'openai'
import { createPrompt, mapFormDataToPrompt } from '../../../../lib/promptGenerator'
import { requireContentGeneration, handleAuthError } from '../../../../lib/authMiddleware'
import { incrementArticleUsage, canUserGenerateContent } from '../../../../lib/usageTracker'

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
    
    // Crear el prompt personalizado
    const prompt = createPrompt(mappedData)
    
    console.log('Prompt generado:', prompt) // Para debugging
    
    // Llamar a OpenAI
    const response = await openai.chat.completions.create({
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

    const generatedContent = response.choices[0].message.content
    
    // Procesar la respuesta para extraer artículos
    const articles = processGeneratedContent(generatedContent, formData.resultsCount)
    
    // Incrementar contador de uso
    try {
      await incrementArticleUsage(user.email)
      
      // Obtener información actualizada de uso
      const updatedUsageInfo = await canUserGenerateContent(user.email, 'article')
      
      return NextResponse.json({
        success: true,
        articles: articles,
        usage: response.usage,
        usageInfo: updatedUsageInfo
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
    
    // Manejar errores específicos de OpenAI
    if (error.code === 'insufficient_quota') {
      return NextResponse.json(
        { error: 'Límite de API alcanzado' },
        { status: 429 }
      )
    }
    
    if (error.code === 'invalid_api_key') {
      return NextResponse.json(
        { error: 'API Key inválida' },
        { status: 401 }
      )
    }
    
    return NextResponse.json(
      { error: 'Error interno del servidor' },
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
