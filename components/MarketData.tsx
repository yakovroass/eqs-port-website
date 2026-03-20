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
    from: { year: "2024", value: 35.6, label: "35.6 B" },
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
    focus: { en: "Parts, maintenance & service", he: "חלפים, תחזוקה ושירות" },
  },
];

const total = {
  category: { en: "TOTAL DIRECT MARKET POTENTIAL", he: "סה\"כ פוטנציאל שוק ישיר" },
  market: "$432B+",
  clients: { en: "2M+ Global Companies", he: "2M+ חברות גלובליות" },
  focus: { en: "Europe, USA, Asia-Pacific", he: "אירופה, ארה\"ב, אסיה-פסיפיק" },
};

const CHART_H_DEFAULT = 160;
/** גרף טריליונים — גבוה יותר כדי שהבארים והיחידה USD T יבלטו */
const CHART_H_LARGE = 280;

function GrowthBar({
  fromPct,
  toPct,
  fromLabel,
  toLabel,
  fromYear,
  toYear,
  chartHeight = CHART_H_DEFAULT,
  barClass = "w-10 sm:w-16 md:w-20",
}: {
  fromPct: number;
  toPct: number;
  fromLabel: string;
  toLabel: string;
  fromYear: string;
  toYear: string;
  chartHeight?: number;
  barClass?: string;
}) {
  const fromH = Math.max(28, Math.round((fromPct / 100) * chartHeight));
  const toH = Math.max(28, Math.round((toPct / 100) * chartHeight));

  return (
    <div className="flex flex-col items-center flex-1 w-full" dir="ltr">
      <div className="flex items-end gap-2 sm:gap-4 justify-center w-full" style={{ height: chartHeight }}>
        <motion.div
          initial={{ height: 0 }}
          whileInView={{ height: fromH }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`${barClass} bg-accent rounded-t-md flex items-center justify-center shrink-0`}
        >
          <span className="text-[9px] sm:text-xs md:text-sm font-bold text-white whitespace-nowrap px-0.5" dir="ltr">
            {fromLabel}
          </span>
        </motion.div>
        <motion.div
          initial={{ height: 0 }}
          whileInView={{ height: toH }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
          className={`${barClass} bg-emerald-500 rounded-t-md flex items-center justify-center shrink-0`}
        >
          <span className="text-[9px] sm:text-xs md:text-sm font-bold text-white whitespace-nowrap px-0.5" dir="ltr">
            {toLabel}
          </span>
        </motion.div>
      </div>
      <div className={`flex gap-2 sm:gap-4 mt-1.5 ${barClass.includes("w-14") ? "gap-3 sm:gap-4" : ""}`} dir="ltr">
        <span className={`${barClass} text-center text-[9px] sm:text-[11px] text-gray-400 shrink-0`}>{fromYear}</span>
        <span className={`${barClass} text-center text-[9px] sm:text-[11px] text-gray-400 shrink-0`}>{toYear}</span>
      </div>
    </div>
  );
}

function ChartCard({
  chart,
  lang,
  chartHeight,
  barClass,
  minHClass,
  largeTitle = false,
}: {
  chart: (typeof charts)[0];
  lang: "en" | "he";
  chartHeight: number;
  barClass: string;
  minHClass: string;
  largeTitle?: boolean;
}) {
  return (
    <div className={`flex flex-col ${minHClass}`}>
      <div
        className={`glass-card rounded-t-lg sm:rounded-t-xl border-b-0 px-2 py-3 sm:px-4 sm:py-4 flex flex-col items-center justify-center text-center shrink-0 ${
          largeTitle
            ? "h-[6.25rem] min-[400px]:h-[6.75rem] sm:h-[7.25rem] md:h-[7.75rem]"
            : "h-[5.5rem] min-[400px]:h-[6rem] sm:h-[6.5rem] md:h-[7rem]"
        }`}
      >
        <h3
          className={`font-semibold text-white leading-snug line-clamp-3 ${
            largeTitle
              ? "text-sm min-[380px]:text-base sm:text-lg md:text-xl"
              : "text-[11px] min-[380px]:text-sm sm:text-base md:text-lg"
          }`}
        >
          {chart.title[lang]}
        </h3>
        <div
          className={`mt-1 shrink-0 font-medium ${
            largeTitle ? "text-[10px] sm:text-sm text-emerald-400/90" : "text-[9px] sm:text-xs text-gray-500"
          }`}
        >
          ({chart.unit})
        </div>
      </div>
      <div
        className={`glass-card rounded-b-lg sm:rounded-b-xl border-t-0 -mt-px flex-1 flex flex-col justify-end px-2 pb-3 sm:px-4 sm:pb-5 pt-2 ${chartHeight >= CHART_H_LARGE ? "min-h-[280px] sm:min-h-[300px]" : "min-h-[200px] sm:min-h-[210px]"}`}
      >
        <GrowthBar
          fromPct={(chart.from.value / chart.maxVal) * 100}
          toPct={(chart.to.value / chart.maxVal) * 100}
          fromLabel={chart.from.label}
          toLabel={chart.to.label}
          fromYear={chart.from.year}
          toYear={chart.to.year}
          chartHeight={chartHeight}
          barClass={barClass}
        />
      </div>
    </div>
  );
}

export default function MarketData() {
  const { lang } = useLanguage();
  const [chartTrillions, ...chartsBillions] = charts;

  return (
    <section id="market" className="relative py-24 md:py-32 overflow-hidden">
      <div className="animated-grid-bg absolute inset-0" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[300px] bg-accent/5 rounded-full blur-3xl" />

      <div className="relative z-10 section-container">
        <ScrollReveal>
          <div className="text-center mb-6">
            <span className="section-label headline-font text-3xl sm:text-4xl md:text-5xl text-amber-400 tracking-wide uppercase">
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

        {/* Growth charts — טריליונים למעלה (גדול), מיליארדים בשתי עמודות למטה */}
        <ScrollReveal>
          <div className="max-w-3xl mx-auto mb-8 sm:mb-10">
            <ChartCard
              chart={chartTrillions}
              lang={lang}
              chartHeight={CHART_H_LARGE}
              barClass="w-16 sm:w-28 md:w-36"
              minHClass="min-h-[360px] sm:min-h-[380px] max-w-xl mx-auto"
              largeTitle
            />
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-6 max-w-3xl mx-auto mb-16 items-stretch">
            {chartsBillions.map((chart) => (
              <ChartCard
                key={chart.from.label}
                chart={chart}
                lang={lang}
                chartHeight={CHART_H_DEFAULT}
                barClass="w-10 sm:w-16 md:w-20"
                minHClass="min-h-[300px] sm:min-h-[320px]"
              />
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
          <div className="grid grid-cols-3 gap-1.5 sm:flex sm:flex-wrap sm:justify-center sm:gap-12 mt-12 max-w-xl sm:max-w-none mx-auto px-1">
            <div className="text-center min-w-0 px-0.5">
              <div className="text-[clamp(1.1rem,4.2vw,1.85rem)] sm:text-3xl md:text-5xl font-black text-white tabular-nums leading-none">
                $<AnimatedCounter target={432} suffix="B+" duration={2} />
              </div>
              <div className="text-[9px] leading-snug sm:text-sm text-gray-500 mt-1">
                {lang === "en" ? "Total Market" : "שוק כולל"}
              </div>
            </div>
            <div className="text-center min-w-0 px-0.5">
              <div className="text-[clamp(1.1rem,4.2vw,1.85rem)] sm:text-3xl md:text-5xl font-black text-white tabular-nums leading-none">
                <AnimatedCounter target={2} suffix="M+" duration={1.5} />
              </div>
              <div className="text-[9px] leading-snug sm:text-sm text-gray-500 mt-1">
                {lang === "en" ? "Potential Clients" : "לקוחות פוטנציאליים"}
              </div>
            </div>
            <div className="text-center min-w-0 px-0.5">
              <div className="text-[clamp(1.1rem,4.2vw,1.85rem)] sm:text-3xl md:text-5xl font-black text-cyan-300 tabular-nums leading-none">
                <AnimatedCounter target={62} suffix="%" duration={2} />
              </div>
              <div className="text-[9px] leading-snug sm:text-sm text-gray-500 mt-1">
                {lang === "en" ? "Projected Growth by 2030" : "צמיחה צפויה עד 2030"}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
