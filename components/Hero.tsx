"use client";

import type { CSSProperties } from "react";
import { motion } from "framer-motion";
import AnimatedCounter from "./AnimatedCounter";
import { useLanguage, tx } from "@/lib/useLanguage";
import { t } from "@/lib/translations";

function GridBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* רקע רשת גלובלי ב־page — כאן בלי עיגול/הילה נפרדים */}
      {/* אוניות: שכבה גלובלית ב־page.tsx — כאן בלי נקודות כדי לא לכפול */}

      {/* Industrial silhouette overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-64 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='https://www.w3.org/2000/svg' viewBox='0 0 1200 200'%3E%3Cpath d='M0,200 L0,120 L80,120 L80,80 L100,80 L100,40 L110,40 L110,20 L115,20 L115,0 L120,0 L120,20 L125,20 L125,40 L135,40 L135,80 L155,80 L155,120 L200,120 L200,160 L300,160 L300,140 L320,140 L320,100 L340,100 L340,140 L360,140 L360,160 L500,160 L500,120 L520,120 L520,60 L530,60 L530,30 L540,30 L540,60 L550,60 L550,120 L570,120 L570,160 L700,160 L700,100 L720,100 L720,60 L730,60 L730,40 L740,40 L740,60 L750,60 L750,100 L770,100 L770,160 L900,160 L900,130 L950,130 L950,80 L960,80 L960,50 L970,50 L970,80 L980,80 L980,130 L1030,130 L1030,160 L1200,160 L1200,200 Z' fill='%2333bbff'/%3E%3C/svg%3E")`,
          backgroundSize: "cover",
          backgroundPosition: "bottom",
        }}
      />

    </div>
  );
}

/**
 * מדד «כמה טקסט יש» — תווים + משקל למילים (רווחים), עברית מעט רחבה יותר ויזואלית.
 */
function heroPillTextBulk(label: string, lang: "en" | "he"): number {
  const chars = Array.from(label).length;
  const words = label.trim().split(/\s+/).filter(Boolean).length;
  const bulk = chars + words * 2;
  return lang === "he" ? bulk * 1.08 : bulk;
}

/**
 * ווב (גריד 4×3): רוחב לפי עמודה + שורה — דפוס קבוע, לא מדורג, נראה אקראי.
 * סדר DOM: שורה 0 = סלוטים 0–3, שורה 1 = 4–7, שורה 2 = 8–11.
 */
const HERO_PILL_LG_COL_HE = [
  [94, 78, 100],
  [80, 96, 76],
  [100, 84, 88],
  [77, 90, 82],
] as const;

const HERO_PILL_LG_COL_EN = [
  [92, 76, 100],
  [79, 95, 74],
  [100, 82, 86],
  [75, 91, 80],
] as const;

function heroPillLgWidthPercent(slotIndex: number, lang: "en" | "he"): number {
  const col = slotIndex % 4;
  const row = Math.floor(slotIndex / 4);
  const table = lang === "he" ? HERO_PILL_LG_COL_HE : HERO_PILL_LG_COL_EN;
  return table[col]![row]!;
}

/** היסט לפי סלוט — רק sm (טאבלט); lg מגיע מדפוס העמודות */
const HERO_PILL_SLOT_SM_HE = [0, 8, 2, 10, -2, 9, 1, 7, 4, 9, -1, 6] as const;
const HERO_PILL_SLOT_SM_EN = [-1, 8, 1, 10, -2, 9, 0, 8, 3, 9, -1, 7] as const;

/**
 * מובייל: נוסחה רכה בלבד (ללא שינוי מהותי מול הבקשה הקודמת).
 * sm: לפי אורך טקסט + היסט סלוט.
 * lg: אחוזים קבועים לפי עמודה/שורה (רנדומלי־נראה).
 */
function heroPillWidthVars(
  label: string,
  lang: "en" | "he",
  slotIndex: number,
): { "--hero-pill-w-mobile": string; "--hero-pill-w-sm": string; "--hero-pill-w-lg": string } {
  const v = heroPillTextBulk(label, lang);
  const rawT = Math.min(1, Math.max(0, (v - 8) / 28));
  const t = rawT * rawT * 0.45 + rawT * 0.55;
  const i = slotIndex % 12;

  const rawTM = Math.min(1, Math.max(0, (v - 14) / 40));
  const jitterM = ((slotIndex * 19 + Math.round(v * 2)) % 5) - 2;
  let mobile = 86 + rawTM * 10 + jitterM * 0.4;
  mobile = Math.min(98, Math.max(84, mobile));

  let sm: number;
  if (lang === "he") {
    sm = 75 + t * 25 + HERO_PILL_SLOT_SM_HE[i]!;
    sm = Math.min(98, Math.max(75, sm));
  } else {
    sm = 70 + t * 27 + HERO_PILL_SLOT_SM_EN[i]!;
    sm = Math.min(97, Math.max(70, sm));
  }

  const lg = heroPillLgWidthPercent(slotIndex, lang);

  const r = (n: number) => `${Math.round(n)}%`;
  return {
    "--hero-pill-w-mobile": r(mobile),
    "--hero-pill-w-sm": r(sm),
    "--hero-pill-w-lg": r(lg),
  };
}

export default function Hero() {
  const { lang, dir } = useLanguage();
  const leads = t.hero.subLeadLines[lang];
  const capabilityItems = t.hero.capabilityItems[lang];
  /** פאץ׳: גובה אחיד רק ב־lg — נמוך יותר (לא «עבה» מדי) */
  const heroPillClass =
    "flex min-w-0 max-w-full flex-col items-center justify-center rounded-md sm:rounded-lg border border-white/[0.07] bg-gradient-to-b from-white/[0.06] to-transparent px-2 py-1.5 max-sm:px-2 sm:px-2.5 sm:py-1.5 backdrop-blur-sm shadow-[0_2px_14px_rgba(0,0,0,0.14)] sm:shadow-[0_3px_18px_rgba(0,0,0,0.16)] transition-[border-color,background-color,box-shadow] duration-200 hover:border-accent/30 hover:shadow-[0_5px_22px_rgba(56,189,248,0.07)] box-border lg:h-[2.6rem] lg:max-h-[2.6rem] lg:overflow-hidden lg:py-1 lg:px-2";
  const heroPillTextClass =
    "w-full text-center text-[11px] min-[380px]:text-[12px] sm:text-[13px] font-medium text-gray-200/95 leading-snug sm:leading-snug whitespace-normal text-balance break-words [overflow-wrap:anywhere] [word-break:break-word] lg:line-clamp-2 lg:leading-tight lg:text-[13.5px]";

  const heroStatsGridClass =
    "grid grid-cols-2 gap-x-3 gap-y-5 max-w-xl sm:max-w-xl md:max-w-2xl mx-auto sm:gap-x-8 sm:gap-y-5 md:gap-x-10 md:gap-y-6 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-0 xl:gap-x-8 mb-12 sm:mb-11 md:mb-12 w-full justify-items-center px-1 sm:px-0 max-sm:mt-1";
  const heroStatsGridLgMax =
    lang === "en" ? "lg:max-w-[min(100%,58.5rem)]" : "lg:max-w-[min(100%,56rem)]";

  return (
    <section
      id="hero"
      className="relative flex min-h-screen w-full min-w-0 items-center justify-center pt-[calc(4.75rem+1rem)] pb-8 max-sm:pb-6 sm:pt-[calc(5.5rem+1rem)] sm:pb-14 md:pt-[calc(5.5rem+1.5rem)] md:pb-16"
    >
      <GridBackground />
      <div className="relative z-10 w-full min-w-0 max-w-7xl mx-auto text-center px-4 max-sm:ps-[max(1rem,env(safe-area-inset-left))] max-sm:pe-[max(1rem,env(safe-area-inset-right))] sm:px-6 lg:px-8 flex flex-col justify-center">
        {/* בעברית: רוחב מלא לכותרת רק במובייל (מתחת ל־sm); מ־sm עמודה צרה כמו קודם */}
        <div
          className={
            lang === "he"
              ? "mx-auto w-full max-sm:max-w-full sm:max-w-[min(100%,34rem)] md:max-w-[min(100%,38rem)] lg:max-w-[min(100%,42rem)]"
              : "w-full"
          }
        >
        {/* Headline — כותרת אחת (ללא תג מעל הכותרת) */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mb-12 max-sm:mb-[4.25rem] mt-5 max-sm:mt-3 sm:mb-10 md:mb-12 sm:mt-2 md:mt-3 max-w-full px-2 sm:px-3 font-black tracking-tight"
        >
          {/* מתחת ל־sm בלבד: עברית בשורה אחת; באנגלית שתי שורות */}
          {lang === "he" ? (
            <div className="sm:hidden w-full min-w-0 max-w-full leading-[1.08] font-black tracking-tight px-1">
              <span className="gradient-text block w-full min-w-0 max-w-full text-center whitespace-nowrap text-[clamp(1.28rem,7.15vw,3.5rem)] [overflow-wrap:normal]">
                {tx(t.hero.headline2, lang)}
              </span>
            </div>
          ) : (
            <div className="sm:hidden flex w-full min-w-0 max-w-full flex-col gap-0.5 leading-[1.08] font-black tracking-tight px-0.5">
              <span className="gradient-text block min-w-0 max-w-full break-words text-balance text-[clamp(1.65rem,8.5vw,3.35rem)]">
              {tx(t.hero.headlineMobileLine1, lang)}
            </span>
              <span className="gradient-text block min-w-0 max-w-full break-words text-balance text-[clamp(1.65rem,8.5vw,3.35rem)]">
              {tx(t.hero.headlineMobileLine2, lang)}
            </span>
          </div>
          )}
          {/* מ־sm ומעלה: דסקטופ/טאבלט — לא משתמש בפריסת «שורה אחת» של המובייל */}
          <div className="hidden sm:block max-w-[min(100%,56rem)] mx-auto text-4xl md:text-5xl lg:text-6xl xl:text-6xl leading-[1.06] font-black">
            {tx(t.hero.headline1, lang).trim() ? (
              <>
                <span className="block break-words text-balance text-white">{tx(t.hero.headline1, lang)}</span>
                <span className="block break-words text-balance gradient-text">{tx(t.hero.headline2, lang)}</span>
              </>
            ) : lang === "en" ? (
              <span className="gradient-text block max-w-full break-words text-balance text-4xl md:text-5xl lg:text-6xl xl:text-[clamp(2.85rem,4.5vw,3.65rem)] lg:whitespace-nowrap lg:break-normal">
                {tx(t.hero.headline2, lang)}
              </span>
            ) : (
              <span className="gradient-text block break-words text-balance">{tx(t.hero.headline2, lang)}</span>
            )}
          </div>
        </motion.h1>
        </div>

        {/* פאצ׳ים: מובייל 2 עמודות; sm–md 3; מ־lg (ווב) 4 עמודות + max-w מורחב כדי לשמור גודל פאצ׳ דומה */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="mx-auto w-full min-w-0 max-w-6xl mb-11 max-sm:mb-12 sm:mb-10 overflow-x-clip"
        >
          <div
            dir={dir}
            className={
              lang === "en"
                ? "mx-auto grid w-full min-w-0 max-w-6xl sm:max-w-[min(100%,36rem)] md:max-w-[min(100%,40rem)] lg:max-w-[min(100%,58.5rem)] grid-cols-[repeat(2,minmax(0,1fr))] justify-items-center gap-1.5 sm:grid-cols-[repeat(3,minmax(0,1fr))] lg:grid-cols-[repeat(4,minmax(0,1fr))] sm:gap-3 md:gap-4 px-0.5 [overflow-wrap:anywhere] [&>*]:min-w-0"
                : "mx-auto grid w-full min-w-0 max-w-[min(100%,22rem)] min-[400px]:max-w-[min(100%,26rem)] sm:max-w-[min(100%,34rem)] md:max-w-[min(100%,38rem)] lg:max-w-[min(100%,56rem)] grid-cols-[repeat(2,minmax(0,1fr))] justify-items-center gap-1 sm:grid-cols-[repeat(3,minmax(0,1fr))] lg:grid-cols-[repeat(4,minmax(0,1fr))] sm:gap-3 md:gap-4 px-0.5 [overflow-wrap:anywhere] [&>*]:min-w-0"
            }
          >
            {leads.map((line, i) => (
              <span
                key={`lead-${line}`}
                className={`${heroPillClass} hero-pill-w`}
                style={heroPillWidthVars(line, lang, i) as CSSProperties}
              >
                <span className={heroPillTextClass}>{line}</span>
              </span>
            ))}
            {capabilityItems.map((item, i) => (
              <span
                key={`hero-cap-${i}`}
                className={`${heroPillClass} hero-pill-w`}
                style={heroPillWidthVars(item, lang, i + leads.length) as CSSProperties}
              >
                <span className={heroPillTextClass}>{item}</span>
              </span>
            ))}
          </div>
        </motion.div>

        {/* Stats — מובייל 2×2; מ־lg שורה אחת של 4 עמודות; max-w ב־lg כמו גריד הפאצ׳ים לפי שפה */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75 }}
          className={`${heroStatsGridClass} ${heroStatsGridLgMax}`}
        >
          {[
            { value: 3000, suffix: "+", label: tx(t.hero.stat1Label, lang) },
            { value: 100, suffix: "+", label: tx(t.hero.stat2Label, lang) },
            { value: 50, suffix: "%", label: tx(t.hero.stat3Label, lang) },
            { value: 30, suffix: "%", label: tx(t.hero.stat4Label, lang) },
          ].map((stat, i) => (
            <div key={`hero-stat-${i}`} className="flex flex-col items-center w-full min-w-0 px-0.5 sm:px-3">
              <div className="w-full text-center text-[clamp(1.72rem,6.35vw,2.9rem)] sm:text-3xl md:text-4xl lg:text-5xl font-bold tabular-nums leading-none">
                <AnimatedCounter
                  target={stat.value}
                  suffix={stat.suffix}
                  duration={2.5}
                  className="gradient-text inline-block font-bold tabular-nums"
                />
              </div>
              <div className="w-full max-w-full text-center text-[11px] min-[360px]:text-xs min-[400px]:text-[13px] sm:text-base md:text-lg max-lg:text-balance text-gray-300 mt-1.5 max-sm:mt-2 sm:mt-1.5 tracking-wide leading-tight sm:leading-snug px-0 sm:px-1 hyphens-none lg:text-sm xl:text-base lg:leading-tight">
                <span className="block w-full whitespace-pre-line lg:hidden">{stat.label}</span>
                <span className="hidden lg:block w-full min-w-0 max-w-full whitespace-nowrap text-center lg:px-0.5">
                  {stat.label.replace(/\n/g, " ")}
                </span>
              </div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
