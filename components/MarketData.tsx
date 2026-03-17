"use client";

import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import AnimatedCounter from "./AnimatedCounter";
import { useLanguage, tx } from "@/lib/useLanguage";
import { t } from "@/lib/translations";

const charts = [
  {
    title: { en: "Construction Market", he: "שוק הבנייה" },
    unit: "USD T",
    from: { year: "2024", value: 14.5, label: "14.5 T" },
    to: { year: "2030", value: 23.5, label: "23.5 T" },
    maxVal: 30,
  },
  {
    title: { en: "Crane Market", he: "שוק המנופים" },
    unit: "USD B",
    from: { year: "2023", value: 35.6, label: "35.6 B" },
    to: { year: "2030", value: 49.1, label: "49.1 B" },
    maxVal: 60,
  },
  {
    title: { en: "Used Equipment", he: "ציוד משומש" },
    unit: "USD B",
    from: { year: "2024", value: 22.5, label: "22.5 B" },
    to: { year: "2030", value: 35.8, label: "35.8 B" },
    maxVal: 60,
  },
];

const tableRows = [
  {
    category: { en: "Industrial Materials & Supplies", he: "חומרים ואספקה תעשייתית" },
    market: "$260B+",
    clients: { en: "~1.5 Million", he: "~1.5 מיליון" },
    focus: { en: "Infrastructure & Building Projects", he: "תשתיות ופרויקטי בנייה" },
  },
  {
    category: { en: "Used Equipment & Rental", he: "ציוד משומש והשכרה" },
    market: "$140B+",
    clients: { en: "~100,000 Rental Firms", he: "~100,000 חברות השכרה" },
    focus: { en: "Heavy Machinery (Incl. Cranes)", he: "מכונות כבדות (כולל מנופים)" },
  },
  {
    category: { en: "Spare Parts & Components", he: "חלקי חילוף ורכיבים" },
    market: "$32B+",
    clients: { en: "~1 Million Equipment Owners", he: "~1 מיליון בעלי ציוד" },
    focus: { en: "Maintenance & Longevity", he: "תחזוקה ואריכות חיים" },
  },
];

const total = {
  category: { en: "TOTAL DIRECT MARKET POTENTIAL", he: "סה\"כ פוטנציאל שוק ישיר" },
  market: "$432B+",
  clients: { en: "2M+ Global Companies", he: "2M+ חברות גלובליות" },
  focus: { en: "Europe, USA, Asia-Pacific", he: "אירופה, ארה\"ב, אסיה-פסיפיק" },
};

const CHART_H = 160;

