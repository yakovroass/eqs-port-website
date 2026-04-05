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

export default function Hero() {
  const { lang, dir } = useLanguage();
  const leads = t.hero.subLeadLines[lang];
  const capabilityItems = t.hero.capabilityItems[lang];
  const capabilityPillClass =
    "inline-flex max-w-full min-w-0 shrink sm:shrink-0 sm:max-w-[min(100%,15rem)] md:max-w-[min(100%,16.5rem)] items-center justify-center rounded-md sm:rounded-lg border border-white/[0.07] bg-gradient-to-b from-white/[0.06] to-transparent px-1.5 py-1 sm:px-2.5 sm:py-1.5 text-center text-[9px] min-[380px]:text-[10px] sm:text-xs font-medium text-gray-200/95 leading-tight sm:leading-snug shadow-[0_2px_14px_rgba(0,0,0,0.14)] sm:shadow-[0_3px_18px_rgba(0,0,0,0.16)] backdrop-blur-sm transition-[border-color,background-color,box-shadow] duration-200 hover:border-accent/30 hover:shadow-[0_5px_22px_rgba(56,189,248,0.07)] text-balance";

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center">
      <GridBackground />
      <div className="relative z-10 w-full max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8">
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
          className="mb-7 mt-16 sm:mb-8 sm:mt-20 lg:mt-0 max-w-full px-2 sm:px-3 font-black tracking-tight"
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

        {/* תת-כותרת: שלוש שורות — אותה רשת כמו המונים; מחוץ לעמודה הצרה בעברית */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="mx-auto w-full max-w-6xl mb-7 sm:mb-10"
        >
          {/* שלוש עמודות כמו בדסקטופ; במובייל טקסט וריווחים מוקטנים כדי להימנע מגלילה */}
          <div className="grid grid-cols-3 gap-1.5 max-w-3xl mx-auto sm:gap-6 md:gap-10 lg:gap-12 mb-5 sm:mb-8 w-full justify-items-center px-0.5 sm:px-2 [overflow-wrap:anywhere]">
            {leads.map((line) => (
              <div key={line} className="flex w-full min-w-0 max-w-full flex-col items-center px-0.5 sm:px-1 md:px-3">
                <span
                  className={
                    lang === "en"
                      ? "w-full max-w-full text-center text-[8.5px] min-[360px]:text-[9px] sm:text-xs md:text-sm lg:text-base font-semibold text-white/95 leading-tight sm:leading-snug tracking-tight text-balance break-words hyphens-auto"
                      : "w-full max-w-full text-center text-[10px] min-[360px]:text-[11px] sm:text-sm md:text-base lg:text-lg font-semibold text-white/95 leading-tight sm:leading-snug tracking-tight text-balance break-words hyphens-auto"
                  }
                >
                  {line}
                </span>
              </div>
            ))}
          </div>

          {lang === "en" ? (
            <div
              dir={dir}
              className="flex w-full max-w-6xl flex-col items-center gap-1.5 sm:gap-2 px-0.5 mx-auto"
            >
              {/* מובייל: wrap בלי גלילה; מ־md: שתי שורות קבועות עם גלילה רק אם צריך */}
              <div className="w-full max-w-full overflow-x-visible md:overflow-x-auto md:[-webkit-overflow-scrolling:touch] md:[scrollbar-width:thin]">
                <div className="flex max-w-full flex-wrap justify-center gap-1 sm:gap-2 md:flex-nowrap md:min-w-min md:mx-auto">
                  {capabilityItems.slice(0, 5).map((item) => (
                    <span key={item} className={capabilityPillClass}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <div className="w-full max-w-full overflow-x-visible md:overflow-x-auto md:[-webkit-overflow-scrolling:touch] md:[scrollbar-width:thin]">
                <div className="flex max-w-full flex-wrap justify-center gap-1 sm:gap-2 md:flex-nowrap md:min-w-min md:mx-auto">
                  {capabilityItems.slice(5).map((item) => (
                    <span key={item} className={capabilityPillClass}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div
              dir={dir}
              className="mx-auto flex w-full max-w-[min(100%,22rem)] min-[400px]:max-w-[min(100%,26rem)] sm:max-w-[min(100%,34rem)] md:max-w-[min(100%,38rem)] lg:max-w-[min(100%,42rem)] flex-wrap justify-center content-center gap-1 sm:gap-2 px-0.5"
            >
              {capabilityItems.map((item) => (
                <span key={item} className={capabilityPillClass}>
                  {item}
                </span>
              ))}
            </div>
          )}
        </motion.div>

        {/* Stats — אותה רשת כמו שלוש שורות התת־כותרת */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75 }}
          className="grid grid-cols-3 gap-2 max-w-3xl mx-auto sm:gap-6 md:gap-10 lg:gap-12 mb-12 sm:mb-14 w-full justify-items-center px-0.5 sm:px-0"
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
              <div className="w-full max-w-full text-center text-[9px] min-[360px]:text-[10px] min-[400px]:text-xs sm:text-2xl md:text-3xl text-gray-300 mt-1 sm:mt-2 tracking-wide leading-tight sm:leading-snug px-0 sm:px-2 hyphens-none text-balance">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
