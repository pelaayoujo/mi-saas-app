// Sistema de permisos y límites de uso

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

// Función para obtener el plan de un usuario
export function getUserPlan(email) {
  // Verificar si es usuario especial
  if (SPECIAL_USERS[email]) {
    return PLANS[SPECIAL_USERS[email].plan.toUpperCase()]
  }
  
  // Por defecto, plan básico para usuarios normales
  return PLANS.BASIC
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
