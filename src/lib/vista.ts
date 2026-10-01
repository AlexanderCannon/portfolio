/** Seeded valley vista – Firewatch-scale topology, tonal washes, forest bands. */

export type Rng = () => number;

export type Point = { x: number; y: number };

export type RidgeSpec = {
  baseline: number;
  amplitude: number;
  roughness: number;
  valley: number;
  rightBias: number;
  /** Extra mid-valley knolls / terraces (0–1). */
  knolls: number;
  /** Valley floor horizontal position (0=left … 1=right). */
  floorT: number;
  /** Left→right drop; positive sinks the right side (higher Y). */
  tilt: number;
  /** Bowl walls: lower = soft roll, higher = steep U. */
  bowlPower: number;
  /** Left shoulder strength relative to right. */
  leftWeight: number;
  /** Phase shift for knoll wrinkles so layers don’t share the same ripples. */
  warp: number;
  /** Optional distant peak (Fuji-like): horizontal position 0–1. */
  peakT: number;
  /** Optional distant peak height as a fraction of amplitude. */
  peakH: number;
  /** Distant jagged teeth (0–1) – sharp multi-peaks for far ranges. */
  teeth: number;
  /** Crossing swell strength (0–1) – S-curve so layers weave past each other. */
  swell: number;
  width: number;
  height: number;
};

export type VistaLayer = {
  ridge: string;
  contour: string | null;
  forest: string | null;
  depth: number;
  fillVar: string;
  opacity: number;
};

export type CloudBlob = {
  cx: number;
  cy: number;
  parts: { dx: number; dy: number; rx: number; ry: number }[];
};

export type NearProp = {
  path: string;
  trees: string | null;
  depth: number;
  fillVar: string;
};

export type VistaScene = {
  seed: number;
  width: number;
  height: number;
  layers: VistaLayer[];
  stars: Point[];
  clouds: CloudBlob[];
  /** Large front-left near frame. */
  leftFrame: NearProp;
  /** Subtle front-right near frame. */
  rightFrame: NearProp;
  /** Full-width near ground lip – page body scrolls under this. */
  nearGround: string;
  /** Sun/moon nestled in the far valley bowl. */
  sun: { cx: number; cy: number; depth: number };
};

export const VISTA_WIDTH = 1600;
export const VISTA_HEIGHT = 900;
export const DEFAULT_VISTA_SEED = 19890812;
export const PARALLAX_RANGE = 480;
/** Extra fill below the viewBox so upward parallax never uncovers layer bottoms. */
export const FILL_EXTENT = Math.ceil(PARALLAX_RANGE * 1.7 + 120);

