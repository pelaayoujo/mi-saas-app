import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../../../../lib/auth'
import clientPromise from '../../../../lib/mongodb'
import { ObjectId } from 'mongodb'
import { getCurrentMonthUsage } from '../../../../lib/usageTracker'
import { getUserPlanFromDB } from '../../../../lib/permissions'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    console.log('🔍 Session en user/stats:', session)
    
    if (!session) {
      console.log('❌ No hay sesión')
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
    }

    const client = await clientPromise
    const db = client.db(process.env.MONGODB_DB || 'miSaaS')
    
    // Obtener datos del usuario primero
    console.log('🔍 Buscando usuario con email:', session.user.email)
    const userData = await db.collection('users').findOne({ 
      email: session.user.email 
    })
    
    console.log('🔍 Datos del usuario encontrados:', userData)

    if (!userData) {
      console.log('❌ Usuario no encontrado en DB')
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 })
    }

    // Contar artículos usando tanto userId como email por compatibilidad
    let articlesCount
    if (session.user.id && session.user.id !== session.user.email) {
      // Si userId es un ObjectId válido
      try {
        articlesCount = await db.collection('articles').countDocuments({ 
          $or: [
            { userId: session.user.id },
            { userEmail: session.user.email },
            { userId: new ObjectId(session.user.id) }
          ]
        })
      } catch (error) {
        // Fallback a email si ObjectId falla
        articlesCount = await db.collection('articles').countDocuments({ 
          userEmail: session.user.email 
        })
      }
    } else {
      // Fallback a email
      articlesCount = await db.collection('articles').countDocuments({ 
        userEmail: session.user.email 
      })
    }

    // Obtener información de uso del mes actual y plan
    const userPlan = await getUserPlanFromDB(session.user.email)
    const monthlyUsage = await getCurrentMonthUsage(session.user.email)
    
    // Calcular días restantes basado en el plan
    const getDaysRemaining = (plan, creditos, usageData, planData) => {
      if (plan === 'admin' || plan === 'enterprise') {
        return 'Ilimitado'
      }
      
      // Para trial: usar artículos
      if (plan === 'trial') {
        const used = usageData?.articlesGenerated || 0
        const limit = planData?.limits?.articlesPerMonth || 3
        const remaining = Math.max(0, limit - used)
        return remaining > 0 ? `${remaining} artículos restantes` : 'Sin artículos restantes'
      }
      
      // Para planes pagos: usar tokens
      const used = usageData?.tokensUsed || 0
      const limit = planData?.limits?.tokensPerMonth || 0
      const remaining = Math.max(0, limit - used)
      return remaining > 0 ? `${remaining.toLocaleString()} tokens restantes` : 'Sin tokens restantes'
    }

    const stats = {
      articlesCreated: articlesCount,
      plan: userData?.plan || 'trial',
      creditos: userData?.creditos || 0,
      tokensUsed: monthlyUsage?.tokensUsed || 0,
      articlesUsed: monthlyUsage?.articlesGenerated || 0,
      daysRemaining: getDaysRemaining(
        userData?.plan || 'trial', 
        userData?.creditos || 0,
        monthlyUsage,
        userPlan
      ),
      monthlyUsage: {
        articles: monthlyUsage?.articlesGenerated || 0,
        tokens: monthlyUsage?.tokensUsed || 0
      },
      planLimits: userPlan?.limits || {},
      userData: {
        plan: userData?.plan || 'trial',
        creditos: userData?.creditos || 0,
        status: userData?.status || 'activo',
        fechaRegistro: userData?.fechaRegistro || new Date()
      }
    }
    
    console.log('📊 Estadísticas finales enviadas:', stats)
    
    return NextResponse.json({
      success: true,
      stats: stats
    })

  } catch (error) {
    console.error('Error obteniendo estadísticas del usuario:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
