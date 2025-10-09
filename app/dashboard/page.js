"use client"
import { useState, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import './dashboard.css'

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [recentArticles, setRecentArticles] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // Cargar artículos reales del usuario
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('/api/articles')
        if (response.ok) {
          const data = await response.json()
          // Tomar solo los últimos 4 artículos
          setRecentArticles(data.articles.slice(0, 4))
        } else {
          // Si no hay artículos, usar array vacío
          setRecentArticles([])
        }
      } catch (error) {
        console.error('Error cargando artículos:', error)
        setRecentArticles([])
      } finally {
        setIsLoading(false)
      }
    }

    if (session) {
      fetchArticles()
    }
  }, [session])

  // Verificar autenticación
  if (status === 'loading' || isLoading) {
    return (
      <div className="dashboard">
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Cargando tu dashboard...</p>
        </div>
      </div>
    )
  }
  
  if (!session) {
    router.push('/login')
    return null
  }

  const calendarEvents = [
    {
      id: 1,
      title: "Cómo crear contenido que genere engagement",
      date: "2024-01-20",
      time: "09:00"
    },
    {
      id: 2,
      title: "Nuevo artículo sobre liderazgo",
      date: "2024-01-22",
      time: "14:00"
    }
  ]


  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  const formatCalendarDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short'
    })
  }

  return (
    <div className="dashboard">
      {/* Header Fijo */}
      <header className="header">
        <div className="header-content">
          <div className="header-left">
            <button 
              className="menu-toggle"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
            <div className="logo">
              <div className="logo-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </div>
              <span className="logo-text">LinkedAI</span>
            </div>
          </div>

          <div className="header-center">
            <div className="search-container">
              <input
                type="text"
                placeholder="Buscar artículos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
            </div>
          </div>

          <div className="header-right">
            <div className="user-menu">
              <div className="user-avatar">
                {session.user.name?.charAt(0) || 'U'}
              </div>
              <div className="user-dropdown">
                <span className="user-name">{session.user.name}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="dashboard-layout">
        {/* Sidebar */}
        <aside className={`sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
          <nav className="sidebar-nav">
            {/* Menú Principal */}
            <div className="nav-section">
              <a href="/dashboard" className="nav-item active">
                <svg className="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9,22 9,12 15,12 15,22"></polyline>
                </svg>
                <span className="nav-label">Inicio</span>
              </a>
              
              <a href="/dashboard/tools" className="nav-item">
                <svg className="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
                </svg>
                <span className="nav-label">Herramientas</span>
              </a>
              
              <a href="/dashboard/content" className="nav-item">
                <svg className="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14,2 14,8 20,8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10,9 9,9 8,9"></polyline>
                </svg>
                <span className="nav-label">Contenido Generado</span>
              </a>
              
              <a href="/dashboard/create" className="nav-item">
                <svg className="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 20h9"></path>
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                </svg>
                <span className="nav-label">Generador de Artículos</span>
              </a>
              
              <a href="/dashboard/schedule" className="nav-item">
                <svg className="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                <span className="nav-label">Programación</span>
              </a>
            </div>
            
            {/* Sección de Cerrar Sesión */}
            <div className="nav-section nav-section-bottom">
              <button 
                className="nav-item nav-item-logout"
                onClick={() => signOut({ callbackUrl: '/' })}
              >
                <svg className="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  <polyline points="16,17 21,12 16,7"></polyline>
                  <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
                <span className="nav-label">Cerrar Sesión</span>
              </button>
            </div>
          </nav>
        </aside>

        {/* Contenido Principal */}
        <main className="main-content">
          <div className="content-container">
            {/* Hero Section */}
            <div className="hero-section">
              <div className="hero-content">
                <div className="hero-text">
                  <h1>¡Crea contenido que impacte!</h1>
                  <p>
                    Genera artículos profesionales para LinkedIn con IA. 
                    Ahorra tiempo y crea contenido que genere engagement real.
                  </p>
                  <div className="hero-stats">
                    <div className="hero-stat">
                      <span className="stat-number">{recentArticles.length}</span>
                      <span className="stat-label">Artículos creados</span>
                    </div>
                    <div className="hero-stat">
                      <span className="stat-number">15K+</span>
                      <span className="stat-label">Posts generados</span>
                    </div>
                    <div className="hero-stat">
                      <span className="stat-number">4h</span>
                      <span className="stat-label">Tiempo ahorrado/semana</span>
                    </div>
                  </div>
                  <div className="hero-actions">
                    <button 
                      className="btn-primary large"
                      onClick={() => router.push('/dashboard/create')}
                    >
                      <span className="btn-icon">✨</span>
                      Crear Artículo Ahora
                    </button>
                    <button 
                      className="btn-secondary large"
                      onClick={() => router.push('/dashboard/content')}
                    >
                      <span className="btn-icon">📄</span>
                      Ver Mis Artículos
                    </button>
                  </div>
                </div>
                <div className="hero-visual">
                  <div className="floating-card card-1">
                    <div className="card-icon">📝</div>
                    <div className="card-text">Genera contenido</div>
                  </div>
                  <div className="floating-card card-2">
                    <div className="card-icon">⚡</div>
                    <div className="card-text">Ahorra tiempo</div>
                  </div>
                  <div className="floating-card card-3">
                    <div className="card-icon">🚀</div>
                    <div className="card-text">Mejora engagement</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="content-grid">
              {/* Quick Actions */}
              <div className="quick-actions-section">
                <div className="section-header">
                  <h2>Acciones Rápidas</h2>
                  <p>Gestiona tu contenido de forma eficiente</p>
                </div>
                <div className="quick-actions-grid">
                  <div className="quick-action-card" onClick={() => router.push('/dashboard/create')}>
                    <div className="action-icon">✨</div>
                    <h3>Crear Artículo</h3>
                    <p>Genera contenido profesional con IA</p>
                  </div>
                  <div className="quick-action-card" onClick={() => router.push('/dashboard/content')}>
                    <div className="action-icon">📄</div>
                    <h3>Mis Artículos</h3>
                    <p>Gestiona tu biblioteca de contenido</p>
                  </div>
                  <div className="quick-action-card" onClick={() => router.push('/dashboard/schedule')}>
                    <div className="action-icon">📅</div>
                    <h3>Programar</h3>
                    <p>Organiza tu calendario de publicaciones</p>
                  </div>
                  <div className="quick-action-card" onClick={() => router.push('/dashboard/tools')}>
                    <div className="action-icon">🔧</div>
                    <h3>Herramientas</h3>
                    <p>Utilidades para mejorar tu contenido</p>
                  </div>
                </div>
              </div>

              {/* Artículos Recientes */}
              <div className="articles-section">
                <div className="section-header">
                  <h2>Artículos Recientes</h2>
                  <button 
                    className="view-all-btn"
                    onClick={() => router.push('/dashboard/content')}
                  >
                    Ver todos →
                  </button>
                </div>

                <div className="articles-list">
                  {recentArticles.length === 0 ? (
                    <div className="empty-state">
                      <div className="empty-icon">📝</div>
                      <h3>¡Comienza a crear!</h3>
                      <p>Tu primer artículo te está esperando. Genera contenido que genere impacto en LinkedIn.</p>
                      <button 
                        className="btn-primary"
                        onClick={() => router.push('/dashboard/create')}
                      >
                        Crear mi primer artículo
                      </button>
                    </div>
                  ) : (
                    recentArticles.slice(0, 3).map((article) => {
                      return (
                        <div key={article.id} className="article-card modern">
                          <div className="article-content">
                            <div className="article-header">
                              <h3 className="article-title">{article.title}</h3>
                              <div className="article-date">{formatDate(article.createdAt)}</div>
                            </div>
                            <div className="article-preview">
                              {article.body ? article.body.substring(0, 100) + '...' : 'Sin contenido'}
                            </div>
                          </div>
                          <div className="article-actions">
                            <button className="action-btn primary">Editar</button>
                          </div>
                        </div>
                      )
                    })
                  )}
                </div>
              </div>

              {/* Insights */}
              <div className="insights-section">
                <div className="section-header">
                  <h2>Insights de Contenido</h2>
                  <p>Métricas y tendencias para optimizar tu estrategia</p>
                </div>
                <div className="insights-grid">
                  <div className="insight-card">
                    <div className="insight-icon">📈</div>
                    <div className="insight-content">
                      <h3>Engagement Promedio</h3>
                      <div className="insight-value">+150%</div>
                      <p>Incremento en interacciones</p>
                    </div>
                  </div>
                  <div className="insight-card">
                    <div className="insight-icon">⏱️</div>
                    <div className="insight-content">
                      <h3>Tiempo de Creación</h3>
                      <div className="insight-value">15 min</div>
                      <p>Promedio por artículo</p>
                    </div>
                  </div>
                  <div className="insight-card">
                    <div className="insight-icon">🎯</div>
                    <div className="insight-content">
                      <h3>Calidad del Contenido</h3>
                      <div className="insight-value">95%</div>
                      <p>Optimización automática</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
