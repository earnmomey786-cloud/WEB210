# ✅ Checklist de Deploy - WEB210

## 📋 Antes del Deploy

### Verificaciones de código:
- [x] ✅ Build de producción funciona (`npm run build`)
- [x] ✅ Linter sin errores críticos
- [x] ✅ Configuración de rutas correcta (base path)
- [x] ✅ .gitignore configurado (excluye node_modules, dist)
- [x] ✅ Variables de entorno documentadas (.env.example)

### Archivos de configuración:
- [x] ✅ `.github/workflows/deploy.yml` - GitHub Actions
- [x] ✅ `vite.config.ts` - Base path configurado
- [x] ✅ `vercel.json` - Configuración Vercel
- [x] ✅ `netlify.toml` - Configuración Netlify
- [x] ✅ Documentación completa (DEPLOYMENT.md)

---

## 🚀 Deploy a GitHub Pages

### Paso 1: Configuración inicial en GitHub
- [ ] Ir a Settings → Pages del repositorio
- [ ] Seleccionar Source: **GitHub Actions**
- [ ] (Opcional) Configurar dominio personalizado

### Paso 2: Configurar permisos del workflow
- [ ] Ir a Settings → Actions → General
- [ ] En "Workflow permissions", seleccionar **"Read and write permissions"**
- [ ] Guardar cambios

### Paso 3: Variables de entorno (si usas Supabase)
- [ ] Ir a Settings → Secrets and variables → Actions
- [ ] Agregar secret: `VITE_SUPABASE_URL`
- [ ] Agregar secret: `VITE_SUPABASE_ANON_KEY`

### Paso 4: Hacer merge del PR
- [ ] Revisar los cambios en el Pull Request
- [ ] Hacer merge a la rama `main`
- [ ] Esperar a que se ejecute el workflow

### Paso 5: Verificar el deploy
- [ ] Ir a la pestaña **Actions**
- [ ] Verificar que "Deploy to GitHub Pages" se ejecutó correctamente
- [ ] Abrir: https://earnmomey786-cloud.github.io/WEB210/
- [ ] Verificar que la página carga correctamente
- [ ] Probar navegación entre secciones
- [ ] Verificar formulario de contacto
- [ ] Verificar políticas legales
- [ ] Verificar banner de cookies

---

## 🌐 Deploy a Vercel (Alternativa)

### Opción más rápida y fácil:

