"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import ScrollReveal from "./ScrollReveal";
import { useLanguage, tx } from "@/lib/useLanguage";
import { t } from "@/lib/translations";

export default function ProcessTimeline() {
  const { lang } = useLanguage();

  return (
    <section id="process" className="relative py-24 md:py-32 overflow-hidden">

      <div className="relative z-10 section-container">
        {/* ── PART 1: THE HARD WAY TODAY ── */}
        <ScrollReveal>
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-6">
            {lang === "en" ? "This Is How" : "ככה נראה"}{" "}
            <span className="text-amber-400">{lang === "en" ? "Procurement Works Today" : "הרכש היום"}</span>
          </h2>
        </ScrollReveal>

        {/* קוביה אחת: טקסט + תמונת 15 השלבים */}
        <ScrollReveal>
          <div className="max-w-4xl mx-auto mb-12 rounded-2xl overflow-hidden border border-amber-500/25 bg-amber-500/[0.04] shadow-lg shadow-amber-900/10">
            <p className="text-gray-400 text-center text-base sm:text-lg leading-relaxed px-5 py-6 sm:px-8 sm:py-7 border-b border-amber-500/15">
              {tx(t.process.realitySub, lang)}
            </p>
            <div className="bg-dark-950/50 border-t border-amber-500/10">
              <Image
                src="/images/process-15steps.png"
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

        {/* כשאת כל זה אפשר להחליף ב... — כותרת בגרדיאנט כחול כמו יתר הכותרות */}
        <ScrollReveal>
          <div className="max-w-3xl mx-auto mt-14 sm:mt-20 mb-8 sm:mb-10 text-center">
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
            className="w-14 h-14 rounded-full bg-white/5 border border-cyan-300/35 flex items-center justify-center shadow-[0_0_16px_rgba(56,189,248,0.35)]"
          >
            <svg className="w-7 h-7 text-cyan-100 drop-shadow-[0_0_8px_rgba(103,232,249,0.65)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </div>

        {/* חמשת השלבים + תמונת 3 השלבים — בתוך קובייה אחת, בסגנון לא ירוק */}
        <ScrollReveal>
          <div className="max-w-4xl mx-auto mb-12 rounded-2xl overflow-hidden border border-cyan-400/25 bg-cyan-500/[0.04] shadow-lg shadow-cyan-900/10">
            <div className="px-5 py-6 sm:px-8 sm:py-8 border-b border-cyan-400/20">
              <ul className="space-y-4 sm:space-y-5 max-w-2xl mx-auto">
                {t.process.unifiedSteps[lang].map((step, i) => (
                  <li key={i} className="flex items-center gap-4 text-gray-200">
                    <span
                      className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl text-sm sm:text-base font-black tabular-nums
                        bg-gradient-to-br from-cyan-400/35 via-sky-500/25 to-blue-700/30
                        text-cyan-100 border border-cyan-400/45
                        shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]"
                    >
                      {i + 1}
                    </span>
                    <span className="text-base sm:text-lg">{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-dark-950/50 border-t border-cyan-400/15">
              <motion.div whileHover={{ scale: 1.005 }} transition={{ duration: 0.2 }}>
                <Image
                  src="/images/eqs-3steps.png"
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

        {/* ── PART 3: GLOBAL REACH - stacked images ── */}
        <ScrollReveal delay={0.2}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-4 sm:mb-6 gradient-text">
            {tx(t.process.globalReachTitle, lang)}
          </h2>
          <p className="sm:hidden text-gray-400 text-center max-w-2xl mx-auto mb-10 text-base sm:text-lg leading-relaxed whitespace-pre-line">
            {tx(t.process.globalReachIntroMobile, lang)}
          </p>
          <p className="hidden sm:block text-gray-400 text-center max-w-2xl mx-auto mb-10 text-base sm:text-lg leading-relaxed">
            {tx(t.process.globalReachIntro, lang)}
          </p>
        </ScrollReveal>

        <div className="max-w-5xl mx-auto space-y-8">
          {/* Global search interface */}
          <ScrollReveal delay={0.1}>
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="rounded-2xl overflow-hidden border border-gray-700/30 bg-dark-800/50"
            >
              <Image
                src="/images/global-search.png"
                alt="EQS.PORT Global Equipment Search"
                width={1395}
                height={667}
                quality={95}
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1280px"
                className="w-full h-auto"
              />
              <div className="p-5 sm:p-6">
                <h4 className="text-base sm:text-lg font-semibold text-white mb-1.5">
                  {tx(t.process.globalSearchTitle, lang)}
                </h4>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {tx(t.process.globalSearchDesc, lang)}
                </p>
              </div>
            </motion.div>
          </ScrollReveal>

          {/* Global ports network */}
          <ScrollReveal delay={0.2}>
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="rounded-2xl overflow-hidden border border-gray-700/30 bg-dark-800/50"
            >
              <Image
                src="/images/global-ports.png"
                alt="Global Ports & Connections Network"
                width={1710}
                height={860}
                quality={95}
                sizes="(max-width: 768px) 100vw, (max-width: 1536px) 90vw, 1200px"
                className="w-full h-auto"
              />
              <div className="p-5 sm:p-6">
                <h4 className="text-base sm:text-lg font-semibold text-white mb-1.5">
                  {tx(t.process.globalPortsTitle, lang)}
                </h4>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {tx(t.process.globalPortsDesc, lang)}
                </p>
              </div>
            </motion.div>
          </ScrollReveal>

          {/* Crane app / מודיעין טכני — תמונה ברוחב מלא כמו שאר התמונות */}
          <ScrollReveal delay={0.3}>
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="rounded-2xl overflow-hidden border border-gray-700/30 bg-dark-800/50"
            >
              <Image
                src="/images/crane-app.png"
                alt="EQS.PORT Crane Specifications App"
                width={1760}
                height={3317}
                quality={95}
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1200px"
                className="w-full h-auto"
              />
              <div className="p-5 sm:p-6">
                <h4 className="text-base sm:text-lg font-semibold text-white mb-1.5">
                  {tx(t.process.globalTechTitle, lang)}
                </h4>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {tx(t.process.globalTechDesc, lang)}
                </p>
              </div>
            </motion.div>
          </ScrollReveal>

          {/* Africa minerals map - full width */}
          <ScrollReveal delay={0.4}>
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="rounded-2xl overflow-hidden border border-gray-700/30 bg-dark-800/50"
            >
              <Image
                src="/images/africa-minerals.png"
                alt="Africa Strategic Minerals Map 2026"
                width={901}
                height={1024}
                quality={95}
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1024px"
                className="w-full h-auto"
              />
              <div className="p-5 sm:p-6">
                <h4 className="text-base sm:text-lg font-semibold text-white mb-1.5">
                  {tx(t.process.globalStrategicTitle, lang)}
                </h4>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {tx(t.process.globalStrategicDesc, lang)}
                </p>
              </div>
            </motion.div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
