'use client';

import { useState } from 'react';
import Link from 'next/link';
import '../legal.css';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    type: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitMessage('¡Mensaje enviado correctamente! Te responderemos en 24-48 horas.');
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
          type: 'general'
        });
      } else {
        setSubmitMessage('Error al enviar el mensaje. Inténtalo de nuevo.');
      }
    } catch (error) {
      setSubmitMessage('Error de conexión. Inténtalo de nuevo.');
    }

    setIsSubmitting(false);
  };

  return (
    <div className="contact-page">
      {/* Navigation */}
      <nav className="contact-nav">
        <div className="nav-container">
          <Link href="/" className="nav-logo">
            <span className="logo-text">LinkedAI</span>
          </Link>
          <div className="nav-links">
            <Link href="/login">Iniciar Sesión</Link>
            <Link href="/#trial">Comenzar Gratis</Link>
          </div>
        </div>
      </nav>

      <div className="contact-content">
        <div className="container">
          <div className="contact-header">
            <h1>Contacta con Nosotros</h1>
            <p>¿Tienes preguntas? Estamos aquí para ayudarte. Envíanos un mensaje y te responderemos lo antes posible.</p>
          </div>

          <div className="contact-grid">
            {/* Información de contacto */}
            <div className="contact-info">
              <h2>Información de Contacto</h2>
              
              <div className="contact-item">
                <div className="contact-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2"/>
                    <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <div className="contact-details">
                  <h3>Email</h3>
                  <p>soporte@linkedai.com</p>
                  <p>Respuesta en 24-48 horas</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <div className="contact-details">
                  <h3>Teléfono</h3>
                  <p>+34 900 123 456</p>
                  <p>Lunes a Viernes, 9:00-18:00</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <div className="contact-details">
                  <h3>Dirección</h3>
                  <p>Madrid, España</p>
                  <p>Oficina principal</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                    <polyline points="12,6 12,12 16,14" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <div className="contact-details">
                  <h3>Horario de Atención</h3>
                  <p>Lunes a Viernes: 9:00 - 18:00</p>
                  <p>Sábados: 10:00 - 14:00</p>
                </div>
              </div>
            </div>

            {/* Formulario de contacto */}
            <div className="contact-form-container">
              <form className="contact-form" onSubmit={handleSubmit}>
                <h2>Envíanos un Mensaje</h2>
                
                <div className="form-group">
                  <label htmlFor="name">Nombre completo *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Tu nombre completo"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="tu@email.com"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="type">Tipo de consulta *</label>
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                  >
                    <option value="general">Consulta general</option>
                    <option value="technical">Soporte técnico</option>
                    <option value="billing">Facturación</option>
                    <option value="feature">Solicitud de función</option>
                    <option value="bug">Reportar error</option>
                    <option value="partnership">Partnership</option>
                    <option value="other">Otro</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Asunto *</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="Resumen de tu consulta"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Mensaje *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    placeholder="Describe tu consulta en detalle..."
                  />
                </div>

                {submitMessage && (
                  <div className={`submit-message ${submitMessage.includes('Error') ? 'error' : 'success'}`}>
                    {submitMessage}
                  </div>
                )}

                <button 
                  type="submit" 
                  className="submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
                </button>
              </form>
            </div>
          </div>

          {/* FAQ rápida */}
          <div className="contact-faq">
            <h2>Preguntas Frecuentes</h2>
            <div className="faq-grid">
              <div className="faq-item">
                <h3>¿Cuánto tiempo tarda la respuesta?</h3>
                <p>Normalmente respondemos en 24-48 horas durante días laborables.</p>
              </div>
              <div className="faq-item">
                <h3>¿Ofrecen soporte técnico?</h3>
                <p>Sí, nuestro equipo técnico está disponible para ayudarte con cualquier problema.</p>
              </div>
              <div className="faq-item">
                <h3>¿Puedo cancelar mi suscripción?</h3>
                <p>Puedes cancelar tu suscripción en cualquier momento desde tu panel de usuario.</p>
              </div>
              <div className="faq-item">
                <h3>¿Hay garantía de reembolso?</h3>
                <p>Ofrecemos 5 días de garantía de reembolso para nuevos usuarios.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="contact-footer">
        <div className="footer-content">
          <div className="footer-links">
            <Link href="/terms">Términos y Condiciones</Link>
            <Link href="/privacy">Política de Privacidad</Link>
            <Link href="/cookies">Cookies</Link>
          </div>
          <p>&copy; 2024 LinkedAI. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
