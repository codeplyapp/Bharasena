"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { EventMode } from "@/lib/types";
import { getNavItems } from "@/lib/sections";
import { Calendar, MapPin, MessageCircle, ArrowRight } from "lucide-react";

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

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-charcoal-950/85 backdrop-blur-md border-b border-white/5 py-4 shadow-xl shadow-black/40"
            : "bg-gradient-to-b from-black/85 via-black/45 to-transparent py-5 sm:py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between">
            
            {/* 1. Brand / Logo */}
            <Link
              href="#hero"
              className="flex items-center gap-3 group focus-visible:outline-none"
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

            {/* 2. Desktop Navigation Links (Clean Minimalist Editorial Style) */}
            <div className="flex items-center gap-6 lg:gap-10">
              <nav
                className="hidden md:flex items-center gap-6 lg:gap-9"
                aria-label="Navigasi Utama"
              >
                {navItems.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <a
                      key={item.id}
                      href={item.href}
                      className={`relative text-[11px] lg:text-xs font-semibold tracking-[0.22em] uppercase transition-all duration-200 py-1 ${
                        isActive
                          ? "text-white font-bold drop-shadow-[0_0_12px_rgba(255,255,255,0.45)]"
                          : "text-stone-300/90 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
                      }`}
                    >
                      <span>{item.label}</span>
                      {isActive && (
                        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-gold-400 rounded-full shadow-[0_0_8px_rgba(245,158,11,0.9)]" />
                      )}
                    </a>
                  );
                })}
              </nav>

              {/* 3. Minimalist 2-line Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="flex flex-col items-end justify-center gap-1.5 p-2 text-stone-200 hover:text-white focus:outline-none cursor-pointer group"
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

      {/* Fullscreen / Drawer Glassmorphic Navigation Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-charcoal-950/95 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-12 pt-28 sm:pt-32 animate-in fade-in zoom-in-95 duration-200">
          <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col justify-center">
            
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-gold-400 mb-6 sm:mb-8">
              Navigasi Halaman · BHARASENA
            </p>

            <nav className="flex flex-col space-y-4 sm:space-y-6">
              {navItems.map((item, idx) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={handleNavClick}
                    className="group flex items-center justify-between text-2xl sm:text-4xl md:text-5xl font-cinzel font-bold text-stone-200 hover:text-gold-400 transition-colors tracking-wide py-1 border-b border-stone-800/50"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-xs sm:text-sm font-sans text-stone-600 group-hover:text-gold-500 transition-colors">
                        0{idx + 1}
                      </span>
                      <span className={isActive ? "text-gold-400" : ""}>{item.label}</span>
                    </div>
                    <ArrowRight className="w-5 h-5 sm:w-7 sm:h-7 opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-gold-400" />
                  </a>
                );
              })}
            </nav>
          </div>

          {/* Drawer Bottom Info */}
          <div className="max-w-4xl mx-auto w-full pt-8 border-t border-stone-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-stone-400">
            <div className="flex flex-wrap items-center gap-6">
              <span className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-gold-500" />
                11–13 Desember 2026
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-gold-500" />
                SMAN 2 Taruna Bhayangkara
              </span>
            </div>

            <a
              href="#kontak"
              onClick={handleNavClick}
              className="inline-flex items-center gap-2 text-gold-400 hover:text-gold-300 font-semibold uppercase tracking-wider"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Hubungi Panitia</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
