import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Shield, Lock } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal-950 border-t border-stone-800 text-stone-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand & Squadron Identity */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 flex-shrink-0">
                <Image
                  src="/logo.webp"
                  alt="Logo BHARASENA"
                  width={40}
                  height={42}
                  className="object-contain"
                />
              </div>
              <div>
                <span className="font-cinzel font-bold text-xl text-gold-400 block leading-tight tracking-wider">
                  BHARASENA
                </span>
                <span className="text-xs text-stone-400 font-medium">
                  Bhara Arsa Nawasena · Batalyon 6
                </span>
              </div>
            </div>
            <p className="text-stone-400 text-xs sm:text-sm max-w-md leading-relaxed">
              Portal Resmi Informasi & Dokumentasi Prom Night SMAN 2 Taruna Bhayangkara. Merajut kenangan dan mengantar kesatria menuju masa depan gemilang.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-sm font-bold text-stone-200 uppercase tracking-wider mb-3">
              Navigasi Halaman
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <a href="#hero" className="hover:text-gold-400 transition-colors">
                  Beranda
                </a>
              </li>
              <li>
                <a href="#tentang" className="hover:text-gold-400 transition-colors">
                  Tentang Acara
                </a>
              </li>
              <li>
                <a href="#guest-star" className="hover:text-gold-400 transition-colors">
                  Guest Star
                </a>
              </li>
              <li>
                <a href="#rundown" className="hover:text-gold-400 transition-colors">
                  Rundown 3 Hari
                </a>
              </li>
              <li>
                <a href="#kontak" className="hover:text-gold-400 transition-colors">
                  Kontak Panitia
                </a>
              </li>
            </ul>
          </div>

          {/* School & Admin */}
          <div>
            <h4 className="font-display text-sm font-bold text-stone-200 uppercase tracking-wider mb-3">
              Institusi & Akses
            </h4>
            <div className="space-y-2 text-xs sm:text-sm">
              <p className="text-stone-400">
                SMAN 2 Taruna Bhayangkara
                <br />
                Jawa Timur, Indonesia
              </p>
              <div className="pt-2">
                <Link
                  href="/admin"
                  className="inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-gold-400 transition-colors"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Portal Admin Panitia</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright & Disclaimer */}
        <div className="pt-8 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>
            &copy; {currentYear} BHARASENA — Prom Night Taruna Bhayangkara 6. Hak Cipta Dilindungi.
          </p>
          <p className="flex items-center gap-1">
            <Shield className="w-3.5 h-3.5 text-gold-400" />
            <span>SMAN 2 Taruna Bhayangkara</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
