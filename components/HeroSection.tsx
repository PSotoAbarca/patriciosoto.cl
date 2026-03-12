"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-brand-bg">
      {/* Background decoration */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute top-20 right-0 w-96 h-96 bg-brand-green/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-brand-gold/10 rounded-full blur-2xl" />
      </div>

      <div className="relative max-w-5xl mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-0.5 bg-brand-gold" />
            <span className="text-sm font-medium text-brand-green tracking-widest uppercase">
              Estrategia · Tecnología · Liderazgo
            </span>
          </div>

          {/* Name */}
          <h1 className="text-5xl md:text-7xl font-extrabold text-brand-dark leading-none tracking-tight mb-6">
            <span className="text-brand-green">P</span>atricio
            <br />
            <span className="text-brand-green">S</span>oto
          </h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-xl md:text-2xl text-brand-dark/60 max-w-xl leading-relaxed mb-10"
          >
            Conecto estrategia de negocio con tecnología para construir{" "}
            <span className="text-brand-green font-semibold">
              productos que crecen
            </span>{" "}
            y equipos que los hacen posibles.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="flex flex-wrap gap-4"
          >
            <Link
              href="/columna"
              className="inline-flex items-center gap-2 bg-brand-green text-white font-semibold px-6 py-3 rounded-lg hover:bg-brand-green/90 transition-all duration-200 hover:-translate-y-0.5 shadow-sm hover:shadow-md"
            >
              Leer la columna
              <span aria-hidden>→</span>
            </Link>
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 border-2 border-brand-green text-brand-green font-semibold px-6 py-3 rounded-lg hover:bg-brand-green hover:text-white transition-all duration-200 hover:-translate-y-0.5"
            >
              Hablemos
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-6 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-brand-dark/30 tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-0.5 h-8 bg-brand-gold/50"
          />
        </motion.div>
      </div>
    </section>
  );
}
