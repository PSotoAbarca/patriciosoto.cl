# Estructura del Proyecto

## Árbol de carpetas

```
patriciosoto/
│
├── app/                          # Páginas (Next.js App Router)
│   ├── layout.tsx                # Layout global: Nav + Footer + metadata
│   ├── page.tsx                  # Home: Hero + Acerca de + Artículos + Proyectos + CTA
│   ├── globals.css               # Estilos globales (Tailwind base)
│   ├── favicon.ico
│   │
│   ├── columna/
│   │   ├── page.tsx              # /columna — Listado de todos los artículos
│   │   └── [slug]/
│   │       └── page.tsx          # /columna/[slug] — Artículo individual
│   │
│   ├── proyectos/
│   │   └── page.tsx              # /proyectos — Grid de proyectos
│   │
│   ├── contacto/
│   │   └── page.tsx              # /contacto — Formulario de contacto
│   │
│   └── api/
│       └── contact/
│           └── route.ts          # API: POST /api/contact → envía email via Resend
│
├── components/                   # Componentes reutilizables
│   ├── Nav.tsx                   # Barra de navegación sticky
│   ├── Footer.tsx                # Pie de página
│   ├── HeroSection.tsx           # Hero de la home (nombre + tagline + CTAs)
│   ├── AboutSection.tsx          # Sección "Acerca de mí" (foto + bio)
│   ├── ArticleCard.tsx           # Card de artículo (borde verde + línea dorada)
│   ├── ProjectCard.tsx           # Card de proyecto (mismo estilo)
│   ├── ContactForm.tsx           # Formulario de contacto con validación
│   └── ReadingProgress.tsx       # Barra de progreso de lectura
│
├── content/
│   └── columna/                  # ← AQUÍ van los artículos .mdx
│       └── ejemplo.mdx
│
├── lib/
│   ├── mdx.ts                    # getArticles(), getArticleBySlug()
│   ├── projects.ts               # FEATURED_PROJECTS (datos de proyectos)
│   └── utils.ts                  # Utilidades (formatDate, etc.)
│
├── public/                       # Archivos estáticos
│   ├── foto-perfil.png           # Foto de perfil (sección Acerca de mí)
│   ├── og-image.png              # Imagen Open Graph (redes sociales)
│   └── columna/                  # Imágenes de artículos
│       └── *.png / *.jpg
│
├── docs/                         # ← Esta carpeta: documentación
│
├── .env.local                    # Variables de entorno locales (NO commitear)
├── tailwind.config.ts            # Config Tailwind + colores brand
├── next.config.mjs               # Config Next.js (MDX, imágenes)
├── tsconfig.json
└── package.json
```

---

## Stack técnico

| Tecnología | Versión | Rol |
|------------|---------|-----|
| Next.js | 14 | Framework (App Router) |
| React | 18 | UI |
| TypeScript | 5 | Tipado |
| Tailwind CSS | 3 | Estilos |
| Framer Motion | 11 | Animaciones |
| next-mdx-remote | 4 | Renderizado MDX |
| gray-matter | 4 | Parseo de frontmatter |
| Resend | 4 | Envío de emails |

---

## Colores del sistema de diseño

```js
// tailwind.config.ts
brand: {
  bg:    '#F0F3F0',  // Fondo general (gris verdoso suave)
  green: '#1A6B3C',  // Verde principal (borde cards, botones, acentos)
  gold:  '#F1C40F',  // Dorado (líneas separadoras, acentos secundarios)
  dark:  '#1C1C1E',  // Texto principal (casi negro)
}
```

---

## Rutas del sitio

| Ruta | Descripción |
|------|-------------|
| `/` | Home: Hero + Acerca de mí + Últimos artículos + Proyectos + CTA |
| `/columna` | Listado completo de artículos del blog |
| `/columna/[slug]` | Artículo individual |
| `/proyectos` | Proyectos y trabajos |
| `/contacto` | Formulario de contacto |
| `/api/contact` | API interna para enviar emails |

---

## Variables de entorno

```bash
# .env.local (desarrollo)
RESEND_API_KEY=re_xxxxxxxxxxxx

# En Vercel (producción):
# Settings → Environment Variables → RESEND_API_KEY
```
