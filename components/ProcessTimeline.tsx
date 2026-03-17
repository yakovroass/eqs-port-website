"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import ScrollReveal from "./ScrollReveal";
import { useLanguage, tx } from "@/lib/useLanguage";
import { t } from "@/lib/translations";

const eqsSteps = [
  {
    num: "1",
    title: { en: "Browse", he: "גלישה" },
    subtitle: { en: "Algorithmic Scanning", he: "סריקה אלגוריתמית" },
    points: {
      en: ["World's Best Offers", "Analyzed Insights", "All-In-One Quotes"],
      he: ["ההצעות הטובות בעולם", "תובנות מנותחות", "הצעות מחיר הכל-באחד"],
    },
    color: "from-accent to-blue-400",
  },
  {
    num: "2",
    title: { en: "Approve & Pay", he: "אישור ותשלום" },
    subtitle: { en: "Seamless Execution", he: "ביצוע חלק" },
    points: {
      en: ["Select Plan & Sign SLA", "Proceed to Payment", "Get Updates & ETA"],
      he: ["בחר תוכנית וחתום SLA", "המשך לתשלום", "קבל עדכונים ו-ETA"],
    },
    color: "from-blue-400 to-emerald-400",
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
          <div className="text-center mb-4">
            <span className="text-amber-400/80 font-mono text-base sm:text-lg tracking-widest uppercase">
              {lang === "en" ? "The Reality Today" : "המציאות היום"}
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-6">
            {lang === "en" ? "This Is How" : "ככה נראה"}{" "}
            <span className="text-amber-400">{lang === "en" ? "Procurement Works Today" : "הרכש היום"}</span>
          </h2>
        </ScrollReveal>

        {/* תת-כותרת: התהליך הישן והמעייף – טקסט */}
        <ScrollReveal>
          <div className="max-w-3xl mx-auto mb-8">
            <p className="text-gray-400 text-center text-base sm:text-lg leading-relaxed rounded-2xl border border-amber-500/20 bg-amber-500/[0.04] p-6 sm:p-8">
              {tx(t.process.realitySub, lang)}
            </p>
          </div>
        </ScrollReveal>

        {/* פלואו-צ'ארט: 15 השלבים */}
        <ScrollReveal>
          <div className="max-w-4xl mx-auto mb-12 rounded-2xl overflow-hidden">
            <Image
              src="/process-15steps.png"
              alt={lang === "en" ? "15-step procurement and delivery process flowchart" : "תרשים זרימה: 15 שלבי הרכש והמשלוח"}
              width={1200}
              height={1600}
              quality={95}
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1200px"
              className="w-full h-auto"
            />
          </div>
        </ScrollReveal>

        {/* בלוק בין התמונות: כותרת גדולה + תת־כותרת + חץ */}
        <ScrollReveal>
          <div className="max-w-4xl mx-auto my-16 sm:my-20">
            <div className="rounded-2xl border border-accent/20 bg-accent/[0.04] p-8 sm:p-12 text-center">
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                {tx(t.process.replaceCaption, lang)}
              </h2>
              <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
                {tx(t.process.replaceSub, lang)}
              </p>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="w-14 h-14 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center mx-auto"
              >
                <svg className="w-7 h-7 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </motion.div>
            </div>
          </div>
        </ScrollReveal>

        {/* 2 שלבים מרכזיים – כרטיסים */}
        <ScrollReveal>
          <p className="text-accent/90 text-center text-sm sm:text-base font-semibold uppercase tracking-wider mb-6">
            {lang === "en" ? "2 Simple Steps" : "2 שלבים פשוטים"}
          </p>
        </ScrollReveal>
        <div className="grid sm:grid-cols-2 gap-5 sm:gap-6 max-w-3xl mx-auto mb-6">
          {eqsSteps.map((step, i) => (
            <ScrollReveal key={i} delay={i * 0.15}>
              <motion.div
                whileHover={{ y: -4 }}
                className="relative rounded-2xl overflow-hidden h-full"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-[0.06]`} />
                <div className="relative p-6 sm:p-7 border border-gray-700/30 rounded-2xl h-full flex flex-col items-center text-center">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white text-2xl font-black shadow-lg mb-4`}>
                    {step.num}
                  </div>
                  <h4 className="text-xl font-bold text-white mb-1">{step.title[lang]}</h4>
                  <span className={`text-[10px] font-semibold uppercase tracking-widest bg-gradient-to-r ${step.color} bg-clip-text text-transparent mb-4`}>
                    {step.subtitle[lang]}
                  </span>
                  <ul className="space-y-2 w-full">
                    {step.points[lang].map((point, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm text-gray-400">
                        <svg className="w-4 h-4 text-accent shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* תמונת התהליך */}
        <ScrollReveal>
          <div className="max-w-3xl mx-auto mb-12">
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="rounded-2xl overflow-hidden border border-accent/20 bg-dark-800/30"
            >
              <Image
                src="/eqs-3steps.png"
                alt="EQS.PORT 3-Step Process: Browse, Approval, Machine On Site"
                width={1000}
                height={700}
                quality={95}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 2000px"
                className="w-full h-auto"
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
          <div className="text-center mb-4">
            <span className="text-accent font-mono text-base sm:text-lg tracking-widest uppercase">
              {lang === "en" ? "Global Infrastructure" : "תשתית גלובלית"}
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-center text-white mb-3">
            {lang === "en" ? "Our Global Reach" : "הנוכחות הגלובלית שלנו"}
          </h3>
          <p className="text-gray-500 text-center max-w-2xl mx-auto mb-10 text-sm sm:text-base">
            {lang === "en"
              ? "Real connections. Real data. From Bangladesh to Argentina. This is not a mockup — this is our live system."
              : "חיבורים אמיתיים. נתונים אמיתיים. מבנגלדש עד ארגנטינה. זה לא הדמיה — זו המערכת החיה שלנו."}
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
                src="/global-search.png"
                alt="EQS.PORT Global Equipment Search"
                width={1200}
                height={700}
                quality={95}
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 2400px"
                className="w-full h-auto"
              />
              <div className="p-5 sm:p-6">
                <h4 className="text-base sm:text-lg font-semibold text-white mb-1.5">
                  {lang === "en" ? "Intelligent Global Search" : "חיפוש גלובלי חכם"}
                </h4>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {lang === "en"
                    ? "Our platform scans equipment across the globe — filtering by model, hours, price, and location. Every listing is verified, every seller is known to our network."
                    : "הפלטפורמה שלנו סורקת ציוד ברחבי העולם — מסננת לפי דגם, שעות, מחיר ומיקום. כל רישום מאומת, כל מוכר מוכר לרשת שלנו."}
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
                src="/global-ports.png"
                alt="Global Ports & Connections Network"
                width={1200}
                height={600}
                quality={95}
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 2400px"
                className="w-full h-auto"
              />
              <div className="p-5 sm:p-6">
                <h4 className="text-base sm:text-lg font-semibold text-white mb-1.5">
                  {lang === "en" ? "Global Port & Supplier Network" : "רשת קשרי נמלים וספקים עולמית"}
                </h4>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {lang === "en"
                    ? "A data repository covering 4,000+ ports worldwide — including contact details, capabilities, and logistics data."
                    : "מאגר דאטה המכסה 4,000+ נמלים ברחבי העולם — כולל פרטי קשר, יכולות ונתוני לוגיסטיקה."}
                </p>
                <div className="mt-3 flex flex-wrap gap-6">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-xl font-black text-accent">4,000+</span>
                    <span className="text-xs text-gray-500">{lang === "en" ? "Ports" : "נמלים"}</span>
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-xl font-black text-accent">60</span>
                    <span className="text-xs text-gray-500">{lang === "en" ? "Data Points Per Port" : "נקודות נתונים לנמל"}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </ScrollReveal>

          {/* Crane app - side-by-side: narrow image on side, text beside */}
          <ScrollReveal delay={0.3}>
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="rounded-2xl overflow-hidden border border-gray-700/30 bg-dark-800/50"
            >
              <div className={`flex flex-col lg:flex-row gap-0 ${lang === "he" ? "lg:flex-row-reverse" : ""}`}>
                <div className="flex-1 p-5 sm:p-6 lg:py-8 flex flex-col justify-center order-2 lg:order-1">
                  <h4 className="text-base sm:text-lg font-semibold text-white mb-2">
                    {lang === "en" ? "Technical Intelligence" : "מודיעין טכני"}
                  </h4>
                  <p className="text-sm text-gray-400 leading-relaxed max-w-xl">
                    {lang === "en"
                      ? "Backed by a document repository of 30,000+ technical PDFs — load charts, specifications, and engineering data for every equipment model."
                      : "נתמך על ידי מאגר מסמכים של 30,000+ קבצי PDF טכניים — טבלאות עומסים, מפרטים ונתוני הנדסה לכל דגם ציוד."}
                  </p>
                  <div className="mt-4 flex items-baseline gap-1.5">
                    <span className="text-xl font-black text-accent">30,000+</span>
                    <span className="text-xs text-gray-500">{lang === "en" ? "Technical Documents" : "מסמכים טכניים"}</span>
                  </div>
                </div>
                <div className="flex-shrink-0 lg:w-72 xl:w-80 order-1 lg:order-2 flex justify-center lg:justify-center pt-4 lg:pt-0 lg:px-6 lg:pb-6">
                  <Image
                    src="/crane-app.png"
                    alt="EQS.PORT Crane Specifications App"
                    width={400}
                    height={700}
                    quality={95}
                    sizes="(max-width: 1024px) 200px, 320px"
                    className="w-[200px] sm:w-[220px] lg:w-full max-w-[280px] h-auto rounded-lg shadow-lg"
                  />
                </div>
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
                src="/africa-minerals.png"
                alt="Africa Strategic Minerals Map 2026"
                width={1200}
                height={1400}
                quality={95}
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 2400px"
                className="w-full h-auto"
              />
              <div className="p-5 sm:p-6">
                <h4 className="text-base sm:text-lg font-semibold text-white mb-1.5">
                  {lang === "en" ? "Strategic Market Intelligence" : "מודיעין שווקים אסטרטגי"}
                </h4>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {lang === "en"
                    ? "Using market data on strategic materials and minerals suppliers, infrastructure projects, and emerging opportunities — for example, Africa is one of the world's fastest-growing industrial markets."
                    : "שימוש בנתוני שוק על ספקי חומרים ומינרלים אסטרטגיים, פרויקטי תשתית והזדמנויות מתפתחות לדוגמא — אפריקה — אחד השווקים התעשייתיים הצומחים ביותר בעולם."}
                </p>
              </div>
            </motion.div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
