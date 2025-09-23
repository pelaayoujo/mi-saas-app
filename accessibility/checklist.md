# Accessibility & Performance Checklist

## WCAG 2.1 AA Compliance

### Perceivable
- [ ] **Color Contrast**
  - Text contrast ratio: 4.5:1 minimum
  - Large text contrast ratio: 3:1 minimum
  - LinkedIn blue (#0077B5) on white: 4.6:1 ✅
  - Gray text (#6B7280) on white: 4.5:1 ✅

- [ ] **Text Alternatives**
  - All images have alt text
  - Decorative images have empty alt=""
  - Icons have aria-label or title
  - Charts have text descriptions

- [ ] **Adaptable Content**
  - Content reflows without horizontal scrolling
  - Text can be resized up to 200% without loss of functionality
  - Responsive design works at all breakpoints

- [ ] **Distinguishable**
  - Information not conveyed by color alone
  - Focus indicators are clearly visible
  - Hover states provide visual feedback

### Operable
- [ ] **Keyboard Accessible**
  - All functionality available via keyboard
  - Tab order is logical and intuitive
  - No keyboard traps
  - Skip links for main content

- [ ] **Enough Time**
  - No time limits on content consumption
  - Autosave provides sufficient time
  - Session timeouts are clearly communicated

- [ ] **Seizures and Physical Reactions**
  - No flashing content more than 3 times per second
  - Animations can be reduced via prefers-reduced-motion

- [ ] **Navigable**
  - Clear page titles and headings
  - Multiple ways to find content
  - Focus management in modals and overlays

### Understandable
- [ ] **Readable**
  - Language is identified in HTML
  - Unusual words are explained
  - Abbreviations are expanded

- [ ] **Predictable**
  - Navigation is consistent
  - Components behave predictably
  - Error messages are clear and helpful

- [ ] **Input Assistance**
  - Form labels are clear and associated
  - Error messages identify the problem
  - Required fields are clearly marked

### Robust
- [ ] **Compatible**
  - Valid HTML markup
  - Proper ARIA roles and properties
  - Works with assistive technologies

## ARIA Implementation

### Landmarks
- [ ] `<main>` for main content
- [ ] `<nav>` for navigation
- [ ] `<aside>` for sidebars
- [ ] `<header>` and `<footer>` for page structure

### Roles
- [ ] `button` for clickable elements
- [ ] `dialog` for modals
- [ ] `tablist`, `tab`, `tabpanel` for tabs
- [ ] `menu` and `menuitem` for dropdowns
- [ ] `alert` for error messages
- [ ] `status` for loading states

### Properties
- [ ] `aria-label` for unlabeled elements
- [ ] `aria-describedby` for help text
- [ ] `aria-expanded` for collapsible content
- [ ] `aria-selected` for selected items
- [ ] `aria-hidden` for decorative elements
- [ ] `aria-live` for dynamic content updates

### States
- [ ] `aria-disabled` for disabled elements
- [ ] `aria-invalid` for form validation
- [ ] `aria-required` for required fields
- [ ] `aria-pressed` for toggle buttons

## Keyboard Navigation

### Tab Order
- [ ] Logical tab sequence
- [ ] Skip links to main content
- [ ] Focus management in modals
- [ ] Return focus after modal closes

### Keyboard Shortcuts
- [ ] **Editor Shortcuts**
  - Ctrl+S: Save
  - Ctrl+Shift+P: Preview
  - Ctrl+Enter: Schedule
  - Ctrl+B: Bold
  - Ctrl+I: Italic
  - Ctrl+K: Insert link
  - Escape: Close modals

- [ ] **Navigation Shortcuts**
  - Alt+1: Dashboard
  - Alt+2: Create Article
  - Alt+3: Calendar
  - Alt+4: Analytics
  - Alt+5: Settings

### Focus Management
- [ ] Visible focus indicators
- [ ] Focus trapped in modals
- [ ] Focus restored after actions
- [ ] Focus on error messages

## Performance Requirements

### Core Web Vitals
- [ ] **Largest Contentful Paint (LCP)**
  - Target: < 2.5 seconds
  - Dashboard: < 2 seconds
  - Editor: < 1.5 seconds

- [ ] **First Input Delay (FID)**
  - Target: < 100 milliseconds
  - All interactive elements responsive

- [ ] **Cumulative Layout Shift (CLS)**
  - Target: < 0.1
  - No unexpected layout shifts

### Loading Performance
- [ ] **Initial Load**
  - Dashboard: < 3 seconds
  - Editor: < 2 seconds
  - Calendar: < 2 seconds
  - Analytics: < 5 seconds

- [ ] **Subsequent Navigation**
  - Page transitions: < 1 second
  - Component updates: < 500ms
  - Search results: < 1 second

### Resource Optimization
- [ ] **Images**
  - WebP format with fallbacks
  - Lazy loading for below-fold images
  - Responsive images with srcset
  - Alt text for all images

- [ ] **Fonts**
  - Font-display: swap
  - Preload critical fonts
  - Fallback fonts specified

- [ ] **JavaScript**
  - Code splitting by route
  - Lazy loading for non-critical components
  - Tree shaking for unused code
  - Minification and compression

- [ ] **CSS**
  - Critical CSS inlined
  - Non-critical CSS loaded asynchronously
  - CSS minification
  - Unused CSS removal

## Mobile Performance

### Touch Targets
- [ ] Minimum 44px x 44px touch targets
- [ ] 8px spacing between interactive elements
- [ ] No overlapping touch targets
- [ ] Touch feedback for all interactions

### Responsive Design
- [ ] **Breakpoints**
  - Mobile: < 640px
  - Tablet: 640px - 1024px
  - Desktop: > 1024px

- [ ] **Layout**
  - Single column on mobile
  - Flexible grid system
  - No horizontal scrolling
  - Readable text at all sizes

### Mobile-Specific Features
- [ ] **Gestures**
  - Swipe for navigation
  - Pull to refresh
  - Long press for context menus
  - Pinch to zoom on charts

- [ ] **Viewport**
  - Proper viewport meta tag
  - No zoom restrictions
  - Orientation support

## Testing Checklist

### Automated Testing
- [ ] **Lighthouse Audit**
  - Performance: > 90
  - Accessibility: > 90
  - Best Practices: > 90
  - SEO: > 90

- [ ] **Accessibility Testing**
  - axe-core integration
  - WAVE tool validation
  - Color contrast testing
  - Keyboard navigation testing

### Manual Testing
- [ ] **Screen Reader Testing**
  - NVDA (Windows)
  - JAWS (Windows)
  - VoiceOver (macOS)
  - TalkBack (Android)

- [ ] **Keyboard Testing**
  - Tab navigation
  - Arrow key navigation
  - Keyboard shortcuts
  - Focus management

- [ ] **Mobile Testing**
  - Touch interactions
  - Gesture support
  - Orientation changes
  - Network conditions

### Browser Testing
- [ ] **Desktop Browsers**
  - Chrome (latest)
  - Firefox (latest)
  - Safari (latest)
  - Edge (latest)

- [ ] **Mobile Browsers**
  - Chrome Mobile
  - Safari Mobile
  - Samsung Internet
  - Firefox Mobile

## Implementation Guidelines

### CSS Accessibility
```css
/* Focus indicators */
.focusable:focus {
  outline: 2px solid #0077B5;
  outline-offset: 2px;
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* High contrast mode */
@media (prefers-contrast: high) {
  .button {
    border: 2px solid currentColor;
  }
}
```

### JavaScript Accessibility
```javascript
// Focus management
function trapFocus(element) {
  const focusableElements = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  // Implementation for focus trapping
}

// ARIA live regions
function announceToScreenReader(message) {
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', 'polite');
  announcement.setAttribute('aria-atomic', 'true');
  announcement.textContent = message;
  document.body.appendChild(announcement);
  setTimeout(() => document.body.removeChild(announcement), 1000);
}
```

### HTML Semantics
```html
<!-- Proper heading structure -->
<h1>Dashboard</h1>
<h2>Artículos Recientes</h2>
<h3>Artículo: Cómo mejorar tu marca personal</h3>

<!-- Form labels -->
<label for="article-title">Título del artículo</label>
<input id="article-title" type="text" required aria-describedby="title-help">
<div id="title-help">Escribe un título atractivo y descriptivo</div>

<!-- Button states -->
<button aria-pressed="false" aria-label="Marcar como favorito">
  ❤️
</button>
```

## Monitoring & Maintenance

### Performance Monitoring
- [ ] Real User Monitoring (RUM)
- [ ] Core Web Vitals tracking
- [ ] Error rate monitoring
- [ ] User experience metrics

### Accessibility Monitoring
- [ ] Regular accessibility audits
- [ ] User feedback collection
- [ ] Screen reader testing
- [ ] Keyboard navigation testing

### Continuous Improvement
- [ ] Monthly performance reviews
- [ ] Quarterly accessibility audits
- [ ] User testing sessions
- [ ] Feedback integration process
