import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'

export async function GET(request) {
  try {
    console.log('=== TEST GET ARTICLES ===')
    
    // Verificar sesión
    const session = await getServerSession()
    console.log('Session:', session)
    
    if (!session) {
      return NextResponse.json(
        { success: false, message: 'No autorizado' },
        { status: 401 }
      )
    }

    // Simular artículos de prueba
    const mockArticles = [
      {
        id: 'test-1',
        title: 'Artículo de Prueba 1',
        status: 'draft',
        createdAt: new Date().toISOString(),
        wordCount: 500,
        tags: ['test', 'prueba']
      },
      {
        id: 'test-2', 
        title: 'Artículo de Prueba 2',
        status: 'published',
        createdAt: new Date(Date.now() - 86400000).toISOString(), // Ayer
        wordCount: 750,
        tags: ['test', 'publicado']
      }
    ]

    console.log('Mock articles returned:', mockArticles)

    return NextResponse.json({
      success: true,
      articles: mockArticles,
      pagination: {
        page: 1,
        limit: 10,
        total: mockArticles.length,
        pages: 1
      }
    })

  } catch (error) {
    console.error('TEST GET API - Error:', error)
    return NextResponse.json(
      { 
        success: false, 
        message: 'Error en test GET API',
        error: error.message
      },
      { status: 500 }
    )
  }
}
