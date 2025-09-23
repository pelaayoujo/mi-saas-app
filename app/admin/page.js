"use client"
import { useState, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import './admin.css'

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  // Verificar autenticación y rol de admin
  useEffect(() => {
    if (status === 'loading') return // Aún cargando
    
    if (!session) {
      router.push('/login')
      return
    }

    if (session.user.role !== 'admin') {
      router.push('/dashboard')
      return
    }

    setLoading(false)
  }, [session, status, router])

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="loading-spinner"></div>
        <p>Cargando panel de administración...</p>
      </div>
    )
  }

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <header className="admin-header">
        <div className="header-content">
          <div className="admin-info">
            <h1>Panel de Administración</h1>
            <p>Bienvenido, {session.user.name}</p>
          </div>
          <div className="admin-actions">
            <button 
              className="logout-button"
              onClick={() => signOut({ callbackUrl: '/' })}
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="admin-nav">
        <Link href="/admin/leads" className="nav-card">
          <div className="nav-icon">👥</div>
          <div className="nav-content">
            <h3>Gestión de Leads</h3>
            <p>Administrar lista de espera y leads</p>
          </div>
        </Link>
        
        <Link href="/admin/registration" className="nav-card">
          <div className="nav-icon">📝</div>
          <div className="nav-content">
            <h3>Configuración de Registro</h3>
            <p>Activar/desactivar registro de usuarios</p>
          </div>
        </Link>
        
        <div className="nav-card">
          <div className="nav-icon">📊</div>
          <div className="nav-content">
            <h3>Estadísticas</h3>
            <p>Analytics y métricas del sistema</p>
          </div>
        </div>
        
        <div className="nav-card">
          <div className="nav-icon">⚙️</div>
          <div className="nav-content">
            <h3>Configuración</h3>
            <p>Ajustes generales del sistema</p>
          </div>
        </div>
      </nav>

      {/* Quick Stats */}
      <div className="admin-stats">
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <div className="stat-number">0</div>
            <div className="stat-label">Total Leads</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <div className="stat-number">0</div>
            <div className="stat-label">Usuarios Registrados</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⏳</div>
          <div className="stat-content">
            <div className="stat-number">0</div>
            <div className="stat-label">En Lista de Espera</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📈</div>
          <div className="stat-content">
            <div className="stat-number">0</div>
            <div className="stat-label">Crecimiento</div>
          </div>
        </div>
      </div>
    </div>
  )
}



