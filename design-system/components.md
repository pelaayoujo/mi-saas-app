# Component Library Specifications

## Atoms

### Button
```jsx
// Primary Button
<Button variant="primary" size="md">
  Crear artículo
</Button>

// Secondary Button  
<Button variant="secondary" size="md">
  Guardar borrador
</Button>

// Tertiary Button
<Button variant="tertiary" size="sm">
  Cancelar
</Button>
```

**Variants:**
- `primary`: Background LinkedIn blue (#0077B5), white text
- `secondary`: White background, LinkedIn blue border and text
- `tertiary`: Transparent background, LinkedIn blue text

**Sizes:**
- `sm`: 32px height, 12px padding
- `md`: 40px height, 16px padding  
- `lg`: 48px height, 20px padding

### Input
```jsx
<Input 
  label="Título del artículo"
  placeholder="Escribe un título atractivo..."
  value={title}
  onChange={setTitle}
  error="El título es requerido"
/>
```

### Textarea
```jsx
<Textarea
  label="Resumen del artículo"
  placeholder="Describe brevemente de qué trata..."
  rows={3}
  maxLength={500}
  showCounter={true}
/>
```

### Select
```jsx
<Select
  label="Tono del artículo"
  value={tone}
  onChange={setTone}
  options={[
    { value: "formal", label: "Formal" },
    { value: "cercano", label: "Cercano" },
    { value: "técnico", label: "Técnico" }
  ]}
/>
```

### TagInput
```jsx
<TagInput
  label="Palabras clave"
  placeholder="Añade palabras clave..."
  tags={keywords}
  onTagsChange={setKeywords}
  maxTags={5}
/>
```

## Molecules

### FormRow
```jsx
<FormRow>
  <Input label="Título" />
  <Select label="Tono" />
</FormRow>
```

### FieldWithCounter
```jsx
<FieldWithCounter
  label="Contenido"
  current={wordCount}
  max={2000}
  showTime={true}
  estimatedTime={5}
/>
```

### ArticleCard
```jsx
<ArticleCard
  title="Cómo mejorar tu marca personal"
  status="draft"
  createdAt="2024-01-15"
  wordCount={450}
  onEdit={() => {}}
  onSchedule={() => {}}
  onDelete={() => {}}
/>
```

## Organisms

### Navbar
```jsx
<Navbar>
  <Logo />
  <Search placeholder="Buscar artículos..." />
  <UserMenu user={user} />
</Navbar>
```

### Sidebar
```jsx
<Sidebar>
  <NavItem icon="dashboard" label="Dashboard" active />
  <NavItem icon="edit" label="Crear artículo" />
  <NavItem icon="calendar" label="Calendario" />
  <NavItem icon="chart" label="Analytics" />
  <NavItem icon="settings" label="Configuración" />
</Sidebar>
```

### EditorShell
```jsx
<EditorShell>
  <EditorToolbar />
  <EditorContent />
  <EditorSidebar />
</EditorShell>
```

## Modals & Overlays

### ScheduleModal
```jsx
<ScheduleModal
  isOpen={isOpen}
  onClose={onClose}
  article={article}
  onSchedule={handleSchedule}
/>
```

### TemplateGallery
```jsx
<TemplateGallery
  templates={templates}
  onSelect={handleTemplateSelect}
  categories={["lista", "guía", "opinión"]}
/>
```

## States

### EmptyState
```jsx
<EmptyState
  icon="📝"
  title="Aún no tienes artículos"
  description="Crea tu primer artículo para ganar visibilidad en LinkedIn"
  action={<Button>Crear artículo</Button>}
/>
```

### LoadingState
```jsx
<LoadingState
  message="Guardando artículo..."
  showProgress={true}
  progress={75}
/>
```

### ErrorState
```jsx
<ErrorState
  title="Error al guardar"
  description="No se pudo guardar el artículo. Inténtalo de nuevo."
  action={<Button>Reintentar</Button>}
/>
```
