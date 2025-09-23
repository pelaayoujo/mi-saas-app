# Editor Desktop Wireframe

## Layout Structure
```
┌─────────────────────────────────────────────────────────────────────────────┐
│ [Logo] LinkedAI                    [🔍 Search]              [👤 Ana Pérez] │
├─────────────────────────────────────────────────────────────────────────────┤
│ Sidebar │                    Editor Interface                               │
│         │                                                                   │
│ 📊 Dashboard │  ┌─────────────────────────────────────────────────────────┐ │
│ ✏️ Crear     │  │                    Editor                               │ │
│ 📅 Calendario│  │                                                         │ │
│ 📈 Analytics │  │  ┌─────────────────────────────────────────────────┐   │ │
│ ⚙️ Config    │  │  │ [Guardar] [Programar] [Preview] [Exportar]     │   │ │
│              │  │  └─────────────────────────────────────────────────┘   │ │
│              │  │                                                         │ │
│              │  │  ┌─────────────────────────────────────────────────┐   │ │
│              │  │  │ Título del artículo                             │   │ │
│              │  │  │ [Cómo mejorar tu marca personal en LinkedIn]    │   │ │
│              │  │  └─────────────────────────────────────────────────┘   │ │
│              │  │                                                         │ │
│              │  │  ┌─────────────────────────────────────────────────┐   │ │
│              │  │  │ [B] [I] [U] [H2] [H3] [•] [1.] ["] [📷] [🔗]   │   │ │
│              │  │  └─────────────────────────────────────────────────┘   │ │
│              │  │                                                         │ │
│              │  │  ┌─────────────────────────────────────────────────┐   │ │
│              │  │  │                                                 │   │ │
│              │  │  │ Tu marca personal es tu activo más valioso...   │   │ │
│              │  │  │                                                 │   │ │
│              │  │  │ En este artículo te comparto 5 estrategias...   │   │ │
│              │  │  │                                                 │   │ │
│              │  │  │ 1. Define tu propuesta de valor                 │   │ │
│              │  │  │ 2. Optimiza tu perfil                          │   │ │
│              │  │  │ 3. Crea contenido de valor                     │   │ │
│              │  │  │                                                 │   │ │
│              │  │  │ ¿Cuál de estas estrategias te parece más...    │   │ │
│              │  │  │                                                 │   │ │
│              │  │  └─────────────────────────────────────────────────┘   │ │
│              │  │                                                         │ │
│              │  │  ┌─────────────────────────────────────────────────┐   │ │
│              │  │  │ Palabras: 450 | Tiempo lectura: 4 min          │   │ │
│              │  │  │ [💾 Guardado hace 2 minutos]                   │   │ │
│              │  │  └─────────────────────────────────────────────────┘   │ │
│              │  └─────────────────────────────────────────────────────────┘ │
│              │                                                             │
│              │  ┌─────────────────────────────────────────────────────────┐ │
│              │  │                    Sidebar                              │ │
│              │  │                                                         │ │
│              │  │  Metadata                                              │ │
│              │  │  ┌─────────────────────────────────────────────────┐   │ │
│              │  │  │ Tono: [Cercano ▼]                              │   │ │
│              │  │  │ Longitud: [Normal ▼]                           │   │ │
│              │  │  │ Público: [Profesionales ▼]                     │   │ │
│              │  │  └─────────────────────────────────────────────────┘   │ │
│              │  │                                                         │ │
│              │  │  Palabras Clave                                       │ │
│              │  │  ┌─────────────────────────────────────────────────┐   │ │
│              │  │  │ [marca personal] [LinkedIn] [networking] [+]    │   │ │
│              │  │  └─────────────────────────────────────────────────┘   │ │
│              │  │                                                         │ │
│              │  │  Tags                                                  │ │
│              │  │  ┌─────────────────────────────────────────────────┐   │ │
│              │  │  │ [marca] [personal] [linkedin] [+]               │   │ │
│              │  │  └─────────────────────────────────────────────────┘   │ │
│              │  │                                                         │ │
│              │  │  Hook Checker                                          │ │
│              │  │  ┌─────────────────────────────────────────────────┐   │ │
│              │  │  │ ✅ Primera línea atractiva                      │   │ │
│              │  │  │ "Tu marca personal es tu activo más valioso"    │   │ │
│              │  │  └─────────────────────────────────────────────────┘   │ │
│              │  │                                                         │ │
│              │  │  LinkedIn Preview                                      │ │
│              │  │  ┌─────────────────────────────────────────────────┐   │ │
│              │  │  │ 👤 Ana Pérez • CEO | Growth Expert • 2h        │   │ │
│              │  │  │                                                 │   │ │
│              │  │  │ Cómo mejorar tu marca personal en LinkedIn      │   │ │
│              │  │  │                                                 │   │ │
│              │  │  │ Tu marca personal es tu activo más valioso...   │   │ │
│              │  │  │                                                 │   │ │
│              │  │  │ 👍 0 💬 0 🔄 0                                  │   │ │
│              │  │  └─────────────────────────────────────────────────┘   │ │
│              │  └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Component Specifications

### Editor Toolbar
- **Height:** 48px
- **Background:** White with border
- **Actions:** Save, Schedule, Preview, Export
- **Button Style:** Secondary buttons with icons

### Title Input
- **Height:** 60px
- **Font Size:** 24px, bold
- **Placeholder:** "Título del artículo"
- **Border:** None, focus with underline

### Formatting Toolbar
- **Height:** 40px
- **Background:** #F9FAFB
- **Tools:** Bold, Italic, Underline, H2, H3, Bullet List, Numbered List, Quote, Image, Link
- **Button Style:** Icon buttons, 32px size

### Editor Content Area
- **Min Height:** 400px
- **Font Size:** 16px
- **Line Height:** 1.6
- **Padding:** 20px
- **Focus:** Blue border on focus
- **Placeholder:** "Comienza a escribir tu artículo..."

### Status Bar
- **Height:** 40px
- **Background:** #F9FAFB
- **Content:** Word count, reading time, save status
- **Font Size:** 14px, gray

### Sidebar
- **Width:** 300px
- **Background:** White
- **Sections:**
  - Metadata (tone, length, audience)
  - Keywords (tag input)
  - Tags (tag input)
  - Hook Checker (first line analysis)
  - LinkedIn Preview (social preview)

### Metadata Section
- **Select Dropdowns:** Tone, Length, Audience
- **Style:** Standard select with LinkedIn blue focus

### Tag Inputs
- **Style:** Chips with add button
- **Max Tags:** 5 for keywords, 10 for tags
- **Color:** LinkedIn blue for keywords, gray for tags

### Hook Checker
- **Status:** ✅ Good / ⚠️ Needs improvement / ❌ Poor
- **Content:** Shows first line with analysis
- **Background:** Green for good, yellow for warning, red for poor

### LinkedIn Preview
- **Style:** Mimics LinkedIn post appearance
- **Content:** Avatar, name, title, time, post content, engagement
- **Background:** White with border
- **Font:** LinkedIn-like typography

## Interactive States
- **Autosave:** Every 30 seconds, shows "Guardado hace X minutos"
- **Dirty State:** Shows unsaved changes indicator
- **Loading:** Skeleton for preview updates
- **Error:** Toast notifications for save errors

## Keyboard Shortcuts
- **Ctrl+S:** Save
- **Ctrl+Shift+P:** Preview
- **Ctrl+Enter:** Schedule
- **Ctrl+B:** Bold
- **Ctrl+I:** Italic
- **Ctrl+K:** Insert link
