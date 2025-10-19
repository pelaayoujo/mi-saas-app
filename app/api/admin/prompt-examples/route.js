import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../../../../lib/auth'
import { addCustomExample, getCustomExamples } from '../../../../lib/promptTemplates'
import { requireAdmin } from '../../../../lib/authMiddleware'

// GET: Obtener ejemplos existentes
export async function GET(request) {
  try {
    // Verificar que el usuario es admin
    const adminResult = await requireAdmin(request)
    if (!adminResult.success) {
      return NextResponse.json({ error: adminResult.error }, { status: adminResult.status })
    }

    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category') || 'articles'
    const limit = parseInt(searchParams.get('limit')) || 10

    const examples = await getCustomExamples(category, limit)
    
    return NextResponse.json({
      success: true,
      examples: examples
    })

  } catch (error) {
    console.error('Error obteniendo ejemplos:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}

// POST: Agregar nuevo ejemplo
export async function POST(request) {
  try {
    // Verificar que el usuario es admin
    const adminResult = await requireAdmin(request)
    if (!adminResult.success) {
      return NextResponse.json({ error: adminResult.error }, { status: adminResult.status })
    }

    const session = await getServerSession(authOptions)

    const body = await request.json()
    const { content, title, tone, length, category, description } = body

    // Validaciones básicas
    if (!content || !title) {
      return NextResponse.json({ 
        error: 'Título y contenido son requeridos' 
      }, { status: 400 })
    }

    const exampleData = {
      title: title.trim(),
      content: content.trim(),
      tone: tone || 'profesional',
      length: length || 'medio',
      category: category || 'articles',
      description: description || '',
      addedBy: session.user.email
    }

    const result = await addCustomExample(exampleData)
    
    if (result.success) {
      return NextResponse.json({
        success: true,
        message: 'Ejemplo agregado exitosamente',
        id: result.id
      })
    } else {
      return NextResponse.json({ 
        error: result.error 
      }, { status: 500 })
    }

  } catch (error) {
    console.error('Error agregando ejemplo:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}
