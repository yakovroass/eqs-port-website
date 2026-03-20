"use client";

import { motion } from "framer-motion";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";

/**
 * 4 אניות במקביל — מסלולים חוצי מסך, יציאה מחוץ למסך, ללא התנגשות.
 * (מוצג ב־/bg-demos בלבד.)
 */
const SHIP_COUNT = 25;

const DOT = 6;
/** כניסה/יציאה מחוץ למסך דרך הדפנות */
const EDGE_OFFSCREEN_PX = 4;

/** תנועה איטית */
const DURATION_MIN_SEC = 220;
const DURATION_MAX_SEC = 320;

/** נקודות צפות ב־Hero בלבד: 4 נקודות, אלכסונים אקראיים, ללא התנגשויות */
const ORIGINAL_DOT_COUNT = 4;
const ORIGINAL_DOT_SPEED_PX_PER_SEC = 5;

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

function thresholds(w: number, h: number) {
  const m = Math.min(w, h);
  return {
    minCross: Math.max(120, m * 0.22),
    segClear: Math.max(52, m * 0.065),
    endClear: Math.max(36, m * 0.048),
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

function generatePathAvoiding(
  w: number,
  h: number,
  others: Segment[],
  variant: number,
): Path {
  const pad = 14;
  const { minCross, segClear, endClear } = thresholds(w, h);

  let best: Path | null = null;
  let bestScore = -1;

  for (let attempt = 0; attempt < 90; attempt++) {
    const { from, to } = randomCandidate(w, h, pad);
    if (dist(from, to) < minCross) continue;

    const dSeg = minDistToOthers(from, to, others);
    const dEnd = minEndpointClearance(from, to, others);
    const score = Math.min(dSeg, dEnd * 0.85);

    if (dSeg >= segClear && dEnd >= endClear) {
      return pathWithScreenExit(
        from,
        to,
        w,
        h,
        `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        randomRange(DURATION_MIN_SEC, DURATION_MAX_SEC),
      );
    }
    if (score > bestScore) {
      bestScore = score;
      best = pathWithScreenExit(
        from,
        to,
        w,
        h,
        `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        randomRange(DURATION_MIN_SEC, DURATION_MAX_SEC),
      );
    }
  }

  if (best && bestScore > segClear * 0.45) return best;
  return fallbackPath(w, h, pad, variant);
}

function pickDiagonalCandidate(w: number, h: number, variant: number, bandIndex: number, bandCount: number): Segment {
  // 3 אזורי שיוט קבועים לאורך הדף כדי למנוע "אזורים ריקים"
  const minDelta = Math.max(100, Math.min(w, h) * 0.16);
  const bandTop = (bandIndex * h) / bandCount;
  const bandBottom = ((bandIndex + 1) * h) / bandCount;
  const bandPad = Math.max(20, (bandBottom - bandTop) * 0.14);
  const yMin = Math.max(24, bandTop + bandPad);
  const yMax = Math.min(h - 24, bandBottom - bandPad);
  const leftToRight = variant % 2 === 0;
  const y1 = randomRange(yMin, yMax);
  const dir = Math.random() > 0.5 ? 1 : -1;
  let y2 = y1 + dir * randomRange(minDelta, Math.max(minDelta + 16, (yMax - yMin) * 0.9));
  y2 = Math.max(yMin, Math.min(yMax, y2));
  if (Math.abs(y2 - y1) < minDelta * 0.62) {
    y2 = Math.max(yMin, Math.min(yMax, y1 + dir * minDelta));
  }
  return {
    from: { x: leftToRight ? -EDGE_OFFSCREEN_PX : w + EDGE_OFFSCREEN_PX, y: y1 },
    to: { x: leftToRight ? w + EDGE_OFFSCREEN_PX : -EDGE_OFFSCREEN_PX, y: y2 },
  };
}

function generateDiagonalPathAvoiding(
  w: number,
  h: number,
  others: Segment[],
  variant: number,
  bandIndex: number,
  bandCount: number,
): Path {
  const segClear = Math.max(74, Math.min(w, h) * 0.09);
  let best: Path | null = null;
  let bestScore = -1;
  for (let i = 0; i < 100; i++) {
    const c = pickDiagonalCandidate(w, h, variant + i, bandIndex, bandCount);
    const dSeg = minDistToOthers(c.from, c.to, others);
    const dEnd = minEndpointClearance(c.from, c.to, others);
    const score = Math.min(dSeg, dEnd * 0.9);
    const p = pathWithScreenExit(c.from, c.to, w, h, `${Date.now()}-${Math.random().toString(36).slice(2)}`, 160);
    if (dSeg >= segClear && dEnd >= segClear * 0.8) return p;
    if (score > bestScore) {
      best = p;
      bestScore = score;
    }
  }
  return best ?? fallbackPath(w, h, 16, variant);
}

function generateOriginalDotPaths(w: number, h: number): Path[] {
  const acc: Path[] = [];
  const bandCount = ORIGINAL_DOT_COUNT;
  for (let i = 0; i < ORIGINAL_DOT_COUNT; i++) {
    const others: Segment[] = acc.map((p) => ({ from: p.from, to: p.to }));
    const p = generateDiagonalPathAvoiding(w, h, others, i + 17, i, bandCount);
    acc.push({
      ...p,
      duration: dist(p.from, p.to) / ORIGINAL_DOT_SPEED_PX_PER_SEC,
    });
  }
  return acc;
}

function generateAllPaths(w: number, h: number): Path[] {
  const acc: Path[] = [];
  const bandCount = SHIP_COUNT;
  for (let i = 0; i < SHIP_COUNT; i++) {
    const others: Segment[] = acc.map((p) => ({ from: p.from, to: p.to }));
    acc.push(generateDiagonalPathAvoiding(w, h, others, i, i, bandCount));
  }
  return acc;
}

/** כיוון “קדימה” של האניה (מסך: +y למטה) */
function headingDegrees(from: Pt, to: Pt) {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  if (Math.abs(dx) < 1e-6 && Math.abs(dy) < 1e-6) return 0;
  return (Math.atan2(dy, dx) * 180) / Math.PI;
}

/** “אניה” קטנה במבט-על: גוף מוארך + חרטום + ירכתיים + פנסים + אלומות */
function ShipSprite({ headingDeg }: { headingDeg: number }) {
  const navStyle: CSSProperties = {
    width: 1.55,
    height: 1.55,
    minWidth: 1.55,
    minHeight: 1.55,
    borderRadius: 9999,
  };

  const beamForward: CSSProperties = {
    position: "absolute",
    left: "50%",
    top: "50%",
    width: 28,
    height: 2.8,
    transform: "translate(4.3px, -50%)",
    borderRadius: 2,
    background:
      "linear-gradient(90deg, rgba(224,242,254,0.35) 0%, rgba(0,168,255,0.1) 45%, transparent 100%)",
    boxShadow:
      "0 0 2px rgba(0,168,255,0.25), 0 0 5px rgba(0,168,255,0.1)",
    filter: "blur(0.45px)",
    opacity: 0.34,
    pointerEvents: "none",
  };

  return (
    <div
      className="relative h-0 w-0 overflow-visible"
      style={{
        transform: `translate(-50%, -50%) rotate(${headingDeg}deg)`,
      }}
    >
      {/* אלומה קדמית אחת — מאחורי הגוף והפנסים */}
      <div style={beamForward} aria-hidden />

      {/* פנס אדום — שמאל לכיוון ההפלגה */}
      <div
        className="absolute left-0 top-0 bg-red-500"
        style={{
          ...navStyle,
          transform: "translate(-50%, calc(-50% - 1.55px))",
          opacity: 1,
          zIndex: 0,
          boxShadow:
            "0 0 2px rgba(254,202,202,1), 0 0 6px rgba(248,113,113,0.98), 0 0 12px rgba(239,68,68,0.65), 0 0 20px rgba(239,68,68,0.34)",
        }}
        aria-hidden
      />

      {/* פנס ירוק — ימין */}
      <div
        className="absolute left-0 top-0 bg-emerald-400"
        style={{
          ...navStyle,
          transform: "translate(-50%, calc(-50% + 1.55px))",
          opacity: 1,
          zIndex: 0,
          boxShadow:
            "0 0 2px rgba(167,243,208,1), 0 0 6px rgba(52,211,153,0.98), 0 0 12px rgba(52,211,153,0.65), 0 0 20px rgba(52,211,153,0.34)",
        }}
        aria-hidden
      />

      {/* גוף אוניה מלמעלה — מוארך יותר וצר יותר */}
      <div
        className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: 17,
          height: 5.1,
          zIndex: 2,
          background:
            "linear-gradient(90deg, rgba(224,242,254,0.95) 0%, rgba(125,211,252,0.72) 38%, rgba(14,116,144,0.58) 100%)",
          clipPath: "polygon(0% 22%, 78% 15%, 100% 50%, 78% 85%, 0% 78%, 5% 50%)",
          boxShadow:
            "0 0 2px rgba(186,230,253,0.65), 0 0 7px rgba(0,168,255,0.26)",
          filter: "blur(0.12px)",
        }}
        aria-hidden
      />
      {/* גשר קטן במרכז האוניה (מבט לוויני) */}
      <div
        className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 rounded-sm"
        style={{
          width: 4,
          height: 1.85,
          zIndex: 3,
          background: "rgba(226,232,240,0.92)",
          boxShadow: "0 0 2px rgba(226,232,240,0.35)",
        }}
        aria-hidden
      />
      {/* חלק אחורי ארוך וצר */}
      <div
        className="absolute left-0 top-0 -translate-y-1/2 rounded-sm"
        style={{
          width: 5.1,
          height: 1.85,
          transform: "translate(-10.4px, -50%)",
          zIndex: 2,
          background:
            "linear-gradient(90deg, rgba(2,132,199,0.5) 0%, rgba(14,116,144,0.28) 100%)",
          boxShadow: "0 0 1px rgba(2,132,199,0.45)",
        }}
        aria-hidden
      />
    </div>
  );
}

