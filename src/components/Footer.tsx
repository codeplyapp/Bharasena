"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

// Register ScrollTrigger safely for React / Next.js
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// -------------------------------------------------------------------------
// THEME-ADAPTIVE INLINE STYLES (BHARASENA LUXURY GOLD & CHARCOAL)
// -------------------------------------------------------------------------
const STYLES = `
.cinematic-footer-wrapper {
  -webkit-font-smoothing: antialiased;
  
  --pill-bg-1: rgba(255, 255, 255, 0.04);
  --pill-bg-2: rgba(255, 255, 255, 0.015);
  --pill-shadow: rgba(0, 0, 0, 0.6);
  --pill-highlight: rgba(217, 119, 6, 0.2);
  --pill-inset-shadow: rgba(0, 0, 0, 0.8);
  --pill-border: rgba(217, 119, 6, 0.25);
  
  --pill-bg-1-hover: rgba(217, 119, 6, 0.15);
  --pill-bg-2-hover: rgba(217, 119, 6, 0.05);
  --pill-border-hover: rgba(245, 158, 11, 0.5);
  --pill-shadow-hover: rgba(0, 0, 0, 0.85);
  --pill-highlight-hover: rgba(253, 230, 138, 0.3);
}

@keyframes footer-breathe {
  0% { transform: translate(-50%, -50%) scale(1); opacity: 0.45; }
  100% { transform: translate(-50%, -50%) scale(1.12); opacity: 0.85; }
}

@keyframes footer-scroll-marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

@keyframes footer-heartbeat {
  0%, 100% { transform: scale(1); filter: drop-shadow(0 0 4px rgba(239, 68, 68, 0.5)); }
  15%, 45% { transform: scale(1.25); filter: drop-shadow(0 0 10px rgba(239, 68, 68, 0.9)); }
  30% { transform: scale(1); }
}

.animate-footer-breathe {
  animation: footer-breathe 9s ease-in-out infinite alternate;
}

.animate-footer-scroll-marquee {
  animation: footer-scroll-marquee 35s linear infinite;
}

.animate-footer-heartbeat {
  animation: footer-heartbeat 2s cubic-bezier(0.25, 1, 0.5, 1) infinite;
}

/* Theme-adaptive Grid Background */
.footer-bg-grid {
  background-size: 64px 64px;
  background-image: 
    linear-gradient(to right, rgba(217, 119, 6, 0.05) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(217, 119, 6, 0.05) 1px, transparent 1px);
  mask-image: linear-gradient(to bottom, transparent, black 25%, black 75%, transparent);
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 25%, black 75%, transparent);
}

/* Theme-adaptive Gold Aurora Glow */
.footer-aurora {
  background: radial-gradient(
    circle at 50% 50%, 
    rgba(217, 119, 6, 0.22) 0%, 
    rgba(180, 83, 9, 0.12) 40%, 
    transparent 70%
  );
}

/* Glass Pill Theming */
.footer-glass-pill {
  background: linear-gradient(145deg, var(--pill-bg-1) 0%, var(--pill-bg-2) 100%);
  box-shadow: 
      0 10px 30px -10px var(--pill-shadow), 
      inset 0 1px 1px var(--pill-highlight), 
      inset 0 -1px 2px var(--pill-inset-shadow);
  border: 1px solid var(--pill-border);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.footer-glass-pill:hover {
  background: linear-gradient(145deg, var(--pill-bg-1-hover) 0%, var(--pill-bg-2-hover) 100%);
  border-color: var(--pill-border-hover);
  box-shadow: 
      0 18px 36px -8px var(--pill-shadow-hover), 
      inset 0 1px 1px var(--pill-highlight-hover);
}

/* Giant Background Text Masking */
.footer-giant-bg-text {
  font-size: 20vw;
  line-height: 0.75;
  letter-spacing: 0.08em;
  color: transparent;
  -webkit-text-stroke: 1px rgba(217, 119, 6, 0.15);
  background: linear-gradient(180deg, rgba(245, 158, 11, 0.18) 0%, transparent 65%);
  -webkit-background-clip: text;
  background-clip: text;
}

/* Metallic Gold Text Glow */
.footer-text-glow {
  background: linear-gradient(180deg, #fef3c7 0%, #f59e0b 60%, #b45309 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0px 0px 24px rgba(245, 158, 11, 0.35));
  overflow: visible;
}
`;

// -------------------------------------------------------------------------
// MAGNETIC BUTTON PRIMITIVE
// -------------------------------------------------------------------------
export type MagneticButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    as?: React.ElementType;
  };

