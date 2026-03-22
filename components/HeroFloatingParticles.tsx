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
 * אוניות SVG מהגלריה — מסלולים חוצי מסך בכיוונים אקראיים (קצה↔קצה),
 * התחלה פזורה לאורך המקטע (כולל מרכז) כדי שלא ייכנסו כולן מהדופן בכל ריענון.
 * (רקע חי בדף הבית + /bg-demos)
 */
/** אוניות במקביל — וריאנטי מכולות שונים מסתובבים בין קבצי SVG */
const SHIP_COUNT = 14;

/** מהירות שיוט (px/s) — נמוך = איטי יותר */
const SHIP_SAIL_SPEED_PX_PER_SEC = 2.05;

/** הפרדה בין מסלולים (מותאם לריבוי אוניות SVG) */
function shipPathSeparationOpts(w: number, h: number) {
  const m = Math.min(w, h);
  return {
    minSegClear: Math.max(154, m * 0.205),
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

/** נקודות צפות ב־Hero — 4 נקודות כמו במקור */
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

/** הפרדות מסלול לאוניות — כמו לפני, רק עם כיוון אקראי ולא “שמאל–ימין” בלבד */
function shipThresholds(w: number, h: number) {
  const m = Math.min(w, h);
  const sep = shipPathSeparationOpts(w, h);
  return {
    minCross: Math.max(120, m * 0.22),
    segClear: Math.max(sep.minSegClear, m * 0.09),
    endClear: Math.max(56, m * 0.06),
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

function generatePathAvoidingCore(
  w: number,
  h: number,
  others: Segment[],
  variant: number,
  th: { minCross: number; segClear: number; endClear: number },
): Path {
  const pad = 14;
  const { minCross, segClear, endClear } = th;

  let best: Path | null = null;
  let bestScore = -1;

  for (let attempt = 0; attempt < 110; attempt++) {
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

function generateShipPathAvoiding(
  w: number,
  h: number,
  others: Segment[],
  variant: number,
): Path {
  return generatePathAvoidingCore(
    w,
    h,
    others,
    variant,
    shipThresholds(w, h),
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

/** נקודות Hero: כניסה/יציאה מדפנות שונות — אלכסונים אקראיים (לא רק שמאל↔ימין) */
function generateDotPathAvoiding(
  w: number,
  h: number,
  others: Segment[],
  variant: number,
): Path {
  const pad = 14;
  const m = Math.min(w, h);
  const minCross = Math.max(88, m * 0.17);
  const segClear = Math.max(38, m * 0.052);
  const endClear = Math.max(26, m * 0.038);

  let best: Path | null = null;
  let bestScore = -1;

  for (let attempt = 0; attempt < 120; attempt++) {
    const { from, to } = randomCandidate(w, h, pad);
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
  const acc: Path[] = [];
  for (let i = 0; i < ORIGINAL_DOT_COUNT; i++) {
    const others: Segment[] = acc.map((p) => ({ from: p.from, to: p.to }));
    acc.push(generateDotPathAvoiding(w, h, others, i * 31 + 17));
  }
  return acc;
}

function generateAllPaths(w: number, h: number): Path[] {
  const acc: Path[] = [];
  for (let i = 0; i < SHIP_COUNT; i++) {
    const others: Segment[] = acc.map((p) => ({ from: p.from, to: p.to }));
    acc.push(generateShipPathAvoiding(w, h, others, i * 19 + 7));
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
      className="pointer-events-none select-none overflow-visible"
      style={{
        width: "clamp(4rem, 15vw, 7.25rem)",
        aspectRatio: "1580 / 330",
        transform: `translate(-50%, -50%) rotate(${headingDeg}deg)`,
      }}
    >
      <object
        type="image/svg+xml"
        data={data}
        className="block h-full w-full opacity-[0.9] bg-transparent [background:transparent]"
        aria-hidden
        tabIndex={-1}
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
        const nextPath = generateDotPathAvoiding(
          sw,
          sh,
          others,
          i * 31 + Math.floor(Math.random() * 40),
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
    const init = generateAllPaths(sw, sh).map((p) =>
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
        const others: Segment[] = prev
          .filter((_, j) => j !== i)
          .map((p) => ({ from: p.from, to: p.to }));
        const nextPathRaw = generateShipPathAvoiding(
          sw,
          sh,
          others,
          i * 23 + Math.floor(Math.random() * 60),
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
