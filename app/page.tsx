"use client";

import { useState, useEffect } from "react";
import { LanguageContext } from "@/lib/useLanguage";
import type { Lang } from "@/lib/translations";
import Navbar from "@/components/Navbar";
import MouseGlow from "@/components/MouseGlow";
import HeroFloatingParticles from "@/components/HeroFloatingParticles";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import MarketData from "@/components/MarketData";
import SolutionOverview from "@/components/SolutionOverview";
import ProcessTimeline from "@/components/ProcessTimeline";
import FutureTargets from "@/components/FutureTargets";
import Investment from "@/components/Investment";
import Contact from "@/components/Contact";

export default function Home() {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const saved = localStorage.getItem("eqs-lang") as Lang | null;
    if (saved === "en" || saved === "he") setLangState(saved);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("eqs-lang", l);
  };

  const dir = lang === "he" ? "rtl" : "ltr";

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, dir }}>
      <div dir={dir} className="mobile-readable overflow-x-hidden max-w-[100vw] relative">
        <div className="animated-grid-bg fixed inset-0 pointer-events-none z-0" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0" aria-hidden>
          <HeroFloatingParticles variant="ships" />
        </div>
        <MouseGlow />
        <Navbar />
        {/* מעל שכבת האוניות (absolute z-0) — בלי זה התוכן עלול להישאר מתחת ולהיעלם */}
        <main className="relative z-10">
          <Hero />
          <Problem />
          <MarketData />
          <SolutionOverview />
          <ProcessTimeline />
          <FutureTargets />
          <Investment />
          <Contact />
        </main>
      </div>
    </LanguageContext.Provider>
  );
}
