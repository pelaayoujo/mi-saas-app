"use client"
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import UserDropdown from '../../components/UserDropdown'
import '../dashboard.css'

export default function Billing() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

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

  const plans = [
    {
      id: 'basic',
      name: 'Plan Básico',
      price: '€12',
      period: '/mes',
      description: 'Perfecto para empezar',
      features: [
        '50 posts generados',
        '5 artículos por mes',
        'Plantillas básicas',
        'Soporte por email'
      ],
      current: true,
      popular: false
    },
    {
      id: 'professional',
      name: 'Plan Profesional',
      price: '€20',
      period: '/mes',
      description: 'Para profesionales serios',
      features: [
        '200 posts generados',
        '20 artículos por mes',
        'Todas las plantillas',
        'Programación de contenido',
        'Soporte prioritario'
      ],
      current: false,
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Plan Empresarial',
      price: '€30',
      period: '/mes',
      description: 'Para equipos y empresas',
      features: [
        'Posts ilimitados',
        'Artículos ilimitados',
        'Múltiples usuarios',
        'Analytics avanzados',
        'Soporte 24/7'
      ],
      current: false,
      popular: false
    }
  ]

  const handleUpgrade = async (planId) => {
    setIsLoading(true)
    // Aquí iría la lógica de pago
    console.log('Upgrading to plan:', planId)
    setTimeout(() => {
      setIsLoading(false)
      alert(`Funcionalidad de pago en desarrollo. Plan seleccionado: ${planId}`)
    }, 1000)
  }

  const handleCancel = async () => {
    if (confirm('¿Estás seguro de que quieres cancelar tu suscripción?')) {
      setIsLoading(true)
      // Aquí iría la lógica de cancelación
      console.log('Cancelling subscription')
      setTimeout(() => {
        setIsLoading(false)
        alert('Suscripción cancelada exitosamente')
      }, 1000)
    }
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
              <h1>Plan y Facturación</h1>
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
            <div className="billing-container">
              {/* Header de Planes */}
              <div className="billing-header">
                <h1>Gestiona tu Plan</h1>
                <p>Elige el plan que mejor se adapte a tus necesidades de contenido</p>
              </div>

              {/* Plan Actual */}
              <div className="current-plan-section">
                <h2>Tu Plan Actual</h2>
                <div className="current-plan-card">
                  <div className="plan-info">
                    <div className="plan-name">Plan Básico</div>
                    <div className="plan-status">
                      <span className="status-badge active">Activo</span>
                    </div>
                  </div>
                  <div className="plan-usage">
                    <div className="usage-item">
                      <span className="usage-label">Artículos usados este mes:</span>
                      <span className="usage-value">2 de 5</span>
                    </div>
                    <div className="usage-bar">
                      <div className="usage-progress" style={{width: '40%'}}></div>
                    </div>
                    <div className="usage-item">
                      <span className="usage-label">Posts generados:</span>
                      <span className="usage-value">12 de 50</span>
                    </div>
                    <div className="usage-bar">
                      <div className="usage-progress" style={{width: '24%'}}></div>
                    </div>
                  </div>
                  <div className="plan-actions">
                    <button className="btn-secondary" onClick={handleCancel}>
                      Cancelar Plan
                    </button>
                  </div>
                </div>
              </div>

              {/* Grid de Planes */}
              <div className="plans-grid">
                {plans.map((plan) => (
                  <div key={plan.id} className={`plan-card ${plan.current ? 'current' : ''} ${plan.popular ? 'popular' : ''}`}>
                    {plan.popular && (
                      <div className="popular-badge">Más Popular</div>
                    )}
                    
                    <div className="plan-header">
                      <h3 className="plan-title">{plan.name}</h3>
                      <p className="plan-description">{plan.description}</p>
                      <div className="plan-price">
                        <span className="price-amount">{plan.price}</span>
                        <span className="price-period">{plan.period}</span>
                      </div>
                    </div>

                    <div className="plan-features">
                      <ul>
                        {plan.features.map((feature, index) => (
                          <li key={index}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <polyline points="20,6 9,17 4,12"></polyline>
                            </svg>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="plan-footer">
                      {plan.current ? (
                        <button className="btn-current" disabled>
                          Plan Actual
                        </button>
                      ) : (
                        <button 
                          className={`btn-primary ${plan.popular ? 'btn-popular' : ''}`}
                          onClick={() => handleUpgrade(plan.id)}
                          disabled={isLoading}
                        >
                          {isLoading ? 'Procesando...' : plan.id === 'free' ? 'Activar' : 'Actualizar'}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Información de Facturación */}
              <div className="billing-info">
                <h2>Información de Facturación</h2>
                <div className="billing-details">
                  <div className="billing-item">
                    <span className="billing-label">Método de pago:</span>
                    <span className="billing-value">No configurado</span>
                  </div>
                  <div className="billing-item">
                    <span className="billing-label">Próxima facturación:</span>
                    <span className="billing-value">-</span>
                  </div>
                  <div className="billing-item">
                    <span className="billing-label">Facturas:</span>
                    <span className="billing-value">
                      <button className="btn-link">Ver historial</button>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
