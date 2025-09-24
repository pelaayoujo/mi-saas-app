"use client"
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import './dashboard.css'

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()

  // Verificar autenticación
  if (status === 'loading') {
    return (
      <div className="dashboard">
        <div className="loading">Cargando...</div>
      </div>
    )
  }
  
  if (!session) {
    router.push('/login')
    return null
  }

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="header">
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
      <main className="main">
        <div className="welcome">
          <h1>¡Bienvenido a LinkedAI!</h1>
          <p>Tu dashboard está funcionando correctamente</p>
        </div>

        <div className="cards">
          <div className="card">
            <div className="card-icon">✏️</div>
            <h3>Crear Contenido</h3>
            <p>Próximamente disponible</p>
          </div>

          <div className="card">
            <div className="card-icon">📊</div>
            <h3>Analytics</h3>
            <p>Próximamente disponible</p>
          </div>

          <div className="card">
            <div className="card-icon">⚙️</div>
            <h3>Configuración</h3>
            <p>Próximamente disponible</p>
          </div>
        </div>
      </main>
    </div>
  )
}
