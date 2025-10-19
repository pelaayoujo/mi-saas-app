import { NextResponse } from 'next/server'
import { connectToDatabase } from '../../../lib/mongodb'

// Forzar que esta ruta sea dinámica para evitar problemas de build
export const dynamic = 'force-dynamic'

export async function GET(request) {
  try {
    // Fix para evitar Dynamic server usage
    const url = new URL(request.url)
    const category = url.searchParams.get('category')
    const publicOnly = url.searchParams.get('public') !== 'false'

    const { db } = await connectToDatabase()
    const templatesCollection = db.collection('templates')

    // Construir filtros
    const filters = {}
    if (publicOnly) {
      filters.isPublic = true
    }
    if (category) {
      filters.category = category
    }

    const templates = await templatesCollection
      .find(filters)
      .sort({ usageCount: -1, rating: -1 })
      .toArray()

    // Si no hay plantillas, crear las plantillas por defecto
    if (templates.length === 0) {
      await createDefaultTemplates(db)
      const defaultTemplates = await templatesCollection
        .find(filters)
        .sort({ usageCount: -1, rating: -1 })
        .toArray()
      
      return NextResponse.json({
        success: true,
        templates: defaultTemplates.map(formatTemplate)
      })
    }

    return NextResponse.json({
      success: true,
      templates: templates.map(formatTemplate)
    })

  } catch (error) {
    console.error('Error obteniendo plantillas:', error)
    return NextResponse.json(
      { success: false, message: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

function formatTemplate(template) {
  return {
    id: template._id.toString(),
    name: template.name,
    description: template.description,
    category: template.category,
    structure: template.structure,
    content: template.content,
    isPublic: template.isPublic,
    createdBy: template.createdBy,
    usageCount: template.usageCount || 0,
    rating: template.rating || 0,
    createdAt: template.createdAt
  }
}

async function createDefaultTemplates(db) {
  const templatesCollection = db.collection('templates')
  
  const defaultTemplates = [
    {
      name: "Plantilla - Lista 5 pasos",
      description: "Estructura para crear listas de 5 pasos efectivas",
      category: "lista",
      structure: ["h2", "p", "ul", "p", "ul", "p", "cta"],
      content: {
        title: "5 [TEMA] que [BENEFICIO]",
        body: `<h2>Introducción</h2>
<p>En este artículo te comparto 5 [TEMA] que [BENEFICIO]...</p>

<ul>
<li>Paso 1: [DESCRIPCIÓN]</li>
<li>Paso 2: [DESCRIPCIÓN]</li>
<li>Paso 3: [DESCRIPCIÓN]</li>
<li>Paso 4: [DESCRIPCIÓN]</li>
<li>Paso 5: [DESCRIPCIÓN]</li>
</ul>

<p>¿Cuál de estos pasos te parece más útil? Comparte tu experiencia en los comentarios.</p>`,
        metadata: {
          tone: "cercano",
          length: "normal",
          keywords: [],
          tags: []
        }
      },
      isPublic: true,
      createdBy: "system",
      usageCount: 1250,
      rating: 4.8,
      createdAt: new Date()
    },
    {
      name: "Plantilla - Guía paso a paso",
      description: "Tutorial detallado para enseñar algo específico",
      category: "guía",
      structure: ["h2", "p", "h3", "p", "h3", "p", "cta"],
      content: {
        title: "Cómo [ACCIÓN] en [CONTEXTO]: Guía completa",
        body: `<h2>¿Por qué es importante [TEMA]?</h2>
<p>En mi experiencia [CONTEXTO], he visto que [PROBLEMA]...</p>

<h3>Paso 1: [PRIMER_PASO]</h3>
<p>[EXPLICACIÓN_DETALLADA]</p>

<h3>Paso 2: [SEGUNDO_PASO]</h3>
<p>[EXPLICACIÓN_DETALLADA]</p>

<h3>Paso 3: [TERCER_PASO]</h3>
<p>[EXPLICACIÓN_DETALLADA]</p>

<p>¿Te ha resultado útil esta guía? ¿Tienes alguna pregunta? Déjamela en los comentarios 👇</p>`,
        metadata: {
          tone: "técnico",
          length: "larga",
          keywords: [],
          tags: []
        }
      },
      isPublic: true,
      createdBy: "system",
      usageCount: 980,
      rating: 4.6,
      createdAt: new Date()
    },
    {
      name: "Plantilla - Opinión personal",
      description: "Compartir tu punto de vista sobre un tema",
      category: "opinión",
      structure: ["p", "p", "p", "cta"],
      content: {
        title: "Mi opinión sobre [TEMA] (y por qué debería importarte)",
        body: `<p>Hace [TIEMPO] que trabajo en [INDUSTRIA] y he visto cómo [OBSERVACIÓN].</p>

<p>Mi experiencia me ha enseñado que [LECCIÓN_APRENDIDA].</p>

<p>Por eso creo que [OPINIÓN_FUERTE].</p>

<p>¿Qué opinas tú? ¿Has tenido experiencias similares? Me encantaría leer tu perspectiva en los comentarios.</p>`,
        metadata: {
          tone: "cercano",
          length: "corta",
          keywords: [],
          tags: []
        }
      },
      isPublic: true,
      createdBy: "system",
      usageCount: 750,
      rating: 4.4,
      createdAt: new Date()
    },
    {
      name: "Plantilla - Hilo de posts",
      description: "Serie de posts conectados para contar una historia",
      category: "hilo",
      structure: ["p", "p", "p", "p", "cta"],
      content: {
        title: "🧵 Hilo: [TEMA] - Lo que nadie te cuenta",
        body: `<p>1/ [INTRODUCCIÓN_IMPACTANTE]</p>

<p>2/ [DESARROLLO_PUNTO_1]</p>

<p>3/ [DESARROLLO_PUNTO_2]</p>

<p>4/ [CONCLUSIÓN_Y_LLAMADA_ACCIÓN]</p>

<p>¿Te ha gustado este hilo? Guarda el post y compártelo con alguien que pueda necesitarlo 💙</p>`,
        metadata: {
          tone: "cercano",
          length: "normal",
          keywords: [],
          tags: []
        }
      },
      isPublic: true,
      createdBy: "system",
      usageCount: 650,
      rating: 4.5,
      createdAt: new Date()
    },
    {
      name: "Plantilla - Caso de estudio",
      description: "Historia de éxito o fracaso con lecciones aprendidas",
      category: "caso",
      structure: ["h2", "p", "h3", "p", "h3", "p", "cta"],
      content: {
        title: "Caso de estudio: [PROYECTO/EMPRESA] - [RESULTADO]",
        body: `<h2>El contexto</h2>
<p>[SITUACIÓN_INICIAL]</p>

<h3>El desafío</h3>
<p>[PROBLEMA_ESPECÍFICO]</p>

<h3>La solución</h3>
<p>[CÓMO_SE_RESOLVIÓ]</p>

<h3>Los resultados</h3>
<p>[RESULTADOS_OBTENIDOS]</p>

<p>¿Has enfrentado desafíos similares? ¿Qué estrategias has usado? Comparte tu experiencia 👇</p>`,
        metadata: {
          tone: "formal",
          length: "normal",
          keywords: [],
          tags: []
        }
      },
      isPublic: true,
      createdBy: "system",
      usageCount: 420,
      rating: 4.7,
      createdAt: new Date()
    },
    {
      name: "Plantilla - Tutorial rápido",
      description: "Cómo hacer algo específico de forma rápida",
      category: "tutorial",
      structure: ["h2", "p", "ol", "p", "cta"],
      content: {
        title: "Tutorial: Cómo [ACCIÓN] en [TIEMPO]",
        body: `<h2>¿Necesitas [RESULTADO]? Te muestro cómo hacerlo paso a paso</h2>
<p>Este tutorial te llevará menos de [TIEMPO] y te dará [BENEFICIO].</p>

<ol>
<li>[PASO_1]</li>
<li>[PASO_2]</li>
<li>[PASO_3]</li>
<li>[PASO_4]</li>
</ol>

<p>¡Y listo! ¿Te ha funcionado? Etiquétame si lo pruebas y comparte tus resultados 🚀</p>`,
        metadata: {
          tone: "cercano",
          length: "corta",
          keywords: [],
          tags: []
        }
      },
      isPublic: true,
      createdBy: "system",
      usageCount: 580,
      rating: 4.3,
      createdAt: new Date()
    }
  ]

  await templatesCollection.insertMany(defaultTemplates)
}
