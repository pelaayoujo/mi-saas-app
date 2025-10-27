import { NextResponse } from 'next/server';
import { clientPromise } from '../../../lib/mongodb';

export async function POST(request) {
  try {
    const { name, email, subject, message, type } = await request.json();

    // Validar campos requeridos
    if (!name || !email || !subject || !message || !type) {
      return NextResponse.json(
        { error: 'Todos los campos son requeridos' },
        { status: 400 }
      );
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Formato de email inválido' },
        { status: 400 }
      );
    }

    // Conectar a MongoDB
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || 'miSaaS');

    // Guardar mensaje en la colección de contactos
    const contactMessage = {
      name: name.trim(),
      email: email.toLowerCase().trim(),
      subject: subject.trim(),
      message: message.trim(),
      type: type,
      status: 'new', // new, in_progress, resolved
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await db.collection('contact_messages').insertOne(contactMessage);

    if (!result.insertedId) {
      return NextResponse.json(
        { error: 'Error al guardar el mensaje' },
        { status: 500 }
      );
    }

    // Aquí podrías agregar lógica para enviar email de notificación
    // await sendNotificationEmail(contactMessage);

    return NextResponse.json(
      { 
        success: true, 
        message: 'Mensaje enviado correctamente',
        id: result.insertedId 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error en API de contacto:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

// Función para enviar email de notificación (opcional)
async function sendNotificationEmail(contactMessage) {
  try {
    // Aquí implementarías el envío de email usando tu servicio preferido
    // Por ejemplo, con Nodemailer, SendGrid, etc.
    console.log('Notificación de nuevo mensaje de contacto:', contactMessage);
  } catch (error) {
    console.error('Error enviando email de notificación:', error);
  }
}
