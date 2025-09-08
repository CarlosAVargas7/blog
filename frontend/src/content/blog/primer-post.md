---
title: "Solución encontrada ✅  
"
date: 2025-09-07
tags: ["bun", "svelte", "astro", "vercel", "despliegue"]
---
---
Después de varias horas de pruebas, el problema se resolvió ajustando la configuración de despliegue en Vercel y corrigiendo el manejo del directorio de salida.  

**Pasos que resolvieron el error:**

1. **Configurar correctamente el proyecto en Vercel**  
   - **Framework Preset:** Astro  
   - **Root Directory:** `frontend`  
   - **Build Command:**  
     ```bash
     bun install && bun run build
     ```  
   - **Install Command:**  
     ```bash
     bun install
     ```  
   - **Output Directory:** `.vercel/output`  
     *(Importante: configurarlo explícitamente; si se deja vacío, Vercel usa `dist` por defecto, lo que en este caso provocaba el error)*  

2. **Ignorar `.vercel/output` en Git**  
   Añadir en `.gitignore`:  
   ```
   .vercel/output
   ```  
   Esto evita subir artefactos de builds locales y permite que Vercel genere su propia salida limpia en cada despliegue.

Con esta configuración, el build en Vercel genera correctamente la estructura SSR y el archivo de entrada del servidor, eliminando el error `ERR_MODULE_NOT_FOUND` al buscar `dist/server/entry.mjs`.

---

**Cierro la issue** porque el despliegue ahora funciona correctamente con SSR y páginas estáticas según lo esperado.  

---