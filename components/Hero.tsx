"use client";

import { motion } from "framer-motion";
import AnimatedCounter from "./AnimatedCounter";
import { useLanguage, tx } from "@/lib/useLanguage";
import { t } from "@/lib/translations";

const HERO_EN_PERMITS_IDX = t.hero.capabilityItems.en.indexOf("Permits and logistics operations");

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
 * מובייל: וריאציה עדינה בלבד — רצפה ~92% כדי שלא יידרש רוחב צר שגורם לגלישה/שבירה אגרסיבית.
 */
const HERO_PILL_MOBILE_BY_INDEX = [
  "max-sm:w-[min(100%,100%)]",
  "max-sm:w-[min(100%,94%)]",
  "max-sm:w-[min(100%,92%)]",
  "max-sm:w-[min(100%,100%)]",
  "max-sm:w-[min(100%,96%)]",
  "max-sm:w-[min(100%,93%)]",
  "max-sm:w-[min(100%,92%)]",
  "max-sm:w-[min(100%,100%)]",
  "max-sm:w-[min(100%,95%)]",
  "max-sm:w-[min(100%,92%)]",
  "max-sm:w-[min(100%,94%)]",
  "max-sm:w-[min(100%,100%)]",
] as const;

/** דסקטופ: טווח רחב יותר בין פאץ' לפאץ' (רצפה ~82%) — עדיין מעל רוחב שגורם לגלישה */
const HERO_PILL_WIDTH_CLASSES = [
  "sm:w-[min(100%,100%)]",
  "sm:w-[min(100%,84%)]",
  "sm:w-[min(100%,94%)]",
  "sm:w-[min(100%,88%)]",
  "sm:w-[min(100%,98%)]",
  "sm:w-[min(100%,82%)]",
  "sm:w-[min(100%,93%)]",
  "sm:w-[min(100%,86%)]",
  "sm:w-[min(100%,97%)]",
  "sm:w-[min(100%,83%)]",
  "sm:w-[min(100%,95%)]",
  "sm:w-[min(100%,90%)]",
] as const;

/** מובייל: אותה בריכת רוחבים לשתי השפות + מיפוי (×7+4) כמו בדסקטופ — נראה רנדומלי, לא לפי סדר שורות */
function heroPillWidthMobile(sequentialIndex: number) {
  const n = HERO_PILL_MOBILE_BY_INDEX.length;
  return HERO_PILL_MOBILE_BY_INDEX[(sequentialIndex * 7 + 4) % n]!;
}

function heroPillWidthSmUp(sequentialIndex: number) {
  const n = HERO_PILL_WIDTH_CLASSES.length;
  return HERO_PILL_WIDTH_CLASSES[(sequentialIndex * 7 + 4) % n]!;
}

export default function Hero() {
  const { lang, dir } = useLanguage();
  const leads = t.hero.subLeadLines[lang];
  const capabilityItems = t.hero.capabilityItems[lang];
  /** פאץ׳ בתוך גריד — רוחב משתנה קלות לפי אינדקס, ממורכז בתא */
  const heroPillClass =
    "inline-flex min-w-0 max-w-full flex-col items-center justify-center rounded-md sm:rounded-lg border border-white/[0.07] bg-gradient-to-b from-white/[0.06] to-transparent px-2 py-1.5 max-sm:px-2.5 sm:px-2.5 sm:py-1.5 text-center text-[9px] min-[380px]:text-[10px] sm:text-xs font-medium text-gray-200/95 leading-snug sm:leading-snug backdrop-blur-sm shadow-[0_2px_14px_rgba(0,0,0,0.14)] sm:shadow-[0_3px_18px_rgba(0,0,0,0.16)] transition-[border-color,background-color,box-shadow] duration-200 hover:border-accent/30 hover:shadow-[0_5px_22px_rgba(56,189,248,0.07)] whitespace-normal text-balance break-words [overflow-wrap:anywhere] [word-break:break-word]";

  return (
    <section id="hero" className="relative min-h-screen w-full min-w-0 flex items-center justify-center py-6 max-sm:py-4 sm:py-8">
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
          className="mb-12 max-sm:mb-[4.25rem] mt-5 max-sm:mt-3 sm:mb-12 md:mb-14 sm:mt-20 lg:mt-0 max-w-full px-2 sm:px-3 font-black tracking-tight"
        >
          {/* מתחת ל־sm בלבד: עברית בשורה אחת; באנגלית שתי שורות */}
          {lang === "he" ? (
            <div className="sm:hidden leading-[1.08] font-black tracking-tight px-0.5">
              <span className="gradient-text block w-full text-center whitespace-nowrap text-[clamp(1.85rem,9vw,3.65rem)] [overflow-wrap:normal]">
                {tx(t.hero.headline2, lang)}
              </span>
            </div>
          ) : (
            <div className="sm:hidden flex flex-col gap-0.5 leading-[1.08] font-black tracking-tight">
              <span className="gradient-text block max-w-full break-words text-balance text-[clamp(1.9rem,9.5vw,3.35rem)]">
                {tx(t.hero.headlineMobileLine1, lang)}
              </span>
              <span className="gradient-text block max-w-full break-words text-balance text-[clamp(1.9rem,9.5vw,3.35rem)]">
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
          className="mx-auto w-full max-w-6xl mb-11 max-sm:mb-12 sm:mb-10"
        >
          <div
            dir={dir}
            className={
              lang === "en"
                ? "mx-auto grid w-full min-w-0 max-w-6xl grid-cols-2 justify-items-center gap-1.5 sm:grid-cols-3 sm:gap-2 px-0.5 [overflow-wrap:anywhere]"
                : "mx-auto grid w-full min-w-0 max-w-[min(100%,22rem)] min-[400px]:max-w-[min(100%,26rem)] sm:max-w-[min(100%,34rem)] md:max-w-[min(100%,38rem)] lg:max-w-[min(100%,42rem)] grid-cols-2 justify-items-center gap-1 sm:grid-cols-3 sm:gap-2 px-0.5 [overflow-wrap:anywhere]"
            }
          >
            {leads.map((line, i) => (
              <span
                key={`lead-${line}`}
                className={`${heroPillClass} ${heroPillWidthMobile(i)} ${heroPillWidthSmUp(i)}`}
              >
                {line}
              </span>
            ))}
            {capabilityItems.map((item, i) => (
              <span
                key={`hero-cap-${i}`}
                className={`${heroPillClass} ${heroPillWidthMobile(i + leads.length)} ${heroPillWidthSmUp(i + leads.length)}`}
              >
                {lang === "en" && i === HERO_EN_PERMITS_IDX ? (
                  <>
                    <span className="sm:hidden">Permits and logistics Ops</span>
                    <span className="hidden sm:inline">{item}</span>
                  </>
                ) : (
                  item
                )}
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
