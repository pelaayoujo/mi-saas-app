import nodemailer from 'nodemailer'

// Configuración del transporter de email
const transporter = nodemailer.createTransport({
  service: 'gmail', // Puedes cambiar a 'outlook', 'yahoo', etc.
  auth: {
    user: process.env.EMAIL_USER, // Tu email
    pass: process.env.EMAIL_PASS  // Tu contraseña de aplicación
  }
})

// Función para enviar email de bienvenida con enlace de registro
export async function sendWelcomeEmail(email, nombre) {
  try {
    const mailOptions = {
      from: `"LinkedAI" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: '🚀 ¡Bienvenido a LinkedAI! Accede a tu cuenta',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Bienvenido a LinkedAI</title>
          <style>
            body {
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
              line-height: 1.6;
              color: #1f2937;
              background: #f9fafb;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background: white;
              border-radius: 16px;
              overflow: hidden;
              box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
            }
            .header {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              padding: 2rem;
              text-align: center;
              color: white;
            }
            .header h1 {
              margin: 0;
              font-size: 2rem;
              font-weight: 800;
            }
            .content {
              padding: 2rem;
            }
            .greeting {
              font-size: 1.2rem;
              margin-bottom: 1rem;
              color: #1f2937;
            }
            .message {
              font-size: 1rem;
              margin-bottom: 2rem;
              color: #6b7280;
              line-height: 1.6;
            }
            .cta-button {
              display: inline-block;
              background: linear-gradient(45deg, #0077B5, #005885);
              color: white;
              text-decoration: none;
              padding: 1rem 2rem;
              border-radius: 8px;
              font-weight: 700;
              font-size: 1.1rem;
              text-align: center;
              margin: 1rem 0;
              transition: all 0.3s ease;
            }
            .cta-button:hover {
              transform: translateY(-2px);
              box-shadow: 0 10px 20px rgba(0, 119, 181, 0.3);
            }
            .features {
              background: #f8fafc;
              border-radius: 12px;
              padding: 1.5rem;
              margin: 2rem 0;
            }
            .features h3 {
              color: #1f2937;
              margin: 0 0 1rem 0;
              font-size: 1.1rem;
            }
            .features ul {
              margin: 0;
              padding-left: 1.5rem;
              color: #6b7280;
            }
            .features li {
              margin-bottom: 0.5rem;
            }
            .footer {
              background: #f9fafb;
              padding: 1.5rem 2rem;
              text-align: center;
              color: #6b7280;
              font-size: 0.9rem;
            }
            .footer a {
              color: #0077B5;
              text-decoration: none;
            }
            .highlight {
              background: linear-gradient(45deg, #667eea, #764ba2);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              background-clip: text;
              font-weight: 800;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🚀 LinkedAI</h1>
              <p>La IA que revoluciona tu LinkedIn</p>
            </div>
            
            <div class="content">
              <div class="greeting">
                ¡Hola <strong>${nombre}</strong>! 👋
              </div>
              
              <div class="message">
                <p>¡Excelente noticia! Tu registro en LinkedAI ha sido confirmado y ya tienes acceso exclusivo a nuestra plataforma.</p>
                
                <p>Con LinkedAI podrás:</p>
              </div>
              
              <div class="features">
                <h3>✨ Lo que obtienes con LinkedAI:</h3>
                <ul>
                  <li><strong>Generar contenido viral</strong> - IA que crea posts que generan engagement masivo</li>
                  <li><strong>Imágenes impactantes</strong> - Carruseles e infografías automáticas</li>
                  <li><strong>Estrategia personalizada</strong> - Algoritmo que estudia tu nicho y competencia</li>
                  <li><strong>Automatización total</strong> - Programa posts, responde comentarios, gestiona conexiones</li>
                </ul>
              </div>
              
              <div style="text-align: center; margin: 2rem 0;">
                <a href="${process.env.NEXT_PUBLIC_APP_URL}/register" class="cta-button">
                  🚀 Crear mi cuenta y empezar
                </a>
              </div>
              
              <div class="message">
                <p><strong>¿Por qué LinkedAI?</strong></p>
                <p>Nuestros usuarios han experimentado:</p>
                <ul>
                  <li>📈 <span class="highlight">+847% más interacciones</span></li>
                  <li>🎯 <span class="highlight">+200% más leads</span></li>
                  <li>⚡ <span class="highlight">20 horas ahorradas por semana</span></li>
                </ul>
              </div>
              
              <div class="message">
                <p><strong>Próximos pasos:</strong></p>
                <ol>
                  <li>Haz clic en el botón de arriba para crear tu cuenta</li>
                  <li>Completa tu perfil en menos de 2 minutos</li>
                  <li>¡Comienza a generar contenido que se viraliza!</li>
                </ol>
              </div>
            </div>
            
            <div class="footer">
              <p>Este email fue enviado a <strong>${email}</strong></p>
              <p>Si no solicitaste este registro, puedes ignorar este email.</p>
              <p>
                <a href="${process.env.NEXT_PUBLIC_APP_URL}">LinkedAI</a> | 
                <a href="${process.env.NEXT_PUBLIC_APP_URL}/admin/leads">Dashboard</a>
              </p>
            </div>
          </div>
        </body>
        </html>
      `
    }

    const result = await transporter.sendMail(mailOptions)
    console.log('Email enviado exitosamente:', result.messageId)
    return { success: true, messageId: result.messageId }
    
  } catch (error) {
    console.error('Error al enviar email:', error)
    return { success: false, error: error.message }
  }
}

