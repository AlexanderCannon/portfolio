"use client";

import { type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

const viewport = { once: true, margin: "-60px" as const };

/** OS triangulation tick — draws in when the section arrives. */
export function SurveyMark() {
  const reduced = useReducedMotion() ?? false;
  return (
    <motion.svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      aria-hidden
      className="shrink-0 text-accent"
      initial={reduced ? false : { opacity: 0, rotate: -25 }}
      whileInView={{ opacity: 1, rotate: 0 }}
      viewport={viewport}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <motion.circle
        cx="7"
        cy="7"
        r="5.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        initial={reduced ? false : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={viewport}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
      <path
        d="M7 1.5V12.5M1.5 7H12.5"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="square"
      />
      <circle cx="7" cy="7" r="1.15" fill="currentColor" />
    </motion.svg>
  );
}

/** Soft contour hatch under a section eyebrow. */
export function ContourRule() {
  return (
    <motion.div
      aria-hidden
      className="map-rule mt-3 h-3 max-w-[9rem] opacity-70"
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 0.7 }}
      viewport={viewport}
      transition={{ duration: 0.55, ease: "easeOut" }}
      style={{ originX: 0 }}
    />
  );
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-2.5">
      <SurveyMark />
      <p className="font-label text-ink-muted">{children}</p>
    </div>
  );
}
