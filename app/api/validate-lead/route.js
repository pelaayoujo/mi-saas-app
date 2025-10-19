import { NextResponse } from 'next/server'
import clientPromise from '../../../lib/mongodb'

export async function POST(request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email es requerido' },
        { status: 400 }
      )
    }

    const client = await clientPromise
    const db = client.db(process.env.MONGODB_DB || 'miSaaS')
    const leadsCollection = db.collection('leads')

    // Buscar si el email existe en la colección de leads
    const lead = await leadsCollection.findOne({ email: email.toLowerCase() })
    
    if (!lead) {
      return NextResponse.json({
        success: true,
        isLead: false,
        message: 'Email no encontrado en la lista de leads'
      })
    }

    // SIMPLIFICADO: Verificar autorización directamente en MongoDB
    const authorizationsCollection = db.collection('user_authorizations')
    const authorization = await authorizationsCollection.findOne({ email: email.toLowerCase() })

    if (lead && authorization) {
      return NextResponse.json({
        success: true,
        isLead: true,
        isAuthorized: true,
        message: `Email encontrado y autorizado para registro con plan ${authorization.plan}`,
        leadData: {
          nombre: lead.nombre,
          email: lead.email,
          nicho: lead.nicho,
          fechaRegistro: lead.fechaRegistro
        },
        authorizedPlan: authorization.plan
      })
    } else if (lead && !authorization) {
      return NextResponse.json({
        success: true,
        isLead: true,
        isAuthorized: false,
        message: 'Email encontrado en leads pero no autorizado para registro aún',
        leadData: {
          nombre: lead.nombre,
          email: lead.email,
          nicho: lead.nicho,
          fechaRegistro: lead.fechaRegistro
        }
      })
    }

  } catch (error) {
    console.error('Error validando lead:', error)
    return NextResponse.json(
      { success: false, message: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
