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
 * אוניות + נקודות Hero: רק חצייה מדופן שמאל ↔ ימין (בלי כניסה מלמעלה/מטה).
 * מיקום אנכי (Y) לא ננעל על קווי רוחב של רשת הרקע — רק מרחק מינימלי מקווי ה־60px.
 * (רקע חי בדף הבית + /bg-demos)
 */
/** סה״כ אוניות — פחות מספרים כי המסלול ארוך על כל המסך */
const SHIP_COUNT_DESKTOP = 14;
const SHIP_COUNT_MOBILE = 10;

function shipCountForWidth(w: number, override?: number) {
  if (typeof override === "number" && override > 0) return Math.floor(override);
  return w < 768 ? SHIP_COUNT_MOBILE : SHIP_COUNT_DESKTOP;
}

/** מסך צר — התאמות מסלול (אלכסונים, מרווחים) */
function isMobileLayout(w: number) {
  return w < 768;
}

/** מהירות שיוט (px/s) — נמוך = איטי יותר, פחות בולט על מסלול מלא */
const SHIP_SAIL_SPEED_PX_PER_SEC = 1.65;

/** חייב להתאים ל־background-size ב־.animated-grid-bg (globals.css) */
const BG_GRID_PX = 60;

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
type ShipMotionMode = "horizontal" | "random";

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

function pathMidpoint(p: Path): Pt {
  return { x: (p.from.x + p.to.x) / 2, y: (p.from.y + p.to.y) / 2 };
}

/**
 * בוחר קובץ אונייה כך שלא יחזור צבע/וריאנט של אונייה אחרת שמרכז המסלול שלה קרוב (אותו "איזור").
 */
function pickShipFileForPath(
  paths: Path[],
  files: string[],
  i: number,
  w: number,
  h: number,
): string {
  const list = LIVE_BACKGROUND_SHIP_FILES;
  if (list.length === 0) return "";
  const near = Math.min(w, h) * 0.34;
  const mi = pathMidpoint(paths[i]!);
  const avoid = new Set<string>();
  for (let j = 0; j < paths.length; j++) {
    if (j === i) continue;
    const fj = files[j];
    if (!fj) continue;
    if (dist(mi, pathMidpoint(paths[j]!)) < near) avoid.add(fj);
  }
  for (let k = 0; k < list.length; k++) {
    const f = list[(i + k) % list.length]!;
    if (!avoid.has(f)) return f;
  }
  return list[i % list.length]!;
}