function GrowthBar({ fromPct, toPct, fromLabel, toLabel, fromYear, toYear }: {
  fromPct: number; toPct: number; fromLabel: string; toLabel: string; fromYear: string; toYear: string;
}) {
  const fromH = Math.max(24, Math.round((fromPct / 100) * CHART_H));
  const toH = Math.max(24, Math.round((toPct / 100) * CHART_H));

  return (
    <div className="flex flex-col items-center flex-1" dir="ltr">
      <div className="flex items-end gap-2 sm:gap-3 justify-center" style={{ height: CHART_H }}>
        <motion.div
          initial={{ height: 0 }}
          whileInView={{ height: fromH }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="w-10 sm:w-16 md:w-20 bg-accent rounded-t-md flex items-center justify-center"
        >
          <span className="text-[9px] sm:text-xs font-bold text-white whitespace-nowrap" dir="ltr">{fromLabel}</span>
        </motion.div>
        <motion.div
          initial={{ height: 0 }}
          whileInView={{ height: toH }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
          className="w-10 sm:w-16 md:w-20 bg-green-500 rounded-t-md flex items-center justify-center"
        >
          <span className="text-[9px] sm:text-xs font-bold text-white whitespace-nowrap" dir="ltr">{toLabel}</span>
        </motion.div>
      </div>
      <div className="flex gap-2 sm:gap-3 mt-1.5" dir="ltr">
        <span className="w-10 sm:w-16 md:w-20 text-center text-[9px] sm:text-[11px] text-gray-400">{fromYear}</span>
        <span className="w-10 sm:w-16 md:w-20 text-center text-[9px] sm:text-[11px] text-gray-400">{toYear}</span>
      </div>
    </div>
  );
}

export default function MarketData() {
  const { lang } = useLanguage();

  return (
    <section id="market" className="relative py-24 md:py-32 overflow-hidden">
      <div className="animated-grid-bg absolute inset-0" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[300px] bg-green-500/3 rounded-full blur-3xl" />

      <div className="relative z-10 section-container">
        <ScrollReveal>
          <div className="text-center mb-6">
            <span className="section-label headline-font text-2xl sm:text-3xl md:text-4xl text-amber-400 tracking-wide uppercase">
              {tx(t.market.label, lang)}
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-6">
            <span className="gradient-text">{tx(t.market.headline, lang)}</span>
          </h2>
          <p className="text-gray-400 text-center max-w-3xl mx-auto mb-16 text-lg leading-relaxed">
            {tx(t.market.sub, lang)}
          </p>
        </ScrollReveal>

        {/* Growth charts */}
        <ScrollReveal>
          <div className="grid grid-cols-3 gap-2 sm:gap-6 max-w-3xl mx-auto mb-16">
            {charts.map((chart) => (
              <div key={chart.from.label} className="glass-card rounded-lg sm:rounded-xl p-2 sm:p-5 text-center flex flex-col">
                <h3 className="text-sm sm:text-base md:text-lg font-semibold text-white mb-0.5 sm:mb-1">
                  {chart.title[lang]}
                </h3>
                <div className="text-[10px] sm:text-xs text-gray-500 mb-3 sm:mb-6">({chart.unit})</div>
                <GrowthBar
                  fromPct={(chart.from.value / chart.maxVal) * 100}
                  toPct={(chart.to.value / chart.maxVal) * 100}
                  fromLabel={chart.from.label}
                  toLabel={chart.to.label}
                  fromYear={chart.from.year}
                  toYear={chart.to.year}
                />
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Market table */}
        <ScrollReveal delay={0.2}>
          <div className="max-w-5xl mx-auto">
            <div className="overflow-x-auto rounded-xl border border-gray-700/30">
              <table className="w-full min-w-0">
                <thead>
                  <tr className="bg-accent/10 border-b border-accent/20">
                    <th className="px-2 sm:px-5 py-2.5 text-left text-[9px] sm:text-xs font-bold text-accent uppercase tracking-wider">
                      {lang === "en" ? "Category" : "קטגוריה"}
                    </th>
                    <th className="px-2 sm:px-5 py-2.5 text-left text-[9px] sm:text-xs font-bold text-accent uppercase tracking-wider">
                      {lang === "en" ? "Market" : "שוק"}
                    </th>
                    <th className="px-2 sm:px-5 py-2.5 text-left text-[9px] sm:text-xs font-bold text-accent uppercase tracking-wider">
                      {lang === "en" ? "Potential Clients (Companies)" : "לקוחות פוטנציאליים (חברות)"}
                    </th>
                    <th className="px-2 sm:px-5 py-2.5 text-left text-[9px] sm:text-xs font-bold text-accent uppercase tracking-wider hidden sm:table-cell">
                      {lang === "en" ? "Key Focus / Regions" : "מיקוד מפתח / אזורים"}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tableRows.map((row, i) => (
                    <motion.tr
                      key={i}
                      initial={{ opacity: 0, x: lang === "he" ? 20 : -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="border-b border-gray-700/20 hover:bg-accent/5 transition-colors"
                    >
                      <td className="px-2 sm:px-5 py-3 text-[10px] sm:text-sm text-gray-300 font-medium">{row.category[lang]}</td>
                      <td className="px-2 sm:px-5 py-3 text-[10px] sm:text-sm text-white font-bold">{row.market}</td>
                      <td className="px-2 sm:px-5 py-3 text-[10px] sm:text-sm text-gray-400">{row.clients[lang]}</td>
                      <td className="px-2 sm:px-5 py-3 text-[10px] sm:text-sm text-gray-500 hidden sm:table-cell">{row.focus[lang]}</td>
                    </motion.tr>
                  ))}
                  <motion.tr
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="bg-accent/10 border-t-2 border-accent/30"
                  >
                    <td className="px-2 sm:px-5 py-3 text-[10px] sm:text-sm text-accent font-bold">{total.category[lang]}</td>
                    <td className="px-2 sm:px-5 py-3 text-sm sm:text-xl text-accent font-black">{total.market}</td>
                    <td className="px-2 sm:px-5 py-3 text-[10px] sm:text-sm text-accent font-semibold">{total.clients[lang]}</td>
                    <td className="px-2 sm:px-5 py-3 text-[10px] sm:text-sm text-accent font-semibold hidden sm:table-cell">{total.focus[lang]}</td>
                  </motion.tr>
                </tbody>
              </table>
            </div>
          </div>
        </ScrollReveal>

        {/* Big number highlight */}
        <ScrollReveal delay={0.3}>
          <div className="flex flex-wrap justify-center gap-6 sm:gap-12 mt-12">
            <div className="text-center">
              <div className="text-3xl sm:text-5xl font-black text-white">
                $<AnimatedCounter target={432} suffix="B+" duration={2} />
              </div>
              <div className="text-xs sm:text-sm text-gray-500 mt-1">{lang === "en" ? "Total Market" : "שוק כולל"}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-5xl font-black text-white">
                <AnimatedCounter target={2} suffix="M+" duration={1.5} />
              </div>
              <div className="text-xs sm:text-sm text-gray-500 mt-1">{lang === "en" ? "Potential Clients" : "לקוחות פוטנציאליים"}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-5xl font-black gradient-text">
                <AnimatedCounter target={62} suffix="%" duration={2} />
              </div>
              <div className="text-xs sm:text-sm text-gray-500 mt-1">{lang === "en" ? "Projected Growth by 2030" : "צמיחה צפויה עד 2030"}</div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
