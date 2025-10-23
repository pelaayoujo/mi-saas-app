"use client"
import { useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import '../dashboard.css'

// Force deployment - Latest commit: 72019a5

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
    resultsCount: 1
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentStep, setCurrentStep] = useState(1) // 1: Configuración, 2: Generación, 3: Revisión
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedArticles, setGeneratedArticles] = useState([])


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

    // Pasar al paso 2 (Generación)
    setIsSubmitting(false)
    setCurrentStep(2)
    setIsGenerating(true)
    
    try {
      console.log('Enviando datos:', formData)
      
      // Llamar a la API de OpenAI
      const response = await fetch('/api/ai/generate-article', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      console.log('Respuesta del servidor:', {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok
      })

      let data
      try {
        data = await response.json()
        console.log('Datos de respuesta:', data)
      } catch (jsonError) {
        console.error('Error parseando JSON:', jsonError)
        throw new Error('Error en la respuesta del servidor')
      }

      if (!response.ok) {
        console.error('Error del servidor:', data)
        throw new Error(data.error || data.details || `Error del servidor: ${response.status}`)
      }

      // Validar que tenemos artículos
      if (!data.articles || !Array.isArray(data.articles)) {
        console.error('Formato de respuesta inválido:', data)
        throw new Error('Formato de respuesta inválido del servidor')
      }

      // Log información del fine-tune para debugging
      console.log('🤖 INFORMACIÓN DEL FINE-TUNE:')
      console.log('- Método de generación:', data.generationMethod)
      console.log('- Fine-tune configurado:', data.finetunedModelConfigured)
      console.log('- Nombre del modelo fine-tune:', data.finetunedModelName)
      console.log('- Tokens usados:', data.tokensUsed)

      // Pasar al paso 3 (Revisión) con los artículos generados
      setIsGenerating(false)
      setCurrentStep(3)
      
      // Agregar IDs temporales a los artículos para evitar duplicados
      const articlesWithTempIds = data.articles.map((article, index) => ({
        ...article,
        id: `temp-${Date.now()}-${index}` // ID temporal único
      }))
      
      setGeneratedArticles(articlesWithTempIds)
      
    } catch (error) {
      console.error('Error completo:', error)
      console.error('Stack trace:', error.stack)
      setIsGenerating(false)
      setCurrentStep(1) // Volver al formulario
      
      // Mostrar error más detallado al usuario
      const errorMessage = error.message || 'Error desconocido'
      alert(`Error generando artículo: ${errorMessage}`)
    }
  }

  const toneOptions = [
    { value: 'profesional', label: 'Profesional', description: 'Formal y autoritativo' },
    { value: 'educativo', label: 'Educativo', description: 'Informativo y didáctico' },
    { value: 'inspiracional', label: 'Inspiracional', description: 'Motivador y positivo' },
    { value: 'disruptivo', label: 'Disruptivo', description: 'Polémico y directo' },
    { value: 'conversacional', label: 'Conversacional', description: 'Cercano y amigable' }
  ]

  const lengthOptions = [
    { value: 'corto', label: 'Corto (hasta 200 palabras)', description: 'Post conciso y directo' },
    { value: 'medio', label: 'Medio (hasta 350 palabras)', description: 'Artículo equilibrado' },
    { value: 'largo', label: 'Largo (hasta 500 palabras)', description: 'Análisis detallado' }
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
                <div className={`progress-step ${currentStep >= 1 ? 'active' : ''} ${currentStep > 1 ? 'completed' : ''}`}>
                  <div className="step-number">1</div>
                  <div className="step-label">Configuración</div>
                </div>
                <div className={`progress-step ${currentStep >= 2 ? 'active' : ''} ${currentStep > 2 ? 'completed' : ''}`}>
                  <div className="step-number">2</div>
                  <div className="step-label">Generación</div>
                </div>
                <div className={`progress-step ${currentStep >= 3 ? 'active' : ''}`}>
                  <div className="step-number">3</div>
                  <div className="step-label">Revisión</div>
                </div>
              </div>
            </div>

            {/* Contenido según el paso actual */}
            {currentStep === 1 && (
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

                {/* Cantidad de Resultados */}
                <div className="form-group full-width">
                  <label className="form-label">
                    Cantidad de Resultados a Generar
                  </label>
                  <div className="slider-container">
                    <div className="slider-labels">
                      <span className="slider-label">1</span>
                      <span className="slider-label">2</span>
                      <span className="slider-label">3</span>
                    </div>
                    <div className="slider-wrapper">
                      <input
                        type="range"
                        min="1"
                        max="3"
                        step="1"
                        value={formData.resultsCount}
                        onChange={(e) => setFormData(prev => ({ ...prev, resultsCount: parseInt(e.target.value) }))}
                        className="slider"
                      />
                      <div className="slider-track">
                        <div 
                          className="slider-fill" 
                          style={{ width: `${((formData.resultsCount - 1) / 2) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="slider-value">
                      <span className="slider-number">{formData.resultsCount}</span>
                      <span className="slider-text">
                        {formData.resultsCount === 1 ? 'resultado' : 'resultados'}
                      </span>
                    </div>
                  </div>
                  <p className="form-help">Selecciona cuántas versiones diferentes del artículo quieres generar</p>
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
            )}

            {/* Paso 2: Pantalla de Generación */}
            {currentStep === 2 && (
              <div className="generation-screen">
                <div className="generation-content">
                  <div className="generation-spinner">
                    <div className="spinner-circle"></div>
                  </div>
                  <h2>Generando {formData.resultsCount === 1 ? 'Artículo' : 'Artículos'}</h2>
                  <p>Nuestra IA está creando {formData.resultsCount === 1 ? 'tu artículo' : `tus ${formData.resultsCount} artículos`} personalizado{formData.resultsCount > 1 ? 's' : ''}...</p>
                  <div className="generation-details">
                    <div className="detail-item">
                      <span className="detail-label">Tema:</span>
                      <span className="detail-value">{formData.topic}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Enfoque:</span>
                      <span className="detail-value">{formData.professionalFocus}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Tono:</span>
                      <span className="detail-value">{toneOptions.find(t => t.value === formData.tone)?.label}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Extensión:</span>
                      <span className="detail-value">{lengthOptions.find(l => l.value === formData.length)?.label}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Paso 3: Pantalla de Revisión */}
            {currentStep === 3 && (
              <div className="review-screen">
                <div className="review-header">
                  <div className="success-icon">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22,4 12,14.01 9,11.01"></polyline>
                    </svg>
                  </div>
                  <h2>¡Artículo Generado Exitosamente!</h2>
                  <p>Tu contenido está listo. Revisa, edita o copia directamente para LinkedIn</p>
                </div>
                
                <div className="articles-list">
                  {generatedArticles.map((article, index) => (
                    <div key={article.id} className="article-card modern">
                      <div className="article-card-header">
                        <div className="article-status">
                          <div className="article-stats">
                            <span className="word-count">{article.wordCount}</span>
                            <span className="word-label">palabras</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="article-preview">
                        <div className="linkedin-mockup">
                          <div className="linkedin-header">
                            <div className="linkedin-avatar"></div>
                            <div className="linkedin-user">
                              <div className="user-name">Tu Perfil</div>
                              <div className="user-title">Tu cargo profesional</div>
                            </div>
                          </div>
                          <div className="linkedin-content">
                            <div 
                              dangerouslySetInnerHTML={{ 
                                __html: article.content
                                  .replace(/\n/g, '<br>')
                                  .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                  .replace(/#([a-zA-Z0-9_]+)/g, '<span style="color: #0077B5; font-weight: 500;">#$1</span>')
                              }}
                              style={{ 
                                fontFamily: 'inherit',
                                lineHeight: '1.6',
                                fontSize: '14px',
                                whiteSpace: 'pre-wrap',
                                wordWrap: 'break-word',
                                overflowWrap: 'break-word'
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="article-actions modern">
                        <button 
                          className="btn-primary"
                          onClick={async () => {
                            try {
                              // Guardar artículo en la base de datos
                              const response = await fetch('/api/articles', {
                                method: 'POST',
                                headers: {
                                  'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                  title: article.title,
                                  body: article.content,
                                  template: 'ai-generated',
                                  tone: formData.tone,
                                  length: formData.length,
                                  targetAudience: formData.professionalFocus,
                                  keywords: [formData.topic],
                                  tags: [],
                                  wordCount: article.wordCount
                                })
                              })

                              if (response.ok) {
                                const result = await response.json()
                                console.log('Artículo guardado exitosamente:', result)
                                // Artículo guardado exitosamente - redirigiendo...
                                // Redirigir a la página de contenido
                                router.push('/dashboard/content')
                              } else {
                                const error = await response.json()
                                console.error('Error al guardar artículo:', error)
                                alert('❌ Error al guardar: ' + (error.message || 'Error desconocido'))
                              }
                            } catch (error) {
                              console.error('Error guardando artículo:', error)
                              alert('❌ Error al guardar el artículo')
                            }
                          }}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                            <polyline points="17,21 17,13 7,13 7,21"></polyline>
                            <polyline points="7,3 7,8 15,8"></polyline>
                          </svg>
                          Guardar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="review-actions">
                  <button 
                    className="btn-secondary"
                    onClick={() => setCurrentStep(1)}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M19 12H5"></path>
                      <path d="M12 19l-7-7 7-7"></path>
                    </svg>
                    Volver a Configurar
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
