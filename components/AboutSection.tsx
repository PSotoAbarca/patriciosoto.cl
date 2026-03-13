"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const highlights = [
  { label: "14+", desc: "años en el sector energético chileno" },
  { label: "Renovables", desc: "gestión de portafolios solar, eólico y térmico" },
  { label: "Riesgos", desc: "análisis y gestión de riesgos de mercado y financieros" },
];

export default function AboutSection() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        {/* Section header */}
        <div className="flex items-center gap-3 mb-10">
          <span className="w-6 h-0.5 bg-brand-gold" />
          <span className="text-xs font-medium text-brand-green tracking-widest uppercase">
            Acerca de mí
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2 flex justify-center lg:justify-start"
          >
            <div className="relative">
              <div className="absolute -inset-1 bg-brand-green/20 rounded-2xl blur-sm" />
              <Image
                src="/foto-perfil.png"
                alt="Patricio Soto Abarca"
                width={340}
                height={400}
                className="relative rounded-2xl object-cover shadow-xl w-full max-w-[300px] lg:max-w-full"
                priority
              />
              {/* Gold accent line */}
              <div className="absolute -bottom-3 -left-3 w-16 h-1 bg-brand-gold rounded-full" />
            </div>
          </motion.div>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            {/* Green left border card */}
            <div className="border-l-4 border-brand-green pl-6 mb-8">
              <div className="h-0.5 w-12 bg-brand-gold mb-5" />
              <h2 className="text-2xl md:text-3xl font-extrabold text-brand-dark mb-2">
                Patricio <span className="text-brand-green">S</span>oto{" "}
                <span className="text-brand-green">A</span>.
              </h2>
              <p className="text-brand-green font-medium text-sm tracking-wide mb-5">
                Ejecutivo Senior · Ingeniero Civil Electricista
              </p>
              <p className="text-brand-dark/70 leading-relaxed text-base">
                Con más de 14 años de experiencia en planificación estratégica y análisis de
                mercados eléctricos en el sector energético chileno. Especialista en definición
                estratégica y apoyo a la toma de decisiones en contextos de alta incertidumbre,
                integrando análisis técnico, económico y regulatorio.
              </p>
              <p className="text-brand-dark/70 leading-relaxed text-base mt-4">
                Sólida trayectoria en gestión de portafolios de generación renovable y térmica,
                así como en análisis y gestión de riesgos de mercado y financieros. Perfil
                analítico, orientado a datos y resultados, con dominio de modelos de optimización
                hidrotérmica y de Unit Commitment para apoyar decisiones estratégicas de negocio.
              </p>
            </div>

            {/* Highlights */}
            <div className="grid grid-cols-3 gap-4">
              {highlights.map((h, i) => (
                <motion.div
                  key={h.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                  className="bg-white/70 rounded-xl p-4 border border-brand-green/10"
                >
                  <p className="text-brand-green font-extrabold text-lg">{h.label}</p>
                  <p className="text-brand-dark/60 text-xs mt-1 leading-snug">{h.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
