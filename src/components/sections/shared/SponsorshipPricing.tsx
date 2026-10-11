"use client";

import React, { useRef, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TimelineContent } from "@/components/ui/timeline-animation";
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SponsorshipTier } from "@/lib/types";
import NumberFlow from "@number-flow/react";
import { CheckCheck } from "lucide-react";
import { motion } from "motion/react";

interface SponsorshipPricingProps {
  tiers: SponsorshipTier[];
  className?: string;
}

function parsePriceNumber(priceStr: string, fallback: number): number {
  const digits = priceStr.replace(/[^0-9]/g, "");
  return digits ? parseInt(digits, 10) : fallback;
}

const defaultPriceFallbacks: Record<string, number> = {
  platinum: 25000000,
  gold: 15000000,
  silver: 7500000,
  perunggu: 3000000,
};

export function SponsorshipPricing({
  tiers,
  className,
}: SponsorshipPricingProps) {
  const [isTermin, setIsTermin] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const revealVariants = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.15,
        duration: 0.5,
      },
    }),
    hidden: {
      filter: "blur(8px)",
      y: 20,
      opacity: 0,
    },
  };

  const handleSwitch = (value: string) => {
    setIsTermin(value === "1");
  };

  return (
    <div ref={containerRef} className={cn("w-full py-8", className)}>
      {/* Header with VerticalCutReveal */}
      <div className="text-center max-w-3xl mx-auto mb-10 space-y-4">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-crimson-400 block">
          Pilihan Paket Sponsorship
        </span>

        <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-stone-100 leading-tight">
          <VerticalCutReveal
            splitBy="words"
            staggerDuration={0.12}
            staggerFrom="first"
            reverse={true}
            containerClassName="justify-center text-center"
            transition={{
              type: "spring",
              stiffness: 250,
              damping: 35,
              delay: 0,
            }}
          >
            Tingkatan Kemitraan Brand & Prom Night
          </VerticalCutReveal>
        </h3>

        <TimelineContent
          as="p"
          animationNum={0}
          timelineRef={containerRef}
          customVariants={revealVariants}
          className="text-stone-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto"
        >
          Kolaborasi prestisius bersama ribuan peserta BHARASENA 2026. Pilih skema investasi yang selaras dengan tujuan publikasi brand Anda.
        </TimelineContent>

        {/* Pricing Switch: Penuh vs Termin */}
        <TimelineContent
          as="div"
          animationNum={1}
          timelineRef={containerRef}
          customVariants={revealVariants}
          className="pt-2 flex justify-center"
        >
          <div className="relative z-10 flex w-fit items-center rounded-2xl bg-charcoal-850 border border-stone-800 p-1.5 shadow-lg">
            <button
              type="button"
              onClick={() => handleSwitch("0")}
              className={cn(
                "relative z-10 cursor-pointer h-11 rounded-xl px-5 py-2 text-xs sm:text-sm font-semibold transition-colors duration-200",
                !isTermin ? "text-charcoal-950 font-bold" : "text-stone-400 hover:text-stone-200"
              )}
            >
              {!isTermin && (
                <motion.span
                  layoutId="pricing-switch-active"
                  className="absolute inset-0 rounded-xl bg-gold-400 shadow-md"
                  transition={{ type: "spring", stiffness: 450, damping: 30 }}
                />
              )}
              <span className="relative z-10">Pembayaran Penuh</span>
            </button>

            <button
              type="button"
              onClick={() => handleSwitch("1")}
              className={cn(
                "relative z-10 cursor-pointer h-11 rounded-xl px-5 py-2 text-xs sm:text-sm font-semibold transition-colors duration-200 flex items-center gap-2",
                isTermin ? "text-charcoal-950 font-bold" : "text-stone-400 hover:text-stone-200"
              )}
            >
              {isTermin && (
                <motion.span
                  layoutId="pricing-switch-active"
                  className="absolute inset-0 rounded-xl bg-gold-400 shadow-md"
                  transition={{ type: "spring", stiffness: 450, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                2x Termin
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-[10px] font-bold uppercase transition-colors",
                    isTermin
                      ? "bg-charcoal-950/20 text-charcoal-950"
                      : "bg-crimson-600/30 text-crimson-300 border border-crimson-500/30"
                  )}
                >
                  Fleksibel
                </span>
              </span>
            </button>
          </div>
        </TimelineContent>
      </div>

      {/* Grid of Sponsorship Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
        {tiers.map((tier, index) => {
          const fallbackPrice = defaultPriceFallbacks[tier.id] || 5000000;
          const fullPrice = parsePriceNumber(tier.price, fallbackPrice);
          const terminPrice = Math.round(fullPrice / 2);
          const displayPrice = isTermin ? terminPrice : fullPrice;

          return (
            <TimelineContent
              key={tier.id}
              as="div"
              animationNum={2 + index}
              timelineRef={containerRef}
              customVariants={revealVariants}
              className="h-full"
            >
              <Card
                className={cn(
                  "relative h-full flex flex-col justify-between rounded-3xl transition-all duration-300",
                  tier.highlight
                    ? "border-2 border-gold-400 bg-charcoal-800 shadow-2xl shadow-gold-400/10 scale-[1.02] z-10"
                    : "border border-stone-800 bg-charcoal-850/80 hover:border-stone-700"
                )}
              >
                <CardHeader className="text-left pb-2">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h4 className="font-display text-xl sm:text-2xl font-bold text-stone-100">
                      {tier.name}
                    </h4>
                    {tier.highlight && (
                      <span className="bg-gold-400 text-charcoal-950 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider shadow-sm">
                        Populer
                      </span>
                    )}
                  </div>

                  {/* Dynamic Animated Price with NumberFlow */}
                  <div className="pt-2 pb-1">
                    <div className="flex items-baseline gap-1 text-gold-400">
                      <span className="text-sm font-bold font-sans text-stone-400">Rp</span>
                      <NumberFlow
                        locales="id-ID"
                        value={displayPrice}
                        format={{
                          useGrouping: true,
                          maximumFractionDigits: 0,
                        }}
                        className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-gold-400"
                      />
                    </div>
                    <span className="text-[11px] text-stone-400 block mt-0.5">
                      {isTermin ? "per termin (total 2x termin)" : "komitmen pembayaran penuh"}
                    </span>
                  </div>
                </CardHeader>

                <CardContent className="pt-2 flex flex-col flex-1 justify-between">
                  <div className="space-y-3 pt-3 border-t border-stone-800/80">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block">
                      Benefit Kemitraan:
                    </span>
                    <ul className="space-y-2.5">
                      {tier.benefits.map((benefit, bIdx) => (
                        <li
                          key={bIdx}
                          className="flex items-start gap-2.5 text-xs text-stone-300 leading-relaxed"
                        >
                          <span className="h-4 w-4 rounded-full bg-crimson-600/25 text-crimson-400 border border-crimson-500/30 grid place-content-center flex-shrink-0 mt-0.5">
                            <CheckCheck className="h-2.5 w-2.5 text-crimson-400" />
                          </span>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 pt-4 border-t border-stone-800/50">
                    <Button
                      asChild
                      variant={tier.highlight ? "gold" : "outlineGold"}
                      size="sm"
                      className="w-full justify-center rounded-xl py-2.5 font-bold text-xs uppercase tracking-wider"
                    >
                      <a href="#kontak">Pilih Paket Ini</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TimelineContent>
          );
        })}
      </div>
    </div>
  );
}
