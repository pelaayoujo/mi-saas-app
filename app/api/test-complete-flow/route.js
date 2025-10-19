import { NextResponse } from 'next/server'
import clientPromise from '../../../lib/mongodb'

export async function GET(request) {
  try {
    const client = await clientPromise
    const db = client.db(process.env.MONGODB_DB || 'miSaaS')
    
    // Verificar leads
    const leadsCollection = db.collection('leads')
    const leads = await leadsCollection.find({}).limit(5).toArray()
    
    // Verificar autorizaciones
    const authorizationsCollection = db.collection('user_authorizations')
    const authorizations = await authorizationsCollection.find({}).limit(5).toArray()
    
    // Verificar usuarios
    const usersCollection = db.collection('users')
    const users = await usersCollection.find({}).limit(5).toArray()
    
    return NextResponse.json({
      success: true,
      database: db.databaseName,
      collections: {
        leads: {
          count: await leadsCollection.countDocuments(),
          recent: leads.map(lead => ({ email: lead.email, fecha: lead.fecha }))
        },
        user_authorizations: {
          count: await authorizationsCollection.countDocuments(),
          recent: authorizations.map(auth => ({ email: auth.email, plan: auth.plan }))
        },
        users: {
          count: await usersCollection.countDocuments(),
          recent: users.map(user => ({ email: user.email, plan: user.plan }))
        }
      }
    })
    
  } catch (error) {
    console.error('Error verificando flujo:', error)
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const { action, email, plan } = await request.json()
    
    if (!action || !email) {
      return NextResponse.json({
        error: 'Action y email son requeridos. Actions: add_lead, authorize, check'
      }, { status: 400 })
    }
    
    const client = await clientPromise
    const db = client.db(process.env.MONGODB_DB || 'miSaaS')
    const normalizedEmail = email.toLowerCase().trim()
    
    if (action === 'add_lead') {
      const leadsCollection = db.collection('leads')
      
      // Verificar si ya existe
      const existingLead = await leadsCollection.findOne({ email: normalizedEmail })
      if (existingLead) {
        return NextResponse.json({
          success: false,
          message: 'Email ya existe como lead',
          lead: { email: existingLead.email, fecha: existingLead.fecha }
        })
      }
      
      // Crear lead
      const lead = {
        email: normalizedEmail,
        fecha: new Date(),
        status: 'nuevo',
        source: 'manual_test'
      }
      
      const result = await leadsCollection.insertOne(lead)
      
      return NextResponse.json({
        success: true,
        message: 'Lead agregado exitosamente',
        leadId: result.insertedId
      })
    }
    
    if (action === 'authorize') {
      if (!plan) {
        return NextResponse.json({
          error: 'Plan es requerido para autorizar'
        }, { status: 400 })
      }
      
      const validPlans = ['trial', 'basic', 'professional', 'enterprise', 'admin']
      if (!validPlans.includes(plan)) {
        return NextResponse.json({
          error: `Plan inválido. Válidos: ${validPlans.join(', ')}`
        }, { status: 400 })
      }
      
      const authorizationsCollection = db.collection('user_authorizations')
      
      // Crear índice si no existe
      try {
        await authorizationsCollection.createIndex({ email: 1 }, { unique: true })
      } catch (error) {
        // El índice puede ya existir
      }
      
      const authorization = {
        email: normalizedEmail,
        plan: plan,
        authorizedAt: new Date(),
        authorizedBy: 'test',
        status: 'active'
      }
      
      // Insertar o actualizar
      await authorizationsCollection.replaceOne(
        { email: normalizedEmail },
        authorization,
        { upsert: true }
      )
      
      return NextResponse.json({
        success: true,
        message: `Usuario ${email} autorizado con plan ${plan}`,
        authorization
      })
    }
    
    if (action === 'check') {
      const leadsCollection = db.collection('leads')
      const authorizationsCollection = db.collection('user_authorizations')
      
      const lead = await leadsCollection.findOne({ email: normalizedEmail })
      const authorization = await authorizationsCollection.findOne({ email: normalizedEmail })
      
      return NextResponse.json({
        success: true,
        email: normalizedEmail,
        lead: lead ? { exists: true, fecha: lead.fecha } : { exists: false },
        authorization: authorization ? { exists: true, plan: authorization.plan } : { exists: false }
      })
    }
    
    return NextResponse.json({
      error: 'Action no válida. Usar: add_lead, authorize, check'
    }, { status: 400 })
    
  } catch (error) {
    console.error('Error en test flow:', error)
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 })
  }
}