- [ ] Ir a [vercel.com](https://vercel.com)
- [ ] Iniciar sesión con GitHub
- [ ] Click en "Add New" → "Project"
- [ ] Importar repositorio `WEB210`
- [ ] Configurar variables de entorno (si necesario):
  - [ ] `VITE_SUPABASE_URL`
  - [ ] `VITE_SUPABASE_ANON_KEY`
- [ ] Click en "Deploy"
- [ ] Esperar ~1 minuto
- [ ] Verificar la URL generada (.vercel.app)

### Notas:
- ⚠️ Si usas Vercel, puedes cambiar el `base` en `vite.config.ts` a `'/'`
- ✅ Vercel ofrece deploy preview automático para cada PR
- ✅ Analytics disponibles (plan pagado)

---

## 🎨 Deploy a Netlify (Alternativa)

### Pasos:

- [ ] Ir a [netlify.com](https://netlify.com)
- [ ] Iniciar sesión con GitHub
- [ ] Click en "Add new site" → "Import from Git"
- [ ] Seleccionar repositorio `WEB210`
- [ ] Configurar variables de entorno (si necesario):
  - [ ] `VITE_SUPABASE_URL`
  - [ ] `VITE_SUPABASE_ANON_KEY`
- [ ] Click en "Deploy site"
- [ ] Esperar ~1 minuto
- [ ] Verificar la URL generada (.netlify.app)

### Notas:
- ⚠️ Si usas Netlify, puedes cambiar el `base` en `vite.config.ts` a `'/'`
- ✅ Netlify ofrece deploy preview automático para cada PR
- ✅ Funciones serverless disponibles

---

## 🔍 Post-Deploy: Verificación completa

### Funcionalidad básica:
- [ ] La página de inicio carga correctamente
- [ ] Todas las imágenes se visualizan
- [ ] Los estilos CSS se aplican correctamente
- [ ] Las animaciones funcionan

### Navegación:
- [ ] El menú de navegación funciona
- [ ] Los enlaces internos funcionan
- [ ] Los enlaces a políticas legales funcionan
- [ ] El footer es visible y funcional

### Funcionalidades específicas:
- [ ] Sección de planes de precios se muestra correctamente
- [ ] Formulario de contacto funciona (si Supabase está configurado)
- [ ] Banner de cookies aparece y funciona
- [ ] Panel de configuración de cookies funciona
- [ ] Botones "Aceptar" y "Rechazar" funcionan

### Políticas legales:
- [ ] Política de Privacidad (ES) accesible
- [ ] Política de Privacidad (PL) accesible
- [ ] Política de Cookies (ES) accesible
- [ ] Política de Cookies (PL) accesible
- [ ] Aviso Legal (ES) accesible
- [ ] Aviso Legal (PL) accesible

### SEO y metadata:
- [ ] El título de la página es correcto
- [ ] Las meta description están presentes
- [ ] El favicon aparece
- [ ] Open Graph tags funcionan (compartir en redes sociales)

### Performance:
- [ ] La página carga en menos de 3 segundos
- [ ] No hay errores en la consola del navegador
- [ ] No hay warnings importantes en la consola

### Responsive:
- [ ] Se ve bien en móvil (320px-480px)
- [ ] Se ve bien en tablet (768px-1024px)
- [ ] Se ve bien en desktop (1280px+)

---

## 🐛 Troubleshooting común

### El workflow falla en GitHub Actions:
- [ ] Verificar logs en la pestaña Actions
- [ ] Verificar que los permisos del workflow estén configurados
- [ ] Verificar que las dependencias en package.json sean correctas
- [ ] Intentar ejecutar `npm ci && npm run build` localmente

### La página no carga (404):
- [ ] Verificar que GitHub Pages esté habilitado
- [ ] Esperar 2-3 minutos después del deploy
- [ ] Verificar el `base` en vite.config.ts (debe ser '/WEB210/')
- [ ] Limpiar caché del navegador

### Los assets no cargan:
- [ ] Verificar el `base` en vite.config.ts
- [ ] Verificar que las rutas en el código sean relativas
- [ ] Revisar la consola del navegador para errores

### Supabase no funciona:
- [ ] Verificar que las variables de entorno estén configuradas
- [ ] Verificar que las claves sean correctas en los secrets
- [ ] Revisar la consola del navegador para errores de CORS
- [ ] Verificar configuración de RLS en Supabase

---

## 📊 Métricas de éxito

Después del deploy, deberías tener:

- ✅ URL pública funcionando
- ✅ Deploy automático en cada push a main
- ✅ Formularios funcionando (si Supabase configurado)
- ✅ SSL/HTTPS habilitado
- ✅ Performance score > 90 (PageSpeed Insights)
- ✅ Sin errores en consola

---

## 🎉 Deploy completado

¡Felicidades! Tu aplicación está ahora en producción.

### Próximos pasos opcionales:

- [ ] Configurar dominio personalizado
- [ ] Configurar Google Analytics
- [ ] Configurar monitoreo de errores (Sentry)
- [ ] Configurar backups de base de datos
- [ ] Configurar notificaciones de deploy
- [ ] Configurar CDN para assets
- [ ] Optimizar imágenes (WebP)
- [ ] Implementar caché agresivo

---

## 📞 Recursos adicionales

- [Documentación de Vite](https://vitejs.dev/guide/static-deploy.html)
- [GitHub Pages Docs](https://docs.github.com/pages)
- [Vercel Docs](https://vercel.com/docs)
- [Netlify Docs](https://docs.netlify.com)
- [Supabase Docs](https://supabase.com/docs)
