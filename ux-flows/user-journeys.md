# User Journeys & UX Flows

## Primary User Flow: Create Article

### 1. Dashboard → Create Article
```
Dashboard
    ↓ [Click "Crear Artículo"]
Template Selection
    ↓ [Select Template]
Metadata Setup
    ↓ [Fill Form]
Editor
    ↓ [Write Content]
Preview & Schedule
    ↓ [Schedule/Export]
Success
```

### 2. Template Selection Flow
```
Template Gallery
    ├── [Lista] → List Template
    ├── [Guía] → Guide Template  
    ├── [Opinión] → Opinion Template
    ├── [Hilo] → Thread Template
    ├── [Caso] → Case Study Template
    └── [Tutorial] → Tutorial Template
```

### 3. Editor Flow
```
Editor Interface
    ├── [Write] → Content Creation
    ├── [Format] → Text Formatting
    ├── [Preview] → LinkedIn Preview
    ├── [Save] → Auto-save
    └── [Schedule] → Schedule Modal
```

## Secondary Flows

### 4. Onboarding Flow
```
Registration/Login
    ↓
Welcome Screen
    ↓
Goal Selection
    ├── [Visibilidad] → Visibility Setup
    ├── [Reclutamiento] → Recruitment Setup
    └── [Leads] → Lead Generation Setup
    ↓
Tone Preference
    ↓
LinkedIn Connection (Optional)
    ↓
Dashboard
```

### 5. Article Management Flow
```
Dashboard
    ├── [View Article] → Article Details
    ├── [Edit Article] → Editor
    ├── [Schedule Article] → Schedule Modal
    ├── [View Analytics] → Analytics Page
    └── [Delete Article] → Confirmation Modal
```

### 6. Calendar Management Flow
```
Calendar View
    ├── [View Month] → Monthly View
    ├── [Drag & Drop] → Reschedule
    ├── [Click Date] → Add Article
    └── [Click Article] → Article Details
```

## User Personas & Flows

### Persona 1: Freelancer (Ana, 32)
**Goals:** Captar clientes, visibilidad profesional
**Pain Points:** Falta de tiempo, contenido repetitivo

**Flow:**
1. Login → Dashboard
2. Quick create → Lista template
3. Fill metadata → Tono cercano, público profesionales
4. Write content → 5 pasos para X
5. Schedule → Próximo martes 9:00
6. Export → Copy to LinkedIn

### Persona 2: CMO (Carlos, 45)
**Goals:** Gestión de equipo, métricas, consistencia
**Pain Points:** Múltiples cuentas, reporting

**Flow:**
1. Login → Dashboard
2. View analytics → Team performance
3. Create campaign → Multiple articles
4. Schedule batch → Weekly content
5. Monitor results → Weekly reports

### Persona 3: Recruiter (María, 28)
**Goals:** Atraer talento, employer branding
**Pain Points:** Contenido corporativo, engagement

**Flow:**
1. Login → Dashboard
2. Template → Case study
3. Company story → Success story
4. Schedule → Peak hours
5. Track applications → Analytics

## Acceptance Criteria

### Create Article Flow
**Given** a logged-in user
**When** they click "Crear Artículo"
**Then** they should see template selection
**And** be able to select a template
**And** proceed to metadata setup
**And** access the editor
**And** save their progress
**And** preview the article
**And** schedule or export

**Acceptance Criteria:**
- [ ] Template gallery loads within 2 seconds
- [ ] All templates are visually distinct
- [ ] Metadata form validates required fields
- [ ] Editor autosaves every 30 seconds
- [ ] Preview accurately reflects LinkedIn appearance
- [ ] Schedule modal shows available time slots
- [ ] Export copies content to clipboard
- [ ] Success message confirms action

### Dashboard Flow
**Given** a logged-in user
**When** they access the dashboard
**Then** they should see their articles
**And** be able to filter by status
**And** search for articles
**And** perform actions on articles

**Acceptance Criteria:**
- [ ] Dashboard loads within 3 seconds
- [ ] Articles display with correct status
- [ ] Filter buttons work correctly
- [ ] Search returns relevant results
- [ ] Action buttons are accessible
- [ ] Empty state shows when no articles
- [ ] Stats cards show accurate data
- [ ] Responsive design works on mobile

### Editor Flow
**Given** a user in the editor
**When** they write content
**Then** the editor should autosave
**And** show word count
**And** provide formatting options
**And** display LinkedIn preview

**Acceptance Criteria:**
- [ ] Autosave works every 30 seconds
- [ ] Word count updates in real-time
- [ ] Formatting toolbar is responsive
- [ ] Preview updates as user types
- [ ] Keyboard shortcuts work
- [ ] Undo/redo functionality works
- [ ] Hook checker provides feedback
- [ ] Mobile editor is touch-friendly

### Calendar Flow
**Given** a user viewing the calendar
**When** they interact with scheduled articles
**Then** they should be able to reschedule
**And** view article details
**And** add new articles

**Acceptance Criteria:**
- [ ] Calendar displays current month
- [ ] Scheduled articles show on correct dates
- [ ] Drag and drop rescheduling works
- [ ] Click to view article details
- [ ] Add new article from date
- [ ] Navigation between months works
- [ ] Mobile calendar is touch-friendly
- [ ] Time zone handling is correct

### Analytics Flow
**Given** a user viewing analytics
**When** they access article metrics
**Then** they should see performance data
**And** be able to compare articles
**And** export reports

**Acceptance Criteria:**
- [ ] Analytics load within 5 seconds
- [ ] Charts are interactive
- [ ] Data is accurate and up-to-date
- [ ] Comparison feature works
- [ ] Export functionality works
- [ ] Mobile charts are readable
- [ ] Date range selection works
- [ ] Empty states are informative

## Error Handling Flows

### Network Error
**Given** a user loses internet connection
**When** they try to save an article
**Then** they should see an error message
**And** be able to retry
**And** content should be preserved

### Validation Error
**Given** a user submits invalid data
**When** they try to save
**Then** they should see specific error messages
**And** be able to correct the errors
**And** form should maintain their input

### Permission Error
**Given** a user without permissions
**When** they try to access admin features
**Then** they should see an access denied message
**And** be redirected to appropriate page

## Performance Criteria

### Load Times
- [ ] Dashboard: < 3 seconds
- [ ] Editor: < 2 seconds
- [ ] Calendar: < 2 seconds
- [ ] Analytics: < 5 seconds
- [ ] Template gallery: < 2 seconds

### Responsiveness
- [ ] Mobile: < 640px
- [ ] Tablet: 640px - 1024px
- [ ] Desktop: > 1024px
- [ ] Touch targets: 44px minimum
- [ ] Keyboard navigation: Full support

### Accessibility
- [ ] WCAG AA compliance
- [ ] Screen reader support
- [ ] Keyboard navigation
- [ ] Color contrast: 4.5:1 minimum
- [ ] Focus indicators visible
