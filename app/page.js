"use client"
import { useState } from 'react'

export default function Home() {
  const [navbarScrolled, setNavbarScrolled] = useState(false)

  return (
    <div className="homepage">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <div className="logo-icon"></div>
            <span className="logo-text">LinkedAI</span>
          </div>
          <div className="nav-links">
            <a href="#precios">Precios</a>
            <a href="/dashboard" className="nav-access">Acceder</a>
            <a href="/dashboard/create" className="nav-cta">¡Comenzar ahora!</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero">
        <div className="ripple-wrap">
          <div className="ripple ripple-1"></div>
          <div className="ripple ripple-2"></div>
          <div className="ripple ripple-3"></div>
        </div>
        <div className="hero-center">
          <h2 className="hero-subtitle">¿Imaginas que tu contenido de LinkedIn se escribiera solo?</h2>
          <h1 className="hero-title">
            Crea contenido viral optimizado<br />
            para LinkedIn a golpe de clic con la<br />
            Inteligencia Artificial mejor entrenada en español
          </h1>
          <h2 className="hero-description">
            Utiliza contenido actualizado y preciso escrito por una Inteligencia Artificial<br />
            que LinkedIn no puede detectar y ha sido entrenada por expertos en LinkedIn Marketing.
          </h2>
          <a href="/dashboard/create" className="hero-btn">
            <h2>¡Comenzar Ahora!</h2>
          </a>
        </div>
      </header>

      {/* Features Section */}
      <div className="features-box">
        <div className="features-flex">
          <div className="feature-item">
            <div className="feature-icon gradient">
              <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTkgMTJMMTEgMTRMMTUgMTAiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+" alt="✓"/>
            </div>
            <h4>Funciona para cualquier tipo de nicho</h4>
          </div>
          <div className="feature-item">
            <div className="feature-icon gradient">
              <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTkgMTJMMTEgMTRMMTUgMTAiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+" alt="✓"/>
            </div>
            <h4>Contenido 100% optimizado para LinkedIn</h4>
          </div>
          <div className="feature-item">
            <div className="feature-icon gradient">
              <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTkgMTJMMTEgMTRMMTUgMTAiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+" alt="✓"/>
            </div>
            <h4>Evita penalizaciones de LinkedIn</h4>
          </div>
        </div>
      </div>

      {/* Demo Section */}
      <div className="demo-box">
        <div className="demo-wrap">
          <div className="demo-comparison">
            <div className="comparison-header">
              <div className="comparison-logo">
                <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiByeD0iOCIgZmlsbD0iIzAwNzdCNyIvPgo8cGF0aCBkPSJNMTIgMTJIMjhWMjhIMTJWMjhaIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K" alt="ChatGPT"/>
                <span>ChatGPT</span>
              </div>
              <div className="comparison-logo main">
                <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiByeD0iOCIgZmlsbD0iIzAwNzdCNyIvPgo8cGF0aCBkPSJNMTIgMTJIMjhWMjhIMTJWMjhaIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K" alt="LinkedAI"/>
                <span>LinkedAI</span>
              </div>
            </div>
            <div className="comparison-content">
              <div className="comparison-side">
                <div className="demo-text">
                  <h3>ChatGPT - Resultado genérico</h3>
                  <p>Contenido básico sin optimización específica para LinkedIn. Falta de estructura profesional y engagement limitado.</p>
                </div>
              </div>
              <div className="comparison-side">
                <div className="demo-text">
                  <h3>LinkedAI - Resultado optimizado</h3>
                  <p>Contenido específicamente diseñado para LinkedIn con estructura profesional, hashtags relevantes y alto potencial de engagement.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <section className="testimonials">
        <div className="testimonials-header">
          <h1>Valorado 4,9/5 por más de 100 usuarios</h1>
        </div>
        <div className="testimonials-slider">
          <div className="testimonial-card">
            <div className="testimonial-content">
              <div className="testimonial-stars">
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
              </div>
              <p>"Excelente Herramienta. Llevo un tiempo probando varias herramientas para generar contenido de forma automática y LinkedAI está entre una de las mejores que he probado. Los posts generados tienen un engagement increíble."</p>
              <div className="testimonial-author">
                <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face" alt="Joan Blanch"/>
                <div className="author-info">
                  <h3>Joan Blanch</h3>
                  <span>Marketing Manager</span>
                </div>
              </div>
            </div>
          </div>
          <div className="testimonial-card">
            <div className="testimonial-content">
              <div className="testimonial-stars">
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
              </div>
              <p>"LinkedAI ha revolucionado mi estrategia de contenido en LinkedIn. Mis posts ahora tienen 3x más engagement y mi audiencia ha crecido un 150% en solo 2 meses. Totalmente recomendable."</p>
              <div className="testimonial-author">
                <img src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face" alt="María González"/>
                <div className="author-info">
                  <h3>María González</h3>
                  <span>CEO Tech Startup</span>
                </div>
              </div>
            </div>
          </div>
          <div className="testimonial-card">
            <div className="testimonial-content">
              <div className="testimonial-stars">
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
              </div>
              <p>"Increíble herramienta para LinkedIn. He pasado de 50 likes por post a más de 500. El contenido generado es profesional y muy efectivo para mi sector. ROI increíble."</p>
              <div className="testimonial-author">
                <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face" alt="Carlos Ruiz"/>
                <div className="author-info">
                  <h3>Carlos Ruiz</h3>
                  <span>Consultor Freelance</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section className="features-grid">
        <div className="features-header">
          <h1>¿Qué podrás conseguir apoyándote en LinkedAI?</h1>
        </div>
        <div className="features-grid-content">
          <div className="feature-grid-item">
            <div className="feature-grid-icon">
              <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIwIDRMMjYgMTBIMjBWMjBIMTRWMTBIMThMMjAgNFoiIGZpbGw9IiMwMDc3QjciLz4KPC9zdmc+" alt="LinkedIn"/>
            </div>
            <h2>Crea contenido optimizado para LinkedIn</h2>
            <h4>Gánate las primeras posiciones en el feed y conviértete en la mejor alternativa.</h4>
          </div>
          <div className="feature-grid-item">
            <div className="feature-grid-icon">
              <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIwIDRMMjYgMTBIMjBWMjBIMTRWMTBIMThMMjAgNFoiIGZpbGw9IiMwMDc3QjciLz4KPC9zdmc+" alt="Speed"/>
            </div>
            <h2>Acelera tu productividad</h2>
            <h4>Dedica tu tiempo a las tareas donde de verdad marques la diferencia.</h4>
          </div>
          <div className="feature-grid-item">
            <div className="feature-grid-icon">
              <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIwIDRMMjYgMTBIMjBWMjBIMTRWMTBIMThMMjAgNFoiIGZpbGw9IiMwMDc3QjciLz4KPC9zdmc+" alt="Money"/>
            </div>
            <h2>Ahorra dinero</h2>
            <h4>Escala tu presencia en LinkedIn sin necesidad de gastarte miles de euros en un gran equipo de marketing.</h4>
          </div>
          <div className="feature-grid-item">
            <div className="feature-grid-icon">
              <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIwIDRMMjYgMTBIMjBWMjBIMTRWMTBIMThMMjAgNFoiIGZpbGw9IiMwMDc3QjciLz4KPC9zdmc+" alt="Global"/>
            </div>
            <h2>Rompe las fronteras</h2>
            <h4>Crea contenido en más idiomas que el español para llegar mucho más lejos.</h4>
          </div>
          <div className="feature-grid-item">
            <div className="feature-grid-icon">
              <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIwIDRMMjYgMTBIMjBWMjBIMTRWMTBIMThMMjAgNFoiIGZpbGw9IiMwMDc3QjciLz4KPC9zdmc+" alt="Creative"/>
            </div>
            <h2>Dile adiós a los bloqueos creativos</h2>
            <h4>Ten un aliado a mano para cualquier reto que tengas por delante.</h4>
          </div>
          <div className="feature-grid-item">
            <div className="feature-grid-icon">
              <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIwIDRMMjYgMTBIMjBWMjBIMTRWMTBIMThMMjAgNFoiIGZpbGw9IiMwMDc3QjciLz4KPC9zdmc+" alt="Marketing"/>
            </div>
            <h2>Mejora tu marketing de contenidos</h2>
            <h4>Crea contenidos que atraigan, enamoren e interesen a tus clientes.</h4>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="cta-content">
          <h1>Deja de perder tiempo y dinero<br />en la creación de tus contenidos</h1>
          <div className="cta-stats">
            <h4><span className="bold">50000</span> palabras al mes</h4>
            <div className="cta-range">
              <input type="range" min="0" max="100" defaultValue="50" className="range-input"/>
            </div>
            <h4>Ahorra <span className="bold">20</span> horas y <span className="bold">1000€</span> al mes usando LinkedAI</h4>
            <a href="/dashboard/create" className="cta-btn">
              <h2>Empezar ahora</h2>
            </a>
          </div>
        </div>
      </section>

      {/* CEO Section */}
      <section className="ceo">
        <div className="ceo-box">
          <div className="ceo-image">
            <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiByeD0iMjAiIGZpbGw9IiMwMDc3QjciLz4KPHBhdGggZD0iTTMwIDMwSDcwVjcwSDMwVjMwWiIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSI0IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+" alt="LinkedAI"/>
          </div>
          <div className="ceo-content">
            <h1>LinkedAI se comerá sus palabras</h1>
            <h3>...si encuentras otra herramienta que pueda hacer todas estas cosas</h3>
            <div className="ceo-features">
              <div className="ceo-feature">
                <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTkgMTJMMTEgMTRMMTUgMTAiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+" alt="✓"/>
                <h3>Crear posts optimizados para LinkedIn a golpe de clic en cuestión de segundos para aumentar tu visibilidad.</h3>
              </div>
              <div className="ceo-feature">
                <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTkgMTJMMTEgMTRMMTUgMTAiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+" alt="✓"/>
                <h3>Escribir en 29 idiomas a la perfección.</h3>
              </div>
              <div className="ceo-feature">
                <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTkgMTJMMTEgMTRMMTUgMTAiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+" alt="✓"/>
                <h3>Escribir cualquier tipo de contenido para cualquier temática en específico.</h3>
              </div>
              <div className="ceo-feature">
                <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTkgMTJMMTEgMTRMMTUgMTAiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+" alt="✓"/>
                <h3>Añadir hashtags relevantes que desconocías para aumentar tu alcance.</h3>
              </div>
              <div className="ceo-feature">
                <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTkgMTJMMTEgMTRMMTUgMTAiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+" alt="✓"/>
                <h3>Conseguir recomendaciones para mejorar tu contenido e incrementar el engagement.</h3>
              </div>
              <div className="ceo-feature">
                <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTkgMTJMMTEgMTRMMTUgMTAiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+" alt="✓"/>
                <h3>Escribir contenidos que no se detecten como creados de manera automática con IA.</h3>
              </div>
            </div>
            <a href="/dashboard/create" className="ceo-btn">
              <h2>¡Empezar Ahora!</h2>
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq">
        <div className="faq-header">
          <h1>Preguntas frecuentes</h1>
        </div>
        <div className="faq-list">
          <details className="faq-item">
            <summary>
              <h3>¿En qué me puede ayudar LinkedAI?</h3>
            </summary>
            <article>
              <h4>LinkedAI te puede ayudar a crear contenido optimizado para LinkedIn, desde posts hasta artículos completos para aumentar tu visibilidad y engagement en la plataforma.</h4>
            </article>
          </details>
          <details className="faq-item">
            <summary>
              <h3>¿Puedo ver una demostración de cómo funciona la herramienta?</h3>
            </summary>
            <article>
              <h4>Sí, puedes probar LinkedAI gratis creando una cuenta. Te enseñamos cómo puedes sacar el máximo potencial a la herramienta con ejemplos prácticos.</h4>
            </article>
          </details>
          <details className="faq-item">
            <summary>
              <h3>¿En qué idiomas puede escribir la herramienta?</h3>
            </summary>
            <article>
              <h4>Con el plan premium, podrás crear contenido en múltiples idiomas incluyendo español, inglés, francés, alemán, italiano y muchos más para llegar a audiencias globales.</h4>
            </article>
          </details>
          <details className="faq-item">
            <summary>
              <h3>¿Puede escribir para mi temática?</h3>
            </summary>
            <article>
              <h4>Independientemente del tipo de temática, LinkedAI puede ayudarte a crear cualquier tipo de contenido ya que está conectado a Internet y tiene información actualizada del mundo digital.</h4>
            </article>
          </details>
          <details className="faq-item">
            <summary>
              <h3>¿El contenido que genera LinkedAI tiene plagio?</h3>
            </summary>
            <article>
              <h4>El contenido que LinkedAI genera jamás será plagiado de otras webs. La IA ha sido entrenada con millones de parámetros y únicamente utilizará contenido propio generado o en base a las características que le hayas proporcionado.</h4>
            </article>
          </details>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiByeD0iOCIgZmlsbD0iIzAwNzdCNyIvPgo8cGF0aCBkPSJNMTIgMTJIMjhWMjhIMTJWMjhaIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K" alt="LinkedAI"/>
            </div>
          </div>
          <div className="footer-section">
            <h3>Producto</h3>
            <a href="#precios">Precios</a>
            <a href="/dashboard">Acceso a usuarios</a>
          </div>
          <div className="footer-section">
            <h3>Políticas</h3>
            <a href="#terminos">Términos y condiciones</a>
            <a href="#privacidad">Política de privacidad</a>
            <a href="#cookies">Cookies</a>
          </div>
          <div className="footer-section">
            <h3>Recursos</h3>
            <a href="#blog">Blog</a>
            <a href="#ayuda">Ayuda</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 LinkedAI. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
}