function DotSprite() {
  return (
    <div
      className="h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[1px] bg-accent/45 shadow-[0_0_10px_rgba(0,168,255,0.65),0_0_4px_rgba(0,168,255,0.9)]"
      aria-hidden
    />
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
        const nextPath = generateDiagonalPathAvoiding(
          sw,
          sh,
          others,
          i + Math.floor(Math.random() * 40),
          i,
          ORIGINAL_DOT_COUNT,
        );
        const next = [...prev];
        next[i] = {
          ...nextPath,
          duration: dist(nextPath.from, nextPath.to) / ORIGINAL_DOT_SPEED_PX_PER_SEC,
        };
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
}: {
  path: Path;
  index: number;
  onComplete: (index: number) => void;
  variant: "original" | "ships";
}) {
  const headingDeg = headingDegrees(path.from, path.to);
  const handleDone = useCallback(() => {
    onComplete(index);
  }, [index, onComplete]);

  // תמיד מתחילים מהכניסה למסלול וחוצים את המסך עד היציאה
  const progress = 0;
  const fromX = path.from.x + (path.to.x - path.from.x) * progress;
  const fromY = path.from.y + (path.to.y - path.from.y) * progress;
  const duration = path.duration;
  const delay = 0;

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
      {variant === "ships" ? <ShipSprite headingDeg={headingDeg} /> : <DotSprite />}
    </motion.div>
  );
}

function ShipsFloatingParticles() {
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

  useEffect(() => {
    if (sw < 41 || sh < 41) return;
    const speedPxPerSec = 4;
    const init = generateAllPaths(sw, sh).map((p) => ({
      ...p,
      duration: dist(p.from, p.to) / speedPxPerSec,
    }));
    setPaths(init);
  }, [sw, sh]);

  const handleParticleComplete = useCallback(
    (i: number) => {
      if (sw < 41 || sh < 41) return;
      const speedPxPerSec = 4;
      setPaths((prev) => {
        if (!prev) return prev;
        const others: Segment[] = prev
          .filter((_, j) => j !== i)
          .map((p) => ({ from: p.from, to: p.to }));
        const nextPath = generateDiagonalPathAvoiding(
          sw,
          sh,
          others,
          i + Math.floor(Math.random() * 9),
          i,
          SHIP_COUNT,
        );
        const next = [...prev];
        next[i] = {
          ...nextPath,
          duration: dist(nextPath.from, nextPath.to) / speedPxPerSec,
        };
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
              key={`slot-${i}-${path.id}`}
              path={path}
              index={i}
              onComplete={handleParticleComplete}
              variant="ships"
            />
          ))
        : null}
    </div>
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
