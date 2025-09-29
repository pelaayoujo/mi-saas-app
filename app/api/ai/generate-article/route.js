import { NextResponse } from 'next/server'
import OpenAI from 'openai'
import { createPrompt, mapFormDataToPrompt } from '../../../../lib/promptGenerator'

// Inicializar cliente de OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request) {
  try {
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
    
    return NextResponse.json({
      success: true,
      articles: articles,
      usage: response.usage
    })

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
    // Un solo artículo
    articles.push({
      id: 1,
      title: extractTitle(content),
      content: content,
      wordCount: countWords(content)
    })
  } else {
    // Múltiples artículos - separar por títulos
    const articleSections = content.split(/(?=##|# )/).filter(section => section.trim())
    
    articleSections.forEach((section, index) => {
      if (section.trim()) {
        articles.push({
          id: index + 1,
          title: extractTitle(section),
          content: section.trim(),
          wordCount: countWords(section)
        })
      }
    })
  }
  
  return articles
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
