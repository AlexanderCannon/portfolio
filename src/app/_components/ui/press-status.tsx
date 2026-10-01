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
    <div className="border-y border-dashed border-line bg-secondary/80">
      <div className="mx-auto flex max-w-shell flex-wrap items-center justify-between gap-x-6 gap-y-1 px-5 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-muted sm:px-8">
        <span>
          <span className="text-stamp">●</span> Field notes · live
        </span>
        <span className="hidden sm:inline">{stamp}</span>
        <span>Los Angeles</span>
        <span className="hidden md:inline">34.1°N · 117.7°W</span>
      </div>
    </div>
  );
}
