"use client"
import { useState, useEffect } from 'react'
import './register.css'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [nombre, setNombre] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)
  const [isValidEmail, setIsValidEmail] = useState(false)
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [leadData, setLeadData] = useState(null)
  const [assignedPlan, setAssignedPlan] = useState(null)

  // Verificar si el email está en la lista de leads
  const checkEmailAccess = async (emailToCheck) => {
    if (!emailToCheck) return
    
    try {
      const response = await fetch('/api/validate-lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: emailToCheck }),
      })
      
      const data = await response.json()
      
      if (data.success) {
        if (data.isLead) {
          setIsValidEmail(true)
          setLeadData(data.leadData)
          setNombre(data.leadData.nombre)
          
          if (data.isAuthorized && data.authorizedPlan) {
            setIsAuthorized(true)
            setAssignedPlan(data.authorizedPlan)
            setMessage({
              type: 'success',
              text: `¡Perfecto! Estás autorizado para registrarte con plan ${data.authorizedPlan.toUpperCase()}. ¡Bienvenido ${data.leadData.nombre}!`
            })
          } else {
            setIsAuthorized(false)
            setAssignedPlan(null)
            setMessage({
              type: 'warning',
              text: `¡Hola ${data.leadData.nombre}! Tu email está verificado pero aún no tienes acceso. Te notificaremos cuando puedas registrarte.`
            })
          }
        } else {
          setIsValidEmail(false)
          setIsAuthorized(false)
          setLeadData(null)
          setAssignedPlan(null)
          setMessage({
            type: 'error',
            text: 'Este email no está en nuestra lista de invitados. Regístrate primero en la landing page.'
          })
        }
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Error al verificar el email. Inténtalo de nuevo.'
      })
    }
  }

  const handleEmailChange = (e) => {
    const newEmail = e.target.value
    setEmail(newEmail)
    
    // Verificar email después de 1 segundo de no escribir
    if (newEmail) {
      const timeoutId = setTimeout(() => {
        checkEmailAccess(newEmail)
      }, 1000)
      
      return () => clearTimeout(timeoutId)
    } else {
      setIsValidEmail(false)
      setIsAuthorized(false)
      setLeadData(null)
      setAssignedPlan(null)
      setMessage(null)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!isValidEmail || !isAuthorized) {
      setMessage({
        type: 'error',
        text: 'Debes verificar tu email y estar autorizado para continuar'
      })
      return
    }

    if (password !== confirmPassword) {
      setMessage({
        type: 'error',
        text: 'Las contraseñas no coinciden'
      })
      return
    }

    if (password.length < 6) {
      setMessage({
        type: 'error',
        text: 'La contraseña debe tener al menos 6 caracteres'
      })
      return
    }

    setLoading(true)
    setMessage(null)

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          nombre,
          nicho: leadData.nicho
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage({
          type: 'success',
          text: '¡Cuenta creada exitosamente! Redirigiendo al dashboard...'
        })
        
        // Redirigir al dashboard después de 2 segundos
        setTimeout(() => {
          window.location.href = '/dashboard'
        }, 2000)
      } else if (response.status === 423) {
        // Registro no disponible o lista de espera
        if (data.position) {
          setMessage({
            type: 'waitlist',
            text: `Estás en la lista de espera (posición ${data.position} de ${data.totalLeads}). Te contactaremos cuando tengamos disponibilidad.`
          })
        } else {
          setMessage({
            type: 'waitlist',
            text: 'El registro aún no está disponible. Te notificaremos cuando podamos crear tu cuenta.'
          })
        }
      } else {
        setMessage({
          type: 'error',
          text: data.error || 'Error al crear la cuenta'
        })
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Error de conexión. Inténtalo de nuevo.'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-header">
          <h1>🚀 Accede a LinkedAI</h1>
          <p>Crea tu cuenta para comenzar a usar la IA que revoluciona LinkedIn</p>
        </div>

        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label htmlFor="email">Email de invitación</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="tu@email.com"
              required
              className={isValidEmail ? 'valid' : email ? 'invalid' : ''}
            />
            {isValidEmail && (
              <div className="email-status valid">
                ✅ Email verificado
              </div>
            )}
            {email && !isValidEmail && (
              <div className="email-status invalid">
                ❌ Email no encontrado en nuestra lista
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="nombre">Nombre completo</label>
            <input
              type="text"
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Tu nombre completo"
              required
              disabled={!isValidEmail}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mínimo 6 caracteres"
              required
              disabled={!isValidEmail || !isAuthorized}
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmar contraseña</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Repite tu contraseña"
              required
              disabled={!isValidEmail || !isAuthorized}
            />
          </div>

          {isAuthorized ? (
            <button 
              type="submit" 
              className="register-btn"
              disabled={loading || !isValidEmail}
            >
              {loading ? '🔄 Creando cuenta...' : `🚀 Crear cuenta ${assignedPlan ? `(${assignedPlan.toUpperCase()})` : ''}`}
            </button>
          ) : (
            <>
              <button 
                type="button" 
                className="register-btn coming-soon"
                disabled={true}
              >
                🚀 Próximamente Disponible
              </button>
              
              <div className="coming-soon-info">
                <p>📅 <strong>Estado:</strong> {isValidEmail ? 'Email verificado, esperando autorización' : 'Verifica tu email primero'}</p>
                <p>📧 Te notificaremos por email cuando puedas crear tu cuenta</p>
                <p>🎯 Solo los usuarios autorizados podrán acceder</p>
              </div>
            </>
          )}
        </form>

        {message && (
          <div className={`message ${message.type}`}>
            {message.text}
          </div>
        )}

        <div className="register-footer">
          <p>¿No tienes invitación? <a href="/">Regístrate en la landing</a></p>
          <p>¿Ya tienes cuenta? <a href="/login">Inicia sesión</a></p>
        </div>
      </div>
    </div>
  )
}
