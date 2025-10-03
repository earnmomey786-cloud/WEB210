# Guía de Implementación HTTPS y Seguridad

## 📋 Resumen

Este documento describe las medidas de seguridad implementadas en **podatkihiszpania.com** para garantizar la protección de datos de usuarios y cumplir con las mejores prácticas de seguridad web.

---

## 🔒 HTTPS y Certificado SSL

### Estado Actual
- ✅ La aplicación está preparada para funcionar con HTTPS
- ✅ Todos los recursos externos usan HTTPS (Google Analytics, Supabase)
- ✅ Meta tag `upgrade-insecure-requests` implementado

### Configuración del Certificado SSL

#### Para Netlify:
1. El certificado SSL se genera automáticamente al desplegar
2. Netlify proporciona certificados Let's Encrypt gratuitos
3. Renovación automática cada 3 meses

#### Para Vercel:
1. Certificado SSL automático con cada deployment
2. Incluye certificados para dominios personalizados
3. Renovación automática

#### Para otros hostings:
1. Obtener certificado SSL de Let's Encrypt (gratuito) o un proveedor comercial
2. Configurar el certificado en el panel del hosting
3. Configurar renovación automática

---

## 🛡️ Headers de Seguridad Implementados

### 1. HSTS (HTTP Strict Transport Security)
```
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
```
- **Función**: Fuerza a los navegadores a usar siempre HTTPS
- **Duración**: 1 año (31536000 segundos)
- **Alcance**: Incluye todos los subdominios
- **Preload**: Permite incluir el dominio en la lista HSTS de navegadores

### 2. Content Security Policy (CSP)
```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://*.supabase.co https://www.google-analytics.com; frame-ancestors 'self';
```
- **Función**: Define qué recursos pueden cargarse y desde dónde
- **Protección**: Previene ataques XSS y inyección de código malicioso
- **Servicios permitidos**: Google Analytics, Supabase

### 3. X-Content-Type-Options
```
X-Content-Type-Options: nosniff
```
- **Función**: Previene MIME-sniffing
- **Protección**: Evita que el navegador interprete archivos como tipos diferentes

### 4. X-Frame-Options
```
X-Frame-Options: SAMEORIGIN
```
- **Función**: Protección contra clickjacking
- **Restricción**: Solo permite embeber la página en iframes del mismo origen

### 5. Referrer-Policy
```
Referrer-Policy: strict-origin-when-cross-origin
```
- **Función**: Controla qué información de referrer se envía
- **Privacidad**: Protege la privacidad de los usuarios

### 6. X-XSS-Protection
```
X-XSS-Protection: 1; mode=block
```
- **Función**: Protección XSS para navegadores antiguos
- **Acción**: Bloquea la página si detecta un ataque

### 7. Permissions-Policy
```
Permissions-Policy: camera=(), microphone=(), geolocation=()
```
- **Función**: Restringe el acceso a APIs sensibles del navegador
- **Restricción**: Desactiva cámara, micrófono y geolocalización

---

## 📁 Archivos de Configuración

### `netlify.toml`
Configuración para deployment en Netlify:
- Headers de seguridad
- Redirecciones HTTP → HTTPS
- Redirecciones www → non-www
- Configuración de caché

### `vercel.json`
Configuración para deployment en Vercel:
- Headers de seguridad
- Configuración compatible con Vercel

### `index.html`
Meta tags de seguridad:
- `upgrade-insecure-requests`: Actualiza recursos HTTP a HTTPS automáticamente
- Headers de seguridad básicos

---

## 🔐 Protección de Formularios

### Formulario de Contacto
- ✅ **Ubicación**: Componente `Contact.tsx`
- ✅ **Backend**: Supabase (conexión HTTPS)
- ✅ **Protección**: Todos los datos se envían a través de HTTPS
- ✅ **Validación**: Validación de datos en el frontend

### Recomendaciones Adicionales
1. **Validación en Backend**: Implementar validación adicional en Supabase
2. **Rate Limiting**: Limitar número de envíos por IP/usuario
3. **CAPTCHA**: Considerar añadir reCAPTCHA para prevenir spam
4. **Sanitización**: Sanitizar todos los inputs antes de guardar

---

## 🚀 Pasos de Deployment

### 1. Netlify
```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

### 2. Vercel
```bash
# Instalar Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

### 3. Configuración de Dominio
1. Apuntar DNS a los servidores del hosting
2. Esperar propagación DNS (24-48 horas)
3. Verificar certificado SSL en el panel del hosting
4. Probar HTTPS: https://podatkihiszpania.com

---

## ✅ Checklist de Seguridad

- [x] Certificado SSL configurado
- [x] HSTS habilitado
- [x] Content Security Policy implementada
- [x] Protección contra clickjacking (X-Frame-Options)
- [x] Protección MIME-sniffing
- [x] Política de referrer configurada
- [x] Headers de seguridad en archivos de configuración
- [x] Redirecciones HTTP → HTTPS
- [x] Formularios protegidos con HTTPS
- [x] Google Analytics funciona con HTTPS
- [x] Supabase conexión segura (HTTPS)

---

## 🧪 Testing de Seguridad

### Herramientas Recomendadas

1. **SSL Labs**: https://www.ssllabs.com/ssltest/
   - Analiza la configuración SSL/TLS
   - Calificación A+ esperada

2. **Security Headers**: https://securityheaders.com/
   - Verifica los headers de seguridad
   - Calificación A esperada

3. **Mozilla Observatory**: https://observatory.mozilla.org/
   - Análisis completo de seguridad
   - Recomendaciones de mejora

4. **Google PageSpeed Insights**: https://pagespeed.web.dev/
   - Incluye verificación de HTTPS
   - Análisis de rendimiento

### Comandos de Prueba

```bash
# Verificar headers con curl
curl -I https://podatkihiszpania.com

# Verificar HSTS
curl -I -s https://podatkihiszpania.com | grep -i strict

# Verificar redirección HTTP → HTTPS
curl -I http://podatkihiszpania.com
```

---

## 📊 Monitoreo Continuo

### Renovación de Certificados
- **Netlify/Vercel**: Automático
- **Otros hostings**: Configurar renovación automática (cron job)

### Alertas
- Configurar alertas para expiración de certificados
- Monitorear logs de seguridad
- Revisar Google Search Console para problemas HTTPS

---

## 🔄 Mantenimiento

### Mensual
- [ ] Verificar certificado SSL (no expirado)
- [ ] Revisar logs de seguridad
- [ ] Probar formularios en HTTPS

### Trimestral
- [ ] Ejecutar tests de seguridad completos
- [ ] Revisar y actualizar CSP si hay nuevos servicios
- [ ] Auditoría de dependencias (npm audit)

### Anual
- [ ] Revisión completa de políticas de seguridad
- [ ] Actualizar documentación
- [ ] Considerar HSTS preload: https://hstspreload.org/

---

## 📞 Soporte

Para problemas de seguridad o HTTPS:
- **Email**: kontakt@podatkihiszpania.com
- **Documentación**: Este archivo
- **Recursos**: Ver sección de herramientas de testing

---

## 🔗 Referencias

- [OWASP Security Headers](https://owasp.org/www-project-secure-headers/)
- [MDN Web Security](https://developer.mozilla.org/en-US/docs/Web/Security)
- [Google HTTPS Guidelines](https://developers.google.com/search/docs/advanced/security/https)
- [Let's Encrypt](https://letsencrypt.org/)
- [HSTS Preload](https://hstspreload.org/)

---

**Última actualización**: 3 de octubre de 2025
**Versión**: 1.0
**Responsable**: Equipo de Desarrollo
