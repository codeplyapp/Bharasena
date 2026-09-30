import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal-900 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-crimson-600 text-white hover:bg-crimson-500 active:scale-[0.98] shadow-md hover:shadow-crimson-600/30",
        gold:
          "bg-gold-400 text-charcoal-950 font-semibold hover:bg-gold-300 active:scale-[0.98] shadow-md hover:shadow-gold-400/20",
        outline:
          "border border-stone-700 bg-transparent text-stone-200 hover:bg-charcoal-800 hover:text-gold-400 hover:border-gold-400/50",
        outlineGold:
          "border border-gold-400/60 bg-gold-400/10 text-gold-400 hover:bg-gold-400/20 hover:border-gold-400",
        secondary:
          "bg-charcoal-800 text-stone-200 hover:bg-charcoal-700 hover:text-white border border-stone-700/50",
        ghost:
          "text-stone-300 hover:bg-charcoal-800/80 hover:text-gold-400",
        link:
          "text-gold-400 underline-offset-4 hover:underline p-0 h-auto",
        destructive:
          "bg-crimson-700 text-white hover:bg-crimson-600",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-12 rounded-xl px-7 text-base font-semibold",
        icon: "h-10 w-10 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
