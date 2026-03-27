"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import ScrollReveal from "./ScrollReveal";
import { useLanguage, tx } from "@/lib/useLanguage";
import { t } from "@/lib/translations";

/** עדכון קבצים ב־public/images — העלה גרסה כדי לפרוץ מטמון דפדפן */
const PROCESS_15_STEPS_ASSET_VER = "5";
const EQS_3STEPS_ASSET_VER = "2";

/** ככה נראה הרכש → „ובדרך אחרת“ + חץ + 5 שלבים + תמונת 3 השלבים — מיד אחרי הבעיה */
export default function ProcessRealityIntro() {
  const { lang } = useLanguage();

  return (
    <section id="process" className="relative pt-4 pb-10 sm:pt-6 sm:pb-16 md:pb-24 overflow-hidden">
      <div className="relative z-10 section-container">
        <ScrollReveal>
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-6">
            {lang === "en" ? "This Is How" : "ככה נראה"}{" "}
            <span className="text-amber-400">{lang === "en" ? "Procurement Works Today" : "הרכש היום"}</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal>
          <div className="max-w-4xl mx-auto mb-12 rounded-2xl overflow-hidden border border-amber-500/25 bg-amber-500/[0.04] shadow-lg shadow-amber-900/10">
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
          <div className="max-w-3xl mx-auto mt-10 sm:mt-14 mb-6 sm:mb-8 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight gradient-text">
              {tx(t.process.replaceCaption, lang)}
            </h2>
            <p className="text-gray-300 text-lg sm:text-xl leading-relaxed whitespace-pre-line">
              {tx(t.process.replaceSub, lang)}
            </p>
          </div>
        </ScrollReveal>

        <div className="flex justify-center my-8 sm:my-10">
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
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
          <div className="max-w-4xl mx-auto mb-12 rounded-2xl overflow-hidden glass-card shadow-[0_8px_40px_rgba(0,0,0,0.25)]">
            <div className="px-5 py-6 sm:px-8 sm:py-8 border-b border-gray-700/20">
              <ul className="space-y-4 sm:space-y-5 max-w-2xl mx-auto">
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
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
