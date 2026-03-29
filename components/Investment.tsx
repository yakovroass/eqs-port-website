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
    tx(t.invest.fund1, lang),
    tx(t.invest.fund2, lang),
    tx(t.invest.fund3, lang),
    tx(t.invest.fund4, lang),
    tx(t.invest.fund5, lang),
    tx(t.invest.fund6, lang),
    tx(t.invest.fund7, lang),
  ];

  return (
    <section id="invest" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-accent/3 rounded-full blur-3xl" />

      <div className="relative z-10 section-container">
        <ScrollReveal delay={0.08}>
          <div className="text-center mb-6">
            <span className="section-label headline-font text-3xl sm:text-4xl md:text-5xl text-amber-400 tracking-wide uppercase">
              {tx(t.invest.label, lang)}
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-14">
            {tx(t.invest.headline, lang)}{lang === "he" ? "" : " "}
            <span className="gradient-text">{tx(t.invest.headlineAccent, lang)}</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.12}>
          <motion.div whileHover={{ scale: 1.002 }} className="max-w-5xl mx-auto w-full mb-16">
            <div className="relative rounded-3xl overflow-hidden glass-card ring-1 ring-accent/12 shadow-[0_8px_40px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.05)]">
              <div className="relative z-[1] px-5 py-8 sm:px-10 sm:py-10 md:px-12 md:py-12">
                <div className="text-center border-b border-gray-700/25 pb-8 mb-8">
                  <p className="text-sm sm:text-base md:text-lg font-semibold tracking-[0.2em] uppercase mb-4 gradient-text">
                    {tx(t.invest.seedLabel, lang)}
                  </p>
                  <p className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tabular-nums leading-none mb-3">
                    <span dir="ltr" className="inline-block">{tx(t.invest.amount, lang)}</span>
                    {tx(t.invest.amountUnit, lang) ? (
                      <span className="text-xl sm:text-2xl md:text-3xl text-gray-400 font-semibold ms-2">
                        {tx(t.invest.amountUnit, lang)}
                      </span>
                    ) : null}
                  </p>
                  <p className="text-gray-400 text-base sm:text-lg">{tx(t.invest.duration, lang)}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 md:gap-12 md:items-center">
                  <div className="min-w-0">
                    <ul
                      className={
                        lang === "en" ? "space-y-4 sm:space-y-6" : "space-y-3 sm:space-y-4"
                      }
                    >
                      {revenueStreams.map((stream) => (
                        <li
                          key={stream.title}
                          className={`flex gap-3 rounded-xl glass-inset hover:border-accent/35 transition-colors ${
                            lang === "en" ? "p-4 sm:p-[1.125rem]" : "p-3.5"
                          }`}
                        >
                          <div className="text-accent shrink-0 mt-0.5">{stream.icon}</div>
                          <div className="min-w-0">
                            <div className="font-semibold text-white text-sm sm:text-base">{stream.title}</div>
                            <div className="text-sm text-gray-500 mt-0.5 leading-snug">{stream.desc}</div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="min-w-0 md:ps-1">
                    <ul className="space-y-3 sm:space-y-3.5">
                      {funds.map((use, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: lang === "he" ? -12 : 12 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.06 }}
                          className="flex items-start gap-3 text-sm sm:text-base text-gray-300 leading-relaxed"
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
              </div>
            </div>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
}
