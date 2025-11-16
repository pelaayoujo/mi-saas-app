"use client"
// deploy-bump: profile updates + change password endpoint
import { useState } from 'react'
import './page.css'
import { useTranslation } from '@/lib/i18n'
import LanguageSelector from './components/LanguageSelector'

export default function Home() {
  const { t } = useTranslation()
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
        setSubmitMessage(t('trial.success'))
        setEmail('')
      } else if (response.status === 409) {
        setSubmitMessage(t('trial.duplicate'))
        setEmail('')
      } else {
        const errorData = await response.json()
        setSubmitMessage(errorData.error || t('trial.error'))
      }
    } catch (error) {
      setSubmitMessage(t('trial.connectionError'))
    }
    
      setIsSubmitting(false)
  }

  return (
    <div className="homepage">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <span className="logo-text">LinkedAI</span>
          </div>
          
          <div className="nav-links">
            <LanguageSelector />
            <a href="/login" className="nav-login">{t('nav.login')}</a>
            <a href="#trial" className="nav-cta">{t('nav.startFree')}</a>
          </div>

          {/* Language selector for mobile - always visible */}
          <div className="nav-mobile-language">
            <LanguageSelector />
          </div>

          <button 
            className="mobile-menu-btn" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          {isMenuOpen && (
            <div className="mobile-menu">
              <a href="/login" onClick={() => setIsMenuOpen(false)}>{t('nav.login')}</a>
              <a href="#trial" onClick={() => setIsMenuOpen(false)}>{t('nav.startFree')}</a>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-background">
          <div className="hero-gradient"></div>
          <div className="hero-pattern"></div>
        </div>
        
          <div className="hero-content">
            <div className="hero-badge">
            <span>{t('hero.badge')}</span>
            </div>
          
            <h1 className="hero-title">
            {(() => {
              const title = t('hero.title')
              const highlight = t('hero.titleHighlight')
              const parts = title.split('{highlight}')
              return (
                <>
                  {parts[0]}
                  <span className="gradient-text">{highlight}</span>
                  {parts[1]}
                </>
              )
            })()}
            </h1>
          
            <p className="hero-description">
            <strong>{t('hero.description').split('.')[0]}.</strong> 
            {t('hero.description').split('.').slice(1).join('.')}
          </p>
          
            <div className="hero-actions">
            <a href="#trial" className="btn-primary">
              <span>{t('hero.cta')}</span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M4.167 10h11.666M10 4.167L15.833 10 10 15.833" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <p className="hero-guarantee">
              ✅ <strong>{t('hero.guarantee1')}</strong>
              <br />⚠️ <strong>{t('hero.guarantee2')}</strong>
            </p>
            </div>
          
            <div className="hero-stats">
              <div className="stat">
              <div className="stat-number">3x</div>
              <div className="stat-label">{t('hero.stats.opportunities')}</div>
              </div>
              <div className="stat">
              <div className="stat-number">847%</div>
              <div className="stat-label">{t('hero.stats.engagement')}</div>
              </div>
              <div className="stat">
              <div className="stat-number">23 min</div>
              <div className="stat-label">{t('hero.stats.viral')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <div className="container">
          <div className="section-header">
            <h2>{t('features.title')}</h2>
            <p>{t('features.subtitle')}</p>
          </div>
          
          <div className="features-grid">
            <div className="feature-card">
              <h3>{t('features.postGeneration.title')}</h3>
              <p>{t('features.postGeneration.description')}</p>
            </div>
            
            <div className="feature-card">
              <h3>{t('features.bios.title')}</h3>
              <p>{t('features.bios.description')}</p>
            </div>
            
            <div className="feature-card">
              <h3>{t('features.messages.title')}</h3>
              <p>{t('features.messages.description')}</p>
            </div>
            
            <div className="feature-card">
              <h3>{t('features.authentic.title')}</h3>
              <p>{t('features.authentic.description')}</p>
            </div>
            
            <div className="feature-card">
              <h3>{t('features.templates.title')}</h3>
              <p>{t('features.templates.description')}</p>
            </div>
            
            <div className="feature-card">
              <h3>{t('features.timeSaving.title')}</h3>
              <p>{t('features.timeSaving.description')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section id="comparison" className="comparison">
        <div className="container">
          <div className="section-header">
            <h2>{t('comparison.title')}</h2>
            <p>{t('comparison.subtitle')}</p>
          </div>
          
          <div className="comparison-grid">
            <div className="comparison-card chatgpt-result">
              <div className="comparison-header">
                <div className="comparison-badge chatgpt-badge">{t('comparison.chatgpt.badge')}</div>
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
                    <span className="metric-label">{t('comparison.metrics.expectedEngagement')}</span>
                    <span className="metric-value">15-30 likes</span>
                  </div>
                  <div className="metric negative">
                    <span className="metric-label">{t('comparison.metrics.comments')}</span>
                    <span className="metric-value">1-3 comentarios</span>
                  </div>
                  <div className="metric negative">
                    <span className="metric-label">{t('comparison.metrics.reach')}</span>
                    <span className="metric-value">50-100 personas</span>
                  </div>
                  <div className="metric negative">
                    <span className="metric-label">{t('comparison.metrics.creationTime')}</span>
                    <span className="metric-value">{t('comparison.metrics.notOptimized')}</span>
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
                <div className="comparison-badge linkedai-badge">{t('comparison.linkedai.badge')}</div>
                <div className="comparison-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <rect width="24" height="24" rx="4" fill="#0077B5"/>
                    <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z" fill="white"/>
                  </svg>
                </div>
              </div>
              <div className="comparison-content">
                <h4>¿Sabías que el 87% de los reclutadores revisa LinkedIn ANTES de una entrevista?</h4>
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
                    <span className="metric-label">{t('comparison.metrics.typicalEngagement')}</span>
                    <span className="metric-value">150-400 likes</span>
                  </div>
                  <div className="metric positive">
                    <span className="metric-label">{t('comparison.metrics.comments')}</span>
                    <span className="metric-value">25-60 comentarios</span>
                  </div>
                  <div className="metric positive">
                    <span className="metric-label">{t('comparison.metrics.reach')}</span>
                    <span className="metric-value">1,500-3,000 personas</span>
                  </div>
                  <div className="metric positive">
                    <span className="metric-label">{t('comparison.metrics.creationTime')}</span>
                    <span className="metric-value">{t('comparison.metrics.optimized')}</span>
                </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="comparison-cta">
            <p className="comparison-text">{t('comparison.cta')}</p>
            <a href="#trial" className="btn-primary">
              <span>{t('comparison.ctaButton')}</span>
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
            <h2>{t('testimonials.title')}</h2>
            <p>{t('testimonials.subtitle')}</p>
          </div>
          
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-quote">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
                  <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
                </svg>
              </div>
              <p>"{t('testimonials.testimonial1')}"</p>
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
              <p>"{t('testimonials.testimonial2')}"</p>
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
              <p>"{t('testimonials.testimonial3')}"</p>
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
              <div className="stat-number">50K+</div>
              <div className="stat-label">{t('testimonials.stats.postsCreated')}</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">150%</div>
              <div className="stat-label">{t('testimonials.stats.engagementIncrease')}</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">15K+</div>
              <div className="stat-label">{t('testimonials.stats.activeUsers')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="pricing">
        <div className="container">
          <div className="section-header">
            <h2>{t('pricing.title')}</h2>
            <p>{t('pricing.subtitle')}</p>
          </div>
          
          <div className="pricing-grid">
          <div className="pricing-card">
            <div className="pricing-header">
                <h3>{t('pricing.basic.title')}</h3>
                <p>{t('pricing.basic.subtitle')}</p>
              </div>
              <div className="pricing-price">
                <span className="currency">€</span>
                <span className="amount">{t('pricing.basic.price')}</span>
                <span className="period">{t('pricing.basic.period')}</span>
              </div>
              <ul className="pricing-features">
                <li>{t('pricing.basic.features.tokens')}</li>
                <li>{t('pricing.basic.features.articles')}</li>
                <li>{t('pricing.basic.features.templates')}</li>
                <li>{t('pricing.basic.features.support')}</li>
              </ul>
              <a href="#trial" className="pricing-btn">{t('pricing.basic.button')}</a>
            </div>
            
            <div className="pricing-card featured">
              <div className="pricing-badge">{t('pricing.professional.badge')}</div>
              <div className="pricing-header">
                <h3>{t('pricing.professional.title')}</h3>
                <p>{t('pricing.professional.subtitle')}</p>
            </div>
              <div className="pricing-price">
                <span className="currency">€</span>
                <span className="amount">{t('pricing.professional.price')}</span>
                <span className="period">{t('pricing.professional.period')}</span>
            </div>
              <ul className="pricing-features">
                <li>{t('pricing.professional.features.tokens')}</li>
                <li>{t('pricing.professional.features.articles')}</li>
                <li>{t('pricing.professional.features.templates')}</li>
                <li>{t('pricing.professional.features.scheduling')}</li>
                <li>{t('pricing.professional.features.support')}</li>
              </ul>
              <a href="#trial" className="pricing-btn">{t('pricing.professional.button')}</a>
        </div>
            
            <div className="pricing-card">
              <div className="pricing-header">
                <h3>{t('pricing.enterprise.title')}</h3>
                <p>{t('pricing.enterprise.subtitle')}</p>
          </div>
              <div className="pricing-price">
                <span className="currency">€</span>
                <span className="amount">{t('pricing.enterprise.price')}</span>
                <span className="period">{t('pricing.enterprise.period')}</span>
            </div>
              <ul className="pricing-features">
                <li>{t('pricing.enterprise.features.tokens')}</li>
                <li>{t('pricing.enterprise.features.articles')}</li>
                <li>{t('pricing.enterprise.features.users')}</li>
                <li>{t('pricing.enterprise.features.analytics')}</li>
                <li>{t('pricing.enterprise.features.support')}</li>
              </ul>
              <a href="#trial" className="pricing-btn">{t('pricing.enterprise.button')}</a>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Showcase Section */}
      <section id="showcase" className="showcase">
        <div className="container">
          <div className="showcase-content">
            <div className="showcase-visual">
              <div className="showcase-illustration">
                <img 
                  src="/images/showcase-linkedai.png" 
                  alt="LinkedAI en acción" 
                  className="showcase-image"
                />
              </div>
            </div>
            
            <div className="showcase-text">
              <h2>{t('showcase.title')}</h2>
              <p className="showcase-subtitle">{t('showcase.subtitle')}</p>
              
              <div className="showcase-features">
                <div className="feature-item">
                  <div className="feature-icon">✓</div>
                  <span>{t('showcase.feature1')}</span>
                </div>
                
                <div className="feature-item">
                  <div className="feature-icon">✓</div>
                  <span>{t('showcase.feature2')}</span>
                </div>
                
                <div className="feature-item">
                  <div className="feature-icon">✓</div>
                  <span>{t('showcase.feature3')}</span>
                </div>
                
                <div className="feature-item">
                  <div className="feature-icon">✓</div>
                  <span>{t('showcase.feature4')}</span>
                </div>
                
                <div className="feature-item">
                  <div className="feature-icon">✓</div>
                  <span>{t('showcase.feature5')}</span>
                </div>
                
                <div className="feature-item">
                  <div className="feature-icon">✓</div>
                  <span>{t('showcase.feature6')}</span>
                </div>
              </div>
              
              <div className="showcase-cta">
                <a href="#trial" className="btn-showcase">
                  {t('showcase.cta')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="faq">
        <div className="container">
          <div className="section-header">
            <h2>{t('faq.title')}</h2>
            <p>{t('faq.subtitle')}</p>
          </div>
          
          <div className="faq-container">
            <div className="faq-item" onClick={() => toggleFAQ(0)}>
              <div className="faq-question">
                <h3>{t('faq.q1.question')}</h3>
                <span className={`faq-icon ${openFAQ === 0 ? 'open' : ''}`}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 4.167v11.666M4.167 10h11.666" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </div>
              {openFAQ === 0 && (
                <div className="faq-answer">
                  <p>{t('faq.q1.answer')}</p>
                </div>
              )}
            </div>

            <div className="faq-item" onClick={() => toggleFAQ(1)}>
              <div className="faq-question">
                <h3>{t('faq.q2.question')}</h3>
                <span className={`faq-icon ${openFAQ === 1 ? 'open' : ''}`}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 4.167v11.666M4.167 10h11.666" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </div>
              {openFAQ === 1 && (
                <div className="faq-answer">
                  <p>{t('faq.q2.answer')}</p>
                </div>
              )}
            </div>

            <div className="faq-item" onClick={() => toggleFAQ(2)}>
              <div className="faq-question">
                <h3>{t('faq.q3.question')}</h3>
                <span className={`faq-icon ${openFAQ === 2 ? 'open' : ''}`}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 4.167v11.666M4.167 10h11.666" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </div>
              {openFAQ === 2 && (
                <div className="faq-answer">
                  <p>{t('faq.q3.answer')}</p>
                </div>
              )}
            </div>

            <div className="faq-item" onClick={() => toggleFAQ(3)}>
              <div className="faq-question">
                <h3>{t('faq.q4.question')}</h3>
                <span className={`faq-icon ${openFAQ === 3 ? 'open' : ''}`}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 4.167v11.666M4.167 10h11.666" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
            </div>
              {openFAQ === 3 && (
                <div className="faq-answer">
                  <p>{t('faq.q4.answer')}</p>
            </div>
              )}
            </div>

            <div className="faq-item" onClick={() => toggleFAQ(4)}>
              <div className="faq-question">
                <h3>{t('faq.q5.question')}</h3>
                <span className={`faq-icon ${openFAQ === 4 ? 'open' : ''}`}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 4.167v11.666M4.167 10h11.666" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
            </div>
              {openFAQ === 4 && (
                <div className="faq-answer">
                  <p>{t('faq.q5.answer')}</p>
            </div>
              )}
            </div>

            <div className="faq-item" onClick={() => toggleFAQ(5)}>
              <div className="faq-question">
                <h3>{t('faq.q6.question')}</h3>
                <span className={`faq-icon ${openFAQ === 5 ? 'open' : ''}`}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 4.167v11.666M4.167 10h11.666" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
            </div>
              {openFAQ === 5 && (
                <div className="faq-answer">
                  <p>{t('faq.q6.answer')}</p>
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
            <h2>{t('trial.title')}</h2>
            <p>{t('trial.subtitle')}</p>
            
            <form className="trial-form" onSubmit={handleTrialSubmit}>
              <div className="form-group">
                <input 
                  type="email" 
                  placeholder={t('trial.placeholder')} 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
                <button type="submit" className="btn-primary large">
                  <span>{t('trial.button')}</span>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
              <p className="trial-disclaimer">
                {t('trial.disclaimer')}
              </p>
              {submitMessage && (
                <p className={`submit-message ${submitMessage === t('trial.success') || submitMessage === t('trial.duplicate') ? 'success' : 'error'}`}>
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
                <span>LinkedAI</span>
              </div>
              <p>{t('footer.tagline')}</p>
            </div>
            
            <div className="footer-section">
                <h4>{t('footer.product')}</h4>
                <a href="#features">{t('footer.features')}</a>
                <a href="#pricing">{t('footer.pricing')}</a>
                <a href="/login">{t('nav.login')}</a>
              </div>
            
            <div className="footer-section">
              <h4>{t('footer.resources')}</h4>
              <a href="#testimonials">{t('footer.testimonials')}</a>
              <a href="#comparison">{t('footer.comparison')}</a>
              <a href="#faq">{t('footer.faq')}</a>
              <a href="/contact">{t('footer.contact')}</a>
              </div>
            
            <div className="footer-section">
              <h4>{t('footer.legal')}</h4>
              <a href="/terms">{t('footer.terms')}</a>
              <a href="/privacy">{t('footer.privacy')}</a>
              <a href="/cookies">{t('footer.cookies')}</a>
              <a href="/contact">{t('footer.contact')}</a>
              </div>
            </div>
          
          <div className="footer-bottom">
            <p>&copy; {t('footer.copyright')}</p>
          </div>
        </div>
      </footer>
    </div>
  )
}