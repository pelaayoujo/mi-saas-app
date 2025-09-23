# API Endpoints Specifications

## Authentication Endpoints

### POST /api/auth/register
**Description:** Register new user account
**Request Body:**
```json
{
  "name": "Ana Pérez",
  "email": "ana@ejemplo.com",
  "password": "securePassword123",
  "linkedInProfile": "https://www.linkedin.com/in/anaperez"
}
```
**Response (201):**
```json
{
  "success": true,
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "Ana Pérez",
    "email": "ana@ejemplo.com",
    "role": "user"
  }
}
```

### POST /api/auth/login
**Description:** Authenticate user
**Request Body:**
```json
{
  "email": "ana@ejemplo.com",
  "password": "securePassword123"
}
```
**Response (200):**
```json
{
  "success": true,
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "Ana Pérez",
    "email": "ana@ejemplo.com",
    "role": "user"
  }
}
```

## Articles Endpoints

### GET /api/articles
**Description:** Get user's articles with filtering and pagination
**Query Parameters:**
- `status`: draft|scheduled|published|archived
- `page`: number (default: 1)
- `limit`: number (default: 10)
- `search`: string
- `tags`: string (comma-separated)

**Response (200):**
```json
{
  "success": true,
  "articles": [
    {
      "id": "507f1f77bcf86cd799439012",
      "title": "Cómo mejorar tu marca personal",
      "status": "draft",
      "createdAt": "2024-01-15T10:00:00Z",
      "updatedAt": "2024-01-15T14:30:00Z",
      "wordCount": 450,
      "estimatedReadTime": 4,
      "tags": ["marca", "personal"]
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "pages": 3
  }
}
```

### POST /api/articles
**Description:** Create new article
**Request Body:**
```json
{
  "title": "Cómo mejorar tu marca personal",
  "template": "guía",
  "metadata": {
    "tone": "cercano",
    "length": "normal",
    "keywords": ["marca personal", "LinkedIn"],
    "tags": ["marca", "personal"],
    "targetAudience": "profesionales"
  }
}
```
**Response (201):**
```json
{
  "success": true,
  "article": {
    "id": "507f1f77bcf86cd799439012",
    "title": "Cómo mejorar tu marca personal",
    "status": "draft",
    "createdAt": "2024-01-15T10:00:00Z"
  }
}
```

### PUT /api/articles/:id
**Description:** Update article
**Request Body:**
```json
{
  "title": "Cómo mejorar tu marca personal en LinkedIn",
  "body": "<h2>Introducción</h2><p>Tu marca personal...</p>",
  "summary": "Guía completa para construir una marca personal sólida",
  "metadata": {
    "keywords": ["marca personal", "LinkedIn", "networking"]
  }
}
```
**Response (200):**
```json
{
  "success": true,
  "article": {
    "id": "507f1f77bcf86cd799439012",
    "title": "Cómo mejorar tu marca personal en LinkedIn",
    "updatedAt": "2024-01-15T14:30:00Z"
  }
}
```

### DELETE /api/articles/:id
**Description:** Delete article
**Response (200):**
```json
{
  "success": true,
  "message": "Article deleted successfully"
}
```

### POST /api/articles/:id/schedule
**Description:** Schedule article for publication
**Request Body:**
```json
{
  "scheduledAt": "2024-01-20T09:00:00Z"
}
```
**Response (200):**
```json
{
  "success": true,
  "article": {
    "id": "507f1f77bcf86cd799439012",
    "status": "scheduled",
    "scheduledAt": "2024-01-20T09:00:00Z"
  }
}
```

### GET /api/articles/:id/analytics
**Description:** Get article analytics
**Response (200):**
```json
{
  "success": true,
  "analytics": {
    "impressions": 1250,
    "reactions": 45,
    "comments": 12,
    "shares": 8,
    "clicks": 23,
    "engagementRate": 5.2,
    "newFollowers": 15,
    "dailyData": [
      {
        "date": "2024-01-20",
        "impressions": 1250,
        "reactions": 45,
        "comments": 12
      }
    ]
  }
}
```

## Templates Endpoints

### GET /api/templates
**Description:** Get available templates
**Query Parameters:**
- `category`: lista|guía|opinión|hilo|caso|tutorial
- `public`: boolean

**Response (200):**
```json
{
  "success": true,
  "templates": [
    {
      "id": "507f1f77bcf86cd799439013",
      "name": "Plantilla - Lista 5 pasos",
      "description": "Estructura para crear listas de 5 pasos efectivas",
      "category": "lista",
      "usageCount": 1250,
      "rating": 4.8
    }
  ]
}
```

