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
  const paths = Array.from({ length: 18 }, (_, i) => {
    const isStream = i % 2 === 1;
    return {
      id: i,
      d: `M-${380 - i * 10 * position} -${189 + i * 12}C-${
        380 - i * 10 * position
      } -${189 + i * 12} -${312 - i * 10 * position} ${216 - i * 12} ${
        152 - i * 10 * position
      } ${343 - i * 12}C${616 - i * 10 * position} ${470 - i * 12} ${
        684 - i * 10 * position
      } ${875 - i * 12} ${684 - i * 10 * position} ${875 - i * 12}`,
      width: 0.85 + (i % 5) * 0.18,
      opacity: 0.22 + (i % 6) * 0.08,
      duration: 20 + (i % 6) * 3,
      isStream,
    };
  });

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
              strokeDasharray={path.isStream ? "160 240" : undefined}
              initial={
                path.isStream
                  ? { strokeDashoffset: 0, opacity: path.opacity * 0.8 }
                  : { opacity: path.opacity * 0.7 }
              }
              animate={
                path.isStream
                  ? {
                      strokeDashoffset: [0, -400],
                      opacity: [
                        path.opacity * 0.8,
                        path.opacity * 1.5,
                        path.opacity * 0.8,
                      ],
                    }
                  : {
                      opacity: [
                        path.opacity * 0.7,
                        path.opacity * 1.5,
                        path.opacity * 0.7,
                      ],
                      strokeWidth: [path.width, path.width * 1.25, path.width],
                    }
              }
              transition={
                path.isStream
                  ? {
                      duration: path.duration,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }
                  : {
                      duration: path.duration + 4,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }
              }
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

