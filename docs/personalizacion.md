# Personalización del Sitio

## Cambiar textos principales

### Tagline de la Hero (3 palabras)
Archivo: `components/HeroSection.tsx` — línea con `Mercados · Estrategia · Renovables`

```tsx
// Cambiar a lo que prefieras:
Mercados · Estrategia · Renovables
```

### Descripción de la Hero
Archivo: `components/HeroSection.tsx` — el párrafo debajo del nombre.

### Texto del CTA final (banda verde)
Archivo: `app/page.tsx` — sección `{/* Final CTA */}`

```tsx
<h2>¿Necesitas análisis o asesoría energética?</h2>
<p>Apoyo a organizaciones del sector energético...</p>
```

### Servicios en la página de Contacto
Archivo: `app/contacto/page.tsx` — el array de servicios:

```tsx
{[
  "Análisis de mercados eléctricos",
  "Planificación estratégica energética",
  "Gestión de riesgos de mercado",
  "Digitalización y análisis de datos",
].map(...)}
```

---

## Cambiar la foto de perfil

1. Copia tu nueva foto a `public/foto-perfil.png` (reemplaza el archivo)
2. O cambia la ruta en `components/AboutSection.tsx`:
   ```tsx
   <Image src="/nueva-foto.jpg" alt="Patricio Soto Abarca" ... />
   ```

---

## Cambiar colores

Archivo: `tailwind.config.ts`

```ts
colors: {
  brand: {
    bg:    '#F0F3F0',  // Fondo — cambiar aquí
    green: '#1A6B3C',  // Verde — cambiar aquí
    gold:  '#F1C40F',  // Dorado — cambiar aquí
    dark:  '#1C1C1E',  // Texto — cambiar aquí
  }
}
```

> **Tip:** El verde `#1A6B3C` y el dorado `#F1C40F` son los colores de las infografías de LinkedIn — mantenerlos crea consistencia visual entre la web y LinkedIn.

---

## Cambiar tipografía

Archivo: `app/layout.tsx`

```tsx
import { Inter } from "next/font/google";
// Cambiar "Inter" por cualquier fuente de Google Fonts:
// import { Outfit } from "next/font/google";
// import { DM_Sans } from "next/font/google";
```

---

## Agregar una nueva página

1. Crea la carpeta y el archivo:
   ```
   app/nueva-pagina/page.tsx
   ```

2. Agrega el link en la navegación (`components/Nav.tsx`):
   ```tsx
   const links = [
     { href: "/", label: "Inicio" },
     { href: "/columna", label: "Columna" },
     { href: "/proyectos", label: "Proyectos" },
     { href: "/nueva-pagina", label: "Nueva Página" },  // ← agregar
     { href: "/contacto", label: "Contacto" },
   ];
   ```

---

## Actualizar la sección "Acerca de mí"

Archivo: `components/AboutSection.tsx`

### Cambiar los highlights (3 cifras/datos)
```tsx
const highlights = [
  { label: "14+", desc: "años en el sector energético chileno" },
  { label: "Renovables", desc: "gestión de portafolios solar, eólico y térmico" },
  { label: "Riesgos", desc: "análisis y gestión de riesgos de mercado y financieros" },
];
```

### Cambiar el texto de la bio
Edita los dos párrafos `<p>` dentro del componente.

---

## Actualizar proyectos

Archivo: `lib/projects.ts`

```ts
export const FEATURED_PROJECTS = [
  {
    name: "Nombre del proyecto",
    description: "Descripción breve.",
    emoji: "⚡",
    stack: ["Python", "SQL", "Power BI"],
    githubUrl: "https://github.com/...",
    liveUrl: "https://...",
    featured: true,
  },
  // ... más proyectos
];
```

---

## Actualizar email de contacto

Archivo: `app/contacto/page.tsx` — busca `hola@patriciosoto.cl` y reemplaza.

También actualiza en: `app/api/contact/route.ts` — el campo `to:` del email.

---

## Metadata y SEO

Archivo: `app/layout.tsx`

```ts
export const metadata: Metadata = {
  title: {
    default: "Patricio Soto A. — Mercados Eléctricos y Estrategia Energética",
    template: "%s | Patricio Soto A.",
  },
  description: "Ingeniero Civil Electricista con 14+ años en mercados eléctricos...",
};
```

Cada página puede tener su propia metadata exportando `metadata` al inicio del archivo:
```ts
// app/columna/page.tsx
export const metadata = {
  title: "Columna",
  description: "Artículos sobre mercados eléctricos y estrategia energética.",
};
```
