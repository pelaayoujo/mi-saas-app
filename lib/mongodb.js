import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI
const options = {
  // Configuración básica para MongoDB 6.x
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
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
  const client = await clientPromise
  const db = client.db(process.env.MONGODB_DB)
  return { client, db }
}


