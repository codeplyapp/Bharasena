import React from "react";
import { CommitteeSection as CommitteeSectionType } from "@/lib/types";
import { User, ShieldCheck } from "lucide-react";
import { EmptyState } from "./shared/EmptyState";

interface CommitteeSectionProps {
  sections: CommitteeSectionType[];
}

export function CommitteeSection({ sections }: CommitteeSectionProps) {
  const sortedSections = [...sections].sort((a, b) => a.order - b.order);

  return (
    <section
      id="panitia"
      className="scroll-mt-24 py-20 sm:py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-stone-100 tracking-tight mb-4">
            Susunan <span className="text-gold-400">Kepanitiaan</span>
          </h2>
          <p className="text-stone-400 text-base sm:text-lg leading-relaxed">
            Dedikasi dan sinergi taruna-taruni Batalyon Bhara Arsa Nawasena di balik terselenggaranya Prom Night 2026.
          </p>
        </div>

        {/* Committee Sections Grid */}
        {sortedSections.length === 0 ? (
          <EmptyState
            message="Susunan kepanitiaan belum diunggah."
            submessage="Data panitia pelaksana akan segera diumumkan."
          />
        ) : (
          <div className="space-y-12">
            {sortedSections.map((section) => {
              const sortedMembers = [...section.members].sort(
                (a, b) => a.order - b.order
              );

              return (
                <div
                  key={section.id}
                  className="p-6 sm:p-8 rounded-3xl bg-charcoal-850/70 border border-stone-800 shadow-lg backdrop-blur-sm"
                >
                  {/* Division Header */}
                  <div className="flex items-center gap-3 pb-4 mb-6 border-b border-stone-800">
                    <div className="w-10 h-10 rounded-xl bg-charcoal-800 border border-gold-400/20 flex items-center justify-center text-gold-400">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl sm:text-2xl font-bold text-gold-400">
                        {section.title}
                      </h3>
                      <span className="text-xs text-stone-500">
                        {sortedMembers.length} Anggota Panitia
                      </span>
                    </div>
                  </div>

                  {/* Members Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {sortedMembers.map((member) => (
                      <div
                        key={member.id}
                        className="p-4 rounded-xl bg-charcoal-800/80 border border-stone-800 hover:border-gold-400/30 hover:bg-charcoal-800 transition-all duration-200"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-charcoal-900 border border-stone-700 flex items-center justify-center text-stone-400 flex-shrink-0">
                            <User className="w-4 h-4" />
                          </div>
                          <div className="overflow-hidden">
                            <h4 className="font-medium text-stone-100 text-sm truncate">
                              {member.name}
                            </h4>
                            <p className="text-stone-400 text-xs truncate">
                              {member.role}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
