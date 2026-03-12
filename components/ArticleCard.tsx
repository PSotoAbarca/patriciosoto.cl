"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { formatDate } from "@/lib/utils";

interface ArticleCardProps {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tag: string;
  index?: number;
}

export default function ArticleCard({
  slug,
  title,
  date,
  excerpt,
  tag,
  index = 0,
}: ArticleCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link href={`/columna/${slug}`} className="group block">
        <article className="bg-white border-l-4 border-brand-green rounded-r-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
          <h2 className="font-bold text-brand-dark text-lg leading-snug mb-3 group-hover:text-brand-green transition-colors">
            {title}
          </h2>

          {/* Gold divider line */}
          <div className="h-0.5 w-12 bg-brand-gold mb-3 group-hover:w-full transition-all duration-500" />

          <p className="text-brand-dark/60 text-sm leading-relaxed mb-4 line-clamp-2">
            {excerpt}
          </p>

          <div className="flex items-center justify-between">
            <span className="text-xs text-brand-dark/40">{formatDate(date)}</span>
            {tag && (
              <span className="text-xs font-medium bg-brand-bg text-brand-green px-2 py-0.5 rounded-full border border-brand-green/20">
                {tag}
              </span>
            )}
          </div>
        </article>
      </Link>
    </motion.div>
  );
}
