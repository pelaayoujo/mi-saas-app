"use client"
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import './dashboard.css'

export default function UserDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()

  // Verificar autenticación
  if (status === 'loading') {
    return (
      <div className="simple-dashboard">
        <div className="loading">Cargando tu dashboard...</div>
      </div>
    )
  }
  
  if (!session) {
    // Redirigir al login después de un breve delay para evitar loops
    setTimeout(() => {
      router.push('/login')
    }, 100)
    return (
      <div className="simple-dashboard">
        <div className="loading">Redirigiendo al login...</div>
      </div>
    )
  }

  const handleCreateArticle = () => {
    router.push('/dashboard/create')
  }

  return (
    <div className="simple-dashboard">
      {/* Header Simple */}
      <header className="simple-header">
        <div className="header-content">
          <div className="logo">
            <span className="logo-icon">✍️</span>
            <span className="logo-text">LinkedAI</span>
          </div>
          <div className="user-info">
            <span>Hola, {session.user.name}</span>
            <button 
              className="logout-btn"
              onClick={() => signOut({ callbackUrl: '/' })}
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>

      {/* Contenido Principal */}
      <main className="simple-main">
        <div className="welcome-section">
          <h1>¡Bienvenido a LinkedAI!</h1>
          <p>Crea contenido profesional para LinkedIn con la ayuda de IA</p>
        </div>

        <div className="action-section">
          <div className="action-card">
            <div className="action-icon">✏️</div>
            <h3>Crear Artículo</h3>
            <p>Crea contenido optimizado para LinkedIn usando nuestras plantillas profesionales</p>
            <button className="primary-btn" onClick={handleCreateArticle}>
              Crear Artículo
            </button>
          </div>

          <div className="action-card">
            <div className="action-icon">📊</div>
            <h3>Mis Artículos</h3>
            <p>Gestiona y edita tus artículos creados</p>
            <button className="secondary-btn" disabled>
              Próximamente
            </button>
          </div>

          <div className="action-card">
            <div className="action-icon">📈</div>
            <h3>Analytics</h3>
            <p>Ve el rendimiento de tus publicaciones</p>
            <button className="secondary-btn" disabled>
              Próximamente
            </button>
          </div>
        </div>

        <div className="info-section">
          <h2>¿Cómo funciona?</h2>
          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h4>Elige una plantilla</h4>
                <p>Selecciona entre nuestras plantillas profesionales optimizadas para LinkedIn</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h4>Personaliza tu contenido</h4>
                <p>Adapta el contenido a tu industria y estilo personal</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h4>Publica y crece</h4>
                <p>Comparte tu contenido y aumenta tu visibilidad profesional</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}


