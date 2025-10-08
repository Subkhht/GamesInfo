# 🎮 GamesInfo - Instalación Rápida

## 📦 Paso 1: Instalar Dependencias

```powershell
npm install
```

## 🔑 Paso 2: Configurar API Key

1. Ve a https://rawg.io/apidocs
2. Crea cuenta gratuita y copia tu API Key
3. Crea archivo `.env`:

```powershell
Copy-Item .env.example .env
```

4. Abre `.env` y añade tu API key:
```env
VITE_RAWG_API_KEY=tu_api_key_aqui
```

## ▶️ Paso 3: Ejecutar

```powershell
npm run dev
```

Abre http://localhost:3000 🚀

## 🏗️ Build Producción

```powershell
npm run build
npm run preview
```

## ⚠️ Solución de Problemas

**Módulos no encontrados:**
```powershell
Remove-Item node_modules -Recurse -Force
Remove-Item package-lock.json
npm install
```

**Puerto ocupado:**
Edita `vite.config.ts` y cambia `port: 3000`

**API Key no funciona:**
- Verifica que `.env` existe en la raíz
- Variable debe ser `VITE_RAWG_API_KEY`
- Reinicia servidor después de editar

