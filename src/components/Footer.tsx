"use client";

import React from "react";
import Image from "next/image";
import { ArrowUp } from "lucide-react";

const MarqueeItem = () => (
  <div className="flex items-center space-x-8 px-6 select-none font-medium whitespace-nowrap">
    <span className="text-stone-300">BHARA ARSA NAWASENA</span> <span className="text-gold-400 text-sm">✦</span>
    <span className="text-stone-300">PROM NIGHT TARUNA BHAYANGKARA 6</span> <span className="text-gold-500 text-sm">✦</span>
    <span className="text-stone-300">SMAN 2 TARUNA BHAYANGKARA</span> <span className="text-gold-400 text-sm">✦</span>
    <span className="text-stone-300">11–13 DESEMBER 2026</span> <span className="text-gold-500 text-sm">✦</span>
    <span className="text-stone-300">MENUJU GERBANG KESATRIA</span> <span className="text-gold-400 text-sm">✦</span>
  </div>
);

export function Footer() {
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const currentYear = 2026;

  const quickLinks = [
    { label: "Beranda", href: "#hero" },
    { label: "Tentang Acara", href: "#tentang" },
    { label: "Guest Star", href: "#guest-star" },
    { label: "Rundown 3 Hari", href: "#rundown" },
    { label: "Kontak Panitia", href: "#kontak" },
  ];

  return (
    <footer className="relative z-20 w-full overflow-hidden bg-charcoal-950 text-stone-100 border-t border-gold-500/20 pt-8 sm:pt-12 pb-8 sm:pb-12">
      {/* Ambient Gold Aura in Background */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[350px] sm:h-[450px] bg-gold-400/[0.07] rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Subtle luxury watermark typography */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-cinzel font-black text-6xl sm:text-8xl md:text-[12vw] tracking-[0.2em] text-gold-400/[0.03] select-none pointer-events-none whitespace-nowrap -z-10"
      >
        BHARASENA
      </div>

      {/* 1. Top Ribbon Marquee */}
      <div className="w-full overflow-hidden border-y border-gold-500/15 bg-charcoal-900/60 backdrop-blur-sm py-3 mb-10 sm:mb-14 shadow-inner">
        <div className="flex w-max animate-footer-scroll-marquee text-xs sm:text-sm font-semibold tracking-[0.22em] text-stone-300 uppercase">
          <MarqueeItem />
          <MarqueeItem />
        </div>
      </div>

      {/* 2. Main Content Center */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center">
        {/* Official Crest Logo */}
        <div className="relative w-14 h-14 sm:w-16 sm:h-16 mb-4 flex items-center justify-center transition-transform duration-300 hover:scale-105">
          <Image
            src="/logo.webp"
            alt="Logo BHARASENA"
            width={64}
            height={68}
            className="object-contain drop-shadow-[0_0_20px_rgba(255,203,86,0.4)]"
          />
        </div>

        {/* Title */}
        <h2 className="font-cinzel text-3xl sm:text-5xl md:text-6xl font-bold tracking-[0.16em] sm:tracking-[0.2em] gold-heading-gradient leading-tight mb-2 drop-shadow-[0_4px_20px_rgba(255,203,86,0.2)]">
          BHARASENA
        </h2>

        {/* Subtitle */}
        <p className="text-stone-400 font-sans text-xs sm:text-sm tracking-wider uppercase mb-8 max-w-lg leading-relaxed">
          Malam Keakraban & Pelepasan Taruna Bhayangkara Angkatan 6 &bull; SMAN 2 Taruna Bhayangkara
        </p>

        {/* Quick Navigation Pills */}
        <nav aria-label="Navigasi Footer" className="flex flex-wrap justify-center gap-2.5 sm:gap-3.5 w-full mb-12">
          {quickLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="px-5 sm:px-6 py-2.5 rounded-full bg-charcoal-800/80 hover:bg-charcoal-800 border border-stone-800 hover:border-gold-400/50 text-stone-200 hover:text-gold-300 font-medium text-xs sm:text-sm transition-all duration-200 shadow-md hover:shadow-gold-500/10 hover:scale-[1.03] active:scale-[0.98]"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>

      {/* 3. Bottom Bar Credits & Back to Top */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 pt-6 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        {/* Copyright */}
        <p className="text-stone-400 text-xs tracking-wider">
          &copy; {currentYear} <span className="text-gold-400 font-semibold">BHARASENA</span> &bull; SMAN 2 Taruna Bhayangkara. Hak Cipta Dilindungi.
        </p>

        {/* Back to top button */}
        <button
          onClick={scrollToTop}
          type="button"
          aria-label="Kembali ke atas"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-charcoal-850 hover:bg-charcoal-800 border border-stone-800 hover:border-gold-400/50 text-stone-300 hover:text-gold-300 text-xs font-semibold transition-all duration-200 shadow-md group cursor-pointer"
        >
          <span>Kembali ke Atas</span>
          <ArrowUp className="w-3.5 h-3.5 text-gold-400 transform group-hover:-translate-y-0.5 transition-transform duration-200" />
        </button>
      </div>
    </footer>
  );
}

export default Footer;
