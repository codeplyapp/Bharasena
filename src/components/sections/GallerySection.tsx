"use client";

import React, { useState } from "react";
import Image from "next/image";
import { DocumentationPhoto } from "@/lib/types";
import { Camera, ZoomIn } from "lucide-react";
import { DayTabs } from "./shared/DayTabs";
import { EmptyState } from "./shared/EmptyState";
import { GalleryLightbox } from "./shared/GalleryLightbox";
import { SHIMMER_BLUR_DATA_URL } from "@/lib/images";

interface GallerySectionProps {
  photos: DocumentationPhoto[];
  defaultDay?: number;
}

export function GallerySection({
  photos,
  defaultDay = 1,
}: GallerySectionProps) {
  const [selectedDay, setSelectedDay] = useState<number>(defaultDay);
  const [activePhoto, setActivePhoto] = useState<DocumentationPhoto | null>(
    null
  );

  const filteredPhotos = photos
    .filter((photo) => photo.day === selectedDay)
    .sort((a, b) => a.order - b.order);

  const daysConfig = [
    { day: 1, label: "Day 1", date: "11 Des 2026" },
    { day: 2, label: "Day 2", date: "12 Des 2026" },
    { day: 3, label: "Day 3", date: "13 Des 2026" },
  ];

  return (
    <section
      id="galeri"
      className="scroll-mt-24 py-20 sm:py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-crimson-600/15 border border-crimson-500/30 text-crimson-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Camera className="w-3.5 h-3.5" />
            <span>Dokumentasi Resmi</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-stone-100 tracking-tight mb-4">
            Galeri <span className="text-gold-400">Momen Acara</span>
          </h2>
          <p className="text-stone-400 text-base sm:text-lg leading-relaxed">
            Sorotan potret kebersamaan dan momen berharga yang diabadikan selama penyelenggaraan BHARASENA.
          </p>
        </div>

        {/* Day Tabs */}
        <div className="mb-12">
          <DayTabs
            activeDay={selectedDay}
            onSelectDay={setSelectedDay}
            days={daysConfig}
          />
        </div>

        {/* Photos Grid */}
        {filteredPhotos.length === 0 ? (
          <EmptyState
            message={`Dokumentasi Day ${selectedDay} belum diunggah.`}
            submessage="Foto akan diunggah secara bertahap oleh tim publikasi & dokumentasi."
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredPhotos.map((photo) => (
              <div
                key={photo.id}
                onClick={() => setActivePhoto(photo)}
                className="group relative aspect-square rounded-2xl overflow-hidden bg-charcoal-800 border border-stone-800 hover:border-gold-400/50 transition-all duration-300 shadow-md cursor-pointer"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActivePhoto(photo);
                  }
                }}
                aria-label={`Buka foto: ${photo.caption || `Foto Day ${photo.day}`}`}
              >
                <Image
                  src={photo.imageUrl}
                  alt={photo.caption || `Foto Dokumentasi Day ${photo.day}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  placeholder="blur"
                  blurDataURL={SHIMMER_BLUR_DATA_URL}
                  loading="lazy"
                />
                
                {/* Overlay gradient & caption */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-between">
                  <div className="self-end p-2 rounded-full bg-charcoal-900/80 backdrop-blur-sm text-gold-400 border border-stone-700">
                    <ZoomIn className="w-4 h-4" />
                  </div>
                  {photo.caption && (
                    <p className="text-xs text-stone-200 font-medium line-clamp-2 drop-shadow-md">
                      {photo.caption}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Lightbox Component */}
        <GalleryLightbox
          photo={activePhoto}
          photos={filteredPhotos}
          onClose={() => setActivePhoto(null)}
          onSelectPhoto={setActivePhoto}
        />
      </div>
    </section>
  );
}
