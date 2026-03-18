"use client";

import { motion } from "framer-motion";
import AnimatedCounter from "./AnimatedCounter";
import { useLanguage, tx } from "@/lib/useLanguage";
import { t } from "@/lib/translations";

function GridBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="animated-grid-bg absolute inset-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-gradient-radial from-accent/8 via-transparent to-transparent rounded-full" />

      {/* Industrial silhouette overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-64 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='https://www.w3.org/2000/svg' viewBox='0 0 1200 200'%3E%3Cpath d='M0,200 L0,120 L80,120 L80,80 L100,80 L100,40 L110,40 L110,20 L115,20 L115,0 L120,0 L120,20 L125,20 L125,40 L135,40 L135,80 L155,80 L155,120 L200,120 L200,160 L300,160 L300,140 L320,140 L320,100 L340,100 L340,140 L360,140 L360,160 L500,160 L500,120 L520,120 L520,60 L530,60 L530,30 L540,30 L540,60 L550,60 L550,120 L570,120 L570,160 L700,160 L700,100 L720,100 L720,60 L730,60 L730,40 L740,40 L740,60 L750,60 L750,100 L770,100 L770,160 L900,160 L900,130 L950,130 L950,80 L960,80 L960,50 L970,50 L970,80 L980,80 L980,130 L1030,130 L1030,160 L1200,160 L1200,200 Z' fill='%2300a8ff'/%3E%3C/svg%3E")`,
          backgroundSize: "cover",
          backgroundPosition: "bottom",
        }}
      />

      {/* Floating particles */}
      {[
        { top: "20%", left: "15%", dur: 8, del: 0 },
        { top: "30%", right: "20%", dur: 6, del: 1 },
        { top: "60%", left: "35%", dur: 10, del: 2 },
        { top: "70%", right: "10%", dur: 7, del: 3 },
        { top: "15%", left: "60%", dur: 9, del: 1.5 },
      ].map((p, i) => (
        <motion.div
          key={i}
          animate={{ y: [0, -15, 0], x: [0, 8, 0] }}
          transition={{ duration: p.dur, repeat: Infinity, ease: "easeInOut", delay: p.del }}
          className="absolute w-1.5 h-1.5 bg-accent/30 rounded-full blur-[1px]"
          style={{ top: p.top, left: p.left, right: (p as Record<string, unknown>).right as string }}
        />
      ))}
    </div>
  );
}

export default function Hero() {
  const { lang } = useLanguage();

  const scrollToNext = () => {
    document.querySelector("#problem")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <GridBackground />
      <div className="relative z-10 section-container text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5 mb-6 sm:mb-8 mt-16 sm:mt-20 lg:mt-0"
        >
          <span className="w-2 h-2 rounded-full bg-accent animate-glow-pulse" />
          <span className="text-sm text-accent font-medium tracking-wide">
            {tx(t.hero.badge, lang)}
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] mb-6"
        >
          {lang === "he" ? (
            <span className="gradient-text">{tx(t.hero.headline2, lang)}</span>
          ) : (
            <>
              <span className="text-white">{tx(t.hero.headline1, lang)}</span>
              <br />
              <span className="gradient-text">{tx(t.hero.headline2, lang)}</span>
            </>
          )}
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-16 leading-relaxed whitespace-pre-line"
        >
          {tx(t.hero.sub, lang)}
        </motion.p>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-wrap justify-center gap-12 md:gap-24 mb-14"
        >
          {[
            { value: 3000, suffix: "+", label: tx(t.hero.stat1Label, lang) },
            { value: 100, suffix: "+", label: tx(t.hero.stat2Label, lang) },
            { value: 50, suffix: "%", label: tx(t.hero.stat3Label, lang) },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-accent">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} duration={2.5} />
              </div>
              <div className="text-base md:text-lg text-gray-300 mt-2 tracking-wide">{stat.label}</div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
