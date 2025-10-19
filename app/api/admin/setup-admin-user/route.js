import { NextResponse } from 'next/server'
import clientPromise from '../../../../lib/mongodb'
import bcrypt from 'bcryptjs'

export async function POST(request) {
  try {
    const body = await request.json()
    const { password = 'admin123' } = body // Contraseña por defecto

    const client = await clientPromise
    const db = client.db(process.env.MONGODB_DB || 'miSaaS')
    
    // Verificar si el usuario ya existe
    const usersCollection = db.collection('users')
    const existingUser = await usersCollection.findOne({ 
      email: 'user@test.com' 
    })

    if (existingUser) {
      return NextResponse.json({
        success: false,
        message: 'El usuario user@test.com ya existe en la base de datos',
        email: 'user@test.com'
      })
    }

    // Hash de la contraseña
    const saltRounds = 12
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    // Crear el usuario admin
    const adminUser = {
      email: 'user@test.com',
      password: hashedPassword,
      nombre: 'Usuario Admin',
      nicho: 'Administración',
      fechaRegistro: new Date(),
      status: 'activo',
      plan: 'admin',
      creditos: -1, // Ilimitado
      ip: 'setup-script'
    }

    const result = await usersCollection.insertOne(adminUser)

    // También asegurar que esté en leads y user_authorizations
    const leadsCollection = db.collection('leads')
    const authorizationsCollection = db.collection('user_authorizations')

    // Crear lead si no existe
    await leadsCollection.updateOne(
      { email: 'user@test.com' },
      {
        $set: {
          email: 'user@test.com',
          fecha: new Date(),
          status: 'registrado',
          nicho: 'Administración',
          source: 'admin-setup'
        }
      },
      { upsert: true }
    )

    // Crear autorización si no existe
    await authorizationsCollection.updateOne(
      { email: 'user@test.com' },
      {
        $set: {
          email: 'user@test.com',
          plan: 'admin',
          authorizedAt: new Date(),
          authorizedBy: 'system-setup',
          status: 'active'
        }
      },
      { upsert: true }
    )

    return NextResponse.json({
      success: true,
      message: 'Usuario admin creado exitosamente',
      details: {
        email: 'user@test.com',
        password: password,
        userId: result.insertedId,
        plan: 'admin'
      }
    })

  } catch (error) {
    console.error('Error creando usuario admin:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor', details: error.message },
      { status: 500 }
    )
  }
}
