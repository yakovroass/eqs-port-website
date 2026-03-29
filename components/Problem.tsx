"use client";

import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { useLanguage, tx } from "@/lib/useLanguage";
import { t } from "@/lib/translations";

export default function Problem() {
  const { lang } = useLanguage();
  const subText = tx(t.problem.sub, lang).trim();
  const pains = [
    { title: tx(t.problem.pain1, lang), desc: tx(t.problem.pain1d, lang) },
    { title: tx(t.problem.pain2, lang), desc: tx(t.problem.pain2d, lang) },
    { title: tx(t.problem.pain3, lang), desc: tx(t.problem.pain3d, lang) },
    { title: tx(t.problem.pain4, lang), desc: tx(t.problem.pain4d, lang) },
  ];

  return (
    <section id="problem" className="relative pt-16 sm:pt-20 md:pt-24 pb-24 md:pb-32">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-amber-500/3 rounded-full blur-3xl" />

      <div className="relative z-10 section-container">
        <div className="max-w-5xl mx-auto w-full">
        <ScrollReveal>
          <h2
            className={`text-3xl md:text-5xl font-bold text-center text-amber-400 tracking-wide ${lang === "en" ? "uppercase" : ""} ${subText ? "mb-6" : "mb-12"}`}
          >
            {tx(t.problem.headline, lang)}
          </h2>
          {subText ? (
            <p className="text-gray-400 text-center max-w-3xl mx-auto mb-12 text-lg leading-relaxed">{subText}</p>
          ) : null}
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 gap-5 sm:gap-6 items-stretch">
          {pains.map((pain, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <motion.div
                whileHover={{ x: lang === "he" ? -4 : 4 }}
                className="relative rounded-xl glass-card p-6 sm:p-7
                           hover:border-amber-500/30 transition-all group h-full flex flex-col"
              >
                <div>
                  <h3 className="text-base font-semibold text-white mb-1.5">{pain.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{pain.desc}</p>
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
      </div>
    </section>
  );
}
