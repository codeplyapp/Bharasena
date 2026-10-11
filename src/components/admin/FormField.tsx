import React from "react";
import { cn } from "@/lib/utils";

interface FormFieldProps {
  label: string;
  name?: string;
  error?: string;
  description?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function FormField({
  label,
  name,
  error,
  description,
  required = false,
  children,
  className,
}: FormFieldProps) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <div className="flex items-center justify-between">
        <label
          htmlFor={name}
          className="text-xs font-semibold text-stone-300 uppercase tracking-wider block"
        >
          {label} {required && <span className="text-crimson-400">*</span>}
        </label>
      </div>

      {children}

      {description && (
        <p className="text-[11px] text-stone-500 leading-normal">
          {description}
        </p>
      )}

      {error && (
        <p className="text-xs text-crimson-400 font-medium">{error}</p>
      )}
    </div>
  );
}
