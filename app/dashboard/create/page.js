"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import '../dashboard.css'

export default function CreateArticle() {
  const router = useRouter()
  const [content, setContent] = useState('')
  const [wordCount, setWordCount] = useState(0)

  const handleContentChange = (e) => {
    const newContent = e.target.value
    setContent(newContent)
    setWordCount(newContent.split(/\s+/).filter(word => word.length > 0).length)
  }

  const handleSave = () => {
    // Por ahora solo mostramos un mensaje
    alert('Funcionalidad de guardado próximamente disponible')
  }

  const handleBack = () => {
    router.push('/dashboard')
  }

  return (
    <div className="simple-dashboard">
      {/* Header Simple */}
      <header className="simple-header">
        <div className="header-content">
          <div className="logo">
            <span className="logo-icon">✍️</span>
            <span className="logo-text">LinkedAI</span>
          </div>
          <div className="user-info">
            <span>Crear Artículo</span>
            <button 
              className="logout-btn"
              onClick={handleBack}
            >
              ← Volver
            </button>
          </div>
        </div>
      </header>

      {/* Contenido Principal */}
      <main className="simple-main">
        <div className="welcome-section">
          <h1>✏️ Crear Artículo</h1>
          <p>Escribe tu contenido optimizado para LinkedIn</p>
        </div>

        <div className="editor-section">
          <div className="editor-card">
            <div className="editor-header">
              <h3>Editor de Contenido</h3>
              <div className="editor-stats">
                <span>Palabras: {wordCount}</span>
                <span>Tiempo lectura: {Math.ceil(wordCount / 200)} min</span>
              </div>
            </div>
            
            <div className="editor-content">
              <textarea
                value={content}
                onChange={handleContentChange}
                placeholder="Escribe tu artículo aquí...

Ejemplo:
🚀 5 estrategias para mejorar tu presencia en LinkedIn

1. Optimiza tu perfil profesional
2. Crea contenido de valor
3. Interactúa con tu red
4. Usa hashtags relevantes
5. Sé consistente en tus publicaciones

¿Cuál de estas estrategias te ha funcionado mejor?"
                className="editor-textarea"
                rows={15}
              />
            </div>

            <div className="editor-actions">
              <button className="secondary-btn" onClick={handleBack}>
                Cancelar
              </button>
              <button className="primary-btn" onClick={handleSave}>
                💾 Guardar Artículo
              </button>
            </div>
          </div>

          <div className="tips-card">
            <h3>💡 Consejos para LinkedIn</h3>
            <div className="tips-list">
              <div className="tip">
                <strong>Longitud ideal:</strong> 150-300 palabras para máximo engagement
              </div>
              <div className="tip">
                <strong>Formato:</strong> Usa emojis, listas y párrafos cortos
              </div>
              <div className="tip">
                <strong>Call to action:</strong> Termina con una pregunta para generar comentarios
              </div>
              <div className="tip">
                <strong>Hashtags:</strong> Usa 3-5 hashtags relevantes
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}