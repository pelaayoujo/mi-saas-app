"use client"

import { useState, useEffect } from 'react'
import { toneExamples, objectiveExamples } from '../../../lib/examplesData'

export default function ExamplesModal({ isOpen, onClose, type, selectedValue, onSelect }) {
  const [activeTab, setActiveTab] = useState(selectedValue || 'profesional')
  const [copiedExample, setCopiedExample] = useState(null)

  // Cerrar modal con Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const examples = type === 'tone' ? toneExamples : objectiveExamples
  const typeTitle = type === 'tone' ? 'Tonos' : 'Objetivos'
  const typeDescription = type === 'tone' 
    ? 'Elige el tono que mejor se adapte a tu mensaje y audiencia'
    : 'Define el propósito principal de tu artículo'

  const handleCopyExample = async (example, index) => {
    try {
      await navigator.clipboard.writeText(example)
      setCopiedExample(index)
      setTimeout(() => setCopiedExample(null), 2000)
    } catch (err) {
      console.error('Error copying to clipboard:', err)
    }
  }

  const handleSelectExample = (key) => {
    setActiveTab(key)
    if (onSelect) {
      onSelect(key)
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="examples-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div className="modal-title">
            <h2>Ejemplos de {typeTitle}</h2>
            <p>{typeDescription}</p>
          </div>
          <button className="modal-close" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Tabs */}
        <div className="examples-tabs">
          {Object.keys(examples).map((key) => (
            <button
              key={key}
              className={`tab-button ${activeTab === key ? 'active' : ''}`}
              onClick={() => setActiveTab(key)}
            >
              {examples[key].title}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="modal-content">
          {examples[activeTab] && (
            <div className="example-content">
              {/* Description */}
              <div className="example-description">
                <h3>{examples[activeTab].title}</h3>
                <p>{examples[activeTab].description}</p>
              </div>

              {/* Characteristics */}
              <div className="example-characteristics">
                <h4>Características:</h4>
                <div className="characteristics-list">
                  {examples[activeTab].characteristics.map((char, index) => (
                    <span key={index} className="characteristic-tag">
                      {char}
                    </span>
                  ))}
                </div>
              </div>

              {/* Examples */}
              <div className="example-samples">
                <h4>Ejemplos de artículos:</h4>
                <div className="samples-list">
                  {examples[activeTab].examples.map((example, index) => (
                    <div key={index} className="sample-card">
                      <div className="sample-content">
                        <div className="linkedin-mockup-small">
                          <div className="linkedin-header-small">
                            <div className="linkedin-avatar-small"></div>
                            <div className="linkedin-user-small">
                              <div className="user-name-small">Tu Perfil</div>
                              <div className="user-title-small">Tu cargo profesional</div>
                            </div>
                          </div>
                          <div className="linkedin-content-small">
                            {example}
                          </div>
                        </div>
                      </div>
                      <div className="sample-actions">
                        <button
                          className="copy-button"
                          onClick={() => handleCopyExample(example, index)}
                          title="Copiar ejemplo"
                        >
                          {copiedExample === index ? (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <polyline points="20,6 9,17 4,12"></polyline>
                            </svg>
                          ) : (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                            </svg>
                          )}
                          {copiedExample === index ? 'Copiado' : 'Copiar'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>
            Cerrar
          </button>
          <button 
            className="btn-primary" 
            onClick={() => {
              handleSelectExample(activeTab)
              onClose()
            }}
          >
            Usar {examples[activeTab]?.title}
          </button>
        </div>
      </div>
    </div>
  )
}
