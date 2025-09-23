import { NextResponse } from 'next/server'
import { connectToDatabase } from '../../../lib/mongodb'

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

    if (lead) {
      return NextResponse.json({
        success: true,
        isLead: true,
        message: 'Email encontrado en la lista de leads',
        leadData: {
          nombre: lead.nombre,
          email: lead.email,
          nicho: lead.nicho,
          fechaRegistro: lead.fechaRegistro
        }
      })
    } else {
      return NextResponse.json({
        success: true,
        isLead: false,
        message: 'Email no encontrado en la lista de leads'
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
