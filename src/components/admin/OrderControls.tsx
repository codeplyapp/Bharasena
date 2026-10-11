"use client";

import React from "react";
import { ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "../ui/button";

interface OrderControlsProps {
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  isFirst?: boolean;
  isLast?: boolean;
  disabled?: boolean;
}

export function OrderControls({
  onMoveUp,
  onMoveDown,
  isFirst = false,
  isLast = false,
  disabled = false,
}: OrderControlsProps) {
  return (
    <div className="flex items-center gap-1">
      <Button
        type="button"
        size="icon"
        variant="secondary"
        className="h-8 w-8 rounded-md hover:bg-charcoal-700 hover:text-gold-400 disabled:opacity-30"
        onClick={onMoveUp}
        disabled={disabled || isFirst}
        title="Pindahkan ke atas"
        aria-label="Pindahkan ke atas"
      >
        <ArrowUp className="w-4 h-4" />
      </Button>

      <Button
        type="button"
        size="icon"
        variant="secondary"
        className="h-8 w-8 rounded-md hover:bg-charcoal-700 hover:text-gold-400 disabled:opacity-30"
        onClick={onMoveDown}
        disabled={disabled || isLast}
        title="Pindahkan ke bawah"
        aria-label="Pindahkan ke bawah"
      >
        <ArrowDown className="w-4 h-4" />
      </Button>
    </div>
  );
}
