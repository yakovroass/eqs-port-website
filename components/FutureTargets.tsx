"use client";

import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import AnimatedCounter from "./AnimatedCounter";
import { useLanguage, tx } from "@/lib/useLanguage";
import { t } from "@/lib/translations";

const phases = [
  {
    phase: { en: "Phase 1 — Now", he: "שלב 1 — עכשיו" },
    title: { en: "Building the Network & Data Foundation", he: "בניית הרשת ובסיס הנתונים" },
    desc: {
      en: "We're starting with heavy equipment and industrial procurement — but the real play is what we're building underneath: a global network of 3,000+ contacts across 100+ countries, deep supplier relationships, and proprietary market data that grows with every transaction. This is the infrastructure that makes everything else possible — and what will take us to the next phases.",
      he: "אנחנו מתחילים עם ציוד כבד ורכש תעשייתי — אבל המהלך האמיתי הוא מה שאנחנו בונים מתחת: רשת גלובלית של 3,000+ אנשי קשר ביותר מ-100 מדינות, קשרי ספקים עמוקים, ונתוני שוק קנייניים שגדלים עם כל עסקה. זו התשתית שמאפשרת את הכל, מה שיקח אותנו לשלבים הבאים.",
    },
    stats: [
      { value: 3000, suffix: "+", label: { en: "Verified Contacts", he: "אנשי קשר מאומתים" } },
      { value: 100, suffix: "+", label: { en: "Countries", he: "מדינות" } },
      { value: 4000, suffix: "+", label: { en: "Ports Database", he: "מאגר נמלים" } },
      { value: 30000, suffix: "+", label: { en: "Technical Docs", he: "מסמכים טכניים" } },
    ],
    color: "from-accent to-cyan-300",
    glow: "bg-accent/10",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
  },
  {
    phase: { en: "Phase 2 — Near Future", he: "שלב 2 — עתיד קרוב" },
    title: { en: "Global Procurement Intelligence Engine", he: "מנוע מודיעין רכש גלובלי" },
    desc: {
      en: "Every buyer deserves the best deal — and we'll find it. Our system scans the entire world to deliver the best procurement insights for every customer. We become each company's procurement department — or their most powerful linked partner. Optimal pricing, verified suppliers, real-time availability, and quality assurance. Every transaction feeds the algorithm, every connection strengthens the network.",
      he: "כל קונה ראוי לעסקה הטובה ביותר — ואנחנו נמצא אותה. המערכת שלנו סורקת את העולם כולו כדי לספק את תובנות הרכש הטובות ביותר לכל לקוח. אנחנו הופכים למחלקת הרכש של כל חברה — או לשותף המקושר החזק ביותר שלה. תמחור אופטימלי, ספקים מאומתים, זמינות בזמן אמת, והבטחת איכות. כל עסקה מזינה את האלגוריתם, כל חיבור מחזק את הרשת.",
    },
    stats: [
      { value: 432, suffix: "B+", label: { en: "Addressable Market", he: "שוק ניתן לטיפול" }, prefix: "$" },
      { value: 2, suffix: "M+", label: { en: "Potential Buyers", he: "קונים פוטנציאליים" } },
    ],
    color: "from-purple-500 to-violet-500",
    glow: "bg-purple-500/10",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
      </svg>
    ),
  },
  {
    phase: { en: "Phase 3 — The Vision", he: "שלב 3 — החזון" },
    title: { en: "The World's Procurement Operating System", he: "מערכת ההפעלה של הרכש העולמי" },
    desc: {
      en: "A buyer in Germany needs steel from Brazil. A contractor in Dubai needs cranes from Japan. A company in India needs materials from China. Our platform replaces companies' procurement departments — or becomes their strongest linked partner. We scan the globe, match buyers with the best sources algorithmically, and execute procurement at massive scale across every vertical, every category, every country.",
      he: "קונה בגרמניה צריך פלדה מברזיל. קבלן בדובאי צריך מנופים מאירופה. חברה בהודו צריכה חומרים מסין. הפלטפורמה שלנו מחליפה את מחלקות הרכש של חברות — או הופכת לשותף המקושר החזק ביותר שלהן. אנחנו סורקים את העולם, מתאימים קונים למקורות הטובים ביותר אלגוריתמית, ומבצעים רכש בקנה מידה עצום בכל ענף, בכל קטגוריה, בכל מדינה.",
    },
    stats: [
      { value: 12, suffix: "T+", label: { en: "Global Procurement", he: "רכש גלובלי" }, prefix: "$" },
      { value: 195, suffix: "", label: { en: "Countries Connected", he: "מדינות מחוברות" } },
    ],
    color: "from-cyan-300 to-accent-light",
    glow: "bg-accent/10",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5a17.92 17.92 0 01-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
  },
];

