import React from "react";
import { AboutInfo } from "@/lib/types";

interface AboutSectionProps {
  about: AboutInfo;
}

export function AboutSection({ about }: AboutSectionProps) {
  const cards = [
    {
      title: "Tujuan Acara",
      content: about.tujuan,
      accentBorder: "hover:border-gold-400/50",
    },
    {
      title: "Harapan Bersama",
      content: about.harapan,
      accentBorder: "hover:border-crimson-500/50",
    },
    {
      title: "Arti Nama Bhara Arsa Nawasena",
      content: about.artiNama,
      accentBorder: "hover:border-gold-400/50",
    },
    {
      title: "Filosofi Lambang & Logo",
      content: about.filosofiLogo,
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
            Tentang <span className="font-cinzel font-semibold text-gold-400 tracking-[0.14em] px-1.5 overflow-visible inline-block">BHARASENA</span>
          </h2>
          <p className="text-stone-400 text-base sm:text-lg leading-relaxed">
            Perjalanan tiga tahun menempuh gemblengan disiplin, integritas, dan kebersamaan taruna bermuara pada malam keagungan pelepasan.
          </p>
        </div>

        {/* 4 Points Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {cards.map((item, idx) => {
            return (
              <div
                key={idx}
                className={`group relative p-6 sm:p-8 rounded-3xl bg-charcoal-800/90 border border-stone-800 transition-all duration-300 hover:bg-charcoal-800 hover:shadow-xl hover:shadow-black/40 ${item.accentBorder}`}
              >

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
