import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { connectToDatabase } from '../../../../lib/mongodb'
import { ObjectId } from 'mongodb'

export async function GET(request, { params }) {
  try {
    console.log('=== GET ARTICLE BY ID ===')
    
    const session = await getServerSession()
    console.log('Session:', session)
    
    if (!session) {
      return NextResponse.json(
        { success: false, message: 'No autorizado' },
        { status: 401 }
      )
    }

    const { id } = params
    console.log('Article ID:', id)

    // Validar ObjectId
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: 'ID de artículo inválido' },
        { status: 400 }
      )
    }

    // Conectar a MongoDB
    const { db } = await connectToDatabase()
    const articlesCollection = db.collection('articles')

    // Buscar artículo por ID y usuario
    const userEmail = session.user?.email
    const article = await articlesCollection.findOne({
      _id: new ObjectId(id),
      userId: userEmail
    })

    if (!article) {
      return NextResponse.json(
        { success: false, message: 'Artículo no encontrado' },
        { status: 404 }
      )
    }

    console.log('Article found:', article.title)

    // Formatear respuesta
    const formattedArticle = {
      id: article._id.toString(),
      title: article.title,
      body: article.body,
      status: article.status,
      createdAt: article.createdAt,
      updatedAt: article.updatedAt,
      wordCount: article.metadata?.estimatedReadTime ? article.metadata.estimatedReadTime * 200 : 0,
      tags: article.metadata?.tags || [],
      metadata: article.metadata || {}
    }

    return NextResponse.json({
      success: true,
      article: formattedArticle
    })

  } catch (error) {
    console.error('GET Article by ID - Error:', error)
    return NextResponse.json(
      { 
        success: false, 
        message: 'Error obteniendo artículo',
        error: error.message
      },
      { status: 500 }
    )
  }
}

export async function PUT(request, { params }) {
  try {
    console.log('=== UPDATE ARTICLE ===')
    
    const session = await getServerSession()
    console.log('Session:', session)
    
    if (!session) {
      return NextResponse.json(
        { success: false, message: 'No autorizado' },
        { status: 401 }
      )
    }

    const { id } = params
    const body = await request.json()
    
    console.log('Article ID:', id)
    console.log('Update data:', body)

    // Validar ObjectId
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: 'ID de artículo inválido' },
        { status: 400 }
      )
    }

    // Conectar a MongoDB
    const { db } = await connectToDatabase()
    const articlesCollection = db.collection('articles')

    // Buscar artículo por ID y usuario
    const userEmail = session.user?.email
    const existingArticle = await articlesCollection.findOne({
      _id: new ObjectId(id),
      userId: userEmail
    })

    if (!existingArticle) {
      return NextResponse.json(
        { success: false, message: 'Artículo no encontrado' },
        { status: 404 }
      )
    }

    // Actualizar artículo
    const updateData = {
      ...body,
      updatedAt: new Date()
    }

    const result = await articlesCollection.updateOne(
      { _id: new ObjectId(id), userId: userEmail },
      { $set: updateData }
    )

    if (result.modifiedCount === 0) {
      return NextResponse.json(
        { success: false, message: 'No se pudo actualizar el artículo' },
        { status: 400 }
      )
    }

    console.log('Article updated successfully')

    return NextResponse.json({
      success: true,
      message: 'Artículo actualizado correctamente'
    })

  } catch (error) {
    console.error('UPDATE Article - Error:', error)
    return NextResponse.json(
      { 
        success: false, 
        message: 'Error actualizando artículo',
        error: error.message
      },
      { status: 500 }
    )
  }
}

export async function DELETE(request, { params }) {
  try {
    console.log('=== DELETE ARTICLE ===')
    
    const session = await getServerSession()
    console.log('Session:', session)
    
    if (!session) {
      return NextResponse.json(
        { success: false, message: 'No autorizado' },
        { status: 401 }
      )
    }

    const { id } = params
    console.log('Article ID:', id)

    // Validar ObjectId
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: 'ID de artículo inválido' },
        { status: 400 }
      )
    }

    // Conectar a MongoDB
    const { db } = await connectToDatabase()
    const articlesCollection = db.collection('articles')

    // Eliminar artículo por ID y usuario
    const userEmail = session.user?.email
    const result = await articlesCollection.deleteOne({
      _id: new ObjectId(id),
      userId: userEmail
    })

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, message: 'Artículo no encontrado' },
        { status: 404 }
      )
    }

    console.log('Article deleted successfully')

    return NextResponse.json({
      success: true,
      message: 'Artículo eliminado correctamente'
    })

  } catch (error) {
    console.error('DELETE Article - Error:', error)
    return NextResponse.json(
      { 
        success: false, 
        message: 'Error eliminando artículo',
        error: error.message
      },
      { status: 500 }
    )
  }
}
