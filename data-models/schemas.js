// MongoDB Schemas for LinkedIn Content Creator

// Users Collection
const userSchema = {
  _id: "ObjectId",
  name: "String",
  email: "String (unique)",
  linkedInProfile: "String (optional)",
  role: "String (enum: ['user', 'admin'])",
  preferences: {
    tone: "String (enum: ['formal', 'cercano', 'técnico'])",
    defaultLength: "String (enum: ['corta', 'normal', 'larga'])",
    timezone: "String",
    notifications: {
      email: "Boolean",
      push: "Boolean"
    }
  },
  subscription: {
    plan: "String (enum: ['free', 'pro', 'enterprise'])",
    credits: "Number",
    expiresAt: "Date"
  },
  createdAt: "Date",
  updatedAt: "Date"
}

// Example User Document
const exampleUser = {
  _id: ObjectId("507f1f77bcf86cd799439011"),
  name: "Ana Pérez",
  email: "ana@ejemplo.com",
  linkedInProfile: "https://www.linkedin.com/in/anaperez",
  role: "user",
  preferences: {
    tone: "cercano",
    defaultLength: "normal",
    timezone: "Europe/Madrid",
    notifications: {
      email: true,
      push: false
    }
  },
  subscription: {
    plan: "free",
    credits: 10,
    expiresAt: new Date("2024-12-31")
  },
  createdAt: new Date("2024-01-01T10:00:00Z"),
  updatedAt: new Date("2024-01-15T14:30:00Z")
}

// Articles Collection
const articleSchema = {
  _id: "ObjectId",
  userId: "ObjectId (ref: users)",
  title: "String",
  body: "String (HTML content)",
  summary: "String (optional)",
  status: "String (enum: ['draft', 'scheduled', 'published', 'archived'])",
  template: "String (template used)",
  metadata: {
    tone: "String",
    length: "String",
    keywords: ["String"],
    tags: ["String"],
    targetAudience: "String",
    estimatedReadTime: "Number (minutes)"
  },
  linkedInData: {
    postId: "String (optional)",
    publishedAt: "Date (optional)",
    url: "String (optional)"
  },
  scheduledAt: "Date (optional)",
  analytics: {
    impressions: "Number",
    reactions: "Number",
    comments: "Number",
    shares: "Number",
    clicks: "Number",
    engagementRate: "Number",
    newFollowers: "Number"
  },
  versions: [{
    version: "Number",
    content: "String",
    createdAt: "Date",
    changes: "String"
  }],
  createdAt: "Date",
  updatedAt: "Date"
}

// Example Article Document
const exampleArticle = {
  _id: ObjectId("507f1f77bcf86cd799439012"),
  userId: ObjectId("507f1f77bcf86cd799439011"),
  title: "Cómo mejorar tu marca personal en LinkedIn",
  body: "<h2>Introducción</h2><p>Tu marca personal es tu activo más valioso...</p>",
  summary: "Guía completa para construir una marca personal sólida en LinkedIn",
  status: "draft",
  template: "guía",
  metadata: {
    tone: "cercano",
    length: "normal",
    keywords: ["marca personal", "LinkedIn", "networking"],
    tags: ["marca", "personal", "linkedin"],
    targetAudience: "profesionales",
    estimatedReadTime: 4
  },
  linkedInData: {
    postId: null,
    publishedAt: null,
    url: null
  },
  scheduledAt: new Date("2024-01-20T09:00:00Z"),
  analytics: {
    impressions: 0,
    reactions: 0,
    comments: 0,
    shares: 0,
    clicks: 0,
    engagementRate: 0,
    newFollowers: 0
  },
  versions: [{
    version: 1,
    content: "<h2>Introducción</h2><p>Tu marca personal...</p>",
    createdAt: new Date("2024-01-15T10:00:00Z"),
    changes: "Versión inicial"
  }],
  createdAt: new Date("2024-01-15T10:00:00Z"),
  updatedAt: new Date("2024-01-15T14:30:00Z")
}

