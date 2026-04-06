/**
 * משטח זכוכית אחיד לכפתורי שפה + תפריט (אותו border, רקע, הילה slate).
 */
const navChromeBase =
  "border border-gray-600/45 glass-card ring-1 ring-inset ring-white/[0.07]";

export const navChromeSurface =
  `${navChromeBase} shadow-[0_4px_22px_rgba(0,0,0,0.22),0_0_44px_rgba(100,116,139,0.16)]`;

/** הילה חיצונית עדינה (בהשראת כפתור החץ, קטנה יותר) — על גוף הכפתור */
export const navChromeSurfaceMenuGlow =
  `${navChromeBase} shadow-[0_4px_22px_rgba(0,0,0,0.22),0_0_36px_rgba(100,116,139,0.12),0_0_11px_rgba(148,163,184,0.2),0_0_20px_rgba(100,116,139,0.08)]`;

export const navChromeButton =
  `${navChromeSurface} rounded-lg transition-colors hover:bg-white/[0.07] hover:border-gray-500/55`;

export const navChromeMenuButton =
  `${navChromeSurfaceMenuGlow} rounded-lg transition-colors hover:bg-white/[0.07] hover:border-gray-500/55`;
