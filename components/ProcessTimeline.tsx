"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import ScrollReveal from "./ScrollReveal";
import { useLanguage, tx } from "@/lib/useLanguage";
import { t } from "@/lib/translations";

const eqsSteps = [
  {
    num: "1",
    subtitle: { en: "Algorithmic scan", he: "סריקה אלגוריתמית" },
    points: {
      en: ["World's best offers", "All-in-one quotes"],
      he: ["ההצעות הטובות בעולם", "הצעות מחיר הכל-באחד"],
    },
    color: "from-accent to-cyan-300",
  },
  {
    num: "2",
    subtitle: { en: "Sign SLA", he: "חתום SLA" },
    points: {
      en: ["Payment arrangements", "Get updates & ETA"],
      he: ["הסדרי תשלום", "קבל עדכונים ו-ETA"],
    },
    color: "from-cyan-300 to-accent-light",
  },
];

export default function ProcessTimeline() {
  const { lang } = useLanguage();

  return (
    <section id="process" className="relative py-24 md:py-32 overflow-hidden">
      <div className="animated-grid-bg absolute inset-0" />

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

        {/* כשאת כל זה אפשר... — רק טקסט, בלי מסגרות */}
        <ScrollReveal>
          <div className="max-w-3xl mx-auto my-14 sm:my-20 text-center">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              {tx(t.process.replaceCaption, lang)}
            </h2>
            <p className="text-gray-300 text-lg sm:text-xl leading-relaxed">
              {tx(t.process.replaceSub, lang)}
            </p>
          </div>
        </ScrollReveal>

        {/* מובייל: שני כרטיסים באותו גודל, V מיושר לטקסט; דסקטופ: עם 1 ו-2 */}
        <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 sm:gap-6 max-w-3xl mx-auto mb-8 items-stretch">
          {eqsSteps.map((step, i) => (
            <ScrollReveal key={i} delay={i * 0.15}>
              <motion.div
                whileHover={{ y: -2 }}
                className="relative rounded-2xl overflow-hidden flex flex-col min-h-[180px] sm:min-h-0"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-[0.06]`} />
                <div className="relative p-4 sm:p-7 flex flex-col items-center text-center flex-1">
                  <div className={`hidden sm:flex w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} items-center justify-center text-white text-xl font-black shadow-lg mb-3`}>
                    {step.num}
                  </div>
                  <span className="text-sm font-semibold uppercase tracking-widest text-accent mb-2 sm:mb-3">
                    {step.subtitle[lang]}
                  </span>
                  <ul className="space-y-2 w-full flex-1 flex flex-col items-start sm:items-center text-start sm:text-center">
                    {step.points[lang].map((point, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-gray-400">
                        <svg className="w-4 h-4 text-accent shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* חץ בעיגול */}
        <ScrollReveal>
          <div className="flex justify-center mb-8">
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-14 h-14 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center"
            >
              <svg className="w-7 h-7 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </motion.div>
          </div>
        </ScrollReveal>

        {/* תמונת התהליך */}
        <ScrollReveal>
          <div className="max-w-3xl mx-auto mb-12">
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="rounded-2xl overflow-hidden border border-accent/20 bg-dark-800/30"
            >
              <Image
                src="/images/eqs-3steps.png"
                alt="EQS.PORT 3-Step Process: Browse, Approval, Machine On Site"
                width={952}
                height={689}
                quality={100}
                unoptimized
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) min(952px, 90vw), 952px"
                className="w-full h-auto max-w-[952px] mx-auto"
              />
            </motion.div>
          </div>
        </ScrollReveal>

        {/* Result stats */}
        <ScrollReveal>
          <div className="flex flex-wrap justify-center gap-8 sm:gap-12 mb-20">
            {[
              { val: "1-2", unit: { en: "Months", he: "חודשים" } },
              { val: "2", unit: { en: "Steps", he: "שלבים" } },
              { val: "1", unit: { en: "Platform", he: "פלטפורמה" } },
              { val: "0", unit: { en: "Headaches", he: "כאבי ראש" } },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl sm:text-4xl font-black text-accent">{item.val}</div>
                <div className="text-xs text-gray-500 mt-1">{item.unit[lang]}</div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* ── PART 3: GLOBAL REACH - stacked images ── */}
        <ScrollReveal delay={0.2}>
          <h3 className="text-2xl sm:text-3xl font-bold text-center text-white mb-3">
            {tx(t.process.globalReachTitle, lang)}
          </h3>
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
