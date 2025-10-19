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
  tokensUsed: 0,
  lastUpdated: new Date(),
  createdAt: new Date()
})

// Función para obtener o crear el registro de uso del mes actual
export async function getCurrentMonthUsage(userId) {
  try {
    const client = await clientPromise
    const db = client.db(process.env.MONGODB_DB || 'miSaaS')
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
    const db = client.db(process.env.MONGODB_DB || 'miSaaS')
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
    const db = client.db(process.env.MONGODB_DB || 'miSaaS')
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

// Función para incrementar el uso de tokens
export async function incrementTokenUsage(userId, tokensUsed) {
  try {
    const client = await clientPromise
    const db = client.db(process.env.MONGODB_DB || 'miSaaS')
    const collection = db.collection(USAGE_COLLECTION)
    
    const now = new Date()
    const month = now.getMonth() + 1
    const year = now.getFullYear()
    
    // Actualizar o crear registro con tokens
    await collection.updateOne(
      { userId, month, year },
      {
        $inc: { tokensUsed: tokensUsed },
        $set: { lastUpdated: new Date() }
      },
      { upsert: true }
    )
    
    return true
  } catch (error) {
    console.error('Error incrementing token usage:', error)
    throw error
  }
}

// Función híbrida: incrementar artículos y tokens (para planes pagos)
export async function incrementArticleAndTokenUsage(userId, tokensUsed) {
  try {
    const client = await clientPromise
    const db = client.db(process.env.MONGODB_DB || 'miSaaS')
    const collection = db.collection(USAGE_COLLECTION)
    
    const now = new Date()
    const month = now.getMonth() + 1
    const year = now.getFullYear()
    
    // Actualizar o crear registro con artículos y tokens
    await collection.updateOne(
      { userId, month, year },
      {
        $inc: { 
          articlesGenerated: 1,
          tokensUsed: tokensUsed
        },
        $set: { lastUpdated: new Date() }
      },
      { upsert: true }
    )
    
    return true
  } catch (error) {
    console.error('Error incrementing article and token usage:', error)
    throw error
  }
}

// Función para verificar si un usuario puede generar más contenido
export async function canUserGenerateContent(userId, contentType = 'article') {
  try {
    // Obtener el plan del usuario desde la base de datos primero
    const userPlan = await getUserPlanFromDB(userId)
    
    if (!userPlan) {
      return {
        canGenerate: false,
        currentUsage: 0,
        limit: 0,
        remaining: 0,
        planName: 'Sin plan'
      }
    }

    // ADMIN: Acceso ilimitado a todo
    if (userPlan.id === 'admin') {
      return {
        canGenerate: true,
        currentUsage: 0,
        limit: -1,
        remaining: -1,
        planName: userPlan.name,
        limitType: 'unlimited'
      }
    }

    const usage = await getCurrentMonthUsage(userId)
    
    if (contentType === 'article') {
      // SISTEMA HÍBRIDO: 
      // - TRIAL: Por número de artículos (3 max)
      // - Otros planes: Por tokens mensuales
      
      if (userPlan.id === 'trial') {
        // TRIAL: Control por artículos
        const limit = userPlan.limits.articlesPerMonth
        const currentUsage = usage.articlesGenerated || 0
        
        if (limit === -1) {
          return {
            canGenerate: true,
            currentUsage,
            limit: -1,
            remaining: -1,
            planName: userPlan.name,
            limitType: 'articles'
          }
        }
        
        const canGenerate = currentUsage < limit
        const remaining = Math.max(0, limit - currentUsage)
        
        return {
          canGenerate,
          currentUsage,
          limit,
          remaining,
          planName: userPlan.name,
          limitType: 'articles'
        }
      } else {
        // PLANES PAGOS: Control por tokens
        const tokenLimit = userPlan.limits.tokensPerMonth
        const currentTokens = usage.tokensUsed || 0
        
        if (tokenLimit === -1) {
          return {
            canGenerate: true,
            currentUsage: currentTokens,
            limit: -1,
            remaining: -1,
            planName: userPlan.name,
            limitType: 'tokens'
          }
        }
        
        const canGenerate = currentTokens < tokenLimit
        const remaining = Math.max(0, tokenLimit - currentTokens)
        
        return {
          canGenerate,
          currentUsage: currentTokens,
          limit: tokenLimit,
          remaining,
          planName: userPlan.name,
          limitType: 'tokens'
        }
      }
    }
    
    if (contentType === 'post') {
      // Para posts, mantener lógica actual
      const limit = userPlan.limits.postsPerMonth
      const currentUsage = usage.postsGenerated || 0
      
      if (limit === -1) {
        return {
          canGenerate: true,
          currentUsage,
          limit: -1,
          remaining: -1,
          planName: userPlan.name,
          limitType: 'posts'
        }
      }
      
      const canGenerate = currentUsage < limit
      const remaining = Math.max(0, limit - currentUsage)
      
      return {
        canGenerate,
        currentUsage,
        limit,
        remaining,
        planName: userPlan.name,
        limitType: 'posts'
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
        articles: usage.articlesGenerated || 0,
        posts: usage.postsGenerated || 0,
        tokens: usage.tokensUsed || 0
      },
      // Aquí podríamos agregar estadísticas de meses anteriores
      lastUpdated: usage.lastUpdated
    }
  } catch (error) {
    console.error('Error getting usage stats:', error)
    return {
      currentMonth: {
        articles: 0,
        posts: 0,
        tokens: 0
      },
      lastUpdated: new Date()
    }
  }
}

// Función para reiniciar contadores (para testing o administración)
export async function resetUserUsage(userId, month = null, year = null) {
  try {
    const client = await clientPromise
    const db = client.db(process.env.MONGODB_DB || 'miSaaS')
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
          tokensUsed: 0,
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
