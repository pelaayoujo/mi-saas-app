"use client"
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function ManageTokens() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [searchEmail, setSearchEmail] = useState('')
  const [userUsage, setUserUsage] = useState(null)
  const [action, setAction] = useState('add')
  const [amount, setAmount] = useState('')
  const [reason, setReason] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [userPlan, setUserPlan] = useState(null)

  // Verificar autenticación y permisos admin
  useEffect(() => {
    if (status === 'loading') return
    
    if (!session) {
      router.push('/login')
      return
    }
    
    if (session.user.plan !== 'admin' && session.user.email !== 'user@test.com') {
      router.push('/dashboard')
      return
    }
  }, [session, status, router])

  if (status === 'loading') {
    return <div className="dashboard"><div className="loading">Cargando...</div></div>
  }

  if (!session || (session.user.plan !== 'admin' && session.user.email !== 'user@test.com')) {
    return null
  }

  const searchUser = async () => {
    if (!searchEmail.trim()) return

    setIsLoading(true)
    try {
      const response = await fetch(`/api/admin/manage-user-tokens?email=${encodeURIComponent(searchEmail.trim())}`)
      const data = await response.json()

      if (data.success) {
        setUserUsage(data.userUsage)
        
        // También obtener información del plan del usuario
        try {
          const statsResponse = await fetch('/api/user/stats')
          const statsData = await statsResponse.json()
          if (statsData.success && statsData.email === searchEmail.trim()) {
            setUserPlan(statsData)
          }
        } catch (error) {
          console.log('No se pudo obtener info del plan')
        }
        
        setMessage('')
      } else {
        setMessage(`Error: ${data.error}`)
        setUserUsage(null)
      }
    } catch (error) {
      setMessage('Error al buscar usuario')
      setUserUsage(null)
    } finally {
      setIsLoading(false)
    }
  }

  const manageTokens = async () => {
    if (!searchEmail.trim() || !amount) return

    setIsLoading(true)
    try {
      const response = await fetch('/api/admin/manage-user-tokens', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: searchEmail.trim(),
          action,
          amount: parseInt(amount),
          reason: reason.trim()
        })
      })

      const data = await response.json()

      if (data.success) {
        setMessage(`✅ ${data.message}`)
        // Actualizar la información del usuario
        searchUser()
        setAmount('')
        setReason('')
      } else {
        setMessage(`❌ Error: ${data.error}`)
      }
    } catch (error) {
      setMessage('Error al procesar la solicitud')
    } finally {
      setIsLoading(false)
    }
  }

  const getAvailableTokens = () => {
    if (!userUsage || !userPlan) return 'N/A'
    
    const tokenLimit = userPlan.plan === 'trial' ? '3 artículos' : 
                      userPlan.limits?.tokensPerMonth || 'N/A'
    
    return `${userUsage.tokensUsed || 0} / ${tokenLimit}`
  }

  return (
    <div className="dashboard">
      <div className="dashboard-layout">
        <main className="main-content">
          <div className="content-container">
            <div className="content-title">
              <h1>Gestionar Tokens de Usuarios</h1>
              <p>Administra los límites de tokens y créditos de los usuarios</p>
            </div>

            <div className="admin-section">
              <div className="admin-card">
                <h2>Buscar Usuario</h2>
                <div className="form-group">
                  <input
                    type="email"
                    placeholder="Email del usuario"
                    value={searchEmail}
                    onChange={(e) => setSearchEmail(e.target.value)}
                    className="form-input"
                    onKeyPress={(e) => e.key === 'Enter' && searchUser()}
                  />
                  <button 
                    onClick={searchUser}
                    disabled={isLoading}
                    className="btn-primary"
                  >
                    {isLoading ? 'Buscando...' : 'Buscar'}
                  </button>
                </div>
              </div>

              {userUsage && (
                <div className="admin-card">
                  <h2>Información del Usuario</h2>
                  <div className="user-info">
                    <p><strong>Email:</strong> {searchEmail}</p>
                    <p><strong>Plan:</strong> {userPlan?.planName || 'N/A'}</p>
                    <p><strong>Tokens usados este mes:</strong> {userUsage.tokensUsed || 0}</p>
                    <p><strong>Artículos generados:</strong> {userUsage.articlesGenerated || 0}</p>
                    <p><strong>Límite disponible:</strong> {getAvailableTokens()}</p>
                  </div>

                  <div className="token-management">
                    <h3>Gestionar Tokens</h3>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Acción:</label>
                        <select 
                          value={action} 
                          onChange={(e) => setAction(e.target.value)}
                          className="form-select"
                        >
                          <option value="add">Dar más tokens (reducir uso)</option>
                          <option value="set">Establecer tokens usados</option>
                          <option value="reset">Resetear uso a 0</option>
                        </select>
                      </div>
                      
                      <div className="form-group">
                        <label>
                          {action === 'add' ? 'Tokens a dar' : 
                           action === 'set' ? 'Tokens usados a establecer' : 
                           'No aplica'}
                        </label>
                        <input
                          type="number"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          className="form-input"
                          disabled={action === 'reset'}
                          min="0"
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Razón (opcional):</label>
                      <input
                        type="text"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        placeholder="Ej: Usuario reportó problema, bonificación, etc."
                        className="form-input"
                      />
                    </div>

                    <button 
                      onClick={manageTokens}
                      disabled={isLoading || (action !== 'reset' && !amount)}
                      className="btn-primary"
                    >
                      {isLoading ? 'Procesando...' : 'Aplicar Cambios'}
                    </button>
                  </div>
                </div>
              )}

              {message && (
                <div className={`message ${message.includes('✅') ? 'success' : 'error'}`}>
                  {message}
                </div>
              )}

              <div className="admin-help">
                <h3>Instrucciones:</h3>
                <ul>
                  <li><strong>Dar más tokens:</strong> Reduce los tokens usados (ej: dar 1000 tokens = restar 1000 del uso actual)</li>
                  <li><strong>Establecer tokens usados:</strong> Define exactamente cuántos tokens se han usado</li>
                  <li><strong>Resetear:</strong> Pone el contador de tokens usados en 0</li>
                </ul>
                <p><em>Los cambios se aplican inmediatamente al usuario.</em></p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
