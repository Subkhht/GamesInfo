# 🎮 GamesInfo

Aplicación web profesional para buscar, guardar y revisar videojuegos con React, TypeScript y TailwindCSS.

![React](https://img.shields.io/badge/React-18.3-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue) ![Vite](https://img.shields.io/badge/Vite-5.4-purple) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-cyan)

## 🚀 Stack Tecnológico

**Core:** React 18 • TypeScript • Vite • TailwindCSS  
**Estado:** Zustand • React Query • LocalStorage Persist  
**UI/UX:** Framer Motion • Lucide React  
**Routing:** React Router v6 con Lazy Loading  

## ✨ Características

- 🔍 **Búsqueda avanzada** - Filtros por plataforma, género y ordenamiento
- ❤️ **Favoritos** - Gestión con persistencia local
- 🏆 **Completados** - Seguimiento de juegos terminados
- ⭐ **Reviews** - Sistema de calificación 1-5 estrellas
- 🔞 **Clasificación PEGI/ESRB** - Información de edad destacada
- 🎨 **Animaciones fluidas** - Transiciones con Framer Motion
- 📱 **Responsive** - Adaptado a móvil, tablet y desktop

## 📦 Instalación

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar API Key
cp .env.example .env
# Edita .env y añade tu RAWG API key desde https://rawg.io/apidocs

# 3. Ejecutar
npm run dev
```

## 📜 Scripts

```bash
npm run dev      # Desarrollo con HMR
npm run build    # Build de producción
npm run preview  # Preview del build
npm run lint     # Linting con ESLint
npm run format   # Formateo con Prettier
```

## 🏗️ Estructura

```
src/
├── components/
│   ├── game/      # GameCard con animaciones
│   ├── layout/    # Header con navegación
│   └── ui/        # Componentes reutilizables
├── pages/         # Páginas con lazy loading
├── services/      # API services (Axios + RAWG)
├── store/         # Zustand store con persist
├── types/         # TypeScript types
└── App.tsx        # Router principal
```

## 🚀 Deployment

**Vercel:**
```bash
npm i -g vercel && vercel
```

**Netlify:**
```bash
npm run build
# Sube la carpeta 'dist'
```

## 🔑 Configuración

### API Key
Obtén tu API key gratuita en [RAWG.io](https://rawg.io/apidocs) y añádela en `.env`:

```env
VITE_RAWG_API_KEY=tu_api_key_aqui
```

### Path Aliases
```typescript
import { Component } from '@components/Component';
import { useStore } from '@store/store';
```

## 📚 Tecnologías Clave

- **Zustand** - Estado global ligero (alternativa a Redux)
- **React Query** - Data fetching con caché automático
- **Framer Motion** - Animaciones declarativas
- **TailwindCSS** - Utility-first CSS
- **TypeScript** - Type safety completo
- **Vite** - Build tool rápido con HMR

## 🐛 Troubleshooting

**API Key no funciona:**
- Verifica que `.env` existe en la raíz
- Variable debe llamarse `VITE_RAWG_API_KEY`
- Reinicia el servidor después de editar `.env`

**Módulos no encontrados:**
```bash
rm -rf node_modules package-lock.json
npm install
```

---

**Desarrollado con ❤️ usando React + TypeScript**

🎮 ¡Happy Gaming! 🎮
