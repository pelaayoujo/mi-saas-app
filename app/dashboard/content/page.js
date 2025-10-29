"use client"
import { useState, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import '../dashboard.css'

export default function Content() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [contentItems, setContentItems] = useState([])
  const [selectedArticle, setSelectedArticle] = useState(null)
  const [showModal, setShowModal] = useState(false)

  // Cargar contenido real del usuario
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch('/api/articles')
        if (response.ok) {
          const data = await response.json()
          // Convertir artículos a formato de contenido
          const formattedContent = data.articles.map(article => ({
            id: article.id,
            type: 'article',
            title: article.title,
            preview: article.body.substring(0, 150) + '...',
            content: article.body,
            wordCount: article.metadata?.estimatedReadTime ? article.metadata.estimatedReadTime * 200 : 500,
            createdAt: article.createdAt,
            status: article.status,
            tags: article.metadata?.tags || []
          }))
          setContentItems(formattedContent)
        } else {
          setContentItems([])
        }
      } catch (error) {
        console.error('Error cargando contenido:', error)
        setContentItems([])
      } finally {
        setIsLoading(false)
      }
    }

    if (session) {
      fetchContent()
    }
  }, [session])

  // Mock data comentado - Ahora usamos datos reales de la base de datos
  /*
  const [contentItems, setContentItems] = useState([
    // ... datos mock comentados
  ])
  */

  // Verificar autenticación
  if (status === 'loading' || isLoading) {
    return (
      <div className="dashboard">
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Cargando tu contenido...</p>
        </div>
      </div>
    )
  }
  
  if (!session) {
    router.push('/login')
    return null
  }

  const contentTypes = [
    { value: 'all', label: 'Todo', icon: '📄' },
    { value: 'article', label: 'Artículos', icon: '📝' }
  ]

  const getTypeInfo = (type) => {
    const typeMap = {
      article: { label: 'Artículo', icon: '📝', color: '#0077B5' }
    }
    return typeMap[type] || { label: 'Contenido', icon: '📄', color: '#6c757d' }
  }


  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const filteredContent = contentItems.filter(item => {
    const matchesFilter = selectedFilter === 'all' || item.type === selectedFilter
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.preview.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesFilter && matchesSearch
  })

  // Visualizar un elemento de contenido en el modal

  const handleDelete = (item) => {
    if (confirm(`¿Estás seguro de que quieres eliminar "${item.title}"?`)) {
      setContentItems(prev => prev.filter(content => content.id !== item.id))
    }
  }

  const handleView = (item) => {
    setSelectedArticle(item)
    setShowModal(true)
  }

  return (
    <div className="dashboard">
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
                <img 
                  src="/logos/ChatGPT Image 29 oct 2025, 21_08_17-Photoroom.png" 
                  alt="LinkedAI" 
                  className="logo-image"
                />
              </div>
              <span className="logo-text">LinkedAI</span>
            </div>
          </div>

          <div className="header-center">
            <div className="search-container">
              <input
                type="text"
                placeholder="Buscar contenido..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
          </div>

          <div className="header-right">
            <div className="user-menu">
              <div className="user-avatar">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <div className="user-info">
                <span className="user-name">{session.user.name}</span>
                <span className="user-role">{session.user.role}</span>
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
              <a href="/dashboard" className="nav-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9,22 9,12 15,12 15,22"></polyline>
                </svg>
                <span className="nav-label">Inicio</span>
              </a>
              
              <a href="/dashboard/tools" className="nav-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
                </svg>
                <span className="nav-label">Herramientas</span>
              </a>
              
              <a href="/dashboard/content" className="nav-item active">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14,2 14,8 20,8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10,9 9,9 8,9"></polyline>
                </svg>
                <span className="nav-label">Contenido Generado</span>
              </a>
              
              <a href="/dashboard/create" className="nav-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 20h9"></path>
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                </svg>
                <span className="nav-label">Generador de Artículos</span>
              </a>
              
              <a href="/dashboard/schedule" className="nav-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
            {/* Título Principal Centrado */}
            <div className="content-title">
              <h1>Tu Contenido Generado</h1>
              <p>Gestiona y organiza todo el contenido que has creado con nuestras herramientas de IA.</p>
            </div>

            <div className="content-filters">
                <div className="search-box">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                  <input
                    type="text"
                    placeholder="Buscar contenido por título, descripción o tags..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div className="filter-tabs">
                  {contentTypes.map(type => (
                    <button
                      key={type.value}
                      className={`filter-tab ${selectedFilter === type.value ? 'active' : ''}`}
                      onClick={() => setSelectedFilter(type.value)}
                    >
                      <span className="filter-icon">{type.icon}</span>
                      <span className="filter-label">{type.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="content-list">
              {filteredContent.length > 0 ? (
                filteredContent.map(item => {
                  const typeInfo = getTypeInfo(item.type)
                  return (
                    <div key={item.id} className="content-item">
                      <div className="content-item-header">
                        <div className="content-type">
                          <div className="type-icon" style={{ backgroundColor: typeInfo.color }}>
                            {typeInfo.icon}
                          </div>
                          <span className="type-label">{typeInfo.label}</span>
                        </div>
                      </div>
                      <div className="content-item-body">
                        <h3 className="content-title">{item.title}</h3>
                        <p className="content-preview">{item.preview}</p>
                        <div className="content-meta">
                          <span className="meta-item">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                              <polyline points="14,2 14,8 20,8"></polyline>
                            </svg>
                            {item.wordCount} palabras
                          </span>
                          <span className="meta-item">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <circle cx="12" cy="12" r="10"></circle>
                              <polyline points="12 6 12 12 16 14"></polyline>
                            </svg>
                            {formatDate(item.createdAt)}
                          </span>
                          <div className="content-tags">
                            {item.tags.map(tag => (
                              <span key={tag} className="content-tag">#{tag}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="content-item-actions">
                        <button 
                          className="action-btn view-btn"
                          onClick={() => handleView(item)}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                          </svg>
                          Ver
                        </button>
                        <button 
                          className="action-btn delete-btn"
                          onClick={() => handleDelete(item)}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            <line x1="10" y1="11" x2="10" y2="17"></line>
                            <line x1="14" y1="11" x2="14" y2="17"></line>
                          </svg>
                          Eliminar
                        </button>
                      </div>
                    </div>
                  )
                })
              ) : (
                <div className="empty-state">
                  <span className="empty-icon">📦</span>
                  <h3>No hay contenido generado</h3>
                  <p>Parece que aún no has creado ningún contenido. ¡Empieza a usar nuestras herramientas para generar artículos!</p>
                  <button 
                    className="btn-primary"
                    onClick={() => router.push('/dashboard/tools')}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                    Ir a Herramientas
                  </button>
                </div>
              )}
            </div>
        </main>
      </div>
      
      {/* Modal de visualización de artículo */}
      {showModal && selectedArticle && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content article-view-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{selectedArticle.title}</h2>
              <button 
                className="modal-close"
                onClick={() => setShowModal(false)}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <div className="modal-body">
              <div className="article-full-content">
                <div 
                  dangerouslySetInnerHTML={{ 
                    __html: selectedArticle.content.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') 
                  }}
                  style={{ 
                    lineHeight: '1.6',
                    fontSize: '16px',
                    whiteSpace: 'pre-wrap',
                    wordWrap: 'break-word'
                  }}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button 
                className="btn-secondary"
                onClick={() => {
                  navigator.clipboard.writeText(selectedArticle.content)
                  alert('Artículo copiado al portapapeles')
                }}
              >
                Copiar Contenido
              </button>
              <button 
                className="btn-primary"
                onClick={() => setShowModal(false)}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}