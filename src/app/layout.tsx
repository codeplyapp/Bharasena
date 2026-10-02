import type { Metadata, Viewport } from "next";
import { Playfair_Display, Caveat, Inter, Cinzel_Decorative } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cinzel = Cinzel_Decorative({
  subsets: ["latin"],
  weight: ["700", "900"],
  variable: "--font-cinzel",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#1E1E1E",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "BHARASENA — Prom Night Taruna Bhayangkara 6",
  description:
    "Website Resmi Prom Night BHARASENA (Batalyon Bhara Arsa Nawasena · SMAN 2 Taruna Bhayangkara), 11–13 Desember 2026. Portal informasi jadwal acara, proposal sponsorship, dan galeri dokumentasi.",
  keywords: [
    "BHARASENA",
    "Prom Night",
    "Taruna Bhayangkara",
    "SMAN 2 Taruna Bhayangkara",
    "Bhara Arsa Nawasena",
    "Prom 2026",
  ],
  authors: [{ name: "Panitia BHARASENA 2026" }],
  openGraph: {
    title: "BHARASENA — Prom Night Taruna Bhayangkara 6",
    description:
      "Portal Resmi Prom Night Taruna Bhayangkara 6 (11–13 Desember 2026). Rundown acara, guest star, proposal sponsorship, dan galeri dokumentasi.",
    type: "website",
    locale: "id_ID",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`dark scroll-smooth ${playfair.variable} ${caveat.variable} ${inter.variable} ${cinzel.variable}`}
    >
      <body className="min-h-screen bg-charcoal-900 text-stone-100 font-sans antialiased selection:bg-gold-400 selection:text-charcoal-900">
        {children}
      </body>
    </html>
  );
}
