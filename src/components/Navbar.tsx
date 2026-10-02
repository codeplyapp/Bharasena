"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { EventMode } from "@/lib/types";
import { getNavItems } from "@/lib/sections";
import { Menu, X, Sparkles, MessageCircle } from "lucide-react";
import { Button } from "./ui/button";

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
          if (rect.top <= 120) {
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
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-charcoal-900/90 backdrop-blur-md border-b border-stone-800/80 py-3 shadow-lg shadow-black/20"
          : "bg-gradient-to-b from-charcoal-950/90 to-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo & Name */}
          <Link
            href="#hero"
            className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 rounded-lg p-1"
          >
            <div className="relative w-9 h-10 flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/logo.webp"
                alt="Logo BHARASENA"
                width={48}
                height={50}
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-cinzel font-semibold text-lg sm:text-xl tracking-[0.14em] text-gold-400 group-hover:text-gold-300 transition-colors pr-1.5 overflow-visible">
                BHARASENA
              </span>
              <span className="text-[10px] tracking-widest uppercase text-stone-400 font-medium">
                Taruna Bhayangkara 6
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            className="hidden lg:flex items-center gap-1 xl:gap-2 px-3 py-1.5 rounded-full bg-charcoal-850/60 border border-stone-800/60 backdrop-blur-sm"
            aria-label="Navigasi Utama"
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  className={`px-3 py-1.5 rounded-full text-xs xl:text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-crimson-600/90 text-white font-semibold shadow-sm"
                      : "text-stone-300 hover:text-gold-400 hover:bg-charcoal-800/60"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Action CTA & Mobile Hamburger */}
          <div className="flex items-center gap-3">
            <Button
              asChild
              size="sm"
              variant="default"
              className="hidden sm:inline-flex"
            >
              <a href="#kontak">
                <MessageCircle className="w-4 h-4 mr-1.5" />
                <span>Hubungi Panitia</span>
              </a>
            </Button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-charcoal-800 text-stone-200 hover:text-gold-400 hover:bg-charcoal-700 border border-stone-700/60 focus:outline-none focus:ring-2 focus:ring-gold-400 cursor-pointer"
              aria-expanded={mobileMenuOpen}
              aria-label="Buka Menu Navigasi"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[65px] bg-charcoal-900/98 backdrop-blur-xl border-b border-stone-800 shadow-2xl px-6 py-6 transition-all duration-200 animate-in slide-in-from-top-4">
          <nav className="flex flex-col space-y-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={() => handleNavClick()}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                    isActive
                      ? "bg-crimson-600 text-white font-semibold"
                      : "text-stone-300 hover:bg-charcoal-800 hover:text-gold-400"
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <Sparkles className="w-4 h-4 text-gold-400" />}
                </a>
              );
            })}
            <div className="pt-4 mt-2 border-t border-stone-800">
              <Button asChild className="w-full justify-center" size="lg">
                <a href="#kontak" onClick={() => setMobileMenuOpen(false)}>
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Hubungi Panitia Acara
                </a>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
