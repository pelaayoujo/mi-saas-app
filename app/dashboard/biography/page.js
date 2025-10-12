"use client"
import { useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import '../dashboard.css'

export default function Biography() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedBio, setGeneratedBio] = useState(null)
  
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
    length: 'medium',
    includeCallToAction: true,
    callToActionType: 'contact'
  })

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validaciones
    if (!formData.fullName || !formData.currentRole || !formData.yearsExperience) {
      alert('Por favor completa los campos obligatorios: Nombre, Rol actual y Años de experiencia')
      return
    }

    setIsGenerating(true)

    try {
      const response = await fetch('/api/ai/generate-biography', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setGeneratedBio(data.biography)
      } else {
        alert('Error al generar la biografía: ' + (data.message || 'Error desconocido'))
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error al generar la biografía. Por favor, intenta de nuevo.')
    } finally {
      setIsGenerating(false)
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
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-header">
          <h2 className="sidebar-logo">LinkedAI</h2>
          <button 
            className="sidebar-close"
            onClick={() => setSidebarOpen(false)}
          >
            ✕
          </button>
        </div>
        
        <nav className="sidebar-nav">
          <button 
            className="nav-item"
            onClick={() => router.push('/dashboard')}
          >
            <svg className="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            </svg>
            <span className="nav-label">Dashboard</span>
          </button>

          <button 
            className="nav-item"
            onClick={() => router.push('/dashboard/create')}
          >
            <svg className="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 20h9"></path>
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
            </svg>
            <span className="nav-label">Crear Artículo</span>
          </button>

          <button 
            className="nav-item active"
            onClick={() => router.push('/dashboard/biography')}
          >
            <svg className="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <span className="nav-label">Biografía LinkedIn</span>
          </button>

          <button 
            className="nav-item"
            onClick={() => router.push('/dashboard/content')}
          >
            <svg className="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
              <polyline points="13 2 13 9 20 9"></polyline>
            </svg>
            <span className="nav-label">Mi Contenido</span>
          </button>

          <button 
            className="nav-item"
            onClick={() => router.push('/dashboard/tools')}
          >
            <svg className="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
            </svg>
            <span className="nav-label">Herramientas</span>
          </button>

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
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <button 
          className="sidebar-toggle mobile"
          onClick={() => setSidebarOpen(true)}
        >
          ☰
        </button>

        <div className="content-container">
          <div className="page-header">
            <h1>Generador de Biografía LinkedIn</h1>
            <p>Crea una biografía profesional optimizada para tu perfil de LinkedIn</p>
          </div>

          {!generatedBio ? (
            <div className="bio-form-container">
              <form onSubmit={handleSubmit} className="bio-form">
                <div className="form-section">
                  <h3>Información Personal</h3>
                  
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
                  <h3>Formación y Especialización</h3>
                  
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
                  <h3>Experiencia y Logros</h3>
                  
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
                  <h3>Estilo y Formato</h3>
                  
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

                  <div className="form-group checkbox-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        name="includeCallToAction"
                        checked={formData.includeCallToAction}
                        onChange={handleInputChange}
                      />
                      <span>Incluir llamada a la acción</span>
                    </label>
                  </div>

                  {formData.includeCallToAction && (
                    <div className="form-group">
                      <label htmlFor="callToActionType">Tipo de llamada a la acción</label>
                      <select
                        id="callToActionType"
                        name="callToActionType"
                        value={formData.callToActionType}
                        onChange={handleInputChange}
                      >
                        <option value="contact">Invitar a contactar</option>
                        <option value="collaborate">Proponer colaboración</option>
                        <option value="consult">Ofrecer consultoría</option>
                        <option value="network">Ampliar red profesional</option>
                      </select>
                    </div>
                  )}
                </div>

                <div className="form-actions">
                  <button 
                    type="submit" 
                    className="btn-primary large"
                    disabled={isGenerating}
                  >
                    {isGenerating ? 'Generando biografía...' : 'Generar Biografía'}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="bio-result-container">
              <div className="bio-result-header">
                <h2>✨ Tu Biografía está Lista</h2>
                <p>Copia y pega esta biografía en tu perfil de LinkedIn</p>
              </div>

              <div className="bio-result-content">
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

              <div className="bio-actions">
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
  )
}

