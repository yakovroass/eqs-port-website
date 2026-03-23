"use client";

import { motion, MotionConfig } from "framer-motion";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  LIVE_BACKGROUND_SHIP_FILES,
  SHIP_REF_SVG_CACHE,
} from "@/lib/shipGalleryItems";

/**
 * אוניות SVG מהגלריה — רשת תאים (5×4) מכסה את כל גובה הדף; כל אונייה שטה בתוך תא
 * במסלולים אלכסוניים אקראיים, עם הפרדה בין מסלולים.
 * (רקע חי בדף הבית + /bg-demos)
 */
/** סה״כ אוניות — רשת תאים (5×4=20) מחלקת את הדף באופן שווה */
const SHIP_COUNT_DESKTOP = 20;
const SHIP_COUNT_MOBILE = 20;

function shipCountForWidth(w: number) {
  return w < 768 ? SHIP_COUNT_MOBILE : SHIP_COUNT_DESKTOP;
}

/** מסך צר — התאמות מסלול (אלכסונים, מרווחים) */
function isMobileLayout(w: number) {
  return w < 768;
}

/** מהירות שיוט (px/s) — נמוך = איטי יותר */
const SHIP_SAIL_SPEED_PX_PER_SEC = 2.05;

/** הפרדה בין מסלולים — מספיק שלא יידבקו; לא דורש מרחק גדול בין כולן */
function shipPathSeparationOpts(w: number, h: number) {
  const m = Math.min(w, h);
  return {
    minSegClear: Math.max(168, m * 0.22),
    minYStretch: 1.38,
    bandYWiden: 1.22,
  } as const;
}

const DOT = 6;
/** כניסה/יציאה מחוץ למסך דרך הדפנות */
const EDGE_OFFSCREEN_PX = 4;

/** תנועה איטית */
const DURATION_MIN_SEC = 220;
const DURATION_MAX_SEC = 320;

/** נקודות צפות ב־Hero — עד 4, נראות ברורה */
const ORIGINAL_DOT_COUNT = 4;
/** נקודות איטיות מעט כי המסלולים ארוכים יותר (גובה מלא) */
const ORIGINAL_DOT_SPEED_PX_PER_SEC = 4.2;

function randomRange(a: number, b: number) {
  const lo = Math.min(a, b);
  const hi = Math.max(a, b);
  return lo + Math.random() * (hi - lo);
}

type Pt = { x: number; y: number };

type Segment = { from: Pt; to: Pt };

type Path = {
  id: string;
  from: Pt;
  to: Pt;
  duration: number;
  /** 0–1: התחלת אנימציה לא מ־from אלא לאורך המקטע (אוניות בלבד) */
  startT?: number;
};

function dist(a: Pt, b: Pt) {
  return Math.hypot(b.x - a.x, b.y - a.y);
}

/** מרווח מעבר לקצה הקונטיינר — עד שהנקודה (והזוהר) באמת “מחוץ למסך” */
const EXIT_MARGIN_PX = 24;

function isOutsideView(px: number, py: number, w: number, h: number) {
  return (
    px < -EXIT_MARGIN_PX ||
    px > w + EXIT_MARGIN_PX ||
    py < -EXIT_MARGIN_PX ||
    py > h + EXIT_MARGIN_PX
  );
}

/**
 * ממשיך את הקו מ־from דרך to באותו כיוון עד שיוצאים מהתצוגה —
 * כדי שלא תיעלם פתאום באמצע המסך כשהאנימציה נגמרת.
 */
function extendToOffScreen(from: Pt, to: Pt, w: number, h: number): Pt {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const L = Math.hypot(dx, dy);
  if (L < 1e-3) return to;
  const ux = dx / L;
  const uy = dy / L;

  if (isOutsideView(to.x, to.y, w, h)) return to;

  let x = to.x;
  let y = to.y;
  const step = 10;
  const maxTravel = (w + h + EXIT_MARGIN_PX * 4) * 2;
  let traveled = 0;
  while (!isOutsideView(x, y, w, h) && traveled < maxTravel) {
    traveled += step;
    x = to.x + ux * traveled;
    y = to.y + uy * traveled;
  }
  return { x, y };
}