const futureMarkets = [
  { name: { en: "Construction Materials", he: "חומרי בנייה" }, size: "$1.3T" },
  { name: { en: "Mining Equipment", he: "ציוד כרייה" }, size: "$150B" },
  { name: { en: "Agricultural Machinery", he: "מכונות חקלאיות" }, size: "$180B" },
  { name: { en: "Energy Infrastructure", he: "תשתיות אנרגיה" }, size: "$2.8T" },
  { name: { en: "Maritime & Shipping", he: "ימי והובלה" }, size: "$400B" },
  { name: { en: "Industrial Automation", he: "אוטומציה תעשייתית" }, size: "$300B" },
];

export default function FutureTargets() {
  const { lang } = useLanguage();

  return (
    <section id="future" className="relative py-24 md:py-32 overflow-hidden">
      <div className="animated-grid-bg absolute inset-0" />

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

      <div className="absolute top-1/3 left-0 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-[300px] h-[300px] bg-accent/5 rounded-full blur-3xl" />

      <div className="relative z-10 section-container">
        <ScrollReveal>
          <div className="text-center mb-6">
            <span className="section-label headline-font text-3xl sm:text-4xl md:text-5xl text-amber-400 tracking-wide uppercase">
              {tx(t.roadmap.label, lang)}
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-6">
            {lang === "en" ? "This Is" : "זה רק"}{" "}
            <span className="gradient-text">{lang === "en" ? "Just the Beginning" : "ההתחלה"}</span>
          </h2>
          <p className="text-gray-400 text-center max-w-3xl mx-auto mb-16 text-lg leading-relaxed">
            {tx(t.roadmap.intro, lang)}
          </p>
        </ScrollReveal>

        {/* Phase cards */}
        <div className="max-w-4xl mx-auto mb-24 space-y-8 sm:space-y-0">
          {phases.map((phase, i) => (
            <ScrollReveal key={i} delay={i * 0.15}>
              <div className="relative flex gap-4 sm:gap-8 w-full min-w-0 max-w-full">
                {/* Timeline column */}
                <div className={`hidden sm:flex flex-col items-center shrink-0 ${lang === "he" ? "order-last" : ""}`}>
                  <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${phase.color} flex items-center justify-center text-white shadow-lg shadow-accent/10 z-10`}>
                    {phase.icon}
                  </div>
                  {i < phases.length - 1 && (
                    <div className={`w-[2px] flex-1 mt-0 bg-gradient-to-b ${phase.color} opacity-20`} />
                  )}
                </div>

                {/* Card */}
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className="flex-1 mb-8 sm:mb-12 min-w-0 w-full max-w-full"
                >
                  <div className="relative rounded-2xl overflow-hidden max-w-full">
                    <div className={`absolute inset-0 ${phase.glow} opacity-50`} />
                    <div className="relative px-3 py-5 sm:p-8 border border-gray-700/30 rounded-2xl hover:border-gray-600/40 transition-all sm:px-8 max-w-full min-w-0 box-border">
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3">
                        {/* Mobile icon */}
                        <div className={`sm:hidden w-10 h-10 rounded-xl bg-gradient-to-br ${phase.color} flex items-center justify-center text-white shadow-lg`}>
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </div>
                        <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-stone-100">
                          {phase.phase[lang]}
                        </span>
                        {i === 0 && (
                          <span className="text-xs sm:text-sm px-3 py-1 rounded-full bg-white/20 text-amber-200 font-bold animate-pulse border border-amber-400/30">
                            {lang === "en" ? "ACTIVE" : "פעיל"}
                          </span>
                        )}
                      </div>

                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">{phase.title[lang]}</h3>
                      <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-6">{phase.desc[lang]}</p>

                      {/* Phase stats — גודל תוויות אחיד לכל השלבים */}
                      <div
                        className={
                          phase.stats.length >= 4
                            ? "grid grid-cols-2 gap-x-2 gap-y-4 pt-4 border-t border-gray-700/20 sm:flex sm:flex-wrap sm:gap-x-10 sm:gap-y-6 md:gap-x-12"
                            : "flex flex-wrap gap-6 sm:gap-10 pt-4 border-t border-gray-700/20"
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
                            <div className="font-black text-white tabular-nums leading-none drop-shadow-sm text-lg min-[380px]:text-xl sm:text-2xl md:text-3xl">
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
                </motion.div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* שווקים — כותרת גרדיאנט + קוביות מעוצבות */}
        <ScrollReveal delay={0.2}>
          <div className="max-w-3xl mx-auto text-center mb-10 px-2">
            <h3 className="text-xl sm:text-2xl font-bold mb-4 leading-snug gradient-text">
              {tx(t.roadmap.marketsHeadline, lang)}
            </h3>
            <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
              {tx(t.roadmap.marketsSub, lang)}
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-5 max-w-4xl mx-auto mb-16 items-stretch">
            {futureMarkets.map((market, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ scale: 1.03 }}
                className="relative rounded-xl p-5 sm:p-6 min-h-[118px] sm:min-h-[128px] h-full flex flex-col items-center justify-center border border-accent/15 bg-accent/[0.04] backdrop-blur-sm text-center group cursor-default hover:border-accent/25 transition-colors"
              >
                <div className="text-lg sm:text-xl font-black text-white mb-2 shrink-0 tabular-nums">{market.size}</div>
                <div className="text-xs sm:text-sm text-stone-300 group-hover:text-stone-100 transition-colors leading-snug px-1">{market.name[lang]}</div>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>

        {/* Bottom CTA — כותרות עם גרדיאנט */}
        <ScrollReveal delay={0.4}>
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="relative rounded-2xl overflow-hidden border border-accent/20 bg-accent/[0.04]">
              <div className="relative px-6 sm:px-12 py-10 sm:py-14">
                <p className="text-lg sm:text-2xl font-bold leading-relaxed mb-3 gradient-text">
                  {lang === "en"
                    ? "Every company in the world buys something."
                    : "כל חברה בעולם קונה משהו."}
                </p>
                <p className="text-base sm:text-xl text-stone-300 leading-relaxed mb-4">
                  {lang === "en"
                    ? "We replace their procurement department — or become their strongest partner. Scanning the globe, leveraging data, and connecting them to the best sources through our network."
                    : "אנחנו מחליפים את מחלקת הרכש שלהם — או הופכים לשותף החזק ביותר שלהם. סורקים את העולם, ממנפים נתונים, ומחברים אותם למקורות הטובים ביותר דרך הרשת שלנו."}
                </p>
                <p className="text-lg sm:text-2xl font-bold leading-relaxed gradient-text">
                  {lang === "en"
                    ? "We connect everyone — that's our competitive edge."
                    : "אנחנו מחברים את כולם וזה היתרון התחרותי."}
                </p>
              </div>
            </div>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
}