function buildShipFilesForPaths(paths: Path[], w: number, h: number): string[] {
  const files = paths.map(() => "");
  for (let i = 0; i < paths.length; i++) {
    files[i] = pickShipFileForPath(paths, files, i, w, h);
  }
  const near = Math.min(w, h) * 0.34;
  for (let i = 0; i < paths.length; i++) {
    for (let j = i + 1; j < paths.length; j++) {
      if (files[i] !== files[j]) continue;
      if (dist(pathMidpoint(paths[i]!), pathMidpoint(paths[j]!)) >= near) continue;
      files[j] = pickShipFileForPath(paths, files, j, w, h);
    }
  }
  return files;
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

/** Y לא מונח על קווי רוחב של רשת הרקע (מניעת "יציאה מתוך קו אופקי") */
function yAvoidHorizontalGridLines(h: number, pad: number): number {
  const maxY = h - pad - DOT;
  const g = BG_GRID_PX;
  const minGap = 10;
  for (let attempt = 0; attempt < 56; attempt++) {
    const y = randomRange(pad, maxY);
    const offset = ((y - pad) % g + g) % g;
    const distToLine = Math.min(offset, g - offset);
    if (distToLine >= minGap) return y;
  }
  return pad + g * (0.27 + Math.random() * 0.46);
}

/** נקודה על דופן שמאל (3) או ימין (1) בלבד */
function pointOnVerticalEdge(e: Edge, w: number, h: number, pad: number, y: number): Pt {
  const maxY = h - pad - DOT;
  const yy = Math.min(maxY, Math.max(pad, y));
  if (e === 3) return { x: -EDGE_OFFSCREEN_PX, y: yy };
  return { x: w + EDGE_OFFSCREEN_PX, y: yy };
}

/** חצייה מלאה משמאל לימין או הפוך — אלכסון קל בלבד (y שונה בקצוות) */
function randomHorizontalCrossing(w: number, h: number, pad: number): Segment {
  const y1 = yAvoidHorizontalGridLines(h, pad);
  const y2 = yAvoidHorizontalGridLines(h, pad);
  const fromLeft = Math.random() < 0.5;
  if (fromLeft) {
    return {
      from: pointOnVerticalEdge(3, w, h, pad, y1),
      to: pointOnVerticalEdge(1, w, h, pad, y2),
    };
  }
  return {
    from: pointOnVerticalEdge(1, w, h, pad, y1),
    to: pointOnVerticalEdge(3, w, h, pad, y2),
  };
}

function pointOnAnyEdge(e: Edge, w: number, h: number, pad: number): Pt {
  const minX = pad;
  const maxX = w - pad;
  const minY = pad;
  const maxY = h - pad;
  if (e === 0) return { x: randomRange(minX, maxX), y: -EDGE_OFFSCREEN_PX };
  if (e === 2) return { x: randomRange(minX, maxX), y: h + EDGE_OFFSCREEN_PX };
  if (e === 3) return { x: -EDGE_OFFSCREEN_PX, y: randomRange(minY, maxY) };
  return { x: w + EDGE_OFFSCREEN_PX, y: randomRange(minY, maxY) };
}

function randomAnyEdgeCrossing(w: number, h: number, pad: number): Segment {
  const edges: Edge[] = [0, 1, 2, 3];
  const fromE = edges[Math.floor(Math.random() * edges.length)]!;
  const possibleTo = edges.filter((e) => e !== fromE) as Edge[];
  const toE = possibleTo[Math.floor(Math.random() * possibleTo.length)]!;
  return {
    from: pointOnAnyEdge(fromE, w, h, pad),
    to: pointOnAnyEdge(toE, w, h, pad),
  };
}

function randomDotSegmentFromEntryHorizontal(
  w: number,
  h: number,
  pad: number,
  entry: Edge,
): Segment {
  const side = entry === 1 || entry === 3 ? entry : (Math.random() < 0.5 ? 3 : 1);
  const exitE = side === 3 ? 1 : 3;
  const yFrom = yAvoidHorizontalGridLines(h, pad);
  const yTo = yAvoidHorizontalGridLines(h, pad);
  return {
    from: pointOnVerticalEdge(side, w, h, pad, yFrom),
    to: pointOnVerticalEdge(exitE, w, h, pad, yTo),
  };
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

/** כניסות רק משמאל/ימין — לסיבוב בין 4 הנקודות */
function shuffleVerticalEntryEdges(): Edge[] {
  const arr: Edge[] = [1, 3, 1, 3];
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

function fallbackPathHorizontal(w: number, h: number, pad: number, variant: number): Path {
  const y1 = yAvoidHorizontalGridLines(h, pad);
  const y2 = yAvoidHorizontalGridLines(h, pad);
  const fromLeft = variant % 2 === 0;
  const from = fromLeft
    ? pointOnVerticalEdge(3, w, h, pad, y1)
    : pointOnVerticalEdge(1, w, h, pad, y1);
  const to = fromLeft
    ? pointOnVerticalEdge(1, w, h, pad, y2)
    : pointOnVerticalEdge(3, w, h, pad, y2);
  return pathWithScreenExit(
    from,
    to,
    w,
    h,
    `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    randomRange(DURATION_MIN_SEC, DURATION_MAX_SEC),
  );
}

/** מסלול אונייה: קצה→קצה + המשך עד מחוץ למסך, מהירות קבועה */
function pathShipFullScreen(from: Pt, toLogical: Pt, w: number, h: number, id: string): Path {
  const toExit = extendToOffScreen(from, toLogical, w, h);
  const len = dist(from, toExit);
  return {
    id,
    from,
    to: toExit,
    duration: Math.max(0.55, len / SHIP_SAIL_SPEED_PX_PER_SEC),
  };
}

/** התחלה אקראית לאורך המסלול — כדי שברענון כבר ייראו בשיוט */
function withLightShipStart(p: Path, speedPxPerSec: number): Path {
  const t0 = randomRange(0.14, 0.82);
  const sx = p.from.x + (p.to.x - p.from.x) * t0;
  const sy = p.from.y + (p.to.y - p.from.y) * t0;
  const d = dist({ x: sx, y: sy }, p.to);
  return {
    ...p,
    startT: t0,
    duration: Math.max(0.5, d / speedPxPerSec),
  };
}

function generateShipPathAvoidingFull(
  w: number,
  h: number,
  others: Segment[],
  variant: number,
  mode: ShipMotionMode = "horizontal",
): Path {
  const pad = 8;
  const m = Math.min(w, h);
  const minCross = Math.max(120, m * 0.28);
  const opts = shipPathSeparationOpts(w, h);
  const segClear = opts.minSegClear * 0.92;
  const endClear = Math.max(44, m * 0.065);
  const maxAttempts = isMobileLayout(w) ? 240 : 200;

  let best: Path | null = null;
  let bestScore = -1;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const { from, to } =
      mode === "random"
        ? randomAnyEdgeCrossing(w, h, pad)
        : randomHorizontalCrossing(w, h, pad);
    if (dist(from, to) < minCross) continue;
    const dSeg = minDistToOthers(from, to, others);
    const dEnd = minEndpointClearance(from, to, others);
    const score = Math.min(dSeg, dEnd * 0.86);
    const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    const p = pathShipFullScreen(from, to, w, h, id);
    if (dSeg >= segClear && dEnd >= endClear) {
      return withLightShipStart(p, SHIP_SAIL_SPEED_PX_PER_SEC);
    }
    if (score > bestScore) {
      bestScore = score;
      best = p;
    }
  }

  if (best && bestScore > segClear * 0.34) {
    return withLightShipStart(best, SHIP_SAIL_SPEED_PX_PER_SEC);
  }
  const { from, to } =
    mode === "random"
      ? randomAnyEdgeCrossing(w, h, pad)
      : randomHorizontalCrossing(w, h, pad);
  return withLightShipStart(
    pathShipFullScreen(from, to, w, h, `${Date.now()}-fb-${variant}`),
    SHIP_SAIL_SPEED_PX_PER_SEC,
  );
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
  const segClear = Math.max(56, m * 0.078);
  const endClear = Math.max(34, m * 0.05);

  let best: Path | null = null;
  let bestScore = -1;

  const dotAttempts = 180;
  for (let attempt = 0; attempt < dotAttempts; attempt++) {
    const seg =
      dotOpts?.fixedEntryEdge !== undefined
        ? randomDotSegmentFromEntryHorizontal(w, h, pad, dotOpts.fixedEntryEdge)
        : randomHorizontalCrossing(w, h, pad);
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
  const fb = fallbackPathHorizontal(w, h, pad, variant);
  return {
    ...fb,
    duration: dist(fb.from, fb.to) / ORIGINAL_DOT_SPEED_PX_PER_SEC,
  };
}

function generateOriginalDotPaths(w: number, h: number): Path[] {
  const edges = shuffleVerticalEntryEdges();
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

/** מסלולי אוניות: אלכסון על כל השטח, קצה→קצה */
function generateAllShipPathsFullViewport(
  w: number,
  h: number,
  total: number,
  mode: ShipMotionMode = "horizontal",
): Path[] {
  const acc: Path[] = [];
  for (let i = 0; i < total; i++) {
    const others: Segment[] = acc.map((p) => ({ from: p.from, to: p.to }));
    acc.push(generateShipPathAvoidingFull(w, h, others, i * 19 + 7, mode));
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
        width: "clamp(16rem, 50vw, 30rem)",
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
        className="block h-full w-full opacity-[0.88] object-contain object-center bg-transparent [transform:translateZ(0)] [-webkit-transform:translateZ(0)] [filter:drop-shadow(0_0_10px_rgba(248,248,232,0.16))_drop-shadow(0_0_20px_rgba(248,248,232,0.08))_drop-shadow(0_0_38px_rgba(248,248,232,0.04))]"
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
        className="absolute h-8 w-8 max-sm:h-9 max-sm:w-9 rounded-full bg-[rgba(51,187,255,0.078)] max-sm:bg-[rgba(51,187,255,0.104)] blur-xl opacity-54 max-sm:opacity-63"
        aria-hidden
      />
      <div
        className="absolute h-5 w-5 max-sm:h-6 max-sm:w-6 rounded-full bg-[rgba(51,187,255,0.058)] max-sm:bg-[rgba(51,187,255,0.088)] blur-md opacity-49 max-sm:opacity-59"
        aria-hidden
      />
      <div className="relative h-1.5 w-1.5 max-sm:h-[7px] max-sm:w-[7px] rounded-full bg-white/13 max-sm:bg-white/17 blur-[3px] max-sm:blur-[4px] shadow-[0_0_18px_rgba(51,187,255,0.2),0_0_36px_rgba(51,187,255,0.095),0_0_52px_rgba(51,187,255,0.045)] max-sm:shadow-[0_0_20px_rgba(51,187,255,0.25),0_0_40px_rgba(51,187,255,0.125),0_0_56px_rgba(51,187,255,0.062)]" />
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
              key={`orig-dot-${i}`}
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
      initial={{ x: fromX, y: fromY, opacity: 1 }}
      animate={{ x: path.to.x, y: path.to.y, opacity: 1 }}
      transition={{
        x: { duration, ease: "linear", delay },
        y: { duration, ease: "linear", delay },
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

function ShipsFloatingParticles({
  countOverride,
  motionMode = "horizontal",
}: {
  countOverride?: number;
  motionMode?: ShipMotionMode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);
  const [shipLayer, setShipLayer] = useState<{
    paths: Path[];
    files: string[];
  } | null>(null);

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
    const total = shipCountForWidth(sw, countOverride);
    const paths = generateAllShipPathsFullViewport(sw, sh, total, motionMode);
    const files = buildShipFilesForPaths(paths, sw, sh);
    setShipLayer({ paths, files });
  }, [sw, sh, countOverride, motionMode]);

  useEffect(() => {
    if (sw < 41 || sh < 41) return;
    respawnShipPaths();
  }, [sw, sh, respawnShipPaths]);

  const handleParticleComplete = useCallback(
    (i: number) => {
      if (sw < 41 || sh < 41) return;
      setShipLayer((prev) => {
        if (!prev) return prev;
        const others: Segment[] = prev.paths
          .filter((_, j) => j !== i)
          .map((p) => ({ from: p.from, to: p.to }));
        const nextPath = generateShipPathAvoidingFull(
          sw,
          sh,
          others,
          i * 23 + Math.floor(Math.random() * 60),
          motionMode,
        );
        const nextPaths = [...prev.paths];
        nextPaths[i] = nextPath;
        const nextFiles = [...prev.files];
        nextFiles[i] = pickShipFileForPath(nextPaths, nextFiles, i, sw, sh);
        return { paths: nextPaths, files: nextFiles };
      });
    },
    [sw, sh, motionMode],
  );

  const paths = shipLayer?.paths;
  const files = shipLayer?.files;

  return (
    <MotionConfig reducedMotion="never">
      <div
        ref={containerRef}
        className="absolute inset-0 overflow-hidden pointer-events-none"
        dir="ltr"
        aria-hidden
      >
        {size && paths && files
          ? paths.map((path, i) => (
              <Particle
                key={`ship-${i}`}
                path={path}
                index={i}
                onComplete={handleParticleComplete}
                variant="ships"
                shipFile={files[i]!}
              />
            ))
          : null}
      </div>
    </MotionConfig>
  );
}

export default function HeroFloatingParticles({
  variant = "original",
  shipCountOverride,
  shipMotionMode = "horizontal",
}: {
  variant?: "original" | "ships";
  shipCountOverride?: number;
  shipMotionMode?: ShipMotionMode;
}) {
  if (variant === "original") {
    return <HeroOriginalDiagonalDots />;
  }

  return <ShipsFloatingParticles countOverride={shipCountOverride} motionMode={shipMotionMode} />;
}
