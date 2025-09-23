# 📧 Configuración del Sistema de Emails

## Variables de Entorno Requeridas

Agrega estas variables a tu archivo `.env.local`:

```env
# Configuración de Email
EMAIL_USER=tu-email@gmail.com
EMAIL_PASS=tu-contraseña-de-aplicacion

# URL de la aplicación
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 🔧 Configuración de Gmail

### Paso 1: Habilitar Autenticación de 2 Factores
1. Ve a tu cuenta de Google
2. Seguridad → Verificación en 2 pasos
3. Actívala si no está activada

### Paso 2: Generar Contraseña de Aplicación
1. Ve a tu cuenta de Google
2. Seguridad → Contraseñas de aplicaciones
3. Selecciona "Correo" y "Otro (nombre personalizado)"
4. Escribe "LinkedAI" como nombre
5. Copia la contraseña generada (16 caracteres)

### Paso 3: Configurar Variables
```env
EMAIL_USER=tu-email@gmail.com
EMAIL_PASS=abcd-efgh-ijkl-mnop  # La contraseña de 16 caracteres
```

## 📨 Otros Proveedores de Email

### Outlook/Hotmail
```env
EMAIL_USER=tu-email@outlook.com
EMAIL_PASS=tu-contraseña
```

### Yahoo
```env
EMAIL_USER=tu-email@yahoo.com
EMAIL_PASS=tu-contraseña-de-aplicacion
```

## 🚀 Flujo de Emails Implementado

### 1. Email de Bienvenida (Landing → Registro)
- **Cuándo**: Cuando alguien se registra en la landing page
- **Contenido**: Bienvenida + enlace para crear cuenta
- **Diseño**: HTML profesional con gradientes y branding

### 2. Email de Confirmación (Registro → Dashboard)
- **Cuándo**: Cuando alguien completa el registro
- **Contenido**: Confirmación + enlace al dashboard
- **Diseño**: HTML de éxito con call-to-action

## 🎨 Características de los Emails

- ✅ **Diseño responsive** - Se ve bien en móvil y desktop
- ✅ **Branding consistente** - Colores y logo de LinkedAI
- ✅ **HTML profesional** - Gradientes, sombras, tipografía
- ✅ **Call-to-actions claros** - Botones prominentes
- ✅ **Información útil** - Features, beneficios, próximos pasos

## 🔍 Testing

Para probar el sistema:

1. **Configura las variables** en `.env.local`
2. **Registra un lead** en la landing page
3. **Revisa tu email** - Deberías recibir el email de bienvenida
4. **Completa el registro** en `/register`
5. **Revisa tu email** - Deberías recibir el email de confirmación

## 🛠️ Troubleshooting

### Error: "Invalid login"
- Verifica que `EMAIL_USER` sea correcto
- Asegúrate de usar la contraseña de aplicación, no tu contraseña normal

### Error: "Connection timeout"
- Verifica tu conexión a internet
- Algunos proveedores bloquean conexiones SMTP

### Emails no llegan
- Revisa la carpeta de spam
- Verifica que `EMAIL_USER` sea el email correcto
- Revisa los logs del servidor para errores

## 📊 Monitoreo

Los emails se registran en la consola del servidor:
- ✅ `Email enviado exitosamente: [messageId]`
- ❌ `Error al enviar email: [error]`

## 🔒 Seguridad

- Las contraseñas de aplicación son más seguras que las contraseñas normales
- Los emails se envían de forma asíncrona (no bloquean el registro)
- Si falla el email, el registro sigue funcionando



