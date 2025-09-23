import { NextResponse } from 'next/server'
import clientPromise from '../../../lib/mongodb'

export async function GET() {
  try {
    console.log('🔍 Iniciando prueba de conexión a MongoDB...')
    console.log('MONGODB_URI:', process.env.MONGODB_URI ? 'Configurado' : 'No configurado')
    console.log('MONGODB_DB:', process.env.MONGODB_DB ? 'Configurado' : 'No configurado')
    
    const client = await clientPromise
    console.log('✅ Cliente MongoDB conectado')
    
    const db = client.db(process.env.MONGODB_DB)
    console.log('✅ Base de datos obtenida:', process.env.MONGODB_DB)
    
    // Probar una operación simple
    const collections = await db.listCollections().toArray()
    console.log('✅ Colecciones encontradas:', collections.length)
    
    return NextResponse.json({
      success: true,
      message: 'Conexión a MongoDB exitosa',
      database: process.env.MONGODB_DB,
      collections: collections.length,
      collectionsList: collections.map(c => c.name)
    })
    
  } catch (error) {
    console.error('❌ Error en conexión a MongoDB:', error)
    
    return NextResponse.json({
      success: false,
      error: error.message,
      details: {
        name: error.name,
        code: error.code,
        stack: error.stack
      }
    }, { status: 500 })
  }
}

