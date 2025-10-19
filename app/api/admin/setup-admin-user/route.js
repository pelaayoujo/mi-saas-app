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

    // Hash de la contraseña
    const saltRounds = 12
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    let result
    let action

    if (existingUser) {
      // Actualizar usuario existente (cambiar contraseña y asegurar plan admin)
      await usersCollection.updateOne(
        { email: 'user@test.com' },
        {
          $set: {
            password: hashedPassword,
            nombre: 'Usuario Admin',
            nicho: 'Administración',
            status: 'activo',
            plan: 'admin',
            creditos: -1,
            updatedAt: new Date()
          }
        }
      )
      result = { insertedId: existingUser._id }
      action = 'actualizado'
    } else {
      // Crear nuevo usuario admin
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
      result = await usersCollection.insertOne(adminUser)
      action = 'creado'
    }

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
      message: `Usuario admin ${action} exitosamente`,
      details: {
        email: 'user@test.com',
        password: password,
        userId: result.insertedId,
        plan: 'admin',
        action: action
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
