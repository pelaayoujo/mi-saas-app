import { NextResponse } from 'next/server'
import clientPromise from '../../../../lib/mongodb'
import bcrypt from 'bcryptjs'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email') || 'user@test.com'

    const client = await clientPromise
    const db = client.db(process.env.MONGODB_DB || 'miSaaS')
    
    console.log('🔍 Debugging user:', email)

    // Verificar en colección users
    const usersCollection = db.collection('users')
    const user = await usersCollection.findOne({ 
      email: email.toLowerCase().trim() 
    })
    
    console.log('👤 Usuario en DB:', user ? 'EXISTE' : 'NO EXISTE')
    
    // Verificar en colección leads
    const leadsCollection = db.collection('leads')
    const lead = await leadsCollection.findOne({ 
      email: email.toLowerCase().trim() 
    })
    
    // Verificar en colección user_authorizations
    const authorizationsCollection = db.collection('user_authorizations')
    const authorization = await authorizationsCollection.findOne({ 
      email: email.toLowerCase().trim() 
    })

    const debugInfo = {
      email: email,
      userExists: !!user,
      userData: user ? {
        nombre: user.nombre,
        plan: user.plan,
        status: user.status,
        fechaRegistro: user.fechaRegistro,
        hasPassword: !!user.password,
        passwordLength: user.password ? user.password.length : 0
      } : null,
      leadExists: !!lead,
      leadData: lead ? {
        fecha: lead.fecha,
        status: lead.status
      } : null,
      authorizationExists: !!authorization,
      authorizationData: authorization ? {
        plan: authorization.plan,
        status: authorization.status
      } : null
    }

    console.log('📊 Debug info:', debugInfo)

    return NextResponse.json(debugInfo)

  } catch (error) {
    console.error('Error en debug:', error)
    return NextResponse.json({ 
      error: 'Error interno', 
      details: error.message 
    }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const body = await request.json()
    const { email = 'user@test.com', password = 'admin123', testPassword } = body

    const client = await clientPromise
    const db = client.db(process.env.MONGODB_DB || 'miSaaS')
    
    const usersCollection = db.collection('users')
    const user = await usersCollection.findOne({ 
      email: email.toLowerCase().trim() 
    })

    if (!user) {
      return NextResponse.json({
        success: false,
        message: 'Usuario no encontrado en la base de datos'
      })
    }

    // Si se proporciona una contraseña para probar
    if (testPassword) {
      const isValidPassword = await bcrypt.compare(testPassword, user.password)
      
      return NextResponse.json({
        success: true,
        message: 'Usuario encontrado',
        userFound: true,
        passwordTest: {
          testedPassword: testPassword,
          isValid: isValidPassword,
          storedHashLength: user.password.length
        },
        userData: {
          email: user.email,
          nombre: user.nombre,
          plan: user.plan,
          status: user.status
        }
      })
    }

    // Si no, solo mostrar info del usuario
    return NextResponse.json({
      success: true,
      message: 'Usuario encontrado',
      userData: {
        email: user.email,
        nombre: user.nombre,
        plan: user.plan,
        status: user.status,
        fechaRegistro: user.fechaRegistro,
        hasPassword: !!user.password
      }
    })

  } catch (error) {
    console.error('Error en debug POST:', error)
    return NextResponse.json({ 
      error: 'Error interno', 
      details: error.message 
    }, { status: 500 })
  }
}
