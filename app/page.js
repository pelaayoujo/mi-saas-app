"use client"
import { useState, useEffect } from 'react'
import './page-futuristic.css'
import Particles from './components/Particles'
import useScrollReveal from './hooks/useScrollReveal'

export default function Home() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    nicho: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState(null)
  const [navbarScrolled, setNavbarScrolled] = useState(false)
  const [openFAQ, setOpenFAQ] = useState(null)

  // Efecto de scroll para navbar
  useEffect(() => {
    const handleScroll = () => {
      setNavbarScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Inicializar animaciones de scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    )

    const elements = document.querySelectorAll('.scroll-reveal')
    elements.forEach((el) => observer.observe(el))

    return () => {
      elements.forEach((el) => observer.unobserve(el))
    }
  }, [])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index)
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
      {/* Partículas de fondo */}
      <Particles />
      
      {/* Navigation */}
      <nav className={`navbar ${navbarScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <div className="nav-logo">
            <span className="logo-icon">✍️</span>
            <span className="logo-text">LinkedAI</span>
          </div>
            <div className="nav-links">
              <a href="#features">Características</a>
              <a href="#pricing">Precios</a>
              <a href="#testimonials">Testimonios</a>
              <a href="#contact" className="nav-cta">Probar LinkedAI</a>
            </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-container">
          <div className="hero-content-centered">
            <div className="hero-badge">
              <span className="badge-dot"></span>
              <span>50,000+ PROFESIONALES YA LO USAN</span>
            </div>
            <h1 className="hero-title">
              La #1 Herramienta de IA para <span className="highlight">LinkedIn</span>
            </h1>
            <p className="hero-description">
              Tu plataforma todo-en-uno para la creación de contenido en LinkedIn. Tu herramienta completa para crear posts con IA, 
              historias atractivas, artículos optimizados y mucho más.
            </p>
            <div className="hero-cta">
              <button className="btn-primary hero-btn" onClick={() => document.getElementById('contact').scrollIntoView()}>
                Probar LinkedAI
                <span className="btn-arrow">→</span>
              </button>
            </div>
            <div className="hero-features">
              <div className="hero-feature">
                <div className="feature-tick">✓</div>
                <span>Genera contenido viral en segundos</span>
              </div>
              <div className="hero-feature">
                <div className="feature-tick">✓</div>
                <span>Optimizado para el algoritmo de LinkedIn</span>
              </div>
              <div className="hero-feature">
                <div className="feature-tick">✓</div>
                <span>8+ herramientas profesionales incluidas</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Step Workflow Section */}
      <section id="features" className="workflow scroll-reveal">
        <div className="container">
          <div className="section-header">
            <h2>Proceso de 3 Pasos</h2>
            <p>Flujos de Trabajo Para Hacer Viral</p>
            <span className="workflow-subtitle">Ejemplo: Ve cómo generar un post viral de LinkedIn</span>
          </div>
          <div className="workflow-steps">
            <div className="workflow-step">
              <div className="step-number">
                <span className="step-icon">🎯</span>
                <span className="step-digit">1</span>
              </div>
              <div className="step-content">
                <h3>Elegir la herramienta</h3>
                <h4>Selecciona entre 8+ herramientas</h4>
                <p>Posts, artículos, imágenes, programación y más.</p>
              </div>
            </div>
            <div className="workflow-step">
              <div className="step-number">
                <span className="step-icon">💡</span>
                <span className="step-digit">2</span>
              </div>
              <div className="step-content">
                <h3>Describe tu idea</h3>
                <h4>Cuéntanos qué quieres crear</h4>
                <p>Tema, tono, audiencia y objetivos específicos.</p>
              </div>
            </div>
            <div className="workflow-step">
              <div className="step-number">
                <span className="step-icon">🚀</span>
                <span className="step-digit">3</span>
              </div>
              <div className="step-content">
                <h3>Genera contenido y empieza a ganar impacto</h3>
                <h4>Publica y ve los resultados</h4>
                <p>La IA crea contenido optimizado listo para viralizar.</p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Countless Tools Section */}
      <section id="demo" className="tools scroll-reveal">
        <div className="container">
          <div className="tools-content">
            <div className="tools-text">
              <h2>Herramientas Incluidas</h2>
              <p>LinkedAI tiene todo lo que necesitas para hacer viral</p>
              <span className="tools-subtitle">Desde generación de contenido con IA hasta optimización de LinkedIn, te tenemos cubierto.</span>
              <button className="btn-primary" onClick={() => document.getElementById('contact').scrollIntoView()}>
                Probar LinkedAI
              </button>
            </div>
            <div className="tools-grid">
              <div className="tool-card">
                <div className="tool-icon">📝</div>
                <h3>Generador de Posts</h3>
              </div>
              <div className="tool-card">
                <div className="tool-icon">📄</div>
                <h3>Generador de Artículos</h3>
              </div>
              <div className="tool-card">
                <div className="tool-icon">🎨</div>
                <h3>Creador de Imágenes</h3>
              </div>
              <div className="tool-card">
                <div className="tool-icon">📊</div>
                <h3>Biografías de LinkedIn</h3>
              </div>
              <div className="tool-card">
                <div className="tool-icon">📈</div>
                <h3>Presentaciones</h3>
              </div>
              <div className="tool-card">
                <div className="tool-icon">📧</div>
                <h3>Generador de Emails</h3>
              </div>
              <div className="tool-card">
                <div className="tool-icon">💼</div>
                <h3>Propuestas Comerciales</h3>
              </div>
              <div className="tool-card">
                <div className="tool-icon">📅</div>
                <h3>Programador de Contenido</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="testimonials scroll-reveal">
        <div className="container">
          <div className="testimonials-header">
            <h2>LinkedAI Ha Generado Miles de Millones de Visualizaciones.</h2>
            <p>Para Millones de Profesionales.</p>
          </div>
          <div className="testimonials-subtitle">
            <h3>Mira Lo Que Dicen Nuestros Usuarios</h3>
          </div>
          <div className="testimonials-grid">
            <div className="testimonial">
              <div className="testimonial-content">
                "He creado contenido para algunos de los profesionales más grandes de LinkedIn. LinkedAI es la herramienta que desearía haber tenido cuando empecé."
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" alt="Carlos" />
                </div>
                <div className="author-info">
                  <div className="author-name">Carlos</div>
                </div>
              </div>
            </div>
            <div className="testimonial">
              <div className="testimonial-content">
                "LinkedAI es la única herramienta que he encontrado que puede crear contenido viral de LinkedIn consistentemente. 10/10."
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">
                  <img src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face" alt="Ana" />
                </div>
                <div className="author-info">
                  <div className="author-name">Ana</div>
                </div>
              </div>
            </div>
            <div className="testimonial">
              <div className="testimonial-content">
                "Después de construir una marca personal con más de 1 millón de seguidores, construí LinkedAI para resolver mis propios problemas de escalabilidad."
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">
                  <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" alt="David" />
                </div>
                <div className="author-info">
                  <div className="author-name">David</div>
                </div>
              </div>
            </div>
            <div className="testimonial">
              <div className="testimonial-content">
                "LinkedAI hace que crear y optimizar contenido de LinkedIn sea mucho más fácil, ahora puedo enfocarme en estrategia y crecimiento."
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">
                  <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face" alt="Brandon" />
                </div>
                <div className="author-info">
                  <div className="author-name">Brandon</div>
                </div>
              </div>
            </div>
            <div className="testimonial">
              <div className="testimonial-content">
                "Su generador de contenido con IA es increíble. Me ahorra de necesitar múltiples suscripciones para diferentes herramientas."
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">
                  <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face" alt="Sarah" />
                </div>
                <div className="author-info">
                  <div className="author-name">Sarah</div>
                </div>
              </div>
            </div>
            <div className="testimonial">
              <div className="testimonial-content">
                "Ojalá hubiera encontrado esto antes. Los posts generados por IA son increíbles para LinkedIn. La suscripción más valiosa que tengo."
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">
                  <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face" alt="James" />
                </div>
                <div className="author-info">
                  <div className="author-name">James</div>
                </div>
              </div>
            </div>
          </div>
          <div className="testimonials-cta">
            <button className="btn-primary" onClick={() => document.getElementById('contact').scrollIntoView()}>
              Crear una cuenta
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="pricing">
        <div className="container">
          <div className="section-header">
            <h2>Planes de Precios</h2>
            <p>Elige el plan que mejor se adapte a tus necesidades</p>
          </div>
          <div className="pricing-grid">
            <div className="pricing-card">
              <div className="pricing-header">
                <h3>Básico</h3>
                <div className="price">
                  <span className="currency">€</span>
                  <span className="amount">12</span>
                  <span className="period">/mes</span>
                </div>
                <p className="price-description">Perfecto para empezar</p>
              </div>
              <div className="pricing-features">
                <div className="pricing-feature">✅ 50 posts generados/mes</div>
                <div className="pricing-feature">✅ Generador de posts</div>
                <div className="pricing-feature">✅ Generador de artículos</div>
                <div className="pricing-feature">✅ Soporte por email</div>
              </div>
              <button className="btn-secondary pricing-btn" onClick={() => document.getElementById('contact').scrollIntoView()}>
                Empezar
              </button>
            </div>
            
            <div className="pricing-card featured">
              <div className="pricing-badge">Más Popular</div>
              <div className="pricing-header">
                <h3>Profesional</h3>
                <div className="price">
                  <span className="currency">€</span>
                  <span className="amount">20</span>
                  <span className="period">/mes</span>
                </div>
                <p className="price-description">Para profesionales serios</p>
              </div>
              <div className="pricing-features">
                <div className="pricing-feature">✅ 200 posts generados/mes</div>
                <div className="pricing-feature">✅ Todas las herramientas</div>
                <div className="pricing-feature">✅ Programador de contenido</div>
                <div className="pricing-feature">✅ Analytics básicos</div>
                <div className="pricing-feature">✅ Soporte prioritario</div>
              </div>
              <button className="btn-primary pricing-btn" onClick={() => document.getElementById('contact').scrollIntoView()}>
                Empezar
              </button>
            </div>
            
            <div className="pricing-card">
              <div className="pricing-header">
                <h3>Empresarial</h3>
                <div className="price">
                  <span className="currency">€</span>
                  <span className="amount">30</span>
                  <span className="period">/mes</span>
                </div>
                <p className="price-description">Para equipos y empresas</p>
              </div>
              <div className="pricing-features">
                <div className="pricing-feature">✅ Generación ilimitada</div>
                <div className="pricing-feature">✅ Todas las herramientas</div>
                <div className="pricing-feature">✅ Analytics avanzados</div>
                <div className="pricing-feature">✅ Colaboración en equipo</div>
                <div className="pricing-feature">✅ Soporte 24/7</div>
                <div className="pricing-feature">✅ API personalizada</div>
              </div>
              <button className="btn-secondary pricing-btn" onClick={() => document.getElementById('contact').scrollIntoView()}>
                Empezar
              </button>
            </div>
          </div>
          <div className="pricing-guarantee">
            <span className="guarantee-icon">🛡️</span>
            <p>Garantía de 30 días o te devolvemos tu dinero</p>
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
          <div className="faq-list">
            <div className="faq-item">
              <div className="faq-question" onClick={() => toggleFAQ(0)}>
                <h4>¿Cuánto tiempo tardo en ver resultados?</h4>
                <span className="faq-icon">{openFAQ === 0 ? '−' : '+'}</span>
              </div>
              {openFAQ === 0 && (
                <div className="faq-answer">
                  <p>La mayoría de nuestros usuarios ven un aumento del 200-300% en interacciones en las primeras 48 horas. Los resultados más significativos aparecen en 7-14 días.</p>
                </div>
              )}
            </div>
            
            <div className="faq-item">
              <div className="faq-question" onClick={() => toggleFAQ(1)}>
                <h4>¿El contenido suena artificial?</h4>
                <span className="faq-icon">{openFAQ === 1 ? '−' : '+'}</span>
              </div>
              {openFAQ === 1 && (
                <div className="faq-answer">
                  <p>No. Nuestra IA aprende tu tono de voz y estilo personal. El contenido es indistinguible del que escribirías manualmente, pero optimizado para el algoritmo.</p>
                </div>
              )}
            </div>
            
            <div className="faq-item">
              <div className="faq-question" onClick={() => toggleFAQ(2)}>
                <h4>¿Puedo cancelar cuando quiera?</h4>
                <span className="faq-icon">{openFAQ === 2 ? '−' : '+'}</span>
              </div>
              {openFAQ === 2 && (
                <div className="faq-answer">
                  <p>Absolutamente. Sin contratos, sin penalizaciones. Cancela cuando quieras desde tu dashboard.</p>
                </div>
              )}
            </div>
            
            <div className="faq-item">
              <div className="faq-question" onClick={() => toggleFAQ(3)}>
                <h4>¿Puedo probar LinkedAI gratis?</h4>
                <span className="faq-icon">{openFAQ === 3 ? '−' : '+'}</span>
              </div>
              {openFAQ === 3 && (
                <div className="faq-answer">
                  <p>Sí, ofrecemos una prueba gratuita de 14 días sin compromiso. Puedes cancelar en cualquier momento sin penalizaciones.</p>
                </div>
              )}
            </div>
            
            <div className="faq-item">
              <div className="faq-question" onClick={() => toggleFAQ(4)}>
                <h4>¿Necesito conocimientos técnicos?</h4>
                <span className="faq-icon">{openFAQ === 4 ? '−' : '+'}</span>
              </div>
              {openFAQ === 4 && (
                <div className="faq-answer">
                  <p>No, LinkedAI está diseñado para ser extremadamente fácil de usar. Solo necesitas conectar tu cuenta de LinkedIn y la IA hace el resto.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="cta scroll-reveal">
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

