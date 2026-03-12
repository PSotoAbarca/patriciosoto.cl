export interface Project {
  emoji: string;
  name: string;
  description: string;
  stack: string[];
  github?: string;
  live?: string;
}

export const FEATURED_PROJECTS: Project[] = [
  {
    emoji: "🤖",
    name: "Pipeline LinkedIn → Blog",
    description:
      "Automatización que transforma un briefing de LinkedIn en un artículo MDX listo para publicar en el blog, con un solo push a GitHub.",
    stack: ["Python", "Claude API", "MDX", "GitHub Actions"],
    github: "",
    live: "",
  },
  {
    emoji: "📊",
    name: "Dashboard de Estrategia",
    description:
      "Tablero de métricas clave para equipos de producto, conectando OKRs con resultados de negocio en tiempo real.",
    stack: ["Next.js", "Supabase", "Recharts", "TypeScript"],
    github: "",
    live: "",
  },
  {
    emoji: "🌱",
    name: "patriciosoto.cl",
    description:
      "Este mismo sitio. Blog personal con flujo editorial MDX → Vercel, branding consistente y animaciones Framer Motion.",
    stack: ["Next.js 14", "Tailwind CSS", "MDX", "Framer Motion"],
    github: "",
    live: "https://patriciosoto.cl",
  },
];
