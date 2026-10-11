"use client";

import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export function FloatingPathsBackground({
  position,
  children,
  className,
}: {
  position: number;
  className?: string;
  children?: React.ReactNode;
}) {
  const paths = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 10 * position} -${189 + i * 12}C-${
      380 - i * 10 * position
    } -${189 + i * 12} -${312 - i * 10 * position} ${216 - i * 12} ${
      152 - i * 10 * position
    } ${343 - i * 12}C${616 - i * 10 * position} ${470 - i * 12} ${
      684 - i * 10 * position
    } ${875 - i * 12} ${684 - i * 10 * position} ${875 - i * 12}`,
    width: 0.9 + (i % 6) * 0.18,
    opacity: 0.22 + (i % 6) * 0.08,
    duration: 18 + (i % 6) * 3,
  }));

  return (
    <div className={cn("w-full relative", className)}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg
          className="w-full h-full text-gold-400"
          viewBox="-580 -420 1480 1320"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
        >
          {paths.map((path) => (
            <motion.path
              key={path.id}
              d={path.d}
              stroke="currentColor"
              strokeWidth={path.width}
              strokeOpacity={path.opacity}
              initial={{ pathLength: 0.35, opacity: 0.4 }}
              animate={{
                pathLength: 1,
                opacity: [0.35, 0.75, 0.35],
                pathOffset: [0, 1, 0],
              }}
              transition={{
                duration: path.duration,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
              style={{
                willChange: "stroke-dashoffset, opacity",
              }}
            />
          ))}
        </svg>
      </div>
      {children}
    </div>
  );
}

export default FloatingPathsBackground;

