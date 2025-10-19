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
      postsPerMonth: 50,
      articlesPerMonth: 5,
      features: ['articles', 'biography']
    }
  },
  PROFESSIONAL: {
    id: 'professional',
    name: 'Plan Profesional',
    price: 20,
    limits: {
      postsPerMonth: 200,
      articlesPerMonth: 20,
      features: ['articles', 'biography', 'scheduling', 'analytics']
    }
  },
  ENTERPRISE: {
    id: 'enterprise',
    name: 'Plan Empresarial',
    price: 30,
    limits: {
      postsPerMonth: -1, // Ilimitado
      articlesPerMonth: -1, // Ilimitado
      features: ['all']
    }
  }
}

// Usuarios con permisos especiales
export const SPECIAL_USERS = {
  'user@test.com': {
    plan: 'admin',
    permissions: ['unlimited', 'admin_access']
  }
}

// Sistema de autorización de usuarios con planes específicos
// AHORA DESDE MONGODB - Colección: user_authorizations

// Fallback hardcoded para usuarios críticos (opcional)
export const AUTHORIZED_USERS = {
  'user@test.com': 'admin', // Usuario de prueba siempre autorizado
}

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
    const db = client.db(process.env.MONGODB_DB || 'linkedai')
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
    const db = client.db(process.env.MONGODB_DB || 'linkedai')
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
  // Verificar si es usuario especial
  if (SPECIAL_USERS[email]) {
    return PLANS[SPECIAL_USERS[email].plan.toUpperCase()]
  }
  
  // Verificar si está autorizado y obtener su plan asignado
  const assignedPlan = getAssignedPlan(email)
  if (assignedPlan && PLANS[assignedPlan.toUpperCase()]) {
    return PLANS[assignedPlan.toUpperCase()]
  }
  
  // Si no está autorizado o plan no válido, no tiene acceso
  return null
}

// Función asíncrona para obtener el plan desde la base de datos
export async function getUserPlanFromDB(email) {
  try {
    // Verificar si es usuario especial primero
    if (SPECIAL_USERS[email]) {
      return PLANS[SPECIAL_USERS[email].plan.toUpperCase()]
    }

    const client = await clientPromise
    const db = client.db(process.env.MONGODB_DB || 'linkedai')
    const usersCollection = db.collection('users')
    
    const user = await usersCollection.findOne({ email: email.toLowerCase().trim() })
    
    if (!user) {
      // Si no existe, verificar autorización y plan asignado
      const assignedPlan = await getAssignedPlan(email)
      if (assignedPlan && PLANS[assignedPlan.toUpperCase()]) {
        return PLANS[assignedPlan.toUpperCase()]
      }
      return null // No autorizado
    }
    
    // Determinar el plan basado en el campo 'plan' del usuario o plan asignado
    const assignedPlan = await getAssignedPlan(email)
    const planId = user.plan || assignedPlan || null
    if (planId && PLANS[planId.toUpperCase()]) {
      return PLANS[planId.toUpperCase()]
    }
    
    // Si no encuentra el plan válido, retornar null (no autorizado)
    return null
    
  } catch (error) {
    console.error('Error obteniendo plan del usuario:', error)
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
export function canGenerateContent(email, contentType = 'article') {
  const userPlan = getUserPlan(email)
  
  // Admin puede generar todo
  if (userPlan.id === 'admin') {
    return { allowed: true, reason: null }
  }
  
  // Verificar límites según el tipo de contenido
  if (contentType === 'article') {
    if (userPlan.limits.articlesPerMonth === -1) {
      return { allowed: true, reason: null }
    }
    // Aquí necesitaríamos verificar el uso actual del mes
    // Por ahora retornamos permitido
    return { allowed: true, reason: null }
  }
  
  if (contentType === 'post') {
    if (userPlan.limits.postsPerMonth === -1) {
      return { allowed: true, reason: null }
    }
    // Aquí necesitaríamos verificar el uso actual del mes
    // Por ahora retornamos permitido
    return { allowed: true, reason: null }
  }
  
  return { allowed: false, reason: 'Tipo de contenido no válido' }
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
