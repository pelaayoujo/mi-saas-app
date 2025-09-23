"use client"
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import '../dashboard.css'

export default function CreateArticle() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [templates, setTemplates] = useState([])
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [articleData, setArticleData] = useState({
    title: '',
    template: '',
    tone: 'cercano',
    length: 'normal',
    targetAudience: 'profesionales',
    keywords: [],
    tags: []
  })
  const [content, setContent] = useState('')
  const [wordCount, setWordCount] = useState(0)

  useEffect(() => {
    if (status === 'loading') return
    if (!session) {
      router.push('/login')
      return
    }
    loadTemplates()
  }, [session, status, router])

  const loadTemplates = async () => {
    try {
      const response = await fetch('/api/templates')
      if (response.ok) {
        const data = await response.json()
        setTemplates(data.templates || [])
      }
    } catch (error) {
      console.error('Error cargando plantillas:', error)
    }
  }

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template)
    setArticleData(prev => ({
      ...prev,
      template: template.id,
      title: template.content.title || ''
    }))
    setContent(template.content.body || '')
    setStep(2)
  }

  const handleMetadataChange = (field, value) => {
    setArticleData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleContentChange = (newContent) => {
    setContent(newContent)
    setWordCount(newContent.split(/\s+/).filter(word => word.length > 0).length)
  }

  const handleSave = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...articleData,
          body: content,
          wordCount: wordCount
        }),
      })

      if (response.ok) {
        const data = await response.json()
        router.push(`/dashboard/edit/${data.article.id}`)
      } else {
        console.error('Error guardando artículo')
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const templateCategories = {
    lista: { name: 'Lista', icon: '📋', description: 'Estructura para crear listas efectivas' },
    guía: { name: 'Guía', icon: '📖', description: 'Tutorial paso a paso' },
    opinión: { name: 'Opinión', icon: '💭', description: 'Tu punto de vista personal' },
    hilo: { name: 'Hilo', icon: '🧵', description: 'Serie de posts conectados' },
    caso: { name: 'Caso de Estudio', icon: '📊', description: 'Historia de éxito' },
    tutorial: { name: 'Tutorial', icon: '🎓', description: 'Cómo hacer algo' }
  }

  if (status === 'loading') {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Cargando...</p>
      </div>
    )
  }

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-left">
            <div className="logo">
              <span className="logo-icon">✍️</span>
              <span className="logo-text">LinkedAI</span>
            </div>
          </div>
          <div className="header-right">
            <div className="user-menu">
              <span className="user-name">Hola, {session?.user?.name}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="dashboard-layout">
        {/* Sidebar */}
        <aside className="dashboard-sidebar">
          <nav className="sidebar-nav">
            <a href="/dashboard" className="nav-item">
              <span className="nav-icon">📊</span>
              <span className="nav-label">Dashboard</span>
            </a>
            <a href="/dashboard/create" className="nav-item active">
              <span className="nav-icon">✏️</span>
              <span className="nav-label">Crear Artículo</span>
            </a>
            <a href="/dashboard/calendar" className="nav-item">
              <span className="nav-icon">📅</span>
              <span className="nav-label">Calendario</span>
            </a>
            <a href="/dashboard/analytics" className="nav-item">
              <span className="nav-icon">📈</span>
              <span className="nav-label">Analytics</span>
            </a>
            <a href="/dashboard/settings" className="nav-item">
              <span className="nav-icon">⚙️</span>
              <span className="nav-label">Configuración</span>
            </a>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="dashboard-main">
          <div className="create-article-container">
            {/* Progress Steps */}
            <div className="progress-steps">
              <div className={`step ${step >= 1 ? 'active' : ''}`}>
                <span className="step-number">1</span>
                <span className="step-label">Plantilla</span>
              </div>
              <div className={`step ${step >= 2 ? 'active' : ''}`}>
                <span className="step-number">2</span>
                <span className="step-label">Metadata</span>
              </div>
              <div className={`step ${step >= 3 ? 'active' : ''}`}>
                <span className="step-number">3</span>
                <span className="step-label">Editor</span>
              </div>
              <div className={`step ${step >= 4 ? 'active' : ''}`}>
                <span className="step-number">4</span>
                <span className="step-label">Preview</span>
              </div>
            </div>

            {/* Step 1: Template Selection */}
            {step === 1 && (
              <div className="step-content">
                <div className="step-header">
                  <h2>Elige una plantilla</h2>
                  <p>Selecciona el tipo de contenido que quieres crear</p>
                </div>

                <div className="templates-grid">
                  {Object.entries(templateCategories).map(([key, category]) => (
                    <div key={key} className="template-category">
                      <h3>{category.icon} {category.name}</h3>
                      <p>{category.description}</p>
                      <div className="templates-list">
                        {templates
                          .filter(t => t.category === key)
                          .map(template => (
                            <div
                              key={template.id}
                              className="template-card"
                              onClick={() => handleTemplateSelect(template)}
                            >
                              <h4>{template.name}</h4>
                              <p>{template.description}</p>
                              <div className="template-stats">
                                <span>⭐ {template.rating}</span>
                                <span>👥 {template.usageCount}</span>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Metadata */}
            {step === 2 && (
              <div className="step-content">
                <div className="step-header">
                  <h2>Configuración del artículo</h2>
                  <p>Define los parámetros de tu contenido</p>
                </div>

                <div className="metadata-form">
                  <div className="form-group">
                    <label htmlFor="title">Título del artículo</label>
                    <input
                      type="text"
                      id="title"
                      value={articleData.title}
                      onChange={(e) => handleMetadataChange('title', e.target.value)}
                      placeholder="Escribe un título atractivo..."
                      className="form-input"
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="tone">Tono</label>
                      <select
                        id="tone"
                        value={articleData.tone}
                        onChange={(e) => handleMetadataChange('tone', e.target.value)}
                        className="form-select"
                      >
                        <option value="formal">Formal</option>
                        <option value="cercano">Cercano</option>
                        <option value="técnico">Técnico</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="length">Longitud</label>
                      <select
                        id="length"
                        value={articleData.length}
                        onChange={(e) => handleMetadataChange('length', e.target.value)}
                        className="form-select"
                      >
                        <option value="corta">Corta (300-500 palabras)</option>
                        <option value="normal">Normal (500-800 palabras)</option>
                        <option value="larga">Larga (800+ palabras)</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="audience">Público objetivo</label>
                    <select
                      id="audience"
                      value={articleData.targetAudience}
                      onChange={(e) => handleMetadataChange('targetAudience', e.target.value)}
                      className="form-select"
                    >
                      <option value="profesionales">Profesionales</option>
                      <option value="emprendedores">Emprendedores</option>
                      <option value="estudiantes">Estudiantes</option>
                      <option value="general">General</option>
                    </select>
                  </div>

                  <div className="form-actions">
                    <button 
                      className="btn-secondary"
                      onClick={() => setStep(1)}
                    >
                      ← Volver
                    </button>
                    <button 
                      className="btn-primary"
                      onClick={() => setStep(3)}
                      disabled={!articleData.title.trim()}
                    >
                      Continuar →
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Editor */}
            {step === 3 && (
              <div className="step-content">
                <div className="step-header">
                  <h2>Editor de contenido</h2>
                  <p>Escribe y edita tu artículo</p>
                </div>

                <div className="editor-container">
                  <div className="editor-toolbar">
                    <button className="toolbar-btn" title="Negrita (Ctrl+B)">B</button>
                    <button className="toolbar-btn" title="Cursiva (Ctrl+I)">I</button>
                    <button className="toolbar-btn" title="Subrayado">U</button>
                    <div className="toolbar-separator"></div>
                    <button className="toolbar-btn" title="Encabezado 2">H2</button>
                    <button className="toolbar-btn" title="Encabezado 3">H3</button>
                    <div className="toolbar-separator"></div>
                    <button className="toolbar-btn" title="Lista con viñetas">•</button>
                    <button className="toolbar-btn" title="Lista numerada">1.</button>
                    <button className="toolbar-btn" title="Cita">"</button>
                    <div className="toolbar-separator"></div>
                    <button className="toolbar-btn" title="Imagen">📷</button>
                    <button className="toolbar-btn" title="Enlace">🔗</button>
                  </div>

                  <div className="editor-content">
                    <textarea
                      value={content}
                      onChange={(e) => handleContentChange(e.target.value)}
                      placeholder="Comienza a escribir tu artículo..."
                      className="editor-textarea"
                      rows={20}
                    />
                  </div>

                  <div className="editor-footer">
                    <div className="editor-stats">
                      <span>Palabras: {wordCount}</span>
                      <span>Tiempo lectura: {Math.ceil(wordCount / 200)} min</span>
                      <span className="save-status">💾 Guardado</span>
                    </div>
                  </div>
                </div>

                <div className="form-actions">
                  <button 
                    className="btn-secondary"
                    onClick={() => setStep(2)}
                  >
                    ← Volver
                  </button>
                  <button 
                    className="btn-primary"
                    onClick={() => setStep(4)}
                    disabled={!content.trim()}
                  >
                    Preview →
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Preview */}
            {step === 4 && (
              <div className="step-content">
                <div className="step-header">
                  <h2>Preview y guardar</h2>
                  <p>Revisa tu artículo antes de guardarlo</p>
                </div>

                <div className="preview-container">
                  <div className="preview-content">
                    <div className="linkedin-preview">
                      <div className="preview-header">
                        <div className="preview-avatar">👤</div>
                        <div className="preview-info">
                          <div className="preview-name">{session?.user?.name}</div>
                          <div className="preview-title">CEO | Growth Expert</div>
                          <div className="preview-time">hace 2 horas</div>
                        </div>
                      </div>
                      <div className="preview-post">
                        <h3>{articleData.title}</h3>
                        <div className="preview-text">
                          {content.substring(0, 260)}
                          {content.length > 260 && '...'}
                        </div>
                      </div>
                      <div className="preview-engagement">
                        <span>👍 0</span>
                        <span>💬 0</span>
                        <span>🔄 0</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="form-actions">
                  <button 
                    className="btn-secondary"
                    onClick={() => setStep(3)}
                  >
                    ← Volver
                  </button>
                  <button 
                    className="btn-primary"
                    onClick={handleSave}
                    disabled={loading}
                  >
                    {loading ? 'Guardando...' : '💾 Guardar Artículo'}
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
