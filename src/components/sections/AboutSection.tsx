import React from "react";
import { AboutInfo } from "@/lib/types";
import { Target, Compass, BookOpen, ShieldCheck } from "lucide-react";

interface AboutSectionProps {
  about: AboutInfo;
}

export function AboutSection({ about }: AboutSectionProps) {
  const cards = [
    {
      title: "Tujuan Acara",
      icon: Target,
      content: about.tujuan,
      badge: "Visi & Kehormatan",
      accentBorder: "hover:border-gold-400/50",
    },
    {
      title: "Harapan Bersama",
      icon: Compass,
      content: about.harapan,
      badge: "Masa Depan",
      accentBorder: "hover:border-crimson-500/50",
    },
    {
      title: "Arti Nama Bhara Arsa Nawasena",
      icon: BookOpen,
      content: about.artiNama,
      badge: "Identitas Batalyon",
      accentBorder: "hover:border-gold-400/50",
    },
    {
      title: "Filosofi Lambang & Logo",
      icon: ShieldCheck,
      content: about.filosofiLogo,
      badge: "Makna Lambang",
      accentBorder: "hover:border-crimson-500/50",
    },
  ];

  return (
    <section
      id="tentang"
      className="scroll-mt-24 py-20 sm:py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-stone-100 tracking-tight mb-4">
            Tentang <span className="font-cinzel text-gold-400 tracking-wide">BHARASENA</span>
          </h2>
          <p className="text-stone-400 text-base sm:text-lg leading-relaxed">
            Perjalanan tiga tahun menempuh gemblengan disiplin, integritas, dan kebersamaan taruna bermuara pada malam keagungan pelepasan.
          </p>
        </div>

        {/* 4 Points Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {cards.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div
                key={idx}
                className={`group relative p-6 sm:p-8 rounded-3xl bg-charcoal-800/90 border border-stone-800 transition-all duration-300 hover:bg-charcoal-800 hover:shadow-xl hover:shadow-black/40 ${item.accentBorder}`}
              >
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-charcoal-900 border border-stone-700/80 flex items-center justify-center text-gold-400 group-hover:scale-110 group-hover:border-gold-400/40 transition-transform">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-charcoal-900/80 text-stone-400 border border-stone-800">
                    {item.badge}
                  </span>
                </div>

                <h3 className="font-display text-xl sm:text-2xl font-bold text-gold-400 mb-3 group-hover:text-gold-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
                  {item.content}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
