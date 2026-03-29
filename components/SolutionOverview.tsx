"use client";

import ScrollReveal from "./ScrollReveal";
import { useLanguage, tx } from "@/lib/useLanguage";
import { t } from "@/lib/translations";

export default function SolutionOverview() {
  const { lang } = useLanguage();

  return (
    <section id="solution" className="relative pt-24 md:pt-32 pb-8 sm:pb-10 md:pb-12 overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/3 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-neon-purple/3 rounded-full blur-3xl" />

      <div className="relative z-10 section-container">
        <div className="max-w-5xl mx-auto w-full">
        <ScrollReveal>
          <div className="text-center mb-3 sm:mb-4">
            <span className="section-label headline-font text-3xl sm:text-4xl md:text-5xl text-amber-400 tracking-wide uppercase">
              {tx(t.solution.label, lang)}
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-3 sm:mb-4">
            <div className="sm:hidden flex flex-col gap-1 items-center leading-tight">
              <span className="text-white">
                {tx(t.solution.headline, lang).replace(/,\s*$/, "").trim()}
              </span>
              <span className="gradient-text">{tx(t.solution.headlineAccent, lang)}</span>
            </div>
            <div className="hidden sm:block">
              {tx(t.solution.headline, lang)}{" "}
              <span className="gradient-text">{tx(t.solution.headlineAccent, lang)}</span>
            </div>
          </h2>
          <p className="text-gray-400 text-center text-lg leading-relaxed max-w-3xl mx-auto mb-0">
            {tx(t.solution.sub, lang)}
          </p>
        </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