/** מסלול מלא: יעד לוגי → יציאה מהמסך + הארכת זמן לפי אורך (מהירות קבועה) */
function pathWithScreenExit(
  from: Pt,
  toLogical: Pt,
  w: number,
  h: number,
  id: string,
  baseDurationSec: number,
): Path {
  const len0 = dist(from, toLogical);
  const toExit = extendToOffScreen(from, toLogical, w, h);
  const len1 = dist(from, toExit);
  const duration =
    len0 < 1e-3
      ? baseDurationSec
      : baseDurationSec * (len1 / len0);

  return {
    id,
    from,
    to: toExit,
    duration,
  };
}

function minSampleDistBetweenSegments(
  a1: Pt,
  a2: Pt,
  b1: Pt,
  b2: Pt,
  samples = 18,
): number {
  let m = Infinity;
  for (let i = 0; i <= samples; i++) {
    const t = i / samples;
    const ax = a1.x + t * (a2.x - a1.x);
    const ay = a1.y + t * (a2.y - a1.y);
    for (let j = 0; j <= samples; j++) {
      const u = j / samples;
      const bx = b1.x + u * (b2.x - b1.x);
      const by = b1.y + u * (b2.y - b1.y);
      const d = Math.hypot(ax - bx, ay - by);
      if (d < m) m = d;
    }
  }
  return m;
}

function minDistToOthers(from: Pt, to: Pt, others: Segment[]): number {
  if (others.length === 0) return Infinity;
  let m = Infinity;
  for (const o of others) {
    m = Math.min(m, minSampleDistBetweenSegments(from, to, o.from, o.to));
  }
  return m;
}

function minEndpointClearance(from: Pt, to: Pt, others: Segment[]): number {
  if (others.length === 0) return Infinity;
  let m = Infinity;
  for (const o of others) {
    for (const p of [from, to]) {
      for (const q of [o.from, o.to]) {
        m = Math.min(m, dist(p, q));
      }
    }
  }
  return m;
}

type Edge = 0 | 1 | 2 | 3;

function pointOnEdge(e: Edge, w: number, h: number, pad: number): Pt {
  const maxX = w - pad - DOT;
  const maxY = h - pad - DOT;
  switch (e) {
    case 0:
      /* Top: מגיע מלמעלה */
      return { x: randomRange(pad, maxX), y: -EDGE_OFFSCREEN_PX };
    case 1:
      /* Right: מגיע מימין */
      return { x: w + EDGE_OFFSCREEN_PX, y: randomRange(pad, maxY) };
    case 2:
      /* Bottom: מגיע מלמטה */
      return { x: randomRange(pad, maxX), y: h + EDGE_OFFSCREEN_PX };
    case 3:
      /* Left: מגיע משמאל */
      return { x: -EDGE_OFFSCREEN_PX, y: randomRange(pad, maxY) };
    default:
      return { x: -EDGE_OFFSCREEN_PX, y: randomRange(pad, maxY) };
  }
}

function randomInterior(w: number, h: number, pad: number): Pt {
  return {
    x: randomRange(pad, w - pad - DOT),
    y: randomRange(pad, h - pad - DOT),
  };
}

function randomCandidate(w: number, h: number, pad: number): Segment {
  /* תמיד מקצה לקצה: כניסה מדופן אחת, יציאה מדופן אחרת */
  let a = Math.floor(Math.random() * 4) as Edge;
  let b = Math.floor(Math.random() * 4) as Edge;
  let guard = 0;
  while (a === b && guard++ < 12) {
    b = Math.floor(Math.random() * 4) as Edge;
  }
  if (a === b) b = ((a + 1) % 4) as Edge;
  return { from: pointOnEdge(a, w, h, pad), to: pointOnEdge(b, w, h, pad) };
}

function entryEdgeFromFrom(from: Pt, w: number, h: number): Edge {
  const margin = 28;
  if (from.x <= margin) return 3;
  if (from.x >= w - margin) return 1;
  if (from.y <= margin) return 0;
  if (from.y >= h - margin) return 2;
  const left = from.x;
  const right = w - from.x;
  const top = from.y;
  const bottom = h - from.y;
  const m = Math.min(left, right, top, bottom);
  if (m === left) return 3;
  if (m === right) return 1;
  if (m === top) return 0;
  return 2;
}

