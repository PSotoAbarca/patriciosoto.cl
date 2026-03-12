import type { Metadata } from "next";
import ProjectCard from "@/components/ProjectCard";
import { FEATURED_PROJECTS } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Proyectos",
  description: "Proyectos y herramientas que he construido.",
};

export default function ProyectosPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="mb-14">
        <div className="flex items-center gap-3 mb-3">
          <span className="w-6 h-0.5 bg-brand-gold" />
          <span className="text-xs font-medium text-brand-green tracking-widest uppercase">
            Lo que construyo
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-brand-dark mb-4">
          Proyectos
        </h1>
        <p className="text-brand-dark/60 text-lg max-w-xl">
          Herramientas, automatizaciones y productos digitales. Algunos en
          producción, otros en construcción permanente.
        </p>
      </div>

      {/* Notice */}
      <div className="mb-10 p-4 bg-brand-gold/10 border-l-4 border-brand-gold rounded-r-lg">
        <p className="text-sm text-brand-dark/70">
          <span className="font-semibold text-brand-dark">Placeholder:</span>{" "}
          Actualiza los datos en{" "}
          <code className="text-brand-green">lib/projects.ts</code> para mostrar
          tus proyectos reales.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {FEATURED_PROJECTS.map((project, i) => (
          <ProjectCard key={project.name} {...project} index={i} />
        ))}
      </div>
    </div>
  );
}
