"use client"
import { useState } from 'react'
import './page.css'

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

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
            Potencia tu <span className="gradient-text">carrera profesional</span> en LinkedIn
            <br />sin escribir una sola palabra
            </h1>
          
            <p className="hero-description">
            <strong>Los profesionales TOP de LinkedIn aceleran su crecimiento</strong> usando IA para su contenido. 
            LinkedAI genera posts que posicionan, conectan con tu audiencia y abren nuevas oportunidades laborales.
          </p>
          
            <div className="hero-actions">
            <a href="#trial" className="btn-primary">
              <span>🚀 CONSEGUIR ACCESO EXCLUSIVO GRATIS</span>
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
            <p>La herramienta más avanzada para crear contenido profesional en LinkedIn</p>
          </div>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <rect width="48" height="48" rx="12" fill="rgba(0, 119, 181, 0.1)"/>
                  <path d="M24 8L30 18H40L32 26L36 36L24 30L12 36L16 26L8 18H18L24 8Z" fill="#0077B5"/>
                </svg>
              </div>
              <h3>Contenido Optimizado</h3>
              <p>Algoritmos avanzados que crean posts específicamente diseñados para maximizar el engagement en LinkedIn</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <rect width="48" height="48" rx="12" fill="rgba(0, 119, 181, 0.1)"/>
                  <path d="M16 12H32C34.2091 12 36 13.7909 36 16V32C36 34.2091 34.2091 36 32 36H16C13.7909 36 12 34.2091 12 32V16C12 13.7909 13.7909 12 16 12Z" stroke="#0077B5" strokeWidth="2"/>
                  <path d="M20 20H28M20 24H28M20 28H24" stroke="#0077B5" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h3>Múltiples Formatos</h3>
              <p>Posts, artículos, biografías, presentaciones y más. Todo lo que necesitas para destacar en LinkedIn</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <rect width="48" height="48" rx="12" fill="rgba(0, 119, 181, 0.1)"/>
                  <path d="M24 8V40M8 24H40" stroke="#0077B5" strokeWidth="2" strokeLinecap="round"/>
                  <circle cx="24" cy="24" r="8" stroke="#0077B5" strokeWidth="2"/>
                </svg>
              </div>
              <h3>Análisis Inteligente</h3>
              <p>IA que analiza tendencias y optimiza tu contenido para alcanzar a la audiencia correcta</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <rect width="48" height="48" rx="12" fill="rgba(0, 119, 181, 0.1)"/>
                  <path d="M16 16H32V32H16V16Z" stroke="#0077B5" strokeWidth="2"/>
                  <path d="M20 20V28M24 20V28M28 20V28" stroke="#0077B5" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h3>Programación Automática</h3>
              <p>Planifica y publica tu contenido en los momentos óptimos para maximizar la visibilidad</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <rect width="48" height="48" rx="12" fill="rgba(0, 119, 181, 0.1)"/>
                  <path d="M24 8L28 20H40L30 28L34 40L24 32L14 40L18 28L8 20H20L24 8Z" stroke="#0077B5" strokeWidth="2"/>
                </svg>
              </div>
              <h3>Personalización Total</h3>
              <p>Adapta el tono, estilo y contenido a tu marca personal y objetivos profesionales</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <rect width="48" height="48" rx="12" fill="rgba(0, 119, 181, 0.1)"/>
                  <path d="M24 8C15.1634 8 8 15.1634 8 24C8 32.8366 15.1634 40 24 40C32.8366 40 40 32.8366 40 24C40 15.1634 32.8366 8 24 8Z" stroke="#0077B5" strokeWidth="2"/>
                  <path d="M24 16V24L28 28" stroke="#0077B5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Ahorro de Tiempo</h3>
              <p>Reduce el tiempo de creación de contenido en un 80% y enfócate en lo que realmente importa</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="benefits">
        <div className="container">
          <div className="benefits-content">
            <div className="benefits-text">
              <h2>¿Por qué LinkedAI es la herramienta que necesitas?</h2>
              <p className="benefits-subtitle">Miles de profesionales ya han transformado su LinkedIn con resultados reales</p>
              
              <div className="benefits-stats">
                <div className="stat-item">
                  <div className="stat-number">+150%</div>
                  <div className="stat-label">Aumento promedio en engagement</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">4h</div>
                  <div className="stat-label">Tiempo ahorrado por semana</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">€5,000</div>
                  <div className="stat-label">Aumento salarial anual promedio</div>
                </div>
              </div>

              <div className="benefits-features">
                <div className="benefit-item">
                  <div className="benefit-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z" fill="#0077B5"/>
                    </svg>
                  </div>
                  <div className="benefit-content">
                    <h4>Contenido que convierte</h4>
                    <p>Posts optimizados que mejoran tu perfil profesional y aumentan tu valor en el mercado</p>
                  </div>
                </div>
                
                <div className="benefit-item">
                  <div className="benefit-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="#0077B5"/>
                    </svg>
                  </div>
                  <div className="benefit-content">
                    <h4>Velocidad profesional</h4>
                    <p>Ahorra 4 horas semanales creando contenido. Tu tiempo es dinero</p>
                  </div>
                </div>
                
                <div className="benefit-item">
                  <div className="benefit-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#0077B5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="benefit-content">
                    <h4>Resultados garantizados</h4>
                    <p>Si no aumentas tu engagement en 30 días, te devolvemos el dinero</p>
                  </div>
                </div>
              </div>

              <div className="benefits-cta">
                <a href="#trial" className="btn-primary large">
                  <span>Quiero estos resultados</span>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M4.167 10h11.666M10 4.167L15.833 10 10 15.833" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
                <p className="cta-disclaimer">Prueba gratuita • Sin compromiso • Resultados en 7 días</p>
              </div>
            </div>
            
            <div className="benefits-visual">
              <div className="results-showcase">
                <div className="result-card">
                  <div className="result-header">
                    <div className="result-avatar">
                      <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" alt="Usuario" />
                    </div>
                    <div className="result-info">
                      <h5>Carlos M.</h5>
                      <span>CEO Startup</span>
                    </div>
                </div>
                  <div className="result-metrics">
                    <div className="metric">
                      <span className="metric-label">Antes:</span>
                      <span className="metric-value low">45 likes</span>
                </div>
                    <div className="metric">
                      <span className="metric-label">Después:</span>
                      <span className="metric-value high">340 likes</span>
                </div>
              </div>
            </div>
                
                <div className="result-card">
                  <div className="result-header">
                    <div className="result-avatar">
                      <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face&auto=format" alt="Usuario" />
                    </div>
                    <div className="result-info">
                      <h5>Laura M.</h5>
                      <span>Marketing Manager</span>
                  </div>
                </div>
                  <div className="result-metrics">
                    <div className="metric">
                      <span className="metric-label">Antes:</span>
                      <span className="metric-value low">200 conexiones</span>
                    </div>
                    <div className="metric">
                      <span className="metric-label">Después:</span>
                      <span className="metric-value high">1,200 conexiones</span>
                    </div>
                </div>
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
            <h2>Lo que dicen nuestros usuarios</h2>
            <p>Más de 50,000 profesionales confían en LinkedAI para su contenido</p>
          </div>
          
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-stars">
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
              </div>
              <p>"LinkedAI ha transformado completamente mi estrategia de contenido. Mis posts ahora tienen 3x más engagement y he conseguido 5 clientes nuevos en solo 2 meses."</p>
              <div className="testimonial-author">
                <img src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face&auto=format" alt="María González" />
                <div className="author-info">
                  <h4>María González</h4>
                  <span>Marketing Manager</span>
                </div>
              </div>
            </div>
            
            <div className="testimonial-card">
              <div className="testimonial-stars">
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
              </div>
              <p>"Increíble herramienta. He pasado de 50 likes por post a más de 500. El contenido generado es profesional y muy efectivo para mi sector."</p>
              <div className="testimonial-author">
                <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face" alt="Carlos Ruiz" />
                <div className="author-info">
                  <h4>Carlos Ruiz</h4>
                  <span>CEO Tech Startup</span>
                </div>
              </div>
            </div>
            
            <div className="testimonial-card">
              <div className="testimonial-stars">
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
              </div>
              <p>"La calidad del contenido es excepcional. He conseguido 3 clientes nuevos solo con los posts generados por LinkedAI. ROI increíble."</p>
              <div className="testimonial-author">
                <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face" alt="Ana Martín" />
                <div className="author-info">
                  <h4>Ana Martín</h4>
                  <span>Consultora Freelance</span>
                </div>
              </div>
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
                <li>50 posts generados</li>
                <li>5 artículos por mes</li>
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
                <li>200 posts generados</li>
                <li>20 artículos por mes</li>
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
                <span className="amount">30</span>
                <span className="period">/mes</span>
            </div>
              <ul className="pricing-features">
                <li>Posts ilimitados</li>
                <li>Artículos ilimitados</li>
                <li>Múltiples usuarios</li>
                <li>Analytics avanzados</li>
                <li>Soporte 24/7</li>
              </ul>
              <a href="#trial" className="pricing-btn">Próximamente</a>
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
