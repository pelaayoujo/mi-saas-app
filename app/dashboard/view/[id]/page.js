"use client"
import { useState, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter, useParams } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import '../../dashboard.css'

export default function ViewContent() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const params = useParams()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [content, setContent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Cargar artículo desde la API
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        if (!params?.id) {
          setError('ID de artículo no válido')
          setLoading(false)
          return
        }

        const response = await fetch(`/api/articles/${params.id}`)
        
        if (response.ok) {
          const data = await response.json()
          if (data.success) {
            setContent(data.article)
          } else {
            setError(data.message || 'Error cargando artículo')
          }
        } else if (response.status === 404) {
          setError('Artículo no encontrado')
        } else {
          setError('Error del servidor')
        }
      } catch (error) {
        console.error('Error cargando artículo:', error)
        setError('Error de conexión')
      } finally {
        setLoading(false)
      }
    }

    if (session && params?.id) {
      fetchArticle()
    }
  }, [session, params?.id])

  // Verificar autenticación
  if (status === 'loading' || loading) {
    return (
      <div className="dashboard">
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Cargando artículo...</p>
        </div>
      </div>
    )
  }
  
  if (!session) {
    router.push('/login')
    return null
  }

  // Mostrar error si hay alguno
  if (error) {
    return (
      <div className="dashboard">
        <div className="error-container">
          <div className="error-icon">⚠️</div>
          <h2>Error</h2>
          <p>{error}</p>
          <button 
            onClick={() => router.push('/dashboard/content')}
            className="btn-primary"
          >
            Volver al Contenido
          </button>
        </div>
      </div>
    )
  }

  // Mostrar contenido del artículo
  if (!content) {
    return (
      <div className="dashboard">
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>No se encontró el artículo...</p>
        </div>
      </div>
    )
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'published':
        return { text: 'Publicado', class: 'status-published' }
      case 'draft':
        return { text: 'Borrador', class: 'status-draft' }
      case 'scheduled':
        return { text: 'Programado', class: 'status-scheduled' }
      default:
        return { text: 'Desconocido', class: 'status-draft' }
    }
  }

  const statusBadge = getStatusBadge(content.status)

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-header">
          <h2>LinkedAI</h2>
          <button 
            className="sidebar-toggle"
            onClick={() => setSidebarOpen(false)}
          >
            ✕
          </button>
        </div>
        <nav className="sidebar-nav">
          <a href="/dashboard" className="nav-item">
            <span className="nav-icon">📊</span>
            Dashboard
          </a>
          <a href="/dashboard/create" className="nav-item">
            <span className="nav-icon">✍️</span>
            Crear Artículo
          </a>
          <a href="/dashboard/content" className="nav-item active">
            <span className="nav-icon">📄</span>
            Mi Contenido
          </a>
          <a href="/dashboard/schedule" className="nav-item">
            <span className="nav-icon">📅</span>
            Programar
          </a>
          <a href="/dashboard/tools" className="nav-item">
            <span className="nav-icon">🔧</span>
            Herramientas
          </a>
        </nav>
        <div className="sidebar-footer">
          <button onClick={() => signOut()} className="logout-btn">
            <span className="nav-icon">🚪</span>
            Cerrar Sesión
          </button>
        </div>
      </div>

      {/* Overlay para móvil */}
      {sidebarOpen && (
        <div 
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="main-content full-width">
        {/* Header */}
        <header className="dashboard-header modern">
          <button 
            className="sidebar-toggle mobile"
            onClick={() => setSidebarOpen(true)}
          >
            ☰
          </button>
          <div className="header-content">
            <div className="header-title">
              <h1>Ver Artículo</h1>
              <p>Visualiza y gestiona tu contenido</p>
            </div>
            <div className="header-actions">
              <button 
                onClick={() => router.push('/dashboard/content')}
                className="btn-secondary"
              >
                ← Volver al Contenido
              </button>
            </div>
          </div>
        </header>

        {/* Article Content */}
        <div className="article-view-container">
          <div className="article-view">
            {/* Article Header */}
            <div className="article-header">
              <div className="article-meta">
                <h1 className="article-title">{content.title}</h1>
                <div className="article-info">
                  <span className={`status-badge ${statusBadge.class}`}>
                    {statusBadge.text}
                  </span>
                  <span className="article-date">
                    {formatDate(content.createdAt)}
                  </span>
                  <span className="article-word-count">
                    {content.wordCount} palabras
                  </span>
                </div>
                {content.tags && content.tags.length > 0 && (
                  <div className="article-tags">
                    {content.tags.map((tag, index) => (
                      <span key={index} className="tag">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Article Body */}
            <div className="article-body">
              <div className="article-content">
                <ReactMarkdown>
                  {content.body}
                </ReactMarkdown>
              </div>
            </div>

            {/* Article Actions */}
            <div className="article-actions">
              <button 
                onClick={() => router.push(`/dashboard/editor?id=${content.id}`)}
                className="btn-primary"
              >
                ✏️ Editar Artículo
              </button>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(content.body)
                  alert('Artículo copiado al portapapeles')
                }}
                className="btn-secondary"
              >
                📋 Copiar Contenido
              </button>
              {content.status === 'draft' && (
                <button className="btn-success">
                  📤 Publicar
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .main-content.full-width {
          margin-left: 0 !important;
          padding: 0 !important;
          width: 100% !important;
          max-width: none !important;
        }

        .dashboard-header.modern {
          background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
          border-bottom: 1px solid #e2e8f0;
          padding: 2rem 4rem;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
        }

        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1200px;
          margin: 0 auto;
        }

        .header-title h1 {
          font-size: 2rem;
          font-weight: 700;
          color: #0f172a;
          margin: 0;
          line-height: 1.2;
        }

        .header-title p {
          color: #64748b;
          font-size: 1rem;
          margin: 0.5rem 0 0 0;
        }

        .header-actions {
          display: flex;
          gap: 1rem;
          align-items: center;
        }

        .article-view-container {
          padding: 0;
          width: 100%;
          max-width: none;
          margin: 0;
        }

        .article-view {
          background: white;
          border-radius: 0;
          box-shadow: none;
          overflow: hidden;
          min-height: calc(100vh - 80px);
          display: flex;
          flex-direction: column;
        }

        .article-header {
          padding: 3rem 4rem 2rem 4rem;
          border-bottom: 1px solid #e5e7eb;
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          position: relative;
          overflow: hidden;
        }

        .article-header::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #3b82f6, #8b5cf6, #06b6d4);
        }

        .article-meta {
          max-width: 900px;
          margin: 0 auto;
        }

        .article-title {
          font-size: 2.5rem;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 1.5rem;
          line-height: 1.1;
          letter-spacing: -0.02em;
        }

        .article-info {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
        }

        .article-date,
        .article-word-count {
          color: #64748b;
          font-size: 0.95rem;
          font-weight: 500;
        }

        .article-tags {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .tag {
          background: linear-gradient(135deg, #e2e8f0, #cbd5e1);
          color: #475569;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 500;
          border: 1px solid #e2e8f0;
        }

        .article-body {
          padding: 4rem;
          flex: 1;
          display: flex;
          justify-content: center;
        }

        .article-content {
          max-width: 800px;
          width: 100%;
          line-height: 1.8;
          color: #334155;
          font-size: 1.1rem;
        }

        .article-content h1 {
          font-size: 2rem;
          font-weight: 700;
          color: #0f172a;
          margin: 3rem 0 1.5rem 0;
          line-height: 1.2;
          letter-spacing: -0.01em;
        }

        .article-content h2 {
          font-size: 1.5rem;
          font-weight: 600;
          color: #1e293b;
          margin: 2.5rem 0 1rem 0;
          line-height: 1.3;
          position: relative;
          padding-left: 1rem;
        }

        .article-content h2::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 4px;
          height: 60%;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          border-radius: 2px;
        }

        .article-content h3 {
          font-size: 1.25rem;
          font-weight: 600;
          color: #1e293b;
          margin: 2rem 0 0.75rem 0;
          line-height: 1.3;
        }

        .article-content p {
          margin-bottom: 1.5rem;
          color: #334155;
          font-size: 1.1rem;
          line-height: 1.8;
        }

        .article-content ul,
        .article-content ol {
          margin: 1.5rem 0;
          padding-left: 2rem;
        }

        .article-content li {
          margin-bottom: 0.75rem;
          color: #334155;
          line-height: 1.7;
        }

        .article-content blockquote {
          border-left: 4px solid #3b82f6;
          padding: 1.5rem 2rem;
          margin: 2rem 0;
          font-style: italic;
          color: #64748b;
          background: #f8fafc;
          border-radius: 0 8px 8px 0;
          position: relative;
        }

        .article-content blockquote::before {
          content: '"';
          font-size: 4rem;
          color: #cbd5e1;
          position: absolute;
          top: -0.5rem;
          left: 1rem;
          line-height: 1;
        }

        .article-content code {
          background: #f1f5f9;
          padding: 0.3rem 0.6rem;
          border-radius: 6px;
          font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;
          font-size: 0.9em;
          color: #e11d48;
          border: 1px solid #e2e8f0;
        }

        .article-content pre {
          background: #1e293b;
          padding: 2rem;
          border-radius: 12px;
          overflow-x: auto;
          margin: 2rem 0;
          border: 1px solid #334155;
        }

        .article-content pre code {
          background: none;
          border: none;
          color: #e2e8f0;
          padding: 0;
        }

        .article-actions {
          padding: 3rem 4rem;
          border-top: 1px solid #e5e7eb;
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .error-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 400px;
          text-align: center;
          padding: 2rem;
        }

        .error-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .error-container h2 {
          color: #dc2626;
          margin-bottom: 1rem;
        }

        .error-container p {
          color: #6b7280;
          margin-bottom: 2rem;
        }

        @media (max-width: 1200px) {
          .dashboard-header.modern {
            padding: 2rem;
          }

          .article-header,
          .article-body,
          .article-actions {
            padding-left: 2rem;
            padding-right: 2rem;
          }
        }

        @media (max-width: 768px) {
          .dashboard-header.modern {
            padding: 1.5rem;
          }

          .header-content {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }

          .header-title h1 {
            font-size: 1.5rem;
          }

          .header-actions {
            width: 100%;
            justify-content: flex-start;
          }

          .article-header {
            padding: 2rem 1.5rem 1.5rem 1.5rem;
          }

          .article-body {
            padding: 2rem 1.5rem;
          }

          .article-actions {
            padding: 2rem 1.5rem;
            flex-direction: column;
            align-items: stretch;
          }

          .article-title {
            font-size: 2rem;
          }

          .article-info {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.75rem;
          }

          .article-content {
            font-size: 1rem;
          }

          .article-content h1 {
            font-size: 1.75rem;
          }

          .article-content h2 {
            font-size: 1.35rem;
          }
        }
      `}</style>
    </div>
  )
}