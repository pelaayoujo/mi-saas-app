"use client"
import { useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { getUserPlan } from '../../lib/permissions'

export default function UserDropdown() {
  const { data: session } = useSession()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' })
  }

  const menuItems = [
    {
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="m22 21-3-3m0 0a7 7 0 1 0-9.9-9.9 7 7 0 0 0 9.9 9.9Z"></path>
        </svg>
      ),
      label: 'Mi Perfil',
      action: () => router.push('/dashboard/profile')
    },
    {
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
          <line x1="1" y1="10" x2="23" y2="10"></line>
        </svg>
      ),
      label: 'Plan y Facturación',
      action: () => router.push('/dashboard/billing')
    },
    {
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"></path>
        </svg>
      ),
      label: 'Configuración',
      action: () => router.push('/dashboard/settings')
    },
    {
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 12l2 2 4-4"></path>
          <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"></path>
          <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3"></path>
          <path d="M13 12h3a2 2 0 0 1 2 2v1"></path>
          <path d="M13 12h-3a2 2 0 0 0-2 2v1"></path>
          <path d="M13 12v-1a2 2 0 0 1 2-2h1"></path>
          <path d="M13 12v-1a2 2 0 0 0-2-2h-1"></path>
        </svg>
      ),
      label: 'Soporte',
      action: () => router.push('/dashboard/support')
    },
    {
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
          <polyline points="16,17 21,12 16,7"></polyline>
          <line x1="21" y1="12" x2="9" y2="12"></line>
        </svg>
      ),
      label: 'Cerrar Sesión',
      action: handleSignOut,
      isDestructive: true
    }
  ]

  return (
    <div className="user-menu">
      <button 
        className="user-menu-trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className="user-avatar">
          {session?.user?.name?.charAt(0) || 'U'}
        </div>
        <div className="user-info">
          <span className="user-name">{session?.user?.name || 'Usuario'}</span>
          <span className="user-email">{session?.user?.email}</span>
        </div>
        <svg 
          className={`dropdown-arrow ${isOpen ? 'open' : ''}`} 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
        >
          <polyline points="6,9 12,15 18,9"></polyline>
        </svg>
      </button>

      {isOpen && (
        <>
          <div className="dropdown-overlay" onClick={() => setIsOpen(false)}></div>
          <div className="user-dropdown-menu">
            <div className="dropdown-header">
              <div className="dropdown-user-info">
                <div className="dropdown-avatar">
                  {session?.user?.name?.charAt(0) || 'U'}
                </div>
                <div className="dropdown-user-details">
                  <span className="dropdown-name">{session?.user?.name || 'Usuario'}</span>
                  <span className="dropdown-email">{session?.user?.email}</span>
                </div>
              </div>
              <div className="dropdown-plan-badge">
                <span className="plan-badge">
                  {session?.user?.email ? getUserPlan(session.user.email).name : 'Plan Básico'}
                </span>
              </div>
            </div>

            <div className="dropdown-divider"></div>

            <div className="dropdown-menu-items">
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  className={`dropdown-item ${item.isDestructive ? 'destructive' : ''}`}
                  onClick={() => {
                    item.action()
                    setIsOpen(false)
                  }}
                >
                  <span className="item-icon">{item.icon}</span>
                  <span className="item-label">{item.label}</span>
                  {item.label === 'Plan y Facturación' && (
                    <span className="item-badge">Pro</span>
                  )}
                </button>
              ))}
            </div>

            <div className="dropdown-footer">
              <div className="dropdown-stats">
                <div className="stat-item">
                  <span className="stat-number">12</span>
                  <span className="stat-label">Artículos creados</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">5</span>
                  <span className="stat-label">Días restantes</span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
