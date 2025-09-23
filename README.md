# Mi SaaS - Plataforma de Gestión de Leads

Una aplicación SaaS moderna construida con Next.js, NextAuth y MongoDB para la gestión de leads y usuarios.

## 🚀 Características

- **Autenticación segura** con NextAuth
- **Gestión de usuarios** con roles (admin/user)
- **Panel de administración** para gestión de leads
- **Dashboard de usuario** personalizado
- **Base de datos MongoDB** para persistencia
- **Diseño responsive** y moderno

## 🛠️ Tecnologías

- **Frontend:** Next.js 14, React, CSS
- **Autenticación:** NextAuth v4
- **Base de datos:** MongoDB Atlas
- **Hosting:** Vercel
- **Lenguaje:** JavaScript

## 📋 Prerequisitos

- Node.js 18+ 
- MongoDB Atlas (cuenta gratuita)
- Git (para deployment)

## 🚀 Instalación Local

1. **Clonar el repositorio:**
```bash
git clone [tu-repositorio]
cd mi-saas
```

2. **Instalar dependencias:**
```bash
npm install
```

3. **Configurar variables de entorno:**
Crear archivo `.env.local`:
```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=tu-secret-super-seguro
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/database
MONGODB_DB=nombre-base-datos
```

4. **Ejecutar en desarrollo:**
```bash
npm run dev
```

## 🌐 Deployment en Vercel

1. **Subir a GitHub:**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Conectar con Vercel:**
- Ir a [vercel.com](https://vercel.com)
- Importar proyecto desde GitHub
- Configurar variables de entorno
- Deploy automático

## 👥 Usuarios de Prueba

- **Admin:** admin@test.com / admin123
- **Usuario:** user@test.com / user123

## 📁 Estructura del Proyecto

```
├── app/
│   ├── admin/          # Panel de administración
│   ├── api/            # API routes
│   ├── dashboard/      # Dashboard de usuario
│   ├── login/          # Página de login
│   └── register/       # Página de registro
├── lib/                # Utilidades (MongoDB, email)
├── config/             # Configuraciones
└── public/             # Archivos estáticos
```

## 🔧 Scripts Disponibles

- `npm run dev` - Servidor de desarrollo
- `npm run build` - Build para producción
- `npm run start` - Servidor de producción
- `npm run lint` - Linter

## 📝 Notas de Desarrollo

- El proyecto usa App Router de Next.js 14
- NextAuth configurado con Credentials Provider
- MongoDB Atlas para base de datos
- Diseño responsive con CSS puro
- Optimizado para Vercel deployment

## 🤝 Contribución

1. Fork el proyecto
2. Crear rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

