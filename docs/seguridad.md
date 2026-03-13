# Seguridad del sitio patriciosotoa.com

## Filosofía: Defensa en Profundidad

Este sitio aplica el principio de **defensa en profundidad**: nunca confiar en una sola capa de protección. Cada vector de ataque se mitiga en múltiples niveles:

```
Usuario          → Validación cliente (ContactForm.tsx)
                        ↓
Servidor         → Validación + sanitización (route.ts con Zod + sanitize-html)
                        ↓
Red / Headers    → HTTP Security Headers (next.config.mjs)
                        ↓
Repositorio      → .gitignore protege secretos
                        ↓
Producción       → Variables de entorno en Vercel (nunca en código)
```

---

## Headers de Seguridad Implementados

Definidos en `next.config.mjs`, aplicados a **todas las rutas**:

| Header | Valor | Protección |
|--------|-------|-----------|
| `X-Content-Type-Options` | `nosniff` | Evita que el browser interprete archivos con tipo incorrecto (MIME sniffing) |
| `X-Frame-Options` | `DENY` | Bloquea clickjacking — nadie puede embeber el sitio en un iframe |
| `X-XSS-Protection` | `1; mode=block` | Filtro XSS legacy para browsers antiguos |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Limita qué información de URL se envía a sitios externos |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=()` | El sitio no puede acceder a cámara, micrófono ni ubicación |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` | Fuerza HTTPS por 2 años — previene ataques de downgrade a HTTP |
| `Content-Security-Policy` | Ver abajo | Controla qué recursos puede cargar el browser |

### Content Security Policy (CSP)

```
default-src 'self'
script-src 'self' 'unsafe-eval' 'unsafe-inline'
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com
font-src 'self' https://fonts.gstatic.com
img-src 'self' data: blob:
connect-src 'self' https://api.resend.com
frame-ancestors 'none'
base-uri 'self'
form-action 'self'
```

> **Nota**: `unsafe-eval` y `unsafe-inline` son requeridos por Next.js y Framer Motion en la versión actual. A medida que el stack madure, estos pueden eliminarse usando nonces o hashes.

---

## Validación y Sanitización de Inputs

### Esquema Zod (`app/api/contact/route.ts`)

```typescript
const ContactSchema = z.object({
  name:    z.string().min(1).max(100).trim(),
  email:   z.string().email().max(254).trim(),   // RFC 5321
  subject: z.string().min(1).max(200).trim(),
  message: z.string().min(1).max(2000).trim(),
  website: z.string().max(0).optional(),          // honeypot
});
```

### Sanitización HTML

Todos los campos pasan por `sanitize-html` con `allowedTags: []` antes de ser incluidos en el email:

```typescript
function clean(value: string): string {
  return sanitizeHtml(value, { allowedTags: [], allowedAttributes: {} });
}
```

Esto elimina cualquier payload XSS como `<script>alert(1)</script>` o `<img src=x onerror="...">`.

---

## Rate Limiting

**Política**: máximo 5 envíos por IP por hora.

Implementado con un contador en memoria (`Map`) en `app/api/contact/route.ts`. En caso de exceder el límite, la API retorna HTTP 429.

> **Limitación**: el contador se resetea en cada cold start de Vercel (funciones serverless). Para producción de mayor escala, migrar a **Upstash Redis** para persistencia entre instancias.

---

## Protección Anti-Bots (Honeypot)

El formulario incluye un campo oculto `website` que los bots suelen completar:
- Invisible para usuarios reales (`display:none`, `aria-hidden`, `tabIndex=-1`)
- Si llega con valor → el servidor responde con éxito simulado (silently reject)
- Sin fricción para usuarios legítimos (sin CAPTCHA)

---

## Variables de Entorno

### Regla fundamental
> **Nunca commitear secretos al repositorio.** Siempre usar variables de entorno.

### Local (`~/Desktop/patriciosoto/.env.local`)
```
RESEND_API_KEY=re_xxxxxxxxxxxx
```

### Producción (Vercel Dashboard)
Settings → Environment Variables → Production:
```
RESEND_API_KEY = re_xxxxxxxxxxxx
```

### Lo que NO va en el repo
El `.gitignore` excluye explícitamente:
```
.env
.env.production
.env.staging
.env.development
secrets/
*.key
*.privatekey
```

---

## Vulnerabilidades Conocidas (Pendientes)

### Next.js 14.x — DoS via Image Optimizer
- **CVE**: GHSA-9g9p-9gw9-jx7f
- **Severidad**: High
- **Estado**: Sin mitigación de upgrade (requiere Next.js 15+ con breaking changes)
- **Mitigación aplicada**: No se usan `remotePatterns` en Image Optimizer → superficie de ataque mínima
- **Acción futura**: Evaluar upgrade a Next.js 15 cuando el ecosistema (Framer Motion, MDX) lo soporte

### glob (ESLint dependency) — Command Injection
- **CVE**: GHSA-5j98-mcp5-4vw2
- **Severidad**: High
- **Contexto**: Solo afecta `eslint-config-next` (devDependency — no se ejecuta en producción)
- **Mitigación**: No ejecutar `eslint` en ambientes no confiables
- **Acción futura**: Upgrade cuando `eslint-config-next@15` sea estable

---

## Checklist de Seguridad — Antes de Cada Deploy

- [ ] `npm audit` — revisar nuevas vulnerabilidades
- [ ] Las API keys están en Vercel env vars, NO en el código
- [ ] Los archivos `.env*` no están en `git status`
- [ ] El formulario de contacto rechaza inputs maliciosos
- [ ] El sitio carga con HTTPS en patriciosotoa.com

---

## Checklist — Al Agregar una Nueva Feature

- [ ] ¿Acepta input del usuario? → Validar con Zod en el servidor
- [ ] ¿Renderiza contenido externo? → Sanitizar con `sanitize-html`
- [ ] ¿Agrega nuevas URLs externas? → Actualizar CSP en `next.config.mjs`
- [ ] ¿Requiere nuevas env vars? → Agregar en Vercel Dashboard Y en `.env.local` (nunca en código)
- [ ] ¿Instala nueva dependencia? → Correr `npm audit` después

---

## Recursos de Referencia

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Next.js Security Headers](https://nextjs.org/docs/app/api-reference/next-config-js/headers)
- [Content Security Policy Reference](https://content-security-policy.com/)
- [Zod Documentation](https://zod.dev)
- [Resend Security](https://resend.com/docs/security)
