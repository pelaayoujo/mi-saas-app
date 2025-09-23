import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    message: 'Test endpoint funcionando',
    env: {
      NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? 'Configurado' : 'No configurado',
      NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'No configurado',
      NODE_ENV: process.env.NODE_ENV
    }
  })
}
