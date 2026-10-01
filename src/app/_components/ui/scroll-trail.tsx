"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type RefObject,
} from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

type Pt = { x: number; y: number };

type ScrollTrailProps = {
  containerRef: RefObject<HTMLElement | null>;
};

/** Prefer explicit marks, then headers + sections, then sizable direct children. */
function collectStops(root: HTMLElement): HTMLElement[] {
  const tagged = [
    ...root.querySelectorAll<HTMLElement>("[data-trail-section]"),
  ];
  if (tagged.length >= 2) return tagged;

  const sections = [...root.querySelectorAll<HTMLElement>("section")];
  const headers = [...root.querySelectorAll<HTMLElement>("header")].filter(
    (h) => !sections.some((s) => s.contains(h)),
  );
  const stops = [...headers, ...sections];
  if (stops.length >= 2) return stops;

  const inner =
    root.querySelector<HTMLElement>("[data-trail-content]") ?? root;
  return [...inner.children].filter(
    (el): el is HTMLElement =>
      el instanceof HTMLElement && el.offsetHeight > 48,
  );
}

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
 * Dashes are stable; a solid mask reveals them on scroll (avoids
 * pathLength fighting stroke-dasharray at the rounded corners).
 */
export default function ScrollTrail({ containerRef }: ScrollTrailProps) {
  const reduced = useReducedMotion() ?? false;
  const maskId = useId().replace(/:/g, "");
  const [path, setPath] = useState("");
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [head, setHead] = useState({
    x: 0,
    y: 0,
    angle: 0,
    on: false,
    atEnd: false,
  });
  const routeRef = useRef<SVGPathElement>(null);

  const rebuild = useCallback(() => {
    const root = containerRef.current;
    if (!root) return;
    const sections = collectStops(root);
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

      if (i === 0) {
        pts.push({ x: right - approach, y }, { x: rail, y });
        return;
      }

      const prevRail = (i - 1) % 2 === 0 ? right : left;
      // Down previous rail, then cross — stop on the rail (no reverse stub)
      pts.push({ x: prevRail, y }, { x: rail, y });
    });

    setPath(roundedOrthoPath(pts, 18));
  }, [containerRef]);

  useEffect(() => {
    rebuild();
    const root = containerRef.current;
    if (!root) return;

    const ro = new ResizeObserver(() => rebuild());
    ro.observe(root);
    for (const el of collectStops(root)) {
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

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.55", "end 0.85"],
  });

  const draw = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const placeHead = useCallback(
    (t: number) => {
      const el = routeRef.current;
      if (!el) return;
      const len = el.getTotalLength();
      if (len <= 0) return;
      const clamped = Math.max(0, Math.min(1, t));
      const at = len * (reduced ? 1 : clamped);
      const p = el.getPointAtLength(at);
      const before = el.getPointAtLength(Math.max(0, at - 2));
      const angle = (Math.atan2(p.y - before.y, p.x - before.x) * 180) / Math.PI;
      setHead({
        x: p.x,
        y: p.y,
        angle,
        on: reduced || clamped > 0.001,
        atEnd: reduced || clamped >= 0.998,
      });
    },
    [reduced],
  );

  useMotionValueEvent(draw, "change", placeHead);

  useEffect(() => {
    placeHead(reduced ? 1 : draw.get());
  }, [path, placeHead, reduced, draw]);

  if (!path || size.w === 0) return null;

  const dash = "5 11";

  return (
    <svg
      className="pointer-events-none absolute inset-0 z-[2] overflow-visible"
      width={size.w}
      height={size.h}
      viewBox={`0 0 ${size.w} ${size.h}`}
      fill="none"
      aria-hidden
    >
      <defs>
        <mask
          id={maskId}
          maskUnits="userSpaceOnUse"
          x={0}
          y={0}
          width={size.w}
          height={size.h}
        >
          {/* Solid reveal stroke — pathLength only, no dash fight */}
          <motion.path
            d={path}
            stroke="white"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={false}
            style={reduced ? { pathLength: 1 } : { pathLength: draw }}
          />
        </mask>
      </defs>

      {/* Quiet full route */}
      <path
        ref={routeRef}
        d={path}
        stroke="hsl(var(--ink) / 0.2)"
        strokeWidth="1.5"
        strokeDasharray={dash}
        strokeLinecap="butt"
        strokeLinejoin="round"
      />

      {/* Accent dashes, clipped by the scroll mask */}
      <path
        d={path}
        stroke="hsl(var(--accent))"
        strokeWidth="1.75"
        strokeDasharray={dash}
        strokeLinecap="butt"
        strokeLinejoin="round"
        mask={`url(#${maskId})`}
      />

      {head.on && (
        <g transform={`translate(${head.x} ${head.y})`}>
          <AnimatePresence mode="wait" initial={false}>
            {head.atEnd ? (
              <motion.g
                key="trail-x"
                initial={
                  reduced
                    ? false
                    : { rotate: head.angle, scale: 0.5, opacity: 1 }
                }
                animate={{
                  // At least one full turn from the arrow heading into −28°
                  rotate:
                    head.angle +
                    360 +
                    ((((-10 - head.angle) % 360) + 360) % 360),
                  scale: 1,
                  opacity: 1,
                }}
                transition={
                  reduced
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 170, damping: 14, mass: 0.7 }
                }
                stroke="hsl(var(--accent))"
                strokeWidth="5.5"
                strokeLinecap="square"
              >
                <line x1="-16" y1="-16" x2="16" y2="16" />
                <line x1="16" y1="-16" x2="-16" y2="16" />
              </motion.g>
            ) : (
              <motion.g
                key="trail-arrow"
                exit={
                  reduced
                    ? undefined
                    : { scale: 0.4, opacity: 0, transition: { duration: 0.12 } }
                }
                style={{ rotate: head.angle }}
              >
                <path
                  d="M 8 0 L -9 -6.5 L -5.5 0 L -9 6.5 Z"
                  fill="hsl(var(--accent))"
                  stroke="hsl(var(--paper))"
                  strokeWidth="0.85"
                  strokeLinejoin="round"
                />
              </motion.g>
            )}
          </AnimatePresence>
        </g>
      )}
    </svg>
  );
}
