// Middleware para verificar permisos y autenticación
import { getServerSession } from 'next-auth/next'
import { authOptions } from './auth'
import { getUserPlan, canUseFeature, canGenerateContent } from './permissions'
import { canUserGenerateContent } from './usageTracker'

// Función para verificar autenticación básica
export async function requireAuth(req) {
  const session = await getServerSession(req, null, authOptions)
  
  if (!session) {
    return {
      success: false,
      error: 'No autenticado',
      status: 401
    }
  }
  
  return {
    success: true,
    user: session.user
  }
}

// Función para verificar si el usuario puede usar una característica específica
export async function requireFeature(req, feature) {
  const authResult = await requireAuth(req)
  
  if (!authResult.success) {
    return authResult
  }
  
  const user = authResult.user
  const canUse = canUseFeature(user.email, feature)
  
  if (!canUse) {
    return {
      success: false,
      error: `No tienes permisos para usar ${feature}`,
      status: 403,
      upgradeRequired: true
    }
  }
  
  return {
    success: true,
    user
  }
}

// Función para verificar si el usuario puede generar contenido
export async function requireContentGeneration(req, contentType = 'article') {
  const authResult = await requireAuth(req)
  
  if (!authResult.success) {
    return authResult
  }
  
  const user = authResult.user
  
  // Verificar permisos básicos
  const canGenerate = canGenerateContent(user.email, contentType)
  
  if (!canGenerate.allowed) {
    return {
      success: false,
      error: canGenerate.reason,
      status: 403,
      upgradeRequired: true
    }
  }
  
  // Verificar límites de uso (por ahora permitimos todo)
  const usageCheck = await canUserGenerateContent(user.email, contentType)
  
  if (!usageCheck.canGenerate) {
    return {
      success: false,
      error: `Has alcanzado el límite de ${contentType}s para este mes`,
      status: 403,
      upgradeRequired: true,
      usageInfo: usageCheck
    }
  }
  
  return {
    success: true,
    user,
    usageInfo: usageCheck
  }
}

// Función para verificar si el usuario es admin
export async function requireAdmin(req) {
  const authResult = await requireAuth(req)
  
  if (!authResult.success) {
    return authResult
  }
  
  const user = authResult.user
  const userPlan = getUserPlan(user.email)
  
  if (userPlan.id !== 'admin') {
    return {
      success: false,
      error: 'Se requieren permisos de administrador',
      status: 403
    }
  }
  
  return {
    success: true,
    user
  }
}

// Función helper para manejar respuestas de error
export function handleAuthError(result, res) {
  if (result.upgradeRequired) {
    return res.status(result.status).json({
      success: false,
      error: result.error,
      upgradeRequired: true,
      upgradeMessage: {
        title: 'Upgrade requerido',
        message: 'Necesitas actualizar tu plan para usar esta característica.',
        action: {
          text: 'Ver planes',
          href: '/dashboard/billing'
        }
      }
    })
  }
  
  return res.status(result.status).json({
    success: false,
    error: result.error
  })
}

// Función para obtener información del usuario y su plan
export async function getUserInfo(req) {
  const authResult = await requireAuth(req)
  
  if (!authResult.success) {
    return authResult
  }
  
  const user = authResult.user
  const userPlan = getUserPlan(user.email)
  
  return {
    success: true,
    user,
    plan: userPlan
  }
}
