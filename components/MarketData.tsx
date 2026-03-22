"use client";

import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import AnimatedCounter from "./AnimatedCounter";
import { useLanguage, tx } from "@/lib/useLanguage";
import { t } from "@/lib/translations";

/** גרפים — מספרים כפי שמופיעים בדוחות: ResearchAndMarkets/Globe Newswire, Grand View Research, Strategic Market Research */
const charts = [
  {
    title: { en: "Construction market", he: "שוק הבנייה" },
    unit: "USD T",
    from: { year: "2024", value: 15.8, label: "15.8 T" },
    to: { year: "2030", value: 21.7, label: "21.7 T" },
    maxVal: 30,
  },
  {
    title: { en: "The crane market", he: "שוק המנופים" },
    unit: "USD B",
    from: { year: "2023", value: 35.6, label: "35.6 B" },
    to: { year: "2030", value: 49.1, label: "49.1 B" },
    maxVal: 60,
  },
  {
    title: { en: "Used equipment", he: "ציוד משומש" },
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
  clients: { en: "2M+ Companies", he: "2M+ חברות" },
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
  heightBoost = 1,
}: {
  fromPct: number;
  toPct: number;
  fromLabel: string;
  toLabel: string;
  fromYear: string;
  toYear: string;
  chartHeight?: number;
  barClass?: string;
  heightBoost?: number;
}) {
  const fromH = Math.max(28, Math.min(chartHeight, Math.round((fromPct / 100) * chartHeight * heightBoost)));
  const toH = Math.max(28, Math.min(chartHeight, Math.round((toPct / 100) * chartHeight * heightBoost)));

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
        <span className={`${barClass} text-center text-[10px] sm:text-xs md:text-sm text-gray-300 shrink-0`}>{fromYear}</span>
        <span className={`${barClass} text-center text-[10px] sm:text-xs md:text-sm text-gray-300 shrink-0`}>{toYear}</span>
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
  heightBoost = 1,
}: {
  chart: (typeof charts)[0];
  lang: "en" | "he";
  chartHeight: number;
  barClass: string;
  minHClass: string;
  largeTitle?: boolean;
  heightBoost?: number;
}) {
  const titleBlockH = largeTitle
    ? "h-[6.25rem] min-[400px]:h-[6.75rem] sm:h-[7.25rem] md:h-[7.75rem]"
    : "h-[5.5rem] min-[400px]:h-[6rem] sm:h-[6.5rem] md:h-[7rem]";

  const chartAreaMinH =
    chartHeight >= CHART_H_LARGE ? "min-h-[280px] sm:min-h-[300px]" : "min-h-[200px] sm:min-h-[210px]";

  return (
    <div className={`flex flex-col ${minHClass}`}>
      <div
        className={`glass-card rounded-t-lg sm:rounded-t-xl border-b-0 px-2 py-3 sm:px-4 sm:py-4 flex flex-col items-center justify-center text-center shrink-0 ${titleBlockH}`}
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
        className={`glass-card rounded-b-lg sm:rounded-b-xl border-t-0 -mt-px flex-1 flex flex-col justify-end px-2 pb-3 sm:px-4 sm:pb-5 pt-2 ${chartAreaMinH}`}
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
          heightBoost={heightBoost}
        />
      </div>
    </div>
  );
}

export default function MarketData() {
  const { lang } = useLanguage();

  return (
    <section id="market" className="relative py-24 md:py-32 overflow-hidden">
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

        {/* גרפי צמיחה — כל אחד בקוביית glass נפרדת, מיושרים לרוחב הטבלה */}
        <ScrollReveal>
          <div className="max-w-5xl mx-auto grid grid-cols-3 gap-2 sm:gap-6 mb-12 sm:mb-14 items-stretch">
            {charts.map((chart, i) => (
              <ChartCard
                key={`${chart.from.label}-${i}`}
                chart={chart}
                lang={lang}
                chartHeight={CHART_H_DEFAULT}
                barClass="w-10 sm:w-14 md:w-16"
                minHClass="min-h-[300px] sm:min-h-[320px]"
                largeTitle={false}
                heightBoost={i === 0 ? 1.22 : 1}
              />
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.08}>
          <div className="max-w-5xl mx-auto mb-6">
            <div className="glass-card rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
              <table className="w-full min-w-0">
                <thead>
                  <tr className="border-b border-[rgba(0,168,255,0.12)] bg-white/[0.03]">
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
                      className="border-b border-white/[0.06] hover:bg-white/[0.03] transition-colors"
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
                    className="bg-white/[0.05] border-t border-[rgba(0,168,255,0.15)]"
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
            <p className="mt-3 text-center text-[11px] sm:text-xs text-gray-500 leading-relaxed max-w-3xl mx-auto px-2">
              {tx(t.market.dataNote, lang)}
            </p>
          </div>
        </ScrollReveal>

        {/* מונים — $432B · 2M+ · 62% */}
        <ScrollReveal delay={0.2}>
          <div className="grid grid-cols-3 gap-3 sm:flex sm:flex-wrap sm:justify-center sm:gap-12 md:gap-16 mt-10 max-w-2xl sm:max-w-none mx-auto px-2">
            <div className="text-center min-w-0">
              <div className="text-[clamp(1.05rem,3.8vw,1.85rem)] sm:text-3xl md:text-5xl font-black text-white tabular-nums leading-none">
                $<AnimatedCounter target={432} suffix="B+" duration={2} />
              </div>
              <div className="text-[9px] leading-snug sm:text-sm text-gray-500 mt-1">
                {tx(t.market.statDirectTotalLabel, lang)}
              </div>
            </div>
            <div className="text-center min-w-0">
              <div className="text-[clamp(1.05rem,3.8vw,1.85rem)] sm:text-3xl md:text-5xl font-black text-white tabular-nums leading-none">
                <AnimatedCounter target={2} suffix="M+" duration={1.5} />
              </div>
              <div className="text-[9px] leading-snug sm:text-sm text-gray-500 mt-1">
                {tx(t.market.statPotentialClientsLabel, lang)}
              </div>
            </div>
            <div className="text-center min-w-0">
              <div className="text-[clamp(1.05rem,3.8vw,1.85rem)] sm:text-3xl md:text-5xl font-black tabular-nums leading-none" dir="ltr">
                <AnimatedCounter target={62} suffix="%" duration={1.8} className="text-accent inline-block" />
              </div>
              <div className="text-[9px] leading-snug sm:text-sm text-gray-500 mt-1">
                {tx(t.market.statGrowthLabel, lang)}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
