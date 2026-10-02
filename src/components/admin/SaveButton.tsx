"use client";

import React from "react";
import { useFormStatus } from "react-dom";
import { Loader2, Save } from "lucide-react";
import { Button } from "../ui/button";

interface SaveButtonProps {
  label?: string;
  loadingLabel?: string;
  className?: string;
  disabled?: boolean;
}

export function SaveButton({
  label = "Simpan Perubahan",
  loadingLabel = "Menyimpan...",
  className,
  disabled = false,
}: SaveButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      variant="gold"
      disabled={pending || disabled}
      className={className}
    >
      {pending ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin mr-2" />
          <span>{loadingLabel}</span>
        </>
      ) : (
        <>
          <Save className="w-4 h-4 mr-2" />
          <span>{label}</span>
        </>
      )}
    </Button>
  );
}