function randomDotSegmentFromEntry(
  w: number,
  h: number,
  pad: number,
  entry: Edge,
): Segment {
  let exitE: Edge;
  if (Math.random() < 0.78) {
    exitE = ((entry + 2) % 4) as Edge;
  } else {
    exitE = Math.floor(Math.random() * 4) as Edge;
    let g = 0;
    while (exitE === entry && g++ < 14) {
      exitE = Math.floor(Math.random() * 4) as Edge;
    }
    if (exitE === entry) exitE = ((entry + 1) % 4) as Edge;
  }
  return {
    from: pointOnEdge(entry, w, h, pad),
    to: pointOnEdge(exitE, w, h, pad),
  };
}

/** נקודות Hero: קצה↔קצה אלכסוני בלבד (בלי מסלולים כמעט אופקיים) */
function randomDotDiagonalOnly(w: number, h: number, pad: number): Segment {
  const maxX = w - pad - DOT;
  if (Math.random() < 0.9) {
    return randomCandidate(w, h, pad);
  }
  const pickLow = Math.random() < 0.5;
  const from = pickLow
    ? { x: randomRange(pad, maxX * 0.44), y: h + EDGE_OFFSCREEN_PX }
    : { x: randomRange(maxX * 0.56, maxX), y: -EDGE_OFFSCREEN_PX };
  const to = pickLow
    ? { x: randomRange(maxX * 0.54, maxX), y: -EDGE_OFFSCREEN_PX }
    : { x: randomRange(pad, maxX * 0.46), y: h + EDGE_OFFSCREEN_PX };
  return { from, to };
}

function shuffleEdges(): Edge[] {
  const arr: Edge[] = [0, 1, 2, 3];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const t = arr[i]!;
    arr[i] = arr[j]!;
    arr[j] = t;
  }
  return arr;
}

type DotPathOpts = {
  fixedEntryEdge?: Edge;
  forbidEntryEdges?: Set<Edge>;
};

type CellRect = {
  xMin: number;
  yMin: number;
  xMax: number;
  yMax: number;
};

/** רשת: 20 תאים (5×4), או 12 (4×3) כשמספר אוניות נמוך יותר */
function gridLayoutForShips(total: number): { cols: number; rows: number } {
  if (total <= 12) return { cols: 4, rows: 3 };
  return { cols: 5, rows: 4 };
}

function shuffleCellAssignment(total: number): number[] {
  const { cols, rows } = gridLayoutForShips(total);
  const cellCount = cols * rows;
  const perm = Array.from({ length: cellCount }, (_, i) => i);
  for (let i = cellCount - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const t = perm[i]!;
    perm[i] = perm[j]!;
    perm[j] = t;
  }
  return perm.slice(0, total);
}

function getCellRectFromLinear(
  linear: number,
  cols: number,
  rows: number,
  w: number,
  h: number,
): CellRect {
  const col = linear % cols;
  const row = Math.floor(linear / cols);
  const inset = Math.max(8, Math.min(w, h) * 0.008);
  const cw = w / cols;
  const ch = h / rows;
  return {
    xMin: col * cw + inset,
    yMin: row * ch + inset,
    xMax: (col + 1) * cw - inset,
    yMax: (row + 1) * ch - inset,
  };
}

function randomSegmentInCell(rect: CellRect, pad: number): Segment {
  const { xMin, yMin, xMax, yMax } = rect;
  if (xMax - xMin < pad * 4 || yMax - yMin < pad * 4) {
    return {
      from: { x: xMin, y: yMin },
      to: { x: xMax, y: yMax },
    };
  }
  let edgeA = Math.floor(Math.random() * 4);
  let edgeB = Math.floor(Math.random() * 4);
  if (Math.random() < 0.72) {
    edgeB = (edgeA + 2) % 4;
  }
  let guard = 0;
  while (edgeB === edgeA && guard++ < 14) {
    edgeB = Math.floor(Math.random() * 4);
  }
  if (edgeB === edgeA) edgeB = (edgeA + 1) % 4;

  function pointOnCellEdge(e: number): Pt {
    switch (e) {
      case 0:
        return { x: xMin, y: randomRange(yMin, yMax) };
      case 1:
        return { x: xMax, y: randomRange(yMin, yMax) };
      case 2:
        return { x: randomRange(xMin, xMax), y: yMin };
      case 3:
      default:
        return { x: randomRange(xMin, xMax), y: yMax };
    }
  }
  return { from: pointOnCellEdge(edgeA), to: pointOnCellEdge(edgeB) };
}

function pathCellLocal(from: Pt, to: Pt, id: string, speedPxPerSec: number): Path {
  const d = dist(from, to);
  return {
    id,
    from,
    to,
    duration: Math.max(0.35, d / speedPxPerSec),
  };
}

