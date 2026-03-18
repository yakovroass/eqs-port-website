"use client";

import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { useLanguage, tx } from "@/lib/useLanguage";
import { t } from "@/lib/translations";

export default function Investment() {
  const { lang } = useLanguage();

  const revenueStreams = [
    { title: tx(t.invest.rev1, lang), desc: tx(t.invest.rev1d, lang), icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg> },
    { title: tx(t.invest.rev2, lang), desc: tx(t.invest.rev2d, lang), icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" /></svg> },
    { title: tx(t.invest.rev3, lang), desc: tx(t.invest.rev3d, lang), icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" /></svg> },
  ];

  const funds = [
    tx(t.invest.fund1, lang), tx(t.invest.fund2, lang), tx(t.invest.fund3, lang),
    tx(t.invest.fund4, lang), tx(t.invest.fund5, lang), tx(t.invest.fund6, lang),
  ];

  const dlBtn =
    "flex flex-1 min-w-0 max-w-[10.5rem] sm:max-w-none items-center justify-center gap-1.5 sm:gap-2 py-2.5 sm:py-3 px-2 sm:px-5 rounded-xl font-semibold whitespace-nowrap text-[11px] sm:text-sm transition-colors";

  return (
    <section id="invest" className="relative py-24 md:py-32 overflow-hidden">
      <div className="animated-grid-bg absolute inset-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-accent/3 rounded-full blur-3xl" />

      <div className="relative z-10 section-container">
        <ScrollReveal>
          <div className="text-center mb-6">
            <span className="section-label headline-font text-3xl sm:text-4xl md:text-5xl text-amber-400 tracking-wide uppercase">
              {tx(t.invest.label, lang)}
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-14">
            {tx(t.invest.headline, lang)}{" "}
            <span className="gradient-text">{tx(t.invest.headlineAccent, lang)}</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal>
          <motion.div whileHover={{ scale: 1.002 }} className="max-w-4xl mx-auto mb-16">
            <div className="relative rounded-3xl p-[1px] bg-gradient-to-br from-accent/80 via-neon-cyan/50 to-neon-purple/60">
              <div className="bg-dark-900/95 backdrop-blur-sm rounded-3xl px-5 py-8 sm:px-10 sm:py-10 md:px-12 md:py-12">
                <div className="text-center border-b border-gray-700/40 pb-8 mb-8">
                  <p className="text-xs sm:text-sm font-semibold text-accent tracking-[0.2em] uppercase mb-4">
                    {tx(t.invest.seedLabel, lang)}
                  </p>
                  <p className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tabular-nums leading-none mb-3">
                    {t.invest.amount}
                    <span className="text-xl sm:text-2xl md:text-3xl text-gray-400 font-semibold ms-2">
                      {tx(t.invest.amountUnit, lang)}
                    </span>
                  </p>
                  <p className="text-gray-400 text-base sm:text-lg">{tx(t.invest.duration, lang)}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-5 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-accent shrink-0" />
                      {tx(t.invest.revenueTitle, lang)}
                    </h3>
                    <ul className="space-y-3">
                      {revenueStreams.map((stream) => (
                        <li key={stream.title} className="flex gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-gray-800/60 hover:border-accent/15 transition-colors">
                          <div className="text-accent shrink-0 mt-0.5">{stream.icon}</div>
                          <div className="min-w-0">
                            <div className="font-semibold text-white text-sm sm:text-base">{stream.title}</div>
                            <div className="text-sm text-gray-500 mt-0.5 leading-snug">{stream.desc}</div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <ul className="space-y-2.5">
                      {funds.map((use, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: lang === "he" ? -12 : 12 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.06 }}
                          className="flex items-start gap-3 text-sm sm:text-base text-gray-300"
                        >
                          <svg className="w-4 h-4 text-accent shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                          </svg>
                          <span className="leading-snug">{use}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-10 flex flex-nowrap justify-center gap-2 sm:gap-3 w-full max-w-2xl mx-auto">
                  <motion.a
                    href="/pitch-deck.pdf"
                    download
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className={`${dlBtn} border border-accent/40 text-accent hover:bg-accent/10`}
                  >
                    <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>
                    <span className="sm:hidden">{tx(t.invest.downloadPdfShort, lang)}</span>
                    <span className="hidden sm:inline">{tx(t.invest.downloadPdf, lang)}</span>
                  </motion.a>
                  <motion.a
                    href="/EQS.PORT.1P.pdf"
                    download
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className={`${dlBtn} border border-neon-purple/40 text-neon-purple hover:bg-neon-purple/10`}
                  >
                    <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>
                    <span className="sm:hidden">{tx(t.invest.downloadOnePagerShort, lang)}</span>
                    <span className="hidden sm:inline">{tx(t.invest.downloadOnePager, lang)}</span>
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <motion.div whileHover={{ scale: 1.01 }} className="max-w-4xl mx-auto">
            <div className="relative rounded-2xl overflow-hidden border border-accent/25 bg-gradient-to-br from-accent/[0.08] to-neon-cyan/[0.05]">
              <div className="px-6 sm:px-10 py-8 sm:py-10">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-5">
                  <div className="w-11 h-11 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                    </svg>
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white text-center sm:text-start">
                    {tx(t.invest.provenTitle, lang)}
                  </h3>
                </div>
                <p className="text-base sm:text-lg md:text-xl text-center text-gray-200 leading-relaxed max-w-3xl mx-auto">
                  {tx(t.invest.proven, lang)}
                </p>
              </div>
            </div>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
}
