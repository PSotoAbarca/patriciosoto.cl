import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getCaseStudyBySlug, getCaseStudies } from "@/lib/dataScience";
import ArticleImage from "@/components/ArticleImage";

const components = { ArticleImage };

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return getCaseStudies().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const caseStudy = getCaseStudyBySlug(params.slug);
  if (!caseStudy) return {};
  return {
    title: caseStudy.title,
    description: caseStudy.excerpt,
  };
}

export default function CaseStudyPage({ params }: Props) {
  const caseStudy = getCaseStudyBySlug(params.slug);
  if (!caseStudy) notFound();

  return (
    <article className="max-w-3xl mx-auto px-6 py-16">
      {/* Back */}
      <Link
        href="/data-science"
        className="inline-flex items-center gap-2 text-sm text-brand-dark/50 hover:text-brand-green transition-colors mb-10 group"
      >
        <span className="group-hover:-translate-x-1 transition-transform">←</span>
        Volver a Data Science
      </Link>

      {/* Header */}
      <header className="mb-10">
        {caseStudy.subtitle && (
          <span className="text-xs font-medium bg-brand-bg text-brand-green px-3 py-1 rounded-full border border-brand-green/20 mb-4 inline-block">
            {caseStudy.subtitle}
          </span>
        )}
        <h1 className="text-3xl md:text-5xl font-extrabold text-brand-dark leading-tight mb-3 text-balance">
          {caseStudy.title}
        </h1>

        {/* Gold line */}
        <div className="h-0.5 w-16 bg-brand-gold mb-4" />

        <div className="flex items-center gap-3 flex-wrap">
          {caseStudy.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-medium bg-brand-bg text-brand-green px-2 py-0.5 rounded-full border border-brand-green/20"
            >
              {tag}
            </span>
          ))}
        </div>
      </header>

      {/* MDX content */}
      <div className="prose prose-lg max-w-none prose-headings:text-brand-dark prose-headings:font-bold prose-a:text-brand-green prose-strong:text-brand-dark prose-li:text-brand-dark/80">
        <MDXRemote source={caseStudy.content} components={components} />
      </div>

      {/* Footer nav */}
      <div className="mt-16 pt-8 border-t border-brand-green/10 flex items-center justify-between flex-wrap gap-4">
        <Link
          href="/data-science"
          className="inline-flex items-center gap-2 text-sm font-medium text-brand-green hover:text-brand-dark transition-colors group"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span>
          Ver los 2 proyectos
        </Link>

        {caseStudy.github && (
          <a
            href={caseStudy.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-brand-dark/50 hover:text-brand-green transition-colors"
          >
            Ver código en GitHub ↗
          </a>
        )}
      </div>
    </article>
  );
}
