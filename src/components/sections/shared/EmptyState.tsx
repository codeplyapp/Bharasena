import React from "react";
import { Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  message?: string;
  className?: string;
  submessage?: string;
}

export function EmptyState({
  message = "Belum ada informasinya.",
  submessage,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-8 rounded-2xl border border-stone-800/80 bg-charcoal-850/50 text-center max-w-md mx-auto my-6",
        className
      )}
    >
      <div className="w-12 h-12 rounded-full bg-charcoal-800 flex items-center justify-center text-gold-400/80 mb-3 border border-stone-700/50">
        <Info className="w-6 h-6" />
      </div>
      <p className="text-stone-300 font-medium text-base">{message}</p>
      {submessage && (
        <p className="text-stone-500 text-sm mt-1">{submessage}</p>
      )}
    </div>
  );
}
