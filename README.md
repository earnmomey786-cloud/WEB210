# IRNR Tax Declaration Service (Model 210)

Una aplicación web profesional para servicios de declaración del impuesto IRNR (modelo 210) en España, dirigida a propietarios polacos de propiedades inmobiliarias.

## 🌟 Características

- **Interfaz moderna** con React 18 y TypeScript
- **Diseño responsive** optimizado para móviles y desktop
- **Animaciones atractivas** con efectos de máquina de escribir
- **Formularios funcionales** conectados a Supabase
- **SEO optimizado** con datos estructurados
- **Base de datos** para gestión de consultas y presupuestos

## 🛠️ Tecnologías

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Build Tool**: Vite
- **Base de datos**: Supabase
- **Animaciones**: Motion
- **Iconos**: Lucide React
- **Estilos**: Tailwind CSS con componentes personalizados

## 🚀 Instalación

1. Clona el repositorio:
```bash
git clone [URL-del-repositorio]
cd project-2
```

2. Instala las dependencias:
```bash
npm install
```

3. Inicia el servidor de desarrollo:
```bash
npm run dev
```

4. Abre [http://localhost:5173](http://localhost:5173) en tu navegador

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes React
│   ├── ui/             # Componentes UI reutilizables
│   ├── Header.tsx      # Navegación principal
│   ├── Hero.tsx        # Sección hero
│   ├── ServicePlans.tsx # Planes de servicios
│   ├── Contact.tsx     # Formulario de contacto
│   ├── CookieBanner.tsx # Banner de cookies RGPD
│   └── ...
├── lib/                # Utilidades y configuraciones
├── pages/              # Páginas principales
│   ├── legal/          # Páginas legales
│   │   ├── PrivacyPolicy.tsx
│   │   ├── CookiesPolicy.tsx
│   │   └── LegalNotice.tsx
│   └── Home.tsx
└── types/              # Definiciones de TypeScript
```

## 🎯 Funcionalidades

- **Página de inicio** con información completa del servicio
- **Planes de precios** claramente definidos
- **Proceso paso a paso** explicado
- **Formulario de contacto** funcional
- **Sección FAQ** con preguntas frecuentes
- **Optimización SEO** completa
- **Políticas legales completas** (RGPD/GDPR)
- **Banner de cookies** conforme AEPD 2024/25
- **Gestión de consentimientos** granular

## 🔧 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Vista previa de la build de producción
- `npm run lint` - Ejecuta el linter

## 🚀 Deployment

Esta aplicación está configurada para hacer deploy automático a **GitHub Pages** cuando se hace push a la rama `main`.

**URL de producción:** https://earnmomey786-cloud.github.io/WEB210/

### 🎯 Guía rápida de 5 minutos:

👉 **[DEPLOY-QUICK-START.md](./DEPLOY-QUICK-START.md)** - Instrucciones paso a paso

### Opciones de Deployment:

1. **GitHub Pages** (Configurado) - Deploy automático via GitHub Actions
2. **Vercel** - Configuración incluida en `vercel.json` (más fácil)
3. **Netlify** - Configuración incluida en `netlify.toml`

Para más detalles técnicos, consulta [DEPLOYMENT.md](./DEPLOYMENT.md)

## ⚖️ Cumplimiento Legal

### 📋 Políticas Implementadas
- **Política de Privacidad** (ES/PL) - Conforme RGPD
- **Política de Cookies** (ES/PL) - Conforme AEPD 2024/25
- **Aviso Legal** (ES/PL) - Normativa española

### 🍪 Gestión de Cookies
- Banner conforme AEPD con botones "Aceptar" y "Rechazar" equivalentes
- Panel de configuración granular por categorías
- Acceso permanente a gestión de consentimientos
- Registro de decisiones del usuario

### 📊 Datos de Empresa Requeridos
Los siguientes datos están pendientes de completar:
- Denominación social completa
- CIF/NIF definitivo
- Dirección del domicilio social
- Teléfono de contacto
- Datos del Registro Mercantil
- Información del DPO (si aplica)

## 📞 Contacto

Este proyecto está diseñado para ayudar a propietarios polacos de inmuebles en España con sus declaraciones de impuestos IRNR.

---

Desarrollado con ❤️ usando React, TypeScript y Vite