"use client"
import { useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import '../dashboard.css'

export default function CreateArticle() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [formData, setFormData] = useState({
    professionalFocus: '',
    tone: 'profesional',
    topic: '',
    length: 'medio',
    aspects: '',
    targetAudience: '',
    objective: 'engagement'
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

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

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Limpiar error cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Validación básica
    const newErrors = {}
    if (!formData.professionalFocus.trim()) newErrors.professionalFocus = 'El enfoque profesional es requerido'
    if (!formData.topic.trim()) newErrors.topic = 'El tema es requerido'
    if (!formData.aspects.trim()) newErrors.aspects = 'Los aspectos a tocar son requeridos'
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setIsSubmitting(false)
      return
    }

    // Aquí iría la lógica para procesar el formulario
    // Por ahora solo simulamos el envío
    setTimeout(() => {
      console.log('Datos del artículo:', formData)
      setIsSubmitting(false)
      // Redirigir al editor o mostrar mensaje de éxito
      alert('Configuración guardada. Próximamente se abrirá el editor.')
    }, 1000)
  }

  const toneOptions = [
    { value: 'profesional', label: 'Profesional', description: 'Formal y autoritativo' },
    { value: 'casual', label: 'Casual', description: 'Relajado y accesible' },
    { value: 'inspiracional', label: 'Inspiracional', description: 'Motivador y positivo' },
    { value: 'educativo', label: 'Educativo', description: 'Informativo y didáctico' },
    { value: 'conversacional', label: 'Conversacional', description: 'Cercano y amigable' }
  ]

  const lengthOptions = [
    { value: 'corto', label: 'Corto (300-500 palabras)', description: 'Ideal para posts rápidos' },
    { value: 'medio', label: 'Medio (500-800 palabras)', description: 'Artículo estándar' },
    { value: 'largo', label: 'Largo (800-1200 palabras)', description: 'Análisis profundo' },
    { value: 'muy-largo', label: 'Muy largo (1200+ palabras)', description: 'Artículo completo' }
  ]

  const objectiveOptions = [
    { value: 'engagement', label: 'Generar Interacción', description: 'Likes, comentarios y shares' },
    { value: 'discussion', label: 'Intercambio de Opiniones', description: 'Debate y conversación' },
    { value: 'followers', label: 'Ganar Seguidores', description: 'Crecimiento de audiencia' },
    { value: 'authority', label: 'Posicionar Autoridad', description: 'Establecer expertise' },
    { value: 'leads', label: 'Generar Leads', description: 'Conversiones y contactos' },
    { value: 'awareness', label: 'Crear Conciencia', description: 'Difundir mensaje o causa' }
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
              <h1>Crear Artículo</h1>
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
              
              <a href="/dashboard/articles" className="nav-item">
                <svg className="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14,2 14,8 20,8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10,9 9,9 8,9"></polyline>
                </svg>
                <span className="nav-label">Artículos Recientes</span>
              </a>
              
              <a href="/dashboard/create" className="nav-item active">
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
          <div className="create-container">
            {/* Header del Formulario */}
            <div className="create-header">
              <div className="create-title">
                <h1>Configura tu Artículo</h1>
                <p>Define los aspectos clave de tu artículo para crear contenido optimizado para LinkedIn</p>
              </div>
              <div className="create-progress">
                <div className="progress-step active">
                  <div className="step-number">1</div>
                  <div className="step-label">Configuración</div>
                </div>
                <div className="progress-step">
                  <div className="step-number">2</div>
                  <div className="step-label">Escritura</div>
                </div>
                <div className="progress-step">
                  <div className="step-number">3</div>
                  <div className="step-label">Revisión</div>
                </div>
              </div>
            </div>

            {/* Formulario */}
            <form onSubmit={handleSubmit} className="create-form">
              <div className="form-grid">
                {/* Enfoque Profesional */}
                <div className="form-group">
                  <label htmlFor="professionalFocus" className="form-label">
                    Enfoque Profesional *
                  </label>
                  <input
                    type="text"
                    id="professionalFocus"
                    name="professionalFocus"
                    value={formData.professionalFocus}
                    onChange={handleInputChange}
                    placeholder="Ej: Marketing Digital, Desarrollo de Software, Liderazgo, Emprendimiento..."
                    className={`form-input ${errors.professionalFocus ? 'error' : ''}`}
                  />
                  {errors.professionalFocus && <span className="error-message">{errors.professionalFocus}</span>}
                  <p className="form-help">Área específica desde la que abordarás el tema</p>
                </div>

                {/* Tema */}
                <div className="form-group">
                  <label htmlFor="topic" className="form-label">
                    Tema del Artículo *
                  </label>
                  <input
                    type="text"
                    id="topic"
                    name="topic"
                    value={formData.topic}
                    onChange={handleInputChange}
                    placeholder="Ej: Tendencias de marketing digital 2024, Cómo liderar equipos remotos..."
                    className={`form-input ${errors.topic ? 'error' : ''}`}
                  />
                  {errors.topic && <span className="error-message">{errors.topic}</span>}
                  <p className="form-help">El tema principal sobre el que escribirás</p>
                </div>

                {/* Tono */}
                <div className="form-group">
                  <label className="form-label">Tono del Artículo *</label>
                  <div className="radio-group radio-group-compact">
                    {toneOptions.map((option) => (
                      <label key={option.value} className="radio-option radio-option-compact">
                        <input
                          type="radio"
                          name="tone"
                          value={option.value}
                          checked={formData.tone === option.value}
                          onChange={handleInputChange}
                          className="radio-input"
                        />
                        <div className="radio-content">
                          <div className="radio-label">{option.label}</div>
                          <div className="radio-description">{option.description}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Extensión */}
                <div className="form-group">
                  <label className="form-label">Extensión Aproximada *</label>
                  <div className="radio-group radio-group-compact">
                    {lengthOptions.map((option) => (
                      <label key={option.value} className="radio-option radio-option-compact">
                        <input
                          type="radio"
                          name="length"
                          value={option.value}
                          checked={formData.length === option.value}
                          onChange={handleInputChange}
                          className="radio-input"
                        />
                        <div className="radio-content">
                          <div className="radio-label">{option.label}</div>
                          <div className="radio-description">{option.description}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Objetivo del Artículo */}
                <div className="form-group">
                  <label className="form-label">Objetivo del Artículo *</label>
                  <div className="radio-group radio-group-compact">
                    {objectiveOptions.map((option) => (
                      <label key={option.value} className="radio-option radio-option-compact">
                        <input
                          type="radio"
                          name="objective"
                          value={option.value}
                          checked={formData.objective === option.value}
                          onChange={handleInputChange}
                          className="radio-input"
                        />
                        <div className="radio-content">
                          <div className="radio-label">{option.label}</div>
                          <div className="radio-description">{option.description}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Audiencia Objetivo */}
                <div className="form-group">
                  <label htmlFor="targetAudience" className="form-label">
                    Audiencia Objetivo (Opcional)
                  </label>
                  <input
                    type="text"
                    id="targetAudience"
                    name="targetAudience"
                    value={formData.targetAudience}
                    onChange={handleInputChange}
                    placeholder="Ej: Profesionales de marketing, Desarrolladores, Emprendedores..."
                    className="form-input"
                  />
                  <p className="form-help">A quién va dirigido tu artículo (opcional)</p>
                </div>

                {/* Aspectos a Tocar */}
                <div className="form-group full-width">
                  <label htmlFor="aspects" className="form-label">
                    Aspectos Clave a Desarrollar *
                  </label>
                  <textarea
                    id="aspects"
                    name="aspects"
                    value={formData.aspects}
                    onChange={handleInputChange}
                    placeholder="Describe los puntos principales que quieres cubrir en tu artículo. Ej: 1) Importancia del tema, 2) Estrategias prácticas, 3) Casos de éxito, 4) Conclusiones..."
                    className={`form-textarea ${errors.aspects ? 'error' : ''}`}
                    rows="4"
                  />
                  {errors.aspects && <span className="error-message">{errors.aspects}</span>}
                  <p className="form-help">Lista los puntos principales que quieres desarrollar en tu artículo</p>
                </div>
              </div>

              {/* Botones de Acción */}
              <div className="form-actions">
                <button 
                  type="button" 
                  className="btn-secondary"
                  onClick={() => router.back()}
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="btn-spinner"></div>
                      Configurando...
                    </>
                  ) : (
                    <>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 20h9"></path>
                        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                      </svg>
                      Continuar al Editor
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  )
}
