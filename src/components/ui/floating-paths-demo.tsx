"use client";

import { FloatingPathsBackground } from "@/components/ui/floating-paths";

export function FloatingPathsBackgroundExample() {
  return (
    <FloatingPathsBackground
      className="aspect-16/9 flex items-center justify-center min-h-[300px]"
      position={-1}
    >
      <div className="relative z-10 text-center">
        <h2 className="text-2xl font-bold text-white">Floating Paths Background</h2>
      </div>
    </FloatingPathsBackground>
  );
}

export default FloatingPathsBackgroundExample;
