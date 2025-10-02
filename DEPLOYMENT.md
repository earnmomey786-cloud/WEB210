# 🚀 Guía de Deployment

Este documento explica cómo hacer el deploy de la aplicación IRNR Tax Declaration Service.

## 📋 Opciones de Deployment

### 1. GitHub Pages (Recomendado - Gratis)

La aplicación está configurada para hacer deploy automático a GitHub Pages cuando se hace push a la rama `main`.

#### Configuración inicial:

1. Ve a tu repositorio en GitHub: https://github.com/earnmomey786-cloud/WEB210
2. Ve a **Settings** → **Pages**
3. En **Source**, selecciona **GitHub Actions**
4. El workflow ya está configurado en `.github/workflows/deploy.yml`

#### Variables de entorno (Opcional):

Si usas Supabase, configura los secrets:

1. Ve a **Settings** → **Secrets and variables** → **Actions**
2. Agrega estos secrets:
   - `VITE_SUPABASE_URL`: Tu URL de Supabase
   - `VITE_SUPABASE_ANON_KEY`: Tu clave anónima de Supabase

#### Deploy:

Cada vez que hagas push a `main`, se hará el deploy automáticamente. También puedes ejecutar el workflow manualmente:

1. Ve a **Actions** → **Deploy to GitHub Pages**
2. Click en **Run workflow**

**URL de la aplicación:** https://earnmomey786-cloud.github.io/WEB210/

---

### 2. Vercel (Alternativa - Gratis)

Vercel es excelente para aplicaciones React/Vite.

#### Pasos:

1. Ve a [vercel.com](https://vercel.com) e inicia sesión con GitHub
2. Click en **Add New** → **Project**
3. Importa el repositorio `earnmomey786-cloud/WEB210`
4. Vercel detectará automáticamente la configuración de Vite
5. Configura las variables de entorno (si usas Supabase):
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
6. Click en **Deploy**

El archivo `vercel.json` ya está configurado.

**Características:**
- Deploy automático en cada push
- Preview deployments para cada PR
- Dominio personalizado gratis (.vercel.app)
- SSL automático

---

### 3. Netlify (Alternativa - Gratis)

Netlify es otra excelente opción.

#### Pasos:

1. Ve a [netlify.com](https://netlify.com) e inicia sesión con GitHub
2. Click en **Add new site** → **Import an existing project**
3. Selecciona el repositorio `earnmomey786-cloud/WEB210`
4. La configuración se detectará automáticamente desde `netlify.toml`
5. Configura las variables de entorno (si usas Supabase):
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
6. Click en **Deploy site**

**Características:**
- Deploy automático en cada push
- Preview deployments para cada PR
- Dominio personalizado gratis (.netlify.app)
- SSL automático
- Funciones serverless disponibles

---

## 🔧 Build local

Para probar el build localmente antes del deploy:

```bash
# Instalar dependencias
npm install

# Build de producción
npm run build

# Previsualizar el build
npm run preview
```

El build se genera en la carpeta `dist/`.

---

## 🌐 Variables de Entorno

Si tu aplicación usa Supabase u otros servicios externos:

### Para desarrollo local:

Crea un archivo `.env` en la raíz del proyecto:

```env
VITE_SUPABASE_URL=tu_url_de_supabase
VITE_SUPABASE_ANON_KEY=tu_clave_anonima
```

### Para producción:

Configura las variables en la plataforma de deployment:
- **GitHub Pages**: Settings → Secrets and variables → Actions
- **Vercel**: Project Settings → Environment Variables
- **Netlify**: Site settings → Environment variables

---

## 📊 Comparación de Plataformas

| Característica | GitHub Pages | Vercel | Netlify |
|----------------|--------------|--------|---------|
| Precio | Gratis | Gratis | Gratis |
| Deploy automático | ✅ | ✅ | ✅ |
| Dominio personalizado | ✅ | ✅ | ✅ |
| SSL automático | ✅ | ✅ | ✅ |
| Preview deployments | ❌ | ✅ | ✅ |
| Funciones serverless | ❌ | ✅ | ✅ |
| Analytics | ❌ | ✅ (pagado) | ✅ (pagado) |
| Facilidad de setup | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |

---

## 🔍 Verificación del Deploy

Después del deploy, verifica:

1. ✅ La página carga correctamente
2. ✅ Todas las imágenes y assets se muestran
3. ✅ Los enlaces funcionan
4. ✅ El formulario de contacto funciona (si usa Supabase)
5. ✅ Las políticas legales están accesibles
6. ✅ El banner de cookies funciona

---

## 🐛 Troubleshooting

### El deploy falla en GitHub Actions

- Verifica que las dependencias estén en `package.json`
- Revisa los logs en la pestaña **Actions**
- Asegúrate de que el build local funciona (`npm run build`)

### La página no carga después del deploy

- Verifica que el `base` en `vite.config.ts` sea correcto
- Para GitHub Pages: `base: '/WEB210/'`
- Para Vercel/Netlify: puedes usar `base: '/'`

### Los assets no cargan

- Verifica las rutas en el código (deben ser relativas)
- Verifica el `base` en `vite.config.ts`

### Supabase no funciona

- Verifica que las variables de entorno estén configuradas
- Verifica que las claves sean correctas
- Revisa la consola del navegador para errores

---

## 📞 Soporte

Si tienes problemas con el deployment, revisa:
- [Documentación de Vite](https://vitejs.dev/guide/static-deploy.html)
- [GitHub Pages Docs](https://docs.github.com/pages)
- [Vercel Docs](https://vercel.com/docs)
- [Netlify Docs](https://docs.netlify.com)