// Templates Collection
const templateSchema = {
  _id: "ObjectId",
  name: "String",
  description: "String",
  category: "String (enum: ['lista', 'guía', 'opinión', 'hilo', 'caso', 'tutorial'])",
  structure: ["String (block types)"],
  content: {
    title: "String (template)",
    body: "String (HTML template)",
    metadata: "Object (default values)"
  },
  isPublic: "Boolean",
  createdBy: "ObjectId (ref: users) | 'system'",
  usageCount: "Number",
  rating: "Number (1-5)",
  createdAt: "Date",
  updatedAt: "Date"
}

// Example Template Document
const exampleTemplate = {
  _id: ObjectId("507f1f77bcf86cd799439013"),
  name: "Plantilla - Lista 5 pasos",
  description: "Estructura para crear listas de 5 pasos efectivas",
  category: "lista",
  structure: ["h2", "p", "ul", "p", "ul", "p", "cta"],
  content: {
    title: "5 [TEMA] que [BENEFICIO]",
    body: "<h2>Introducción</h2><p>En este artículo te comparto 5 [TEMA] que [BENEFICIO]...</p><ul><li>Paso 1: [DESCRIPCIÓN]</li><li>Paso 2: [DESCRIPCIÓN]</li><li>Paso 3: [DESCRIPCIÓN]</li><li>Paso 4: [DESCRIPCIÓN]</li><li>Paso 5: [DESCRIPCIÓN]</li></ul><p>¿Cuál de estos pasos te parece más útil? Comparte tu experiencia en los comentarios.</p>",
    metadata: {
      tone: "cercano",
      length: "normal",
      keywords: [],
      tags: []
    }
  },
  isPublic: true,
  createdBy: "system",
  usageCount: 1250,
  rating: 4.8,
  createdAt: new Date("2024-01-01T00:00:00Z"),
  updatedAt: new Date("2024-01-15T10:00:00Z")
}

// Analytics Events Collection
const analyticsEventSchema = {
  _id: "ObjectId",
  articleId: "ObjectId (ref: articles)",
  userId: "ObjectId (ref: users)",
  type: "String (enum: ['impression', 'reaction', 'comment', 'share', 'click', 'follow'])",
  value: "Number",
  metadata: {
    source: "String (linkedin, direct, etc)",
    userAgent: "String",
    timestamp: "Date"
  },
  createdAt: "Date"
}

// Example Analytics Event
const exampleAnalyticsEvent = {
  _id: ObjectId("507f1f77bcf86cd799439014"),
  articleId: ObjectId("507f1f77bcf86cd799439012"),
  userId: ObjectId("507f1f77bcf86cd799439011"),
  type: "impression",
  value: 1,
  metadata: {
    source: "linkedin",
    userAgent: "Mozilla/5.0...",
    timestamp: new Date("2024-01-20T09:15:00Z")
  },
  createdAt: new Date("2024-01-20T09:15:00Z")
}

// NextAuth Sessions Collection
const sessionSchema = {
  _id: "ObjectId",
  sessionToken: "String (unique)",
  userId: "ObjectId (ref: users)",
  expires: "Date",
  createdAt: "Date",
  updatedAt: "Date"
}

// NextAuth Accounts Collection
const accountSchema = {
  _id: "ObjectId",
  userId: "ObjectId (ref: users)",
  type: "String (oauth, email, etc)",
  provider: "String (google, linkedin, credentials)",
  providerAccountId: "String",
  refresh_token: "String (optional)",
  access_token: "String (optional)",
  expires_at: "Number (optional)",
  token_type: "String (optional)",
  scope: "String (optional)",
  id_token: "String (optional)",
  session_state: "String (optional)",
  createdAt: "Date",
  updatedAt: "Date"
}

module.exports = {
  userSchema,
  exampleUser,
  articleSchema,
  exampleArticle,
  templateSchema,
  exampleTemplate,
  analyticsEventSchema,
  exampleAnalyticsEvent,
  sessionSchema,
  accountSchema
}
