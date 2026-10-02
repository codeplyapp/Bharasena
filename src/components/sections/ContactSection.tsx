import React from "react";
import { ContactPerson } from "@/lib/types";
import { MessageCircle, Building2, Store } from "lucide-react";
import { Button } from "../ui/button";
import { EmptyState } from "./shared/EmptyState";

interface ContactSectionProps {
  contacts: ContactPerson[];
}

const CATEGORY_MAP = {
  humas: {
    title: "Humas & Informasi Acara",
    desc: "Pertanyaan seputar tiket, jadwal, tata tertib, dan informasi umum kegiatan.",
    icon: MessageCircle,
    color: "text-gold-400",
    defaultText:
      "Halo Panitia BHARASENA 2026, saya ingin bertanya seputar informasi acara Prom Night.",
  },
  sponsorship: {
    title: "Kemitraan Sponsorship",
    desc: "Kerjasama korporasi, presentasi paket sponsor, dan penawaran media partner.",
    icon: Building2,
    color: "text-crimson-400",
    defaultText:
      "Halo Tim Sponsorship BHARASENA 2026, saya berminat untuk berdiskusi terkait kemitraan / sponsorship.",
  },
  umkm: {
    title: "Kemitraan Tenant UMKM",
    desc: "Pendaftaran booth bazar kuliner, produk kreatif, dan tenant selama acara.",
    icon: Store,
    color: "text-stone-300",
    defaultText:
      "Halo Tim Bazar BHARASENA 2026, saya tertarik membuka booth / stand UMKM pada acara ini.",
  },
};

export function ContactSection({ contacts }: ContactSectionProps) {
  const categories: ("humas" | "sponsorship" | "umkm")[] = [
    "humas",
    "sponsorship",
    "umkm",
  ];

  return (
    <section
      id="kontak"
      className="scroll-mt-24 py-20 sm:py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-stone-100 tracking-tight mb-4">
            Hubungi <span className="text-gold-400">Panitia</span>
          </h2>
          <p className="text-stone-400 text-base sm:text-lg leading-relaxed">
            Tim panitia siap melayani pertanyaan seputar acara, proposal sponsorship, maupun pendaftaran tenant UMKM.
          </p>
        </div>

        {/* 3 Categories Columns */}
        {contacts.length === 0 ? (
          <EmptyState
            message="Data narahubung belum diunggah."
            submessage="Silakan periksa kembali nanti."
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {categories.map((catKey) => {
              const meta = CATEGORY_MAP[catKey];
              const catContacts = contacts.filter((c) => c.type === catKey);
              const IconComponent = meta.icon;

              return (
                <div
                  key={catKey}
                  className="p-6 sm:p-8 rounded-3xl bg-charcoal-850/80 border border-stone-800 flex flex-col justify-between shadow-lg backdrop-blur-sm"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-charcoal-900 border border-stone-700 flex items-center justify-center text-gold-400 mb-4">
                      <IconComponent className="w-5 h-5" />
                    </div>

                    <h3 className="font-display text-xl font-bold text-stone-100 mb-2">
                      {meta.title}
                    </h3>
                    <p className="text-stone-400 text-xs sm:text-sm leading-relaxed mb-6">
                      {meta.desc}
                    </p>

                    <div className="space-y-4 pt-4 border-t border-stone-800">
                      {catContacts.map((contact) => {
                        const cleanPhone = contact.phoneWa.replace(/\D/g, "");
                        const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                          meta.defaultText
                        )}`;

                        return (
                          <div
                            key={contact.id}
                            className="p-4 rounded-2xl bg-charcoal-800/90 border border-stone-800/90 hover:border-gold-400/30 transition-all flex flex-col gap-3"
                          >
                            <div>
                              <span className="text-[11px] text-stone-400 font-medium block">
                                {contact.label}
                              </span>
                              <span className="text-stone-100 font-semibold text-sm">
                                {contact.name}
                              </span>
                            </div>

                            <Button
                              asChild
                              size="sm"
                              variant="outlineGold"
                              className="w-full justify-center"
                            >
                              <a
                                href={waUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2"
                              >
                                <MessageCircle className="w-4 h-4 text-emerald-400" />
                                <span>Chat WhatsApp</span>
                              </a>
                            </Button>
                          </div>
                        );
                      })}
                    </div>
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
