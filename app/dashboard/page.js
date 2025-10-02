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
  const [filterStatus, setFilterStatus] = useState('all')
  const [recentArticles, setRecentArticles] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // Cargar artículos reales del usuario
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('/api/articles/simple')
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

  const getStatusBadge = (status) => {
    const badges = {
      published: { text: 'Publicado', class: 'status-published' },
      scheduled: { text: 'Programado', class: 'status-scheduled' },
      draft: { text: 'Borrador', class: 'status-draft' }
    }
    return badges[status] || badges.draft
  }

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
            {/* Tarjeta de Bienvenida */}
            <div className="welcome-card">
              <div className="welcome-content">
                <h1>Bienvenido, {session.user.name}</h1>
                <p>Crea contenido profesional que genere impacto en LinkedIn. Comienza escribiendo tu próximo artículo.</p>
                <button 
                  className="cta-button"
                  onClick={() => router.push('/dashboard/create')}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 20h9"></path>
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                  </svg>
                  Crear Artículo
                </button>
              </div>
              <div className="welcome-visual">
                <div className="welcome-stats">
                  <div className="stat-item">
                    <div className="stat-number">{recentArticles.length}</div>
                    <div className="stat-label">Artículos</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-number">{recentArticles.filter(a => a.status === 'published').length}</div>
                    <div className="stat-label">Publicados</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="content-grid">
              {/* Artículos Recientes */}
              <div className="articles-section">
                <div className="section-header">
                  <h2>Artículos Recientes</h2>
                  <div className="filter-tabs">
                    <button 
                      className={`filter-tab ${filterStatus === 'all' ? 'active' : ''}`}
                      onClick={() => setFilterStatus('all')}
                    >
                      Todos
                    </button>
                    <button 
                      className={`filter-tab ${filterStatus === 'published' ? 'active' : ''}`}
                      onClick={() => setFilterStatus('published')}
                    >
                      Publicados
                    </button>
                    <button 
                      className={`filter-tab ${filterStatus === 'draft' ? 'active' : ''}`}
                      onClick={() => setFilterStatus('draft')}
                    >
                      Borradores
                    </button>
                  </div>
                </div>

                <div className="articles-list">
                  {recentArticles.length === 0 ? (
                    <div className="empty-state">
                      <div className="empty-icon">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M12 20h9"></path>
                          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                        </svg>
                      </div>
                      <h3>Aún no tienes artículos</h3>
                      <p>Crea tu primer artículo para ganar visibilidad en LinkedIn</p>
                      <button 
                        className="empty-cta"
                        onClick={() => router.push('/dashboard/create')}
                      >
                        Crear Artículo
                      </button>
                    </div>
                  ) : (
                    recentArticles.map((article) => {
                      const statusBadge = getStatusBadge(article.status)
                      return (
                        <div key={article.id} className="article-card">
                          <div className="article-content">
                            <div className="article-header">
                              <h3 className="article-title">{article.title}</h3>
                              <span className={`status-badge ${statusBadge.class}`}>
                                {statusBadge.text}
                              </span>
                            </div>
                            <div className="article-meta">
                              <span className="article-date">{formatDate(article.createdAt)}</span>
                              {article.scheduledDate && (
                                <span className="article-scheduled">
                                  Programado: {formatDate(article.scheduledDate)}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="article-actions">
                            <button className="action-btn edit">Editar</button>
                            {article.status === 'scheduled' && (
                              <button className="action-btn schedule">Reprogramar</button>
                            )}
                          </div>
                        </div>
                      )
                    })
                  )}
                </div>
              </div>

              {/* Calendario */}
              <div className="calendar-section">
                <div className="section-header">
                  <h2>Próximas Publicaciones</h2>
                  <button className="calendar-btn">Ver Calendario</button>
                </div>
                <div className="calendar-events">
                  {calendarEvents.length === 0 ? (
                    <div className="empty-calendar">
                      <div className="empty-icon">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                          <line x1="16" y1="2" x2="16" y2="6"></line>
                          <line x1="8" y1="2" x2="8" y2="6"></line>
                          <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                      </div>
                      <p>No hay publicaciones programadas</p>
                    </div>
                  ) : (
                    calendarEvents.map((event) => (
                      <div key={event.id} className="calendar-event">
                        <div className="event-date">
                          <div className="event-day">{formatCalendarDate(event.date)}</div>
                          <div className="event-time">{event.time}</div>
                        </div>
                        <div className="event-content">
                          <div className="event-title">{event.title}</div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
