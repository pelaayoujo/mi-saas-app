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
              <span>50,000+ PROFESIONALES YA LO USAN</span>
            </div>
            <h1 className="hero-title">
              The #1 LinkedIn AI Tool
              <span className="highlight">LinkedAI</span>
              <br />
              Create Viral LinkedIn Content With AI
            </h1>
            <p className="hero-description">
              Your all-in-one platform for LinkedIn content creation. Your all-in-one tool for creating AI posts, 
              engaging stories, optimized articles, and more.
            </p>
            <div className="hero-cta">
              <button className="btn-primary" onClick={() => document.getElementById('contact').scrollIntoView()}>
                Try LinkedAI Now
                <span className="btn-arrow">→</span>
              </button>
              <button className="btn-secondary" onClick={() => document.getElementById('demo').scrollIntoView()}>
                See Demo
              </button>
            </div>
            <div className="hero-stats">
              <div className="stat">
                <div className="stat-number">+847%</div>
                <div className="stat-label">more engagement</div>
              </div>
              <div className="stat">
                <div className="stat-number">3.2M</div>
                <div className="stat-label">impressions</div>
              </div>
              <div className="stat">
                <div className="stat-number">24h</div>
                <div className="stat-label">to see results</div>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-demo">
              <div className="demo-header">
                <div className="demo-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <div className="demo-title">LinkedAI Editor</div>
              </div>
              <div className="demo-content">
                <div className="demo-sidebar">
                  <div className="sidebar-item active">
                    <span className="sidebar-icon">📝</span>
                    <span>AI Post Generator</span>
                  </div>
                  <div className="sidebar-item">
                    <span className="sidebar-icon">🎨</span>
                    <span>Image Creator</span>
                  </div>
                  <div className="sidebar-item">
                    <span className="sidebar-icon">📊</span>
                    <span>Analytics</span>
                  </div>
                </div>
                <div className="demo-main">
                  <div className="demo-preview">
                    <div className="preview-post">
                      <div className="post-header">
                        <div className="post-avatar">👤</div>
                        <div className="post-info">
                          <div className="post-name">Your Name</div>
                          <div className="post-title">Professional Title</div>
                        </div>
                      </div>
                      <div className="post-content">
                        <p>🚀 <strong>BREAKING: This AI tool changed my LinkedIn game completely!</strong></p>
                        <p>In just 30 days, I went from 500 to 15,000 followers using only AI-generated content.</p>
                        <p>The secret: <strong>LinkedAI</strong> analyzed 10M+ successful posts...</p>
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
            </div>
          </div>
        </div>
      </section>

      {/* 3 Step Workflow Section */}
      <section id="features" className="workflow scroll-reveal">
        <div className="container">
          <div className="section-header">
            <h2>3 Step Workflow</h2>
            <p>Workflows To Go Viral</p>
            <span className="workflow-subtitle">Example: See how to generate a viral LinkedIn post</span>
          </div>
          <div className="workflow-steps">
            <div className="workflow-step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Make an account</h3>
                <h4>Upload your content</h4>
                <p>Use any topic, or connect your LinkedIn profile.</p>
              </div>
            </div>
            <div className="workflow-step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Select Content style</h3>
                <h4>Choose from 15+ viral styles</h4>
                <p>Professional, casual, inspirational, educational, and more.</p>
              </div>
            </div>
            <div className="workflow-step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Generate Content</h3>
                <h4>Watch it generate content in seconds</h4>
                <p>AI creates optimized posts ready to publish.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Web-Based Editor Section */}
      <section className="editor-demo scroll-reveal">
        <div className="container">
          <div className="editor-content">
            <div className="editor-text">
              <h2>Web-Based Editor.</h2>
              <p>Full control with our web editor.</p>
              <span className="editor-subtitle">Feels like magic.</span>
              <button className="btn-primary" onClick={() => document.getElementById('contact').scrollIntoView()}>
                Try LinkedAI Now
              </button>
            </div>
            <div className="editor-visual">
              <div className="editor-preview">
                <div className="editor-header">
                  <div className="editor-tabs">
                    <div className="tab active">Post Generator</div>
                    <div className="tab">Image Creator</div>
                    <div className="tab">Analytics</div>
                  </div>
                </div>
                <div className="editor-body">
                  <div className="editor-sidebar">
                    <div className="sidebar-section">
                      <h4>Content Type</h4>
                      <div className="option active">LinkedIn Post</div>
                      <div className="option">Article</div>
                      <div className="option">Story</div>
                    </div>
                    <div className="sidebar-section">
                      <h4>Tone</h4>
                      <div className="option active">Professional</div>
                      <div className="option">Casual</div>
                      <div className="option">Inspirational</div>
                    </div>
                  </div>
                  <div className="editor-main">
                    <div className="editor-input">
                      <textarea placeholder="Describe your content idea..."></textarea>
                    </div>
                    <div className="editor-output">
                      <div className="generated-content">
                        <p>🚀 <strong>BREAKING: This AI tool changed my LinkedIn game completely!</strong></p>
                        <p>In just 30 days, I went from 500 to 15,000 followers using only AI-generated content.</p>
                        <p>The secret: <strong>LinkedAI</strong> analyzed 10M+ successful posts...</p>
                      </div>
                    </div>
                  </div>
                </div>
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
              <h2>Countless Tools</h2>
              <p>LinkedAI has everything you need to go viral</p>
              <span className="tools-subtitle">From cutting-edge AI content generation to LinkedIn optimization, we've got you covered.</span>
              <button className="btn-primary" onClick={() => document.getElementById('contact').scrollIntoView()}>
                Try LinkedAI Now
              </button>
            </div>
            <div className="tools-grid">
              <div className="tool-card">
                <div className="tool-icon">🤖</div>
                <h3>AI Post Generator</h3>
              </div>
              <div className="tool-card">
                <div className="tool-icon">🎨</div>
                <h3>AI Image Creator</h3>
              </div>
              <div className="tool-card">
                <div className="tool-icon">📝</div>
                <h3>AI Article Writer</h3>
              </div>
              <div className="tool-card">
                <div className="tool-icon">📊</div>
                <h3>LinkedIn Analytics</h3>
              </div>
              <div className="tool-card">
                <div className="tool-icon">🎯</div>
                <h3>Content Optimizer</h3>
              </div>
              <div className="tool-card">
                <div className="tool-icon">⚡</div>
                <h3>Auto Scheduler</h3>
              </div>
              <div className="tool-card">
                <div className="tool-icon">💬</div>
                <h3>Comment Generator</h3>
              </div>
              <div className="tool-card">
                <div className="tool-icon">🔍</div>
                <h3>Trend Analyzer</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="testimonials scroll-reveal">
        <div className="container">
          <div className="testimonials-header">
            <h2>LinkedAI Has Generated Billions of Views.</h2>
            <p>For Millions of Professionals.</p>
          </div>
          <div className="testimonials-subtitle">
            <h3>See What Our Users Are Saying</h3>
          </div>
          <div className="testimonials-grid">
            <div className="testimonial">
              <div className="testimonial-content">
                "I've created content for some of the biggest professionals on LinkedIn. LinkedAI is the tool I wish I had when I started."
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">👨‍💼</div>
                <div className="author-info">
                  <div className="author-name">Carlos</div>
                </div>
              </div>
            </div>
            <div className="testimonial">
              <div className="testimonial-content">
                "LinkedAI is the only tool I've found that can create viral LinkedIn content consistently. 10/10."
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">👩‍💻</div>
                <div className="author-info">
                  <div className="author-name">Ana</div>
                </div>
              </div>
            </div>
            <div className="testimonial">
              <div className="testimonial-content">
                "After building a personal brand with over 1 million followers, I built LinkedAI to solve my own scaling problems."
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">👨‍🚀</div>
                <div className="author-info">
                  <div className="author-name">David</div>
                </div>
              </div>
            </div>
            <div className="testimonial">
              <div className="testimonial-content">
                "LinkedAI makes creating and optimizing LinkedIn content so much easier, now I can focus on strategy & growth."
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">👨‍💼</div>
                <div className="author-info">
                  <div className="author-name">Brandon</div>
                </div>
              </div>
            </div>
            <div className="testimonial">
              <div className="testimonial-content">
                "Their AI content generator is insane. It saves me from needing multiple subscriptions for different tools."
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">👩‍💻</div>
                <div className="author-info">
                  <div className="author-name">Sarah</div>
                </div>
              </div>
            </div>
            <div className="testimonial">
              <div className="testimonial-content">
                "I wish I found this sooner. AI-generated posts are OP for LinkedIn. Most worth it subscription I have."
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">👨‍🚀</div>
                <div className="author-info">
                  <div className="author-name">James</div>
                </div>
              </div>
            </div>
          </div>
          <div className="testimonials-cta">
            <button className="btn-primary" onClick={() => document.getElementById('contact').scrollIntoView()}>
              Make an account
            </button>
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
            <div className="faq-item">
              <h4>¿Cómo funciona la IA de LinkedAI?</h4>
              <p>Nuestra IA analiza más de 10 millones de posts exitosos de LinkedIn para entender qué contenido genera más engagement. Luego crea contenido personalizado basado en tu industria y audiencia.</p>
            </div>
            <div className="faq-item">
              <h4>¿Qué tipo de contenido puede generar?</h4>
              <p>LinkedAI puede crear posts de texto, carruseles, infografías, historias profesionales, artículos y hasta respuestas automáticas a comentarios. Todo optimizado para el algoritmo de LinkedIn.</p>
            </div>
            <div className="faq-item">
              <h4>¿Es seguro usar LinkedAI?</h4>
              <p>Sí, utilizamos encriptación de extremo a extremo y cumplimos con todas las regulaciones de privacidad. Tu información y contenido están completamente seguros.</p>
            </div>
            <div className="faq-item">
              <h4>¿Puedo probar LinkedAI gratis?</h4>
              <p>Sí, ofrecemos una prueba gratuita de 14 días sin compromiso. Puedes cancelar en cualquier momento sin penalizaciones.</p>
            </div>
            <div className="faq-item">
              <h4>¿Qué incluye el plan Pro?</h4>
              <p>El plan Pro incluye contenido ilimitado, imágenes automáticas, estrategia personalizada, programación de posts, análisis de competencia, respuestas automáticas y soporte prioritario 24/7.</p>
            </div>
            <div className="faq-item">
              <h4>¿Necesito conocimientos técnicos?</h4>
              <p>No, LinkedAI está diseñado para ser extremadamente fácil de usar. Solo necesitas conectar tu cuenta de LinkedIn y la IA hace el resto.</p>
            </div>
            <div className="faq-item">
              <h4>¿Cómo mido el éxito de mi contenido?</h4>
              <p>LinkedAI incluye un dashboard completo con métricas detalladas: interacciones, alcance, leads generados, crecimiento de seguidores y análisis de rendimiento por post.</p>
            </div>
            <div className="faq-item">
              <h4>¿Ofrecen soporte en español?</h4>
              <p>Sí, nuestro equipo de soporte habla español y está disponible 24/7 para ayudarte con cualquier pregunta o problema que puedas tener.</p>
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

