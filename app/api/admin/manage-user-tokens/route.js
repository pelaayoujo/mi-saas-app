import { NextResponse } from 'next/server'
import clientPromise from '../../../../lib/mongodb'
import { requireAdmin } from '../../../../lib/authMiddleware'
import { getCurrentMonthUsage } from '../../../../lib/usageTracker'

export async function POST(request) {
  try {
    // Verificar que el usuario es admin
    const adminResult = await requireAdmin(request)
    if (!adminResult.success) {
      return NextResponse.json(
        { error: adminResult.error },
        { status: adminResult.status }
      )
    }

    const body = await request.json()
    const { email, action, amount, reason = '' } = body

    // Validaciones
    if (!email || !action || !amount) {
      return NextResponse.json(
        { error: 'Email, acción y cantidad son requeridos' },
        { status: 400 }
      )
    }

    const validActions = ['add', 'reset', 'set']
    if (!validActions.includes(action)) {
      return NextResponse.json(
        { error: `Acción inválida. Acciones válidas: ${validActions.join(', ')}` },
        { status: 400 }
      )
    }

    if (typeof amount !== 'number' || amount < 0) {
      return NextResponse.json(
        { error: 'La cantidad debe ser un número positivo' },
        { status: 400 }
      )
    }

    const client = await clientPromise
    const db = client.db(process.env.MONGODB_DB || 'miSaaS')
    const usersCollection = db.collection('users')
    const usageCollection = db.collection('usage_tracking')

    // Verificar que el usuario existe
    const user = await usersCollection.findOne({ 
      email: email.toLowerCase().trim() 
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Usuario no encontrado' },
        { status: 404 }
      )
    }

    // Obtener uso actual del mes
    const currentUsage = await getCurrentMonthUsage(user.email)
    let newTokensUsed = currentUsage.tokensUsed || 0

    // Aplicar la acción
    switch (action) {
      case 'add':
        newTokensUsed = Math.max(0, newTokensUsed - amount) // Reducir tokens usados = dar más tokens disponibles
        break
      case 'set':
        newTokensUsed = Math.max(0, amount) // Establecer tokens usados directamente
        break
      case 'reset':
        newTokensUsed = 0 // Resetear uso a 0
        break
    }

    // Actualizar el registro de uso
    await usageCollection.updateOne(
      {
        userId: user.email,
        month: currentUsage.month,
        year: currentUsage.year
      },
      {
        $set: {
          tokensUsed: newTokensUsed,
          lastUpdated: new Date(),
          adminAdjustment: {
            action,
            amount,
            reason,
            adjustedBy: adminResult.user.email,
            adjustedAt: new Date()
          }
        }
      }
    )

    // Log de la acción administrativa
    console.log(`Admin ${adminResult.user.email} ${action} tokens para ${email}: ${amount}, razón: ${reason}`)

    return NextResponse.json({
      success: true,
      message: `Tokens ${action === 'add' ? 'añadidos' : action === 'set' ? 'establecidos' : 'reseteados'} exitosamente`,
      details: {
        email,
        action,
        amount,
        previousTokensUsed: currentUsage.tokensUsed || 0,
        newTokensUsed,
        reason,
        adjustedBy: adminResult.user.email,
        adjustedAt: new Date()
      }
    })

  } catch (error) {
    console.error('Error administrando tokens:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor', details: error.message },
      { status: 500 }
    )
  }
}

export async function GET(request) {
  try {
    // Verificar que el usuario es admin
    const adminResult = await requireAdmin(request)
    if (!adminResult.success) {
      return NextResponse.json(
        { error: adminResult.error },
        { status: adminResult.status }
      )
    }

    const url = new URL(request.url)
    const email = url.searchParams.get('email')

    const client = await clientPromise
    const db = client.db(process.env.MONGODB_DB || 'miSaaS')
    const usageCollection = db.collection('usage_tracking')

    if (email) {
      // Obtener uso de un usuario específico
      const currentUsage = await getCurrentMonthUsage(email)
      return NextResponse.json({
        success: true,
        userUsage: currentUsage
      })
    } else {
      // Obtener uso de todos los usuarios del mes actual
      const now = new Date()
      const month = now.getMonth() + 1
      const year = now.getFullYear()

      const allUsage = await usageCollection
        .find({ month, year })
        .sort({ tokensUsed: -1 })
        .toArray()

      return NextResponse.json({
        success: true,
        currentMonth: { month, year },
        allUsage
      })
    }

  } catch (error) {
    console.error('Error obteniendo información de tokens:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
