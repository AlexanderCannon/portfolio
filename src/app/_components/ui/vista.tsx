"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  DEFAULT_VISTA_SEED,
  generateVista,
  PARALLAX_RANGE,
  VISTA_HEIGHT,
  VISTA_WIDTH,
  type VistaScene,
} from "~/lib/vista";

function ParallaxLayer({
  depth,
  progress,
  reduced,
  children,
}: {
  depth: number;
  progress: MotionValue<number>;
  reduced: boolean;
  children: ReactNode;
}) {
  const y = useTransform(progress, [0, 1], [0, -depth * PARALLAX_RANGE]);
  if (reduced) return <g>{children}</g>;
  return <motion.g style={{ y }}>{children}</motion.g>;
}

/** Valley only — no near frames/ground (those sit above the page body). */
function VistaSvg({
  scene,
  progress,
  reduced,
  isDark,
}: {
  scene: VistaScene;
  progress: MotionValue<number>;
  reduced: boolean;
  isDark: boolean;
}) {
  // Sun eases down slowly — most of the set happens late in the scroll
  const sunY = useTransform(
    progress,
    [0, 0.45, 1],
    [0, PARALLAX_RANGE * 0.12, PARALLAX_RANGE * 0.38],
  );

  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox={`0 0 ${VISTA_WIDTH} ${VISTA_HEIGHT}`}
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <linearGradient id="vista-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(var(--vista-sky-top))" />
          <stop offset="55%" stopColor="hsl(var(--vista-sky-mid))" />
          <stop offset="100%" stopColor="hsl(var(--vista-sky-bottom))" />
        </linearGradient>
        <radialGradient id="vista-sun-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="hsl(var(--vista-sun))" stopOpacity={1} />
          <stop
            offset="55%"
            stopColor="hsl(var(--vista-sun))"
            stopOpacity={0.45}
          />
          <stop
            offset="100%"
            stopColor="hsl(var(--vista-sun))"
            stopOpacity={0}
          />
        </radialGradient>
      </defs>

      <rect width={VISTA_WIDTH} height={VISTA_HEIGHT} fill="url(#vista-sky)" />

      {/* Large centered sun — lower half clipped by the far ridge behind which it sits */}
      <motion.g style={reduced ? undefined : { y: sunY }}>
        <circle
          cx={scene.sun.cx}
          cy={scene.sun.cy}
          r={isDark ? 200 : 260}
          fill="url(#vista-sun-glow)"
        />
        <circle
          cx={scene.sun.cx}
          cy={scene.sun.cy}
          r={isDark ? 72 : 96}
          fill="hsl(var(--vista-sun))"
        />
        {isDark &&
          scene.stars.map((s, i) => (
            <circle
              key={i}
              cx={s.x}
              cy={s.y}
              r={i % 5 === 0 ? 1.4 : 0.8}
              fill="hsl(var(--vista-sun))"
              opacity={0.3 + (i % 4) * 0.1}
            />
          ))}
      </motion.g>

      <g className="animate-cloud-drift-slow origin-center" opacity={0.55}>
        {scene.clouds.slice(0, 2).map((c, i) => (
          <g key={`c-a-${i}`}>
            {c.parts.map((p, j) => (
              <ellipse
                key={j}
                cx={c.cx + p.dx}
                cy={c.cy + p.dy}
                rx={p.rx}
                ry={p.ry}
                fill="hsl(var(--vista-cloud))"
              />
            ))}
          </g>
        ))}
      </g>
      <g className="animate-cloud-drift origin-center" opacity={0.4}>
        {scene.clouds.slice(2).map((c, i) => (
          <g key={`c-b-${i}`}>
            {c.parts.map((p, j) => (
              <ellipse
                key={j}
                cx={c.cx + p.dx}
                cy={c.cy + p.dy}
                rx={p.rx}
                ry={p.ry}
                fill="hsl(var(--vista-cloud))"
              />
            ))}
          </g>
        ))}
      </g>

      {/* Far ridges */}
      {scene.layers.slice(0, 2).map((layer) => (
        <ParallaxLayer
          key={layer.fillVar}
          depth={layer.depth}
          progress={progress}
          reduced={reduced}
        >
          <path
            d={layer.ridge}
            fill={`hsl(var(--${layer.fillVar}))`}
            opacity={layer.opacity}
          />
          {layer.forest && (
            <path
              d={layer.forest}
              fill="hsl(var(--vista-pine))"
            />
          )}
        </ParallaxLayer>
      ))}

      {scene.layers.slice(2).map((layer) => (
        <ParallaxLayer
          key={layer.fillVar}
          depth={layer.depth}
          progress={progress}
          reduced={reduced}
        >
          <path
            d={layer.ridge}
            fill={`hsl(var(--${layer.fillVar}))`}
            opacity={layer.opacity}
          />
          {layer.forest && (
            <path
              d={layer.forest}
              fill={
                layer.depth >= 0.7
                  ? "hsl(var(--vista-shadow))"
                  : "hsl(var(--vista-pine))"
              }
            />
          )}
        </ParallaxLayer>
      ))}
    </svg>
  );
}

