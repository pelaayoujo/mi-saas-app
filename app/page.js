"use client"

export default function Home() {
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
            <a href="/dashboard">Dashboard</a>
            <a href="/login">Iniciar Sesión</a>
            <a href="/register">Registrarse</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              La #1 Herramienta de IA para <span className="highlight">LinkedIn</span>
            </h1>
            <p className="hero-description">
              Genera contenido viral para LinkedIn con inteligencia artificial. Posts, artículos y biografías optimizadas en segundos.
            </p>
            <div className="hero-cta">
              <a href="/dashboard/create" className="hero-btn">
                Comenzar Gratis
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
