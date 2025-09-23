"use client"
import { useState, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import './dashboard.css'

export default function UserDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [articles, setArticles] = useState([])
  const [stats, setStats] = useState({
    totalArticles: 0,
    publishedArticles: 0,
    scheduledArticles: 0,
    draftArticles: 0,
    totalImpressions: 0,
    totalReactions: 0,
    averageEngagement: 0
  })

  // Verificar autenticación y cargar datos
  useEffect(() => {
    if (status === 'loading') return
    
    if (!session) {
      router.push('/login')
      return
    }

    // Cargar datos del usuario
    setUser({
      nombre: session.user.name,
      email: session.user.email,
      role: session.user.role || 'user'
    })

    // Cargar artículos y estadísticas
    loadDashboardData()
    setLoading(false)
  }, [session, status, router])

  const loadDashboardData = async () => {
    try {
      // Cargar artículos del usuario
      const articlesResponse = await fetch('/api/articles')
      if (articlesResponse.ok) {
        const articlesData = await articlesResponse.json()
        setArticles(articlesData.articles || [])
      }

      // Cargar estadísticas
      const statsResponse = await fetch('/api/analytics/dashboard')
      if (statsResponse.ok) {
        const statsData = await statsResponse.json()
        setStats(statsData.analytics || stats)
      }
    } catch (error) {
      console.error('Error cargando datos del dashboard:', error)
    }
  }

  const handleCreateArticle = () => {
    router.push('/dashboard/create')
  }

  const handleEditArticle = (articleId) => {
    router.push(`/dashboard/edit/${articleId}`)
  }

  const handleViewAnalytics = (articleId) => {
    router.push(`/dashboard/analytics/${articleId}`)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusBadge = (status) => {
    const badges = {
      draft: { text: 'Borrador', class: 'status-draft' },
      scheduled: { text: 'Programado', class: 'status-scheduled' },
      published: { text: 'Publicado', class: 'status-published' },
      archived: { text: 'Archivado', class: 'status-archived' }
    }
    return badges[status] || badges.draft
  }

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Cargando tu dashboard...</p>
      </div>
    )
  }

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-left">
            <div className="logo">
              <span className="logo-icon">✍️</span>
              <span className="logo-text">LinkedAI</span>
            </div>
          </div>
          <div className="header-right">
            <div className="user-menu">
              <span className="user-name">Hola, {user.nombre}</span>
              <button 
                className="logout-btn"
                onClick={() => signOut({ callbackUrl: '/' })}
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="dashboard-layout">
        {/* Sidebar */}
        <aside className="dashboard-sidebar">
          <nav className="sidebar-nav">
            <a href="/dashboard" className="nav-item active">
              <span className="nav-icon">📊</span>
              <span className="nav-label">Dashboard</span>
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
              <span className="nav-icon">📈</span>
              <span className="nav-label">Analytics</span>
            </a>
            <a href="/dashboard/settings" className="nav-item">
              <span className="nav-icon">⚙️</span>
              <span className="nav-label">Configuración</span>
            </a>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="dashboard-main">
          <div className="dashboard-content">
            {/* Stats Cards */}
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">📝</div>
                <div className="stat-content">
                  <div className="stat-number">{stats.totalArticles}</div>
                  <div className="stat-label">Artículos</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">👁️</div>
                <div className="stat-content">
                  <div className="stat-number">{stats.totalImpressions.toLocaleString()}</div>
                  <div className="stat-label">Impresiones</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">💬</div>
                <div className="stat-content">
                  <div className="stat-number">{stats.averageEngagement}%</div>
                  <div className="stat-label">Engagement</div>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="cta-section">
              <div className="cta-content">
                <h2>Crea contenido que genere engagement</h2>
                <p>Usa nuestras plantillas profesionales y herramientas de IA para crear artículos optimizados para LinkedIn</p>
                <button className="cta-button" onClick={handleCreateArticle}>
                  <span className="cta-icon">✏️</span>
                  Crear Artículo
                </button>
              </div>
            </div>

            {/* Recent Articles */}
            <div className="articles-section">
              <div className="section-header">
                <h3>Artículos Recientes</h3>
                <a href="/dashboard/articles" className="view-all">Ver todos</a>
              </div>
              
              {articles.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">📝</div>
                  <h4>Aún no tienes artículos</h4>
                  <p>Crea tu primer artículo para ganar visibilidad en LinkedIn</p>
                  <button className="empty-cta" onClick={handleCreateArticle}>
                    Crear Artículo
                  </button>
                </div>
              ) : (
                <div className="articles-list">
                  {articles.slice(0, 5).map((article) => {
                    const statusBadge = getStatusBadge(article.status)
                    return (
                      <div key={article.id} className="article-card">
                        <div className="article-content">
                          <div className="article-header">
                            <h4 className="article-title">{article.title}</h4>
                            <span className={`status-badge ${statusBadge.class}`}>
                              {statusBadge.text}
                            </span>
                          </div>
                          <div className="article-meta">
                            <span className="article-date">
                              {formatDate(article.updatedAt)}
                            </span>
                            <span className="article-words">
                              {article.wordCount} palabras
                            </span>
                          </div>
                        </div>
                        <div className="article-actions">
                          <button 
                            className="action-btn edit"
                            onClick={() => handleEditArticle(article.id)}
                          >
                            Editar
                          </button>
                          {article.status === 'published' && (
                            <button 
                              className="action-btn analytics"
                              onClick={() => handleViewAnalytics(article.id)}
                            >
                              Analytics
                            </button>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}


