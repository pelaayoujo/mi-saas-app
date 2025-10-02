import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'

// Base de datos en memoria (solo para desarrollo)
let memoryDB = []

export async function GET(request) {
  try {
    console.log('=== MEMORY API GET ARTICLES ===')
    
    const session = await getServerSession()
    console.log('Session:', session)
    
    if (!session) {
      return NextResponse.json(
        { success: false, message: 'No autorizado' },
        { status: 401 }
      )
    }

    // Filtrar artículos del usuario actual
    const userArticles = memoryDB.filter(article => 
      article.userId === (session.user?.id || session.user?.email)
    )

    console.log('Memory DB articles:', memoryDB)
    console.log('User articles:', userArticles)

    return NextResponse.json({
      success: true,
      articles: userArticles,
      pagination: {
        page: 1,
        limit: 10,
        total: userArticles.length,
        pages: 1
      }
    })

  } catch (error) {
    console.error('MEMORY GET API - Error:', error)
    return NextResponse.json(
      { 
        success: false, 
        message: 'Error en memory GET API',
        error: error.message
      },
      { status: 500 }
    )
  }
}

export async function POST(request) {
  try {
    console.log('=== MEMORY API POST ARTICLES ===')
    
    const session = await getServerSession()
    console.log('Session:', session)
    
    if (!session) {
      return NextResponse.json(
        { success: false, message: 'No autorizado' },
        { status: 401 }
      )
    }

    const body = await request.json()
    console.log('Body received:', body)
    
    const { title, template, tone, length, targetAudience, keywords, tags, body: content, wordCount } = body

    // Validaciones básicas
    if (!title || !content) {
      return NextResponse.json(
        { success: false, message: 'Título y contenido son requeridos' },
        { status: 400 }
      )
    }

    // Crear artículo en memoria
    const article = {
      id: 'mem-' + Date.now(),
      userId: session.user?.id || session.user?.email,
      title,
      body: content,
      status: 'draft',
      template: template || 'custom',
      metadata: {
        tone: tone || 'cercano',
        length: length || 'normal',
        keywords: keywords || [],
        tags: tags || [],
        targetAudience: targetAudience || 'profesionales',
        estimatedReadTime: Math.ceil(wordCount / 200) || 1
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    // Guardar en memoria
    memoryDB.push(article)
    console.log('Article saved to memory:', article)
    console.log('Total articles in memory:', memoryDB.length)

    return NextResponse.json({
      success: true,
      article: {
        id: article.id,
        title: article.title,
        status: article.status,
        createdAt: article.createdAt
      }
    }, { status: 201 })

  } catch (error) {
    console.error('MEMORY POST API - Error:', error)
    return NextResponse.json(
      { 
        success: false, 
        message: 'Error en memory POST API',
        error: error.message
      },
      { status: 500 }
    )
  }
}