/** Closest brown — side frames + ground lip. Stays above page body. */
function NearPlaneOverlay({
  scene,
  progress,
  reduced,
}: {
  scene: VistaScene;
  progress: MotionValue<number>;
  reduced: boolean;
}) {
  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox={`0 0 ${VISTA_WIDTH} ${VISTA_HEIGHT}`}
      preserveAspectRatio="none"
      aria-hidden
    >
      <ParallaxLayer
        depth={scene.leftFrame.depth}
        progress={progress}
        reduced={reduced}
      >
        <path d={scene.nearGround} fill="hsl(var(--vista-shadow))" />
        <path
          d={scene.rightFrame.path}
          fill={`hsl(var(--${scene.rightFrame.fillVar}))`}
        />
        {scene.rightFrame.trees && (
          <path d={scene.rightFrame.trees} fill="hsl(var(--vista-shadow))" />
        )}
        <path
          d={scene.leftFrame.path}
          fill={`hsl(var(--${scene.leftFrame.fillVar}))`}
        />
        {scene.leftFrame.trees && (
          <path d={scene.leftFrame.trees} fill="hsl(var(--vista-shadow))" />
        )}
      </ParallaxLayer>
    </svg>
  );
}

export default function Vista({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [seed, setSeed] = useState(DEFAULT_VISTA_SEED);
  const [isDark, setIsDark] = useState(false);
  const reduced = useReducedMotion() ?? false;
  const scene = useMemo(() => generateVista(seed), [seed]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  useEffect(() => {
    const sync = () =>
      setIsDark(document.documentElement.classList.contains("dark"));
    sync();
    const obs = new MutationObserver(sync);
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className={`relative ${className}`}>
      {/* Valley + hero copy — under near plane and under page body */}
      <div className="sticky top-0 z-0 h-[100svh] overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <VistaSvg
            scene={scene}
            progress={scrollYProgress}
            reduced={reduced}
            isDark={isDark}
          />
        </div>

        <div className="relative z-10 mx-auto flex h-full max-w-shell flex-col items-center justify-start px-5 pb-40 pt-8 text-center sm:px-8 sm:pt-12 lg:pt-14">
          {children}
          <button
            type="button"
            onClick={() => setSeed((s) => (s + 7919) >>> 0)}
            className="pointer-events-auto mt-6 self-center font-mono text-[11px] uppercase tracking-[0.14em] text-[hsl(var(--vista-text-muted))] underline-offset-4 hover:underline"
          >
            New trail
          </button>
        </div>
      </div>

      {/* Closest brown stays above page body so content tucks under it */}
      <div
        className="pointer-events-none sticky top-0 z-30 -mt-[100svh] h-[100svh]"
        aria-hidden
      >
        <NearPlaneOverlay
          scene={scene}
          progress={scrollYProgress}
          reduced={reduced}
        />
      </div>

      <div className="h-[40svh]" aria-hidden />
    </section>
  );
}
