import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-brand-green/10 bg-brand-bg mt-24">
      <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-5 bg-brand-green rounded-sm" />
          <span className="font-bold text-brand-dark text-sm">Patricio Soto</span>
        </div>

        <p className="text-brand-dark/50 text-sm">
          © {year} · Estrategia + Tecnología
        </p>

        <div className="flex items-center gap-6 text-sm">
          <Link
            href="/columna"
            className="text-brand-dark/50 hover:text-brand-green transition-colors"
          >
            Columna
          </Link>
          <Link
            href="/proyectos"
            className="text-brand-dark/50 hover:text-brand-green transition-colors"
          >
            Proyectos
          </Link>
          <Link
            href="/contacto"
            className="text-brand-dark/50 hover:text-brand-green transition-colors"
          >
            Contacto
          </Link>
          <a
            href="https://linkedin.com/in/patriciosoto"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-dark/50 hover:text-brand-green transition-colors"
          >
            LinkedIn ↗
          </a>
        </div>
      </div>
    </footer>
  );
}
