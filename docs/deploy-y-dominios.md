# Deploy y Dominios

## Arquitectura de deploy

```
Tu Mac (local)
    ↓  git push
GitHub (PSotoAbarca/patriciosoto.cl)
    ↓  webhook automático
Vercel (build ~30-50s)
    ↓  alias automático
patriciosotoa.com ✅
```

---

## Deploy automático

Cada vez que haces `git push` a la rama `main`, Vercel detecta el cambio y redeploya automáticamente. No necesitas hacer nada más.

```bash
# Flujo estándar para publicar cambios
git add .
git commit -m "descripción del cambio"
git push
# → Vercel redeploya en ~30-50 segundos
```

### Verificar el deploy
1. Ve a [vercel.com/psotoabarcas-projects/patriciosoto-cl](https://vercel.com/psotoabarcas-projects/patriciosoto-cl)
2. En **Deployments** aparece el nuevo deploy con estado `Ready ✅`
3. O simplemente recarga `patriciosotoa.com`

---

## Deploy manual (si el automático falla)

Si por alguna razón el auto-deploy no funciona:

```bash
cd ~/Desktop/patriciosoto
vercel --prod
```

> **Nota:** Necesitas tener sesión iniciada (`vercel login`).

---

## Variables de entorno

Las variables de entorno son datos sensibles (API keys) que NO deben subirse a GitHub.

### En desarrollo local
Edita `~/Desktop/patriciosoto/.env.local`:
```
RESEND_API_KEY=re_xxxxxxxxxxxx
```
Este archivo está en `.gitignore` — nunca se sube a GitHub.

### En producción (Vercel)
1. Ve a tu proyecto en Vercel
2. **Settings → Environment Variables**
3. Agrega:
   - **Key**: `RESEND_API_KEY`
   - **Value**: tu key de Resend
   - **Environment**: Production ✅ (y Preview si quieres)
4. Clic en **Save**
5. Redeploya para que tome efecto

### Variables disponibles

| Variable | Descripción | Dónde obtenerla |
|----------|-------------|-----------------|
| `RESEND_API_KEY` | Para enviar emails desde el formulario de contacto | [resend.com](https://resend.com) → API Keys |

---

## Dominio

El dominio `patriciosotoa.com` fue comprado directamente en Vercel, por lo que el DNS está gestionado automáticamente.

### Estado actual
- Dominio: `patriciosotoa.com` ✅ Active
- SSL/TLS: Automático (Vercel genera y renueva el certificado)
- Renovación: 12 mar 2027 · $11.25/año

### Si necesitas agregar subdominios
En Vercel → Settings → Domains → Add Existing → escribe `sub.patriciosotoa.com`

---

## Repositorio GitHub

- **URL**: https://github.com/PSotoAbarca/patriciosoto.cl
- **Rama principal**: `main`
- **Auto-deploy**: Activado (cada push a `main` → redeploy en Vercel)

### Configuración git local
```bash
cd ~/Desktop/patriciosoto
git remote -v
# origin  https://github.com/PSotoAbarca/patriciosoto.cl.git (fetch)
# origin  https://github.com/PSotoAbarca/patriciosoto.cl.git (push)
```

---

## Resend (emails)

El formulario de contacto usa Resend para enviar emails.

- **Plan gratuito**: 3.000 emails/mes
- **Dashboard**: [resend.com](https://resend.com)
- **Email de envío**: Configurar en Resend → Domains → `patriciosotoa.com`

### Verificar que el formulario funciona
1. Ve a `patriciosotoa.com/contacto`
2. Llena el formulario y envía
3. Verifica en el dashboard de Resend → Emails que llegó el envío
4. Revisa tu bandeja de entrada
