"use client";

import { motion } from "framer-motion";

interface ProjectCardProps {
  emoji: string;
  name: string;
  description: string;
  stack: string[];
  github?: string;
  live?: string;
  index?: number;
}

export default function ProjectCard({
  emoji,
  name,
  description,
  stack,
  github,
  live,
  index = 0,
}: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="bg-white border-l-4 border-brand-green rounded-r-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 flex flex-col gap-4"
    >
      <div className="flex items-center gap-3">
        <span className="text-3xl">{emoji}</span>
        <h2 className="font-bold text-brand-dark text-lg">{name}</h2>
      </div>

      {/* Gold divider */}
      <div className="h-0.5 w-12 bg-brand-gold" />

      <p className="text-brand-dark/60 text-sm leading-relaxed flex-1">{description}</p>

      {/* Stack badges */}
      <div className="flex flex-wrap gap-2">
        {stack.map((tech) => (
          <span
            key={tech}
            className="text-xs font-medium bg-brand-bg text-brand-green px-2 py-0.5 rounded-full border border-brand-green/20"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Links */}
      {(github || live) && (
        <div className="flex gap-4 text-sm font-medium">
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-green hover:text-brand-dark transition-colors"
            >
              GitHub ↗
            </a>
          )}
          {live && (
            <a
              href={live}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-gold hover:text-brand-dark transition-colors"
            >
              Ver proyecto ↗
            </a>
          )}
        </div>
      )}
    </motion.article>
  );
}