### GET /api/templates/:id
**Description:** Get template details
**Response (200):**
```json
{
  "success": true,
  "template": {
    "id": "507f1f77bcf86cd799439013",
    "name": "Plantilla - Lista 5 pasos",
    "description": "Estructura para crear listas de 5 pasos efectivas",
    "category": "lista",
    "structure": ["h2", "p", "ul", "p", "ul", "p", "cta"],
    "content": {
      "title": "5 [TEMA] que [BENEFICIO]",
      "body": "<h2>Introducción</h2><p>En este artículo...</p>"
    }
  }
}
```

## Analytics Endpoints

### GET /api/analytics/dashboard
**Description:** Get dashboard analytics
**Response (200):**
```json
{
  "success": true,
  "analytics": {
    "totalArticles": 25,
    "publishedArticles": 18,
    "scheduledArticles": 3,
    "draftArticles": 4,
    "totalImpressions": 12500,
    "totalReactions": 450,
    "totalComments": 120,
    "totalShares": 80,
    "averageEngagementRate": 4.2,
    "newFollowers": 150,
    "topPerformingArticles": [
      {
        "id": "507f1f77bcf86cd799439012",
        "title": "Cómo mejorar tu marca personal",
        "impressions": 2500,
        "engagementRate": 6.8
      }
    ]
  }
}
```

### GET /api/analytics/articles/compare
**Description:** Compare articles performance
**Query Parameters:**
- `articleIds`: string (comma-separated)

**Response (200):**
```json
{
  "success": true,
  "comparison": [
    {
      "id": "507f1f77bcf86cd799439012",
      "title": "Artículo 1",
      "impressions": 2500,
      "engagementRate": 6.8
    },
    {
      "id": "507f1f77bcf86cd799439013",
      "title": "Artículo 2",
      "impressions": 1800,
      "engagementRate": 4.2
    }
  ]
}
```

## Calendar Endpoints

### GET /api/calendar
**Description:** Get scheduled articles for calendar view
**Query Parameters:**
- `month`: YYYY-MM
- `year`: YYYY

**Response (200):**
```json
{
  "success": true,
  "events": [
    {
      "id": "507f1f77bcf86cd799439012",
      "title": "Cómo mejorar tu marca personal",
      "scheduledAt": "2024-01-20T09:00:00Z",
      "status": "scheduled"
    }
  ]
}
```

### PUT /api/calendar/:id/reschedule
**Description:** Reschedule article
**Request Body:**
```json
{
  "scheduledAt": "2024-01-22T14:00:00Z"
}
```
**Response (200):**
```json
{
  "success": true,
  "article": {
    "id": "507f1f77bcf86cd799439012",
    "scheduledAt": "2024-01-22T14:00:00Z"
  }
}
```

## AI Integration Endpoints (Future)

### POST /api/ai/generate
**Description:** Generate content with AI (placeholder)
**Request Body:**
```json
{
  "type": "title|content|hashtags|summary",
  "prompt": "Generate a title about LinkedIn marketing",
  "context": {
    "tone": "cercano",
    "length": "normal",
    "keywords": ["marketing", "LinkedIn"]
  }
}
```
**Response (200):**
```json
{
  "success": true,
  "content": "5 Estrategias de Marketing en LinkedIn que Funcionan en 2024",
  "creditsUsed": 1,
  "remainingCredits": 9
}
```

### POST /api/ai/analyze
**Description:** Analyze content with AI (placeholder)
**Request Body:**
```json
{
  "content": "Your article content here...",
  "type": "tone|keywords|engagement"
}
```
**Response (200):**
```json
{
  "success": true,
  "analysis": {
    "tone": "cercano",
    "sentiment": "positive",
    "suggestedKeywords": ["marketing", "LinkedIn", "estrategia"],
    "engagementScore": 8.5
  }
}
```

## Admin Endpoints

### GET /api/admin/users
**Description:** Get all users (admin only)
**Response (200):**
```json
{
  "success": true,
  "users": [
    {
      "id": "507f1f77bcf86cd799439011",
      "name": "Ana Pérez",
      "email": "ana@ejemplo.com",
      "role": "user",
      "createdAt": "2024-01-01T10:00:00Z",
      "articlesCount": 25
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 150
  }
}
```

### GET /api/admin/analytics
**Description:** Get platform analytics (admin only)
**Response (200):**
```json
{
  "success": true,
  "analytics": {
    "totalUsers": 150,
    "activeUsers": 120,
    "totalArticles": 2500,
    "publishedArticles": 1800,
    "totalImpressions": 125000,
    "averageEngagementRate": 4.2
  }
}
```

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "error": "Validation error",
  "details": {
    "title": "Title is required",
    "email": "Invalid email format"
  }
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "error": "Authentication required"
}
```

### 403 Forbidden
```json
{
  "success": false,
  "error": "Insufficient permissions"
}
```

### 404 Not Found
```json
{
  "success": false,
  "error": "Article not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "error": "Internal server error",
  "requestId": "req_123456789"
}
```