export function mulberry32(seed: number): Rng {
  let t = seed >>> 0;
  return () => {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Per-layer ridge profile – shifted bowls, tilt, and asymmetric shoulders
 * so stacked ridges don’t share one arc.
 */
function valleyOffset(
  x: number,
  width: number,
  valley: number,
  rightBias: number,
  amplitude: number,
  knolls: number,
  floorT: number,
  tilt: number,
  bowlPower: number,
  leftWeight: number,
  warp: number,
  peakT: number,
  peakH: number,
  teeth: number,
  swell: number,
): number {
  const t = x / width;
  // Skew parameter space so the bowl max sits at floorT instead of 0.5
  const s =
    t < floorT
      ? (t / Math.max(0.08, floorT)) * 0.5
      : 0.5 + ((t - floorT) / Math.max(0.08, 1 - floorT)) * 0.5;
  const bowl = Math.pow(Math.sin(Math.min(1, Math.max(0, s)) * Math.PI), bowlPower);
  const floor = bowl * valley * amplitude * 1.25;
  const leftRise =
    Math.pow(1 - t, 1.35 + leftWeight * 0.2) *
    valley *
    amplitude *
    (0.95 * leftWeight);
  const rightRise =
    Math.pow(t, 1.25 + rightBias * 0.3) *
    (valley * 0.7 + rightBias) *
    amplitude *
    (0.9 + rightBias * 0.8);
  // Positive tilt → right side lower on screen (descends into the distance)
  const tiltDrop = tilt * amplitude * Math.pow(t, 1.1);
  const knoll =
    knolls *
    amplitude *
    0.18 *
    (Math.sin(t * Math.PI * (2.2 + warp) + warp * 2) * 0.55 +
      Math.sin(t * Math.PI * (4.8 + warp * 1.5) + warp) * 0.4 +
      Math.sin(t * Math.PI * 8.5 + warp * 3) * 0.25);
  // Soft cone peak (Mount Fuji) – wide base, sharp tip
  const peak =
    peakH > 0
      ? peakH *
        amplitude *
        Math.exp(-Math.pow((t - peakT) / 0.145, 2) * 1.85)
      : 0;
  // LA front-range silhouette – clear peaks + saddles, not soft noise
  let jagged = 0;
  if (teeth > 0) {
    const range = [
      { t: 0.06, h: 0.28, w: 0.07 },
      { t: 0.18, h: 0.72, w: 0.09 },
      { t: 0.3, h: 0.42, w: 0.06 },
      { t: 0.42, h: 1.0, w: 0.11 },
      { t: 0.55, h: 0.38, w: 0.07 },
      { t: 0.66, h: 0.82, w: 0.1 },
      { t: 0.78, h: 0.5, w: 0.07 },
      { t: 0.9, h: 0.68, w: 0.09 },
    ];
    for (const s of range) {
      const d = Math.abs(t - s.t) / s.w;
      if (d < 1) {
        // Sharp ridgeline falloff (LA chaparral peaks, not blobs)
        const fall = Math.pow(1 - d, 1.65);
        jagged += s.h * fall;
      }
    }
    // Long connecting slopes between peaks
    jagged +=
      0.18 *
      Math.max(
        0,
        Math.sin(t * Math.PI * 1.15) * 0.5 + Math.sin(t * Math.PI * 2.4 + 0.6) * 0.35,
      );
    jagged *= teeth * amplitude;
  }
  // Crossing swell – phase via warp so neighboring layers weave past each other
  const weave =
    swell *
    amplitude *
    (Math.sin(t * Math.PI * 1.15 + warp) * 0.7 +
      Math.sin(t * Math.PI * 2.3 + warp * 1.8) * 0.35);
  return floor - leftRise - rightRise + tiltDrop - knoll - peak - jagged + weave;
}

export function ridgePoints(rng: Rng, spec: RidgeSpec): Point[] {
  const {
    baseline,
    amplitude,
    roughness,
    width,
    height,
    valley,
    rightBias,
    knolls,
    floorT,
    tilt,
    bowlPower,
    leftWeight,
    warp,
    peakT,
    peakH,
    teeth,
    swell,
  } = spec;
  // Uneven endpoints so left/right anchors don’t match across layers
  let pts: Point[] = [
    { x: 0, y: baseline + (rng() - 0.6) * amplitude * 0.55 },
    {
      x: width,
      y: baseline + tilt * amplitude * 0.65 + (rng() - 0.35) * amplitude * 0.55,
    },
  ];

  let displace = amplitude * (0.52 + rng() * 0.28);
  for (let iter = 0; iter < roughness; iter++) {
    const next: Point[] = [pts[0]!];
    for (let i = 0; i < pts.length - 1; i++) {
      const a = pts[i]!;
      const b = pts[i + 1]!;
      // Stronger wander so silhouettes cross instead of echoing
      next.push({
        x: (a.x + b.x) / 2 + (rng() - 0.5) * displace * 0.14,
        y: (a.y + b.y) / 2 + (rng() - 0.5) * displace,
      });
      next.push(b);
    }
    pts = next;
    displace *= 0.5 + rng() * 0.04;
  }

  return pts.map((p) => ({
    x: Math.max(0, Math.min(width, p.x)),
    y: Math.min(
      height + 24,
      Math.max(
        -80,
        p.y +
          valleyOffset(
            p.x,
            width,
            valley,
            rightBias,
            amplitude,
            knolls,
            floorT,
            tilt,
            bowlPower,
            leftWeight,
            warp,
            peakT,
            peakH,
            teeth,
            swell,
          ),
      ),
    ),
  })).map((p, i, arr) => {
    // ponytail: long side-tails – never let the crest crash to the floor near edges
    const t = p.x / width;
    const edge = Math.min(t, 1 - t);
    let y = p.y;
    if (edge < 0.16) {
      const u = 1 - edge / 0.16;
      const cap = height * (0.48 + (1 - u) * 0.3);
      y = Math.min(y, cap);
    }
    // Flush endpoints to the viewport so fills never show a cut seam
    if (i === 0) {
      return {
        x: 0,
        y: Math.min(y, baseline - amplitude * 0.2, height * 0.55),
      };
    }
    if (i === arr.length - 1) {
      return {
        x: width,
        y: Math.min(
          y,
          baseline - amplitude * 0.1 + tilt * amplitude * 0.15,
          height * 0.58,
        ),
      };
    }
    return { x: p.x, y };
  });
}

export function pointsToRidgePath(
  pts: Point[],
  width: number,
  height: number,
): string {
  if (pts.length === 0) return "";
  const first = pts[0]!;
  const last = pts[pts.length - 1]!;
  // Start/end flush to edges at crest height – long tails, no mid-frame cliff-off
  let d = `M 0 ${first.y.toFixed(1)}`;
  for (let i = 1; i < pts.length - 1; i++) {
    const p = pts[i]!;
    const n = pts[i + 1]!;
    const ex = (p.x + n.x) / 2;
    const ey = (p.y + n.y) / 2;
    d += ` Q ${p.x.toFixed(1)} ${p.y.toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)}`;
  }
  d += ` L ${width} ${last.y.toFixed(1)}`;
  d += ` L ${width} ${height + FILL_EXTENT} L 0 ${height + FILL_EXTENT} Z`;
  return d;
}

export function pointsToContourPath(pts: Point[], inset = 6): string {
  if (pts.length < 2) return "";
  const first = pts[0]!;
  let d = `M ${first.x.toFixed(1)} ${(first.y + inset).toFixed(1)}`;
  for (let i = 1; i < pts.length - 1; i++) {
    const p = pts[i]!;
    const n = pts[i + 1]!;
    const ex = (p.x + n.x) / 2;
    const ey = (p.y + n.y) / 2 + inset;
    d += ` Q ${p.x.toFixed(1)} ${(p.y + inset).toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)}`;
  }
  const last = pts[pts.length - 1]!;
  d += ` L ${last.x.toFixed(1)} ${(last.y + inset).toFixed(1)}`;
  return d;
}

export function ridgePath(rng: Rng, spec: RidgeSpec): string {
  return pointsToRidgePath(ridgePoints(rng, spec), spec.width, spec.height);
}

/** Vegetation LOD by ridge depth. */
export type VegKind = "scrub" | "dot" | "oak" | "near";

export function vegKindForDepth(depthIndex: number): VegKind {
  if (depthIndex <= 1) return "scrub"; // unused when density=0 on jagged/Fuji
  if (depthIndex <= 3) return "scrub";
  return "oak";
}

/** Metrics for Claremont oak acceptance checks. */
export type OakMetrics = {
  totalH: number;
  trunkH: number;
  canopyW: number;
  canopyH: number;
  /** Ground → lowest canopy lobe (empty air under hem). */
  gapH: number;
  /** Width of foliage in the top 20% of the canopy (broad = not pointed). */
  tipSpan: number;
};

/**
 * Noise-warped leaf lobe – lens profile with radius jitter.
 */
function leafBlob(
  rng: Rng,
  cx: number,
  cy: number,
  len: number,
  wid: number,
  ang: number,
): { path: string; minX: number; maxX: number; minY: number; maxY: number } {
  const reso = 10;
  const ns: number[] = [];
  for (let i = 0; i <= reso; i++) ns.push(0.72 + rng() * 0.36);
  ns[0] = ns[reso] = (ns[0]! + ns[reso]!) / 2;

  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;
  const pts: string[] = [];
  for (let i = 0; i <= reso; i++) {
    const p = (i / reso) * 2;
    const xo = len / 2 - Math.abs(p - 1) * len;
    const s =
      p <= 1
        ? Math.pow(Math.sin(p * Math.PI), 0.5)
        : -Math.pow(Math.sin((p + 1) * Math.PI), 0.5);
    const yo = (s * wid) / 2;
    const a = Math.atan2(yo, xo);
    const l = Math.hypot(xo, yo) * ns[i]!;
    const px = cx + Math.cos(a + ang) * l;
    const py = cy + Math.sin(a + ang) * l;
    minX = Math.min(minX, px);
    maxX = Math.max(maxX, px);
    minY = Math.min(minY, py);
    maxY = Math.max(maxY, py);
    pts.push(`${px.toFixed(1)} ${py.toFixed(1)}`);
  }
  return { path: `M ${pts.join(" L ")} Z`, minX, maxX, minY, maxY };
}

function trunkWedge(
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  w0: number,
  w1: number,
): string {
  const dx = x1 - x0;
  const dy = y1 - y0;
  const len = Math.hypot(dx, dy) || 1;
  const nx = -dy / len;
  const ny = dx / len;
  return [
    `M ${(x0 + nx * w0).toFixed(1)} ${(y0 + ny * w0).toFixed(1)}`,
    `L ${(x1 + nx * w1).toFixed(1)} ${(y1 + ny * w1).toFixed(1)}`,
    `L ${(x1 - nx * w1).toFixed(1)} ${(y1 - ny * w1).toFixed(1)}`,
    `L ${(x0 - nx * w0).toFixed(1)} ${(y0 - ny * w0).toFixed(1)}`,
    `Z`,
  ].join(" ");
}

/**
 * Chaparral scrub – low overlapping mounds along the crest, no trunks.
 */
export function scrubPath(
  rng: Rng,
  x: number,
  groundY: number,
  scale: number,
): string {
  const parts: string[] = [];
  const n = 4 + Math.floor(rng() * 4);
  const baseW = (14 + rng() * 12) * scale;
  for (let i = 0; i < n; i++) {
    const ox = (i - (n - 1) / 2) * baseW * 0.32 + (rng() - 0.5) * baseW * 0.18;
    const w = baseW * (0.4 + rng() * 0.6);
    const h = w * (0.2 + rng() * 0.18); // height ≪ width
    const cy = groundY - h * (0.4 + rng() * 0.25);
    parts.push(
      leafBlob(rng, x + ox, cy, w, h * 2, -Math.PI / 2 + (rng() - 0.5) * 0.35)
        .path,
    );
  }
  return parts.join(" ");
}

/**
 * Tiny distant oak – stub trunk + 3–4 lobe cloud (no limb skeleton).
 */
function oakDot(
  rng: Rng,
  x: number,
  groundY: number,
  scale: number,
): { path: string; metrics: OakMetrics } {
  const totalH = (12 + rng() * 4) * scale;
  const trunkH = totalH * 0.22;
  const canopyH = totalH * 0.55;
  const canopyW = canopyH * (1.3 + rng() * 0.3);
  const gapH = totalH * 0.2;
  const canopyBottom = groundY - gapH;
  const canopyTop = canopyBottom - canopyH;
  const cx = x + (rng() - 0.5) * scale;
  const cy = (canopyTop + canopyBottom) / 2;
  const baseW = 1.1 * scale;

  const lobes: string[] = [];
  let cMinX = Infinity;
  let cMaxX = -Infinity;
  let cMinY = Infinity;
  let cMaxY = -Infinity;
  const tipXs: number[] = [];
  const tipCut = canopyTop + canopyH * 0.2;

  const n = 3 + Math.floor(rng() * 2);
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 + rng() * 0.4;
    const r = 0.35 + rng() * 0.55;
    const blob = leafBlob(
      rng,
      cx + Math.cos(a) * (canopyW / 2) * r,
      cy + Math.sin(a) * (canopyH / 2) * r,
      3.2 * scale * (0.7 + rng() * 0.5),
      2.2 * scale * (0.6 + rng() * 0.4),
      a + Math.PI / 2,
    );
    lobes.push(blob.path);
    cMinX = Math.min(cMinX, blob.minX);
    cMaxX = Math.max(cMaxX, blob.maxX);
    cMinY = Math.min(cMinY, blob.minY);
    cMaxY = Math.max(cMaxY, blob.maxY);
    if (blob.minY < tipCut) tipXs.push(blob.minX, blob.maxX);
  }

  const wood = trunkWedge(
    x,
    groundY,
    cx,
    canopyBottom - canopyH * 0.1,
    baseW,
    baseW * 0.45,
  );
  const measCanopyW = cMaxX - cMinX;
  const measCanopyH = cMaxY - cMinY;
  return {
    path: `${lobes.join(" ")} ${wood}`,
    metrics: {
      totalH: groundY - cMinY,
      trunkH,
      canopyW: measCanopyW,
      canopyH: measCanopyH,
      gapH: groundY - cMaxY,
      tipSpan:
        tipXs.length >= 2
          ? Math.max(...tipXs) - Math.min(...tipXs)
          : measCanopyW * 0.5,
    },
  };
}

/**
 * Coast live oak – bole → limb skeleton → leaf clusters at branch tips.
 * Wood is drawn as tapering wedges so trunks/branches read under the canopy gap.
 * `dot` is a far LOD stub (no limbs) – see oakDot.
 */
export function buildOak(
  rng: Rng,
  x: number,
  groundY: number,
  scale: number,
  kind: "oak" | "near" | "dot",
): { path: string; metrics: OakMetrics } {
  if (kind === "dot") return oakDot(rng, x, groundY, scale);

  const hMul = 0.85 + rng() * 0.3;
  const totalH = (kind === "near" ? 44 : 34) * scale * hMul;
  // Bole only – limbs are separate and carry into the crown
  const trunkH = totalH * (0.17 + rng() * 0.06); // 17–23% ≤ 30%
  const canopyH = totalH * (0.5 + rng() * 0.08);
  const canopyW = canopyH * (1.35 + rng() * 0.4);
  const lean = (rng() - 0.5) * totalH * (kind === "near" ? 0.1 : 0.06);
  const gapH = totalH * (0.2 + rng() * 0.05); // air under hem
  const canopyBottom = groundY - gapH;
  const canopyTop = canopyBottom - canopyH;
  const cx = x + lean * 0.45;
  const cy = (canopyTop + canopyBottom) / 2;

  const baseW =
    (kind === "near" ? 3.8 : 2.6) * scale * (0.9 + rng() * 0.25);
  const boleTopW = baseW * 0.55;
  const boleTopX = x + lean * 0.7;
  const boleTopY = groundY - trunkH;

  type Limb = {
    x0: number;
    y0: number;
    x1: number;
    y1: number;
    w0: number;
    w1: number;
  };
  const wood: Limb[] = [];
  // Main bole
  wood.push({
    x0: x,
    y0: groundY,
    x1: boleTopX,
    y1: boleTopY,
    w0: baseW,
    w1: boleTopW,
  });

  // Target tips on the canopy ellipse – each gets a limb from the bole/fork
  const nPrimary =
    kind === "near" ? 5 + Math.floor(rng() * 2) : 4 + Math.floor(rng() * 2);
  const tips: Point[] = [];
  // Forced crown anchors so the top reads as a broad cloud, not a point
  tips.push(
    { x: cx - canopyW * 0.32, y: canopyTop + canopyH * 0.22 },
    { x: cx + canopyW * 0.32, y: canopyTop + canopyH * 0.22 },
    { x: cx, y: canopyTop + canopyH * 0.12 },
  );
  for (let i = 3; i < nPrimary; i++) {
    const a = -Math.PI * 0.05 + ((i - 3) / Math.max(1, nPrimary - 4)) * Math.PI * 1.1 + (rng() - 0.5) * 0.2;
    const r = 0.55 + rng() * 0.4;
    tips.push({
      x: cx + Math.cos(a) * (canopyW / 2) * r,
      y: cy + Math.sin(a) * (canopyH / 2) * r,
    });
  }

  // Optional multi-stem: split bole into two leaders before primaries
  const leaders: { x: number; y: number; w: number }[] = [];
  const multiStem = kind === "near" ? rng() < 0.55 : rng() < 0.3;
  if (multiStem) {
    const splitY = boleTopY + trunkH * 0.15;
    const splitX = x + lean * 0.4;
    // shorten bole to split, then two leaders
    wood[0]!.x1 = splitX;
    wood[0]!.y1 = splitY;
    wood[0]!.w1 = baseW * 0.65;
    for (const side of [-1, 1] as const) {
      const lx = boleTopX + side * baseW * (0.8 + rng() * 0.6);
      const ly = boleTopY - trunkH * (0.05 + rng() * 0.08);
      const lw = boleTopW * (0.7 + rng() * 0.15);
      wood.push({
        x0: splitX,
        y0: splitY,
        x1: lx,
        y1: ly,
        w0: baseW * 0.55,
        w1: lw,
      });
      leaders.push({ x: lx, y: ly, w: lw });
    }
  } else {
    leaders.push({ x: boleTopX, y: boleTopY, w: boleTopW });
  }

  // Primary limbs: each tip attaches to nearest leader
  const primaryLimbs: Limb[] = [];
  for (const tip of tips) {
    let best = leaders[0]!;
    let bestD = Infinity;
    for (const L of leaders) {
      const d = Math.hypot(tip.x - L.x, tip.y - L.y);
      if (d < bestD) {
        bestD = d;
        best = L;
      }
    }
    const w0 = best.w * (0.55 + rng() * 0.2);
    const limb: Limb = {
      x0: best.x,
      y0: best.y,
      x1: tip.x,
      y1: tip.y,
      w0,
      w1: w0 * (0.25 + rng() * 0.15),
    };
    wood.push(limb);
    primaryLimbs.push(limb);
  }

  // Secondary twigs off primaries (reach more leaf sites)
  const twigTips: Point[] = [];
  const twigsPer = 2;
  for (let i = 0; i < primaryLimbs.length; i++) {
    for (let k = 0; k < twigsPer; k++) {
      const parent = primaryLimbs[i]!;
      const t = 0.35 + rng() * 0.5;
      const px = parent.x0 + (parent.x1 - parent.x0) * t;
      const py = parent.y0 + (parent.y1 - parent.y0) * t;
      const ang = Math.atan2(parent.y1 - parent.y0, parent.x1 - parent.x0);
      const flare = (k % 2 === 0 ? -1 : 1) * (0.35 + rng() * 0.65);
      const len =
        Math.hypot(parent.x1 - parent.x0, parent.y1 - parent.y0) *
        (0.3 + rng() * 0.4);
      const tx = px + Math.cos(ang + flare) * len;
      const ty = py + Math.sin(ang + flare) * len;
      const w0 = parent.w0 * (0.3 + rng() * 0.2);
      wood.push({
        x0: px,
        y0: py,
        x1: tx,
        y1: ty,
        w0,
        w1: w0 * 0.35,
      });
      twigTips.push({ x: tx, y: ty });
    }
  }

  // Leaf clusters at every tip – dense enough to read as a cloud, not a skeleton
  const lobes: string[] = [];
  let cMinX = Infinity;
  let cMaxX = -Infinity;
  let cMinY = Infinity;
  let cMaxY = -Infinity;
  const tipXs: number[] = [];
  const tipCut = canopyTop + canopyH * 0.2;
  const lobeScale = 6.2 * scale;

  const pushLobe = (lx: number, ly: number, len: number, wid: number, ang: number) => {
    const blob = leafBlob(rng, lx, ly, len, wid, ang);
    lobes.push(blob.path);
    cMinX = Math.min(cMinX, blob.minX);
    cMaxX = Math.max(cMaxX, blob.maxX);
    cMinY = Math.min(cMinY, blob.minY);
    cMaxY = Math.max(cMaxY, blob.maxY);
    if (blob.minY < tipCut) tipXs.push(blob.minX, blob.maxX);
  };

  const leafSites = [...tips, ...twigTips];
  for (const tip of leafSites) {
    const cluster = 4 + Math.floor(rng() * 3);
    for (let j = 0; j < cluster; j++) {
      const ox = (rng() - 0.5) * lobeScale * 1.1;
      const oy = (rng() - 0.5) * lobeScale * 0.85;
      const len = lobeScale * (0.55 + rng() * 0.6);
      const wid = len * (0.45 + rng() * 0.4);
      const ang = Math.atan2(oy || -1, ox || 1) + (rng() - 0.5) * 0.6;
      pushLobe(tip.x + ox, tip.y + oy, len, wid, ang);
    }
  }
  // Mid-limb tufts so primaries aren’t bare sticks through the crown
  for (const limb of primaryLimbs) {
    const tufts = 1 + Math.floor(rng() * 2);
    for (let t = 0; t < tufts; t++) {
      const u = 0.35 + rng() * 0.45;
      pushLobe(
        limb.x0 + (limb.x1 - limb.x0) * u + (rng() - 0.5) * lobeScale * 0.3,
        limb.y0 + (limb.y1 - limb.y0) * u + (rng() - 0.5) * lobeScale * 0.25,
        lobeScale * (0.45 + rng() * 0.4),
        lobeScale * (0.3 + rng() * 0.25),
        rng() * Math.PI * 2,
      );
    }
  }
  // Pack the crown ellipse so gaps close into one oak mass
  const fillN = kind === "near" ? 14 : 10;
  for (let i = 0; i < fillN; i++) {
    const a = rng() * Math.PI * 2;
    const r = Math.sqrt(rng()) * 0.85;
    pushLobe(
      cx + Math.cos(a) * (canopyW / 2) * r,
      cy + Math.sin(a) * (canopyH / 2) * r,
      lobeScale * (0.55 + rng() * 0.45),
      lobeScale * (0.35 + rng() * 0.3),
      a + Math.PI / 2 + (rng() - 0.5) * 0.4,
    );
  }

  const woodPaths = wood.map((L) =>
    trunkWedge(L.x0, L.y0, L.x1, L.y1, L.w0, L.w1),
  );

  const measCanopyW = cMaxX - cMinX;
  const measCanopyH = cMaxY - cMinY;
  const measGap = groundY - cMaxY;
  const measTotal = groundY - cMinY;
  const tipSpan =
    tipXs.length >= 2
      ? Math.max(...tipXs) - Math.min(...tipXs)
      : measCanopyW * 0.5;

  return {
    // Leaves under wood so bole/limbs stay readable in the under-canopy gap
    path: `${lobes.join(" ")} ${woodPaths.join(" ")}`,
    metrics: {
      totalH: measTotal,
      trunkH,
      canopyW: measCanopyW,
      canopyH: measCanopyH,
      gapH: measGap,
      tipSpan,
    },
  };
}

/** Path-only oak / hero tree (for frames + forest). */
export function treePath(
  rng: Rng,
  x: number,
  groundY: number,
  scale: number,
  kind: "oak" | "near" | "dot" = "oak",
): string {
  return buildOak(rng, x, groundY, scale, kind).path;
}

export type ForestOpts = {
  density: number;
  scale: number;
  depthIndex: number;
  floorBias: number;
  viewHeight: number;
};

/**
 * Place Claremont vegetation along a ridge – scrub far, sparse oak groves nearer.
 */
export function forestBand(
  rng: Rng,
  ridge: Point[],
  opts: ForestOpts,
): string {
  if (ridge.length < 2 || opts.density <= 0) return "";
  const kind = vegKindForDepth(opts.depthIndex);
  const count = Math.floor(ridge.length * opts.density);
  const parts: string[] = [];
  let lastX = -1e9;
  // Oaks need ~canopy-width gaps; scrub can pack tighter
  const minGap =
    kind === "scrub"
      ? 3 + opts.scale * 4
      : kind === "dot"
        ? 8 + opts.scale * 12
        : 10 + opts.scale * 16;

  for (let i = 0; i < count; i++) {
    const t = rng();
    const edge = Math.abs(t - 0.5) * 2;
    // Scrub blankets the crest; oaks bias to shoulders / keep valley open
    const keep =
      kind === "scrub"
        ? rng() < 0.85
        : opts.floorBias > 0.5
          ? rng() < 1 - edge * (opts.floorBias - 0.05)
          : rng() < edge * (1.15 - opts.floorBias) + 0.12;
    if (!keep) continue;

    const idx = Math.min(
      ridge.length - 2,
      Math.floor(t * (ridge.length - 1)),
    );
    const a = ridge[idx]!;
    const b = ridge[idx + 1]!;
    const u = rng();
    const x = a.x + (b.x - a.x) * u;
    const y = a.y + (b.y - a.y) * u;
    if (y > opts.viewHeight - 16 || y < opts.viewHeight * 0.2) continue;

    if (Math.abs(x - lastX) < minGap) continue;
    lastX = x;

    const scale = opts.scale * (0.75 + rng() * 0.5);
    if (kind === "scrub") {
      parts.push(scrubPath(rng, x, y + 1, scale));
    } else if (kind === "dot") {
      parts.push(treePath(rng, x, y + 1, scale, "dot"));
    } else if (kind === "near") {
      parts.push(treePath(rng, x, y + 1, scale, "near"));
    } else {
      parts.push(treePath(rng, x, y + 1, scale, "oak"));
    }
  }

  return parts.join(" ");
}

/**
 * Compact left near-frame cliff – close-up scale, big lip oaks.
 */
export function leftNearFrame(
  rng: Rng,
  width: number,
  height: number,
): { rock: string; trees: string } {
  const crestX = width * (0.18 + rng() * 0.03);
  const topY = height * (0.28 + rng() * 0.04);
  const midY = height * (0.55 + rng() * 0.03);
  const baseX = width * (0.08 + rng() * 0.03);

  let face: Point[] = [
    { x: crestX, y: topY },
    { x: crestX + width * 0.025, y: midY },
    { x: baseX, y: height },
  ];
  let displace = width * 0.035;
  for (let iter = 0; iter < 5; iter++) {
    const next: Point[] = [face[0]!];
    for (let i = 0; i < face.length - 1; i++) {
      const a = face[i]!;
      const b = face[i + 1]!;
      next.push({
        x: (a.x + b.x) / 2 + (rng() - 0.35) * displace,
        y: (a.y + b.y) / 2 + (rng() - 0.5) * displace * 0.3,
      });
      next.push(b);
    }
    face = next;
    displace *= 0.5;
  }

  let crest: Point[] = [
    { x: 0, y: topY + height * 0.03 },
    { x: crestX * 0.5, y: topY - height * 0.015 },
    { x: crestX, y: topY },
  ];
  displace = height * 0.02;
  for (let iter = 0; iter < 4; iter++) {
    const next: Point[] = [crest[0]!];
    for (let i = 0; i < crest.length - 1; i++) {
      const a = crest[i]!;
      const b = crest[i + 1]!;
      next.push({
        x: (a.x + b.x) / 2,
        y: (a.y + b.y) / 2 + (rng() - 0.5) * displace,
      });
      next.push(b);
    }
    crest = next;
    displace *= 0.52;
  }

  const first = crest[0]!;
  const deep = height + FILL_EXTENT;
  let rock = `M 0 ${deep} L 0 ${first.y.toFixed(1)}`;
  for (let i = 1; i < crest.length - 1; i++) {
    const p = crest[i]!;
    const n = crest[i + 1]!;
    rock += ` Q ${p.x.toFixed(1)} ${p.y.toFixed(1)} ${((p.x + n.x) / 2).toFixed(1)} ${((p.y + n.y) / 2).toFixed(1)}`;
  }
  rock += ` L ${crest[crest.length - 1]!.x.toFixed(1)} ${crest[crest.length - 1]!.y.toFixed(1)}`;
  for (let i = 1; i < face.length - 1; i++) {
    const p = face[i]!;
    const n = face[i + 1]!;
    rock += ` Q ${p.x.toFixed(1)} ${p.y.toFixed(1)} ${((p.x + n.x) / 2).toFixed(1)} ${((p.y + n.y) / 2).toFixed(1)}`;
  }
  const last = face[face.length - 1]!;
  rock += ` L ${last.x.toFixed(1)} ${deep} Z`;

  // Huge close-up oaks on the lip – sell near-plane scale
  const treeParts: string[] = [];
  const nTrees = 3 + Math.floor(rng() * 2); // 3–4 hero oaks on the lip
  for (let i = 0; i < nTrees; i++) {
    const u = 0.12 + (i / Math.max(1, nTrees - 1)) * 0.6 + rng() * 0.05;
    const idx = Math.min(crest.length - 1, Math.floor(u * (crest.length - 1)));
    const p = crest[idx]!;
    treeParts.push(treePath(rng, p.x + 8, p.y + 6, 4.8 + rng() * 1.5, "near"));
  }

  return { rock, trees: treeParts.join(" ") };
}

/**
 * Right near-frame – soft slope away to the edge (invite-in, not a jagged boulder).
 */
export function rightNearFrame(
  rng: Rng,
  width: number,
  height: number,
): { rock: string; trees: string } {
  const deep = height + FILL_EXTENT;
  const topY = height * (0.55 + rng() * 0.04);
  const midY = height * (0.72 + rng() * 0.03);

  // Few control points, mild displace – reads as a rounded bank
  let face: Point[] = [
    { x: width, y: topY },
    { x: width * (0.93 + rng() * 0.02), y: topY + height * 0.06 },
    { x: width * (0.87 + rng() * 0.02), y: midY },
    { x: width * (0.91 + rng() * 0.02), y: deep },
  ];
  let displace = width * 0.012;
  for (let iter = 0; iter < 3; iter++) {
    const next: Point[] = [face[0]!];
    for (let i = 0; i < face.length - 1; i++) {
      const a = face[i]!;
      const b = face[i + 1]!;
      next.push({
        x: (a.x + b.x) / 2 + (rng() - 0.25) * displace * 0.5,
        y: (a.y + b.y) / 2 + (rng() - 0.5) * displace * 0.2,
      });
      next.push(b);
    }
    face = next;
    displace *= 0.5;
  }

  let rock = `M ${width} ${deep}`;
  rock += ` L ${width} ${face[0]!.y.toFixed(1)}`;
  for (let i = 1; i < face.length - 1; i++) {
    const p = face[i]!;
    const n = face[i + 1]!;
    rock += ` Q ${p.x.toFixed(1)} ${p.y.toFixed(1)} ${((p.x + n.x) / 2).toFixed(1)} ${((p.y + n.y) / 2).toFixed(1)}`;
  }
  const last = face[face.length - 1]!;
  rock += ` L ${last.x.toFixed(1)} ${last.y.toFixed(1)} Z`;

  const treeParts: string[] = [];
  const nTrees = 2 + Math.floor(rng() * 2); // 2–3 oaks on the bank
  for (let i = 0; i < nTrees; i++) {
    const idx = Math.min(
      face.length - 2,
      1 + Math.floor((i / nTrees) * (face.length - 3)),
    );
    const p = face[idx]!;
    treeParts.push(
      treePath(rng, p.x - 4, Math.min(height - 8, p.y + 8), 2.4 + rng() * 0.8, "near"),
    );
  }

  return { rock, trees: treeParts.join(" ") };
}

/**
 * Full-width near-plane lip – deep V so the page body tucks into the notch.
 */
export function nearGroundLip(
  rng: Rng,
  width: number,
  height: number,
): string {
  const shoulder = height * (0.72 + rng() * 0.03);
  const floor = height * (0.92 + rng() * 0.03); // deep center notch
  let crest: Point[] = [
    { x: 0, y: shoulder + height * 0.02 },
    { x: width * 0.18, y: shoulder - height * 0.015 },
    { x: width * 0.34, y: shoulder + height * 0.06 },
    { x: width * 0.5, y: floor },
    { x: width * 0.66, y: shoulder + height * 0.06 },
    { x: width * 0.82, y: shoulder - height * 0.01 },
    { x: width, y: shoulder + height * 0.025 },
  ];
  let displace = height * 0.018;
  for (let iter = 0; iter < 4; iter++) {
    const next: Point[] = [crest[0]!];
    for (let i = 0; i < crest.length - 1; i++) {
      const a = crest[i]!;
      const b = crest[i + 1]!;
      // Keep the V tip stable; jitter only the flanks
      const atTip = a.x > width * 0.42 && b.x < width * 0.58;
      next.push({
        x: (a.x + b.x) / 2,
        y: (a.y + b.y) / 2 + (atTip ? 0 : (rng() - 0.5) * displace),
      });
      next.push(b);
    }
    crest = next;
    displace *= 0.5;
  }

  let d = `M 0 ${height + FILL_EXTENT} L 0 ${crest[0]!.y.toFixed(1)}`;
  for (let i = 1; i < crest.length - 1; i++) {
    const p = crest[i]!;
    const n = crest[i + 1]!;
    d += ` Q ${p.x.toFixed(1)} ${p.y.toFixed(1)} ${((p.x + n.x) / 2).toFixed(1)} ${((p.y + n.y) / 2).toFixed(1)}`;
  }
  const last = crest[crest.length - 1]!;
  d += ` L ${last.x.toFixed(1)} ${last.y.toFixed(1)} L ${width} ${height + FILL_EXTENT} Z`;
  return d;
}

// Distinct characters that still weave – each layer keeps a readable silhouette + long edge tails
const LAYER_SPECS: Omit<RidgeSpec, "width" | "height">[] = [
  // Farthest: LA mountains – distinct peaks/saddles, near the sun
  {
    baseline: 395,
    amplitude: 58,
    roughness: 5,
    valley: 0.04,
    rightBias: 0.1,
    knolls: 0.06,
    floorT: 0.5,
    tilt: 0.06,
    bowlPower: 1.02,
    leftWeight: 0.55,
    warp: 0.5,
    peakT: 0,
    peakH: 0,
    teeth: 1.2,
    swell: 0,
  },
  // Fuji: cone on the right, left flank falls hard into the valley
  {
    baseline: 490,
    amplitude: 48,
    roughness: 6,
    valley: 0.85,
    rightBias: 0.08,
    knolls: 0.08,
    floorT: 0.28,
    tilt: -0.15,
    bowlPower: 1.2,
    leftWeight: 0.08,
    warp: 0.7,
    peakT: 0.86,
    peakH: 3.15,
    teeth: 0,
    swell: 0.04,
  },
  // Mid-far: short apron under Fuji – stays low so the cone reads
  {
    baseline: 520,
    amplitude: 48,
    roughness: 7,
    valley: 0.55,
    rightBias: 0.15,
    knolls: 0.22,
    floorT: 0.55,
    tilt: 0.2,
    bowlPower: 1.25,
    leftWeight: 1.1,
    warp: 0.7,
    peakT: 0,
    peakH: 0,
    teeth: 0,
    swell: 0.2,
  },
  // Mid: lower valley ridge (was climbing over Fuji) – stays in the lower half
  {
    baseline: 600,
    amplitude: 70,
    roughness: 7,
    valley: 0.7,
    rightBias: 0.55,
    knolls: 0.28,
    floorT: 0.4,
    tilt: -0.12,
    bowlPower: 1.25,
    leftWeight: 0.7,
    warp: 2.6,
    peakT: 0,
    peakH: 0,
    teeth: 0,
    swell: 0.25,
  },
  // Mid-near: rolling center valley – sit clearly below mid (was stacked on 600)
  {
    baseline: 660,
    amplitude: 88,
    roughness: 7,
    valley: 0.95,
    rightBias: 0.28,
    knolls: 0.38,
    floorT: 0.5,
    tilt: 0.18,
    bowlPower: 1.35,
    leftWeight: 1.2,
    warp: 4.8,
    peakT: 0,
    peakH: 0,
    teeth: 0,
    swell: 0.4,
  },
  // Near-mid: tall right rise, soft left
  {
    baseline: 730,
    amplitude: 95,
    roughness: 7,
    valley: 0.8,
    rightBias: 0.75,
    knolls: 0.4,
    floorT: 0.4,
    tilt: -0.22,
    bowlPower: 1.3,
    leftWeight: 0.75,
    warp: 1.4,
    peakT: 0,
    peakH: 0,
    teeth: 0,
    swell: 0.32,
  },
  // Near: strong left frame shoulder, long right tail
  {
    baseline: 800,
    amplitude: 105,
    roughness: 7,
    valley: 1.05,
    rightBias: 0.18,
    knolls: 0.2,
    floorT: 0.5,
    tilt: 0.2,
    bowlPower: 1.4,
    leftWeight: 1.55,
    warp: 3.6,
    peakT: 0,
    peakH: 0,
    teeth: 0,
    swell: 0.25,
  },
];

// Far almost pinned; near layers haul much harder – strong relative parallax
const LAYER_DEPTHS = [0.072, 0.14, 0.32, 0.55, 0.9, 1.4, 1.95];
const LAYER_OPACITY = [1, 1, 1, 1, 1, 1, 1];

/** Far: no veg on jagged/Fuji. Then heavy chaparral → dots → oaks. */
const FOREST_OPTS: Omit<ForestOpts, "depthIndex" | "viewHeight">[] = [
  { density: 0, scale: 0.45, floorBias: 0.2 }, // L0 jagged – bare
  { density: 0, scale: 0.55, floorBias: 0.25 }, // L1 Fuji – bare
  { density: 0.95, scale: 0.65, floorBias: 0.2 }, // L2 heavy chaparral
  { density: 0.7, scale: 0.75, floorBias: 0.3 }, // L3 more scrub
  { density: 0.4, scale: 1.0, floorBias: 0.75 }, // L4 full oaks
  { density: 0.35, scale: 1.6, floorBias: 0.5 },
  { density: 0.28, scale: 2.2, floorBias: 0.35 },
];

export function generateVista(
  seed: number = DEFAULT_VISTA_SEED,
  width = VISTA_WIDTH,
  height = VISTA_HEIGHT,
): VistaScene {
  const rng = mulberry32(seed);
  // Sun mid-sky; far range authored to sit just under it
  const sunCy = height * 0.355;
  const sun = { cx: width * 0.5, cy: sunCy, depth: LAYER_DEPTHS[1]! };

  const layers: VistaLayer[] = LAYER_SPECS.map((spec, i) => {
    const full: RidgeSpec = { ...spec, width, height };
    const pts = ridgePoints(rng, full);
    const forest = forestBand(rng, pts, {
      ...FOREST_OPTS[i]!,
      depthIndex: i,
      viewHeight: height,
    });
    const contour = i >= 3 ? pointsToContourPath(pts, 3 + i) : null;
    return {
      ridge: pointsToRidgePath(pts, width, height),
      contour,
      forest: forest || null,
      depth: LAYER_DEPTHS[i]!,
      fillVar: `vista-ridge-${i + 1}`,
      opacity: LAYER_OPACITY[i]!,
    };
  });

  const stars: Point[] = [];
  for (let i = 0; i < 28; i++) {
    stars.push({
      x: rng() * width,
      y: rng() * height * 0.35,
    });
  }

  const clouds: CloudBlob[] = [0.18, 0.62, 0.84].map((baseX) => {
    const cx = width * (baseX + (rng() - 0.5) * 0.05);
    // Keep clouds off the sun bowl
    const cy = height * (0.08 + rng() * 0.06);
    const n = 3 + Math.floor(rng() * 2);
    const parts = Array.from({ length: n }, () => ({
      dx: (rng() - 0.5) * 80,
      dy: (rng() - 0.5) * 14,
      rx: 50 + rng() * 60,
      ry: 10 + rng() * 12,
    }));
    return { cx, cy, parts };
  });

  const left = leftNearFrame(rng, width, height);
  const right = rightNearFrame(rng, width, height);
  const leftFrame = {
    path: left.rock,
    trees: left.trees || null,
    // Closest plane – hardest parallax haul
    depth: 2.4,
    fillVar: "vista-shadow",
  };
  const rightFrame = {
    path: right.rock,
    trees: right.trees || null,
    depth: 2.4,
    fillVar: "vista-shadow",
  };

  return {
    seed,
    width,
    height,
    layers,
    stars,
    clouds,
    leftFrame,
    rightFrame,
    nearGround: nearGroundLip(rng, width, height),
    sun,
  };
}

export function sampleRidgeYs(pts: Point[]): {
  left: number;
  centerLeft: number;
  center: number;
  right: number;
} {
  if (pts.length === 0)
    return { left: 0, centerLeft: 0, center: 0, right: 0 };
  const w = pts[pts.length - 1]!.x - pts[0]!.x || 1;
  const at = (frac: number) => {
    const target = pts[0]!.x + w * frac;
    let best = pts[0]!;
    let bestD = Infinity;
    for (const p of pts) {
      const d = Math.abs(p.x - target);
      if (d < bestD) {
        bestD = d;
        best = p;
      }
    }
    return best.y;
  };
  return {
    left: at(0.08),
    centerLeft: at(0.28),
    center: at(0.5),
    right: at(0.92),
  };
}

export function pathYs(d: string): number[] {
  const ys: number[] = [];
  const re =
    /(?:M|L)\s*[-\d.]+\s+([-\d.]+)|Q\s*[-\d.]+\s+[-\d.]+\s+[-\d.]+\s+([-\d.]+)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(d)) !== null) {
    ys.push(Number(m[1] ?? m[2]));
  }
  return ys;
}
