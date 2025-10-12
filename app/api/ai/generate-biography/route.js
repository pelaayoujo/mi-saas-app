import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request) {
  try {
    const session = await getServerSession()

    if (!session) {
      return NextResponse.json(
        { success: false, message: 'No autorizado' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const {
      fullName,
      currentRole,
      company,
      yearsExperience,
      education,
      keySkills,
      achievements,
      specialization,
      tone,
      length,
      includeCallToAction,
      callToActionType
    } = body

    // Validaciones
    if (!fullName || !currentRole || !yearsExperience) {
      return NextResponse.json(
        { success: false, message: 'Faltan campos obligatorios' },
        { status: 400 }
      )
    }

    // Crear el prompt super optimizado
    const prompt = createBiographyPrompt({
      fullName,
      currentRole,
      company,
      yearsExperience,
      education,
      keySkills,
      achievements,
      specialization,
      tone,
      length,
      includeCallToAction,
      callToActionType
    })

    console.log('Generando biografía con OpenAI...')

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'Eres un experto en LinkedIn y copywriting profesional. Tu especialidad es crear biografías optimizadas que destacan en LinkedIn, generan confianza y atraen oportunidades profesionales.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 1500,
      temperature: 0.7,
    })

    const generatedText = completion.choices[0].message.content.trim()
    
    // Intentar parsear como JSON
    let result
    try {
      const parsed = JSON.parse(generatedText)
      result = {
        biography: parsed.biography || generatedText,
        tips: parsed.tips || [],
        wordCount: parsed.biography ? parsed.biography.split(' ').length : generatedText.split(' ').length,
        charCount: parsed.biography ? parsed.biography.length : generatedText.length
      }
    } catch (e) {
      // Si no es JSON, usar el texto directamente
      result = {
        biography: generatedText,
        tips: [],
        wordCount: generatedText.split(' ').length,
        charCount: generatedText.length
      }
    }

    return NextResponse.json({
      success: true,
      biography: result.biography,
      tips: result.tips || [],
      wordCount: result.wordCount,
      charCount: result.charCount,
      usage: {
        promptTokens: completion.usage.prompt_tokens,
        completionTokens: completion.usage.completion_tokens,
        totalTokens: completion.usage.total_tokens
      }
    })

  } catch (error) {
    console.error('Error generando biografía:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Error al generar la biografía',
        error: error.message
      },
      { status: 500 }
    )
  }
}

function createBiographyPrompt(data) {
  const {
    fullName,
    currentRole,
    company,
    yearsExperience,
    education,
    keySkills,
    achievements,
    specialization,
    tone,
    length,
    includeCallToAction,
    callToActionType
  } = data

  // Mapear tono
  const toneMap = {
    professional: 'profesional y corporativo',
    friendly: 'cercano y accesible',
    inspirational: 'inspirador y motivador',
    authoritative: 'autoritativo y experto'
  }

  // Mapear longitud
  const lengthMap = {
    short: '1-2 párrafos cortos (máximo 150 palabras)',
    medium: '3-4 párrafos (entre 200-300 palabras)',
    long: '5-6 párrafos detallados (entre 350-500 palabras)'
  }

  // Mapear CTA
  const ctaMap = {
    contact: 'Invita a las personas a contactar para nuevas oportunidades',
    collaborate: 'Propone colaboraciones y proyectos conjuntos',
    consult: 'Ofrece servicios de consultoría o asesoramiento',
    network: 'Invita a ampliar la red profesional y conectar'
  }

  let prompt = `Crea una biografía profesional optimizada para LinkedIn con la siguiente información:

DATOS PERSONALES:
- Nombre: ${fullName}
- Situación actual: ${currentRole}${company ? `\n- Empresa/Institución: ${company}` : ''}
- Años de experiencia/Estudios: ${yearsExperience}${specialization ? `\n- Especialización: ${specialization}` : ''}

${education ? `FORMACIÓN:\n${education}\n` : ''}

${keySkills ? `HABILIDADES CLAVE:\n${keySkills}\n` : ''}

${achievements ? `LOGROS DESTACADOS:\n${achievements}\n` : ''}

REQUISITOS DE ESTILO:
- Tono: ${toneMap[tone] || 'profesional'}
- Longitud: ${lengthMap[length] || 'media'}
- Primera persona (uso de "yo" o implícito)
- Enfoque en resultados y valor aportado
- Optimizada para SEO de LinkedIn
${includeCallToAction ? `- Incluir llamada a la acción: ${ctaMap[callToActionType]}\n` : ''}

INSTRUCCIONES ESPECÍFICAS:
1. Comienza con un gancho potente que capte atención
2. Destaca logros cuantificables (profesionales o académicos) si están disponibles
3. Muestra personalidad pero manteniendo profesionalismo
4. Usa palabras clave relevantes del sector o área de estudios
5. Estructura clara con párrafos separados
6. NO uses emojis ni caracteres especiales raros
7. Usa SOLO caracteres estándar del español
8. Evita clichés como "apasionado por" o "dinámico profesional"
9. Sé específico y concreto, no genérico
10. La biografía debe fluir naturalmente
11. Si es estudiante, enfócate en potencial, habilidades y objetivos
12. Si tiene experiencia, destaca logros y expertise profesional

FORMATO DE RESPUESTA:
Devuelve SOLO un JSON con esta estructura exacta:
{
  "biography": "texto de la biografía completa aquí, con párrafos separados por doble salto de línea",
  "tips": [
    "tip 1 para optimizar el perfil",
    "tip 2 para optimizar el perfil",
    "tip 3 para optimizar el perfil"
  ]
}

IMPORTANTE: 
- La respuesta debe ser SOLO el JSON, sin texto adicional
- Cada párrafo debe tener un propósito específico
- La biografía debe estar lista para copiar y pegar en LinkedIn`

  return prompt
}
