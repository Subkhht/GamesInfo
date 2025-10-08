# 🚀 Guía de Despliegue en GitHub Pages

## 📋 Pasos para Desplegar

### 1️⃣ Preparar el Repositorio

Primero, asegúrate de que todo esté commiteado:

```powershell
git add .
git commit -m "Preparar para despliegue en GitHub Pages"
git push origin main
```

### 2️⃣ Configurar el Secreto de la API Key

1. Ve a tu repositorio en GitHub: `https://github.com/Subkhht/GamesInfo`
2. Haz clic en **Settings** (Configuración)
3. En el menú izquierdo, ve a **Secrets and variables** → **Actions**
4. Haz clic en **New repository secret**
5. Configura:
   - **Name**: `VITE_RAWG_API_KEY`
   - **Secret**: `95454f89ab8943dc9878380ef9c1f72b`
6. Haz clic en **Add secret**

### 3️⃣ Habilitar GitHub Pages

1. En tu repositorio, ve a **Settings**
2. En el menú izquierdo, busca **Pages**
3. En **Source**, selecciona: **GitHub Actions**
4. Guarda los cambios

### 4️⃣ Verificar el Despliegue

1. Ve a la pestaña **Actions** en tu repositorio
2. Deberías ver un workflow ejecutándose llamado "Deploy to GitHub Pages"
3. Espera a que termine (tarda 2-3 minutos)
4. Una vez completado, tu sitio estará disponible en:
   
   **🌐 https://subkhht.github.io/GamesInfo/**

### 5️⃣ Despliegue Automático

Cada vez que hagas `git push` a la rama `main`, se desplegará automáticamente la nueva versión.

---

## 🔧 Configuración Realizada

### ✅ Archivos Modificados/Creados:

1. **`vite.config.ts`**
   - Agregado `base: '/GamesInfo/'` para que funcione en GitHub Pages

2. **`.github/workflows/deploy.yml`**
   - Workflow de GitHub Actions para despliegue automático
   - Instala dependencias
   - Crea archivo .env con la API key
   - Construye el proyecto
   - Despliega a GitHub Pages

### ✅ Variables de Entorno:

La API key se configura como **GitHub Secret** para mantenerla segura.

---

## 🎮 Comandos Útiles

### Build Local (para probar antes de subir)
```powershell
npm run build
```

### Preview del Build Local
```powershell
npm run preview
```

### Subir Cambios y Desplegar
```powershell
git add .
git commit -m "Descripción de los cambios"
git push origin main
```

---

## 🐛 Solución de Problemas

### El sitio no carga correctamente
- Verifica que el `base` en `vite.config.ts` coincida con el nombre de tu repositorio
- Debe ser: `base: '/GamesInfo/'` (con barras al inicio y final)

### La API key no funciona
- Verifica que el secret en GitHub esté configurado correctamente
- El nombre debe ser exactamente: `VITE_RAWG_API_KEY`

### El workflow falla
- Ve a la pestaña **Actions** para ver los logs de error
- Verifica que GitHub Pages esté habilitado en Settings → Pages

---

## 📦 Estructura del Proyecto para Deploy

```
GamesInfo/
├── .github/
│   └── workflows/
│       └── deploy.yml       # ✅ Workflow de despliegue
├── dist/                    # 📦 Build generado (no subir a git)
├── src/                     # 💻 Código fuente
├── vite.config.ts           # ✅ Configurado con base para GitHub Pages
├── package.json
└── .env                     # ⚠️ No subir a git (ya en .gitignore)
```

---

## 🎉 ¡Listo!

Una vez configurado todo, tu aplicación estará disponible en:

### 🌐 https://subkhht.github.io/GamesInfo/

Y se actualizará automáticamente cada vez que hagas push a main.
