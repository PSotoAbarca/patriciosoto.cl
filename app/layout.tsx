import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Patricio Soto A. — Mercados Eléctricos y Estrategia Energética",
    template: "%s | Patricio Soto A.",
  },
  description:
    "Ingeniero Civil Electricista con 14+ años en mercados eléctricos, energía renovable y planificación estratégica en Chile.",
  metadataBase: new URL("https://patriciosotoa.com"),
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: "https://patriciosotoa.com",
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
