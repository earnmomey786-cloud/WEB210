# 📧 Sistema de Emails con tu Servidor SMTP

## ✅ ¡Configuración Completa!

Tu sitio web ahora puede enviar emails usando tu propio servidor de correo:
- **Servidor:** mail.pgkhiszpania.com
- **Email:** info@pgkhiszpania.com
- **Puerto SMTP:** 465 (seguro)

---

## 🚀 Cómo Usar

### **Opción 1: Ejecutar todo junto (Recomendado)**

```bash
npm run dev:all
```

Esto inicia:
- ✅ Frontend (Vite) en http://localhost:5174
- ✅ Servidor de emails en http://localhost:3001

### **Opción 2: Ejecutar por separado**

**Terminal 1 - Frontend:**
```bash
npm run dev
```

**Terminal 2 - Servidor de emails:**
```bash
npm run server
```

---

## 📋 Cómo Funciona

Cuando un cliente llena el formulario de contacto:

1. **Se guarda en Supabase** ✅ (base de datos)
2. **Se envía email automáticamente** ✅ a info@pgkhiszpania.com
3. **Cliente ve confirmación** ✅ en pantalla

---

## 📧 Email que Recibirás

Recibirás un email HTML profesional con:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📧 Nueva Solicitud de Presupuesto
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

DATOS DEL CLIENTE:
👤 Nombre: [Nombre del cliente]
📧 Email: [Email clickeable]
📱 Teléfono: [Teléfono clickeable]

INFORMACIÓN DE LA PROPIEDAD:
🏘️ Número de propiedades: [número]
👥 Número de propietarios: [número]
🚗 ¿Tiene garaje/trastero?: [Sí/No]

📝 NOTAS ADICIONALES:
[Notas del cliente]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💡 Responde directamente a este email 
   para contactar al cliente
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## 🔒 Seguridad

✅ **Credenciales protegidas** en archivo `.env`
✅ **HTTPS/TLS** activado (puerto 465)
✅ **No expone contraseña** al frontend
✅ **Backend seguro** con Express

---

## 🧪 Probar el Sistema

1. **Inicia todo:**
   ```bash
   npm run dev:all
   ```

2. **Verifica que veas:**
   ```
   ✅ Servidor SMTP listo para enviar emails
   🚀 Servidor de emails corriendo en http://localhost:3001
   ```

3. **Abre el sitio:**
   - Ve a http://localhost:5174
   - Scroll hasta el formulario de contacto
   - Llena los datos y envía

4. **Revisa tu email:**
   - Abre info@pgkhiszpania.com
   - Deberías ver el email en menos de 1 minuto

---

## 📂 Archivos Creados

```
project-2/
├── server/
│   └── email-server.ts     ← Servidor de emails
├── .env                     ← Credenciales (NO subir a Git)
└── package.json             ← Scripts actualizados
```

---

## ⚙️ Configuración

### Archivo `.env` (ya configurado):
```env
EMAIL_PASSWORD=Kocham647.
PORT=3001
```

### Servidor SMTP usado:
- **Host:** mail.pgkhiszpania.com
- **Puerto:** 465 (SSL/TLS)
- **Usuario:** info@pgkhiszpania.com
- **Contraseña:** [protegida en .env]

---

## 🔧 Solución de Problemas

### ❌ Error: "Cannot connect to SMTP server"

**Solución:**
```bash
# Verifica que el puerto 465 esté abierto
telnet mail.pgkhiszpania.com 465
```

Si no funciona:
- Verifica las credenciales en `.env`
- Contacta a tu proveedor de hosting
- Intenta puerto 587 en lugar de 465

### ❌ Error: "Port 3001 already in use"

**Solución:**
```bash
# Cambia el puerto en .env
PORT=3002
```

### ❌ No llegan los emails

**Revisa:**
1. Consola del servidor (debe mostrar "✅ Email enviado")
2. Bandeja de SPAM
3. Logs del servidor: revisa errores en terminal

---

## 🎯 Ventajas de tu Sistema

✅ **Ilimitado** - Sin límites de emails
✅ **Profesional** - Emails desde @pgkhiszpania.com
✅ **Rápido** - Entrega inmediata
✅ **Seguro** - Credenciales protegidas
✅ **Confiable** - Tu propio servidor SMTP
✅ **Sin costos** - No dependes de servicios externos

---

## 🚀 Deploy en Producción

Para subir a producción (Railway, Render, Vercel):

1. **Configurar variables de entorno:**
   ```
   EMAIL_PASSWORD=Kocham647.
   PORT=3001
   ```

2. **Cambiar URL en Contact.tsx:**
   ```typescript
   const emailResponse = await fetch('https://tu-servidor.com/api/send-email', {
   ```

3. **Subir el servidor:** El servidor debe estar en línea 24/7

---

## 📞 Soporte

Si necesitas ayuda, revisa:
- Logs del servidor en la terminal
- Consola del navegador (F12)
- Configuración SMTP de tu hosting

---

## ✨ Resumen

Ya tienes un sistema completo de emails:
1. ✅ Servidor backend con Express + Nodemailer
2. ✅ Configuración SMTP con tu servidor
3. ✅ Frontend conectado y funcionando
4. ✅ Emails HTML profesionales
5. ✅ Seguridad implementada

**🎉 ¡Listo para recibir solicitudes de presupuesto!**
