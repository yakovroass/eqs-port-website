"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import ScrollReveal from "./ScrollReveal";
import { useLanguage, tx } from "@/lib/useLanguage";
import { useMaxSm } from "@/lib/useMaxSm";
import { t } from "@/lib/translations";

/** עדכון קבצים ב־public/images — העלה גרסה כדי לפרוץ מטמון דפדפן */
const PROCESS_15_STEPS_ASSET_VER = "5";
const EQS_3STEPS_ASSET_VER = "2";

/** כותרת רכש גלובלי / היום → replaceCaption (גרדיאנט) + חץ + 5 שלבים + תמונת 3 השלבים — אחרי השוק והבעיה */
export default function ProcessRealityIntro() {
  const { lang } = useLanguage();
  const maxSm = useMaxSm();
  const sectionArrowY = maxSm ? 3 : 4;
  const realityLead = tx(t.process.realityHeadlineLead, lang).trim();

  return (
    <section id="process" className="relative pt-4 pb-10 sm:pt-6 sm:pb-16 md:pb-24 overflow-hidden">
      <div className="relative z-10 section-container">
        <div className="max-w-5xl mx-auto w-full">
        <ScrollReveal>
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-6">
            {realityLead ? (
              <>
                {realityLead}{" "}
                <span className="text-amber-400 tracking-wide">
                  {tx(t.process.realityHeadlineAccent, lang)}
                </span>
              </>
            ) : (
              <span className="text-amber-400 tracking-wide">
                {tx(t.process.realityHeadlineAccent, lang)}
              </span>
            )}
          </h2>
        </ScrollReveal>

        <ScrollReveal>
          <div className="w-full mb-12 rounded-2xl overflow-hidden border border-amber-500/25 bg-amber-500/[0.04] shadow-lg shadow-amber-900/10">
            <p className="text-gray-400 text-center text-base sm:text-lg leading-relaxed px-5 py-6 sm:px-8 sm:py-7 border-b border-amber-500/15">
              {tx(t.process.realitySub, lang)}
            </p>
            <div className="glass-card border-t border-amber-500/10">
              <Image
                src={`/images/process-15steps.png?v=${PROCESS_15_STEPS_ASSET_VER}`}
                alt={lang === "en" ? "15-step procurement and delivery process flowchart" : "תרשים זרימה: 15 שלבי הרכש והמשלוח"}
                width={887}
                height={829}
                quality={100}
                priority
                unoptimized
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) min(896px, 90vw), 896px"
                className="w-full h-auto block"
              />
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="w-full mt-10 sm:mt-14 mb-6 sm:mb-8 text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-4 leading-tight gradient-text">
              {tx(t.process.replaceCaption, lang)}
            </h2>
            <p className="text-gray-300 text-lg sm:text-xl leading-relaxed whitespace-pre-line">
              {tx(t.process.replaceSub, lang)}
            </p>
          </div>
        </ScrollReveal>

        <div className="flex justify-center my-8 sm:my-10">
          <motion.div
            animate={{ y: [0, sectionArrowY, 0] }}
            transition={{ repeat: Infinity, duration: 2.45, ease: "easeInOut" }}
            className="w-14 h-14 rounded-full flex items-center justify-center border border-gray-600/45 glass-card ring-1 ring-inset ring-white/[0.07] shadow-[0_0_26px_rgba(148,163,184,0.45),0_0_52px_rgba(100,116,139,0.22),0_8px_26px_rgba(0,0,0,0.32)]"
          >
            <svg
              className="w-7 h-7 text-gray-100 drop-shadow-[0_0_10px_rgba(203,213,225,0.85),0_0_22px_rgba(148,163,184,0.55),0_0_34px_rgba(100,116,139,0.35)]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </div>

        <ScrollReveal>
          <div className="w-full mb-12 rounded-2xl overflow-hidden glass-card shadow-[0_8px_40px_rgba(0,0,0,0.25)]">
            <div className="px-5 py-6 sm:px-8 sm:py-8 border-b border-gray-700/20">
              <ul className="space-y-4 sm:space-y-5 max-w-3xl mx-auto">
                {t.process.unifiedSteps[lang].map((step, i) => (
                  <li key={i} className="flex items-center gap-4 text-gray-200">
                    <span
                      className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl text-sm sm:text-base font-black tabular-nums
                        bg-gradient-to-br from-white/[0.08] to-white/[0.02]
                        text-gray-100 border border-gray-600/45
                        shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
                    >
                      {i + 1}
                    </span>
                    <span className="text-base sm:text-lg">{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-gray-700/15">
              <motion.div whileHover={{ scale: 1.005 }} transition={{ duration: 0.2 }}>
                <Image
                  src={`/images/eqs-3steps.png?v=${EQS_3STEPS_ASSET_VER}`}
                  alt={
                    lang === "en"
                      ? "EQS.PORT 3-Step Process: Browse, Approval, Machine On Site"
                      : "תהליך EQS.PORT בשלושה שלבים: עיון, אישור, ציוד באתר"
                  }
                  width={952}
                  height={689}
                  quality={100}
                  unoptimized
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) min(952px, 90vw), 952px"
                  className="w-full h-auto block"
                />
              </motion.div>
            </div>

            <div className="border-t border-gray-700/15 px-5 py-6 sm:px-8 sm:py-8">
              <div className="flex flex-col items-center text-center gap-3">
                <div
                  dir={lang === "he" ? "rtl" : "ltr"}
                  className="flex flex-wrap items-center justify-center gap-3 sm:gap-4"
                >
                  <span className="inline-flex shrink-0 p-0.5 [isolation:isolate]">
                    <svg
                      className="w-8 h-8 sm:w-9 sm:h-9 text-cyan-200/95 [filter:drop-shadow(0_0_5px_rgba(165,243,252,0.55))_drop-shadow(0_0_12px_rgba(51,187,255,0.25))]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      aria-hidden
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                      />
                    </svg>
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-white leading-snug text-balance">
                    {tx(t.process.provenAfterStepsTitle, lang)}
                  </h3>
                </div>
                <p className="w-full text-gray-200 text-sm sm:text-base md:text-lg leading-relaxed text-pretty">
                  {tx(t.process.provenAfterSteps, lang)}
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