export const MagneticButton = React.forwardRef<HTMLElement, MagneticButtonProps>(
  ({ className, children, as: Component = "button", ...props }, forwardedRef) => {
    const localRef = useRef<HTMLElement>(null);

    useEffect(() => {
      if (typeof window === "undefined") return;
      const element = localRef.current;
      if (!element) return;

      const ctx = gsap.context(() => {
        const handleMouseMove = (e: MouseEvent) => {
          const rect = element.getBoundingClientRect();
          const h = rect.width / 2;
          const w = rect.height / 2;
          const x = e.clientX - rect.left - h;
          const y = e.clientY - rect.top - w;

          gsap.to(element, {
            x: x * 0.35,
            y: y * 0.35,
            rotationX: -y * 0.12,
            rotationY: x * 0.12,
            scale: 1.04,
            ease: "power2.out",
            duration: 0.4,
          });
        };

        const handleMouseLeave = () => {
          gsap.to(element, {
            x: 0,
            y: 0,
            rotationX: 0,
            rotationY: 0,
            scale: 1,
            ease: "elastic.out(1, 0.35)",
            duration: 1.1,
          });
        };

        element.addEventListener("mousemove", handleMouseMove as EventListener);
        element.addEventListener("mouseleave", handleMouseLeave);

        return () => {
          element.removeEventListener("mousemove", handleMouseMove as EventListener);
          element.removeEventListener("mouseleave", handleMouseLeave);
        };
      }, element);

      return () => ctx.revert();
    }, []);

    return (
      <Component
        ref={(node: HTMLElement) => {
          (localRef as React.MutableRefObject<HTMLElement | null>).current = node;
          if (typeof forwardedRef === "function") forwardedRef(node);
          else if (forwardedRef) (forwardedRef as React.MutableRefObject<HTMLElement | null>).current = node;
        }}
        className={cn("cursor-pointer", className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
MagneticButton.displayName = "MagneticButton";

// -------------------------------------------------------------------------
// MARQUEE ITEM
// -------------------------------------------------------------------------
const MarqueeItem = () => (
  <div className="flex items-center space-x-10 px-6 select-none font-medium">
    <span className="text-stone-300">BHARA ARSA NAWASENA</span> <span className="text-gold-400 text-base">✦</span>
    <span className="text-stone-300">PROM NIGHT TARUNA BHAYANGKARA 6</span> <span className="text-gold-500 text-base">✦</span>
    <span className="text-stone-300">SMAN 2 TARUNA BHAYANGKARA</span> <span className="text-gold-400 text-base">✦</span>
    <span className="text-stone-300">11–13 DESEMBER 2026</span> <span className="text-gold-500 text-base">✦</span>
    <span className="text-stone-300">MENUJU GERBANG KESATRIA</span> <span className="text-gold-400 text-base">✦</span>
  </div>
);

// -------------------------------------------------------------------------
// MAIN CINEMATIC FOOTER COMPONENT
// -------------------------------------------------------------------------
export function Footer() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const giantTextRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!wrapperRef.current) return;

    const ctx = gsap.context(() => {
      // Parallax text background
      gsap.fromTo(
        giantTextRef.current,
        { y: "12vh", scale: 0.85, opacity: 0 },
        {
          y: "0vh",
          scale: 1,
          opacity: 1,
          ease: "power1.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 85%",
            end: "bottom bottom",
            scrub: 1,
          },
        }
      );

      // Staggered reveal center heading & links
      gsap.fromTo(
        [headingRef.current, linksRef.current],
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 45%",
            end: "bottom bottom",
            scrub: 1,
          },
        }
      );
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      {/* 
        The "Curtain Reveal" Wrapper:
        Sits in standard flow. With clip-path polygon, contents are revealed
        underneath as the user scrolls past previous content.
      */}
      <div
        ref={wrapperRef}
        className="relative h-screen w-full"
        style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
      >
        {/* Fixed footer background underneath */}
        <footer className="fixed bottom-0 left-0 flex h-screen w-full flex-col justify-between overflow-hidden bg-charcoal-950 text-stone-100 cinematic-footer-wrapper">

          {/* Ambient Gold Aura & Grid */}
          <div className="footer-aurora absolute left-1/2 top-1/2 h-[65vh] w-[85vw] -translate-x-1/2 -translate-y-1/2 animate-footer-breathe rounded-[50%] blur-[100px] pointer-events-none z-0" />
          <div className="footer-bg-grid absolute inset-0 z-0 pointer-events-none opacity-60" />

          {/* Giant background typography */}
          <div
            ref={giantTextRef}
            className="footer-giant-bg-text absolute -bottom-[4vh] left-1/2 -translate-x-1/2 whitespace-nowrap z-0 pointer-events-none select-none font-cinzel font-bold text-center tracking-[0.12em]"
          >
            BHARASENA
          </div>

          {/* 1. Sleek Diagonal Marquee */}
          <div className="absolute top-10 sm:top-14 left-0 w-full overflow-hidden border-y border-gold-500/20 bg-charcoal-950/80 backdrop-blur-md py-3.5 z-10 -rotate-1 scale-105 shadow-2xl">
            <div className="flex w-max animate-footer-scroll-marquee text-xs sm:text-sm font-semibold tracking-[0.25em] text-stone-300 uppercase">
              <MarqueeItem />
              <MarqueeItem />
            </div>
          </div>

          {/* 2. Main Center Content */}
          <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 sm:px-6 mt-20 sm:mt-24 w-full max-w-5xl mx-auto">

            {/* Logo Badge */}
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 mb-4 flex-shrink-0">
              <Image
                src="/logo.webp"
                alt="Logo BHARASENA"
                width={64}
                height={68}
                className="object-contain drop-shadow-[0_0_20px_rgba(217,119,6,0.4)]"
              />
            </div>

            <h2
              ref={headingRef}
              className="font-cinzel text-4xl sm:text-6xl md:text-7xl font-bold tracking-[0.15em] sm:tracking-[0.2em] footer-text-glow leading-normal sm:leading-relaxed px-4 sm:px-8 py-2 sm:py-4 mb-2 text-center max-w-4xl overflow-visible inline-block"
            >
              BHARASENA
            </h2>

            <p className="text-xs sm:text-sm md:text-base text-stone-300 text-center max-w-xl mb-8 sm:mb-10 font-sans leading-relaxed">
              Malam Keakraban Taruna Bhayangkara · SMAN 2 Taruna Bhayangkara. Merajut kenangan, melangkah pasti menuju masa depan gemilang.
            </p>

            {/* Interactive Magnetic Navigation Pills */}
            <div ref={linksRef} className="flex flex-col items-center gap-4 sm:gap-6 w-full">
              {/* Primary Quick Links */}
              <div className="flex flex-wrap justify-center gap-3 sm:gap-4 w-full">
                <MagneticButton as="a" href="#hero" className="footer-glass-pill px-6 sm:px-8 py-3 rounded-full text-stone-200 hover:text-gold-300 font-semibold text-xs sm:text-sm flex items-center gap-2">
                  <span>Beranda</span>
                </MagneticButton>

                <MagneticButton as="a" href="#tentang" className="footer-glass-pill px-6 sm:px-8 py-3 rounded-full text-stone-200 hover:text-gold-300 font-semibold text-xs sm:text-sm flex items-center gap-2">
                  <span>Tentang Acara</span>
                </MagneticButton>

                <MagneticButton as="a" href="#guest-star" className="footer-glass-pill px-6 sm:px-8 py-3 rounded-full text-stone-200 hover:text-gold-300 font-semibold text-xs sm:text-sm flex items-center gap-2">
                  <span>Guest Star</span>
                </MagneticButton>

                <MagneticButton as="a" href="#rundown" className="footer-glass-pill px-6 sm:px-8 py-3 rounded-full text-stone-200 hover:text-gold-300 font-semibold text-xs sm:text-sm flex items-center gap-2">
                  <span>Rundown 3 Hari</span>
                </MagneticButton>

                <MagneticButton as="a" href="#kontak" className="footer-glass-pill px-6 sm:px-8 py-3 rounded-full text-stone-200 hover:text-gold-300 font-semibold text-xs sm:text-sm flex items-center gap-2">
                  <span>Kontak Panitia</span>
                </MagneticButton>
              </div>
            </div>
          </div>

          {/* 3. Bottom Bar / Credits */}
          <div className="relative z-20 w-full pb-6 sm:pb-8 px-6 sm:px-12 flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 border-t border-stone-800/60 bg-charcoal-950/70 backdrop-blur-sm pt-4">

            {/* Copyright */}
            <div className="text-stone-400 text-[11px] sm:text-xs font-medium tracking-wider order-2 md:order-1 text-center md:text-left">
              <span>&copy; {currentYear} BHARASENA — SMAN 2 Taruna Bhayangkara. All Rights Reserved.</span>
            </div>

            {/* Back to top */}
            <MagneticButton
              as="button"
              onClick={scrollToTop}
              aria-label="Kembali ke atas"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full footer-glass-pill flex items-center justify-center text-stone-300 hover:text-gold-400 group order-3 border-gold-500/30"
            >
              <ArrowUp className="w-4 h-4 transform group-hover:-translate-y-1 transition-transform duration-300" />
            </MagneticButton>

          </div>
        </footer>
      </div>
    </>
  );
}

export default Footer;
