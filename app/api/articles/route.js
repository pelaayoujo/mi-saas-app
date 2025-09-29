import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { connectToDatabase } from '../../../lib/mongodb'

export async function GET(request) {
  try {
    const session = await getServerSession()
    
    if (!session) {
      return NextResponse.json(
        { success: false, message: 'No autorizado' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const page = parseInt(searchParams.get('page')) || 1
    const limit = parseInt(searchParams.get('limit')) || 10
    const search = searchParams.get('search')

    const { db } = await connectToDatabase()
    const articlesCollection = db.collection('articles')

    // Construir filtros
    const filters = { userId: session.user.id }
    if (status) {
      filters.status = status
    }
    if (search) {
      filters.$or = [
        { title: { $regex: search, $options: 'i' } },
        { body: { $regex: search, $options: 'i' } }
      ]
    }

    // Obtener artículos con paginación
    const skip = (page - 1) * limit
    const articles = await articlesCollection
      .find(filters)
      .sort({ updatedAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray()

    // Contar total para paginación
    const total = await articlesCollection.countDocuments(filters)

    // Formatear respuesta
    const formattedArticles = articles.map(article => ({
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
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })

  } catch (error) {
    console.error('Error obteniendo artículos:', error)
    return NextResponse.json(
      { success: false, message: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

export async function POST(request) {
  try {
    const session = await getServerSession()
    
    console.log('Session:', session)
    
    if (!session) {
      return NextResponse.json(
        { success: false, message: 'No autorizado' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { title, template, tone, length, targetAudience, keywords, tags, body: content, wordCount } = body

    // Validaciones básicas
    if (!title || !content) {
      return NextResponse.json(
        { success: false, message: 'Título y contenido son requeridos' },
        { status: 400 }
      )
    }

    const { db } = await connectToDatabase()
    const articlesCollection = db.collection('articles')

    // Crear nuevo artículo
    const article = {
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
      linkedInData: {
        postId: null,
        publishedAt: null,
        url: null
      },
      scheduledAt: null,
      analytics: {
        impressions: 0,
        reactions: 0,
        comments: 0,
        shares: 0,
        clicks: 0,
        engagementRate: 0,
        newFollowers: 0
      },
      versions: [{
        version: 1,
        content: content,
        createdAt: new Date(),
        changes: 'Versión inicial'
      }],
      createdAt: new Date(),
      updatedAt: new Date()
    }

    const result = await articlesCollection.insertOne(article)

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
    console.error('Error creando artículo:', error)
    return NextResponse.json(
      { success: false, message: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
