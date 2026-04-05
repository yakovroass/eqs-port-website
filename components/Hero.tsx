"use client";

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
 * מובייל: ~86%–96% — צעד אחד יחסי צר יותר מקודם, עדיין מעל רצפה בטוחה לטקסט.
 */
const HERO_PILL_MOBILE_WIDTH_BY_SLOT = [
  "max-sm:w-[96%] max-sm:max-w-none",
  "max-sm:w-[89%] max-sm:max-w-none",
  "max-sm:w-[94%] max-sm:max-w-none",
  "max-sm:w-[87%] max-sm:max-w-none",
  "max-sm:w-[96%] max-sm:max-w-none",
  "max-sm:w-[90%] max-sm:max-w-none",
  "max-sm:w-[92%] max-sm:max-w-none",
  "max-sm:w-[86%] max-sm:max-w-none",
  "max-sm:w-[96%] max-sm:max-w-none",
  "max-sm:w-[88%] max-sm:max-w-none",
  "max-sm:w-[91%] max-sm:max-w-none",
  "max-sm:w-[93%] max-sm:max-w-none",
] as const;

function heroPillMobileWidthClass(sequentialIndex: number) {
  return HERO_PILL_MOBILE_WIDTH_BY_SLOT[sequentialIndex % HERO_PILL_MOBILE_WIDTH_BY_SLOT.length]!;
}

/** דסקטופ עברית: רוחב יחסי בתא (~75%–92%). */
const HERO_PILL_WIDTH_CLASSES = [
  "sm:w-[min(100%,92%)]",
  "sm:w-[min(100%,77%)]",
  "sm:w-[min(100%,86%)]",
  "sm:w-[min(100%,81%)]",
  "sm:w-[min(100%,90%)]",
  "sm:w-[min(100%,75%)]",
  "sm:w-[min(100%,85%)]",
  "sm:w-[min(100%,79%)]",
  "sm:w-[min(100%,89%)]",
  "sm:w-[min(100%,76%)]",
  "sm:w-[min(100%,87%)]",
  "sm:w-[min(100%,83%)]",
] as const;

/** דסקטופ אנגלית: עוד ~6–8 נקודות צר יותר — אין צורך ברוחב מלא של התא. */
const HERO_PILL_WIDTH_CLASSES_EN = [
  "sm:w-[min(100%,86%)]",
  "sm:w-[min(100%,72%)]",
  "sm:w-[min(100%,80%)]",
  "sm:w-[min(100%,75%)]",
  "sm:w-[min(100%,84%)]",
  "sm:w-[min(100%,70%)]",
  "sm:w-[min(100%,78%)]",
  "sm:w-[min(100%,73%)]",
  "sm:w-[min(100%,82%)]",
  "sm:w-[min(100%,71%)]",
  "sm:w-[min(100%,79%)]",
  "sm:w-[min(100%,76%)]",
] as const;

function heroPillWidthSmUp(sequentialIndex: number, lang: "en" | "he") {
  const pool = lang === "en" ? HERO_PILL_WIDTH_CLASSES_EN : HERO_PILL_WIDTH_CLASSES;
  const n = pool.length;
  return pool[(sequentialIndex * 7 + 4) % n]!;
}

