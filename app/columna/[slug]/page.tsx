import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getArticleBySlug, getArticles } from "@/lib/mdx";
import { formatDate } from "@/lib/utils";
import ReadingProgress from "@/components/ReadingProgress";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return getArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = getArticleBySlug(params.slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.date,
    },
  };
}

export default function ArticlePage({ params }: Props) {
  const article = getArticleBySlug(params.slug);
  if (!article) notFound();

  return (
    <>
      <ReadingProgress />

      <article className="max-w-3xl mx-auto px-6 py-16">
        {/* Back */}
        <Link
          href="/columna"
          className="inline-flex items-center gap-2 text-sm text-brand-dark/50 hover:text-brand-green transition-colors mb-10 group"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span>
          Volver a la columna
        </Link>

        {/* Header */}
        <header className="mb-10">
          {article.tag && (
            <span className="text-xs font-medium bg-brand-bg text-brand-green px-3 py-1 rounded-full border border-brand-green/20 mb-4 inline-block">
              {article.tag}
            </span>
          )}
          <h1 className="text-3xl md:text-5xl font-extrabold text-brand-dark leading-tight mb-4 text-balance">
            {article.title}
          </h1>

          {/* Gold line */}
          <div className="h-0.5 w-16 bg-brand-gold mb-4" />

          <time className="text-sm text-brand-dark/40">
            {formatDate(article.date)}
          </time>
        </header>

        {/* MDX content */}
        <div className="prose prose-lg max-w-none">
          <MDXRemote source={article.content} />
        </div>

        {/* Footer nav */}
        <div className="mt-16 pt-8 border-t border-brand-green/10">
          <Link
            href="/columna"
            className="inline-flex items-center gap-2 text-sm font-medium text-brand-green hover:text-brand-dark transition-colors group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            Ver todos los artículos
          </Link>
        </div>
      </article>
    </>
  );
}
