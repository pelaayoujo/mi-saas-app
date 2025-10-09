"use client"
import { useState, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import '../dashboard.css'

export default function SchedulePage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [scheduledContent, setScheduledContent] = useState({})
  const [selectedContent, setSelectedContent] = useState(null)
  const [scheduleTime, setScheduleTime] = useState('09:00')

  // Mock data para contenido generado
  const [contentItems] = useState([
    {
      id: 1,
      type: 'article',
      title: 'Marketing Digital 2024: Estrategias que Funcionan',
      preview: 'En el mundo del marketing digital, las tendencias evolucionan constantemente...',
      wordCount: 650,
      createdAt: '2024-01-15T10:30:00Z',
      status: 'draft',
      tags: ['marketing', 'digital', 'estrategias']
    },
    {
      id: 2,
      type: 'post',
      title: '5 Consejos para Mejorar tu LinkedIn',
      preview: '¿Quieres optimizar tu perfil de LinkedIn? Aquí tienes 5 consejos prácticos...',
      wordCount: 280,
      createdAt: '2024-01-14T15:45:00Z',
      status: 'draft',
      tags: ['linkedin', 'optimización', 'perfil']
    },
    {
      id: 3,
      type: 'biography',
      title: 'Biografía Profesional - Juan Pérez',
      preview: 'Experto en marketing digital con más de 8 años de experiencia...',
      wordCount: 420,
      createdAt: '2024-01-13T09:15:00Z',
      status: 'draft',
      tags: ['biografía', 'profesional', 'marketing']
    },
    {
      id: 4,
      type: 'article',
      title: 'El Futuro del Trabajo Remoto',
      preview: 'El trabajo remoto ha transformado la forma en que trabajamos...',
      wordCount: 780,
      createdAt: '2024-01-12T14:20:00Z',
      status: 'draft',
      tags: ['trabajo', 'remoto', 'futuro']
    }
  ])

  // Verificar autenticación
  if (status === 'loading') {
    return (
      <div className="dashboard">
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Cargando programación...</p>
        </div>
      </div>
    )
  }
  
  if (!session) {
    router.push('/login')
    return null
  }

  // Funciones del calendario
  const getDaysInMonth = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()
    
    const days = []
    
    // Días del mes anterior
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const prevDate = new Date(year, month, -i)
      days.push({ date: prevDate, isCurrentMonth: false })
    }
    
    // Días del mes actual
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day)
      days.push({ date, isCurrentMonth: true })
    }
    
    // Días del mes siguiente para completar la cuadrícula
    const remainingDays = 42 - days.length
    for (let day = 1; day <= remainingDays; day++) {
      const nextDate = new Date(year, month + 1, day)
      days.push({ date: nextDate, isCurrentMonth: false })
    }
    
    return days
  }

  const formatDate = (date) => {
    return date.toISOString().split('T')[0]
  }

  const isToday = (date) => {
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }

  const isSelected = (date) => {
    return selectedDate && date.toDateString() === selectedDate.toDateString()
  }

  const hasScheduledContent = (date) => {
    const dateStr = formatDate(date)
    return scheduledContent[dateStr] && scheduledContent[dateStr].length > 0
  }

  const navigateMonth = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev)
      newDate.setMonth(prev.getMonth() + direction)
      return newDate
    })
  }

  const handleDateClick = (date) => {
    setSelectedDate(date)
    setShowModal(true)
  }

  const handleScheduleContent = () => {
    if (!selectedContent || !selectedDate) return

    const dateStr = formatDate(selectedDate)
    const newScheduledItem = {
      id: Date.now(),
      contentId: selectedContent.id,
      content: selectedContent,
      time: scheduleTime,
      status: 'scheduled',
      createdAt: new Date().toISOString()
    }

    setScheduledContent(prev => ({
      ...prev,
      [dateStr]: [...(prev[dateStr] || []), newScheduledItem]
    }))

    setShowModal(false)
    setSelectedContent(null)
    setScheduleTime('09:00')
  }

  const handleRemoveScheduled = (dateStr, itemId) => {
    setScheduledContent(prev => ({
      ...prev,
      [dateStr]: prev[dateStr].filter(item => item.id !== itemId)
    }))
  }

  const getTypeInfo = (type) => {
    const typeMap = {
      article: { label: 'Artículo', icon: '📝', color: '#0077B5' },
      post: { label: 'Post', icon: '💬', color: '#28a745' },
      biography: { label: 'Biografía', icon: '👤', color: '#6f42c1' },
      email: { label: 'Email', icon: '📧', color: '#fd7e14' },
      presentation: { label: 'Presentación', icon: '📊', color: '#20c997' },
      proposal: { label: 'Propuesta', icon: '📋', color: '#dc3545' }
    }
    return typeMap[type] || { label: 'Contenido', icon: '📄', color: '#6c757d' }
  }

  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ]

  const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']

  const days = getDaysInMonth(currentDate)

  return (
    <div className="dashboard">
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
            <div className="search-container">
              <input
                type="text"
                placeholder="Buscar contenido programado..."
                className="search-input"
              />
              <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
          </div>

          <div className="header-right">
            <div className="user-menu">
              <div className="user-avatar">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <div className="user-info">
                <span className="user-name">{session.user.name}</span>
                <span className="user-role">{session.user.role}</span>
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
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
                <span className="nav-label">Inicio</span>
              </a>
              
              <a href="/dashboard/tools" className="nav-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2 2 0 0 1-3.41-2.42l.6-.6a2 2 0 0 1 2.42-3.41l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
                </svg>
                <span className="nav-label">Herramientas</span>
              </a>
              
              <a href="/dashboard/content" className="nav-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14,2 14,8 20,8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
                <span className="nav-label">Contenido Generado</span>
              </a>
              
              <a href="/dashboard/create" className="nav-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 5v14M5 12h14"></path>
                </svg>
                <span className="nav-label">Generador de Artículos</span>
              </a>
              
              <a href="/dashboard/schedule" className="nav-item active">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
          <div className="schedule-container">
            <div className="schedule-header">
              <h1>Programación de Contenido</h1>
              <p>Organiza y programa tus artículos y contenido para publicar en las fechas más efectivas.</p>
            </div>

            {/* Navegación del Calendario */}
            <div className="calendar-navigation">
              <button 
                className="nav-btn"
                onClick={() => navigateMonth(-1)}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
              
              <h2 className="calendar-title">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h2>
              
              <button 
                className="nav-btn"
                onClick={() => navigateMonth(1)}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>

            {/* Calendario */}
            <div className="calendar">
              {/* Días de la semana */}
              <div className="calendar-header">
                {dayNames.map(day => (
                  <div key={day} className="calendar-day-header">
                    {day}
                  </div>
                ))}
              </div>

              {/* Días del mes */}
              <div className="calendar-body">
                {days.map((day, index) => (
                  <div
                    key={index}
                    className={`calendar-day ${!day.isCurrentMonth ? 'other-month' : ''} ${isToday(day.date) ? 'today' : ''} ${isSelected(day.date) ? 'selected' : ''} ${hasScheduledContent(day.date) ? 'has-content' : ''}`}
                    onClick={() => day.isCurrentMonth && handleDateClick(day.date)}
                  >
                    <span className="day-number">{day.date.getDate()}</span>
                    {hasScheduledContent(day.date) && (
                      <div className="day-indicators">
                        {scheduledContent[formatDate(day.date)].map((item, idx) => (
                          <div
                            key={idx}
                            className="content-indicator"
                            style={{ backgroundColor: getTypeInfo(item.content.type).color }}
                            title={`${getTypeInfo(item.content.type).label}: ${item.content.title}`}
                          >
                            {getTypeInfo(item.content.type).icon}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Lista de Contenido Programado */}
            {selectedDate && scheduledContent[formatDate(selectedDate)] && (
              <div className="scheduled-content-list">
                <h3>Contenido programado para {selectedDate.toLocaleDateString('es-ES')}</h3>
                <div className="scheduled-items">
                  {scheduledContent[formatDate(selectedDate)].map(item => (
                    <div key={item.id} className="scheduled-item">
                      <div className="scheduled-item-header">
                        <div className="scheduled-type">
                          <span className="type-icon" style={{ backgroundColor: getTypeInfo(item.content.type).color }}>
                            {getTypeInfo(item.content.type).icon}
                          </span>
                          <span className="type-label">{getTypeInfo(item.content.type).label}</span>
                        </div>
                        <div className="scheduled-time">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                          </svg>
                          {item.time}
                        </div>
                      </div>
                      <div className="scheduled-item-body">
                        <h4>{item.content.title}</h4>
                        <p>{item.content.preview}</p>
                      </div>
                      <div className="scheduled-item-actions">
                        <button 
                          className="action-btn edit-btn"
                          onClick={() => {
                            setSelectedContent(item.content)
                            setScheduleTime(item.time)
                            setShowModal(true)
                          }}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 20h9"></path>
                            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                          </svg>
                          Editar
                        </button>
                        <button 
                          className="action-btn delete-btn"
                          onClick={() => handleRemoveScheduled(formatDate(selectedDate), item.id)}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            <line x1="10" y1="11" x2="10" y2="17"></line>
                            <line x1="14" y1="11" x2="14" y2="17"></line>
                          </svg>
                          Eliminar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Modal para Programar Contenido */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Programar Contenido</h3>
              <button 
                className="modal-close"
                onClick={() => setShowModal(false)}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">Fecha seleccionada</label>
                <div className="selected-date">
                  {selectedDate?.toLocaleDateString('es-ES', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Hora de publicación</label>
                <input
                  type="time"
                  value={scheduleTime}
                  onChange={(e) => setScheduleTime(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Seleccionar contenido</label>
                <div className="content-selection">
                  {contentItems.map(item => (
                    <div
                      key={item.id}
                      className={`content-option ${selectedContent?.id === item.id ? 'selected' : ''}`}
                      onClick={() => setSelectedContent(item)}
                    >
                      <div className="content-option-header">
                        <div className="content-type">
                          <span className="type-icon" style={{ backgroundColor: getTypeInfo(item.type).color }}>
                            {getTypeInfo(item.type).icon}
                          </span>
                          <span className="type-label">{getTypeInfo(item.type).label}</span>
                        </div>
                      </div>
                      <div className="content-option-body">
                        <h4>{item.title}</h4>
                        <p>{item.preview}</p>
                        <div className="content-meta">
                          <span className="meta-item">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                              <polyline points="14,2 14,8 20,8"></polyline>
                            </svg>
                            {item.wordCount} palabras
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button 
                className="btn-secondary"
                onClick={() => setShowModal(false)}
              >
                Cancelar
              </button>
              <button 
                className="btn-primary"
                onClick={handleScheduleContent}
                disabled={!selectedContent}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                Programar Contenido
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
