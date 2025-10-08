# 📧 Configuración de Emails - EmailJS

## ✅ Paso a Paso para recibir emails del formulario de contacto

### 1. Crear cuenta en EmailJS

1. Ve a **https://www.emailjs.com/**
2. Haz clic en **"Sign Up"** y crea una cuenta gratuita
3. Verifica tu email

---

### 2. Configurar Servicio de Email

1. En el dashboard, ve a **"Email Services"**
2. Haz clic en **"Add New Service"**
3. Selecciona tu proveedor:
   - **Gmail** (recomendado)
   - Outlook
   - Yahoo
   - Otro

4. Si eliges Gmail:
   - Inicia sesión con **info@pgkhiszpania.com**
   - Autoriza el acceso de EmailJS
   
5. **Copia el Service ID** (ejemplo: `service_abc123`)

---

### 3. Crear Plantilla de Email

1. Ve a **"Email Templates"**
2. Haz clic en **"Create New Template"**
3. Configura así:

**Subject (Asunto):**
```
Nueva solicitud de presupuesto - {{from_name}}
```

**Content (Contenido):**
```
Has recibido una nueva solicitud de presupuesto:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 DATOS DEL CLIENTE:

👤 Nombre: {{from_name}}
📧 Email: {{from_email}}
📱 Teléfono: {{phone}}

🏠 INFORMACIÓN DE LA PROPIEDAD:

🏘️ Número de propiedades: {{num_properties}}
👥 Número de propietarios: {{num_owners}}
🚗 ¿Tiene garaje/trastero?: {{has_garage}}

📝 NOTAS ADICIONALES:
{{additional_notes}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Este email fue enviado desde el formulario de contacto de www.pgkhiszpania.com
```

4. **Guarda la plantilla**
5. **Copia el Template ID** (ejemplo: `template_xyz789`)

---

### 4. Obtener Public Key

1. Ve a **"Account"** en el menú
2. Selecciona **"General"**
3. Busca **"Public Key"**
4. **Copia la clave** (ejemplo: `abcdefghijklmnop`)

---

### 5. Configurar en tu proyecto

Abre el archivo: `src/lib/emailjs.ts`

Reemplaza los valores:

```typescript
export const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_abc123',     // ← Tu Service ID aquí
  TEMPLATE_ID: 'template_xyz789',   // ← Tu Template ID aquí
  PUBLIC_KEY: 'abcdefghijklmnop',   // ← Tu Public Key aquí
};
```

---

### 6. ✅ ¡Listo! Probar el formulario

1. Guarda todos los archivos
2. Reinicia el servidor: `npm run dev`
3. Ve a http://localhost:5174
4. Scroll hasta el formulario de contacto
5. Llena los datos y envía
6. **¡Deberías recibir un email en info@pgkhiszpania.com!**

---

## 🔧 Solución de Problemas

### ❌ No llegan los emails

1. **Verifica la configuración** en `src/lib/emailjs.ts`
2. **Revisa la consola del navegador** (F12) por errores
3. **Comprueba la bandeja de SPAM** en tu email
4. **Revisa el dashboard de EmailJS**:
   - Ve a "Email History" para ver intentos de envío
   - Verifica que el servicio esté activo

### ⚠️ Error "Daily limit reached"

EmailJS tiene límite de 200 emails/mes en la versión gratuita.

**Soluciones:**
- Actualizar a plan de pago
- Usar otro servicio (Resend, SendGrid)

---

## 📊 Plan Gratuito de EmailJS

✅ **200 emails/mes** gratis
✅ Sin tarjeta de crédito requerida
✅ Múltiples servicios de email
✅ Plantillas personalizables

---

## 🎯 Funcionalidad Actual

Cuando alguien envía el formulario:

1. ✅ **Se guarda en Supabase** (base de datos)
2. ✅ **Se envía email a info@pgkhiszpania.com**
3. ✅ Usuario ve confirmación en pantalla

---

## 📞 Soporte

Si necesitas ayuda:
- 📧 Support EmailJS: https://www.emailjs.com/docs/
- 📚 Documentación: https://www.emailjs.com/docs/sdk/send/
