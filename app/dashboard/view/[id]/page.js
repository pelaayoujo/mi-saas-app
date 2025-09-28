"use client"
import { useState, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter, useParams } from 'next/navigation'
import '../../dashboard.css'

export default function ViewContent() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const params = useParams()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [content, setContent] = useState(null)
  const [loading, setLoading] = useState(true)

  // Mock data - En el futuro esto vendrá de la base de datos
  const contentItems = [
    {
      id: 1,
      type: 'article',
      title: 'Marketing Digital 2024: Estrategias que Funcionan',
      preview: 'En el mundo del marketing digital, las tendencias evolucionan constantemente. Este artículo explora las estrategias más efectivas para 2024...',
      content: `# Marketing Digital 2024: Estrategias que Funcionan

En el mundo del marketing digital, las tendencias evolucionan constantemente. Este artículo explora las estrategias más efectivas para 2024, desde la personalización hasta el uso de la inteligencia artificial.

## 1. Personalización Avanzada

La personalización ya no es solo una opción, es una necesidad. Los consumidores esperan experiencias únicas y relevantes.

### Técnicas de Personalización:
- Segmentación basada en comportamiento
- Contenido dinámico
- Recomendaciones inteligentes

## 2. Inteligencia Artificial en Marketing

La IA está revolucionando cómo las empresas se conectan con sus audiencias.

### Aplicaciones Prácticas:
- Chatbots inteligentes
- Análisis predictivo
- Automatización de campañas

## 3. Marketing de Contenidos Evolucionado

El contenido sigue siendo el rey, pero ahora debe ser más estratégico y medible.

### Estrategias Efectivas:
- Storytelling auténtico
- Contenido interactivo
- Micro-momentos

## Conclusión

El marketing digital en 2024 requiere una combinación de tecnología avanzada y creatividad humana. Las empresas que logren este equilibrio serán las que destaquen en el mercado.`,
      wordCount: 650,
      createdAt: '2024-01-15T10:30:00Z',
      status: 'published',
      tags: ['marketing', 'digital', 'estrategias']
    },
    {
      id: 2,
      type: 'post',
      title: '5 Consejos para Mejorar tu LinkedIn',
      preview: '¿Quieres optimizar tu perfil de LinkedIn? Aquí tienes 5 consejos prácticos que te ayudarán a destacar...',
      content: `🚀 5 Consejos para Mejorar tu LinkedIn

1️⃣ **Optimiza tu foto de perfil**
   - Usa una foto profesional y clara
   - Sonríe y mantén contacto visual
   - Evita fotos grupales o selfies

2️⃣ **Escribe un headline atractivo**
   - Ve más allá de tu título actual
   - Incluye tu valor único
   - Usa palabras clave relevantes

3️⃣ **Crea un resumen impactante**
   - Cuenta tu historia profesional
   - Destaca logros específicos
   - Incluye una llamada a la acción

4️⃣ **Mantén tu perfil actualizado**
   - Añade nuevas habilidades
   - Actualiza experiencias recientes
   - Solicita recomendaciones

5️⃣ **Sé activo en la plataforma**
   - Comparte contenido relevante
   - Comenta en publicaciones
   - Conecta con profesionales de tu sector

¿Qué consejo te ha funcionado mejor? ¡Comparte tu experiencia! 👇

#LinkedIn #Networking #DesarrolloProfesional #Carrera`,
      wordCount: 280,
      createdAt: '2024-01-14T15:45:00Z',
      status: 'published',
      tags: ['linkedin', 'optimización', 'perfil']
    },
    {
      id: 3,
      type: 'biography',
      title: 'Biografía Profesional - Juan Pérez',
      preview: 'Experto en marketing digital con más de 8 años de experiencia ayudando a empresas a crecer en el mundo digital...',
      content: `**Juan Pérez**
*Especialista en Marketing Digital y Growth Hacking*

Con más de 8 años de experiencia en el sector digital, Juan ha ayudado a más de 50 empresas a transformar su presencia online y aumentar sus ingresos en un promedio del 300%.

**Experiencia Clave:**
• Director de Marketing Digital en TechCorp (2020-2024)
• Consultor Senior en DigitalGrowth (2018-2020)
• Especialista en SEM en MarketingPro (2016-2018)

**Logros Destacados:**
🏆 Incrementó el tráfico orgánico en un 450% para clientes B2B
🏆 Desarrolló estrategias que generaron $2M+ en ventas
🏆 Certificado Google Ads y Facebook Blueprint

**Especialidades:**
- SEO/SEM y Marketing de Contenidos
- Growth Hacking y Conversión
- Automatización de Marketing
- Análisis de Datos y ROI

**Educación:**
MBA en Marketing Digital - Universidad de Barcelona
Certificación en Growth Hacking - Growth Tribe

Apasionado por la innovación y el crecimiento sostenible. Siempre buscando nuevos desafíos que me permitan crear impacto real en el mundo digital.

📧 juan.perez@email.com
🌐 linkedin.com/in/juanperez
📱 +34 600 123 456`,
      wordCount: 420,
      createdAt: '2024-01-13T09:15:00Z',
      status: 'published',
      tags: ['biografía', 'profesional', 'marketing']
    },
    {
      id: 4,
      type: 'article',
      title: 'El Futuro del Trabajo Remoto',
      preview: 'El trabajo remoto ha transformado la forma en que trabajamos. Analizamos las tendencias y el futuro de esta modalidad...',
      content: `# El Futuro del Trabajo Remoto

El trabajo remoto ha transformado la forma en que trabajamos. Analizamos las tendencias y el futuro de esta modalidad que llegó para quedarse.

## Introducción

La pandemia aceleró una transformación que ya estaba en marcha. El trabajo remoto no es solo una tendencia temporal, sino un cambio estructural en cómo entendemos el trabajo.

## Beneficios del Trabajo Remoto

### Para los Empleados
- Mayor flexibilidad horaria
- Mejor equilibrio trabajo-vida
- Reducción de costos de transporte
- Mayor productividad en muchos casos

### Para las Empresas
- Reducción de costos de oficina
- Acceso a talento global
- Mayor retención de empleados
- Menor absentismo

## Desafíos y Soluciones

### Desafíos Principales
- Comunicación y colaboración
- Gestión de equipos distribuidos
- Mantenimiento de la cultura empresarial
- Seguridad de datos

### Soluciones Tecnológicas
- Herramientas de videoconferencia
- Plataformas de colaboración
- Software de gestión de proyectos
- Sistemas de seguridad avanzados

## Tendencias Futuras

### Modelos Híbridos
La mayoría de empresas adoptarán modelos híbridos que combinen trabajo presencial y remoto.

### Tecnologías Emergentes
- Realidad virtual para reuniones
- IA para gestión de equipos
- Herramientas de productividad avanzadas

## Conclusión

El trabajo remoto llegó para quedarse. Las empresas que se adapten mejor a esta nueva realidad tendrán ventajas competitivas significativas.`,
      wordCount: 780,
      createdAt: '2024-01-12T14:20:00Z',
      status: 'draft',
      tags: ['trabajo', 'remoto', 'futuro']
    },
    {
      id: 5,
      type: 'email',
      title: 'Email de Seguimiento - Propuesta Comercial',
      preview: 'Estimado cliente, agradezco la oportunidad de presentar nuestra propuesta. Adjunto encontrará los detalles...',
      content: `Asunto: Seguimiento de Propuesta - [Nombre del Proyecto]

Estimado/a [Nombre del Cliente],

Espero que este correo le encuentre muy bien.

Quería hacer un seguimiento de la propuesta que le envié el [Fecha] para el proyecto [Nombre del Proyecto]. 

**Resumen de la Propuesta:**
• Alcance: [Descripción breve del proyecto]
• Inversión: €[Cantidad]
• Tiempo de entrega: [X semanas/meses]
• Beneficios esperados: [Lista de beneficios]

**Próximos Pasos:**
1. Revisión de la propuesta
2. Aclaración de dudas
3. Firma del contrato
4. Inicio del proyecto

Me gustaría programar una breve llamada de 15 minutos para:
- Resolver cualquier pregunta que pueda tener
- Ajustar detalles si es necesario
- Definir el cronograma de trabajo

¿Le vendría bien [Día] a las [Hora]? Si no, puedo adaptarme a su disponibilidad.

También adjunto algunos casos de éxito similares que podrían ser de su interés.

Quedo a la espera de sus comentarios.

Un cordial saludo,

[Nombre]
[Teléfono]
[Email]
[Empresa]

P.D.: Si prefiere que le llame directamente, no dude en indicármelo.`,
      wordCount: 320,
      createdAt: '2024-01-11T11:30:00Z',
      status: 'sent',
      tags: ['email', 'seguimiento', 'comercial']
    },
    {
      id: 6,
      type: 'presentation',
      title: 'Presentación: Tendencias de Marketing Digital 2024',
      preview: 'Una presentación completa sobre las principales tendencias en marketing digital para 2024, incluyendo IA, personalización y nuevas plataformas...',
      content: `# Tendencias de Marketing Digital 2024

## Slide 1: Portada
**Tendencias de Marketing Digital 2024**
*Preparado para: [Nombre de la Empresa]*
*Fecha: [Fecha]*
*Por: [Tu Nombre]*

## Slide 2: Agenda
1. **Personalización Avanzada**
2. **Inteligencia Artificial**
3. **Marketing de Contenidos Evolucionado**
4. **Nuevas Plataformas Sociales**
5. **Privacidad y Transparencia**
6. **Automatización Inteligente**

## Slide 3: Personalización Avanzada
- **Realidad**: 80% de consumidores esperan experiencias personalizadas
- **Técnicas**: Segmentación, contenido dinámico, recomendaciones
- **Herramientas**: CRM avanzados, plataformas de personalización
- **Resultado**: +20% en conversiones

## Slide 4: Inteligencia Artificial
- **Chatbots Inteligentes**: 24/7 atención al cliente
- **Análisis Predictivo**: Anticipar necesidades
- **Automatización**: Campañas optimizadas automáticamente
- **ROI**: Reducción del 40% en costos operativos

## Slide 5: Marketing de Contenidos
- **Storytelling Auténtico**: Historias que conectan
- **Contenido Interactivo**: Videos, encuestas, quizzes
- **Micro-momentos**: Contenido para cada etapa del customer journey
- **Métricas**: Engagement, no solo alcance

## Slide 6: Nuevas Plataformas
- **TikTok Business**: Para audiencias jóvenes
- **LinkedIn**: B2B más fuerte que nunca
- **Clubhouse**: Networking de voz
- **Estrategia**: Diversificar presencia

## Slide 7: Privacidad y Transparencia
- **Cookies Third-Party**: Desaparición gradual
- **First-Party Data**: Más valioso que nunca
- **Transparencia**: Comunicación clara sobre datos
- **Compliance**: GDPR, CCPA, futuras regulaciones

## Slide 8: Automatización Inteligente
- **Email Marketing**: Secuencias personalizadas
- **Social Media**: Publicación automática optimizada
- **Lead Nurturing**: Scoring y seguimiento automático
- **Eficiencia**: +60% en productividad del equipo

## Slide 9: Casos de Éxito
**Empresa A**: +300% en leads cualificados
**Empresa B**: -50% en costos de adquisición
**Empresa C**: +150% en engagement social

## Slide 10: Recomendaciones
1. **Audita** tu estrategia actual
2. **Prioriza** las tendencias relevantes
3. **Experimenta** con nuevas herramientas
4. **Mide** resultados constantemente
5. **Adapta** según los datos

## Slide 11: Próximos Pasos
- **Q1**: Implementar personalización básica
- **Q2**: Integrar herramientas de IA
- **Q3**: Optimizar contenido interactivo
- **Q4**: Evaluar y escalar

## Slide 12: Preguntas y Respuestas
*¿Tienen alguna pregunta sobre estas tendencias?*

**Contacto:**
[Email] | [Teléfono] | [LinkedIn]`,
      wordCount: 780,
      createdAt: '2024-01-12T14:20:00Z',
      status: 'draft',
      tags: ['presentación', 'marketing', 'tendencias']
    },
    {
      id: 7,
      type: 'proposal',
      title: 'Propuesta Comercial: Servicios de Marketing Digital',
      preview: 'Propuesta detallada para servicios integrales de marketing digital, incluyendo estrategia, implementación y seguimiento...',
      content: `# PROPUESTA COMERCIAL
## Servicios Integrales de Marketing Digital

**Para:** [Nombre de la Empresa]
**Fecha:** [Fecha]
**Válida hasta:** [Fecha + 30 días]
**Preparado por:** [Tu Nombre/Empresa]

---

## RESUMEN EJECUTIVO

Proponemos una estrategia integral de marketing digital diseñada específicamente para [Nombre de la Empresa] que incluye:

- **Análisis y Estrategia**: Auditoría completa y plan estratégico
- **Implementación**: Desarrollo y ejecución de campañas
- **Seguimiento**: Monitoreo y optimización continua
- **ROI Esperado**: Incremento del 200-300% en leads cualificados

---

## SITUACIÓN ACTUAL

### Análisis de la Competencia
- [Análisis específico de competidores]
- [Oportunidades identificadas]
- [Amenazas detectadas]

### Estado del Marketing Digital
- **Presencia Online**: [Evaluación actual]
- **SEO**: [Posicionamiento actual]
- **Social Media**: [Presencia y engagement]
- **Conversiones**: [Tasa actual de conversión]

---

## PROPUESTA DE VALOR

### 1. ESTRATEGIA Y PLANIFICACIÓN
**Duración:** 2-3 semanas
**Entregables:**
- Auditoría completa de marketing digital
- Plan estratégico personalizado
- Cronograma de implementación
- KPIs y métricas de seguimiento

**Inversión:** €2,500

### 2. IMPLEMENTACIÓN Y DESARROLLO
**Duración:** 8-12 semanas
**Servicios Incluidos:**
- Optimización SEO técnica y de contenido
- Desarrollo de estrategia de contenidos
- Configuración de herramientas de marketing
- Creación de landing pages optimizadas
- Setup de automatizaciones

**Inversión:** €8,500

### 3. GESTIÓN Y OPTIMIZACIÓN
**Duración:** 6 meses (renovable)
**Servicios Incluidos:**
- Gestión diaria de campañas
- Creación de contenido regular
- Análisis y reportes mensuales
- Optimización continua
- Soporte técnico

**Inversión:** €3,500/mes

---

## CRONOGRAMA DE TRABAJO

### Fase 1: Análisis y Estrategia (Semanas 1-3)
- Semana 1: Auditoría completa
- Semana 2: Desarrollo de estrategia
- Semana 3: Presentación y aprobación

### Fase 2: Implementación (Semanas 4-15)
- Semanas 4-6: Setup técnico y herramientas
- Semanas 7-12: Desarrollo de contenido y campañas
- Semanas 13-15: Testing y optimización inicial

### Fase 3: Gestión Continua (Meses 4-9)
- Gestión diaria de campañas
- Reportes mensuales
- Optimización continua

---

## INVERSIÓN TOTAL

### Opción 1: Implementación Completa
- **Estrategia y Planificación:** €2,500
- **Implementación:** €8,500
- **Gestión 6 meses:** €21,000
- **TOTAL:** €32,000

### Opción 2: Solo Implementación
- **Estrategia y Planificación:** €2,500
- **Implementación:** €8,500
- **TOTAL:** €11,000

### Opción 3: Solo Gestión
- **Setup inicial:** €3,000
- **Gestión 6 meses:** €21,000
- **TOTAL:** €24,000

---

## GARANTÍAS Y COMPROMISOS

### Garantías
- **ROI Mínimo**: 150% en 6 meses
- **Leads Cualificados**: +200% en 3 meses
- **Soporte**: Disponible 24/7 para emergencias

### Compromisos
- Reportes mensuales detallados
- Reuniones de seguimiento quincenales
- Transparencia total en métricas
- Flexibilidad para ajustes

---

## PRÓXIMOS PASOS

1. **Revisión de Propuesta** (Esta semana)
2. **Llamada de Aclaración** (Si es necesario)
3. **Firma de Contrato** (Próxima semana)
4. **Kick-off Meeting** (Inicio del proyecto)

---

## CONTACTO

**Responsable del Proyecto:**
[Nombre]
[Email]
[Teléfono]
[LinkedIn]

**Empresa:**
[Nombre de la Empresa]
[Dirección]
[Web]

---

*Esta propuesta es válida por 30 días a partir de la fecha de emisión.*

**¡Esperamos trabajar juntos para hacer crecer su negocio!**`,
      wordCount: 1200,
      createdAt: '2024-01-10T16:45:00Z',
      status: 'draft',
      tags: ['propuesta', 'comercial', 'marketing digital']
    }
  ]

  useEffect(() => {
    if (params.id) {
      const foundContent = contentItems.find(item => item.id === parseInt(params.id))
      setContent(foundContent)
      setLoading(false)
    }
  }, [params.id])

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

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  // Verificar autenticación
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

  if (loading) {
    return (
      <div className="dashboard">
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Cargando contenido...</p>
        </div>
      </div>
    )
  }

  if (!content) {
    return (
      <div className="dashboard">
        <div className="loading">
          <p>Contenido no encontrado</p>
          <button className="btn-primary" onClick={() => router.push('/dashboard/content')}>
            Volver al listado
          </button>
        </div>
      </div>
    )
  }

  const typeInfo = getTypeInfo(content.type)

  return (
    <div className="dashboard">
      {/* Header Fijo */}
      <header className="header">
        <div className="header-left">
          <button 
            className="menu-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
          <h1>Visualizar Contenido</h1>
        </div>
        <div className="header-right">
          <span className="user-info">
            {session.user.name} ({session.user.role})
          </span>
        </div>
      </header>

      <div className="dashboard-layout">
        {/* Sidebar */}
        <aside className={`sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
          <nav className="sidebar-nav">
            {/* Menú Principal */}
            <div className="nav-section">
              <a href="/dashboard" className="nav-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9,22 9,12 15,12 15,22"></polyline>
                </svg>
                <span className="nav-label">Inicio</span>
              </a>
              
              <a href="/dashboard/tools" className="nav-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
                </svg>
                <span className="nav-label">Herramientas</span>
              </a>
              
              <a href="/dashboard/content" className="nav-item active">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14,2 14,8 20,8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10,9 9,9 8,9"></polyline>
                </svg>
                <span className="nav-label">Contenido Generado</span>
              </a>
              
              <a href="/dashboard/create" className="nav-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 20h9"></path>
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                </svg>
                <span className="nav-label">Generador de Artículos</span>
              </a>
              
              <a href="/dashboard/schedule" className="nav-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
          <div className="content-viewer">
            {/* Header del Contenido */}
            <div className="content-header">
              <div className="content-meta">
                <div className="content-type-badge" style={{ backgroundColor: typeInfo.color }}>
                  <span className="type-icon">{typeInfo.icon}</span>
                  <span className="type-label">{typeInfo.label}</span>
                </div>
                <div className="content-status">
                  <span className="status-badge" style={{ 
                    backgroundColor: content.status === 'published' ? '#28a745' : 
                                     content.status === 'draft' ? '#ffc107' : 
                                     content.status === 'sent' ? '#0077B5' : 
                                     '#6c757d',
                    color: 'white'
                  }}>
                    {content.status === 'published' ? 'Publicado' : 
                     content.status === 'draft' ? 'Borrador' : 
                     content.status === 'sent' ? 'Enviado' : 
                     'Desconocido'}
                  </span>
                </div>
              </div>
              
              <div className="content-actions">
                <button 
                  className="btn-secondary"
                  onClick={() => router.push('/dashboard/editor')}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 20h9"></path>
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                  </svg>
                  Editar
                </button>
                <button 
                  className="btn-primary"
                  onClick={() => router.push('/dashboard/content')}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z"></path>
                    <polyline points="21,6 12,13 3,6"></polyline>
                  </svg>
                  Volver
                </button>
              </div>
            </div>

            {/* Título */}
            <h1 className="content-title">{content.title}</h1>

            {/* Metadatos */}
            <div className="content-details">
              <div className="detail-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14,2 14,8 20,8"></polyline>
                </svg>
                <span>{content.wordCount} palabras</span>
              </div>
              <div className="detail-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <span>{formatDate(content.createdAt)}</span>
              </div>
              <div className="content-tags">
                {content.tags.map(tag => (
                  <span key={tag} className="content-tag">#{tag}</span>
                ))}
              </div>
            </div>

            {/* Contenido */}
            <div className="content-body">
              <pre className="content-text">{content.content}</pre>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
