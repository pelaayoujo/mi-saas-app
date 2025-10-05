"use client"
import { useState } from 'react'

export default function Home() {
  const [navbarScrolled, setNavbarScrolled] = useState(false)

  return (
    <div className="homepage">
      {/* Navigation */}
      <nav className={`navbar ${navbarScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <div className="nav-logo">
            <div className="logo-icon"></div>
            <span className="logo-text">LinkedAI</span>
          </div>
          <div className="nav-links">
            <a href="#features">Características</a>
            <a href="#pricing">Precios</a>
            <a href="#testimonials">Testimonios</a>
            <a href="/dashboard/create" className="nav-cta">Probar LinkedAI</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="badge-dot"></span>
              <span>50,000+ PROFESIONALES YA LO USAN</span>
            </div>
            <h1 className="hero-title">
              NUEVA PÁGINA - La #1 Herramienta de IA para <span className="highlight">LinkedIn</span>
            </h1>
            <p className="hero-description">
              Tu plataforma todo-en-uno para la creación de contenido en LinkedIn. Tu herramienta completa para crear posts con IA, 
              historias atractivas, artículos optimizados y mucho más.
            </p>
            <div className="hero-cta">
              <a href="/dashboard/create" className="hero-btn">
                Probar LinkedAI
              </a>
            </div>
            <div className="hero-features">
              <div className="hero-feature">
                <div className="feature-tick">✓</div>
                <span>Generación de contenido con IA</span>
              </div>
              <div className="hero-feature">
                <div className="feature-tick">✓</div>
                <span>Optimización para LinkedIn</span>
              </div>
              <div className="hero-feature">
                <div className="feature-tick">✓</div>
                <span>Plantillas profesionales</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="workflow">
        <div className="container">
          <div className="section-header">
            <h2>¿Cómo funciona?</h2>
            <p>3 pasos simples para generar contenido viral en LinkedIn</p>
          </div>
          <div className="workflow-steps">
            <div className="workflow-step">
              <div className="step-number">
                <span className="step-digit">1</span>
              </div>
              <div className="step-content">
                <h3>Elegir la herramienta</h3>
                <h4>Selecciona el tipo de contenido</h4>
                <p>Elige entre posts, artículos, biografías y más opciones disponibles en nuestro dashboard.</p>
              </div>
            </div>
            <div className="workflow-step">
              <div className="step-number">
                <span className="step-digit">2</span>
              </div>
              <div className="step-content">
                <h3>Describe tu idea</h3>
                <h4>Completa los campos</h4>
                <p>Proporciona el tema, audiencia objetivo y cualquier instrucción específica para tu contenido.</p>
              </div>
            </div>
            <div className="workflow-step">
              <div className="step-number">
                <span className="step-digit">3</span>
              </div>
              <div className="step-content">
                <h3>Genera contenido y empieza a ganar impacto</h3>
                <h4>IA al servicio de tu éxito</h4>
                <p>Nuestra IA genera contenido optimizado que puedes editar, programar y publicar directamente.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <div className="container">
          <div className="testimonials-header">
            <h2>Resultados Reales de Profesionales Como Tú</h2>
            <p>Más de 10,000 profesionales ya están generando contenido viral con LinkedAI</p>
          </div>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-stars">
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
              </div>
              <div className="testimonial-content">
                <p>"LinkedAI ha revolucionado mi estrategia de contenido. Mis posts ahora tienen 3x más engagement y mi audiencia ha crecido un 150% en solo 2 meses."</p>
              </div>
              <div className="testimonial-author">
                <img src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face" alt="María González" />
                <div className="author-info">
                  <h4>María González</h4>
                  <span>Marketing Manager</span>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-stars">
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
              </div>
              <div className="testimonial-content">
                <p>"Increíble herramienta. He pasado de 50 likes por post a más de 500. El contenido generado es profesional y muy efectivo para mi sector."</p>
              </div>
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
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
              </div>
              <div className="testimonial-content">
                <p>"La calidad del contenido es excepcional. He conseguido 3 clientes nuevos solo con los posts generados por LinkedAI. ROI increíble."</p>
              </div>
              <div className="testimonial-author">
                <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face" alt="Ana Martín" />
                <div className="author-info">
                  <h4>Ana Martín</h4>
                  <span>Consultora Freelance</span>
                </div>
              </div>
            </div>
          </div>
          <div className="testimonials-cta">
            <p>Únete a miles de profesionales que ya están generando impacto</p>
            <a href="/dashboard/create" className="btn btn-primary">Comenzar Gratis</a>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="pricing">
        <div className="container">
          <div className="section-header">
            <h2>Planes para cada profesional</h2>
            <p>Elige el plan que mejor se adapte a tus necesidades</p>
          </div>
          <div className="pricing-grid">
            <div className="pricing-card">
              <div className="pricing-header">
                <h3>Básico</h3>
              </div>
              <div className="price">
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
              <button className="pricing-btn">Empezar</button>
            </div>
            <div className="pricing-card featured">
              <div className="pricing-header">
                <h3>Profesional</h3>
              </div>
              <div className="price">
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
              <button className="pricing-btn">Empezar</button>
            </div>
            <div className="pricing-card">
              <div className="pricing-header">
                <h3>Empresarial</h3>
              </div>
              <div className="price">
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
              <button className="pricing-btn">Empezar</button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2>¿Listo para transformar tu LinkedIn?</h2>
            <p>Únete a miles de profesionales que ya están generando contenido viral con LinkedAI</p>
            <a href="/dashboard/create" className="cta-btn">Comenzar Gratis Ahora</a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>Producto</h3>
              <a href="#features">Características</a>
              <a href="#pricing">Precios</a>
              <a href="#testimonials">Testimonios</a>
            </div>
            <div className="footer-section">
              <h3>Recursos</h3>
              <a href="/dashboard/create">Dashboard</a>
              <a href="#help">Ayuda</a>
              <a href="#blog">Blog</a>
            </div>
            <div className="footer-section">
              <h3>Empresa</h3>
              <a href="#about">Sobre nosotros</a>
              <a href="#contact">Contacto</a>
              <a href="#privacy">Privacidad</a>
            </div>
            <div className="footer-section">
              <h3>LinkedAI</h3>
              <p>La herramienta de IA #1 para LinkedIn</p>
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
