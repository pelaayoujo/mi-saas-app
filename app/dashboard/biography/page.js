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
    tone: 'profesional',
    length: 'medium',
    includeCallToAction: true,
    callToActionType: 'contact'
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedBio, setGeneratedBio] = useState(null)

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
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
    if (!formData.fullName.trim()) newErrors.fullName = 'El nombre completo es requerido'
    if (!formData.currentRole.trim()) newErrors.currentRole = 'La situación actual es requerida'
    if (!formData.yearsExperience || formData.yearsExperience < 0) newErrors.yearsExperience = 'Los años de experiencia/estudios son requeridos'
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setIsSubmitting(false)
      return
    }

    // Pasar al paso 2 (Generación)
    setIsSubmitting(false)
    setCurrentStep(2)
    setIsGenerating(true)
    
    try {
      // Llamar a la API de OpenAI
      const response = await fetch('/api/ai/generate-biography', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Error generando biografía')
      }

      // Pasar al paso 3 (Resultado) con la biografía generada
      setIsGenerating(false)
      setCurrentStep(3)
      setGeneratedBio({
        biography: data.biography,
        tips: data.tips || [],
        wordCount: data.wordCount,
        charCount: data.charCount
      })
    } catch (error) {
      console.error('Error:', error)
      setIsGenerating(false)
      setCurrentStep(1)
      alert('Error al generar la biografía: ' + error.message)
    }
  }

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text)
      alert('Biografía copiada al portapapeles')
    } catch (error) {
      console.error('Error al copiar:', error)
      alert('Error al copiar al portapapeles')
    }
  }

  const handleNewBio = () => {
    setCurrentStep(1)
    setGeneratedBio(null)
    setFormData({
      fullName: '',
      currentRole: '',
      company: '',
      yearsExperience: '',
      education: '',
      keySkills: '',
      achievements: '',
      specialization: '',
      tone: 'professional',
      length: 'medium',
      includeCallToAction: true,
      callToActionType: 'contact'
    })
    setErrors({})
  }

  if (status === 'loading') {
    return <div className="dashboard">
      <div className="loading">
        <div className="loading-spinner"></div>
        <p>Cargando...</p>
      </div>
    </div>
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
            {currentStep === 1 && (
              <div className="create-container">
                {/* Header del Formulario */}
                <div className="create-header">
                  <div className="create-title">
                    <h1>Configura tu Biografía LinkedIn</h1>
                    <p>Define los aspectos clave de tu perfil profesional para crear una biografía optimizada</p>
                  </div>
                  <div className="create-progress">
                    <div className={`progress-step ${currentStep >= 1 ? 'active' : ''} ${currentStep > 1 ? 'completed' : ''}`}>
                      <div className="step-number">1</div>
                      <div className="step-label">Configuración</div>
                    </div>
                    <div className="progress-line"></div>
                    <div className={`progress-step ${currentStep >= 2 ? 'active' : ''} ${currentStep > 2 ? 'completed' : ''}`}>
                      <div className="step-number">2</div>
                      <div className="step-label">Generación</div>
                    </div>
                    <div className="progress-line"></div>
                    <div className={`progress-step ${currentStep >= 3 ? 'active' : ''}`}>
                      <div className="step-number">3</div>
                      <div className="step-label">Resultado</div>
                    </div>
                  </div>
                </div>

                {/* Formulario */}
                <form onSubmit={handleSubmit} className="create-form">
                  <div className="form-grid">
                    {/* Información Personal */}
                    <div className="form-group">
                      <label htmlFor="fullName" className="form-label">
                        Nombre completo *
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Ej: María García López"
                        className={`form-input ${errors.fullName ? 'error' : ''}`}
                        required
                      />
                      {errors.fullName && <span className="error-message">{errors.fullName}</span>}
                      <p className="form-help">Tu nombre completo para la biografía</p>
                    </div>

                    <div className="form-group">
                      <label htmlFor="currentRole" className="form-label">
                        Rol/Puesto actual o Situación *
                      </label>
                      <input
                        type="text"
                        id="currentRole"
                        name="currentRole"
                        value={formData.currentRole}
                        onChange={handleInputChange}
                        placeholder="Ej: Estudiante de Marketing, Desarrollador Frontend, Emprendedor, Consultor independiente"
                        className={`form-input ${errors.currentRole ? 'error' : ''}`}
                        required
                      />
                      {errors.currentRole && <span className="error-message">{errors.currentRole}</span>}
                      <p className="form-help">Tu situación actual: trabajo, estudios, emprendimiento, etc.</p>
                    </div>

                    <div className="form-group">
                      <label htmlFor="company" className="form-label">
                        Empresa/Institución actual
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        placeholder="Ej: Google España, Universidad Complutense, Freelance, Startup propia"
                        className="form-input"
                      />
                      <p className="form-help">Empresa, universidad, institución o situación laboral (opcional)</p>
                    </div>

                    <div className="form-group">
                      <label htmlFor="yearsExperience" className="form-label">
                        Años de experiencia/Estudios *
                      </label>
                      <input
                        type="number"
                        id="yearsExperience"
                        name="yearsExperience"
                        value={formData.yearsExperience}
                        onChange={handleInputChange}
                        placeholder="Ej: 8 (experiencia) o 3 (años de carrera)"
                        min="0"
                        max="50"
                        className={`form-input ${errors.yearsExperience ? 'error' : ''}`}
                        required
                      />
                      {errors.yearsExperience && <span className="error-message">{errors.yearsExperience}</span>}
                      <p className="form-help">Años de experiencia profesional o años de carrera/estudios</p>
                    </div>

                    <div className="form-group full-width">
                      <label htmlFor="education" className="form-label">
                        Formación académica
                      </label>
                      <textarea
                        id="education"
                        name="education"
                        value={formData.education}
                        onChange={handleInputChange}
                        placeholder="Ej: Estudiante de Grado en Marketing Digital (3º año), MBA en IE Business School, Bootcamp de Desarrollo Web, Certificación en Google Analytics"
                        className="form-textarea"
                        rows="3"
                      />
                      <p className="form-help">Carrera actual, títulos, certificaciones y formación relevante</p>
                    </div>

                    <div className="form-group full-width">
                      <label htmlFor="specialization" className="form-label">
                        Especialización/Sector
                      </label>
                      <input
                        type="text"
                        id="specialization"
                        name="specialization"
                        value={formData.specialization}
                        onChange={handleInputChange}
                        placeholder="Ej: Marketing Digital, E-commerce, SaaS"
                        className="form-input"
                      />
                      <p className="form-help">Tu área de especialización o sector de trabajo</p>
                    </div>

                    <div className="form-group full-width">
                      <label htmlFor="keySkills" className="form-label">
                        Habilidades clave
                      </label>
                      <textarea
                        id="keySkills"
                        name="keySkills"
                        value={formData.keySkills}
                        onChange={handleInputChange}
                        placeholder="Ej: JavaScript, React, Python, Marketing Digital, SEO/SEM, Analítica web, Trabajo en equipo, Comunicación"
                        className="form-textarea"
                        rows="3"
                      />
                      <p className="form-help">Técnicas, blandas o académicas. Separa cada habilidad con comas</p>
                    </div>

                    <div className="form-group full-width">
                      <label htmlFor="achievements" className="form-label">
                        Logros destacados
                      </label>
                      <textarea
                        id="achievements"
                        name="achievements"
                        value={formData.achievements}
                        onChange={handleInputChange}
                        placeholder="Ej: Nota media de 9.2 en la carrera, Proyecto final destacado, Prácticas en empresa líder, Voluntariado internacional, Primer puesto en hackathon, Aumenté ventas en 300%"
                        className="form-textarea"
                        rows="4"
                      />
                      <p className="form-help">Logros académicos, profesionales, proyectos destacados o resultados cuantificables</p>
                    </div>

                    <div className="form-group">
                      <label htmlFor="tone" className="form-label">
                        Tono de la biografía
                      </label>
                      <select
                        id="tone"
                        name="tone"
                        value={formData.tone}
                        onChange={handleInputChange}
                        className="form-select"
                      >
                        <option value="profesional">Profesional</option>
                        <option value="educativo">Educativo</option>
                        <option value="inspiracional">Inspiracional</option>
                        <option value="disruptivo">Disruptivo</option>
                        <option value="conversacional">Conversacional</option>
                      </select>
                      <p className="form-help">Estilo de comunicación</p>
                    </div>

                    <div className="form-group">
                      <label htmlFor="length" className="form-label">
                        Longitud
                      </label>
                      <select
                        id="length"
                        name="length"
                        value={formData.length}
                        onChange={handleInputChange}
                        className="form-select"
                      >
                        <option value="short">Corta (1-2 párrafos)</option>
                        <option value="medium">Media (3-4 párrafos)</option>
                        <option value="long">Larga (5+ párrafos)</option>
                      </select>
                      <p className="form-help">Longitud del texto generado</p>
                    </div>

                    <div className="form-group full-width">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          name="includeCallToAction"
                          checked={formData.includeCallToAction}
                          onChange={handleInputChange}
                          className="checkbox-input"
                        />
                        <span className="checkbox-text">Incluir llamada a la acción</span>
                      </label>
                      <p className="form-help">Añadir invitación a contactar o colaborar</p>
                    </div>

                    {formData.includeCallToAction && (
                      <div className="form-group full-width">
                        <label htmlFor="callToActionType" className="form-label">
                          Tipo de llamada a la acción
                        </label>
                        <select
                          id="callToActionType"
                          name="callToActionType"
                          value={formData.callToActionType}
                          onChange={handleInputChange}
                          className="form-select"
                        >
                          <option value="contact">Invitar a contactar</option>
                          <option value="collaborate">Proponer colaboración</option>
                          <option value="consult">Ofrecer consultoría</option>
                          <option value="network">Ampliar red profesional</option>
                        </select>
                        <p className="form-help">Tipo de invitación a incluir</p>
                      </div>
                    )}
                  </div>

                  <div className="form-actions">
                    <button 
                      type="submit" 
                      className="btn-primary large"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Validando...' : 'Generar Biografía'}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {currentStep === 2 && (
              <div className="generating-container">
                <div className="generating-content">
                  <div className="generating-animation">
                    <div className="spinner"></div>
                  </div>
                  <h2>Generando tu biografía profesional...</h2>
                  <p>Estamos creando una biografía optimizada para LinkedIn basada en tu perfil</p>
                </div>
              </div>
            )}

            {currentStep === 3 && generatedBio && (
              <div className="result-container">
                <div className="result-header">
                  <div className="success-icon">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22,4 12,14.01 9,11.01"></polyline>
                    </svg>
                  </div>
                  <h2>¡Tu biografía está lista!</h2>
                  <p>Copia y pega esta biografía en tu perfil de LinkedIn</p>
                </div>

                <div className="bio-result">
                  <div className="bio-preview">
                    <h3>Vista Previa</h3>
                    <div className="bio-text">
                      {generatedBio.biography}
                    </div>
                    
                    {generatedBio.wordCount && (
                      <div className="bio-stats">
                        <span className="stat-item">
                          <strong>{generatedBio.wordCount}</strong> palabras
                        </span>
                        <span className="stat-item">
                          <strong>{generatedBio.charCount}</strong> caracteres
                        </span>
                      </div>
                    )}
                  </div>

                  {generatedBio.tips && generatedBio.tips.length > 0 && (
                    <div className="bio-tips">
                      <h3>💡 Consejos para optimizar tu perfil</h3>
                      <ul>
                        {generatedBio.tips.map((tip, index) => (
                          <li key={index}>{tip}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="result-actions">
                  <button 
                    className="btn-success"
                    onClick={() => copyToClipboard(generatedBio.biography)}
                  >
                    📋 Copiar Biografía
                  </button>
                  <button 
                    className="btn-secondary"
                    onClick={handleNewBio}
                  >
                    🔄 Crear Nueva Biografía
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
