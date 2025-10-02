# 🚀 Deploy Rápido - Guía de 5 minutos

## ✅ Lo que ya está hecho:

- ✅ Workflow de GitHub Actions configurado
- ✅ Configuración de Vite para GitHub Pages
- ✅ Archivos de configuración para Vercel y Netlify
- ✅ Build testeado y funcionando

## 🎯 Pasos para activar el deploy (GitHub Pages):

### 1. Habilitar GitHub Pages (2 minutos)

1. Ve a tu repositorio: https://github.com/earnmomey786-cloud/WEB210
2. Click en **Settings** (Configuración)
3. En el menú lateral, click en **Pages**
4. En **Source** (Fuente), selecciona: **GitHub Actions**
5. ¡Listo! El deploy se activará automáticamente

### 2. Hacer merge del Pull Request (1 minuto)

Una vez que hayas habilitado GitHub Pages:

1. Ve al Pull Request que se creó automáticamente
2. Click en **Merge pull request**
3. Confirma el merge

### 3. Esperar el deploy (2 minutos)

1. Ve a la pestaña **Actions** en tu repositorio
2. Verás el workflow "Deploy to GitHub Pages" ejecutándose
3. Espera a que termine (toma ~2 minutos)
4. Tu sitio estará disponible en: **https://earnmomey786-cloud.github.io/WEB210/**

---

## 🔧 Variables de entorno (Opcional)

Si usas Supabase u otros servicios:

1. Ve a **Settings** → **Secrets and variables** → **Actions**
2. Click en **New repository secret**
3. Agrega:
   - Nombre: `VITE_SUPABASE_URL`
   - Valor: Tu URL de Supabase
4. Repite para `VITE_SUPABASE_ANON_KEY`

---

## 🎨 Alternativas más fáciles (Opcionales)

### Vercel (Recomendado si quieres algo más simple):

1. Ve a [vercel.com](https://vercel.com)
2. Inicia sesión con GitHub
3. Click en **Add New** → **Project**
4. Selecciona el repo `WEB210`
5. Click en **Deploy**
6. ¡Listo en 1 minuto!

### Netlify:

1. Ve a [netlify.com](https://netlify.com)
2. Inicia sesión con GitHub
3. **Add new site** → **Import from Git**
4. Selecciona el repo `WEB210`
5. Click en **Deploy**
6. ¡Listo en 1 minuto!

---

## 📊 ¿Qué opción elegir?

| Opción | Dificultad | Velocidad | Características |
|--------|------------|-----------|-----------------|
| **GitHub Pages** | ⭐⭐⭐ | 2 min | Gratis, integrado con GitHub |
| **Vercel** | ⭐ | 1 min | **MÁS FÁCIL**, Preview PRs, Analytics |
| **Netlify** | ⭐ | 1 min | Similar a Vercel, muy popular |

**Recomendación:** Si quieres la opción más rápida y fácil, usa **Vercel**.

---

## ❓ Problemas comunes

### "No veo la opción GitHub Actions en Pages"
- Asegúrate de que el repositorio es público o tienes GitHub Pro
- Espera unos segundos y refresca la página

### "El workflow falla"
- Ve a la pestaña **Actions** y revisa el error
- Usualmente es porque faltan permisos. Ve a **Settings** → **Actions** → **General** → **Workflow permissions** y selecciona "Read and write permissions"

### "La página no carga"
- Espera 2-3 minutos después del deploy
- Limpia el caché del navegador (Ctrl+F5 o Cmd+Shift+R)

---

## 📞 ¿Necesitas ayuda?

Consulta la guía completa en [DEPLOYMENT.md](./DEPLOYMENT.md)
