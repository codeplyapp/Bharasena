import React from "react";
import { OfficialGuest } from "@/lib/types";
import { Award, UserCheck, Shield, Sparkles } from "lucide-react";
import { EmptyState } from "./shared/EmptyState";

interface GuestsSectionProps {
  guests: OfficialGuest[];
}

const CATEGORY_META: Record<
  string,
  { label: string; icon: React.ElementType; badgeColor: string }
> = {
  kepala: {
    label: "Kepala Satuan Pendidikan",
    icon: Award,
    badgeColor: "border-gold-400/40 bg-gold-400/15 text-gold-400",
  },
  wakil: {
    label: "Wakil Kepala Satuan Pendidikan",
    icon: UserCheck,
    badgeColor: "border-crimson-500/40 bg-crimson-600/15 text-crimson-400",
  },
  pembina: {
    label: "Pembina & Instruktur Taruna",
    icon: Shield,
    badgeColor: "border-stone-600 bg-charcoal-900 text-stone-300",
  },
  lainnya: {
    label: "Tamu Kehormatan",
    icon: Sparkles,
    badgeColor: "border-stone-700 bg-charcoal-900 text-stone-400",
  },
};

export function GuestsSection({ guests }: GuestsSectionProps) {
  // Urutan kategori baku: kepala -> wakil -> pembina -> lainnya
  const categoriesOrder = ["kepala", "wakil", "pembina", "lainnya"];

  const groupedGuests: Record<string, OfficialGuest[]> = {};
  for (const guest of guests) {
    const cat = guest.category.toLowerCase();
    if (!groupedGuests[cat]) groupedGuests[cat] = [];
    groupedGuests[cat].push(guest);
  }

  const activeCategories = categoriesOrder.filter(
    (cat) => groupedGuests[cat] && groupedGuests[cat].length > 0
  );

  return (
    <section
      id="undangan"
      className="scroll-mt-24 py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-charcoal-950/40 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-400/10 border border-gold-400/30 text-gold-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Award className="w-3.5 h-3.5" />
            <span>Pimpinan & Pembina</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-stone-100 tracking-tight mb-4">
            Tamu Undangan <span className="text-gold-400">Kehormatan</span>
          </h2>
          <p className="text-stone-400 text-base sm:text-lg leading-relaxed">
            Daftar pimpinan satuan pendidikan, dewan pengasuh, dan pembina kehormatan SMAN 2 Taruna Bhayangkara.
          </p>
        </div>

        {/* Categories Grid */}
        {guests.length === 0 ? (
          <EmptyState
            message="Daftar tamu undangan kehormatan belum diisi."
            submessage="Data akan diperbarui oleh panitia sekretariat."
          />
        ) : (
          <div className="space-y-12">
            {activeCategories.map((catKey) => {
              const meta = CATEGORY_META[catKey] ?? {
                label: "Tamu Undangan",
                icon: UserCheck,
                badgeColor: "border-stone-700 bg-charcoal-900 text-stone-300",
              };
              const IconComponent = meta.icon;
              const catGuests = groupedGuests[catKey] ?? [];

              return (
                <div key={catKey} className="space-y-6">
                  {/* Category Header */}
                  <div className="flex items-center gap-3 border-b border-stone-800 pb-3">
                    <div className="w-8 h-8 rounded-lg bg-charcoal-800 flex items-center justify-center text-gold-400">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-stone-200">
                      {meta.label}
                    </h3>
                  </div>

                  {/* Guests Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {catGuests.map((guest) => (
                      <div
                        key={guest.id}
                        className="p-6 rounded-2xl bg-charcoal-800/90 border border-stone-800 hover:border-gold-400/40 hover:bg-charcoal-800 transition-all duration-200 shadow-md flex flex-col justify-between"
                      >
                        <div>
                          <span
                            className={`inline-block text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full border mb-3 ${meta.badgeColor}`}
                          >
                            {guest.category}
                          </span>
                          <h4 className="font-display text-lg sm:text-xl font-bold text-stone-100 mb-1.5 leading-snug">
                            {guest.name}
                          </h4>
                        </div>
                        <p className="text-stone-400 text-xs sm:text-sm mt-3 pt-3 border-t border-stone-800/80">
                          {guest.role}
                        </p>
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
