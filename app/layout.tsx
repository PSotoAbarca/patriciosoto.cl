import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Patricio Soto — Estrategia + Tecnología",
    template: "%s | Patricio Soto",
  },
  description:
    "Columna de opinión y análisis sobre estrategia de negocios, tecnología y liderazgo.",
  metadataBase: new URL("https://patriciosoto.cl"),
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: "https://patriciosoto.cl",
    siteName: "Patricio Soto",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.className} bg-brand-bg text-brand-dark antialiased`}>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
