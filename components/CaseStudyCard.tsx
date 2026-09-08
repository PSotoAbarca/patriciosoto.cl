"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface CaseStudyCardProps {
  slug: string;
  title: string;
  subtitle?: string;
  excerpt: string;
  tags: string[];
  metric?: string;
  github?: string;
  index?: number;
}

export default function CaseStudyCard({
  slug,
  title,
  subtitle,
  excerpt,
  tags,
  metric,
  github,
  index = 0,
}: CaseStudyCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="bg-white border-l-4 border-brand-green rounded-r-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 flex flex-col gap-4"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="font-bold text-brand-dark text-lg leading-snug">{title}</h2>
          {subtitle && (
            <p className="text-brand-green text-xs font-medium mt-1">{subtitle}</p>
          )}
        </div>
        {metric && (
          <span className="shrink-0 text-xs font-extrabold text-brand-green bg-brand-bg px-2.5 py-1 rounded-full border border-brand-green/20">
            {metric}
          </span>
        )}
      </div>

      {/* Gold divider */}
      <div className="h-0.5 w-12 bg-brand-gold" />

      <p className="text-brand-dark/60 text-sm leading-relaxed flex-1">{excerpt}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="text-xs font-medium bg-brand-bg text-brand-green px-2 py-0.5 rounded-full border border-brand-green/20"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Links */}
      <div className="flex gap-4 text-sm font-medium">
        {github && (
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-green hover:text-brand-dark transition-colors"
          >
            Ver código en GitHub ↗
          </a>
        )}
        <Link
          href={`/data-science/${slug}`}
          className="text-brand-gold hover:text-brand-dark transition-colors"
        >
          Leer resumen ejecutivo →
        </Link>
      </div>
    </motion.article>
  );
}
