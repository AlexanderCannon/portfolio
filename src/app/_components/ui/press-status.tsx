"use client";

import { useEffect, useState } from "react";

export default function PressStatus() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 30_000);
    return () => window.clearInterval(id);
  }, []);

  const stamp = now.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZoneName: "short",
  });

  return (
    <div className="border-b-2 border-ink bg-secondary">
      <div className="mx-auto flex max-w-shell flex-wrap items-center justify-between gap-x-6 gap-y-1 px-5 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-muted sm:px-8">
        <span>
          <span className="text-accent">●</span> Press · live
        </span>
        <span className="hidden sm:inline">{stamp}</span>
        <span>Edition 2026.09 · Los Angeles</span>
        <span className="hidden md:inline">Sheet A · Folio</span>
      </div>
    </div>
  );
}
