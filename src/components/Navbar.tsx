"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { EventMode } from "@/lib/types";
import { getNavItems } from "@/lib/sections";
import { X, Calendar, MapPin, MessageCircle, ArrowRight } from "lucide-react";

interface NavbarProps {
  mode: EventMode;
}

export function Navbar({ mode }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("hero");

  const navItems = getNavItems(mode);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Simple intersection observer detection for active anchor
      const sections = navItems.map((item) => item.id);
      for (const sectionId of [...sections].reverse()) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navItems]);

  // Close menu on ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    if (mobileMenuOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-charcoal-950/85 backdrop-blur-md border-b border-white/5 py-4 shadow-xl shadow-black/40"
            : "bg-gradient-to-b from-black/85 via-black/45 to-transparent py-5 sm:py-6"
        }`}
      >
        <div className="w-full px-6 sm:px-10 lg:px-12 xl:px-16 2xl:px-20">
          <div className="flex items-center justify-between w-full">
            
            {/* 1. Far Left: Brand / Logo */}
            <Link
              href="#hero"
              className="flex items-center gap-3 group focus-visible:outline-none flex-shrink-0"
            >
              <div className="relative w-8 h-8 sm:w-9 sm:h-9 flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/logo.webp"
                  alt="Logo BHARASENA"
                  width={38}
                  height={40}
                  className="object-contain drop-shadow-[0_0_12px_rgba(217,119,6,0.35)]"
                  priority
                />
              </div>
              <span className="font-cinzel font-bold text-lg sm:text-xl tracking-[0.18em] text-white group-hover:text-gold-400 transition-colors uppercase">
                BHARASENA<span className="text-gold-400">.</span>
              </span>
            </Link>

            {/* 2. Middle / Right: Navigation Links (Spread across available width) */}
            <nav
              className="hidden lg:flex items-center gap-6 xl:gap-8 2xl:gap-11 justify-end flex-1 mx-8 xl:mx-12"
              aria-label="Navigasi Utama"
            >
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    className={`relative text-[11px] xl:text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-200 py-1 whitespace-nowrap ${
                      isActive
                        ? "text-white font-bold drop-shadow-[0_0_12px_rgba(255,255,255,0.45)]"
                        : "text-stone-300/90 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-gold-400 rounded-full shadow-[0_0_8px_rgba(245,158,11,0.9)]" />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* 3. Far Right: Minimalist 2-line Menu Button */}
            <div className="flex items-center flex-shrink-0">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="flex flex-col items-end justify-center gap-1.5 p-2 text-stone-200 hover:text-gold-400 focus:outline-none cursor-pointer group"
                aria-expanded={mobileMenuOpen}
                aria-label={mobileMenuOpen ? "Tutup Menu Navigasi" : "Buka Menu Navigasi"}
              >
                <span
                  className={`h-[2px] bg-current transition-all duration-300 rounded-full ${
                    mobileMenuOpen
                      ? "w-6 rotate-45 translate-y-[7px] bg-gold-400"
                      : "w-6 group-hover:bg-gold-400"
                  }`}
                />
                <span
                  className={`h-[2px] bg-current transition-all duration-300 rounded-full ${
                    mobileMenuOpen
                      ? "w-6 -rotate-45 -translate-y-[1px] bg-gold-400"
                      : "w-4 group-hover:w-6 group-hover:bg-gold-400"
                  }`}
                />
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Luxury Slide-over Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex justify-end animate-in fade-in duration-200">
          
          {/* Dark Backdrop */}
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
            aria-hidden="true"
          />

          {/* Slide-over Right Panel */}
          <aside
            className="relative z-10 w-full sm:w-[480px] md:w-[500px] h-full bg-charcoal-950 border-l border-gold-500/20 shadow-2xl flex flex-col justify-between p-6 sm:p-8 md:p-10 overflow-y-auto animate-in slide-in-from-right duration-300"
            aria-label="Panel Navigasi"
          >
            {/* Top Brand Bar & Close Button */}
            <div>
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-stone-800/80">
                <div className="flex items-center gap-3">
                  <div className="relative w-8 h-8 flex-shrink-0">
                    <Image
                      src="/logo.webp"
                      alt="Logo BHARASENA"
                      width={32}
                      height={34}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <span className="font-cinzel font-bold text-base tracking-[0.16em] text-white block uppercase">
                      BHARASENA<span className="text-gold-400">.</span>
                    </span>
                    <span className="text-[11px] text-stone-400 font-sans block">
                      Prom Night Taruna Bhayangkara 6
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-9 h-9 rounded-full bg-charcoal-900 border border-stone-800 flex items-center justify-center text-stone-400 hover:text-white hover:border-gold-500/40 transition-colors focus:outline-none cursor-pointer"
                  aria-label="Tutup Menu"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-gold-400/90 mb-3 px-2">
                  Menu Halaman
                </p>

                <nav className="flex flex-col divide-y divide-stone-800/40">
                  {navItems.map((item, idx) => {
                    const isActive = activeSection === item.id;
                    return (
                      <a
                        key={item.id}
                        href={item.href}
                        onClick={handleNavClick}
                        className={`group flex items-center justify-between py-3 px-2 transition-colors ${
                          isActive
                            ? "text-gold-400 font-bold"
                            : "text-stone-300 hover:text-white"
                        }`}
                      >
                        <div className="flex items-center gap-3.5">
                          <span className="text-xs font-mono text-stone-500 group-hover:text-gold-400/80 w-5">
                            0{idx + 1}
                          </span>
                          <span className="text-sm sm:text-base tracking-[0.06em] font-medium group-hover:translate-x-1 transition-transform">
                            {item.label}
                          </span>
                        </div>

                        <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-gold-400" />
                      </a>
                    );
                  })}
                </nav>
              </div>
            </div>

            {/* Bottom Info & CTA */}
            <div className="pt-6 mt-6 border-t border-stone-800/80 space-y-5">
              <div className="space-y-2 text-xs text-stone-400 px-2">
                <div className="flex items-center gap-2.5">
                  <Calendar className="w-3.5 h-3.5 text-gold-400 flex-shrink-0" />
                  <span>11–13 Desember 2026</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-3.5 h-3.5 text-gold-400 flex-shrink-0" />
                  <span>SMAN 2 Taruna Bhayangkara</span>
                </div>
              </div>

              <a
                href="#kontak"
                onClick={handleNavClick}
                className="w-full py-3 px-4 rounded-xl bg-gold-400 hover:bg-gold-300 text-charcoal-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Hubungi Panitia Acara</span>
              </a>
            </div>
          </aside>

        </div>
      )}
    </>
  );
}

export default Navbar;
