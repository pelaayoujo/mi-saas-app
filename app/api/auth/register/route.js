import { NextResponse } from 'next/server'
import clientPromise from '../../../../lib/mongodb'
import bcrypt from 'bcryptjs'
import { sendRegistrationConfirmation } from '../../../../lib/email'
// Removido: import de permissions - ahora se hace directo en MongoDB

export async function POST(request) {
  try {
    const body = await request.json()
    const { email, password, nombre, nicho } = body

    // Validación básica
    if (!email || !password || !nombre) {
      return NextResponse.json(
        { error: 'Email, contraseña y nombre son requeridos' },
        { status: 400 }
      )
    }

    // Validación de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      )
    }

    // Validación de contraseña
    if (password.length < 6) {
      return NextResponse.json(
        { error: 'La contraseña debe tener al menos 6 caracteres' },
        { status: 400 }
      )
    }

    const client = await clientPromise
    const db = client.db(process.env.MONGODB_DB || 'miSaaS')

    // SIMPLIFICADO: Solo dos verificaciones
    const normalizedEmail = email.toLowerCase().trim()
    
    // 1. Verificar que esté en leads
    const leadsCollection = db.collection('leads')
    const lead = await leadsCollection.findOne({ email: normalizedEmail })

    if (!lead) {
      return NextResponse.json(
        { error: 'Este email no está en nuestra lista de invitados' },
        { status: 403 }
      )
    }

    // 2. Verificar que esté autorizado en user_authorizations
    const authorizationsCollection = db.collection('user_authorizations')
    const authorization = await authorizationsCollection.findOne({ email: normalizedEmail })

    if (!authorization) {
      return NextResponse.json(
        { error: 'No tienes permisos para registrarte aún' },
        { status: 403 }
      )
    }

    const assignedPlan = authorization.plan

    // Verificar que no exista ya una cuenta de usuario
    const usersCollection = db.collection('users')
    const existingUser = await usersCollection.findOne({ 
      email: email.toLowerCase().trim() 
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'Ya existe una cuenta con este email' },
        { status: 409 }
      )
    }

    // Hash de la contraseña
    const saltRounds = 12
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    // Usar el plan específico asignado en AUTHORIZED_USERS
    const userPlan = assignedPlan

    // Determinar créditos basado en el plan
    const getCreditsForPlan = (plan) => {
      switch (plan) {
        case 'trial': return 3
        case 'basic': return 5
        case 'professional': return 20
        case 'enterprise': return -1 // Ilimitado
        case 'admin': return -1 // Ilimitado
        default: return 0
      }
    }

    // Crear el usuario
    const user = {
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      nombre: nombre.trim(),
      nicho: nicho || lead.nicho || '',
      fechaRegistro: new Date(),
      fechaLead: lead.fecha,
      status: 'activo',
      plan: userPlan, // Plan específico asignado
      creditos: getCreditsForPlan(userPlan),
      ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
    }

    const result = await usersCollection.insertOne(user)

    // Actualizar el lead para marcar que ya se registró
    await leadsCollection.updateOne(
      { _id: lead._id },
      { 
        $set: { 
          status: 'registrado',
          fechaRegistro: new Date(),
          userId: result.insertedId
        }
      }
    )

    // Email desactivado - Solo registro manual
    console.log('Usuario registrado:', { email, nombre, nicho })

    return NextResponse.json({
      success: true,
      message: 'Usuario registrado exitosamente.',
      userId: result.insertedId,
      user: {
        id: result.insertedId,
        email: user.email,
        nombre: user.nombre,
        nicho: user.nicho,
        plan: user.plan,
        creditos: user.creditos
      }
    })

  } catch (error) {
    console.error('Error al registrar usuario:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
