import type { Metadata } from "next";
import CaseStudyCard from "@/components/CaseStudyCard";
import { getCaseStudies } from "@/lib/dataScience";

export const metadata: Metadata = {
  title: "Data Science",
  description:
    "Proyectos del certificado Google Advanced Data Analytics: predicción de churn y modelos de clasificación aplicados a casos de negocio reales.",
};

export default function DataSciencePage() {
  const caseStudies = getCaseStudies();

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="mb-14 max-w-2xl">
        <div className="flex items-center gap-3 mb-3">
          <span className="w-6 h-0.5 bg-brand-gold" />
          <span className="text-xs font-medium text-brand-green tracking-widest uppercase">
            Google Advanced Data Analytics
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-brand-dark mb-4">
          Data Science
        </h1>
        <p className="text-brand-dark/60 text-lg leading-relaxed">
          Completé el certificado profesional{" "}
          <strong className="text-brand-dark">Google Advanced Data Analytics</strong>{" "}
          para llevar el mismo rigor analítico que aplico en sistemas de potencia y
          mercados eléctricos —limpieza de datos, estadística inferencial, regresión y
          machine learning— a problemas de negocio fuera de mi dominio habitual. Estos
          son los dos proyectos principales del programa; el código completo, con todos
          los notebooks, está en GitHub.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {caseStudies.map((caseStudy, i) => (
          <CaseStudyCard key={caseStudy.slug} {...caseStudy} index={i} />
        ))}
      </div>
    </div>
  );
}
