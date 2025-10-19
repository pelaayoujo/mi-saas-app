import { NextResponse } from 'next/server'
import clientPromise from '../../../../lib/mongodb'

export async function GET(request) {
  try {
    const client = await clientPromise
    const db = client.db(process.env.MONGODB_DB || 'linkedai')
    const authorizationsCollection = db.collection('user_authorizations')

    // Verificar si la colección tiene documentos
    const count = await authorizationsCollection.countDocuments()
    
    // Si no existe o está vacía, crear algunos ejemplos
    if (count === 0) {
      console.log('🔧 Creando colección user_authorizations...')
      
      // Crear índice único en email
      try {
        await authorizationsCollection.createIndex({ email: 1 }, { unique: true })
      } catch (error) {
        // El índice puede ya existir
        console.log('Índice ya existe o error:', error.message)
      }
      
      // Agregar algunos ejemplos si no existen
      const examples = [
        {
          email: 'usuario1@ejemplo.com',
          plan: 'trial',
          authorizedAt: new Date(),
          authorizedBy: 'system',
          status: 'active'
        },
        {
          email: 'usuario2@ejemplo.com',
          plan: 'basic',
          authorizedAt: new Date(),
          authorizedBy: 'system', 
          status: 'active'
        }
      ]
      
      try {
        await authorizationsCollection.insertMany(examples)
        console.log('✅ Ejemplos agregados a user_authorizations')
      } catch (error) {
        console.log('Error insertando ejemplos:', error.message)
      }
    }

    // Obtener todos los documentos
    const authorizations = await authorizationsCollection
      .find({})
      .sort({ authorizedAt: -1 })
      .toArray()

    return NextResponse.json({
      success: true,
      message: `Colección user_authorizations encontrada con ${authorizations.length} documentos`,
      collectionExists: true,
      count: authorizations.length,
      authorizations: authorizations.map(doc => ({
        email: doc.email,
        plan: doc.plan,
        authorizedAt: doc.authorizedAt,
        status: doc.status
      }))
    })

  } catch (error) {
    console.error('Error verificando autorizaciones:', error)
    return NextResponse.json({
      success: false,
      error: 'Error accediendo a la base de datos',
      message: error.message
    }, { status: 500 })
  }
}
