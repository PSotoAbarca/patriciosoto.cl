import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getArticleBySlug, getArticles } from "@/lib/mdx";
import { formatDate } from "@/lib/utils";
import ReadingProgress from "@/components/ReadingProgress";
import ArticleImage from "@/components/ArticleImage";

const components = { ArticleImage };

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
      ...(article.image ? { images: [article.image] } : {}),
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
          <h1 className="text-3xl md:text-5xl font-extrabold text-brand-dark leading-tight mb-3 text-balance">
            {article.title}
          </h1>

          {article.subtitle && (
            <p className="text-lg text-brand-green font-medium mb-4">
              {article.subtitle}
            </p>
          )}

          {/* Gold line */}
          <div className="h-0.5 w-16 bg-brand-gold mb-4" />

          <div className="flex items-center gap-4 flex-wrap">
            <time className="text-sm text-brand-dark/40">
              {formatDate(article.date)}
            </time>

            {article.linkedinUrl && (
              <a
                href={article.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-medium bg-[#0A66C2] text-white px-3 py-1.5 rounded-full hover:bg-[#004182] transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                Ver en LinkedIn
              </a>
            )}
          </div>
        </header>

        {/* MDX content */}
        <div className="prose prose-lg max-w-none prose-headings:text-brand-dark prose-headings:font-bold prose-a:text-brand-green prose-strong:text-brand-dark prose-li:text-brand-dark/80">
          <MDXRemote source={article.content} components={components} />
        </div>

        {/* Footer nav */}
        <div className="mt-16 pt-8 border-t border-brand-green/10 flex items-center justify-between flex-wrap gap-4">
          <Link
            href="/columna"
            className="inline-flex items-center gap-2 text-sm font-medium text-brand-green hover:text-brand-dark transition-colors group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            Ver todos los artículos
          </Link>

          {article.linkedinUrl && (
            <a
              href={article.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-brand-dark/50 hover:text-brand-green transition-colors"
            >
              Discutir en LinkedIn →
            </a>
          )}
        </div>
      </article>
    </>
  );
}
