"use client";

import { IconCrane } from "@tabler/icons-react";
import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import AnimatedCounter from "./AnimatedCounter";
import { useLanguage, tx } from "@/lib/useLanguage";
import { t } from "@/lib/translations";

const phases = [
  {
    phaseLabel: { en: "Phase 1", he: "שלב 1" },
    statusPill: { en: "Active", he: "פעיל" },
    title: { en: "Building the Network & Data Foundation", he: "בניית הרשת ומערכות בסיסי הנתונים" },
    desc: {
      en: "We've already used the software for trading in heavy equipment, spare parts, and industrial procurement — but the real move is what we're building underneath: advanced development to connect a global network of 3,000+ contacts across 100+ countries, building deep supplier relationships, and proprietary market data that grows with every deal. This is the infrastructure that enables everything — and what takes us to the next stage.",
      he: "כבר השתמשנו בתוכנה לצורך מסחר בציוד כבד, חלקי חילוף ורכש תעשייתי — אבל המהלך האמיתי הוא מה שאנחנו בונים מתחת — פיתוח מתקדם לחיבור רשת גלובלית של 3,000+ אנשי קשר, ביותר מ-100 מדינות, בניית קשרי ספקים עמוקים, ונתוני שוק קנייניים שגדלים עם כל עסקה. זו תשתית שמאפשרת הכל, וזה מה שיקח אותנו לשלב הבא...",
    },
    stats: [
      { value: 3000, suffix: "+", label: { en: "Contacts", he: "אנשי קשר" } },
      { value: 100, suffix: "+", label: { en: "Countries", he: "מדינות" } },
      { value: 4000, suffix: "+", label: { en: "Ports Database", he: "מאגר נמלים" } },
      { value: 30000, suffix: "+", label: { en: "Technical Docs", he: "מסמכים טכניים" } },
    ],
    color: "from-accent to-cyan-300",
    icon: <IconCrane className="w-6 h-6 sm:w-7 sm:h-7" stroke={1.5} aria-hidden />,
  },
  {
    phaseLabel: { en: "Phase 2", he: "שלב 2" },
    statusPill: { en: "Vision", he: "חזון" },
    title: { en: "The Global Trade Operating System", he: "מערכת ההפעלה של המסחר העולמי" },
    desc: {
      en: "Every buyer everywhere deserves the best deal — and we'll find it. Our platform becomes each customer's procurement function — or their strongest linked partner. We scan the world to deliver actionable procurement insights, leverage data, algorithmically match buyers and sellers, execute procurement through our systems, and build trade lanes at massive scale across every category and country.",
      he: "הפלטפורמה שלנו הופכת למחלקת הרכש של כל לקוח או חברה — או לשותף המקושר החזק ביותר שלה. אנחנו סורקים את העולם כולו כדי לספק תובנות רכש מעשיות, ממנפים נתונים, מתאימים אלגוריתמית קונים ומוכרים, מבצעים דרך המערכות שלנו רכש ומייצרים קווי מסחר בקנה מידה עצום, בכל קטגוריה, בכל מדינה.",
    },
    stats: [
      { value: 432, suffix: "B+", label: { en: "Addressable Market", he: "שוק ניתן לטיפול" }, prefix: "$" },
      { value: 2, suffix: "M+", label: { en: "Potential Buyers", he: "קונים פוטנציאליים" } },
      { value: 12, suffix: "T+", label: { en: "Global Trade", he: "רכש גלובלי" }, prefix: "$" },
      { value: 195, suffix: "", label: { en: "Countries Connected", he: "מדינות מחוברות" } },
    ],
    color: "from-indigo-500/85 to-sky-400/80",
    icon: (
      <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5a17.92 17.92 0 01-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
  },
];

export default function FutureTargets() {
  const { lang } = useLanguage();

  return (
    <section id="future" className="relative py-24 md:py-32 overflow-hidden">

      {/* Animated network lines background */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg className="w-full h-full" xmlns="https://www.w3.org/2000/svg">
          <defs>
            <pattern id="network" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="1" fill="currentColor" className="text-accent" />
              <line x1="50" y1="50" x2="100" y2="0" stroke="currentColor" strokeWidth="0.3" className="text-accent" />
              <line x1="50" y1="50" x2="0" y2="100" stroke="currentColor" strokeWidth="0.3" className="text-accent" />
              <line x1="50" y1="50" x2="100" y2="100" stroke="currentColor" strokeWidth="0.3" className="text-purple-400" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#network)" />
        </svg>
      </div>

      <div className="absolute top-1/3 left-0 w-[400px] h-[400px] bg-violet-500/4 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-[300px] h-[300px] bg-sky-500/4 rounded-full blur-3xl" />

      <div className="relative z-10 section-container">
        <ScrollReveal>
          <div className="text-center mb-6">
            <span className="section-label headline-font text-3xl sm:text-4xl md:text-5xl text-amber-400 tracking-wide uppercase">
              {tx(t.roadmap.label, lang)}
            </span>
          </div>
          <p className="text-gray-300 text-center max-w-5xl mx-auto w-full mb-16 text-lg md:text-xl leading-relaxed">
            {tx(t.roadmap.intro, lang)}
          </p>
        </ScrollReveal>

        {/* Phase cards — רוחב כמו קוביות התוכן בשאר הדף (max-w-5xl) */}
        <div className="max-w-5xl mx-auto w-full mb-24 space-y-8">
          {phases.map((phase, i) => {
            const isVisionCard = i === 1;
            return (
            <ScrollReveal key={i} delay={i * 0.15}>
              <div className="relative w-full min-w-0 max-w-full">
                <motion.div
                  whileHover={{ scale: isVisionCard ? 1.008 : 1.01 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="w-full mb-0 min-w-0 max-w-full"
                >
                  <div
                    className={
                      isVisionCard
                        ? "relative rounded-2xl overflow-hidden max-w-full border border-gray-700/40 ring-1 ring-cyan-400/12 shadow-[0_0_22px_rgba(56,189,248,0.09),0_10px_32px_rgba(0,0,0,0.28)]"
                        : "relative rounded-2xl overflow-hidden max-w-full"
                    }
                  >
                    <div
                      className={
                        isVisionCard
                          ? "relative rounded-2xl overflow-hidden glass-surface sm:px-8 sm:py-8 px-3 py-5 max-w-full min-w-0 box-border"
                          : "relative px-3 py-5 sm:p-8 rounded-2xl glass-card hover:border-gray-600/40 transition-all sm:px-8 max-w-full min-w-0 box-border"
                      }
                    >
                      {isVisionCard ? (
                        <>
                          <div className="pointer-events-none absolute -top-20 end-0 h-40 w-40 rounded-full bg-violet-500/10 blur-3xl" aria-hidden />
                          <div className="pointer-events-none absolute -bottom-12 start-1/4 h-32 w-32 rounded-full bg-sky-500/8 blur-3xl" aria-hidden />
                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.02] via-transparent to-sky-400/[0.04]" aria-hidden />
                        </>
                      ) : null}
                      <div className={isVisionCard ? "relative z-10" : undefined}>
                      <div className="min-w-0 w-full">
                      <div className="relative flex flex-wrap items-center gap-x-2 gap-y-2 sm:gap-x-2.5 mb-3">
                        <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-stone-100">
                          {phase.phaseLabel[lang]}
                        </span>
                        <span className="text-[11px] sm:text-xs font-bold text-stone-100/70" aria-hidden>
                          —
                        </span>
                        <span
                          className={
                            i === 0
                              ? "text-xs sm:text-sm px-3 py-1 rounded-full bg-white/20 text-amber-200 font-bold animate-pulse border border-amber-400/30"
                              : "text-xs sm:text-sm px-3 py-1 rounded-full bg-sky-500/15 text-sky-100 font-bold animate-pulse border border-sky-400/35"
                          }
                        >
                          {phase.statusPill[lang]}
                        </span>
                      </div>

                      <div className="flex items-start gap-3 sm:gap-3.5 mb-3 min-w-0 w-full">
                        <div
                          className="relative shrink-0 flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center overflow-visible"
                          aria-hidden
                        >
                          <div
                            className={`pointer-events-none absolute left-1/2 top-1/2 h-7 w-7 sm:h-8 sm:w-8 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-gradient-to-br ${phase.color} shadow-md shadow-accent/10 ${i === 1 ? "motion-safe:animate-pulse" : ""}`}
                          />
                          <div className="relative z-10 flex items-center justify-center text-white">
                            {phase.icon}
                          </div>
                        </div>
                        <h3
                          className={
                            isVisionCard
                              ? "flex-1 min-w-0 text-xl sm:text-2xl md:text-[1.65rem] font-bold leading-tight text-white pt-0.5"
                              : "flex-1 min-w-0 text-xl sm:text-2xl font-bold text-white pt-0.5"
                          }
                        >
                          {phase.title[lang]}
                        </h3>
                      </div>
                      <p className={`text-sm sm:text-base leading-relaxed mb-6 w-full max-w-none ${isVisionCard ? "text-gray-300" : "text-gray-400"}`}>{phase.desc[lang]}</p>

                      {/* Phase stats — גודל תוויות אחיד לכל השלבים */}
                      <div
                        className={
                          phase.stats.length >= 4
                            ? "grid grid-cols-2 gap-x-2 gap-y-4 pt-4 sm:flex sm:flex-wrap sm:gap-x-10 sm:gap-y-6 md:gap-x-12 w-full border-t border-gray-700/20"
                            : "flex flex-wrap gap-6 sm:gap-10 pt-4 w-full border-t border-gray-700/20"
                        }
                      >
                        {phase.stats.map((stat, j) => (
                          <div
                            key={j}
                            className={
                              phase.stats.length >= 4
                                ? "min-w-0 text-center sm:text-start sm:w-auto sm:shrink-0"
                                : ""
                            }
                          >
                            <div
                              className="font-black text-white tabular-nums leading-none drop-shadow-sm text-lg min-[380px]:text-xl sm:text-2xl md:text-3xl"
                            >
                              {stat.prefix || ""}
                              <AnimatedCounter target={stat.value} suffix={stat.suffix} duration={2} />
                            </div>
                            <div className="text-stone-300 mt-1 leading-snug hyphens-auto text-[11px] min-[380px]:text-xs sm:text-sm px-0.5">
                              {stat.label[lang]}
                            </div>
                          </div>
                        ))}
                      </div>
                      </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
