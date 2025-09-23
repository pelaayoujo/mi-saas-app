"use client"
import { useState } from 'react'
import './page.css'

export default function Home() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    nicho: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState(null)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage(null)

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage({
          type: 'success',
          text: '¡Gracias! Te contactaremos en 24 horas.'
        })
        setFormData({ nombre: '', email: '', nicho: '' })
      } else {
        setMessage({
          type: 'error',
          text: data.error || 'Error al enviar el formulario'
        })
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Error de conexión. Inténtalo de nuevo.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="escribelo-inspired">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <span className="logo-icon">✍️</span>
            <span className="logo-text">LinkedAI</span>
          </div>
          <div className="nav-links">
            <a href="#features">Características</a>
            <a href="#pricing">Precios</a>
            <a href="#testimonials">Testimonios</a>
            <a href="#contact" className="nav-cta">Empezar Gratis</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="badge-dot"></span>
              <span>La IA que revoluciona LinkedIn</span>
            </div>
            <h1 className="hero-title">
              Crea contenido que 
              <span className="highlight"> se viraliza</span> en LinkedIn
            </h1>
            <p className="hero-description">
              Nuestra IA analiza millones de posts exitosos para crear contenido que genera engagement masivo, 
              aumenta tu visibilidad y multiplica tus oportunidades profesionales.
            </p>
            <div className="hero-cta">
              <button className="btn-primary" onClick={() => document.getElementById('contact').scrollIntoView()}>
                Empezar Gratis Ahora
                <span className="btn-arrow">→</span>
              </button>
              <button className="btn-secondary" onClick={() => document.getElementById('demo').scrollIntoView()}>
                Ver Demo
              </button>
            </div>
            <div className="hero-stats">
              <div className="stat">
                <div className="stat-number">+847%</div>
                <div className="stat-label">más interacciones</div>
              </div>
              <div className="stat">
                <div className="stat-number">3.2M</div>
                <div className="stat-label">impresiones</div>
              </div>
              <div className="stat">
                <div className="stat-number">24h</div>
                <div className="stat-label">para resultados</div>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-card">
              <div className="card-header">
                <div className="card-avatar">👤</div>
                <div className="card-info">
                  <div className="card-name">María González</div>
                  <div className="card-title">CEO | Growth Expert</div>
                </div>
              </div>
              <div className="card-content">
                <p>🚀 <strong>ROMPÍ el algoritmo de LinkedIn con esta estrategia:</strong></p>
                <p>En 30 días pasé de 500 a 15,000 seguidores usando solo IA.</p>
                <p>El secreto: <strong>LinkedAI</strong> analizó 10M+ posts exitosos...</p>
              </div>
              <div className="card-stats">
                <span>👍 2.3K</span>
                <span>💬 847</span>
                <span>🔄 1.2K</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <div className="container">
          <div className="section-header">
            <h2>Todo lo que necesitas para dominar LinkedIn</h2>
            <p>Herramientas profesionales que transforman tu presencia digital</p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📝</div>
              <h3>Contenido Inteligente</h3>
              <p>IA que analiza 10M+ posts exitosos para crear contenido que genera engagement masivo y posiciona tu autoridad.</p>
              <div className="feature-result">+300% más interacciones</div>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎨</div>
              <h3>Imágenes Profesionales</h3>
              <p>Genera automáticamente imágenes profesionales, infografías y carruseles que captan la atención y aumentan el alcance.</p>
              <div className="feature-result">+500% más alcance</div>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Estrategia Personalizada</h3>
              <p>Algoritmo que estudia tu nicho, competencia y audiencia para crear una estrategia única que genera oportunidades reales.</p>
              <div className="feature-result">+200% más leads</div>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Automatización Total</h3>
              <p>Programa posts, responde comentarios, gestiona conexiones y optimiza horarios. Todo mientras duermes.</p>
              <div className="feature-result">20h/semana ahorradas</div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="demo">
        <div className="container">
          <div className="demo-content">
            <div className="demo-text">
              <h2>Mira LinkedAI en acción</h2>
              <p>Un post generado por IA que obtuvo 50,000+ interacciones</p>
              <div className="demo-stats">
                <div className="demo-stat">
                  <div className="demo-stat-number">50,000+</div>
                  <div className="demo-stat-label">interacciones</div>
                </div>
                <div className="demo-stat">
                  <div className="demo-stat-number">15,000</div>
                  <div className="demo-stat-label">nuevos seguidores</div>
                </div>
                <div className="demo-stat">
                  <div className="demo-stat-number">30</div>
                  <div className="demo-stat-label">días</div>
                </div>
              </div>
            </div>
            <div className="demo-visual">
              <div className="linkedin-post">
                <div className="post-header">
                  <div className="post-avatar">👤</div>
                  <div className="post-info">
                    <div className="post-name">María González</div>
                    <div className="post-title">CEO | Growth Marketing Expert</div>
                    <div className="post-time">hace 2 horas</div>
                  </div>
                </div>
                <div className="post-content">
                  <p>🚀 <strong>ROMPÍ el algoritmo de LinkedIn con esta estrategia:</strong></p>
                  <p>En 30 días pasé de 500 a 15,000 seguidores usando solo IA.</p>
                  <p>El secreto: <strong>LinkedAI</strong> analizó 10M+ posts exitosos...</p>
                </div>
                <div className="post-engagement">
                  <span>👍 2.3K</span>
                  <span>💬 847</span>
                  <span>🔄 1.2K</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="testimonials">
        <div className="container">
          <div className="section-header">
            <h2>Resultados reales de profesionales como tú</h2>
            <p>Más de 50,000 profesionales ya transformaron su presencia en LinkedIn</p>
          </div>
          <div className="testimonials-grid">
            <div className="testimonial">
              <div className="testimonial-content">
                "En 2 semanas pasé de 1,200 a 8,500 seguidores. LinkedAI cambió completamente mi presencia en LinkedIn."
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">👨‍💼</div>
                <div className="author-info">
                  <div className="author-name">Carlos Ruiz</div>
                  <div className="author-title">Consultor de Marketing</div>
                </div>
              </div>
            </div>
            <div className="testimonial">
              <div className="testimonial-content">
                "Generé 47 leads calificados en mi primer mes. El ROI fue inmediato y sostenible."
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">👩‍💻</div>
                <div className="author-info">
                  <div className="author-name">Ana Martínez</div>
                  <div className="author-title">Freelancer Tech</div>
                </div>
              </div>
            </div>
            <div className="testimonial">
              <div className="testimonial-content">
                "Ahorro 15 horas semanales en contenido. Ahora me enfoco en cerrar negocios, no en crear posts."
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">👨‍🚀</div>
                <div className="author-info">
                  <div className="author-name">David Chen</div>
                  <div className="author-title">Founder Startup</div>
                </div>
              </div>
            </div>
          </div>
          <div className="trust-brands">
            <div className="brand">Microsoft</div>
            <div className="brand">Google</div>
            <div className="brand">Amazon</div>
            <div className="brand">Meta</div>
            <div className="brand">Netflix</div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="pricing">
        <div className="container">
          <div className="section-header">
            <h2>Un plan simple. Resultados extraordinarios.</h2>
            <p>Sin complicaciones, sin contratos largos, sin sorpresas</p>
          </div>
          <div className="pricing-card">
            <div className="pricing-badge">Más Popular</div>
            <div className="pricing-header">
              <h3>LinkedAI Pro</h3>
              <div className="price">
                <span className="currency">€</span>
                <span className="amount">97</span>
                <span className="period">/mes</span>
              </div>
              <p className="price-description">Todo lo que necesitas para dominar LinkedIn</p>
            </div>
            <div className="pricing-features">
              <div className="pricing-feature">✅ Contenido ilimitado generado por IA</div>
              <div className="pricing-feature">✅ Imágenes y carruseles automáticos</div>
              <div className="pricing-feature">✅ Estrategia personalizada por nicho</div>
              <div className="pricing-feature">✅ Programación automática de posts</div>
              <div className="pricing-feature">✅ Análisis de competencia en tiempo real</div>
              <div className="pricing-feature">✅ Respuestas automáticas a comentarios</div>
              <div className="pricing-feature">✅ Dashboard con métricas avanzadas</div>
              <div className="pricing-feature">✅ Soporte prioritario 24/7</div>
            </div>
            <div className="pricing-guarantee">
              <div className="guarantee-icon">🛡️</div>
              <p>Garantía de 30 días o te devolvemos el dinero</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq">
        <div className="container">
          <div className="section-header">
            <h2>Preguntas frecuentes</h2>
            <p>Todo lo que necesitas saber sobre LinkedAI</p>
          </div>
          <div className="faq-grid">
            <div className="faq-item">
              <h4>¿Cuánto tiempo tardo en ver resultados?</h4>
              <p>La mayoría de nuestros usuarios ven un aumento del 200-300% en interacciones en las primeras 48 horas. Los resultados más significativos aparecen en 7-14 días.</p>
            </div>
            <div className="faq-item">
              <h4>¿El contenido suena artificial?</h4>
              <p>No. Nuestra IA aprende tu tono de voz y estilo personal. El contenido es indistinguible del que escribirías manualmente, pero optimizado para el algoritmo.</p>
            </div>
            <div className="faq-item">
              <h4>¿Funciona para cualquier industria?</h4>
              <p>Sí. LinkedAI se adapta a más de 200 industrias diferentes, desde tecnología hasta salud, finanzas, educación y más.</p>
            </div>
            <div className="faq-item">
              <h4>¿Puedo cancelar cuando quiera?</h4>
              <p>Absolutamente. Sin contratos, sin penalizaciones. Cancela cuando quieras desde tu dashboard.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="cta">
        <div className="container">
          <div className="cta-content">
            <h2>¿Listo para multiplicar tu impacto en LinkedIn?</h2>
            <p>Únete a 50,000+ profesionales que ya transformaron su presencia profesional</p>
            <form className="cta-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <input 
                  type="text" 
                  name="nombre" 
                  placeholder="Tu nombre" 
                  value={formData.nombre}
                  onChange={handleChange}
                  required 
                />
                <input 
                  type="email" 
                  name="email" 
                  placeholder="Tu email" 
                  value={formData.email}
                  onChange={handleChange}
                  required 
                />
                <select 
                  name="nicho" 
                  value={formData.nicho}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecciona tu sector</option>
                  <option value="Tecnología">Tecnología</option>
                  <option value="Fintech">Fintech</option>
                  <option value="Marketing Digital">Marketing Digital</option>
                  <option value="Consultoría">Consultoría</option>
                  <option value="Ventas">Ventas</option>
                  <option value="Recursos Humanos">Recursos Humanos</option>
                  <option value="Salud">Salud</option>
                  <option value="Educación">Educación</option>
                  <option value="Inmobiliaria">Inmobiliaria</option>
                  <option value="E-commerce">E-commerce</option>
                  <option value="Startups">Startups</option>
                  <option value="B2B">B2B</option>
                  <option value="B2C">B2C</option>
                  <option value="SaaS">SaaS</option>
                  <option value="IA/Machine Learning">IA/Machine Learning</option>
                  <option value="Blockchain/Crypto">Blockchain/Crypto</option>
                  <option value="Medios de Comunicación">Medios de Comunicación</option>
                  <option value="Turismo">Turismo</option>
                  <option value="Alimentación">Alimentación</option>
                  <option value="Moda">Moda</option>
                  <option value="Deportes">Deportes</option>
                  <option value="Entretenimiento">Entretenimiento</option>
                  <option value="Gaming">Gaming</option>
                  <option value="Legal">Legal</option>
                  <option value="Contabilidad">Contabilidad</option>
                  <option value="Construcción">Construcción</option>
                  <option value="Manufactura">Manufactura</option>
                  <option value="Logística">Logística</option>
                  <option value="Energía">Energía</option>
                  <option value="Medio Ambiente">Medio Ambiente</option>
                  <option value="Farmacéutica">Farmacéutica</option>
                  <option value="Automotriz">Automotriz</option>
                  <option value="Aerospace">Aerospace</option>
                  <option value="Real Estate">Real Estate</option>
                  <option value="Fashion">Fashion</option>
                  <option value="Beauty">Beauty</option>
                  <option value="Fitness">Fitness</option>
                  <option value="Coaching">Coaching</option>
                  <option value="Psicología">Psicología</option>
                  <option value="Diseño">Diseño</option>
                  <option value="Arquitectura">Arquitectura</option>
                  <option value="Fotografía">Fotografía</option>
                  <option value="Música">Música</option>
                  <option value="Arte">Arte</option>
                  <option value="Escritura">Escritura</option>
                  <option value="Traducción">Traducción</option>
                  <option value="Eventos">Eventos</option>
                  <option value="Catering">Catering</option>
                  <option value="Transporte">Transporte</option>
                  <option value="Seguros">Seguros</option>
                  <option value="Banca">Banca</option>
                  <option value="Inversiones">Inversiones</option>
                  <option value="Venture Capital">Venture Capital</option>
                  <option value="Private Equity">Private Equity</option>
                  <option value="Non-profit">Non-profit</option>
                  <option value="Gobierno">Gobierno</option>
                  <option value="Política">Política</option>
                  <option value="Investigación">Investigación</option>
                  <option value="Academia">Academia</option>
                  <option value="Otro">Otro</option>
                </select>
                <button className="btn-primary" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Enviando...' : 'Empezar Gratis'}
                </button>
              </div>
            </form>
            <p className="cta-disclaimer">Sin spam. Acceso inmediato. Cancela cuando quieras.</p>
            {message && (
              <div className={`message ${message.type}`}>
                {message.text}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <div className="footer-logo">
                <span className="logo-icon">✍️</span>
                <span className="logo-text">LinkedAI</span>
              </div>
              <p>La IA que revoluciona tu presencia en LinkedIn</p>
            </div>
            <div className="footer-links">
              <div className="footer-column">
                <h4>Producto</h4>
                <a href="#demo">Demo</a>
                <a href="#pricing">Precios</a>
                <a href="#features">Características</a>
              </div>
              <div className="footer-column">
                <h4>Soporte</h4>
                <a href="#">Centro de Ayuda</a>
                <a href="#">Contacto</a>
                <a href="#">Estado del Sistema</a>
              </div>
              <div className="footer-column">
                <h4>Legal</h4>
                <a href="#">Términos</a>
                <a href="#">Privacidad</a>
                <a href="#">Cookies</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} LinkedAI. Todos los derechos reservados.</p>
            <div className="footer-social">
              <span>Conecta con nosotros:</span>
              <a href="#">LinkedIn</a>
              <a href="#">Twitter</a>
              <a href="#">Instagram</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

