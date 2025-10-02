import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI
const options = {
  // Configuración específica para MongoDB Atlas en Vercel
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  // Configuración SSL simplificada
  tls: true,
  // Configuración de conexión mejorada
  connectTimeoutMS: 10000,
  retryWrites: true,
  retryReads: true,
  // Configuración específica para Vercel
  bufferMaxEntries: 0,
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

let client
let clientPromise

if (!process.env.MONGODB_URI) {
  throw new Error('Por favor agrega tu MONGODB_URI a las variables de entorno')
}

if (process.env.NODE_ENV === 'development') {
  // En desarrollo, usa una variable global para que el valor
  // se preserve entre recargas del módulo causadas por HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options)
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
} else {
  // En producción, es mejor no usar una variable global.
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

// Exporta una promesa que se resuelve a un cliente MongoDB conectado
export default clientPromise

// Función helper para obtener la base de datos
export async function connectToDatabase() {
  try {
    console.log('Connecting to MongoDB...')
    console.log('MONGODB_URI exists:', !!process.env.MONGODB_URI)
    console.log('MONGODB_DB:', process.env.MONGODB_DB)
    
    const client = await clientPromise
    console.log('MongoDB client connected successfully')
    
    const db = client.db(process.env.MONGODB_DB || 'MISAAS')
    console.log('MongoDB database selected:', db.databaseName)
    
    return { client, db }
  } catch (error) {
    console.error('MongoDB connection error:', error)
    throw error
  }
}