// Sistema de permisos y límites de uso
import { clientPromise } from './mongodb'

// Configuración de planes
export const PLANS = {
  ADMIN: {
    id: 'admin',
    name: 'Administrador',
    price: 0,
    limits: {
      postsPerMonth: -1, // Ilimitado
      articlesPerMonth: -1, // Ilimitado
      tokensPerMonth: -1, // Ilimitado
      features: ['all'] // Todas las características
    }
  },
  TRIAL: {
    id: 'trial',
    name: 'Plan de Prueba',
    price: 0,
    limits: {
      postsPerMonth: 3,
      articlesPerMonth: 3, // Límite de 3 artículos
      features: ['articles', 'biography']
    }
  },
  BASIC: {
    id: 'basic',
    name: 'Plan Básico',
    price: 12,
    limits: {
      postsPerMonth: 15,
      articlesPerMonth: 5, // Mantener para backward compatibility
      tokensPerMonth: 4500, // ~12-15 posts (300 tokens promedio por post)
      features: ['articles', 'biography']
    }
  },
  PROFESSIONAL: {
    id: 'professional',
    name: 'Plan Profesional',
    price: 20,
    limits: {
      postsPerMonth: 40,
      articlesPerMonth: 20, // Mantener para backward compatibility
      tokensPerMonth: 12000, // ~40 posts (300 tokens promedio por post)
      features: ['articles', 'biography', 'scheduling', 'analytics']
    }
  },
  ENTERPRISE: {
    id: 'enterprise',
    name: 'Plan Empresarial',
    price: 35,
    limits: {
      postsPerMonth: 100,
      articlesPerMonth: -1, // Ilimitado
      tokensPerMonth: 30000, // ~100 posts (300 tokens promedio por post)
      features: ['all']
    }
  }
}

// Sistema simple: solo usuarios en leads + user_authorizations pueden usar la app

// Función para verificar si un usuario está autorizado para registrarse (desde MongoDB)
export async function isUserAuthorized(email) {
  try {
    // Verificar fallback primero (usuarios críticos)
    const normalizedEmail = email.toLowerCase().trim()
    if (normalizedEmail in AUTHORIZED_USERS) {
      return true
    }

    // Consultar MongoDB
    const client = await clientPromise
    const db = client.db(process.env.MONGODB_DB || 'miSaaS')
    const authorizationsCollection = db.collection('user_authorizations')
    
    try {
      const authorization = await authorizationsCollection.findOne({ 
        email: normalizedEmail 
      })
      
      return !!authorization
    } catch (collectionError) {
      // Si la colección no existe, retornar false (no autorizado)
      console.log('Colección user_authorizations no existe aún:', collectionError.message)
      return false
    }
  } catch (error) {
    console.error('Error verificando autorización:', error)
    // Fallback: solo usuarios en código si hay error de DB
    const normalizedEmail = email.toLowerCase().trim()
    return normalizedEmail in AUTHORIZED_USERS
  }
}

// Función para obtener el plan específico asignado a un usuario (desde MongoDB)
export async function getAssignedPlan(email) {
  try {
    const normalizedEmail = email.toLowerCase().trim()
    
    // Verificar fallback primero (usuarios críticos)
    if (normalizedEmail in AUTHORIZED_USERS) {
      return AUTHORIZED_USERS[normalizedEmail]
    }

    // Consultar MongoDB
    const client = await clientPromise
    const db = client.db(process.env.MONGODB_DB || 'miSaaS')
    const authorizationsCollection = db.collection('user_authorizations')
    
    try {
      const authorization = await authorizationsCollection.findOne({ 
        email: normalizedEmail 
      })
      
      return authorization ? authorization.plan : null
    } catch (collectionError) {
      // Si la colección no existe, retornar null (no autorizado)
      console.log('Colección user_authorizations no existe aún:', collectionError.message)
      return null
    }
  } catch (error) {
    console.error('Error obteniendo plan asignado:', error)
    // Fallback: solo usuarios en código si hay error de DB
    const normalizedEmail = email.toLowerCase().trim()
    return AUTHORIZED_USERS[normalizedEmail] || null
  }
}

// Función para verificar si un usuario está autorizado para plan TRIAL (backward compatibility)
export async function isAuthorizedForTrial(email) {
  const assignedPlan = await getAssignedPlan(email)
  return assignedPlan === 'trial'
}

// Función para obtener el plan de un usuario (síncrona - para casos simples)
export function getUserPlan(email) {
  try {
    // Solo manejar usuarios especiales de forma síncrona
    if (SPECIAL_USERS[email]) {
      return PLANS[SPECIAL_USERS[email].plan.toUpperCase()]
    }
    
    // Para usuarios no especiales, retornar null
    // La verificación completa debe hacerse con getUserPlanFromDB
    return null
  } catch (error) {
    console.error('Error en getUserPlan:', error)
    return null
  }
}

