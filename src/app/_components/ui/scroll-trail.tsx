"use client";

import {
  useCallback,
  useEffect,
  useState,
  type RefObject,
} from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

type Pt = { x: number; y: number };

type ScrollTrailProps = {
  containerRef: RefObject<HTMLElement | null>;
};

/** Orthogonal polyline → quadratic-rounded corners. */
function roundedOrthoPath(points: Pt[], radius: number): string {
  if (points.length < 2) return "";
  if (points.length === 2) {
    return `M ${points[0]!.x} ${points[0]!.y} L ${points[1]!.x} ${points[1]!.y}`;
  }

  let d = `M ${points[0]!.x} ${points[0]!.y}`;
  for (let i = 1; i < points.length - 1; i++) {
    const prev = points[i - 1]!;
    const curr = points[i]!;
    const next = points[i + 1]!;
    const len1 = Math.hypot(curr.x - prev.x, curr.y - prev.y) || 1;
    const len2 = Math.hypot(next.x - curr.x, next.y - curr.y) || 1;
    const r = Math.min(radius, len1 / 2, len2 / 2);
    const x1 = curr.x - ((curr.x - prev.x) / len1) * r;
    const y1 = curr.y - ((curr.y - prev.y) / len1) * r;
    const x2 = curr.x + ((next.x - curr.x) / len2) * r;
    const y2 = curr.y + ((next.y - curr.y) / len2) * r;
    d += ` L ${x1} ${y1} Q ${curr.x} ${curr.y} ${x2} ${y2}`;
  }
  const last = points[points.length - 1]!;
  d += ` L ${last.x} ${last.y}`;
  return d;
}

/**
 * Serpentine survey dashed line in the content gutters.
 * Fills in with scroll: right rail → down → cross left → …
 */
export default function ScrollTrail({ containerRef }: ScrollTrailProps) {
  const reduced = useReducedMotion() ?? false;
  const [path, setPath] = useState("");
  const [size, setSize] = useState({ w: 0, h: 0 });

  const rebuild = useCallback(() => {
    const root = containerRef.current;
    if (!root) return;
    const sections = [
      ...root.querySelectorAll<HTMLElement>("[data-trail-section]"),
    ];
    if (sections.length < 2) {
      setPath("");
      return;
    }

    const w = root.offsetWidth;
    const h = root.offsetHeight;
    setSize({ w, h });

    const rootRect = root.getBoundingClientRect();
    const inset = w < 640 ? 10 : 18;
    const left = inset;
    const right = w - inset;
    const approach = w < 640 ? 28 : 44;

    const pts: Pt[] = [];
    sections.forEach((el, i) => {
      const y =
        el.getBoundingClientRect().top - rootRect.top + root.scrollTop + 22;
      const onRight = i % 2 === 0;
      const rail = onRight ? right : left;
      const from = onRight ? right - approach : left + approach;

      if (i === 0) {
        pts.push({ x: from, y }, { x: rail, y });
        return;
      }

      const prevOnRight = (i - 1) % 2 === 0;
      const prevRail = prevOnRight ? right : left;
      // Down previous rail → cross → stub toward section
      pts.push({ x: prevRail, y }, { x: rail, y }, { x: from, y });
      if (i < sections.length - 1) {
        pts.push({ x: rail, y });
      }
    });

    setPath(roundedOrthoPath(pts, 18));
  }, [containerRef]);

  useEffect(() => {
    rebuild();
    const root = containerRef.current;
    if (!root) return;

    const ro = new ResizeObserver(() => rebuild());
    ro.observe(root);
    for (const el of root.querySelectorAll("[data-trail-section]")) {
      ro.observe(el);
    }

    const t = window.setTimeout(rebuild, 400);
    const t2 = window.setTimeout(rebuild, 1200);
    window.addEventListener("load", rebuild);
    return () => {
      ro.disconnect();
      window.clearTimeout(t);
      window.clearTimeout(t2);
      window.removeEventListener("load", rebuild);
    };
  }, [containerRef, rebuild]);

  // Start later (top nearer mid-viewport), finish earlier (bottom still low)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.45", "end 0.75"],
  });

  const draw = useTransform(scrollYProgress, [0, 1], [0, 1]);

  if (!path || size.w === 0) return null;

  return (
    <svg
      className="pointer-events-none absolute inset-0 z-[2] overflow-visible"
      width={size.w}
      height={size.h}
      viewBox={`0 0 ${size.w} ${size.h}`}
      fill="none"
      aria-hidden
    >
      <path
        d={path}
        stroke="hsl(var(--ink) / 0.22)"
        strokeWidth="1.5"
        strokeDasharray="6 10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <motion.path
        d={path}
        stroke="hsl(var(--accent))"
        strokeWidth="1.75"
        strokeDasharray="6 10"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={false}
        style={reduced ? { pathLength: 1 } : { pathLength: draw }}
      />
    </svg>
  );
}
