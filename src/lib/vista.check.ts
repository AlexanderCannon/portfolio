/**
 * Runnable check for the vista generator.
 * Run: npx tsx src/lib/vista.check.ts
 */
import assert from "node:assert/strict";
import {
  DEFAULT_VISTA_SEED,
  FILL_EXTENT,
  buildOak,
  generateVista,
  mulberry32,
  pathYs,
  ridgePoints,
  sampleRidgeYs,
  scrubPath,
  vegKindForDepth,
  VISTA_HEIGHT,
  VISTA_WIDTH,
} from "./vista";

const a = generateVista(DEFAULT_VISTA_SEED);
const b = generateVista(DEFAULT_VISTA_SEED);
const c = generateVista(DEFAULT_VISTA_SEED + 1);

assert.equal(a.layers.length, 7, "seven ridge layers");
assert.equal(a.layers[0]!.ridge, b.layers[0]!.ridge, "same seed → same ridge");
assert.notEqual(
  a.layers[0]!.ridge,
  c.layers[0]!.ridge,
  "different seed → different ridge",
);

assert.equal("tower" in a, false, "tower framing removed");
assert.equal("overhang" in a, false, "old overhang key removed");
assert.equal("river" in a, false, "river removed");
assert.ok(a.leftFrame.path.startsWith("M 0 "), "left frame on left");
assert.ok(a.leftFrame.trees, "left frame has close-up trees");
assert.ok(a.rightFrame.path.length > 20, "right frame present");
assert.ok(a.rightFrame.trees, "right frame has close-up trees");
assert.ok(a.nearGround.length > 40, "near ground lip present");
assert.ok(
  a.leftFrame.depth > a.layers[6]!.depth &&
    a.rightFrame.depth === a.leftFrame.depth,
  "near frames parallax fastest (closest plane)",
);
assert.notEqual(a.leftFrame.path, c.leftFrame.path, "left frame varies");

for (const layer of a.layers) {
  const ys = pathYs(layer.ridge);
  assert.ok(ys.length > 4, "ridge has points");
  for (const y of ys) {
    assert.ok(
      y >= -160 && y <= VISTA_HEIGHT + FILL_EXTENT + 40,
      `y ${y} outside viewBox`,
    );
  }
  // Crest only (ignore the deep floor closers)
  const crest = ys.filter((y) => y < VISTA_HEIGHT);
  assert.ok(crest.length >= 2, "crest samples present");
  assert.ok(
    crest[0]! < VISTA_HEIGHT * 0.62,
    `left tail too low (${crest[0]})`,
  );
  assert.ok(
    crest[crest.length - 1]! < VISTA_HEIGHT * 0.65,
    `right tail too low (${crest[crest.length - 1]})`,
  );
  assert.ok(
    ys.some((y) => y > VISTA_HEIGHT + 200),
    "ridge fill extends deep below viewBox for parallax",
  );
}

const forested = a.layers.filter((l) => l.forest && l.forest.length > 20);
assert.ok(forested.length >= 4, "vegetation on at least 4 layers");
assert.equal(a.layers[0]!.forest, null, "jagged LA range has no trees");
assert.equal(a.layers[1]!.forest, null, "Fuji layer has no trees");
assert.ok(a.layers[2]!.forest, "chaparral/scrub starts on 3rd-far layer");
assert.ok(a.layers[4]!.forest, "mid oak grove present");
assert.ok(
  (a.layers[4]!.forest.match(/Z/g) ?? []).length >= 4,
  "oaks use canopy lobes + trunk subpaths",
);
assert.ok(
  (a.leftFrame.trees.match(/Z/g) ?? []).length >= 8,
  "close-up oaks use canopy lobes + bole + limbs",
);

// Chaparral LOD table – L0/L1 bare; scrub→dots→oaks forward
assert.equal(vegKindForDepth(2), "scrub", "L2 scrub");
assert.equal(vegKindForDepth(3), "scrub", "L3 scrub");
assert.equal(vegKindForDepth(4), "oak", "L4 full oak");
assert.equal(vegKindForDepth(5), "oak", "L5 full oak");
assert.equal(vegKindForDepth(6), "oak", "L6 full oak");

const scrubZ = (a.layers[2]!.forest.match(/Z/g) ?? []).length;
assert.ok(scrubZ >= 20, `scrub layer has dense chaparral (${scrubZ})`);
assert.ok(a.layers[3]!.forest, "second scrub band present");

// Dot oaks stay tiny – stub + few lobes, not a limb tree
const dot = buildOak(mulberry32(11), 50, 300, 0.5, "dot");
assert.ok(
  (dot.path.match(/Z/g) ?? []).length <= 8,
  `oak dots stay simple (${(dot.path.match(/Z/g) ?? []).length} subpaths)`,
);

