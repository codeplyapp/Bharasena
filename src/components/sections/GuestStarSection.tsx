import React from "react";
import Image from "next/image";
import { GuestStar } from "@/lib/types";
import { EmptyState } from "./shared/EmptyState";
import { SHIMMER_BLUR_DATA_URL } from "@/lib/images";

interface GuestStarSectionProps {
  guests: GuestStar[];
}

export function GuestStarSection({ guests }: GuestStarSectionProps) {
  return (
    <section
      id="guest-star"
      className="scroll-mt-24 py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-charcoal-950/40 relative overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-crimson-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-stone-100 tracking-tight mb-4">
            Bintang Tamu & <span className="text-gold-400">Guest Stars</span>
          </h2>
          <p className="text-stone-400 text-base sm:text-lg leading-relaxed">
            Panggung gemilang BHARASENA akan dimeriahkan oleh musisi dan penampil ternama tanah air.
          </p>
        </div>

        {/* Guest Stars Cards */}
        {guests.length === 0 ? (
          <EmptyState
            message="Guest star akan segera diumumkan."
            submessage="Nantikan pengumuman resmi dari panitia BHARASENA 2026."
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
            {guests.map((guest) => (
              <div
                key={guest.id}
                className="group relative rounded-3xl overflow-hidden bg-charcoal-800 border border-stone-800 transition-all duration-300 hover:border-gold-400/50 hover:shadow-2xl hover:shadow-black/60 flex flex-col"
              >
                {/* Image Container */}
                <div className="relative w-full aspect-[4/3] sm:aspect-[1/1] overflow-hidden bg-charcoal-900">
                  <Image
                    src={guest.imageUrl}
                    alt={`Foto ${guest.name}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    placeholder="blur"
                    blurDataURL={SHIMMER_BLUR_DATA_URL}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-charcoal-900/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                </div>

                {/* Content Details */}
                <div className="p-6 flex-1 flex flex-col justify-end relative bg-charcoal-800">
                  <span className="text-xs font-semibold text-crimson-400 uppercase tracking-wider mb-2 block">
                    {guest.role}
                  </span>
                  <h3 className="font-display text-2xl font-bold text-stone-100 group-hover:text-gold-400 transition-colors">
                    {guest.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
