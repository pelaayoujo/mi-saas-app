import { NextResponse } from 'next/server'
import clientPromise from '../../../lib/mongodb'
import { connectToDatabase } from '../../../lib/mongodb'
import { isUserAuthorized, getAssignedPlan } from '../../../lib/permissions'

export async function POST(request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({
        success: false,
        error: 'Email es requerido'
      }, { status: 400 })
    }

    const normalizedEmail = email.toLowerCase().trim()
    
    // Verificar usando ambos métodos de conexión
    const client = await clientPromise
    const db1 = client.db(process.env.MONGODB_DB || 'miSaaS')
    
    const { db: db2 } = await connectToDatabase()
    
    // Verificar leads
    const leadsCollection1 = db1.collection('leads')
    const leadsCollection2 = db2.collection('leads')
    
    const lead1 = await leadsCollection1.findOne({ email: normalizedEmail })
    const lead2 = await leadsCollection2.findOne({ email: normalizedEmail })
    
    // Verificar autorizaciones
    const authCollection1 = db1.collection('user_authorizations')
    const authCollection2 = db2.collection('user_authorizations')
    
    const auth1 = await authCollection1.findOne({ email: normalizedEmail })
    const auth2 = await authCollection2.findOne({ email: normalizedEmail })
    
    // Verificar usando funciones
    const isAuth = await isUserAuthorized(normalizedEmail)
    const assignedPlan = await getAssignedPlan(normalizedEmail)
    
    // Obtener información de la base de datos
    const dbStats = {
      db1_name: db1.databaseName,
      db2_name: db2.databaseName,
      areSame: db1.databaseName === db2.databaseName
    }
    
    // Obtener conteos
    const leadsCount1 = await leadsCollection1.countDocuments()
    const leadsCount2 = await leadsCollection2.countDocuments()
    const authCount1 = await authCollection1.countDocuments()
    const authCount2 = await authCollection2.countDocuments()
    
    return NextResponse.json({
      success: true,
      email: normalizedEmail,
      debug: {
        database: dbStats,
        leads: {
          found_in_db1: !!lead1,
          found_in_db2: !!lead2,
          areSame: !!lead1 === !!lead2,
          lead1_data: lead1 ? { email: lead1.email, fecha: lead1.fecha } : null,
          lead2_data: lead2 ? { email: lead2.email, fecha: lead2.fecha } : null,
          counts: { db1: leadsCount1, db2: leadsCount2 }
        },
        authorizations: {
          found_in_db1: !!auth1,
          found_in_db2: !!auth2,
          areSame: !!auth1 === !!auth2,
          auth1_data: auth1 ? { email: auth1.email, plan: auth1.plan } : null,
          auth2_data: auth2 ? { email: auth2.email, plan: auth2.plan } : null,
          counts: { db1: authCount1, db2: authCount2 }
        },
        functions: {
          isUserAuthorized: isAuth,
          getAssignedPlan: assignedPlan
        }
      }
    })

  } catch (error) {
    console.error('Error debugging user access:', error)
    return NextResponse.json({
      success: false,
      error: error.message,
      stack: error.stack
    }, { status: 500 })
  }
}
