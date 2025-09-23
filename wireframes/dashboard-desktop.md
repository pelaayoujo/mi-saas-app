# Dashboard Desktop Wireframe

## Layout Structure
```
┌─────────────────────────────────────────────────────────────────────────────┐
│ [Logo] LinkedAI                    [🔍 Search]              [👤 Ana Pérez] │
├─────────────────────────────────────────────────────────────────────────────┤
│ Sidebar │                    Main Content Area                              │
│         │                                                                   │
│ 📊 Dashboard │  ┌─────────────────────────────────────────────────────────┐ │
│ ✏️ Crear     │  │                    Dashboard                            │ │
│ 📅 Calendario│  │                                                         │ │
│ 📈 Analytics │  │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐      │ │
│ ⚙️ Config    │  │  │   Artículos │  │ Impresiones │  │ Engagement  │      │ │
│              │  │  │     25      │  │   12,500    │  │    4.2%     │      │ │
│              │  │  └─────────────┘ └─────────────┘ └─────────────┘      │ │
│              │  │                                                         │ │
│              │  │  ┌─────────────────────────────────────────────────┐   │ │
│              │  │  │              [Crear Artículo]                   │   │ │
│              │  │  └─────────────────────────────────────────────────┘   │ │
│              │  │                                                         │ │
│              │  │  Artículos Recientes                                   │ │
│              │  │  ┌─────────────────────────────────────────────────┐   │ │
│              │  │  │ 📝 Cómo mejorar tu marca personal               │   │ │
│              │  │  │    Borrador • 450 palabras • Hace 2 horas      │   │ │
│              │  │  │    [Editar] [Programar] [Eliminar]              │   │ │
│              │  │  └─────────────────────────────────────────────────┘   │ │
│              │  │                                                         │ │
│              │  │  ┌─────────────────────────────────────────────────┐   │ │
│              │  │  │ 📅 5 estrategias de networking efectivas       │   │ │
│              │  │  │    Programado • 600 palabras • 20 Ene 09:00    │   │ │
│              │  │  │    [Editar] [Reprogramar] [Cancelar]            │   │ │
│              │  │  └─────────────────────────────────────────────────┘   │ │
│              │  │                                                         │ │
│              │  │  ┌─────────────────────────────────────────────────┐   │ │
│              │  │  │ ✅ Los secretos del LinkedIn que nadie te cuenta │   │ │
│              │  │  │    Publicado • 380 palabras • 15 Ene 14:30     │   │ │
│              │  │  │    [Ver Analytics] [Editar] [Archivar]          │   │ │
│              │  │  └─────────────────────────────────────────────────┘   │ │
│              │  └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Component Specifications

### Header/Navbar
- **Height:** 64px
- **Background:** White with subtle shadow
- **Logo:** Left-aligned, LinkedIn blue (#0077B5)
- **Search:** Center, placeholder "Buscar artículos..."
- **User Menu:** Right-aligned with avatar and dropdown

### Sidebar
- **Width:** 240px
- **Background:** #F9FAFB
- **Navigation Items:**
  - Dashboard (active state)
  - Crear artículo
  - Calendario
  - Analytics
  - Configuración
- **Icons:** 20px, LinkedIn blue for active, gray for inactive

### Main Content Area
- **Padding:** 24px
- **Background:** White

### Stats Cards
- **Layout:** 3-column grid
- **Card Size:** 200px width, 120px height
- **Background:** White with subtle border
- **Border Radius:** 12px
- **Shadow:** Subtle drop shadow
- **Content:**
  - Large number (24px, bold)
  - Label (14px, gray)
  - Trend indicator (optional)

### CTA Button
- **Size:** Full width, 48px height
- **Background:** LinkedIn blue gradient
- **Text:** "Crear Artículo" (16px, white, bold)
- **Border Radius:** 12px
- **Hover:** Slight elevation increase

### Article Cards
- **Layout:** Vertical stack
- **Card Height:** 120px
- **Background:** White
- **Border:** 1px solid #E5E7EB
- **Border Radius:** 12px
- **Padding:** 20px
- **Content:**
  - Title (18px, bold, dark gray)
  - Status badge (colored)
  - Metadata (14px, gray)
  - Action buttons (small, secondary style)

## Responsive Behavior
- **Desktop (1024px+):** Full layout as shown
- **Tablet (768-1023px):** Sidebar collapses to icon-only
- **Mobile (<768px):** Sidebar becomes bottom navigation, single column layout

## Interactive States
- **Hover:** Cards lift slightly (2px elevation)
- **Focus:** Clear focus rings on interactive elements
- **Loading:** Skeleton placeholders for content
- **Empty:** Illustration with call-to-action
