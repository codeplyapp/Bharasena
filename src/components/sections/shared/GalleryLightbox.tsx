"use client";

import React, { useEffect, useCallback } from "react";
import Image from "next/image";
import { DocumentationPhoto } from "@/lib/types";
import { X, ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { SHIMMER_BLUR_DATA_URL } from "@/lib/images";

interface GalleryLightboxProps {
  photo: DocumentationPhoto | null;
  photos: DocumentationPhoto[];
  onClose: () => void;
  onSelectPhoto: (photo: DocumentationPhoto) => void;
}

export function GalleryLightbox({
  photo,
  photos,
  onClose,
  onSelectPhoto,
}: GalleryLightboxProps) {
  const currentIndex = photo
    ? photos.findIndex((p) => p.id === photo.id)
    : -1;

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      onSelectPhoto(photos[currentIndex - 1]);
    } else if (photos.length > 0) {
      onSelectPhoto(photos[photos.length - 1]);
    }
  }, [currentIndex, photos, onSelectPhoto]);

  const handleNext = useCallback(() => {
    if (currentIndex < photos.length - 1) {
      onSelectPhoto(photos[currentIndex + 1]);
    } else if (photos.length > 0) {
      onSelectPhoto(photos[0]);
    }
  }, [currentIndex, photos, onSelectPhoto]);

  useEffect(() => {
    if (!photo) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    // Lock body scroll
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [photo, onClose, handlePrev, handleNext]);

  if (!photo) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in-0 duration-200"
      role="dialog"
      aria-modal="true"
      aria-label="Tampilan Foto Dokumentasi"
      onClick={onClose}
    >
      <div
        className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Tombol Tutup */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 md:top-2 md:right-2 z-10 p-2.5 rounded-full bg-charcoal-800/80 text-stone-200 hover:text-gold-400 hover:bg-charcoal-700 transition-colors focus:outline-none focus:ring-2 focus:ring-gold-400 cursor-pointer"
          aria-label="Tutup Tampilan Foto"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Tombol Navigasi Sebelumnya */}
        {photos.length > 1 && (
          <button
            onClick={handlePrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-charcoal-900/80 text-stone-200 hover:text-gold-400 hover:bg-charcoal-800 transition-colors border border-stone-800/80 focus:outline-none focus:ring-2 focus:ring-gold-400 cursor-pointer hidden sm:flex items-center justify-center shadow-lg"
            aria-label="Foto Sebelumnya"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* Tombol Navigasi Selanjutnya */}
        {photos.length > 1 && (
          <button
            onClick={handleNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-charcoal-900/80 text-stone-200 hover:text-gold-400 hover:bg-charcoal-800 transition-colors border border-stone-800/80 focus:outline-none focus:ring-2 focus:ring-gold-400 cursor-pointer hidden sm:flex items-center justify-center shadow-lg"
            aria-label="Foto Selanjutnya"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}

        {/* Foto Utama */}
        <div className="relative w-full h-[60vh] sm:h-[70vh] rounded-2xl overflow-hidden bg-charcoal-950 border border-stone-800">
          <Image
            src={photo.imageUrl}
            alt={photo.caption || `Foto Dokumentasi Day ${photo.day}`}
            fill
            className="object-contain"
            sizes="(max-width: 1280px) 100vw, 1200px"
            placeholder="blur"
            blurDataURL={SHIMMER_BLUR_DATA_URL}
            priority
          />
        </div>

        {/* Informasi Caption & Hari */}
        <div className="w-full mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 px-2 text-sm">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-crimson-600/20 text-crimson-400 border border-crimson-500/30 text-xs font-semibold">
              <Calendar className="w-3.5 h-3.5" />
              Day {photo.day}
            </span>
            {photos.length > 1 && (
              <span className="text-stone-400 text-xs">
                {currentIndex + 1} dari {photos.length} foto
              </span>
            )}
          </div>
          {photo.caption && (
            <p className="text-stone-300 font-medium text-sm sm:text-base">
              {photo.caption}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