function generateShipPathAvoidingInCell(
  w: number,
  h: number,
  others: Segment[],
  variant: number,
  rect: CellRect,
): Path {
  const pad = 6;
  const rw = rect.xMax - rect.xMin;
  const rh = rect.yMax - rect.yMin;
  const m = Math.min(rw, rh);
  const minCross = Math.max(28, m * 0.2);
  const segClear = Math.max(12, m * 0.055);
  const endClear = Math.max(8, m * 0.045);
  const maxAttempts = isMobileLayout(w) ? 200 : 160;

  let best: Path | null = null;
  let bestScore = -1;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const { from, to } = randomSegmentInCell(rect, pad);
    if (dist(from, to) < minCross) continue;
    const dSeg = minDistToOthers(from, to, others);
    const dEnd = minEndpointClearance(from, to, others);
    const score = Math.min(dSeg, dEnd * 0.88);
    const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    const p = pathCellLocal(from, to, id, SHIP_SAIL_SPEED_PX_PER_SEC);
    if (dSeg >= segClear && dEnd >= endClear) return p;
    if (score > bestScore) {
      bestScore = score;
      best = p;
    }
  }

  if (best && bestScore > segClear * 0.32) return best;
  const fb = randomSegmentInCell(rect, pad);
  return pathCellLocal(
    fb.from,
    fb.to,
    `${Date.now()}-fb-${variant}`,
    SHIP_SAIL_SPEED_PX_PER_SEC,
  );
}

function fallbackPath(w: number, h: number, pad: number, variant: number): Path {
  const corners: Segment[] = [
    { from: { x: pad, y: pad }, to: { x: w - pad - DOT, y: h - pad - DOT } },
    { from: { x: w - pad - DOT, y: pad }, to: { x: pad, y: h - pad - DOT } },
    { from: { x: pad, y: h - pad - DOT }, to: { x: w - pad - DOT, y: pad } },
    {
      from: { x: w - pad - DOT, y: h - pad - DOT },
      to: { x: pad, y: pad },
    },
  ];
  const s = corners[variant % 4];
  return pathWithScreenExit(
    s.from,
    s.to,
    w,
    h,
    `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    randomRange(DURATION_MIN_SEC, DURATION_MAX_SEC),
  );
}

/** נקודת התחלה פנימית לאורך המקטע — רוב הפעמים סביב מרכול המסך */
function randomStartTInView(from: Pt, to: Pt, w: number, h: number): number {
  const MIN_REMAIN = 92;
  const full = dist(from, to);
  if (full < MIN_REMAIN + 40) return 0;
  const pickT = () =>
    Math.random() < 0.58
      ? randomRange(0.26, 0.74)
      : randomRange(0.06, 0.93);
  for (let k = 0; k < 48; k++) {
    const t = pickT();
    const sx = from.x + (to.x - from.x) * t;
    const sy = from.y + (to.y - from.y) * t;
    if (sx < 8 || sx > w - 8 || sy < 8 || sy > h - 8) continue;
    const rem = full * (1 - t);
    if (rem < MIN_REMAIN) continue;
    return t;
  }
  return Math.max(0, Math.min(0.42, 1 - MIN_REMAIN / full));
}

function withRandomShipStart(
  base: Path,
  w: number,
  h: number,
  speedPxPerSec: number,
): Path {
  const t0 = randomStartTInView(base.from, base.to, w, h);
  const sx = base.from.x + (base.to.x - base.from.x) * t0;
  const sy = base.from.y + (base.to.y - base.from.y) * t0;
  const d = dist({ x: sx, y: sy }, base.to);
  return {
    ...base,
    startT: t0,
    duration: Math.max(0.4, d / speedPxPerSec),
  };
}

/** נקודות Hero: כניסה/יציאה מדפנות — אלכסונים אקראיים + הימנעות ממסלולים אחרים */
function generateDotPathAvoiding(
  w: number,
  h: number,
  others: Segment[],
  variant: number,
  dotOpts?: DotPathOpts,
): Path {
  const pad = 14;
  const m = Math.min(w, h);
  /** אותם ספים בכל רוחב מסך — כדי שהנקודות יתנהגו כמו בדסקטופ */
  const minCross = Math.max(88, m * 0.17);
  const segClear = Math.max(38, m * 0.052);
  const endClear = Math.max(26, m * 0.038);

  let best: Path | null = null;
  let bestScore = -1;

  const dotAttempts = 180;
  for (let attempt = 0; attempt < dotAttempts; attempt++) {
    const seg =
      dotOpts?.fixedEntryEdge !== undefined
        ? randomDotSegmentFromEntry(w, h, pad, dotOpts.fixedEntryEdge)
        : randomDotDiagonalOnly(w, h, pad);
    const { from, to } = seg;
    if (dotOpts?.forbidEntryEdges && dotOpts.forbidEntryEdges.size > 0) {
      const ee = entryEdgeFromFrom(from, w, h);
      if (dotOpts.forbidEntryEdges.has(ee)) continue;
    }
    if (dist(from, to) < minCross) continue;
    const dSeg = minDistToOthers(from, to, others);
    const dEnd = minEndpointClearance(from, to, others);
    const score = Math.min(dSeg, dEnd * 0.85);
    const p = pathWithScreenExit(
      from,
      to,
      w,
      h,
      `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      160,
    );
    if (dSeg >= segClear && dEnd >= endClear) {
      return {
        ...p,
        duration: dist(p.from, p.to) / ORIGINAL_DOT_SPEED_PX_PER_SEC,
      };
    }
    if (score > bestScore) {
      bestScore = score;
      best = p;
    }
  }

  if (best && bestScore > segClear * 0.42) {
    return {
      ...best,
      duration: dist(best.from, best.to) / ORIGINAL_DOT_SPEED_PX_PER_SEC,
    };
  }
  const fb = fallbackPath(w, h, pad, variant);
  return {
    ...fb,
    duration: dist(fb.from, fb.to) / ORIGINAL_DOT_SPEED_PX_PER_SEC,
  };
}

