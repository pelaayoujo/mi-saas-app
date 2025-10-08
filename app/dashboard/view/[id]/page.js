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
      <div className="main-content">
        {/* Header */}
        <header className="dashboard-header">
          <button 
            className="sidebar-toggle mobile"
            onClick={() => setSidebarOpen(true)}
          >
            ☰
          </button>
          <div className="header-content">
            <h1>Ver Artículo</h1>
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
        .article-view-container {
          padding: 2rem;
          max-width: 1000px;
          margin: 0 auto;
        }

        .article-view {
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }

        .article-header {
          padding: 2rem;
          border-bottom: 1px solid #e5e7eb;
          background: #f9fafb;
        }

        .article-title {
          font-size: 2rem;
          font-weight: 700;
          color: #111827;
          margin-bottom: 1rem;
          line-height: 1.2;
        }

        .article-info {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
          flex-wrap: wrap;
        }

        .article-date,
        .article-word-count {
          color: #6b7280;
          font-size: 0.9rem;
        }

        .article-tags {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .tag {
          background: #e5e7eb;
          color: #374151;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-size: 0.8rem;
        }

        .article-body {
          padding: 2rem;
        }

        .article-content {
          line-height: 1.7;
          color: #374151;
        }

        .article-content h1 {
          font-size: 1.8rem;
          font-weight: 700;
          color: #111827;
          margin: 2rem 0 1rem 0;
        }

        .article-content h2 {
          font-size: 1.4rem;
          font-weight: 600;
          color: #111827;
          margin: 1.5rem 0 0.75rem 0;
        }

        .article-content h3 {
          font-size: 1.2rem;
          font-weight: 600;
          color: #111827;
          margin: 1.25rem 0 0.5rem 0;
        }

        .article-content p {
          margin-bottom: 1rem;
          color: #374151;
        }

        .article-content ul,
        .article-content ol {
          margin: 1rem 0;
          padding-left: 2rem;
        }

        .article-content li {
          margin-bottom: 0.5rem;
        }

        .article-content blockquote {
          border-left: 4px solid #3b82f6;
          padding-left: 1rem;
          margin: 1.5rem 0;
          font-style: italic;
          color: #6b7280;
        }

        .article-content code {
          background: #f3f4f6;
          padding: 0.2rem 0.4rem;
          border-radius: 4px;
          font-family: 'Courier New', monospace;
        }

        .article-content pre {
          background: #f3f4f6;
          padding: 1rem;
          border-radius: 8px;
          overflow-x: auto;
          margin: 1rem 0;
        }

        .article-actions {
          padding: 2rem;
          border-top: 1px solid #e5e7eb;
          background: #f9fafb;
          display: flex;
          gap: 1rem;
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

        @media (max-width: 768px) {
          .article-view-container {
            padding: 1rem;
          }

          .article-header,
          .article-body,
          .article-actions {
            padding: 1.5rem;
          }

          .article-title {
            font-size: 1.5rem;
          }

          .article-info {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }

          .article-actions {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  )
}