// Función asíncrona para obtener el plan desde la base de datos
export async function getUserPlanFromDB(email) {
  try {
    console.log('🔍 getUserPlanFromDB llamado para:', email)
    
    const client = await clientPromise
    const db = client.db(process.env.MONGODB_DB || 'miSaaS')
    
    // Solo usuarios registrados pueden usar la app
    const usersCollection = db.collection('users')
    const user = await usersCollection.findOne({ email: email.toLowerCase().trim() })
    
    console.log('👤 Usuario encontrado en DB:', !!user)
    if (user) {
      console.log('👤 Plan del usuario en DB:', user.plan)
    }
    
    if (!user) {
      console.log('❌ Usuario no registrado')
      return null // No registrado = no acceso
    }
    
    // Verificar que esté autorizado
    const authorizationsCollection = db.collection('user_authorizations')
    const authorization = await authorizationsCollection.findOne({ email: email.toLowerCase().trim() })
    
    console.log('🔐 Autorización encontrada:', !!authorization)
    if (authorization) {
      console.log('🔐 Plan en autorización:', authorization.plan)
    }
    
    if (!authorization) {
      console.log('❌ Usuario no autorizado')
      return null // No autorizado = no acceso
    }
    
    // Retornar el plan según la autorización
    const planId = authorization.plan || user.plan
    console.log('📋 Plan ID final:', planId, 'tipo:', typeof planId)
    
    if (planId && typeof planId === 'string' && PLANS[planId.toUpperCase()]) {
      console.log('✅ Plan válido encontrado:', planId.toUpperCase())
      return PLANS[planId.toUpperCase()]
    }
    
    console.log('❌ Plan no válido:', planId, 'tipo:', typeof planId)
    return null
    
  } catch (error) {
    console.error('❌ Error obteniendo plan del usuario:', error)
    return null
  }
}

// Función para verificar si un usuario tiene acceso ilimitado
export function hasUnlimitedAccess(email) {
  const userPlan = getUserPlan(email)
  return userPlan.id === 'admin' || userPlan.limits.postsPerMonth === -1
}

// Función para verificar si un usuario puede usar una característica
export function canUseFeature(email, feature) {
  const userPlan = getUserPlan(email)
  
  // Admin puede usar todo
  if (userPlan.id === 'admin') {
    return true
  }
  
  // Verificar si la característica está en el plan
  return userPlan.limits.features.includes('all') || 
         userPlan.limits.features.includes(feature)
}

// Función para obtener límites de uso
export function getUserLimits(email) {
  const userPlan = getUserPlan(email)
  return userPlan.limits
}

// Función para verificar si un usuario puede generar contenido
export async function canGenerateContent(email, contentType = 'article') {
  try {
    console.log('🔐 canGenerateContent llamado para:', email)
    
    if (!email) {
      console.log('❌ Email no proporcionado')
      return { allowed: false, reason: 'Email requerido' }
    }
    
    // Solo usuarios registrados con plan válido pueden usar la app
    const userPlan = await getUserPlanFromDB(email)
    
    if (!userPlan) {
      console.log('❌ Usuario sin plan válido')
      return { allowed: false, reason: 'No tienes permisos para usar esta herramienta' }
    }
    
    console.log('✅ Usuario autorizado con plan:', userPlan.id)
    return { allowed: true, reason: null }
    
  } catch (error) {
    console.error('❌ Error en canGenerateContent:', error)
    return { allowed: false, reason: 'Error verificando permisos' }
  }
}

// Función para obtener el mensaje de upgrade
export function getUpgradeMessage(email, feature) {
  const userPlan = getUserPlan(email)
  
  if (userPlan.id === 'admin') {
    return null // No necesita upgrade
  }
  
  const upgradePlans = Object.values(PLANS).filter(plan => {
    if (plan.id === 'admin') return false
    return plan.limits.features.includes('all') || 
           plan.limits.features.includes(feature)
  })
  
  if (upgradePlans.length === 0) {
    return {
      title: 'Característica no disponible',
      message: 'Esta característica no está disponible en ningún plan.',
      action: null
    }
  }
  
  const recommendedPlan = upgradePlans[0] // El plan más básico que incluye la característica
  
  return {
    title: 'Upgrade requerido',
    message: `Para usar ${feature}, necesitas el ${recommendedPlan.name}.`,
    action: {
      text: `Upgrade a ${recommendedPlan.name}`,
      href: '/dashboard/billing'
    }
  }
}