function generateOriginalDotPaths(w: number, h: number): Path[] {
  const edges = shuffleEdges();
  const acc: Path[] = [];
  for (let i = 0; i < ORIGINAL_DOT_COUNT; i++) {
    const others: Segment[] = acc.map((p) => ({ from: p.from, to: p.to }));
    acc.push(
      generateDotPathAvoiding(w, h, others, i * 31 + 17, {
        fixedEntryEdge: edges[i],
      }),
    );
  }
  return acc;
}

/** מסלולי אוניות: תא ברשת (5×4) לאונייה אחת — שיוט בתוך התא בלבד */
function generateAllPaths(w: number, h: number, cellAssignment: number[]): Path[] {
  const total = cellAssignment.length;
  const { cols, rows } = gridLayoutForShips(total);
  const acc: Path[] = [];
  for (let i = 0; i < total; i++) {
    const others: Segment[] = acc.map((p) => ({ from: p.from, to: p.to }));
    const linear = cellAssignment[i]!;
    const rect = getCellRectFromLinear(linear, cols, rows, w, h);
    acc.push(generateShipPathAvoidingInCell(w, h, others, i * 19 + 7, rect));
  }
  return acc;
}

/** כיוון תנועה במסך (+y למטה). +180° כי ב־SVG החרטום מיושר הפוך מוקטור המהירות אחרי המראה בקובץ */
function headingDegrees(from: Pt, to: Pt) {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  if (Math.abs(dx) < 1e-6 && Math.abs(dy) < 1e-6) return 180;
  return (Math.atan2(dy, dx) * 180) / Math.PI + 180;
}

/** אוניית SVG מהגלריה — פנסים/אלומות/הילה בתוך הקובץ; object כדי שהאנימציות ירוצו */
function GalleryShipSprite({
  headingDeg,
  shipFile,
}: {
  headingDeg: number;
  shipFile: string;
}) {
  const data = `/ship-refs/${shipFile}?v=${SHIP_REF_SVG_CACHE}`;
  return (
    <div
      className="pointer-events-none select-none overflow-visible [transform-style:preserve-3d] [-webkit-transform-style:preserve-3d]"
      style={{
        width: "clamp(10rem, 33vw, 17rem)",
        aspectRatio: "1580 / 330",
        transform: `translate(-50%, -50%) rotate(${headingDeg}deg) translateZ(0)`,
        WebkitTransform: `translate(-50%, -50%) rotate(${headingDeg}deg) translateZ(0)`,
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
      }}
    >
      {/* img — תאימות טובה יותר ל־iOS/Safari מול <object> ל־SVG חיצוני */}
      <img
        src={data}
        alt=""
        decoding="async"
        fetchPriority="low"
        className="block h-full w-full opacity-[0.92] object-contain object-center bg-transparent [transform:translateZ(0)] [-webkit-transform:translateZ(0)]"
        aria-hidden
      />
    </div>
  );
}

