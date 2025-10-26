"use client"
import { useState } from 'react'
import './pricing.css'

export default function Pricing() {
  const [selectedWords, setSelectedWords] = useState(20000)
  const [billingCycle, setBillingCycle] = useState('monthly')
  const [selectedPlan, setSelectedPlan] = useState('basic')

  const pricingPlans = {
    basic: {
      name: 'Básico',
      description: 'Ideal para profesionales que empiezan en LinkedIn',
      monthly: { 20000: 12, 50000: 18, 100000: 25, 300000: 40, 500000: 60 },
      annual: { 20000: 10, 50000: 15, 100000: 20, 300000: 32, 500000: 48 },
      features: [
        'Artículos optimizados para LinkedIn',
        '5 tonos diferentes (profesional, educativo, inspiracional, disruptivo, conversacional)',
        'Biografías de LinkedIn optimizadas',
        'Hasta 3 artículos guardados',
        'Soporte por email',
        'Análisis de engagement básico'
      ]
    },
    professional: {
      name: 'Profesional',
      description: 'Para profesionales que buscan maximizar su impacto',
      monthly: { 20000: 20, 50000: 30, 100000: 45, 300000: 70, 500000: 100 },
      annual: { 20000: 16, 50000: 24, 100000: 36, 300000: 56, 500000: 80 },
      features: [
        'Todo lo del plan Básico',
        'Hasta 20 artículos guardados',
        'Programación de contenido',
        'Mensajes de conexión personalizados',
        'Análisis avanzado de engagement',
        'Soporte prioritario',
        'Plantillas premium',
        'Exportación a múltiples formatos'
      ]
    },
    enterprise: {
      name: 'Empresarial',
      description: 'Para equipos y empresas que necesitan escalar',
      monthly: { 20000: 35, 50000: 55, 100000: 80, 300000: 120, 500000: 180 },
      annual: { 20000: 28, 50000: 44, 100000: 64, 300000: 96, 500000: 144 },
      features: [
        'Todo lo del plan Profesional',
        'Artículos ilimitados guardados',
        'Hasta 5 usuarios en equipo',
        'API personalizada',
        'Integración con CRM',
        'Analytics avanzados',
        'Soporte 24/7',
        'Entrenamiento personalizado',
        'Gestión de múltiples perfiles'
      ]
    }
  }

  const wordOptions = [
    { value: 20000, label: '20k', display: '20.000' },
    { value: 50000, label: '50k', display: '50.000' },
    { value: 100000, label: '100k', display: '100.000' },
    { value: 300000, label: '300k', display: '300.000' },
    { value: 500000, label: '+500k', display: '+500.000' }
  ]

  const currentPlan = pricingPlans[selectedPlan]
  const currentPrice = billingCycle === 'monthly' 
    ? currentPlan.monthly[selectedWords] 
    : currentPlan.annual[selectedWords]

  const savings = billingCycle === 'annual' 
    ? Math.round((currentPlan.monthly[selectedWords] * 12 - currentPrice * 12) / 12)
    : 0

  return (
    <div className="pricing-page">
      <nav className="pricing-nav">
        <div className="nav-container">
          <div className="nav-logo">
            <a href="/">LinkedAI</a>
          </div>
          <div className="nav-links">
            <a href="/">Inicio</a>
            <a href="/pricing">Precios</a>
            <a href="/dashboard">Acceder</a>
            <a href="/#trial" className="nav-cta">¡Comenzar ahora!</a>
          </div>
        </div>
      </nav>

      <main className="pricing-main">
        <div className="container">
          <div className="pricing-header">
            <h1>Precios</h1>
            <h2>Selecciona la cantidad de palabras mensuales</h2>
            
            <div className="word-selector">
              {wordOptions.map((option) => (
                <button
                  key={option.value}
                  className={`word-option ${selectedWords === option.value ? 'active' : ''}`}
                  onClick={() => setSelectedWords(option.value)}
                >
                  <span className="word-number">{option.display}</span>
                  <span className="word-label">{option.label}</span>
                </button>
              ))}
            </div>

            <div className="billing-toggle">
              <button 
                className={`billing-btn ${billingCycle === 'monthly' ? 'active' : ''}`}
                onClick={() => setBillingCycle('monthly')}
              >
                Mensual
              </button>
              <button 
                className={`billing-btn ${billingCycle === 'annual' ? 'active' : ''}`}
                onClick={() => setBillingCycle('annual')}
              >
                Anual
                {billingCycle === 'annual' && <span className="discount-badge">¡20% de descuento!</span>}
              </button>
            </div>
          </div>

          <div className="pricing-content">
            <div className="plan-selector">
              {Object.entries(pricingPlans).map(([key, plan]) => (
                <button
                  key={key}
                  className={`plan-btn ${selectedPlan === key ? 'active' : ''}`}
                  onClick={() => setSelectedPlan(key)}
                >
                  {plan.name}
                </button>
              ))}
            </div>

            <div className="pricing-card">
              <div className="price-display">
                <div className="price-amount">
                  <span className="currency">€</span>
                  <span className="amount">{currentPrice}</span>
                  <span className="period">/mes</span>
                </div>
                {billingCycle === 'annual' && (
                  <p className="billing-note">
                    Facturado anualmente (Ahorra €{savings}/año)
                  </p>
                )}
              </div>

              <div className="plan-info">
                <h3>{currentPlan.name}</h3>
                <p className="plan-description">{currentPlan.description}</p>
                
                <div className="plan-features">
                  {currentPlan.features.map((feature, index) => (
                    <div key={index} className="feature-item">
                      <span className="feature-icon">✓</span>
                      <span className="feature-text">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="plan-stats">
                  <div className="stat">
                    <span className="stat-number">{selectedWords.toLocaleString()}</span>
                    <span className="stat-label">palabras mensuales</span>
                  </div>
                  {selectedPlan === 'enterprise' && (
                    <div className="stat">
                      <span className="stat-number">5</span>
                      <span className="stat-label">usuarios en equipo</span>
                    </div>
                  )}
                  {selectedPlan === 'professional' && (
                    <div className="stat">
                      <span className="stat-number">20</span>
                      <span className="stat-label">artículos guardados</span>
                    </div>
                  )}
                </div>

                <button className="cta-button">
                  Empezar ahora
                </button>
              </div>
            </div>
          </div>

          <div className="guarantee-section">
            <h3>Garantía de 30 días</h3>
            <p>
              Si durante los próximos 30 días sientes que LinkedAI no es para ti, 
              sin haber superado las 10 mil palabras generadas, simplemente envíame 
              un email a mi correo personal y te devolveré el 100% de tu dinero.
            </p>
            <p>
              Sí, sin preguntas. Estoy completamente seguro de que te enamorarás de 
              LinkedAI y será un aliado inseparable para ti. Nuestra garantía de 
              devolución es 100% segura y sin riesgos.
            </p>
            <p className="guarantee-signature">
              <strong>CEO de LinkedAI</strong>
            </p>
          </div>

          <div className="testimonials-section">
            <h3>Lo que dicen nuestros usuarios</h3>
            <div className="testimonials-grid">
              <div className="testimonial">
                <div className="testimonial-content">
                  <p>
                    "Excelente herramienta. Llevo un tiempo probando varias herramientas 
                    para generar contenido de LinkedIn y LinkedAI está entre una de las 
                    mejores que he probado. Ya llevo más de 15 horas de trabajo ahorradas."
                  </p>
                </div>
                <div className="testimonial-author">
                  <strong>María González</strong>
                  <span>Marketing Manager</span>
                </div>
              </div>

              <div className="testimonial">
                <div className="testimonial-content">
                  <p>
                    "Una herramienta para profesionales de LinkedIn muy potente. 
                    Desde que la utilizo he visto recuperada mi inversión. Me ha ayudado 
                    a ahorrar tiempo y crear el doble de contenido."
                  </p>
                </div>
                <div className="testimonial-author">
                  <strong>Carlos Ruiz</strong>
                  <span>CEO Startup</span>
                </div>
              </div>

              <div className="testimonial">
                <div className="testimonial-content">
                  <p>
                    "LinkedAI es una aplicación brutal para escribir contenido 100% 
                    original para LinkedIn a golpe de un clic. Realmente ha sido un 
                    gran descubrimiento para ahorrar horas de redacción."
                  </p>
                </div>
                <div className="testimonial-author">
                  <strong>Laura Martín</strong>
                  <span>Consultora</span>
                </div>
              </div>
            </div>
          </div>

          <div className="faq-section">
            <h3>Preguntas frecuentes</h3>
            
            <div className="faq-item">
              <h4>¿En qué me puede ayudar LinkedAI?</h4>
              <p>
                LinkedAI te puede ayudar a crear contenido optimizado para LinkedIn, 
                desde posts profesionales hasta biografías completas, para aumentar 
                tu visibilidad y networking profesional.
              </p>
            </div>

            <div className="faq-item">
              <h4>¿Puedo ver una demostración de cómo funciona la herramienta?</h4>
              <p>
                Sí, puedes probar LinkedAI de forma gratuita registrándote en nuestra 
                lista de espera. Te enviaremos acceso inmediato para que puedas 
                experimentar con todas las funcionalidades.
              </p>
            </div>

            <div className="faq-item">
              <h4>¿El contenido que genera LinkedAI es original?</h4>
              <p>
                El contenido que LinkedAI genera jamás será plagiado. Nuestra IA ha 
                sido entrenada específicamente para LinkedIn y genera contenido 
                original basado en las características que le proporciones.
              </p>
            </div>

            <div className="faq-item">
              <h4>¿Puede escribir para mi sector profesional?</h4>
              <p>
                Independientemente de tu sector profesional, LinkedAI puede ayudarte 
                a crear cualquier tipo de contenido para LinkedIn, desde tecnología 
                hasta salud, finanzas, educación y más.
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="pricing-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h4>Producto</h4>
              <a href="/pricing">Precios</a>
              <a href="/#trial">Prueba gratuita</a>
            </div>
            
            <div className="footer-section">
              <h4>Soporte</h4>
              <a href="mailto:soporte@linkedai.com">Email: soporte@linkedai.com</a>
            </div>
            
            <div className="footer-section">
              <h4>Políticas</h4>
              <a href="/terms">Términos y condiciones</a>
              <a href="/privacy">Política de privacidad</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
