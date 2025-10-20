// Middleware para verificar permisos y autenticación
import { getServerSession } from 'next-auth/next'
import { NextResponse } from 'next/server'
import { authOptions } from './auth'
import { getUserPlan, canUseFeature, canGenerateContent } from './permissions'
import { canUserGenerateContent } from './usageTracker'

// Función para verificar autenticación básica
export async function requireAuth(req = null) {
  const session = await getServerSession(authOptions)
  
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
export async function requireFeature(request, feature) {
  const authResult = await requireAuth()
  
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
export async function requireContentGeneration(request, contentType = 'article') {
  try {
    console.log('🔐 requireContentGeneration iniciado para:', contentType)
    
    const authResult = await requireAuth()
    console.log('🔐 authResult:', authResult.success ? 'OK' : authResult.error)
    
    if (!authResult.success) {
      return authResult
    }
    
    const user = authResult.user
    console.log('👤 Usuario para verificar:', user)
    console.log('👤 Email del usuario:', user?.email)
    
    // Validar que el usuario tenga email
    if (!user || !user.email) {
      console.log('❌ Usuario sin email válido')
      return {
        success: false,
        error: 'Datos de usuario inválidos',
        status: 400
      }
    }
    
    // Verificar permisos básicos
    try {
      const canGenerate = await canGenerateContent(user.email, contentType)
      console.log('✅ Permisos básicos:', canGenerate.allowed)
      
      if (!canGenerate.allowed) {
        return {
          success: false,
          error: canGenerate.reason,
          status: 403,
          upgradeRequired: true
        }
      }
    } catch (permError) {
      console.error('❌ Error verificando permisos básicos:', permError)
      return {
        success: false,
        error: 'Error verificando permisos',
        status: 500
      }
    }
    
    // Verificar límites de uso
    let usageCheck
    try {
      usageCheck = await canUserGenerateContent(user.email, contentType)
      console.log('📊 Verificación de uso:', usageCheck.canGenerate)
    } catch (usageError) {
      console.error('❌ Error verificando límites de uso:', usageError)
      // Si hay error en verificación de uso, permitir pero logear
      usageCheck = { canGenerate: true, currentUsage: 0, limit: -1, remaining: -1, planName: 'Unknown' }
    }
  
  if (!usageCheck.canGenerate) {
    const contentTypeSpanish = contentType === 'article' ? 'artículos' : 'posts'
    
    // Mensaje específico según el tipo de límite
    let limitMessage, usedMessage
    if (usageCheck.limitType === 'tokens') {
      limitMessage = `${usageCheck.limit} tokens por mes`
      usedMessage = `${usageCheck.currentUsage} tokens del plan ${usageCheck.planName}`
    } else {
      limitMessage = `${usageCheck.limit} ${contentTypeSpanish} por mes`
      usedMessage = `${usageCheck.currentUsage} ${contentTypeSpanish} del plan ${usageCheck.planName}`
    }
    
    return {
      success: false,
      error: `Has alcanzado tu límite de ${limitMessage} (${usageCheck.planName}). Usados: ${usageCheck.currentUsage}, Restantes: ${usageCheck.remaining}`,
      status: 403,
      upgradeRequired: true,
      usageInfo: usageCheck,
      upgradeMessage: {
        title: 'Límite alcanzado',
        message: `Has usado tus ${usedMessage}. Actualiza tu plan para generar más contenido.`,
        action: {
          text: 'Ver planes',
          href: '/dashboard/billing'
        }
      }
    }
  }
  
    return {
      success: true,
      user,
      usageInfo: usageCheck
    }
  } catch (mainError) {
    console.error('❌ Error principal en requireContentGeneration:', mainError)
    return {
      success: false,
      error: 'Error interno de autenticación',
      status: 500,
      details: mainError.message
    }
  }
}

// Función para verificar si el usuario es admin
export async function requireAdmin(request) {
  const authResult = await requireAuth()
  
  if (!authResult.success) {
    return authResult
  }
  
  const user = authResult.user
  
  // Verificar si tiene plan admin (desde MongoDB/sesión) o es el usuario de prueba
  if (user.plan !== 'admin' && user.email !== 'user@test.com') {
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
export function handleAuthError(result) {
  if (result.upgradeRequired) {
    return NextResponse.json({
      success: false,
      error: result.error,
      upgradeRequired: true,
      usageInfo: result.usageInfo || null,
      upgradeMessage: result.upgradeMessage || {
        title: 'Upgrade requerido',
        message: 'Necesitas actualizar tu plan para usar esta característica.',
        action: {
          text: 'Ver planes',
          href: '/dashboard/billing'
        }
      }
    }, { status: result.status })
  }
  
  return NextResponse.json({
    success: false,
    error: result.error
  }, { status: result.status })
}

// Función para obtener información del usuario y su plan
export async function getUserInfo(request) {
  const authResult = await requireAuth()
  
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