// Función para enviar email de confirmación de registro
export async function sendRegistrationConfirmation(email, nombre) {
  try {
    const mailOptions = {
      from: `"LinkedAI" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: '🎉 ¡Cuenta creada exitosamente! Bienvenido a LinkedAI',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Cuenta Creada - LinkedAI</title>
          <style>
            body {
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
              line-height: 1.6;
              color: #1f2937;
              background: #f9fafb;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background: white;
              border-radius: 16px;
              overflow: hidden;
              box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
            }
            .header {
              background: linear-gradient(135deg, #10b981 0%, #059669 100%);
              padding: 2rem;
              text-align: center;
              color: white;
            }
            .header h1 {
              margin: 0;
              font-size: 2rem;
              font-weight: 800;
            }
            .content {
              padding: 2rem;
            }
            .greeting {
              font-size: 1.2rem;
              margin-bottom: 1rem;
              color: #1f2937;
            }
            .message {
              font-size: 1rem;
              margin-bottom: 2rem;
              color: #6b7280;
              line-height: 1.6;
            }
            .cta-button {
              display: inline-block;
              background: linear-gradient(45deg, #0077B5, #005885);
              color: white;
              text-decoration: none;
              padding: 1rem 2rem;
              border-radius: 8px;
              font-weight: 700;
              font-size: 1.1rem;
              text-align: center;
              margin: 1rem 0;
            }
            .success-badge {
              background: #d1fae5;
              color: #065f46;
              padding: 1rem;
              border-radius: 8px;
              text-align: center;
              margin: 1rem 0;
              font-weight: 600;
            }
            .footer {
              background: #f9fafb;
              padding: 1.5rem 2rem;
              text-align: center;
              color: #6b7280;
              font-size: 0.9rem;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎉 ¡Éxito!</h1>
              <p>Tu cuenta de LinkedAI está lista</p>
            </div>
            
            <div class="content">
              <div class="greeting">
                ¡Felicidades <strong>${nombre}</strong>! 🎊
              </div>
              
              <div class="success-badge">
                ✅ Tu cuenta ha sido creada exitosamente
              </div>
              
              <div class="message">
                <p>Ya tienes acceso completo a LinkedAI y puedes comenzar a generar contenido que se viraliza en LinkedIn.</p>
                
                <p><strong>Tu cuenta incluye:</strong></p>
                <ul>
                  <li>🚀 Generador de contenido ilimitado</li>
                  <li>🎨 Creación de imágenes automática</li>
                  <li>📊 Analytics y métricas avanzadas</li>
                  <li>⚡ Automatización completa</li>
                </ul>
              </div>
              
              <div style="text-align: center; margin: 2rem 0;">
                <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" class="cta-button">
                  🚀 Ir a mi Dashboard
                </a>
              </div>
              
              <div class="message">
                <p><strong>¿Necesitas ayuda?</strong></p>
                <p>Nuestro equipo de soporte está disponible 24/7 para ayudarte a maximizar tu presencia en LinkedIn.</p>
              </div>
            </div>
            
            <div class="footer">
              <p>Este email fue enviado a <strong>${email}</strong></p>
              <p>
                <a href="${process.env.NEXT_PUBLIC_APP_URL}">LinkedAI</a> | 
                <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard">Dashboard</a>
              </p>
            </div>
          </div>
        </body>
        </html>
      `
    }

    const result = await transporter.sendMail(mailOptions)
    console.log('Email de confirmación enviado:', result.messageId)
    return { success: true, messageId: result.messageId }
    
  } catch (error) {
    console.error('Error al enviar email de confirmación:', error)
    return { success: false, error: error.message }
  }
}

