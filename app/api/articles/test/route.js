import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'

export async function POST(request) {
  try {
    console.log('=== TEST API ARTICLES ===')
    
    // Verificar sesión
    const session = await getServerSession()
    console.log('Session:', session)
    
    if (!session) {
      return NextResponse.json(
        { success: false, message: 'No autorizado' },
        { status: 401 }
      )
    }

    // Verificar variables de entorno
    console.log('MONGODB_URI exists:', !!process.env.MONGODB_URI)
    console.log('MONGODB_DB:', process.env.MONGODB_DB)
    console.log('NODE_ENV:', process.env.NODE_ENV)

    // Obtener datos del body
    const body = await request.json()
    console.log('Body received:', body)

    // Validaciones básicas
    const { title, body: content } = body
    if (!title || !content) {
      return NextResponse.json(
        { success: false, message: 'Título y contenido son requeridos' },
        { status: 400 }
      )
    }

    // Simular guardado exitoso (sin base de datos)
    const mockArticle = {
      id: 'test-' + Date.now(),
      title,
      content,
      userId: session.user?.id || session.user?.email,
      status: 'draft',
      createdAt: new Date().toISOString()
    }

    console.log('Mock article created:', mockArticle)

    return NextResponse.json({
      success: true,
      message: 'Artículo guardado exitosamente (modo test)',
      article: mockArticle
    }, { status: 201 })

  } catch (error) {
    console.error('TEST API - Error:', error)
    console.error('TEST API - Error stack:', error.stack)
    return NextResponse.json(
      { 
        success: false, 
        message: 'Error en test API',
        error: error.message
      },
      { status: 500 }
    )
  }
}
