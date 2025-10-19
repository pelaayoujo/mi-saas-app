import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../../../../lib/auth'
import clientPromise from '../../../../lib/mongodb'
import { ObjectId } from 'mongodb'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
    }

    const client = await clientPromise
    const db = client.db(process.env.MONGODB_DB || 'miSaaS')
    
    // Obtener datos del usuario primero
    const userData = await db.collection('users').findOne({ 
      email: session.user.email 
    })

    if (!userData) {
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

    // Calcular días restantes basado en el plan
    const getDaysRemaining = (plan, creditos) => {
      if (plan === 'admin' || plan === 'enterprise') {
        return 'Ilimitado'
      }
      
      // Para planes limitados, calcular basado en créditos restantes
      if (plan === 'trial') {
        return creditos > 0 ? `${creditos} artículos restantes` : 'Sin créditos'
      }
      
      return 'Activo'
    }

    return NextResponse.json({
      success: true,
      stats: {
        articlesCreated: articlesCount,
        plan: userData?.plan || 'trial',
        creditos: userData?.creditos || 0,
        daysRemaining: getDaysRemaining(userData?.plan || 'trial', userData?.creditos || 0),
        userData: {
          plan: userData?.plan || 'trial',
          creditos: userData?.creditos || 0,
          status: userData?.status || 'activo'
        }
      }
    })

  } catch (error) {
    console.error('Error obteniendo estadísticas del usuario:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
