"use client"
import { useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import '../dashboard.css'

export default function Content() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  // Mock data - En el futuro esto vendrá de la base de datos
  const [contentItems, setContentItems] = useState([
    {
      id: 1,
      type: 'article',
      title: 'Marketing Digital 2024: Estrategias que Funcionan',
      preview: 'En el mundo del marketing digital, las tendencias evolucionan constantemente. Este artículo explora las estrategias más efectivas para 2024...',
      content: 'Contenido completo del artículo...',
      wordCount: 650,
      createdAt: '2024-01-15T10:30:00Z',
      status: 'published',
      tags: ['marketing', 'digital', 'estrategias']
    },
    {
      id: 2,
      type: 'post',
      title: '5 Consejos para Mejorar tu LinkedIn',
      preview: '¿Quieres optimizar tu perfil de LinkedIn? Aquí tienes 5 consejos prácticos que te ayudarán a destacar...',
      content: 'Contenido completo del post...',
      wordCount: 280,
      createdAt: '2024-01-14T15:45:00Z',
      status: 'published',
      tags: ['linkedin', 'optimización', 'perfil']
    },
    {
      id: 3,
      type: 'biography',
      title: 'Biografía Profesional - Juan Pérez',
      preview: 'Experto en marketing digital con más de 8 años de experiencia ayudando a empresas a crecer en el mundo digital...',
      content: 'Contenido completo de la biografía...',
      wordCount: 420,
      createdAt: '2024-01-13T09:15:00Z',
      status: 'published',
      tags: ['biografía', 'profesional', 'marketing']
    },
    {
      id: 4,
      type: 'email',
      title: 'Email de Seguimiento Comercial',
      preview: 'Estimado cliente, agradezco la oportunidad de presentar nuestra propuesta. Adjunto encontrará los detalles...',
      content: 'Contenido completo del email...',
      wordCount: 320,
      createdAt: '2024-01-11T11:30:00Z',
      status: 'sent',
      tags: ['email', 'seguimiento', 'comercial']
    },
    {
      id: 5,
      type: 'presentation',
      title: 'Presentación: Tendencias de Marketing Digital 2024',
      preview: 'Una presentación completa sobre las principales tendencias en marketing digital para 2024...',
      content: 'Contenido completo de la presentación...',
      wordCount: 780,
      createdAt: '2024-01-12T14:20:00Z',
      status: 'draft',
      tags: ['presentación', 'marketing', 'tendencias']
    },
    {
      id: 6,
      type: 'proposal',
      title: 'Propuesta Comercial: Servicios de Marketing Digital',
      preview: 'Propuesta detallada para servicios integrales de marketing digital...',
      content: 'Contenido completo de la propuesta...',
      wordCount: 1200,
      createdAt: '2024-01-10T16:45:00Z',
      status: 'draft',
      tags: ['propuesta', 'comercial', 'marketing digital']
    }
  ])

  // Verificar autenticación
  if (status === 'loading') {
    return (
      <div className="dashboard">
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Cargando...</p>
        </div>
      </div>
    )
  }
  
  if (!session) {
    router.push('/login')
    return null
  }

  const contentTypes = [
    { value: 'all', label: 'Todo el Contenido', icon: '📄' },
    { value: 'article', label: 'Artículos', icon: '📝' },
    { value: 'post', label: 'Posts', icon: '💬' },
    { value: 'biography', label: 'Biografías', icon: '👤' },
    { value: 'email', label: 'Emails', icon: '📧' },
    { value: 'presentation', label: 'Presentaciones', icon: '📊' },
    { value: 'proposal', label: 'Propuestas', icon: '📋' }
  ]

  const getTypeInfo = (type) => {
    const typeMap = {
      article: { label: 'Artículo', icon: '📝', color: '#0077B5' },
      post: { label: 'Post', icon: '💬', color: '#28a745' },
      biography: { label: 'Biografía', icon: '👤', color: '#6f42c1' },
      email: { label: 'Email', icon: '📧', color: '#fd7e14' },
      presentation: { label: 'Presentación', icon: '📊', color: '#20c997' },
      proposal: { label: 'Propuesta', icon: '📋', color: '#dc3545' }
    }
    return typeMap[type] || { label: 'Contenido', icon: '📄', color: '#6c757d' }
  }

  const getStatusInfo = (status) => {
    const statusMap = {
      published: { label: 'Publicado', color: '#28a745', bg: '#d4edda' },
      draft: { label: 'Borrador', color: '#ffc107', bg: '#fff3cd' },
      sent: { label: 'Enviado', color: '#17a2b8', bg: '#d1ecf1' },
      scheduled: { label: 'Programado', color: '#6f42c1', bg: '#e2e3f1' }
    }
    return statusMap[status] || { label: 'Desconocido', color: '#6c757d', bg: '#f8f9fa' }
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

  const handleEdit = (item) => {
    // Redirigir al editor correspondiente según el tipo
    if (item.type === 'article') {
      router.push('/dashboard/editor')
    } else {
      alert(`Editor para ${getTypeInfo(item.type).label} estará disponible próximamente`)
    }
  }

  const handleDelete = (item) => {
    if (confirm(`¿Estás seguro de que quieres eliminar "${item.title}"?`)) {
      setContentItems(prev => prev.filter(content => content.id !== item.id))
    }
  }

  const handleView = (item) => {
    // Redirigir a la página de visualización
    router.push(`/dashboard/view/${item.id}`)
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
            <div className="content-header">
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
                  const statusInfo = getStatusInfo(item.status)
                  return (
                    <div key={item.id} className="content-item">
                      <div className="content-item-header">
                        <div className="content-type">
                          <div className="type-icon" style={{ backgroundColor: typeInfo.color }}>
                            {typeInfo.icon}
                          </div>
                          <span className="type-label">{typeInfo.label}</span>
                        </div>
                        <div className="content-status">
                          <span className="status-badge" style={{ 
                            backgroundColor: statusInfo.bg,
                            color: statusInfo.color
                          }}>
                            {statusInfo.label}
                          </span>
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
                          className="action-btn edit-btn"
                          onClick={() => handleEdit(item)}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 20h9"></path>
                            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                          </svg>
                          Editar
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
                  <p>Parece que aún no has creado ningún contenido. ¡Empieza a usar nuestras herramientas para generar artículos, posts y más!</p>
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
          </div>
        </main>
      </div>
    </div>
  )
}