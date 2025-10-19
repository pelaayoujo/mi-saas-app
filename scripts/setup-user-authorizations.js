// Script para configurar la colección user_authorizations en MongoDB
import { MongoClient } from 'mongodb'

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017'
const DB_NAME = process.env.MONGODB_DB || 'linkedai'

async function setupUserAuthorizations() {
  let client
  
  try {
    console.log('🔌 Conectando a MongoDB...')
    client = new MongoClient(MONGODB_URI)
    await client.connect()
    
    const db = client.db(DB_NAME)
    const collection = db.collection('user_authorizations')
    
    console.log(`📊 Verificando colección 'user_authorizations' en base de datos '${DB_NAME}'...`)
    
    // Verificar si la colección existe
    const collections = await db.listCollections({ name: 'user_authorizations' }).toArray()
    
    if (collections.length === 0) {
      console.log('📝 Creando colección user_authorizations...')
      
      // Crear índice único en email
      await collection.createIndex({ email: 1 }, { unique: true })
      console.log('✅ Índice único creado en campo email')
    } else {
      console.log('✅ La colección user_authorizations ya existe')
    }
    
    // Verificar documentos existentes
    const count = await collection.countDocuments()
    console.log(`📋 Documentos actuales en user_authorizations: ${count}`)
    
    if (count === 0) {
      console.log('📝 Agregando algunos ejemplos...')
      
      // Insertar algunos ejemplos
      const examples = [
        {
          email: 'usuario1@ejemplo.com',
          plan: 'trial',
          authorizedAt: new Date(),
          authorizedBy: 'admin',
          status: 'active'
        },
        {
          email: 'usuario2@ejemplo.com',
          plan: 'basic',
          authorizedAt: new Date(),
          authorizedBy: 'admin',
          status: 'active'
        }
      ]
      
      await collection.insertMany(examples)
      console.log('✅ Ejemplos agregados')
    }
    
    // Mostrar todos los documentos
    const docs = await collection.find({}).toArray()
    console.log('\n📋 Documentos en user_authorizations:')
    docs.forEach((doc, index) => {
      console.log(`${index + 1}. ${doc.email} → Plan: ${doc.plan}`)
    })
    
    console.log('\n🎉 Configuración completada!')
    console.log('📖 Para agregar más usuarios, ejecuta:')
    console.log('db.user_authorizations.insertOne({')
    console.log('  email: "nuevo@ejemplo.com",')
    console.log('  plan: "trial",')
    console.log('  authorizedAt: new Date(),')
    console.log('  authorizedBy: "admin",')
    console.log('  status: "active"')
    console.log('})')
    
  } catch (error) {
    console.error('❌ Error:', error)
  } finally {
    if (client) {
      await client.close()
      console.log('🔌 Conexión cerrada')
    }
  }
}

setupUserAuthorizations()
