"use client";

import React, { useState } from "react";
import { RundownItem } from "@/lib/types";
import { Clock } from "lucide-react";
import { DayTabs } from "./shared/DayTabs";
import { EmptyState } from "./shared/EmptyState";

interface RundownSectionProps {
  items: RundownItem[];
  defaultDay?: number;
}

export function RundownSection({
  items,
  defaultDay = 1,
}: RundownSectionProps) {
  const [selectedDay, setSelectedDay] = useState<number>(defaultDay);

  const filteredItems = items
    .filter((item) => item.day === selectedDay)
    .sort((a, b) => a.order - b.order);

  const daysConfig = [
    { day: 1, label: "Day 1 — Pembukaan", date: "Jumat, 11 Des 2026" },
    { day: 2, label: "Day 2 — Pentas & Konser", date: "Sabtu, 12 Des 2026" },
    { day: 3, label: "Day 3 — Gala Prom Night", date: "Minggu, 13 Des 2026" },
  ];

  return (
    <section
      id="rundown"
      className="scroll-mt-24 py-20 sm:py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-stone-100 tracking-tight mb-4">
            Rundown Acara <span className="text-gold-400">3 Hari</span>
          </h2>
          <p className="text-stone-400 text-base sm:text-lg leading-relaxed">
            Rangkaian agenda sakral, apresiasi, dan hiburan selama tiga hari pelaksanaan Prom Night Taruna Bhayangkara 6.
          </p>
        </div>

        {/* Day Tabs */}
        <div className="mb-12">
          <DayTabs
            activeDay={selectedDay}
            onSelectDay={setSelectedDay}
            days={daysConfig}
          />
        </div>

        {/* Timeline Items */}
        {filteredItems.length === 0 ? (
          <EmptyState
            message={`Jadwal untuk Day ${selectedDay} belum tersedia.`}
            submessage="Silakan cek kembali nanti atau pilih hari lainnya."
          />
        ) : (
          <div className="relative pl-6 sm:pl-8 md:pl-32">
            {/* Timeline Vertical Rail */}
            <div className="absolute top-4 bottom-4 left-6 sm:left-8 md:left-32 w-0.5 bg-gradient-to-b from-crimson-600 via-gold-400 to-stone-800 -translate-x-1/2" />

            <div className="space-y-8 relative">
              {filteredItems.map((item, index) => (
                <div
                  key={item.id}
                  className="relative flex flex-col md:flex-row items-start gap-4 md:gap-8 group"
                >
                  {/* Timeline Time Tag (Desktop Rail) */}
                  <div className="md:absolute md:-left-32 md:w-28 md:text-right md:top-4 flex items-center gap-1.5 text-xs font-bold text-gold-400">
                    <Clock className="w-3.5 h-3.5 text-crimson-400 md:hidden flex-shrink-0" />
                    <span>{item.time}</span>
                  </div>

                  {/* Bullet Node */}
                  <div className="absolute -left-6 sm:-left-8 md:-left-32 w-5 h-5 rounded-full bg-charcoal-900 border-2 border-gold-400 flex items-center justify-center -translate-x-1/2 top-4.5 z-10 group-hover:scale-125 group-hover:border-crimson-500 group-hover:bg-gold-400 transition-all shadow-md">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold-400 group-hover:bg-charcoal-900" />
                  </div>

                  {/* Content Card */}
                  <div className="w-full ml-4 sm:ml-6 md:ml-0 p-5 sm:p-6 rounded-2xl bg-charcoal-800/90 border border-stone-800 transition-all duration-200 group-hover:border-gold-400/40 group-hover:bg-charcoal-800 shadow-md">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <h3 className="font-display text-lg sm:text-xl font-bold text-stone-100 group-hover:text-gold-400 transition-colors">
                        {item.title}
                      </h3>
                      <span className="text-[11px] font-semibold text-stone-500 bg-charcoal-900 px-2.5 py-0.5 rounded-md border border-stone-800">
                        #{index + 1}
                      </span>
                    </div>
                    <p className="text-stone-300 text-sm leading-relaxed">
                      {item.description}
                    </p>
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
