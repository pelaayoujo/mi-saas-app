import { NextResponse } from 'next/server'
import clientPromise from '../../../lib/mongodb'

export async function GET() {
	try {
		const client = await clientPromise
		const admin = client.db(process.env.MONGODB_DB || 'admin')
		// Hacemos una operación ligera para validar la conexión
		const stats = await admin.stats()
		return NextResponse.json({ ok: true, db: process.env.MONGODB_DB, stats: { collections: stats.collections, objects: stats.objects } })
	} catch (error) {
		return NextResponse.json({ ok: false, error: String(error) }, { status: 500 })
	}
}

