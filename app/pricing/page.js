"use client"
import { useState } from 'react'
import './pricing.css'

export default function Pricing() {
  const [selectedWords, setSelectedWords] = useState(20000)
  const [billingCycle, setBillingCycle] = useState('monthly')

  const pricingData = {
    20000: { monthly: 12, annual: 10 },
    50000: { monthly: 18, annual: 15 },
    100000: { monthly: 25, annual: 20 },
    300000: { monthly: 40, annual: 32 },
    500000: { monthly: 60, annual: 48 }
  }

  const wordOptions = [
    { value: 20000, label: '20k', display: '20.000' },
    { value: 50000, label: '50k', display: '50.000' },
    { value: 100000, label: '100k', display: '100.000' },
    { value: 300000, label: '300k', display: '300.000' },
    { value: 500000, label: '+500k', display: '+500.000' }
  ]

  const currentPrice = billingCycle === 'monthly' 
    ? pricingData[selectedWords].monthly 
    : pricingData[selectedWords].annual

  const savings = billingCycle === 'annual' 
    ? Math.round((pricingData[selectedWords].monthly * 12 - currentPrice * 12) / 12)
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
              <h3>Ideal para profesionales del marketing</h3>
              <p className="plan-description">
                Podrás apoyarte de LinkedAI para escribir contenido creativo, atractivo, 
                persuasivo y de calidad para tus proyectos de LinkedIn y networking profesional.
              </p>
              
              <button className="cta-button">
                Empezar ahora
              </button>
              
              <p className="words-note">
                Podrás generar hasta {selectedWords.toLocaleString()} palabras, y si generas menos 
                se guardarán para el siguiente mes de tu suscripción.
              </p>
            </div>

            <div className="features-grid">
              <div className="feature-item">
                <div className="feature-icon">✓</div>
                <div className="feature-text">
                  <strong>{selectedWords.toLocaleString()} palabras mensuales</strong>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon">✓</div>
                <div className="feature-text">
                  <strong>Hasta 3 usuarios en tu equipo de trabajo</strong>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon">✓</div>
                <div className="feature-text">
                  <strong>Hasta 3 perfiles de LinkedIn incluidos en equipo</strong>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon">✓</div>
                <div className="feature-text">
                  <strong>Romperás las fronteras de idiomas con LinkedAI, que conoce hasta 5 tonos diferentes para crear contenido profesional.</strong>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon">✓</div>
                <div className="feature-text">
                  <strong>Elige entre más de 3 herramientas que la IA de LinkedAI conoce para tu caso de uso y así impulsar tu redacción.</strong>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon">✓</div>
                <div className="feature-text">
                  <strong>Extensión de navegador de LinkedAI: Consigue la facilidad de crear contenido rápidamente en cualquier espacio de trabajo (Google Documentos, WordPress, Notion, etc), LinkedAI se adapta a ti.</strong>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon">✓</div>
                <div className="feature-text">
                  <strong>Podrás solicitar acceso a la API de LinkedAI.</strong>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon">✓</div>
                <div className="feature-text">
                  <strong>Crea artículos automatizados con el plugin de LinkedAI para tu página web en WordPress.</strong>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon">✓</div>
                <div className="feature-text">
                  <strong>No te preocupes si no llegas a gastar todas las palabras del plan en ese mes, las palabras que no hayas gastado se añadirán como palabras adicionales a tu plan para que los puedas usar en cualquier momento.</strong>
                </div>
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
                    "Excelente Herramienta. Llevo un tiempo probando varias herramientas 
                    para generar contenido de forma 'automática' y LinkedAI está entre una 
                    de las mejores que he probado. Lo bueno es que tienen un equipo detrás 
                    que se van alimentando del feedback que dan los usuarios y cada semana 
                    hay mejoras. Ya llevo más de 15 horas de trabajo ahorradas con esta 
                    herramienta así que no me arrepiento en nada el estar suscrito a la membresía."
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
                    Desde que la utilizo he visto recuperada mi inversión con la 
                    suscripción mensual. Me ha ayudado a ahorrar tiempo en la creación 
                    de contenido, tardando mucho menos tiempo, y lo cual me permite 
                    hacer el doble de artículos de lo que solía tardar antes de encontrar LinkedAI. ¡Ha sido todo un descubrimiento!"
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
                    original para LinkedIn a golpe de un clic y en segundos. Herramienta 
                    totalmente recomendable tanto si eres un profesional, redactor, 
                    consultor o copy. Además en el poco tiempo que llevan las mejoras 
                    y nuevas funcionalidades son constantes. Realmente ha sido un gran 
                    descubrimiento para ahorrar horas y horas de redacción."
                  </p>
                </div>
                <div className="testimonial-author">
                  <strong>Laura Martín</strong>
                  <span>Consultora</span>
                </div>
              </div>

              <div className="testimonial">
                <div className="testimonial-content">
                  <p>
                    "Una herramienta genial. Te permite escribir contenido 100% 
                    original para LinkedIn en tiempo récord. Ahorras mucho tiempo y 
                    dinero en redactores. Muy recomendable."
                  </p>
                </div>
                <div className="testimonial-author">
                  <strong>David Monje</strong>
                  <span>Consultor</span>
                </div>
              </div>

              <div className="testimonial">
                <div className="testimonial-content">
                  <p>
                    "He utilizado herramientas similares a ésta, pero me quedo con 
                    LinkedAI, entre otras cosas por la calidad del contenido para 
                    LinkedIn, algo que para mí es completamente imprescindible. 
                    Otra de las grandes cosas es que cada semana la herramienta va 
                    mejorando. Me he suscrito anualmente, y desde luego, no me 
                    arrepiento en absoluto. La uso prácticamente a diario."
                  </p>
                </div>
                <div className="testimonial-author">
                  <strong>Tobías Muñoz</strong>
                  <span>Profesional</span>
                </div>
              </div>

              <div className="testimonial">
                <div className="testimonial-content">
                  <p>
                    "Gran extensión para la genial aplicación LinkedAI de generación 
                    de contenido con inteligencia artificial. La extensión te permite 
                    generar contenido de manera super fácil desde cualquier web, incluso 
                    desde Google Docs. Esta herramienta es muy superior en la redacción 
                    de contenido tanto en español como en otros idiomas a otras herramientas 
                    de IA que he probado. Reduce muchísimo el tiempo de creación y redacción 
                    de contenido para mis proyectos. 100% recomendable!!!"
                  </p>
                </div>
                <div className="testimonial-author">
                  <strong>Ana López</strong>
                  <span>Profesional</span>
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
              <h4>¿En qué idiomas puede escribir la herramienta?</h4>
              <p>
                Con el plan premium, podrás crear contenido con los siguientes tonos:
                🇪🇸 Profesional 🇺🇸 Educativo 🇸🇰 Inspiracional 🇧🇬 Disruptivo 🇨🇿 Conversacional
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

            <div className="faq-item">
              <h4>¿El contenido que genera LinkedAI tiene plagio?</h4>
              <p>
                El contenido que LinkedAI genera jamás será plagiado de otras webs. 
                LinkedAI ha sido entrenado con millones de parámetros por lo que tiene 
                un gran conocimiento del mundo digital. Únicamente utilizará contenido 
                propio generado por la IA o en base a las características que le hayas proporcionado.
              </p>
            </div>

            <div className="faq-item">
              <h4>¿Dónde puedo aprender sobre LinkedIn y emprendimiento?</h4>
              <p>
                La newsletter de LinkedAI incluye temas como LinkedIn, Inteligencia 
                Artificial aplicada en el marketing digital, emprendimiento y una 
                variedad de otros temas que nos interesan.
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
