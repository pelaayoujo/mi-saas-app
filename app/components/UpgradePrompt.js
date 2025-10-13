"use client"
import { useState } from 'react'

export default function UpgradePrompt({ 
  title = "Upgrade requerido", 
  message = "Necesitas actualizar tu plan para usar esta característica.",
  action = { text: "Ver planes", href: "/dashboard/billing" },
  onClose 
}) {
  const [isVisible, setIsVisible] = useState(true)

  const handleClose = () => {
    setIsVisible(false)
    if (onClose) onClose()
  }

  if (!isVisible) return null

  return (
    <div className="upgrade-prompt-overlay">
      <div className="upgrade-prompt">
        <div className="upgrade-header">
          <div className="upgrade-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 20h9"></path>
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
            </svg>
          </div>
          <button className="upgrade-close" onClick={handleClose}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        <div className="upgrade-content">
          <h3 className="upgrade-title">{title}</h3>
          <p className="upgrade-message">{message}</p>
          
          <div className="upgrade-features">
            <div className="feature-item">
              <svg className="feature-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20,6 9,17 4,12"></polyline>
              </svg>
              <span>Acceso ilimitado a todas las herramientas</span>
            </div>
            <div className="feature-item">
              <svg className="feature-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20,6 9,17 4,12"></polyline>
              </svg>
              <span>Soporte prioritario</span>
            </div>
            <div className="feature-item">
              <svg className="feature-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20,6 9,17 4,12"></polyline>
              </svg>
              <span>Plantillas premium</span>
            </div>
          </div>
        </div>
        
        <div className="upgrade-actions">
          <a href={action.href} className="upgrade-btn">
            {action.text}
          </a>
          <button className="upgrade-btn-secondary" onClick={handleClose}>
            Más tarde
          </button>
        </div>
      </div>
    </div>
  )
}
