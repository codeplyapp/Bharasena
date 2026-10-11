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
        <div className="mb-14 sm:mb-16">
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
          <div className="relative max-w-4xl mx-auto">
            {/* Timeline Vertical Continuous Rail */}
            <div className="absolute top-6 bottom-6 left-4 sm:left-44 w-[2px] bg-gradient-to-b from-crimson-600 via-gold-400 to-stone-800 -translate-x-1/2" />

            <div className="space-y-6 sm:space-y-8">
              {filteredItems.map((item, index) => (
                <div
                  key={item.id}
                  className="relative flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-10 group"
                >
                  {/* 1. Time Column (Desktop left side, Mobile inline above card) */}
                  <div className="sm:w-36 sm:text-right flex-shrink-0 pt-1.5 pl-10 sm:pl-0">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/25 text-gold-400 font-semibold text-xs tracking-wide">
                      <Clock className="w-3.5 h-3.5 flex-shrink-0 text-gold-400" />
                      <span className="whitespace-nowrap">{item.time}</span>
                    </div>
                  </div>

                  {/* 2. Timeline Bullet Node (Anchored exactly on the vertical rail) */}
                  <div className="absolute left-4 sm:left-44 -translate-x-1/2 top-2 sm:top-2.5 w-5 h-5 rounded-full bg-charcoal-900 border-2 border-gold-400 flex items-center justify-center z-10 group-hover:scale-125 group-hover:border-amber-300 group-hover:bg-gold-400 transition-all shadow-md shadow-gold-400/20">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold-400 group-hover:bg-charcoal-900" />
                  </div>

                  {/* 3. Event Detail Card */}
                  <div className="flex-1 ml-10 sm:ml-0 p-5 sm:p-6 rounded-2xl bg-charcoal-850/90 border border-stone-800 transition-all duration-300 group-hover:border-gold-400/40 group-hover:bg-charcoal-800 shadow-lg shadow-black/20">
                    <div className="flex items-start justify-between gap-3 mb-2.5">
                      <h3 className="font-display text-lg sm:text-xl font-bold text-stone-100 group-hover:text-gold-300 transition-colors">
                        {item.title}
                      </h3>
                      <span className="text-[11px] font-mono font-semibold text-gold-400/80 bg-charcoal-900 px-2.5 py-0.5 rounded-md border border-stone-800 flex-shrink-0">
                        #{String(index + 1).padStart(2, "0")}
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
