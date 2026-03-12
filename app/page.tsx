import Link from "next/link";
import HeroSection from "@/components/HeroSection";
import ArticleCard from "@/components/ArticleCard";
import ProjectCard from "@/components/ProjectCard";
import { getArticles } from "@/lib/mdx";
import { FEATURED_PROJECTS } from "@/lib/projects";

export default function Home() {
  const latestArticles = getArticles().slice(0, 3);

  return (
    <>
      <HeroSection />

      {/* Latest articles */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="flex items-center justify-between mb-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="w-6 h-0.5 bg-brand-gold" />
              <span className="text-xs font-medium text-brand-green tracking-widest uppercase">
                Últimos artículos
              </span>
            </div>
            <h2 className="text-3xl font-bold text-brand-dark">La Columna</h2>
          </div>
          <Link
            href="/columna"
            className="text-sm font-medium text-brand-green hover:text-brand-dark transition-colors hidden md:inline-flex items-center gap-1"
          >
            Ver todos →
          </Link>
        </div>

        {latestArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestArticles.map((article, i) => (
              <ArticleCard key={article.slug} {...article} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-brand-dark/40">
            <p className="text-lg">Los artículos aparecerán aquí pronto.</p>
            <p className="text-sm mt-2">Agrega archivos .mdx en <code>content/columna/</code></p>
          </div>
        )}

        <div className="mt-8 md:hidden">
          <Link
            href="/columna"
            className="text-sm font-medium text-brand-green hover:text-brand-dark transition-colors"
          >
            Ver todos los artículos →
          </Link>
        </div>
      </section>

      {/* Featured projects */}
      <section className="bg-white/60 py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center justify-between mb-10">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="w-6 h-0.5 bg-brand-gold" />
                <span className="text-xs font-medium text-brand-green tracking-widest uppercase">
                  Lo que construyo
                </span>
              </div>
              <h2 className="text-3xl font-bold text-brand-dark">Proyectos</h2>
            </div>
            <Link
              href="/proyectos"
              className="text-sm font-medium text-brand-green hover:text-brand-dark transition-colors hidden md:inline-flex items-center gap-1"
            >
              Ver todos →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FEATURED_PROJECTS.slice(0, 3).map((project, i) => (
              <ProjectCard key={project.name} {...project} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-brand-green py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            ¿Tienes un proyecto en mente?
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
            Trabajo con equipos y líderes que quieren construir mejor.
          </p>
          <Link
            href="/contacto"
            className="inline-flex items-center gap-2 bg-brand-gold text-brand-dark font-bold px-8 py-4 rounded-lg hover:bg-brand-gold/90 transition-all duration-200 hover:-translate-y-0.5 shadow-md hover:shadow-lg text-lg"
          >
            Hablemos →
          </Link>
        </div>
      </section>
    </>
  );
}
