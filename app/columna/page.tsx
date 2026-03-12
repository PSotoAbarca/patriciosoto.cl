import type { Metadata } from "next";
import ArticleCard from "@/components/ArticleCard";
import { getArticles } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "Columna",
  description: "Artículos sobre estrategia, tecnología y liderazgo.",
};

export default function ColumnaPage() {
  const articles = getArticles();

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="mb-14">
        <div className="flex items-center gap-3 mb-3">
          <span className="w-6 h-0.5 bg-brand-gold" />
          <span className="text-xs font-medium text-brand-green tracking-widest uppercase">
            Ideas · Análisis · Perspectivas
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-brand-dark mb-4">
          La Columna
        </h1>
        <p className="text-brand-dark/60 text-lg max-w-xl">
          Reflexiones sobre estrategia de negocios, tecnología y cómo construir
          equipos que entregan valor real.
        </p>
      </div>

      {articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, i) => (
            <ArticleCard key={article.slug} {...article} index={i} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24 text-brand-dark/40">
          <span className="text-5xl mb-4 block">✍️</span>
          <p className="text-lg font-medium mb-2">Próximamente</p>
          <p className="text-sm">
            Agrega archivos <code className="text-brand-green">.mdx</code> en{" "}
            <code className="text-brand-green">content/columna/</code>
          </p>
        </div>
      )}
    </div>
  );
}
