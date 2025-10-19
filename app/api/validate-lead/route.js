import { NextResponse } from 'next/server'
import { connectToDatabase } from '../../../lib/mongodb'
import { isUserAuthorized, getAssignedPlan } from '../../../lib/permissions'

export async function POST(request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email es requerido' },
        { status: 400 }
      )
    }

    const { db } = await connectToDatabase()
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

    // Verificar si está autorizado para registrarse
    const isAuthorized = await isUserAuthorized(email)
    const assignedPlan = await getAssignedPlan(email)

    if (lead && isAuthorized && assignedPlan) {
      return NextResponse.json({
        success: true,
        isLead: true,
        isAuthorized: true,
        message: `Email encontrado y autorizado para registro con plan ${assignedPlan}`,
        leadData: {
          nombre: lead.nombre,
          email: lead.email,
          nicho: lead.nicho,
          fechaRegistro: lead.fechaRegistro
        },
        authorizedPlan: assignedPlan
      })
    } else if (lead && !isAuthorized) {
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
