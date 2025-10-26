"use client"
import { useState } from 'react'
import './page.css'

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')
  const [openFAQ, setOpenFAQ] = useState(null)

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index)
  }

  const handleTrialSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        setSubmitMessage('¡Gracias! Te hemos enviado un email con acceso a la prueba.')
        setEmail('')
      } else if (response.status === 409) {
        setSubmitMessage('Este email ya está registrado. ¡Gracias por tu interés!')
        setEmail('')
      } else {
        const errorData = await response.json()
        setSubmitMessage(errorData.error || 'Error al procesar tu solicitud. Inténtalo de nuevo.')
      }
    } catch (error) {
      setSubmitMessage('Error de conexión. Inténtalo de nuevo.')
    }
    
      setIsSubmitting(false)
  }

  return (
    <div className="homepage">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <div className="logo-icon">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <rect width="32" height="32" rx="8" fill="url(#gradient)"/>
                <path d="M8 8h16v16H8V8z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 12h8v8h-8v-8z" fill="white" opacity="0.8"/>
                <defs>
                  <linearGradient id="gradient" x1="0" y1="0" x2="32" y2="32">
                    <stop offset="0%" stopColor="#0077B5"/>
                    <stop offset="100%" stopColor="#4facfe"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <span className="logo-text">LinkedAI</span>
          </div>
          
          <div className="nav-links">
            <a href="#features">Características</a>
            <a href="#comparison">Comparación</a>
            <a href="#testimonials">Testimonios</a>
            <a href="#pricing">Precios</a>
            <a href="/dashboard" className="nav-login">Iniciar Sesión</a>
            <a href="#trial" className="nav-cta">Comenzar Gratis</a>
          </div>

          <button className="mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        {isMenuOpen && (
          <div className="mobile-menu">
            <a href="#features">Características</a>
            <a href="#comparison">Comparación</a>
            <a href="#testimonials">Testimonios</a>
            <a href="#pricing">Precios</a>
            <a href="/dashboard">Iniciar Sesión</a>
            <a href="#trial">Comenzar Gratis</a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-background">
          <div className="hero-gradient"></div>
          <div className="hero-pattern"></div>
        </div>
        
          <div className="hero-content">
            <div className="hero-badge">
            <span className="badge-icon">🔥</span>
            <span>LIMITADO: Solo quedan 127 espacios para el lanzamiento privado</span>
            </div>
          
            <h1 className="hero-title">
            La IA que analiza <span className="gradient-text">millones de artículos</span> para optimizar tu contenido
            </h1>
          
            <p className="hero-description">
            <strong>LinkedAI estudia patrones de contenido exitoso</strong> y te proporciona insights basados en datos reales. 
            Optimiza tu contenido con análisis de millones de artículos que realmente funcionan en LinkedIn.
          </p>
          
            <div className="hero-actions">
            <a href="#trial" className="btn-primary">
              <span>🚀 PROBAR ANÁLISIS DE IA GRATIS</span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M4.167 10h11.666M10 4.167L15.833 10 10 15.833" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <p className="hero-guarantee">
              ✅ <strong>100% GRATIS</strong> durante el lanzamiento privado
              <br />⚠️ <strong>Solo 127 espacios disponibles</strong>
            </p>
            </div>
          
            <div className="hero-stats">
              <div className="stat">
              <div className="stat-number">3x</div>
              <div className="stat-label">Más oportunidades</div>
              </div>
              <div className="stat">
              <div className="stat-number">847%</div>
              <div className="stat-label">Más engagement</div>
              </div>
              <div className="stat">
              <div className="stat-number">23 min</div>
              <div className="stat-label">Para contenido viral</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <div className="container">
          <div className="section-header">
            <h2>¿Por qué elegir LinkedAI?</h2>
            <p>La IA más avanzada para analizar y optimizar contenido profesional en LinkedIn</p>
          </div>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <rect width="48" height="48" rx="12" fill="rgba(0, 119, 181, 0.1)"/>
                  <path d="M24 8L30 18H40L32 26L36 36L24 30L12 36L16 26L8 18H18L24 8Z" fill="#0077B5"/>
                </svg>
              </div>
              <h3>Análisis de Patrones</h3>
              <p>IA que estudia millones de artículos exitosos para identificar qué funciona y optimizar tu contenido</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <rect width="48" height="48" rx="12" fill="rgba(0, 119, 181, 0.1)"/>
                  <path d="M16 12H32C34.2091 12 36 13.7909 36 16V32C36 34.2091 34.2091 36 32 36H16C13.7909 36 12 34.2091 12 32V16C12 13.7909 13.7909 12 16 12Z" stroke="#0077B5" strokeWidth="2"/>
                  <path d="M20 20H28M20 24H28M20 28H24" stroke="#0077B5" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h3>Insights Específicos</h3>
              <p>Análisis detallado de qué tipo de contenido funciona mejor para tu industria y audiencia específica</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <rect width="48" height="48" rx="12" fill="rgba(0, 119, 181, 0.1)"/>
                  <path d="M24 8V40M8 24H40" stroke="#0077B5" strokeWidth="2" strokeLinecap="round"/>
                  <circle cx="24" cy="24" r="8" stroke="#0077B5" strokeWidth="2"/>
                </svg>
              </div>
              <h3>Datos en Tiempo Real</h3>
              <p>Análisis continuo de tendencias y métricas para mantener tu contenido siempre optimizado</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <rect width="48" height="48" rx="12" fill="rgba(0, 119, 181, 0.1)"/>
                  <path d="M16 16H32V32H16V16Z" stroke="#0077B5" strokeWidth="2"/>
                  <path d="M20 20V28M24 20V28M28 20V28" stroke="#0077B5" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h3>Optimización de Timing</h3>
              <p>Análisis de datos para identificar los mejores momentos para publicar según tu audiencia</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <rect width="48" height="48" rx="12" fill="rgba(0, 119, 181, 0.1)"/>
                  <path d="M24 8L28 20H40L30 28L34 40L24 32L14 40L18 28L8 20H20L24 8Z" stroke="#0077B5" strokeWidth="2"/>
                </svg>
              </div>
              <h3>Análisis Personalizado</h3>
              <p>Insights específicos para tu industria, audiencia y objetivos profesionales únicos</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <rect width="48" height="48" rx="12" fill="rgba(0, 119, 181, 0.1)"/>
                  <path d="M24 8C15.1634 8 8 15.1634 8 24C8 32.8366 15.1634 40 24 40C32.8366 40 40 32.8366 40 24C40 15.1634 32.8366 8 24 8Z" stroke="#0077B5" strokeWidth="2"/>
                  <path d="M24 16V24L28 28" stroke="#0077B5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>ROI Medible</h3>
              <p>Análisis de métricas para demostrar el impacto real de tu contenido en tu crecimiento profesional</p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section id="comparison" className="comparison">
        <div className="container">
          <div className="section-header">
            <h2>La diferencia es evidente</h2>
            <p>Compara un resultado genérico de ChatGPT vs. LinkedAI optimizado para LinkedIn</p>
          </div>
          
          <div className="comparison-grid">
            <div className="comparison-card chatgpt-result">
              <div className="comparison-header">
                <div className="comparison-badge chatgpt-badge">ChatGPT Genérico</div>
                <div className="comparison-icon chatgpt-logo">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <rect width="32" height="32" rx="6" fill="url(#chatgptGradient)"/>
                    <path d="M25.5 14.25C25.2 11.65 23.55 9.4 21.1 8.45C19.55 7.85 17.85 7.75 16.2 8.2C14.85 8.55 13.6 9.25 12.6 10.25C11.6 11.25 10.9 12.5 10.55 13.85C10.05 15.6 10.2 17.45 10.95 19.15C11.7 20.85 12.95 22.25 14.5 23.15C16.05 24.05 17.8 24.4 19.55 24.15C21.05 23.95 22.45 23.35 23.6 22.4C24.75 21.45 25.6 20.25 26 18.95C26.4 17.65 26.3 16.25 25.8 15C25.7 14.7 25.6 14.45 25.5 14.25Z" fill="white"/>
                    <defs>
                      <linearGradient id="chatgptGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#74AA9C"/>
                        <stop offset="100%" stopColor="#00A67E"/>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
              <div className="comparison-content">
                <h4>Título genérico</h4>
                <p>"Contenido profesional para LinkedIn"</p>
                <div className="comparison-post">
                  <div className="post-content">
                    <p>En el mundo laboral actual, es importante mantenerse activo en redes profesionales. LinkedIn es una plataforma clave para networking y desarrollo de carrera. Aquí tienes algunos consejos generales para mejorar tu presencia.</p>
                    <p>Es fundamental crear contenido de valor, conectar con otros profesionales y mantener un perfil actualizado. La consistencia es clave para el éxito en LinkedIn.</p>
                    <p>Algunas recomendaciones básicas incluyen actualizar regularmente tu perfil, publicar contenido relevante y participar en discusiones profesionales. Estos pasos te ayudarán a construir una presencia sólida en la plataforma.</p>
                    <p>Recuerda que la paciencia es importante. Los resultados no se verán de la noche a la mañana, pero con dedicación constante podrás mejorar tu visibilidad profesional.</p>
                  </div>
                </div>
                <div className="comparison-metrics">
                  <div className="metric negative">
                    <span className="metric-label">Engagement esperado:</span>
                    <span className="metric-value">15-30 likes</span>
                  </div>
                  <div className="metric negative">
                    <span className="metric-label">Comentarios:</span>
                    <span className="metric-value">1-3 comentarios</span>
                  </div>
                  <div className="metric negative">
                    <span className="metric-label">Alcance promedio:</span>
                    <span className="metric-value">50-100 personas</span>
                  </div>
                  <div className="metric negative">
                    <span className="metric-label">Tiempo de creación:</span>
                    <span className="metric-value">Sin optimizar</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="comparison-vs">
              <div className="vs-circle">
                <span>VS</span>
              </div>
            </div>

            <div className="comparison-card linkedai-result">
              <div className="comparison-header">
                <div className="comparison-badge linkedai-badge">LinkedAI Optimizado</div>
                <div className="comparison-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <rect width="24" height="24" rx="4" fill="#0077B5"/>
                    <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z" fill="white"/>
                  </svg>
                </div>
              </div>
              <div className="comparison-content">
                <h4>🚀 ¿Sabías que el 87% de los reclutadores revisa LinkedIn ANTES de una entrevista?</h4>
                <p>Este dato cambió completamente mi estrategia de networking...</p>
                <div className="comparison-post">
                  <div className="post-content">
                    <p><strong>Hace 3 meses:</strong> Mi perfil de LinkedIn tenía 200 conexiones y posts con 5 likes promedio.</p>
                    <p><strong>Hoy:</strong> +2,500 conexiones cualificadas y posts que generan 150+ interacciones.</p>
                    <p>¿El cambio? Empecé a crear contenido que realmente aporta valor específico a mi sector (Marketing Digital).</p>
                    <p><strong>3 estrategias que funcionan:</strong></p>
                    <p>1️⃣ Compartir casos de éxito con métricas reales<br/>
                    2️⃣ Hacer preguntas que generen debate profesional<br/>
                    3️⃣ Contar historias de fracasos y aprendizajes</p>
                    <p><em>¿Qué estrategia funciona mejor en tu industria? 👇</em></p>
                  </div>
                </div>
                <div className="comparison-metrics">
                  <div className="metric positive">
                    <span className="metric-label">Engagement típico:</span>
                    <span className="metric-value">150-400 likes</span>
                  </div>
                  <div className="metric positive">
                    <span className="metric-label">Comentarios:</span>
                    <span className="metric-value">25-60 comentarios</span>
                  </div>
                  <div className="metric positive">
                    <span className="metric-label">Alcance promedio:</span>
                    <span className="metric-value">1,500-3,000 personas</span>
                  </div>
                  <div className="metric positive">
                    <span className="metric-label">Tiempo de creación:</span>
                    <span className="metric-value">2 minutos optimizado</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="comparison-cta">
            <p className="comparison-text">¿Listo para crear contenido que realmente destaque?</p>
            <a href="#trial" className="btn-primary">
              <span>Empezar a generar contenido profesional</span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M4.167 10h11.666M10 4.167L15.833 10 10 15.833" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>
      </section>


      {/* Testimonials Section */}
      <section id="testimonials" className="testimonials">
        <div className="container">
          <div className="section-header">
            <h2>Resultados reales de profesionales</h2>
            <p>LinkedAI analiza millones de artículos exitosos para optimizar tu contenido</p>
          </div>
          
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-quote">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
                  <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
                </svg>
              </div>
              <p>"LinkedAI me ayuda a optimizar mi contenido basándose en datos reales. Sus análisis de tendencias me han permitido crear posts que realmente conectan con mi audiencia."</p>
              <div className="testimonial-author">
                <div className="author-info">
                  <h4>María González</h4>
                  <span>Marketing Director, TechCorp</span>
                </div>
                <div className="testimonial-rating">
                  <span>★★★★★</span>
                </div>
              </div>
            </div>
            
            <div className="testimonial-card">
              <div className="testimonial-quote">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
                  <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
                </svg>
              </div>
              <p>"La IA de LinkedAI analiza patrones de contenido exitoso y me sugiere optimizaciones específicas. Mis posts ahora generan 3x más leads calificados."</p>
              <div className="testimonial-author">
                <div className="author-info">
                  <h4>Carlos Ruiz</h4>
                  <span>CEO, InnovateLab</span>
                </div>
                <div className="testimonial-rating">
                  <span>★★★★★</span>
                </div>
              </div>
            </div>
            
            <div className="testimonial-card">
              <div className="testimonial-quote">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
                  <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
                </svg>
              </div>
              <p>"LinkedAI no escribe por mí, sino que analiza millones de artículos para darme insights sobre qué funciona. Mis posts ahora tienen un engagement 4x superior."</p>
              <div className="testimonial-author">
                <div className="author-info">
                  <h4>Ana Martín</h4>
                  <span>Consultora Senior, McKinsey</span>
                </div>
                <div className="testimonial-rating">
                  <span>★★★★★</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="testimonials-stats">
            <div className="stat-item">
              <div className="stat-number">2.5M+</div>
              <div className="stat-label">Artículos analizados</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">98%</div>
              <div className="stat-label">Precisión en predicciones</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">15K+</div>
              <div className="stat-label">Profesionales activos</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="pricing">
        <div className="container">
          <div className="section-header">
            <h2>Planes para cada profesional</h2>
            <p>Elige el plan que mejor se adapte a tus necesidades</p>
          </div>
          
          <div className="pricing-grid">
          <div className="pricing-card">
            <div className="pricing-header">
                <h3>Plan Básico</h3>
                <p>Perfecto para empezar</p>
              </div>
              <div className="pricing-price">
                <span className="currency">€</span>
                <span className="amount">12</span>
                <span className="period">/mes</span>
              </div>
              <ul className="pricing-features">
                <li>8,000 tokens mensuales</li>
                <li>~15-20 artículos por mes</li>
                <li>Plantillas básicas</li>
                <li>Soporte por email</li>
              </ul>
              <a href="#trial" className="pricing-btn">Próximamente</a>
            </div>
            
            <div className="pricing-card featured">
              <div className="pricing-badge">Más popular</div>
              <div className="pricing-header">
                <h3>Plan Profesional</h3>
                <p>Para profesionales serios</p>
            </div>
              <div className="pricing-price">
                <span className="currency">€</span>
                <span className="amount">20</span>
                <span className="period">/mes</span>
            </div>
              <ul className="pricing-features">
                <li>16,000 tokens mensuales</li>
                <li>~30-40 artículos por mes</li>
                <li>Todas las plantillas</li>
                <li>Programación de contenido</li>
                <li>Soporte prioritario</li>
              </ul>
              <a href="#trial" className="pricing-btn">Próximamente</a>
        </div>
            
            <div className="pricing-card">
              <div className="pricing-header">
                <h3>Empresarial</h3>
                <p>Para equipos y empresas</p>
          </div>
              <div className="pricing-price">
                <span className="currency">€</span>
                <span className="amount">35</span>
                <span className="period">/mes</span>
            </div>
              <ul className="pricing-features">
                <li>32,000 tokens mensuales</li>
                <li>~60-80 artículos por mes</li>
                <li>Múltiples usuarios</li>
                <li>Analytics avanzados</li>
                <li>Soporte 24/7</li>
              </ul>
              <a href="#trial" className="pricing-btn">Próximamente</a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="faq">
        <div className="container">
          <div className="section-header">
            <h2>Preguntas Frecuentes</h2>
            <p>Resolvemos las dudas más comunes sobre LinkedAI</p>
          </div>
          
          <div className="faq-container">
            <div className="faq-item" onClick={() => toggleFAQ(0)}>
              <div className="faq-question">
                <h3>¿Qué es LinkedAI y cómo funciona?</h3>
                <span className={`faq-icon ${openFAQ === 0 ? 'open' : ''}`}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 4.167v11.666M4.167 10h11.666" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </div>
              {openFAQ === 0 && (
                <div className="faq-answer">
                  <p>LinkedAI es una herramienta de inteligencia artificial que analiza millones de artículos de LinkedIn para generar contenido optimizado específicamente para tu perfil profesional. Nuestra IA estudia patrones de engagement, tonos efectivos y estructuras que funcionan mejor en LinkedIn para crear posts que realmente conecten con tu audiencia.</p>
                </div>
              )}
            </div>

            <div className="faq-item" onClick={() => toggleFAQ(1)}>
              <div className="faq-question">
                <h3>¿Cuánto cuesta usar LinkedAI?</h3>
                <span className={`faq-icon ${openFAQ === 1 ? 'open' : ''}`}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 4.167v11.666M4.167 10h11.666" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </div>
              {openFAQ === 1 && (
                <div className="faq-answer">
                  <p>Actualmente estamos en fase de lanzamiento privado gratuito. Los usuarios autorizados pueden probar la herramienta sin costo. Próximamente tendremos planes desde €12/mes para uso básico, €20/mes para uso profesional y €35/mes para empresas. Todos los planes incluyen garantía de 30 días.</p>
                </div>
              )}
            </div>

            <div className="faq-item" onClick={() => toggleFAQ(2)}>
              <div className="faq-question">
                <h3>¿Cómo me registro para la prueba gratuita?</h3>
                <span className={`faq-icon ${openFAQ === 2 ? 'open' : ''}`}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 4.167v11.666M4.167 10h11.666" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </div>
              {openFAQ === 2 && (
                <div className="faq-answer">
                  <p>Simplemente introduce tu email en el formulario de abajo. Te añadiremos a nuestra lista de espera y te notificaremos cuando tengas acceso. El proceso es completamente gratuito y sin compromiso. Puedes cancelar tu participación en cualquier momento.</p>
                </div>
              )}
            </div>

            <div className="faq-item" onClick={() => toggleFAQ(3)}>
              <div className="faq-question">
                <h3>¿Qué tipos de contenido puede generar LinkedAI?</h3>
                <span className={`faq-icon ${openFAQ === 3 ? 'open' : ''}`}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 4.167v11.666M4.167 10h11.666" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </div>
              {openFAQ === 3 && (
                <div className="faq-answer">
                  <p>LinkedAI puede generar posts profesionales, artículos educativos, contenido inspiracional, mensajes disruptivos y conversaciones casuales. También optimiza biografías de LinkedIn, crea mensajes de conexión personalizados y programa contenido para mantener una presencia constante en la plataforma.</p>
                </div>
              )}
            </div>

            <div className="faq-item" onClick={() => toggleFAQ(4)}>
              <div className="faq-question">
                <h3>¿Es seguro usar LinkedAI con mi cuenta de LinkedIn?</h3>
                <span className={`faq-icon ${openFAQ === 4 ? 'open' : ''}`}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 4.167v11.666M4.167 10h11.666" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </div>
              {openFAQ === 4 && (
                <div className="faq-answer">
                  <p>Absolutamente. LinkedAI no requiere acceso directo a tu cuenta de LinkedIn. Simplemente generamos el contenido optimizado que tú puedes copiar y pegar manualmente en tu perfil. No almacenamos credenciales ni accedemos a tu información personal de LinkedIn.</p>
                </div>
              )}
            </div>

            <div className="faq-item" onClick={() => toggleFAQ(5)}>
              <div className="faq-question">
                <h3>¿Qué resultados puedo esperar con LinkedAI?</h3>
                <span className={`faq-icon ${openFAQ === 5 ? 'open' : ''}`}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 4.167v11.666M4.167 10h11.666" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </div>
              {openFAQ === 5 && (
                <div className="faq-answer">
                  <p>Nuestros usuarios reportan un aumento promedio del 150% en engagement, ahorro de 4 horas semanales en creación de contenido, y un incremento salarial anual promedio de €5,000. El contenido generado está optimizado para maximizar tu visibilidad profesional y networking efectivo.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Trial Section */}
      <section id="trial" className="trial">
        <div className="container">
          <div className="trial-content">
            <h2>¿Listo para transformar tu LinkedIn?</h2>
            <p>Únete a la prueba de lanzamiento privada gratuita de LinkedAI</p>
            
            <form className="trial-form" onSubmit={handleTrialSubmit}>
              <div className="form-group">
                <input 
                  type="email" 
                  placeholder="Tu email para la prueba gratuita" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
                <button type="submit" className="btn-primary large">
                  <span>Comenzar Prueba Gratis</span>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
              <p className="trial-disclaimer">
                Sin compromiso. Cancela cuando quieras. Acceso inmediato.
              </p>
              {submitMessage && (
                <p className={`submit-message ${submitMessage.includes('Gracias') || submitMessage.includes('registrado') ? 'success' : 'error'}`}>
                  {submitMessage}
                </p>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <div className="footer-logo">
                <div className="logo-icon">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <rect width="32" height="32" rx="8" fill="url(#gradient)"/>
                    <path d="M8 8h16v16H8V8z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 12h8v8h-8v-8z" fill="white" opacity="0.8"/>
                    <defs>
                      <linearGradient id="gradient" x1="0" y1="0" x2="32" y2="32">
                        <stop offset="0%" stopColor="#0077B5"/>
                        <stop offset="100%" stopColor="#4facfe"/>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <span>LinkedAI</span>
              </div>
              <p>La herramienta de IA más potente para LinkedIn</p>
            </div>
            
            <div className="footer-section">
                <h4>Producto</h4>
              <a href="#features">Características</a>
                <a href="#pricing">Precios</a>
              <a href="/dashboard">Dashboard</a>
              </div>
            
            <div className="footer-section">
              <h4>Recursos</h4>
              <a href="#demo">Demo</a>
              <a href="#testimonials">Testimonios</a>
              <a href="#help">Ayuda</a>
              </div>
            
            <div className="footer-section">
              <h4>Empresa</h4>
              <a href="#about">Sobre nosotros</a>
              <a href="#contact">Contacto</a>
              <a href="#privacy">Privacidad</a>
              </div>
            </div>
          
          <div className="footer-bottom">
            <p>&copy; 2024 LinkedAI. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}