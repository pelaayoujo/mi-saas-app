import { NextResponse } from 'next/server'
import clientPromise from '../../../../lib/mongodb'
import { requireAdmin } from '../../../../lib/authMiddleware'

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

    const { email, plan } = await request.json()

    // Validaciones
    if (!email || !plan) {
      return NextResponse.json(
        { error: 'Email y plan son requeridos' },
        { status: 400 }
      )
    }

    const validPlans = ['trial', 'basic', 'professional', 'enterprise', 'admin']
    if (!validPlans.includes(plan)) {
      return NextResponse.json(
        { error: `Plan inválido. Planes válidos: ${validPlans.join(', ')}` },
        { status: 400 }
      )
    }

    const client = await clientPromise
    const db = client.db(process.env.MONGODB_DB || 'linkedai')
    const authorizationsCollection = db.collection('user_authorizations')

    // Crear índice único en email
    await authorizationsCollection.createIndex({ email: 1 }, { unique: true })

    // Insertar o actualizar autorización
    const authorization = {
      email: email.toLowerCase().trim(),
      plan: plan,
      authorizedAt: new Date(),
      authorizedBy: adminResult.user.email,
      status: 'active'
    }

    await authorizationsCollection.replaceOne(
      { email: authorization.email },
      authorization,
      { upsert: true }
    )

    return NextResponse.json({
      success: true,
      message: `Usuario ${email} autorizado con plan ${plan}`,
      authorization
    })

  } catch (error) {
    console.error('Error autorizando usuario:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
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

    const client = await clientPromise
    const db = client.db(process.env.MONGODB_DB || 'linkedai')
    const authorizationsCollection = db.collection('user_authorizations')

    const authorizations = await authorizationsCollection
      .find({})
      .sort({ authorizedAt: -1 })
      .toArray()

    return NextResponse.json({
      success: true,
      authorizations
    })

  } catch (error) {
    console.error('Error obteniendo autorizaciones:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
