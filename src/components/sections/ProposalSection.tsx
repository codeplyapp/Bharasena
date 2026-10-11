import React from "react";
import { Proposal, SponsorshipTier } from "@/lib/types";
import { Download, ExternalLink } from "lucide-react";
import { Button } from "../ui/button";
import { EmptyState } from "./shared/EmptyState";
import { SponsorshipPricing } from "./shared/SponsorshipPricing";

interface ProposalSectionProps {
  proposals: Proposal[];
  tiers?: SponsorshipTier[];
}

export function ProposalSection({
  proposals,
  tiers = [],
}: ProposalSectionProps) {
  return (
    <section
      id="proposal"
      className="scroll-mt-24 py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-charcoal-950/40 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-stone-100 tracking-tight mb-4">
            Proposal & Paket <span className="text-gold-400">Kerjasama</span>
          </h2>
          <p className="text-stone-400 text-base sm:text-lg leading-relaxed">
            Peluang strategis berkolaborasi dan mendukung kesuksesan perhelatan akbar Prom Night BHARASENA 2026.
          </p>
        </div>

        {/* 3 Proposal Cards */}
        {proposals.length === 0 ? (
          <EmptyState
            message="Berkas proposal belum diunggah."
            submessage="Silakan hubungi narahubung sponsorship untuk informasi lebih lanjut."
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-20">
            {proposals.map((proposal) => (
              <div
                key={proposal.id}
                className="p-6 sm:p-8 rounded-3xl bg-charcoal-800/90 border border-stone-800 hover:border-gold-400/40 transition-all duration-300 flex flex-col justify-between shadow-xl group"
              >
                <div>
                  <h3 className="font-display text-xl font-bold text-stone-100 mb-3 group-hover:text-gold-400 transition-colors">
                    {proposal.title}
                  </h3>
                  <p className="text-stone-300 text-sm leading-relaxed mb-6">
                    {proposal.description}
                  </p>
                </div>

                <Button asChild variant="gold" className="w-full justify-center">
                  <a
                    href={proposal.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>Lihat / Unduh PDF</span>
                    <ExternalLink className="w-3.5 h-3.5 ml-0.5 opacity-70" />
                  </a>
                </Button>
              </div>
            ))}
          </div>
        )}

        {/* Pilihan Paket Sponsorship Block (Interactive Animated Pricing) */}
        {tiers.length > 0 && (
          <div className="mt-16">
            <SponsorshipPricing tiers={tiers} />
          </div>
        )}
      </div>
    </section>
  );
}
