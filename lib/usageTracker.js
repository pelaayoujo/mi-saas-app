// Sistema de seguimiento de uso de usuarios
import { clientPromise } from './mongodb'
import { getUserPlanFromDB } from './permissions'

const USAGE_COLLECTION = 'usage_tracking'

// Estructura de datos de uso mensual
const getUsageStructure = (userId, month, year) => ({
  userId,
  month,
  year,
  articlesGenerated: 0,
  postsGenerated: 0,
  lastUpdated: new Date(),
  createdAt: new Date()
})

// Función para obtener o crear el registro de uso del mes actual
export async function getCurrentMonthUsage(userId) {
  try {
    const client = await clientPromise
    const db = client.db('linkedai')
    const collection = db.collection(USAGE_COLLECTION)
    
    const now = new Date()
    const month = now.getMonth() + 1 // getMonth() retorna 0-11
    const year = now.getFullYear()
    
    // Buscar uso del mes actual
    let usage = await collection.findOne({
      userId,
      month,
      year
    })
    
    // Si no existe, crear uno nuevo
    if (!usage) {
      usage = getUsageStructure(userId, month, year)
      await collection.insertOne(usage)
    }
    
    return usage
  } catch (error) {
    console.error('Error getting usage:', error)
    throw error
  }
}

// Función para incrementar el contador de artículos generados
export async function incrementArticleUsage(userId) {
  try {
    const client = await clientPromise
    const db = client.db('linkedai')
    const collection = db.collection(USAGE_COLLECTION)
    
    const now = new Date()
    const month = now.getMonth() + 1
    const year = now.getFullYear()
    
    // Actualizar o crear registro
    await collection.updateOne(
      { userId, month, year },
      {
        $inc: { articlesGenerated: 1 },
        $set: { lastUpdated: new Date() }
      },
      { upsert: true }
    )
    
    return true
  } catch (error) {
    console.error('Error incrementing article usage:', error)
    throw error
  }
}

// Función para incrementar el contador de posts generados
export async function incrementPostUsage(userId) {
  try {
    const client = await clientPromise
    const db = client.db('linkedai')
    const collection = db.collection(USAGE_COLLECTION)
    
    const now = new Date()
    const month = now.getMonth() + 1
    const year = now.getFullYear()
    
    // Actualizar o crear registro
    await collection.updateOne(
      { userId, month, year },
      {
        $inc: { postsGenerated: 1 },
        $set: { lastUpdated: new Date() }
      },
      { upsert: true }
    )
    
    return true
  } catch (error) {
    console.error('Error incrementing post usage:', error)
    throw error
  }
}

// Función para verificar si un usuario puede generar más contenido
export async function canUserGenerateContent(userId, contentType = 'article') {
  try {
    const usage = await getCurrentMonthUsage(userId)
    
    // Obtener el plan del usuario desde la base de datos
    const userPlan = await getUserPlanFromDB(userId)
    
    if (contentType === 'article') {
      const limit = userPlan.limits.articlesPerMonth
      const currentUsage = usage.articlesGenerated || 0
      
      // Si el límite es -1, es ilimitado
      if (limit === -1) {
        return {
          canGenerate: true,
          currentUsage,
          limit: -1,
          remaining: -1,
          planName: userPlan.name
        }
      }
      
      // Verificar si ha alcanzado el límite
      const canGenerate = currentUsage < limit
      const remaining = Math.max(0, limit - currentUsage)
      
      return {
        canGenerate,
        currentUsage,
        limit,
        remaining,
        planName: userPlan.name
      }
    }
    
    if (contentType === 'post') {
      const limit = userPlan.limits.postsPerMonth
      const currentUsage = usage.postsGenerated || 0
      
      if (limit === -1) {
        return {
          canGenerate: true,
          currentUsage,
          limit: -1,
          remaining: -1,
          planName: userPlan.name
        }
      }
      
      const canGenerate = currentUsage < limit
      const remaining = Math.max(0, limit - currentUsage)
      
      return {
        canGenerate,
        currentUsage,
        limit,
        remaining,
        planName: userPlan.name
      }
    }
    
    return {
      canGenerate: false,
      currentUsage: 0,
      limit: 0,
      remaining: 0,
      planName: 'Desconocido'
    }
  } catch (error) {
    console.error('Error checking content generation:', error)
    return {
      canGenerate: false,
      currentUsage: 0,
      limit: 0,
      remaining: 0,
      planName: 'Error'
    }
  }
}

// Función para obtener estadísticas de uso
export async function getUserUsageStats(userId) {
  try {
    const usage = await getCurrentMonthUsage(userId)
    
    return {
      currentMonth: {
        articles: usage.articlesGenerated,
        posts: usage.postsGenerated
      },
      // Aquí podríamos agregar estadísticas de meses anteriores
      lastUpdated: usage.lastUpdated
    }
  } catch (error) {
    console.error('Error getting usage stats:', error)
    return {
      currentMonth: {
        articles: 0,
        posts: 0
      },
      lastUpdated: new Date()
    }
  }
}

// Función para reiniciar contadores (para testing o administración)
export async function resetUserUsage(userId, month = null, year = null) {
  try {
    const client = await clientPromise
    const db = client.db('linkedai')
    const collection = db.collection(USAGE_COLLECTION)
    
    const now = new Date()
    const targetMonth = month || now.getMonth() + 1
    const targetYear = year || now.getFullYear()
    
    await collection.updateOne(
      { userId, month: targetMonth, year: targetYear },
      {
        $set: {
          articlesGenerated: 0,
          postsGenerated: 0,
          lastUpdated: new Date()
        }
      }
    )
    
    return true
  } catch (error) {
    console.error('Error resetting usage:', error)
    throw error
  }
}
