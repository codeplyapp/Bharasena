"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

export interface TimelineContentProps {
  as?: "div" | "p" | "span" | "article" | "section" | "h1" | "h2" | "h3";
  animationNum?: number;
  timelineRef?: React.RefObject<HTMLElement | null>;
  customVariants?: Variants;
  className?: string;
  children: React.ReactNode;
}

export function TimelineContent({
  as = "div",
  animationNum = 0,
  customVariants,
  className,
  children,
}: TimelineContentProps) {
  const Component = (motion[as as keyof typeof motion] || motion.div) as typeof motion.div;

  const defaultVariants: Variants = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.2,
        duration: 0.5,
      },
    }),
    hidden: {
      filter: "blur(10px)",
      y: -20,
      opacity: 0,
    },
  };

  return (
    <Component
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      custom={animationNum}
      variants={customVariants || defaultVariants}
      className={cn(className)}
    >
      {children}
    </Component>
  );
}
