import React from "react";
import Image from "next/image";
import { HeroProps } from "@/lib/types";
import { Calendar, MapPin, ChevronDown, FileText, Camera } from "lucide-react";
import { Button } from "./ui/button";

export function Hero({
  eventName,
  dateRange,
  venue,
  tagline,
  mode = "pre",
}: HeroProps) {
  return (
    <section
      id="hero"
      className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background Decorative Glow & Mesh Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[750px] h-[500px] sm:h-[750px] bg-crimson-600/15 rounded-full blur-[120px] opacity-70" />
        <div className="absolute top-1/3 left-1/3 w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] bg-gold-400/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-10 right-1/4 w-[350px] h-[350px] bg-crimson-700/10 rounded-full blur-[90px]" />

        {/* Subtle grid texture overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:24px_24px] opacity-25" />
      </div>

      <div className="max-w-5xl mx-auto text-center flex flex-col items-center relative z-10">
        {/* Big Official Crest Logo */}
        <div className="relative w-28 h-28 sm:w-36 sm:h-36 mb-6 drop-shadow-[0_0_35px_rgba(255,203,86,0.35)] transition-transform duration-500 hover:scale-105">
          <Image
            src="/logo.webp"
            alt="Lambang Resmi BHARASENA"
            fill
            sizes="(max-width: 640px) 112px, 144px"
            className="object-contain"
            priority
          />
        </div>

        {/* Main Title Heading */}
        <h1 className="font-cinzel text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-400 to-amber-200 leading-normal sm:leading-relaxed px-4 sm:px-8 py-2 sm:py-4 mb-2 overflow-visible inline-block">
          {eventName}
        </h1>

        {/* Handwritten Tagline with Caveat font */}
        <p className="font-hand text-2xl sm:text-3xl md:text-4xl text-crimson-400 font-semibold max-w-3xl mb-8 leading-snug">
          &ldquo;{tagline}&rdquo;
        </p>

        {/* Key Event Badges (Date & Venue) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-10 w-full max-w-2xl">
          <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-charcoal-800/80 border border-stone-800 backdrop-blur-sm w-full sm:w-auto justify-center shadow-md">
            <Calendar className="w-5 h-5 text-gold-400 flex-shrink-0" />
            <div className="text-left">
              <span className="text-[10px] text-stone-400 uppercase tracking-wider block font-semibold">
                Tanggal Pelaksanaan
              </span>
              <span className="text-stone-100 font-bold text-sm sm:text-base">
                {dateRange}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-charcoal-800/80 border border-stone-800 backdrop-blur-sm w-full sm:w-auto justify-center shadow-md">
            <MapPin className="w-5 h-5 text-crimson-400 flex-shrink-0" />
            <div className="text-left">
              <span className="text-[10px] text-stone-400 uppercase tracking-wider block font-semibold">
                Lokasi Venue
              </span>
              <span className="text-stone-100 font-bold text-sm sm:text-base">
                {venue}
              </span>
            </div>
          </div>
        </div>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          {mode === "pre" ? (
            <Button asChild size="lg" variant="default" className="shadow-lg">
              <a href="#proposal">
                <FileText className="w-5 h-5 mr-2" />
                <span>Unduh Proposal Sponsor</span>
              </a>
            </Button>
          ) : (
            <Button asChild size="lg" variant="default" className="shadow-lg">
              <a href="#galeri">
                <Camera className="w-5 h-5 mr-2" />
                <span>Lihat Momen Acara</span>
              </a>
            </Button>
          )}

          <Button asChild size="lg" variant="outlineGold">
            <a href="#rundown">
              <Calendar className="w-5 h-5 mr-2" />
              <span>Jadwal Rundown 3 Hari</span>
            </a>
          </Button>
        </div>

        {/* Scroll indicator prompt */}
        <div className="mt-14 sm:mt-16 animate-bounce text-stone-500 hover:text-gold-400 transition-colors">
          <a
            href="#tentang"
            className="flex flex-col items-center gap-1 text-xs font-medium uppercase tracking-wider"
            aria-label="Scroll ke Section Tentang"
          >
            <span>Eksplorasi Informasi</span>
            <ChevronDown className="w-4 h-4 text-gold-400" />
          </a>
        </div>
      </div>
    </section>
  );
}
