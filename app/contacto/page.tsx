import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contacto",
  description: "¿Tienes un proyecto o idea? Hablemos.",
};

export default function ContactoPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="mb-16">
        <div className="flex items-center gap-3 mb-3">
          <span className="w-6 h-0.5 bg-brand-gold" />
          <span className="text-xs font-medium text-brand-green tracking-widest uppercase">
            Conversemos
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-brand-dark mb-4">
          Hablemos
        </h1>
        <p className="text-brand-dark/60 text-lg max-w-xl">
          ¿Tienes un proyecto, idea o simplemente quieres intercambiar
          perspectivas? Estoy disponible.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
        {/* Form */}
        <div className="lg:col-span-3">
          <ContactForm />
        </div>

        {/* Info lateral */}
        <aside className="lg:col-span-2 space-y-8">
          <div>
            <h2 className="font-bold text-brand-dark mb-4 text-lg">
              Información de contacto
            </h2>

            <div className="space-y-4">
              <a
                href="mailto:hola@patriciosoto.cl"
                className="flex items-center gap-3 text-brand-dark/70 hover:text-brand-green transition-colors group"
              >
                <span className="w-8 h-8 rounded-full bg-brand-green/10 flex items-center justify-center text-brand-green group-hover:bg-brand-green group-hover:text-white transition-colors text-sm">
                  ✉
                </span>
                <span className="text-sm">hola@patriciosoto.cl</span>
              </a>

              <a
                href="https://linkedin.com/in/patriciosoto"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-brand-dark/70 hover:text-brand-green transition-colors group"
              >
                <span className="w-8 h-8 rounded-full bg-brand-green/10 flex items-center justify-center text-brand-green group-hover:bg-brand-green group-hover:text-white transition-colors text-sm font-bold">
                  in
                </span>
                <span className="text-sm">linkedin.com/in/patriciosoto</span>
              </a>
            </div>
          </div>

          {/* Divider */}
          <div className="h-0.5 w-12 bg-brand-gold" />

          <div>
            <h3 className="font-semibold text-brand-dark mb-2">
              Tiempo de respuesta
            </h3>
            <p className="text-sm text-brand-dark/60 leading-relaxed">
              Respondo en 24–48 horas hábiles. Si es urgente, mencíonalo en el
              asunto.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-brand-dark mb-2">
              ¿En qué puedo ayudarte?
            </h3>
            <ul className="text-sm text-brand-dark/60 space-y-1.5">
              {[
                "Estrategia de producto",
                "Transformación digital",
                "Consultoría tecnológica",
                "Charlas y workshops",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-brand-gold flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
