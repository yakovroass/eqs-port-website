"use client";

import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { useLanguage, tx } from "@/lib/useLanguage";
import { t } from "@/lib/translations";

export default function Problem() {
  const { lang } = useLanguage();
  const pains = [
    { title: tx(t.problem.pain1, lang), desc: tx(t.problem.pain1d, lang) },
    { title: tx(t.problem.pain2, lang), desc: tx(t.problem.pain2d, lang) },
    { title: tx(t.problem.pain3, lang), desc: tx(t.problem.pain3d, lang) },
    { title: tx(t.problem.pain4, lang), desc: tx(t.problem.pain4d, lang) },
  ];

  return (
    <section id="problem" className="relative py-24 md:py-32">
      <div className="animated-grid-bg absolute inset-0" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-amber-500/3 rounded-full blur-3xl" />

      <div className="relative z-10 section-container">
        <ScrollReveal>
          <div className="text-center mb-6">
            <span className="section-label headline-font text-3xl sm:text-4xl md:text-5xl text-amber-400 tracking-wide uppercase">
              {tx(t.problem.label, lang)}
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-6 text-white">
            {tx(t.problem.headline, lang)}
          </h2>
          <p
            className={`text-gray-400 text-center max-w-3xl mx-auto mb-16 text-lg leading-relaxed ${
              lang === "he" ? "whitespace-pre-line" : ""
            }`}
          >
            {tx(t.problem.sub, lang)}
          </p>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 gap-5 sm:gap-6 max-w-4xl mx-auto items-stretch">
          {pains.map((pain, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <motion.div
                whileHover={{ x: lang === "he" ? -4 : 4 }}
                className="relative rounded-xl bg-white/[0.03] backdrop-blur-sm p-6 sm:p-7
                           border border-gray-700/30 hover:border-amber-500/20 transition-all group h-full flex flex-col"
              >
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-9 h-9 rounded-lg bg-gradient-to-br from-amber-500/20 to-amber-600/10
                                  flex items-center justify-center text-amber-400 text-sm font-bold
                                  group-hover:from-amber-500/30 group-hover:to-amber-600/20 transition-all">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-white mb-1.5">{pain.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{pain.desc}</p>
                  </div>
                </div>
                <div
                  className={`absolute top-3 bottom-3 w-[2px] bg-gradient-to-b from-amber-500/40 via-amber-500/20 to-transparent
                              group-hover:from-amber-400/60 group-hover:via-amber-400/30 transition-all
                              ${lang === "he" ? "right-0 rounded-r-full" : "left-0 rounded-l-full"}`}
                />
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.3}>
          <p className="text-gray-400 text-center max-w-3xl mx-auto mt-12 text-lg leading-relaxed font-semibold text-amber-400/90">
            {tx(t.problem.subBelow, lang)}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
