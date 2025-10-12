"use client"
import { useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import '../dashboard.css'

export default function Tools() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)

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

  const tools = [
    {
      id: 'articles',
      title: 'Generador de Artículos',
      description: 'Crea artículos profesionales optimizados para LinkedIn con IA',
      icon: '📝',
      features: [
        'Múltiples tonos de escritura',
        'Optimización para engagement',
        'Estructura profesional',
        'Editor integrado'
      ],
      status: 'available',
      path: '/dashboard/create'
    },
    {
      id: 'biography',
      title: 'Biografías para LinkedIn',
      description: 'Genera biografías profesionales y atractivas para tu perfil',
      icon: '👤',
      features: [
        'Perfil profesional',
        'Resumen ejecutivo',
        'Logros destacados',
        'Llamada a la acción'
      ],
      status: 'available',
      path: '/dashboard/biography'
    },
    {
      id: 'cv-optimizer',
      title: 'Optimizador de Currículum',
      description: 'Optimiza tu CV para destacar en LinkedIn y procesos de selección',
      icon: '📄',
      features: [
        'Análisis de palabras clave',
        'Optimización ATS',
        'Formato profesional',
        'Consejos personalizados'
      ],
      status: 'coming-soon',
      path: null
    },
    {
      id: 'linkedin-messages',
      title: 'Mensajes de LinkedIn',
      description: 'Crea mensajes efectivos para networking en LinkedIn',
      icon: '💬',
      features: [
        'Mensajes de conexión',
        'Follow-ups profesionales',
        'Tono personalizado',
        'Templates optimizados'
      ],
      status: 'coming-soon',
      path: null
    },
    {
      id: 'proposals',
      title: 'Propuestas Comerciales',
      description: 'Genera propuestas convincentes para clientes y proyectos',
      icon: '📋',
      features: [
        'Estructura profesional',
        'Casos de estudio',
        'Pricing estratégico',
        'Seguimiento de propuestas'
      ],
      status: 'coming-soon',
      path: null
    }
  ]

  const handleToolClick = (tool) => {
    if (tool.status === 'available' && tool.path) {
      router.push(tool.path)
    } else {
      // Mostrar modal o mensaje de "próximamente"
      alert(`${tool.title} estará disponible próximamente. ¡Mantente atento a las actualizaciones!`)
    }
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
            <div className="page-title">
              <h1>Herramientas</h1>
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
              <a href="/dashboard" className="nav-item">
                <svg className="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9,22 9,12 15,12 15,22"></polyline>
                </svg>
                <span className="nav-label">Inicio</span>
              </a>
              
              <a href="/dashboard/tools" className="nav-item active">
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
          <div className="tools-container">
            {/* Header de Herramientas */}
            <div className="tools-header">
              <div className="tools-title">
                <h1>Herramientas de Contenido</h1>
                <p>Selecciona la herramienta que mejor se adapte a tus necesidades de contenido profesional</p>
              </div>
            </div>

            {/* Grid de Herramientas */}
            <div className="tools-grid">
              {tools.map((tool) => (
                <div 
                  key={tool.id}
                  className={`tool-card ${tool.status}`}
                  onClick={() => handleToolClick(tool)}
                >
                  <div className="tool-header">
                    <div className="tool-icon">{tool.icon}</div>
                    <div className="tool-status">
                      {tool.status === 'available' ? (
                        <span className="status-badge available">Disponible</span>
                      ) : (
                        <span className="status-badge coming-soon">Próximamente</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="tool-content">
                    <h3 className="tool-title">{tool.title}</h3>
                    <p className="tool-description">{tool.description}</p>
                    
                    <div className="tool-features">
                      <h4>Características:</h4>
                      <ul>
                        {tool.features.map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="tool-footer">
                    {tool.status === 'available' ? (
                      <button className="tool-btn available">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 12h14"></path>
                          <path d="M12 5l7 7-7 7"></path>
                        </svg>
                        Usar Herramienta
                      </button>
                    ) : (
                      <button className="tool-btn coming-soon" disabled>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10"></circle>
                          <polyline points="12,6 12,12 16,14"></polyline>
                        </svg>
                        Próximamente
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Información Adicional */}
            <div className="tools-info">
              <div className="info-card">
                <h3>¿Necesitas ayuda?</h3>
                <p>Nuestras herramientas están diseñadas para ayudarte a crear contenido profesional de alta calidad. Cada herramienta incluye guías paso a paso y ejemplos para maximizar tu éxito.</p>
                <div className="info-features">
                  <div className="info-feature">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 12l2 2 4-4"></path>
                      <circle cx="12" cy="12" r="10"></circle>
                    </svg>
                    <span>Optimizado para LinkedIn</span>
                  </div>
                  <div className="info-feature">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
                    </svg>
                    <span>Generación con IA</span>
                  </div>
                  <div className="info-feature">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                    <span>Contenido de calidad</span>
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
