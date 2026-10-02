"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Calendar } from "lucide-react";

interface DayTabsProps {
  activeDay: number;
  onSelectDay: (day: number) => void;
  days?: { day: number; label: string; date: string }[];
  className?: string;
}

const DEFAULT_DAYS = [
  { day: 1, label: "Day 1", date: "11 Des 2026" },
  { day: 2, label: "Day 2", date: "12 Des 2026" },
  { day: 3, label: "Day 3", date: "13 Des 2026" },
];

export function DayTabs({
  activeDay,
  onSelectDay,
  days = DEFAULT_DAYS,
  className,
}: DayTabsProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-charcoal-850/80 border border-stone-800 backdrop-blur-sm max-w-xl mx-auto",
        className
      )}
      role="tablist"
      aria-label="Pilih Hari Acara"
    >
      {days.map(({ day, label, date }) => {
        const isActive = activeDay === day;
        return (
          <button
            key={day}
            role="tab"
            aria-selected={isActive}
            aria-controls={`tabpanel-day-${day}`}
            id={`tab-day-${day}`}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onSelectDay(day)}
            className={cn(
              "flex-1 min-w-[120px] flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400",
              isActive
                ? "bg-crimson-600 text-white shadow-lg shadow-crimson-600/30 scale-[1.02]"
                : "text-stone-400 hover:text-stone-200 hover:bg-charcoal-800/60"
            )}
          >
            <Calendar className={cn("w-4 h-4", isActive ? "text-white" : "text-stone-500")} />
            <div className="flex flex-col text-left">
              <span className="font-semibold text-xs sm:text-sm">{label}</span>
              <span
                className={cn(
                  "text-[10px] leading-tight",
                  isActive ? "text-stone-200" : "text-stone-500"
                )}
              >
                {date}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