/** זוהר רך ומטושטש — ב־max-sm מחוזק מעט (Safari/מובייל נוטים לרכך פחות blur) */
function DotSprite() {
  return (
    <div
      className="relative flex h-10 w-10 items-center justify-center pointer-events-none [transform:translate3d(-50%,-50%,0)] [will-change:transform]"
      aria-hidden
    >
      <div
        className="absolute h-8 w-8 max-sm:h-9 max-sm:w-9 rounded-full bg-[rgba(51,187,255,0.14)] max-sm:bg-[rgba(51,187,255,0.2)] blur-xl opacity-90 max-sm:opacity-100"
        aria-hidden
      />
      <div
        className="absolute h-5 w-5 max-sm:h-6 max-sm:w-6 rounded-full bg-[rgba(51,187,255,0.1)] max-sm:bg-[rgba(51,187,255,0.14)] blur-md opacity-80 max-sm:opacity-95"
        aria-hidden
      />
      <div className="relative h-1.5 w-1.5 max-sm:h-[7px] max-sm:w-[7px] rounded-full bg-white/25 max-sm:bg-white/30 blur-[3px] max-sm:blur-[4px] shadow-[0_0_22px_rgba(51,187,255,0.42),0_0_44px_rgba(51,187,255,0.18),0_0_64px_rgba(51,187,255,0.08)] max-sm:shadow-[0_0_26px_rgba(51,187,255,0.5),0_0_48px_rgba(51,187,255,0.28),0_0_72px_rgba(51,187,255,0.12)]" />
    </div>
  );
}

function HeroOriginalDiagonalDots() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);
  const [paths, setPaths] = useState<Path[] | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => {
      const r = el.getBoundingClientRect();
      const w = Math.floor(r.width);
      const h = Math.floor(r.height);
      if (w > 40 && h > 40) {
        setSize((prev) => (prev && prev.w === w && prev.h === h ? prev : { w, h }));
      }
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const sw = size?.w ?? 0;
  const sh = size?.h ?? 0;

  useEffect(() => {
    if (sw < 41 || sh < 41) return;
    setPaths(generateOriginalDotPaths(sw, sh));
  }, [sw, sh]);

  const handleDotComplete = useCallback(
    (i: number) => {
      if (sw < 41 || sh < 41) return;
      setPaths((prev) => {
        if (!prev) return prev;
        const others: Segment[] = prev
          .filter((_, j) => j !== i)
          .map((p) => ({ from: p.from, to: p.to }));
        const forbid = new Set<Edge>();
        prev.forEach((p, j) => {
          if (j === i) return;
          forbid.add(entryEdgeFromFrom(p.from, sw, sh));
        });
        const nextPath = generateDotPathAvoiding(
          sw,
          sh,
          others,
          i * 31 + Math.floor(Math.random() * 40),
          { forbidEntryEdges: forbid },
        );
        const next = [...prev];
        next[i] = nextPath;
        return next;
      });
    },
    [sw, sh],
  );

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      dir="ltr"
      aria-hidden
    >
      {size && paths
        ? paths.map((path, i) => (
            <Particle
              key={`orig-dot-${i}-${path.id}`}
              path={path}
              index={i}
              onComplete={handleDotComplete}
              variant="original"
            />
          ))
        : null}
    </div>
  );
}

function Particle({
  path,
  index,
  onComplete,
  variant,
  shipFile,
}: {
  path: Path;
  index: number;
  onComplete: (index: number) => void;
  variant: "original" | "ships";
  /** קובץ מ־LIVE_BACKGROUND_SHIP_FILES כש־variant === "ships" */
  shipFile?: string;
}) {
  const headingDeg = headingDegrees(path.from, path.to);
  const handleDone = useCallback(() => {
    onComplete(index);
  }, [index, onComplete]);

  const startT = variant === "ships" ? (path.startT ?? 0) : 0;
  const fromX = path.from.x + (path.to.x - path.from.x) * startT;
  const fromY = path.from.y + (path.to.y - path.from.y) * startT;
  const duration = path.duration;
  const delay = 0;

  const file =
    shipFile ??
    LIVE_BACKGROUND_SHIP_FILES[index % LIVE_BACKGROUND_SHIP_FILES.length]!;

  return (
    <motion.div
      key={path.id}
      className="absolute left-0 top-0 overflow-visible"
      initial={{ x: fromX, y: fromY }}
      animate={{ x: path.to.x, y: path.to.y }}
      transition={{
        type: "tween",
        duration,
        ease: "linear",
        delay,
      }}
      onAnimationComplete={handleDone}
    >
      {variant === "ships" ? (
        <GalleryShipSprite headingDeg={headingDeg} shipFile={file} />
      ) : (
        <DotSprite />
      )}
    </motion.div>
  );
}

