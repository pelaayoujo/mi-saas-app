"use client"
import { useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import '../dashboard.css'

export default function Biography() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  
  const [formData, setFormData] = useState({
    fullName: '',
    currentRole: '',
    company: '',
    yearsExperience: '',
    education: '',
    keySkills: '',
    achievements: '',
    specialization: '',
    tone: 'professional',
    length: 'medium'
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Funcionalidad de generación próximamente disponible')
  }

  if (status === 'loading') {
    return <div className="loading">Cargando...</div>
  }

  if (!session) {
    router.push('/login')
    return null
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
              <h1>Generador de Biografía</h1>
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
              
              <a href="/dashboard/tools" className="nav-item">
                <svg className="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
                </svg>
                <span className="nav-label">Herramientas</span>
              </a>
            </div>

            {/* Herramientas */}
            <div className="nav-section">
              <div className="nav-section-title">Herramientas</div>
              
              <a href="/dashboard/create" className="nav-item">
                <svg className="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 20h9"></path>
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                </svg>
                <span className="nav-label">Crear Artículo</span>
              </a>

              <a href="/dashboard/biography" className="nav-item active">
                <svg className="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <span className="nav-label">Biografía LinkedIn</span>
              </a>

              <a href="/dashboard/content" className="nav-item">
                <svg className="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                  <polyline points="13 2 13 9 20 9"></polyline>
                </svg>
                <span className="nav-label">Mi Contenido</span>
              </a>
            </div>

            {/* Configuración */}
            <div className="nav-section">
              <div className="nav-section-title">Configuración</div>
              
              <button 
                className="nav-item"
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
          <div className="page-header">
            <h1>Generador de Biografía LinkedIn</h1>
            <p>Crea una biografía profesional optimizada para tu perfil de LinkedIn</p>
          </div>

          <div className="bio-form-container">
            <form onSubmit={handleSubmit} className="bio-form">
              <div className="form-section">
                <h3>📋 Información Personal</h3>
                
                <div className="form-group">
                  <label htmlFor="fullName">Nombre completo *</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Ej: María García López"
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="currentRole">Rol/Puesto actual *</label>
                    <input
                      type="text"
                      id="currentRole"
                      name="currentRole"
                      value={formData.currentRole}
                      onChange={handleInputChange}
                      placeholder="Ej: Directora de Marketing Digital"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="company">Empresa actual</label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="Ej: Google España"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="yearsExperience">Años de experiencia *</label>
                  <input
                    type="number"
                    id="yearsExperience"
                    name="yearsExperience"
                    value={formData.yearsExperience}
                    onChange={handleInputChange}
                    placeholder="Ej: 8"
                    min="0"
                    max="50"
                    required
                  />
                </div>
              </div>

              <div className="form-section">
                <h3>🎓 Formación y Especialización</h3>
                
                <div className="form-group">
                  <label htmlFor="education">Formación académica</label>
                  <textarea
                    id="education"
                    name="education"
                    value={formData.education}
                    onChange={handleInputChange}
                    placeholder="Ej: MBA en IE Business School, Licenciatura en Administración de Empresas por la Universidad Complutense"
                    rows="3"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="specialization">Especialización/Sector</label>
                  <input
                    type="text"
                    id="specialization"
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleInputChange}
                    placeholder="Ej: Marketing Digital, E-commerce, SaaS"
                  />
                </div>
              </div>

              <div className="form-section">
                <h3>🏆 Experiencia y Logros</h3>
                
                <div className="form-group">
                  <label htmlFor="keySkills">Habilidades clave (separadas por comas)</label>
                  <textarea
                    id="keySkills"
                    name="keySkills"
                    value={formData.keySkills}
                    onChange={handleInputChange}
                    placeholder="Ej: Estrategia digital, SEO/SEM, Analítica web, Growth hacking, Gestión de equipos"
                    rows="3"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="achievements">Logros destacados</label>
                  <textarea
                    id="achievements"
                    name="achievements"
                    value={formData.achievements}
                    onChange={handleInputChange}
                    placeholder="Ej: Aumenté las ventas online en un 300% en 2 años, Lideré equipo de 15 personas, Implementé estrategia que generó 5M€ en ingresos"
                    rows="4"
                  />
                </div>
              </div>

              <div className="form-section">
                <h3>🎨 Estilo y Formato</h3>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="tone">Tono de la biografía</label>
                    <select
                      id="tone"
                      name="tone"
                      value={formData.tone}
                      onChange={handleInputChange}
                    >
                      <option value="professional">Profesional</option>
                      <option value="friendly">Cercano</option>
                      <option value="inspirational">Inspirador</option>
                      <option value="authoritative">Autoritativo</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="length">Longitud</label>
                    <select
                      id="length"
                      name="length"
                      value={formData.length}
                      onChange={handleInputChange}
                    >
                      <option value="short">Corta (1-2 párrafos)</option>
                      <option value="medium">Media (3-4 párrafos)</option>
                      <option value="long">Larga (5+ párrafos)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="form-actions">
                <button 
                  type="submit" 
                  className="btn-primary large"
                >
                  🚀 Generar Biografía
                </button>
              </div>
            </form>
          </div>
          </div>
        </main>
      </div>
    </div>
  )
}
