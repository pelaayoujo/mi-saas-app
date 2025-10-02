import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { connectToDatabase } from '../../../lib/mongodb'

export async function GET(request) {
  try {
    console.log('=== GET ARTICLES ===')
    
    const session = await getServerSession()
    console.log('Session:', session)
    
    if (!session) {
      return NextResponse.json(
        { success: false, message: 'No autorizado' },
        { status: 401 }
      )
    }

    // Conectar a MongoDB
    const { db } = await connectToDatabase()
    const articlesCollection = db.collection('articles')

    // Filtrar artículos del usuario actual
    const userEmail = session.user?.email
    const userArticles = await articlesCollection
      .find({ userId: userEmail })
      .sort({ createdAt: -1 })
      .toArray()

    console.log('User articles:', userArticles.length)

    // Formatear respuesta
    const formattedArticles = userArticles.map(article => ({
      id: article._id.toString(),
      title: article.title,
      status: article.status,
      createdAt: article.createdAt,
      updatedAt: article.updatedAt,
      wordCount: article.metadata?.estimatedReadTime ? article.metadata.estimatedReadTime * 200 : 0,
      tags: article.metadata?.tags || []
    }))

    return NextResponse.json({
      success: true,
      articles: formattedArticles,
      pagination: {
        page: 1,
        limit: 10,
        total: formattedArticles.length,
        pages: 1
      }
    })

  } catch (error) {
    console.error('GET Articles - Error:', error)
    return NextResponse.json(
      { 
        success: false, 
        message: 'Error obteniendo artículos',
        error: error.message
      },
      { status: 500 }
    )
  }
}

export async function POST(request) {
  try {
    console.log('=== POST ARTICLES ===')
    
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

    // Conectar a MongoDB
    const { db } = await connectToDatabase()
    const articlesCollection = db.collection('articles')

    // Crear artículo
    const article = {
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
      createdAt: new Date(),
      updatedAt: new Date()
    }

    // Guardar en MongoDB
    const result = await articlesCollection.insertOne(article)
    console.log('Article saved:', result.insertedId)

    return NextResponse.json({
      success: true,
      article: {
        id: result.insertedId.toString(),
        title: article.title,
        status: article.status,
        createdAt: article.createdAt
      }
    }, { status: 201 })

  } catch (error) {
    console.error('POST Articles - Error:', error)
    return NextResponse.json(
      { 
        success: false, 
        message: 'Error creando artículo',
        error: error.message
      },
      { status: 500 }
    )
  }
}