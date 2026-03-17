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

  return (
    <section id="invest" className="relative py-24 md:py-32 overflow-hidden">
      <div className="animated-grid-bg absolute inset-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-accent/3 rounded-full blur-3xl" />

      <div className="relative z-10 section-container">
        <ScrollReveal>
          <div className="text-center mb-4">
            <span className="text-accent font-mono text-base sm:text-lg tracking-widest uppercase">
              {tx(t.invest.label, lang)}
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
            {tx(t.invest.headline, lang)}{" "}
            <span className="gradient-text">{tx(t.invest.headlineAccent, lang)}</span>
          </h2>
        </ScrollReveal>

        {/* Main funding card */}
        <ScrollReveal>
          <motion.div whileHover={{ scale: 1.005 }} className="max-w-4xl mx-auto mb-16">
            <div className="relative rounded-2xl p-[1px] bg-gradient-to-r from-accent via-neon-cyan to-neon-purple">
              <div className="bg-dark-800 rounded-2xl p-8 md:p-12">
                <div className="text-center mb-8">
                  <div className="text-sm text-accent font-mono tracking-widest mb-3">
                    {tx(t.invest.seedLabel, lang)}
                  </div>
                  <div className="text-5xl md:text-7xl font-black text-white mb-2">
                    {t.invest.amount}
                    <span className="text-2xl md:text-3xl text-gray-400 font-normal ml-2">
                      {tx(t.invest.amountUnit, lang)}
                    </span>
                  </div>
                  <div className="text-gray-400 text-lg">{tx(t.invest.duration, lang)}</div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-accent" />
                      {tx(t.invest.revenueTitle, lang)}
                    </h3>
                    <div className="space-y-3">
                      {revenueStreams.map((stream) => (
                        <div key={stream.title} className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent/5 transition-colors">
                          <div className="text-accent mt-0.5">{stream.icon}</div>
                          <div>
                            <div className="font-medium text-white text-sm">{stream.title}</div>
                            <div className="text-xs text-gray-500">{stream.desc}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-neon-cyan" />
                      {tx(t.invest.fundsTitle, lang)}
                    </h3>
                    <div className="space-y-2">
                      {funds.map((use, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: lang === "he" ? -20 : 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-center gap-3 text-sm"
                        >
                          <svg className="w-4 h-4 text-accent flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                          </svg>
                          <span className="text-gray-300">{use}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* PDF downloads */}
                <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
                  <motion.a
                    href="/pitch-deck.pdf"
                    download
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-accent/30 text-accent hover:bg-accent/10 font-semibold rounded-xl transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>
                    {tx(t.invest.downloadPdf, lang)}
                  </motion.a>
                  <motion.a
                    href="/EQS.PORT.1P.pdf"
                    download
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-neon-purple/30 text-neon-purple hover:bg-neon-purple/10 font-semibold rounded-xl transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                    {tx(t.invest.downloadOnePager, lang)}
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>
        </ScrollReveal>

        {/* Proven track record - prominent callout */}
        <ScrollReveal delay={0.2}>
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="max-w-4xl mx-auto"
          >
            <div className="relative rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-accent/10 to-green-500/10" />
              <div className="relative px-8 md:px-12 py-8 border border-green-500/20 rounded-2xl">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                    </svg>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white">
                    {lang === "en" ? "Proven Track Record" : "רקורד מוכח"}
                  </h3>
                </div>
                <p className="text-lg md:text-xl text-center text-gray-200 leading-relaxed max-w-3xl mx-auto whitespace-pre-line">
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
