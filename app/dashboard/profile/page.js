"use client"
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import UserDropdown from '../../components/UserDropdown'
import '../dashboard.css'

export default function Profile() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('personal')

  // Estado del formulario
  const [formData, setFormData] = useState({
    name: session?.user?.name || '',
    email: session?.user?.email || '',
    bio: '',
    company: '',
    position: '',
    location: '',
    website: '',
    phone: '',
    timezone: 'Europe/Madrid',
    language: 'es',
    notifications: {
      email: true,
      push: false,
      marketing: false
    }
  })

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

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.')
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === 'checkbox' ? checked : value
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      // Aquí iría la lógica para actualizar el perfil
      console.log('Updating profile:', formData)
      
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      alert('Perfil actualizado exitosamente')
    } catch (error) {
      console.error('Error updating profile:', error)
      alert('Error al actualizar el perfil')
    } finally {
      setIsLoading(false)
    }
  }

  const tabs = [
    { id: 'personal', label: 'Información Personal', icon: '👤' },
    { id: 'preferences', label: 'Preferencias', icon: '⚙️' }
  ]

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
              <h1>Mi Perfil</h1>
            </div>
          </div>

          <div className="header-right">
            <UserDropdown />
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
            <div className="profile-container">
              {/* Header del Perfil */}
              <div className="profile-header">
                <div className="profile-avatar">
                  <div className="avatar-large">
                    {session.user.name?.charAt(0) || 'U'}
                  </div>
                  <button className="avatar-change-btn">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 21h18"></path>
                      <path d="M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16"></path>
                      <path d="M10 8h4"></path>
                      <path d="M10 12h4"></path>
                      <path d="M10 16h4"></path>
                    </svg>
                    Cambiar foto
                  </button>
                </div>
                <div className="profile-info">
                  <h1>{session.user.name || 'Usuario'}</h1>
                  <p>{session.user.email}</p>
                  <div className="profile-stats">
                    <div className="stat-item">
                      <span className="stat-number">12</span>
                      <span className="stat-label">Artículos creados</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-number">5</span>
                      <span className="stat-label">Días como miembro</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tabs de Navegación */}
              <div className="profile-tabs">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    className={`profile-tab ${activeTab === tab.id ? 'active' : ''}`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <span className="tab-icon">{tab.icon}</span>
                    <span className="tab-label">{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* Contenido de las Tabs */}
              <div className="profile-content">
                <form onSubmit={handleSubmit}>
                  {activeTab === 'personal' && (
                    <div className="profile-section">
                      <h2>Información Personal y Profesional</h2>
                      <div className="form-grid">
                        <div className="form-group">
                          <label htmlFor="name" className="form-label">Nombre completo *</label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="form-input"
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="email" className="form-label">Email *</label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="form-input"
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="company" className="form-label">Empresa</label>
                          <input
                            type="text"
                            id="company"
                            name="company"
                            value={formData.company}
                            onChange={handleInputChange}
                            className="form-input"
                            placeholder="Nombre de tu empresa"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="position" className="form-label">Cargo/Posición</label>
                          <input
                            type="text"
                            id="position"
                            name="position"
                            value={formData.position}
                            onChange={handleInputChange}
                            className="form-input"
                            placeholder="Tu cargo actual"
                          />
                        </div>
                        <div className="form-group full-width">
                          <label htmlFor="bio" className="form-label">Biografía</label>
                          <textarea
                            id="bio"
                            name="bio"
                            value={formData.bio}
                            onChange={handleInputChange}
                            className="form-textarea"
                            rows="4"
                            placeholder="Cuéntanos un poco sobre ti..."
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="location" className="form-label">Ubicación</label>
                          <input
                            type="text"
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            className="form-input"
                            placeholder="Ciudad, País"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="phone" className="form-label">Teléfono</label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="form-input"
                            placeholder="+34 123 456 789"
                          />
                        </div>
                        <div className="form-group full-width">
                          <label htmlFor="website" className="form-label">Sitio web</label>
                          <input
                            type="url"
                            id="website"
                            name="website"
                            value={formData.website}
                            onChange={handleInputChange}
                            className="form-input"
                            placeholder="https://tu-sitio-web.com"
                          />
                        </div>
                      </div>
                    </div>
                  )}


                  {activeTab === 'preferences' && (
                    <div className="profile-section">
                      <h2>Preferencias</h2>
                      <div className="form-grid">
                        <div className="form-group">
                          <label htmlFor="timezone" className="form-label">Zona horaria</label>
                          <select
                            id="timezone"
                            name="timezone"
                            value={formData.timezone}
                            onChange={handleInputChange}
                            className="form-select"
                          >
                            <option value="Europe/Madrid">Europa/Madrid</option>
                            <option value="Europe/London">Europa/Londres</option>
                            <option value="America/New_York">América/Nueva York</option>
                            <option value="America/Los_Angeles">América/Los Ángeles</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label htmlFor="language" className="form-label">Idioma</label>
                          <select
                            id="language"
                            name="language"
                            value={formData.language}
                            onChange={handleInputChange}
                            className="form-select"
                          >
                            <option value="es">Español</option>
                            <option value="en">English</option>
                            <option value="fr">Français</option>
                          </select>
                        </div>
                        <div className="form-group full-width">
                          <label className="form-label">Notificaciones</label>
                          <div className="checkbox-group">
                            <label className="checkbox-label">
                              <input
                                type="checkbox"
                                name="notifications.email"
                                checked={formData.notifications.email}
                                onChange={handleInputChange}
                                className="checkbox-input"
                              />
                              <span className="checkbox-text">Recibir notificaciones por email</span>
                            </label>
                            <label className="checkbox-label">
                              <input
                                type="checkbox"
                                name="notifications.push"
                                checked={formData.notifications.push}
                                onChange={handleInputChange}
                                className="checkbox-input"
                              />
                              <span className="checkbox-text">Notificaciones push en el navegador</span>
                            </label>
                            <label className="checkbox-label">
                              <input
                                type="checkbox"
                                name="notifications.marketing"
                                checked={formData.notifications.marketing}
                                onChange={handleInputChange}
                                className="checkbox-input"
                              />
                              <span className="checkbox-text">Recibir ofertas y actualizaciones de productos</span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Botones de Acción */}
                  <div className="profile-actions">
                    <button 
                      type="submit" 
                      className="btn-primary"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Guardando...' : 'Guardar Cambios'}
                    </button>
                    <button 
                      type="button" 
                      className="btn-secondary"
                      onClick={() => setFormData({
                        name: session?.user?.name || '',
                        email: session?.user?.email || '',
                        bio: '',
                        company: '',
                        position: '',
                        location: '',
                        website: '',
                        phone: '',
                        timezone: 'Europe/Madrid',
                        language: 'es',
                        notifications: {
                          email: true,
                          push: false,
                          marketing: false
                        }
                      })}
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
