"use client"
import { useState, useRef, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import '../dashboard.css'

export default function Editor() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedParagraph, setSelectedParagraph] = useState(null)
  const [isRegenerating, setIsRegenerating] = useState(false)
  const [regenerationSettings, setRegenerationSettings] = useState({
    tone: 'profesional',
    specificInstructions: '',
    length: 'mantener'
  })
  
  // Estado del editor
  const [editorContent, setEditorContent] = useState(`
    <h1>Marketing Digital 2024: Estrategias que Funcionan</h1>
    
    <p>En el mundo del marketing digital, las tendencias evolucionan constantemente. Este artículo explora las estrategias más efectivas para 2024.</p>
    
    <h2>1. Personalización a Gran Escala</h2>
    
    <p>La personalización ya no es una opción, es una necesidad. Los consumidores esperan experiencias únicas y relevantes que se adapten a sus necesidades específicas.</p>
    
    <p>Las herramientas de IA permiten crear campañas personalizadas a gran escala, analizando el comportamiento del usuario y adaptando el mensaje en tiempo real.</p>
    
    <h2>2. Contenido de Valor</h2>
    
    <p>El contenido sigue siendo el rey, pero ahora más que nunca debe aportar valor real. Los usuarios buscan información que les ayude a resolver problemas específicos.</p>
    
    <p>Crear contenido educativo, tutoriales paso a paso y análisis profundos te posicionará como una autoridad en tu sector.</p>
    
    <h2>3. Automatización Inteligente</h2>
    
    <p>La automatización inteligente permite optimizar procesos sin perder el toque humano. Desde emails personalizados hasta respuestas de chat, la tecnología puede mejorar la experiencia del cliente.</p>
    
    <p>La clave está en encontrar el equilibrio perfecto entre automatización y personalización humana.</p>
    
    <h2>Conclusión</h2>
    
    <p>El marketing digital en 2024 se centra en la personalización, el valor y la automatización inteligente. Las empresas que adopten estas estrategias tendrán una ventaja competitiva significativa.</p>
  `)

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

  const handleEditorChange = (e) => {
    setEditorContent(e.target.innerHTML)
  }

  const handleParagraphClick = (e) => {
    if (e.target.tagName === 'P') {
      // Remover selección anterior
      document.querySelectorAll('.paragraph-selected').forEach(p => {
        p.classList.remove('paragraph-selected')
      })
      
      // Agregar selección nueva
      e.target.classList.add('paragraph-selected')
      setSelectedParagraph(e.target)
    }
  }

  const handleRegenerateParagraph = async () => {
    if (!selectedParagraph) {
      alert('Por favor selecciona un párrafo primero')
      return
    }

    setIsRegenerating(true)
    
    // Simular regeneración
    setTimeout(() => {
      const newContent = `Este es un párrafo regenerado con tono ${regenerationSettings.tone}. ${regenerationSettings.specificInstructions ? `Instrucciones específicas: ${regenerationSettings.specificInstructions}` : ''}`
      selectedParagraph.innerHTML = newContent
      selectedParagraph.classList.remove('paragraph-selected')
      setSelectedParagraph(null)
      setIsRegenerating(false)
    }, 2000)
  }

  const formatText = (command, value = null) => {
    document.execCommand(command, false, value)
    document.getElementById('editor').focus()
    updateToolbarState()
  }

  const updateToolbarState = () => {
    // Actualizar estado de botones de formato
    const buttons = document.querySelectorAll('.toolbar-btn')
    buttons.forEach(btn => {
      const command = btn.getAttribute('data-command')
      if (command) {
        const isActive = document.queryCommandState(command)
        btn.classList.toggle('active', isActive)
      }
    })
  }

  const insertHeading = (level) => {
    formatText('formatBlock', `h${level}`)
  }

  const insertList = (type) => {
    formatText(type === 'ordered' ? 'insertOrderedList' : 'insertUnorderedList')
  }

  // Actualizar estado de toolbar cuando se hace clic en el editor
  useEffect(() => {
    const editor = document.getElementById('editor')
    if (editor) {
      editor.addEventListener('click', updateToolbarState)
      editor.addEventListener('keyup', updateToolbarState)
      return () => {
        editor.removeEventListener('click', updateToolbarState)
        editor.removeEventListener('keyup', updateToolbarState)
      }
    }
  }, [])

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
              <h1>Editor de Artículos</h1>
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

      {/* Contenido Principal - Editor a pantalla completa */}
      <div className="editor-fullscreen">
          <div className="editor-container">
            {/* Barra de Herramientas */}
            <div className="editor-toolbar">
              <div className="toolbar-group">
                <button 
                  className="toolbar-btn back-btn"
                  onClick={() => router.back()}
                  title="Volver"
                >
                  ←
                </button>
              </div>
              
              <div className="toolbar-group">
                <button 
                  className="toolbar-btn"
                  data-command="bold"
                  onClick={() => formatText('bold')}
                  title="Negrita"
                >
                  B
                </button>
                <button 
                  className="toolbar-btn"
                  data-command="italic"
                  onClick={() => formatText('italic')}
                  title="Cursiva"
                >
                  I
                </button>
                <button 
                  className="toolbar-btn"
                  data-command="underline"
                  onClick={() => formatText('underline')}
                  title="Subrayado"
                >
                  U
                </button>
              </div>

              <div className="toolbar-group">
                <button 
                  className="toolbar-btn"
                  onClick={() => insertHeading(1)}
                  title="Título 1"
                >
                  H1
                </button>
                <button 
                  className="toolbar-btn"
                  onClick={() => insertHeading(2)}
                  title="Título 2"
                >
                  H2
                </button>
                <button 
                  className="toolbar-btn"
                  onClick={() => insertHeading(3)}
                  title="Título 3"
                >
                  H3
                </button>
              </div>

              <div className="toolbar-group">
                <button 
                  className="toolbar-btn"
                  data-command="justifyLeft"
                  onClick={() => formatText('justifyLeft')}
                  title="Alinear Izquierda"
                >
                  ←
                </button>
                <button 
                  className="toolbar-btn"
                  data-command="justifyCenter"
                  onClick={() => formatText('justifyCenter')}
                  title="Centrar"
                >
                  ↔
                </button>
                <button 
                  className="toolbar-btn"
                  data-command="justifyRight"
                  onClick={() => formatText('justifyRight')}
                  title="Alinear Derecha"
                >
                  →
                </button>
                <button 
                  className="toolbar-btn"
                  data-command="justifyFull"
                  onClick={() => formatText('justifyFull')}
                  title="Justificar"
                >
                  ≡
                </button>
              </div>

              <div className="toolbar-group">
                <button 
                  className="toolbar-btn"
                  data-command="insertUnorderedList"
                  onClick={() => insertList('unordered')}
                  title="Lista con Viñetas"
                >
                  •
                </button>
                <button 
                  className="toolbar-btn"
                  data-command="insertOrderedList"
                  onClick={() => insertList('ordered')}
                  title="Lista Numerada"
                >
                  1.
                </button>
              </div>

              <div className="toolbar-group">
                <select 
                  className="toolbar-select"
                  onChange={(e) => formatText('fontSize', e.target.value)}
                >
                  <option value="3">8px</option>
                  <option value="4">10px</option>
                  <option value="5">12px</option>
                  <option value="6">14px</option>
                  <option value="7">18px</option>
                  <option value="8">24px</option>
                  <option value="9">32px</option>
                </select>
              </div>
            </div>

            {/* Área de Edición */}
            <div className="editor-content">
              <div 
                id="editor"
                className="editor-textarea"
                contentEditable
                dangerouslySetInnerHTML={{ __html: editorContent }}
                onInput={handleEditorChange}
                onClick={handleParagraphClick}
                suppressContentEditableWarning={true}
              />
            </div>
          </div>

          {/* Panel Lateral de Regeneración */}
          <div className="editor-sidebar">
            <div className="sidebar-header">
              <h3>Regenerar Párrafos</h3>
              <p>Selecciona un párrafo y regenera su contenido</p>
            </div>

            {selectedParagraph ? (
              <div className="selected-paragraph">
                <h4>Párrafo Seleccionado:</h4>
                <div className="paragraph-preview">
                  {selectedParagraph.textContent.substring(0, 100)}...
                </div>
              </div>
            ) : (
              <div className="no-selection">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
                <p>Haz clic en un párrafo para seleccionarlo</p>
              </div>
            )}

            <div className="regeneration-settings">
              <div className="setting-group">
                <label className="setting-label">Tono del Párrafo</label>
                <select 
                  className="setting-select"
                  value={regenerationSettings.tone}
                  onChange={(e) => setRegenerationSettings(prev => ({ ...prev, tone: e.target.value }))}
                >
                  <option value="profesional">Profesional</option>
                  <option value="casual">Casual</option>
                  <option value="inspiracional">Inspiracional</option>
                  <option value="educativo">Educativo</option>
                  <option value="conversacional">Conversacional</option>
                </select>
              </div>

              <div className="setting-group">
                <label className="setting-label">Longitud</label>
                <select 
                  className="setting-select"
                  value={regenerationSettings.length}
                  onChange={(e) => setRegenerationSettings(prev => ({ ...prev, length: e.target.value }))}
                >
                  <option value="mantener">Mantener Longitud</option>
                  <option value="mas-corto">Más Corto</option>
                  <option value="mas-largo">Más Largo</option>
                </select>
              </div>

              <div className="setting-group">
                <label className="setting-label">Instrucciones Específicas</label>
                <textarea
                  className="setting-textarea"
                  placeholder="Ej: Incluir estadísticas, agregar ejemplos prácticos, enfocarse en beneficios..."
                  value={regenerationSettings.specificInstructions}
                  onChange={(e) => setRegenerationSettings(prev => ({ ...prev, specificInstructions: e.target.value }))}
                  rows="3"
                />
              </div>

              <button 
                className="regenerate-btn"
                onClick={handleRegenerateParagraph}
                disabled={!selectedParagraph || isRegenerating}
              >
                {isRegenerating ? (
                  <>
                    <div className="btn-spinner"></div>
                    Regenerando...
                  </>
                ) : (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="23,4 23,10 17,10"></polyline>
                      <polyline points="1,20 1,14 7,14"></polyline>
                      <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path>
                    </svg>
                    Regenerar Párrafo
                  </>
                )}
              </button>
            </div>
          </div>
      </div>
    </div>
  )
}
