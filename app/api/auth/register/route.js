import { NextResponse } from 'next/server'
import clientPromise from '../../../../lib/mongodb'
import bcrypt from 'bcryptjs'
import { sendRegistrationConfirmation } from '../../../../lib/email'
import { isAuthorizedForTrial } from '../../../../lib/permissions'

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
    const db = client.db(process.env.MONGODB_DB)

    // Verificar que el email esté en la lista de leads
    const leadsCollection = db.collection('leads')
    const lead = await leadsCollection.findOne({ 
      email: email.toLowerCase().trim() 
    })

    if (!lead) {
      return NextResponse.json(
        { error: 'Este email no está en nuestra lista de invitados' },
        { status: 403 }
      )
    }

    // Verificar si el registro está activo (cuando decidas lanzar)
    // Por ahora está desactivado - solo los primeros 1000 podrán registrarse cuando actives el lanzamiento
    const REGISTRATION_ACTIVE = true // Activado temporalmente para crear usuarios de prueba
    const MAX_USERS = 1000
    
    if (!REGISTRATION_ACTIVE) {
      return NextResponse.json(
        { 
          error: 'Registro no disponible',
          message: 'El registro aún no está disponible. Te notificaremos cuando podamos crear tu cuenta.'
        },
        { status: 423 }
      )
    }

    // Cuando esté activo, solo los primeros X pueden registrarse
    const totalLeads = await leadsCollection.countDocuments()
    const leadPosition = await leadsCollection.countDocuments({
      fecha: { $lt: lead.fecha }
    }) + 1

    if (leadPosition > MAX_USERS) {
      return NextResponse.json(
        { 
          error: 'Lista de espera',
          message: 'Estás en la lista de espera. Te contactaremos cuando tengamos disponibilidad.',
          position: leadPosition,
          totalLeads: totalLeads
        },
        { status: 423 }
      )
    }

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

    // Determinar el plan inicial basado en autorización
    const initialPlan = isAuthorizedForTrial(email) ? 'trial' : 'basic'

    // Crear el usuario
    const user = {
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      nombre: nombre.trim(),
      nicho: nicho || lead.nicho || '',
      fechaRegistro: new Date(),
      fechaLead: lead.fecha,
      status: 'activo',
      plan: initialPlan, // Plan basado en autorización
      creditos: initialPlan === 'trial' ? 3 : 0, // 3 créditos para trial, 0 para basic
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
