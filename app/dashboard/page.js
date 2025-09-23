"use client"
import { useState, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import './dashboard.css'

export default function UserDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('generar')
  const [content, setContent] = useState('')
  const [generatedContent, setGeneratedContent] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  // Verificar autenticación
  useEffect(() => {
    if (status === 'loading') return // Aún cargando
    
    if (!session) {
      router.push('/login')
      return
    }

    // Cargar datos del usuario desde la sesión
    setUser({
      nombre: session.user.name,
      email: session.user.email,
      nicho: 'Tecnología', // Esto vendría de la base de datos
      plan: 'trial',
      creditos: 8,
      fechaRegistro: new Date()
    })
    setLoading(false)
  }, [session, status, router])

  const generateContent = async () => {
    if (!content.trim()) return

    setIsGenerating(true)
    
    // Simular generación de contenido con IA
    setTimeout(() => {
      const templates = [
        `🚀 **${content}** - La clave del éxito en LinkedIn\n\nDespués de analizar 10,000+ posts exitosos, he descubierto que ${content} es fundamental para:\n\n✅ Aumentar engagement en un 300%\n✅ Generar más conexiones de calidad\n✅ Posicionarte como experto\n\n¿Quieres saber cómo implementarlo? Comenta "SÍ" 👇`,
        
        `💡 **Mi secreto para ${content}**\n\nHace 6 meses no sabía nada sobre ${content}. Hoy genero 50+ leads semanales.\n\nEl cambio: aplicar estos 3 principios:\n\n1. Consistencia > Perfección\n2. Valor > Venta\n3. Autenticidad > Poser\n\n¿Te interesa conocer más? DM me 📩`,
        
        `⚡ **ROMPÍ el algoritmo con ${content}**\n\nDe 500 a 15,000 seguidores en 30 días.\n\nLa estrategia: ${content} + IA = Resultados exponenciales\n\n📈 +847% más interacciones\n🎯 +200% más leads\n💰 +500% más oportunidades\n\n¿Quieres la fórmula completa? Comenta "LINKEDAI" 👇`
      ]
      
      const randomTemplate = templates[Math.floor(Math.random() * templates.length)]
      setGeneratedContent(randomTemplate)
      setIsGenerating(false)
      
      // Reducir créditos
      setUser(prev => ({
        ...prev,
        creditos: prev.creditos - 1
      }))
    }, 2000)
  }

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Cargando tu dashboard...</p>
      </div>
    )
  }

  return (
    <div className="user-dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <div className="user-info">
            <h1>¡Hola, {user.nombre}! 👋</h1>
            <p>Bienvenido a tu centro de control de LinkedAI</p>
          </div>
          <div className="user-stats">
            <div className="stat-item">
              <span className="stat-label">Plan</span>
              <span className="stat-value">{user.plan.toUpperCase()}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Créditos</span>
              <span className="stat-value">{user.creditos}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Nicho</span>
              <span className="stat-value">{user.nicho}</span>
            </div>
            <button 
              className="logout-button"
              onClick={() => signOut({ callbackUrl: '/' })}
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="dashboard-nav">
        <button 
          className={`nav-tab ${activeTab === 'generar' ? 'active' : ''}`}
          onClick={() => setActiveTab('generar')}
        >
          🚀 Generar Contenido
        </button>
        <button 
          className={`nav-tab ${activeTab === 'historial' ? 'active' : ''}`}
          onClick={() => setActiveTab('historial')}
        >
          📚 Historial
        </button>
        <button 
          className={`nav-tab ${activeTab === 'analytics' ? 'active' : ''}`}
          onClick={() => setActiveTab('analytics')}
        >
          📊 Analytics
        </button>
        <button 
          className={`nav-tab ${activeTab === 'config' ? 'active' : ''}`}
          onClick={() => setActiveTab('config')}
        >
          ⚙️ Configuración
        </button>
      </nav>

      {/* Main Content */}
      <main className="dashboard-main">
        {activeTab === 'generar' && (
          <div className="content-generator">
            <div className="generator-header">
              <h2>Generador de Contenido IA</h2>
              <p>Describe tu tema y la IA creará contenido optimizado para LinkedIn</p>
            </div>

            <div className="generator-form">
              <div className="input-group">
                <label htmlFor="content-input">¿Sobre qué quieres crear contenido?</label>
                <textarea
                  id="content-input"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Ej: estrategias de marketing digital, liderazgo en startups, ventas B2B..."
                  rows={4}
                />
              </div>

              <button 
                onClick={generateContent}
                disabled={!content.trim() || isGenerating || user.creditos <= 0}
                className="generate-btn"
              >
                {isGenerating ? '🤖 Generando...' : '✨ Generar Contenido'}
              </button>

              {user.creditos <= 0 && (
                <p className="no-credits">⚠️ No tienes créditos disponibles. <a href="#upgrade">Actualiza tu plan</a></p>
              )}
            </div>

            {generatedContent && (
              <div className="generated-content">
                <h3>📝 Contenido Generado</h3>
                <div className="content-preview">
                  <pre>{generatedContent}</pre>
                </div>
                <div className="content-actions">
                  <button className="btn-copy">📋 Copiar</button>
                  <button className="btn-edit">✏️ Editar</button>
                  <button className="btn-schedule">📅 Programar</button>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'historial' && (
          <div className="content-history">
            <h2>Historial de Contenido</h2>
            <div className="history-list">
              <div className="history-item">
                <div className="history-content">
                  <h4>Estrategias de Marketing Digital</h4>
                  <p>Generado hace 2 horas</p>
                </div>
                <div className="history-actions">
                  <button>Ver</button>
                  <button>Copiar</button>
                </div>
              </div>
              <div className="history-item">
                <div className="history-content">
                  <h4>Liderazgo en Startups</h4>
                  <p>Generado hace 1 día</p>
                </div>
                <div className="history-actions">
                  <button>Ver</button>
                  <button>Copiar</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="analytics">
            <h2>Analytics de Contenido</h2>
            <div className="analytics-grid">
              <div className="analytics-card">
                <h3>📈 Contenido Generado</h3>
                <div className="analytics-number">12</div>
                <p>Este mes</p>
              </div>
              <div className="analytics-card">
                <h3>🎯 Tasa de Éxito</h3>
                <div className="analytics-number">87%</div>
                <p>Contenido viral</p>
              </div>
              <div className="analytics-card">
                <h3>💬 Engagement</h3>
                <div className="analytics-number">+340%</div>
                <p>vs. contenido manual</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'config' && (
          <div className="settings">
            <h2>Configuración</h2>
            <div className="settings-section">
              <h3>Perfil</h3>
              <div className="setting-item">
                <label>Nombre</label>
                <input type="text" value={user.nombre} readOnly />
              </div>
              <div className="setting-item">
                <label>Email</label>
                <input type="email" value={user.email} readOnly />
              </div>
              <div className="setting-item">
                <label>Nicho</label>
                <input type="text" value={user.nicho} readOnly />
              </div>
            </div>
            
            <div className="settings-section">
              <h3>Plan</h3>
              <div className="plan-info">
                <p>Plan actual: <strong>{user.plan.toUpperCase()}</strong></p>
                <p>Créditos restantes: <strong>{user.creditos}</strong></p>
                <button className="upgrade-btn">🚀 Actualizar Plan</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}


