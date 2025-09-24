"use client"
import { useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import './dashboard.css'

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  // Verificar autenticación
  if (status === 'loading') {
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

  // Datos mock para el diseño
  const metrics = {
    followers: 1247,
    impressions: 15680,
    engagement: 8.4,
    postsCreated: 23
  }

  const recentArticles = [
    {
      id: 1,
      title: "5 estrategias para mejorar tu presencia en LinkedIn",
      status: "published",
      date: "2024-01-15",
      views: 1240,
      engagement: 12
    },
    {
      id: 2,
      title: "Cómo crear contenido que genere engagement",
      status: "scheduled",
      date: "2024-01-16",
      views: 0,
      engagement: 0
    },
    {
      id: 3,
      title: "Tendencias de marketing digital 2024",
      status: "draft",
      date: "2024-01-14",
      views: 0,
      engagement: 0
    }
  ]

  const tips = [
    "Publica los martes y miércoles para mayor alcance",
    "Usa hashtags relevantes (3-5 máximo)",
    "Interactúa con comentarios en las primeras 2 horas",
    "Comparte contenido de valor, no solo promocional"
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
              ☰
            </button>
            <div className="logo">
              <span className="logo-icon">✍️</span>
              <span className="logo-text">LinkedAI</span>
            </div>
          </div>

          <div className="header-center">
            <div className="search-container">
              <input
                type="text"
                placeholder="Buscar artículos, métricas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              <span className="search-icon">🔍</span>
            </div>
          </div>

          <div className="header-right">
            <div className="user-menu">
              <div className="user-avatar">
                {session.user.name?.charAt(0) || 'U'}
              </div>
              <div className="user-dropdown">
                <span className="user-name">{session.user.name}</span>
                <button 
                  className="logout-btn"
                  onClick={() => signOut({ callbackUrl: '/' })}
                >
                  Cerrar Sesión
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="dashboard-layout">
        {/* Sidebar */}
        <aside className={`sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
          <nav className="sidebar-nav">
            <a href="/dashboard" className="nav-item active">
              <span className="nav-icon">🏠</span>
              <span className="nav-label">Inicio</span>
            </a>
            <a href="/dashboard/create" className="nav-item">
              <span className="nav-icon">✏️</span>
              <span className="nav-label">Crear Artículo</span>
            </a>
            <a href="/dashboard/calendar" className="nav-item">
              <span className="nav-icon">📅</span>
              <span className="nav-label">Calendario</span>
            </a>
            <a href="/dashboard/analytics" className="nav-item">
              <span className="nav-icon">📊</span>
              <span className="nav-label">Analytics</span>
            </a>
            <a href="/dashboard/settings" className="nav-item">
              <span className="nav-icon">⚙️</span>
              <span className="nav-label">Ajustes</span>
            </a>
          </nav>
        </aside>

        {/* Contenido Principal */}
        <main className="main-content">
          <div className="content-container">
            {/* Tarjeta de Bienvenida */}
            <div className="welcome-card">
              <div className="welcome-content">
                <h1>¡Hola, {session.user.name}! 👋</h1>
                <p>Bienvenido a tu centro de control de LinkedAI. Crea contenido que genere impacto.</p>
                <button className="cta-button">
                  <span className="cta-icon">✏️</span>
                  Crear Artículo
                </button>
              </div>
              <div className="welcome-visual">
                <div className="chart-placeholder">
                  <span className="chart-icon">📈</span>
                </div>
              </div>
            </div>

            {/* Métricas Rápidas */}
            <div className="metrics-grid">
              <div className="metric-card">
                <div className="metric-icon">👥</div>
                <div className="metric-content">
                  <div className="metric-value">{metrics.followers.toLocaleString()}</div>
                  <div className="metric-label">Seguidores</div>
                  <div className="metric-change positive">+12%</div>
                </div>
              </div>
              <div className="metric-card">
                <div className="metric-icon">👁️</div>
                <div className="metric-content">
                  <div className="metric-value">{metrics.impressions.toLocaleString()}</div>
                  <div className="metric-label">Impresiones</div>
                  <div className="metric-change positive">+8%</div>
                </div>
              </div>
              <div className="metric-card">
                <div className="metric-icon">💬</div>
                <div className="metric-content">
                  <div className="metric-value">{metrics.engagement}%</div>
                  <div className="metric-label">Engagement</div>
                  <div className="metric-change positive">+2.1%</div>
                </div>
              </div>
              <div className="metric-card">
                <div className="metric-icon">📝</div>
                <div className="metric-content">
                  <div className="metric-value">{metrics.postsCreated}</div>
                  <div className="metric-label">Posts Creados</div>
                  <div className="metric-change neutral">Este mes</div>
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
                      <div className="empty-icon">📝</div>
                      <h3>Aún no tienes artículos</h3>
                      <p>Crea tu primer artículo para ganar visibilidad en LinkedIn</p>
                      <button className="empty-cta">Crear Artículo</button>
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
                              <span className="article-date">{formatDate(article.date)}</span>
                              {article.status === 'published' && (
                                <>
                                  <span className="article-views">{article.views} vistas</span>
                                  <span className="article-engagement">{article.engagement}% engagement</span>
                                </>
                              )}
                            </div>
                          </div>
                          <div className="article-actions">
                            <button className="action-btn edit">Editar</button>
                            {article.status === 'published' && (
                              <button className="action-btn analytics">Analytics</button>
                            )}
                          </div>
                        </div>
                      )
                    })
                  )}
                </div>
              </div>

              {/* Tips y Sugerencias */}
              <div className="tips-section">
                <div className="section-header">
                  <h2>💡 Tips para LinkedIn</h2>
                </div>
                <div className="tips-list">
                  {tips.map((tip, index) => (
                    <div key={index} className="tip-card">
                      <div className="tip-icon">💡</div>
                      <p className="tip-text">{tip}</p>
                    </div>
                  ))}
                </div>
                <div className="tips-footer">
                  <button className="tips-cta">Ver más tips</button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