export default function Hero() {
  const { lang, dir } = useLanguage();
  const leads = t.hero.subLeadLines[lang];
  const capabilityItems = t.hero.capabilityItems[lang];
  /** פאץ׳ בתוך גריד — רוחב משתנה קלות לפי אינדקס, ממורכז בתא */
  const heroPillClass =
    "flex min-w-0 max-w-full flex-col items-center justify-center rounded-md sm:rounded-lg border border-white/[0.07] bg-gradient-to-b from-white/[0.06] to-transparent px-2 py-1.5 max-sm:px-2 sm:px-2.5 sm:py-1.5 text-center text-[10px] min-[380px]:text-[11px] sm:text-xs font-medium text-gray-200/95 leading-snug sm:leading-snug backdrop-blur-sm shadow-[0_2px_14px_rgba(0,0,0,0.14)] sm:shadow-[0_3px_18px_rgba(0,0,0,0.16)] transition-[border-color,background-color,box-shadow] duration-200 hover:border-accent/30 hover:shadow-[0_5px_22px_rgba(56,189,248,0.07)] whitespace-normal text-balance break-words [overflow-wrap:anywhere] [word-break:break-word] box-border";

  return (
    <section
      id="hero"
      className="relative flex min-h-screen w-full min-w-0 items-center justify-center pt-[calc(4.75rem+1rem)] pb-8 max-sm:pb-6 sm:pt-[calc(5.5rem+2.5rem)] sm:pb-14 md:pt-[calc(5.5rem+3.5rem)] md:pb-16"
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
          className="mb-12 max-sm:mb-[4.25rem] mt-5 max-sm:mt-3 sm:mb-12 md:mb-14 sm:mt-6 md:mt-8 max-w-full px-2 sm:px-3 font-black tracking-tight"
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

        {/* פאצ׳ים: 12 פריטים; מובייל 2 עמודות, מ־sm ומעלה 3 עמודות (כמו קודם — בלי 4 עמודות ב־lg) */}
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
                ? "mx-auto grid w-full min-w-0 max-w-6xl sm:max-w-[min(100%,36rem)] md:max-w-[min(100%,40rem)] lg:max-w-[min(100%,44rem)] grid-cols-[repeat(2,minmax(0,1fr))] justify-items-center gap-1.5 sm:grid-cols-[repeat(3,minmax(0,1fr))] sm:gap-3 md:gap-4 px-0.5 [overflow-wrap:anywhere] [&>*]:min-w-0"
                : "mx-auto grid w-full min-w-0 max-w-[min(100%,22rem)] min-[400px]:max-w-[min(100%,26rem)] sm:max-w-[min(100%,34rem)] md:max-w-[min(100%,38rem)] lg:max-w-[min(100%,42rem)] grid-cols-[repeat(2,minmax(0,1fr))] justify-items-center gap-1 sm:grid-cols-[repeat(3,minmax(0,1fr))] sm:gap-3 md:gap-4 px-0.5 [overflow-wrap:anywhere] [&>*]:min-w-0"
            }
          >
            {leads.map((line, i) => (
              <span
                key={`lead-${line}`}
                className={`${heroPillClass} ${heroPillMobileWidthClass(i)} ${heroPillWidthSmUp(i, lang)}`}
              >
                {line}
              </span>
            ))}
            {capabilityItems.map((item, i) => (
              <span
                key={`hero-cap-${i}`}
                className={`${heroPillClass} ${heroPillMobileWidthClass(i + leads.length)} ${heroPillWidthSmUp(i + leads.length, lang)}`}
              >
                {item}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Stats — אותה רשת כמו שלוש שורות התת־כותרת */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75 }}
          className="grid grid-cols-3 gap-2 max-w-3xl mx-auto sm:gap-6 md:gap-10 lg:gap-12 mb-12 sm:mb-14 w-full justify-items-center px-0.5 sm:px-0 max-sm:mt-1"
        >
          {[
            { value: 3000, suffix: "+", label: tx(t.hero.stat1Label, lang) },
            { value: 100, suffix: "+", label: tx(t.hero.stat2Label, lang) },
            { value: 50, suffix: "%", label: tx(t.hero.stat3Label, lang) },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center w-full min-w-0 px-0.5 sm:px-4">
              <div className="w-full text-center text-[clamp(1.72rem,6.35vw,2.9rem)] sm:text-4xl md:text-5xl lg:text-6xl font-bold tabular-nums leading-none">
                <AnimatedCounter
                  target={stat.value}
                  suffix={stat.suffix}
                  duration={2.5}
                  className="gradient-text inline-block font-bold tabular-nums"
                />
              </div>
              <div className="w-full max-w-full text-center text-[11px] min-[360px]:text-xs min-[400px]:text-[13px] sm:text-2xl md:text-3xl text-gray-300 mt-1.5 max-sm:mt-2 sm:mt-2 tracking-wide leading-snug sm:leading-snug px-0 sm:px-2 hyphens-none text-balance">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
