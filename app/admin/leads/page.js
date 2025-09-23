"use client"
import { useState, useEffect } from 'react'
import './dashboard.css'

export default function AdminLeads() {
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filters, setFilters] = useState({
    nicho: '',
    limit: 20
  })
  const [stats, setStats] = useState({
    total: 0,
    nuevos: 0,
    porNicho: {}
  })

  const fetchLeads = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (filters.nicho) params.append('nicho', filters.nicho)
      if (filters.limit) params.append('limit', filters.limit)
      
      const response = await fetch(`/api/leads?${params}`)
      const data = await response.json()
      
      if (data.success) {
        setLeads(data.leads)
        setError(null)
      } else {
        setError(data.error)
      }
    } catch (err) {
      setError('Error al cargar los leads')
    } finally {
      setLoading(false)
    }
  }

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/leads?limit=1000')
      const data = await response.json()
      
      if (data.success) {
        const total = data.leads.length
        const nuevos = data.leads.filter(lead => {
          const fecha = new Date(lead.fecha)
          const hoy = new Date()
          const diffTime = Math.abs(hoy - fecha)
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
          return diffDays <= 7
        }).length
        
        const porNicho = data.leads.reduce((acc, lead) => {
          const nicho = lead.nicho || 'Sin especificar'
          acc[nicho] = (acc[nicho] || 0) + 1
          return acc
        }, {})
        
        setStats({ total, nuevos, porNicho })
      }
    } catch (err) {
      console.error('Error al cargar estadísticas:', err)
    }
  }

  useEffect(() => {
    fetchLeads()
    fetchStats()
  }, [filters])

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const exportToCSV = () => {
    const csvContent = [
      ['Nombre', 'Email', 'Nicho', 'Fecha', 'Status'],
      ...leads.map(lead => [
        lead.nombre,
        lead.email,
        lead.nicho || 'Sin especificar',
        new Date(lead.fecha).toLocaleDateString('es-ES'),
        lead.status
      ])
    ].map(row => row.map(field => `"${field}"`).join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `leads-${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Dashboard de Leads</h1>
        <div className="header-actions">
          <button onClick={exportToCSV} className="btn-export">
            📊 Exportar CSV
          </button>
          <button onClick={() => { fetchLeads(); fetchStats(); }} className="btn-refresh">
            🔄 Actualizar
          </button>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <div className="stat-number">{stats.total}</div>
            <div className="stat-label">Total Leads</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🆕</div>
          <div className="stat-content">
            <div className="stat-number">{stats.nuevos}</div>
            <div className="stat-label">Nuevos (7 días)</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📈</div>
          <div className="stat-content">
            <div className="stat-number">{Object.keys(stats.porNicho).length}</div>
            <div className="stat-label">Nichos Únicos</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="filters-section">
        <div className="filter-group">
          <label htmlFor="nicho-filter">Filtrar por nicho:</label>
          <select
            id="nicho-filter"
            value={filters.nicho}
            onChange={(e) => handleFilterChange('nicho', e.target.value)}
          >
            <option value="">Todos los nichos</option>
            {Object.keys(stats.porNicho).map(nicho => (
              <option key={nicho} value={nicho}>
                {nicho} ({stats.porNicho[nicho]})
              </option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label htmlFor="limit-filter">Mostrar:</label>
          <select
            id="limit-filter"
            value={filters.limit}
            onChange={(e) => handleFilterChange('limit', parseInt(e.target.value))}
          >
            <option value={10}>10 leads</option>
            <option value={20}>20 leads</option>
            <option value={50}>50 leads</option>
            <option value={100}>100 leads</option>
          </select>
        </div>
      </div>

      {/* Leads Table */}
      <div className="table-container">
        {loading ? (
          <div className="loading">Cargando leads...</div>
        ) : error ? (
          <div className="error">Error: {error}</div>
        ) : (
          <table className="leads-table">
            <thead>
              <tr>
                <th>Posición</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Nicho</th>
                <th>Fecha</th>
                <th>Status</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {leads.length === 0 ? (
                <tr>
                  <td colSpan="7" className="no-data">
                    No se encontraron leads
                  </td>
                </tr>
              ) : (
                leads.map((lead, index) => (
                  <tr key={lead.id}>
                    <td className="lead-position">
                      <span className={`position-badge ${index < 1000 ? 'top-1000' : 'waitlist'}`}>
                        {index + 1}
                      </span>
                    </td>
                    <td className="lead-name">{lead.nombre}</td>
                    <td className="lead-email">
                      <a href={`mailto:${lead.email}`}>{lead.email}</a>
                    </td>
                    <td className="lead-nicho">
                      {lead.nicho || <span className="no-nicho">Sin especificar</span>}
                    </td>
                    <td className="lead-date">{formatDate(lead.fecha)}</td>
                    <td className="lead-status">
                      <span className={`status-badge status-${lead.status}`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="lead-actions">
                      <button 
                        className="btn-action"
                        onClick={() => window.open(`mailto:${lead.email}?subject=Hola ${lead.nombre}`)}
                      >
                        📧 Email
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Nicho Distribution */}
      {Object.keys(stats.porNicho).length > 0 && (
        <div className="nicho-distribution">
          <h3>Distribución por Nicho</h3>
          <div className="nicho-chart">
            {Object.entries(stats.porNicho)
              .sort(([,a], [,b]) => b - a)
              .map(([nicho, count]) => (
                <div key={nicho} className="nicho-item">
                  <div className="nicho-name">{nicho}</div>
                  <div className="nicho-bar">
                    <div 
                      className="nicho-fill" 
                      style={{ 
                        width: `${(count / stats.total) * 100}%` 
                      }}
                    ></div>
                  </div>
                  <div className="nicho-count">{count}</div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  )
}
