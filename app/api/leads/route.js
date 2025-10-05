import { NextResponse } from 'next/server'
import clientPromise from '../../../lib/mongodb'

export async function POST(request) {
  try {
    console.log('=== LEAD API CALLED ===')
    const body = await request.json()
    const { email } = body
    console.log('Received email:', email)

    // Validación básica
    if (!email) {
      console.log('Error: No email provided')
      return NextResponse.json(
        { error: 'Email es requerido' },
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

    console.log('Connecting to MongoDB...')
    const client = await clientPromise
    const db = client.db('miSaaS') // Use the correct database name
    const collection = db.collection('leads')
    console.log('Connected to database and collection')
    // Índices (idempotentes)
    await collection.createIndex({ email: 1 }, { unique: true })
    await collection.createIndex({ fecha: -1 })

    const normalizedEmail = email.toLowerCase().trim()
    // Verificar si el email ya existe
    const existingLead = await collection.findOne({ email: normalizedEmail })
    if (existingLead) {
      return NextResponse.json(
        { error: 'Este email ya está registrado' },
        { status: 409 }
      )
    }

    // Crear el lead
    const lead = {
      email: normalizedEmail,
      fecha: new Date(),
      status: 'nuevo',
      source: 'homepage_trial',
      ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
    }

        console.log('Inserting lead:', lead)
        const result = await collection.insertOne(lead)
        console.log('Lead inserted successfully:', result.insertedId)

        // Email desactivado - Solo acumular leads
        console.log('Lead registrado:', { email, source: 'homepage_trial' })

        return NextResponse.json({
          success: true,
          message: '¡Gracias! Te hemos enviado un email con acceso a la prueba.',
          id: result.insertedId
        })

  } catch (error) {
    console.error('=== ERROR IN LEAD API ===')
    console.error('Error details:', error)
    
    // Manejo de clave duplicada (índice único)
    if (error && (error.code === 11000 || error.code === '11000')) {
      console.log('Duplicate email error')
      return NextResponse.json(
        { error: 'Este email ya está registrado' },
        { status: 409 }
      )
    }
    
    console.error('Error al guardar lead:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor. Inténtalo de nuevo.' },
      { status: 500 }
    )
  }
}

// Endpoint para obtener leads (para admin)
export async function GET(request) {
  try {
    const url = new URL(request.url)
    const nicho = url.searchParams.get('nicho')?.trim()
    const limitParam = url.searchParams.get('limit')
    const limit = Math.max(1, Math.min(parseInt(limitParam || '50', 10) || 50, 100))

    // Datos de prueba temporales mientras se soluciona MongoDB
    const mockLeads = [
      {
        id: '1',
        nombre: 'Juan Pérez',
        email: 'juan@ejemplo.com',
        nicho: 'Tecnología',
        fecha: new Date('2024-01-15'),
        status: 'nuevo'
      },
      {
        id: '2',
        nombre: 'María García',
        email: 'maria@ejemplo.com',
        nicho: 'Marketing',
        fecha: new Date('2024-01-14'),
        status: 'nuevo'
      },
      {
        id: '3',
        nombre: 'Carlos López',
        email: 'carlos@ejemplo.com',
        nicho: 'Ventas',
        fecha: new Date('2024-01-13'),
        status: 'nuevo'
      }
    ]

    // Filtrar por nicho si se especifica
    let filteredLeads = mockLeads
    if (nicho) {
      filteredLeads = mockLeads.filter(lead => 
        lead.nicho.toLowerCase().includes(nicho.toLowerCase())
      )
    }

    // Aplicar límite
    const limitedLeads = filteredLeads.slice(0, limit)

    return NextResponse.json({
      success: true,
      count: limitedLeads.length,
      leads: limitedLeads
    })

  } catch (error) {
    console.error('Error al obtener leads:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

