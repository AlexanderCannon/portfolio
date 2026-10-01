"use client";

import { useRef, type ReactNode } from "react";
import { cn } from "~/lib/utils";
import ScrollTrail from "~/app/_components/ui/scroll-trail";

type PageShellProps = {
  children: ReactNode;
  className?: string;
  /** Narrower reading measure for prose-heavy pages */
  narrow?: boolean;
  /** Serpentine survey trail in the gutters (home only for now) */
  trail?: boolean;
};

export default function PageShell({
  children,
  className = "",
  narrow = false,
  trail = false,
}: PageShellProps) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      className={cn(
        "relative mx-auto w-full",
        narrow ? "max-w-measure" : "max-w-shell",
      )}
    >
      {trail && <ScrollTrail containerRef={ref} />}
      <div
        data-trail-content
        className={cn(
          "relative z-[1] px-5 py-16 sm:px-8 sm:py-24",
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}
