import React from "react";
import { Proposal, SponsorshipTier } from "@/lib/types";
import { FileText, Download, ExternalLink, Check, Sparkles, Gem } from "lucide-react";
import { Button } from "../ui/button";
import { EmptyState } from "./shared/EmptyState";

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
                  <div className="w-12 h-12 rounded-2xl bg-charcoal-900 border border-stone-700 flex items-center justify-center text-gold-400 mb-6 group-hover:scale-110 group-hover:border-gold-400/40 transition-transform">
                    <FileText className="w-6 h-6" />
                  </div>
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

        {/* Sponsorship Tiers Block */}
        {tiers.length > 0 && (
          <div className="mt-16">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-crimson-400 mb-2">
                <Gem className="w-4 h-4" />
                <span>Pilihan Paket Sponsorship</span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-stone-100">
                Tingkatan Kemitraan Brand
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {tiers.map((tier) => (
                <div
                  key={tier.id}
                  className={`relative p-6 rounded-3xl flex flex-col justify-between transition-all duration-300 ${
                    tier.highlight
                      ? "bg-charcoal-800 border-2 border-gold-400 shadow-2xl shadow-gold-400/10 scale-105 z-10"
                      : "bg-charcoal-850/80 border border-stone-800 hover:border-stone-700"
                  }`}
                >
                  {tier.highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gold-400 text-charcoal-950 font-bold text-[10px] tracking-wider uppercase shadow-md flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      Paling Populer
                    </div>
                  )}

                  <div>
                    <h4 className="font-display text-xl font-bold text-stone-100 mb-2">
                      {tier.name}
                    </h4>
                    <div className="font-display text-2xl font-black text-gold-400 mb-6">
                      {tier.price}
                    </div>

                    <div className="space-y-3 pt-4 border-t border-stone-800">
                      {tier.benefits.map((benefit, bIdx) => (
                        <div
                          key={bIdx}
                          className="flex items-start gap-2.5 text-xs text-stone-300 leading-relaxed"
                        >
                          <div className="w-4 h-4 rounded-full bg-crimson-600/20 text-crimson-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check className="w-3 h-3" />
                          </div>
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 pt-4">
                    <Button
                      asChild
                      variant={tier.highlight ? "gold" : "outlineGold"}
                      size="sm"
                      className="w-full justify-center"
                    >
                      <a href="#kontak">Pilih Paket Ini</a>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