function ShipsFloatingParticles() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);
  const [paths, setPaths] = useState<Path[] | null>(null);
  const wasIntersectingRef = useRef<boolean | null>(null);
  const cellAssignmentRef = useRef<number[] | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const update = () => {
      const r = el.getBoundingClientRect();
      const w = Math.floor(r.width);
      const h = Math.floor(r.height);
      if (w > 40 && h > 40) {
        setSize((prev) =>
          prev && prev.w === w && prev.h === h ? prev : { w, h },
        );
      }
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const sw = size?.w ?? 0;
  const sh = size?.h ?? 0;

  const respawnShipPaths = useCallback(() => {
    if (sw < 41 || sh < 41) return;
    const total = shipCountForWidth(sw);
    const assignment = shuffleCellAssignment(total);
    cellAssignmentRef.current = assignment;
    const init = generateAllPaths(sw, sh, assignment).map((p) =>
      withRandomShipStart(p, sw, sh, SHIP_SAIL_SPEED_PX_PER_SEC),
    );
    setPaths(init);
  }, [sw, sh]);

  useEffect(() => {
    if (sw < 41 || sh < 41) return;
    respawnShipPaths();
  }, [sw, sh, respawnShipPaths]);

  /** כשנכנסים שוב ל־Hero אחרי גלילה החוצה — פיזור מחדש במסך (לא רק מדופן) */
  useEffect(() => {
    const el = containerRef.current;
    if (!el || sw < 41 || sh < 41) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        const vis = entry.isIntersecting && entry.intersectionRatio > 0.04;
        if (vis && wasIntersectingRef.current === false) {
          respawnShipPaths();
        }
        wasIntersectingRef.current = vis;
      },
      { threshold: [0, 0.05, 0.12] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [sw, sh, respawnShipPaths]);

  const handleParticleComplete = useCallback(
    (i: number) => {
      if (sw < 41 || sh < 41) return;
      setPaths((prev) => {
        if (!prev) return prev;
        const assignment = cellAssignmentRef.current;
        if (!assignment || assignment.length !== prev.length) return prev;
        const others: Segment[] = prev
          .filter((_, j) => j !== i)
          .map((p) => ({ from: p.from, to: p.to }));
        const { cols, rows } = gridLayoutForShips(assignment.length);
        const linear = assignment[i]!;
        const rect = getCellRectFromLinear(linear, cols, rows, sw, sh);
        const nextPathRaw = generateShipPathAvoidingInCell(
          sw,
          sh,
          others,
          i * 23 + Math.floor(Math.random() * 60),
          rect,
        );
        const next = [...prev];
        next[i] = withRandomShipStart(
          nextPathRaw,
          sw,
          sh,
          SHIP_SAIL_SPEED_PX_PER_SEC,
        );
        return next;
      });
    },
    [sw, sh],
  );

  return (
    <MotionConfig reducedMotion="never">
      <div
        ref={containerRef}
        className="absolute inset-0 overflow-hidden pointer-events-none"
        dir="ltr"
        aria-hidden
      >
        {size && paths
          ? paths.map((path, i) => (
              <Particle
                key={`slot-${i}-${path.id}`}
                path={path}
                index={i}
                onComplete={handleParticleComplete}
                variant="ships"
                shipFile={
                  LIVE_BACKGROUND_SHIP_FILES[
                    (i * 17 + 3) % LIVE_BACKGROUND_SHIP_FILES.length
                  ]!
                }
              />
            ))
          : null}
      </div>
    </MotionConfig>
  );
}

export default function HeroFloatingParticles({
  variant = "original",
}: {
  variant?: "original" | "ships";
}) {
  if (variant === "original") {
    return <HeroOriginalDiagonalDots />;
  }

  return <ShipsFloatingParticles />;
}