// Claremont oak silhouette acceptance (criteria 1–4)
for (const seed of [1, 7, 42, 99]) {
  const oak = buildOak(mulberry32(seed), 100, 400, 1.2, "oak");
  const m = oak.metrics;
  assert.ok(
    m.canopyW >= m.canopyH * 1.1,
    `oak crown wider than tall (seed ${seed}: ${m.canopyW.toFixed(1)} vs ${m.canopyH.toFixed(1)})`,
  );
  assert.ok(
    m.trunkH <= m.totalH * 0.3,
    `oak trunk short (seed ${seed}: ${m.trunkH.toFixed(1)} / ${m.totalH.toFixed(1)})`,
  );
  assert.ok(
    m.gapH >= m.totalH * 0.15,
    `under-canopy gap (seed ${seed}: ${m.gapH.toFixed(1)} / ${m.totalH.toFixed(1)})`,
  );
  assert.ok(
    m.tipSpan >= m.canopyW * 0.35,
    `broad canopy top, not pointed (seed ${seed}: tip ${m.tipSpan.toFixed(1)} / w ${m.canopyW.toFixed(1)})`,
  );
  // Bole + several limbs (not a stump)
  assert.ok(
    (oak.path.match(/Z/g) ?? []).length >= 10,
    `oak has bole, limbs, and leaf clusters (seed ${seed})`,
  );
}

const nearOak = buildOak(mulberry32(3), 80, 500, 2.5, "near");
assert.ok(
  nearOak.metrics.canopyW >= nearOak.metrics.canopyH * 1.1,
  "near hero oak crown wider than tall",
);
assert.ok(
  nearOak.metrics.gapH >= nearOak.metrics.totalH * 0.15,
  "near hero has under-canopy gap",
);

// Far scrub: multi-mound chaparral lumps
const scrub = scrubPath(mulberry32(5), 50, 300, 0.5);
assert.ok((scrub.match(/Z/g) ?? []).length >= 2, "scrub is multi-mound");
assert.ok(!scrub.includes("NaN"), "scrub path sane");

const nearPts = ridgePoints(mulberry32(DEFAULT_VISTA_SEED + 99), {
  baseline: 790,
  amplitude: 120,
  roughness: 7,
  valley: 1.15,
  rightBias: 0.2,
  knolls: 0.25,
  floorT: 0.52,
  tilt: 0.25,
  bowlPower: 1.45,
  leftWeight: 1.6,
  warp: 4.0,
  peakT: 0,
  peakH: 0,
  teeth: 0,
  swell: 0.5,
  width: VISTA_WIDTH,
  height: VISTA_HEIGHT,
});
const near = sampleRidgeYs(nearPts);
assert.ok(
  near.center > near.left + 10,
  `near valley still reads as a dip (${near.center} vs ${near.left})`,
);

const fujiPts = ridgePoints(mulberry32(DEFAULT_VISTA_SEED + 3), {
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
  width: VISTA_WIDTH,
  height: VISTA_HEIGHT,
});
const midPts = ridgePoints(mulberry32(DEFAULT_VISTA_SEED + 11), {
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
  width: VISTA_WIDTH,
  height: VISTA_HEIGHT,
});
const mid = sampleRidgeYs(midPts);
const crossPts = ridgePoints(mulberry32(DEFAULT_VISTA_SEED + 13), {
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
  width: VISTA_WIDTH,
  height: VISTA_HEIGHT,
});
const cross = sampleRidgeYs(crossPts);
const jaggedPts = ridgePoints(mulberry32(DEFAULT_VISTA_SEED + 5), {
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
  width: VISTA_WIDTH,
  height: VISTA_HEIGHT,
});
const jagged = sampleRidgeYs(jaggedPts);
const fujiPeak = (() => {
  const target = VISTA_WIDTH * 0.86;
  let best = fujiPts[0]!;
  let bestD = Infinity;
  for (const p of fujiPts) {
    const d = Math.abs(p.x - target);
    if (d < bestD) {
      bestD = d;
      best = p;
    }
  }
  return best.y;
})();
const fujiBody = sampleRidgeYs(fujiPts);
const sunMid = VISTA_HEIGHT * 0.355;
assert.ok(
  fujiPeak < fujiBody.center - 70,
  `Fuji cone dominates its own ridge (${fujiPeak} vs ${fujiBody.center})`,
);
assert.ok(
  fujiPeak >= sunMid - 10,
  `Fuji tip near/under sun midline (${fujiPeak} vs ${sunMid})`,
);
assert.ok(
  jagged.center < fujiBody.center,
  `LA range sits above Fuji body (${jagged.center} vs ${fujiBody.center})`,
);
assert.ok(
  jagged.left !== jagged.center || jagged.right !== jagged.center,
  "LA range has peak/saddle variation",
);
assert.ok(
  a.layers[0]!.depth < 0.15 && a.layers[6]!.depth / a.layers[0]!.depth >= 12,
  "near layers parallax much harder than far",
);
assert.ok(a.sun.depth === a.layers[1]!.depth, "sun locked to Fuji parallax depth field");
assert.ok(
  Math.abs(a.sun.cy - sunMid) < 1,
  "sun at mid-sky resting place",
);
assert.ok(
  fujiPeak < cross.center - 20,
  `Fuji clears the lower mid ridge (${fujiPeak} vs ${cross.center})`,
);
void mid;

assert.ok(
  Math.abs(a.sun.cx - VISTA_WIDTH * 0.5) < 2,
  "sun horizontally centered",
);
assert.ok(a.sun.cy > 0 && a.sun.cy < VISTA_HEIGHT * 0.4, "sun in upper sky");

console.log("vista.check: ok");
