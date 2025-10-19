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

// Lista de usuarios autorizados para plan TRIAL (3 artículos)
export const TRIAL_AUTHORIZED_USERS = [
  // 🎯 AQUÍ DECIDES TÚ: Agrega solo los emails que quieres que tengan 3 artículos
  // Ejemplo:
  // 'usuario1@ejemplo.com',
  // 'usuario2@ejemplo.com', 
  // 'usuario3@ejemplo.com',
  // etc...
  
  // ⚠️  Si dejas vacío, TODOS reciben trial
  // ⚠️  Si agregas emails, solo ESOS reciben trial
]

// Función para verificar si un usuario está autorizado para plan TRIAL
export function isAuthorizedForTrial(email) {
  // Si no hay lista específica, todos están autorizados
  if (TRIAL_AUTHORIZED_USERS.length === 0) {
    return true
  }
  
  // Verificar si está en la lista autorizada
  return TRIAL_AUTHORIZED_USERS.includes(email.toLowerCase().trim())
}

// Función para obtener el plan de un usuario (síncrona - para casos simples)
export function getUserPlan(email) {
  // Verificar si es usuario especial
  if (SPECIAL_USERS[email]) {
    return PLANS[SPECIAL_USERS[email].plan.toUpperCase()]
  }
  
  // Verificar si está autorizado para trial, si no, plan básico
  if (isAuthorizedForTrial(email)) {
    return PLANS.TRIAL
  }
  
  // Plan básico para usuarios no autorizados
  return PLANS.BASIC
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
      // Si no existe, verificar autorización para trial
      return isAuthorizedForTrial(email) ? PLANS.TRIAL : PLANS.BASIC
    }
    
    // Determinar el plan basado en el campo 'plan' del usuario
    const planId = user.plan || (isAuthorizedForTrial(email) ? 'trial' : 'basic')
    const planKey = planId.toUpperCase()
    
    if (PLANS[planKey]) {
      return PLANS[planKey]
    }
    
    // Si no encuentra el plan, usar según autorización
    return isAuthorizedForTrial(email) ? PLANS.TRIAL : PLANS.BASIC
    
  } catch (error) {
    console.error('Error obteniendo plan del usuario:', error)
    return PLANS.TRIAL
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
