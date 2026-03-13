# Documentación — patriciosotoa.com

Bienvenido a la documentación del sitio web personal de Patricio Soto A.

## Índice

| Documento | Descripción |
|-----------|-------------|
| [flujo-editorial.md](./flujo-editorial.md) | Cómo publicar un nuevo artículo desde el pipeline LinkedIn |
| [estructura-proyecto.md](./estructura-proyecto.md) | Arquitectura de carpetas y stack técnico |
| [buenas-practicas-mdx.md](./buenas-practicas-mdx.md) | Convenciones para escribir artículos en MDX |
| [deploy-y-dominios.md](./deploy-y-dominios.md) | Deploy automático, Vercel y configuración de dominio |
| [personalizacion.md](./personalizacion.md) | Cómo cambiar textos, colores y agregar páginas |
| [seguridad.md](./seguridad.md) | Auditoría de seguridad, headers HTTP, validación y checklist de deploy |

## Filosofía del proyecto

Este sitio es la presencia digital de **Patricio Soto Abarca**, Ingeniero Civil Electricista con más de 14 años en el sector energético chileno. Refleja tres pilares:

1. **Contenido técnico de valor** — análisis de mercados eléctricos, energía renovable y planificación estratégica, publicados como artículos MDX vinculados a LinkedIn
2. **Digitalización y datos** — el sitio mismo es un ejemplo del enfoque analítico: flujo editorial automatizado, deploy continuo, métricas
3. **Ciberseguridad como principio transversal** — cada capa del stack aplica defensa en profundidad: validación de inputs con Zod, sanitización HTML, security headers HTTP, rate limiting y protección de secretos. Ver [seguridad.md](./seguridad.md) para el detalle completo

## Resumen rápido del flujo

```
Pipeline LinkedIn genera briefing.md
        ↓
Renombrar a [slug].mdx y pegar en content/columna/
        ↓
git add . && git commit -m "new: título del artículo" && git push
        ↓
Vercel detecta el push y redeploya automáticamente (~30s)
        ↓
patriciosotoa.com/columna/[slug] está live
        ↓
Comentar en el post de LinkedIn con el link
```

## Stack

- **Framework**: Next.js 14 (App Router)
- **Estilos**: Tailwind CSS
- **Artículos**: MDX (Markdown + JSX) con `next-mdx-remote`
- **Animaciones**: Framer Motion
- **Email**: Resend
- **Deploy**: Vercel (auto-deploy en cada push a `main`)
- **Dominio**: patriciosotoa.com (comprado en Vercel)
- **Repo**: [github.com/PSotoAbarca/patriciosoto.cl](https://github.com/PSotoAbarca/patriciosoto.cl)
