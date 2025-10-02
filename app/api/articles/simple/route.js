import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'

// Base de datos simple en memoria (funciona sin MongoDB)
let articlesDB = []

export async function GET(request) {
  try {
    console.log('=== SIMPLE API GET ARTICLES ===')
    
    const session = await getServerSession()
    console.log('Session:', session)
    
    if (!session) {
      return NextResponse.json(
        { success: false, message: 'No autorizado' },
        { status: 401 }
      )
    }

    // Filtrar artículos del usuario actual
    const userEmail = session.user?.email
    const userArticles = articlesDB.filter(article => article.userId === userEmail)

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
    console.error('SIMPLE GET API - Error:', error)
    return NextResponse.json(
      { 
        success: false, 
        message: 'Error en simple GET API',
        error: error.message
      },
      { status: 500 }
    )
  }
}

export async function POST(request) {
  try {
    console.log('=== SIMPLE API POST ARTICLES ===')
    
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

    // Crear artículo
    const article = {
      id: 'simple-' + Date.now(),
      userId: session.user?.email,
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
    articlesDB.push(article)
    console.log('Article saved:', article)
    console.log('Total articles:', articlesDB.length)

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
    console.error('SIMPLE POST API - Error:', error)
    return NextResponse.json(
      { 
        success: false, 
        message: 'Error en simple POST API',
        error: error.message
      },
      { status: 500 }
    )
  }
}
