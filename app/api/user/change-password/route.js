import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/route'
import { clientPromise } from '../../../../lib/mongodb'
import bcrypt from 'bcryptjs'

export const dynamic = 'force-dynamic'

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const { currentPassword, newPassword } = await request.json()
    if (!currentPassword || !newPassword) {
      return NextResponse.json({ error: 'Campos incompletos' }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db(process.env.MONGODB_DB || 'miSaaS')
    const users = db.collection('users')

    const user = await users.findOne({ email: session.user.email })
    if (!user || !user.password) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 })
    }

    const isValid = await bcrypt.compare(currentPassword, user.password)
    if (!isValid) {
      return NextResponse.json({ error: 'La contraseña actual no es correcta' }, { status: 400 })
    }

    const hashed = await bcrypt.hash(newPassword, 10)
    await users.updateOne({ _id: user._id }, { $set: { password: hashed, updatedAt: new Date() } })

    return NextResponse.json({ message: 'Contraseña actualizada correctamente' }, { status: 200 })
  } catch (error) {
    console.error('Error cambiando contraseña:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}


