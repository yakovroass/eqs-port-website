"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useLanguage, tx } from "@/lib/useLanguage";
import { t } from "@/lib/translations";
import LanguageToggle from "./LanguageToggle";

const NAV_HREFS = ["#hero", "#problem", "#market", "#solution", "#process", "#future", "#invest", "#contact"] as const;

function navLabelAt(index: number, lang: "en" | "he"): string {
  switch (index) {
    case 0:
      return tx(t.nav.home, lang);
    case 1:
      return tx(t.problem.label, lang);
    case 2:
      return tx(t.market.label, lang);
    case 3:
      return tx(t.solution.label, lang);
    case 4:
      return tx(t.process.label, lang);
    case 5:
      return tx(t.roadmap.label, lang);
    case 6:
      return tx(t.invest.label, lang);
    case 7:
      return tx(t.contact.label, lang);
    default:
      return "";
  }
}

export default function Navbar() {
  const { lang, dir } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setMobileOpen(false);
      }
    };
    document.addEventListener("pointerdown", onPointerDown, true);
    return () => document.removeEventListener("pointerdown", onPointerDown, true);
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  const handleClick = (href: string) => {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      ref={navRef}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-dark-900/80 backdrop-blur-xl border-b border-accent/10 shadow-lg shadow-accent/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 flex items-center justify-between min-h-[4.5rem] sm:min-h-[5.5rem] lg:min-h-28 py-2">
        <button onClick={() => handleClick("#hero")} className="flex items-center gap-4 sm:gap-6 lg:gap-8 group min-w-0 flex-1 pr-2">
          <Image
            src="/logo.png"
            alt="EQS.PORT"
            width={587}
            height={555}
            priority
            quality={95}
            sizes="(max-width: 640px) 56px, (max-width: 1024px) 64px, 96px"
            className="w-14 h-14 sm:w-[4.5rem] sm:h-[4.5rem] lg:w-24 lg:h-24 object-contain shrink-0 rounded-xl"
          />
          <span
            dir="ltr"
            className="text-[clamp(1.35rem,8.5vw,2.35rem)] sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tighter sm:tracking-tight leading-[0.92] text-white group-hover:text-gray-100 transition-colors"
          >
            EQS<span className="text-white">.</span>{" "}PORT
          </span>
        </button>

        <div className="hidden lg:flex items-center gap-1 shrink-0 flex-wrap justify-end max-w-[58%] xl:max-w-none">
          {NAV_HREFS.map((href, i) => (
            <button
              key={href}
              onClick={() => handleClick(href)}
              className="px-2.5 py-2 text-xs xl:text-sm text-gray-400 hover:text-accent transition-colors rounded-lg hover:bg-accent/5 text-center leading-snug max-w-[8.5rem] xl:max-w-none"
            >
              {navLabelAt(i, lang)}
            </button>
          ))}
          <div className="ml-2 shrink-0">
            <LanguageToggle />
          </div>
        </div>

        <div className="lg:hidden flex items-center gap-1 shrink-0">
          <LanguageToggle />
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex flex-col justify-center gap-[5px] p-1.5 min-w-[2.25rem] min-h-[2.25rem] items-center"
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
              className="w-[15px] h-[1.5px] bg-gray-300 rounded-full block origin-center"
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.15 }}
              className="w-[15px] h-[1.5px] bg-gray-300 rounded-full block"
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
              className="w-[15px] h-[1.5px] bg-gray-300 rounded-full block origin-center"
            />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden bg-dark-900/95 backdrop-blur-xl border-b border-accent/10 overflow-hidden"
          >
            <div className={`px-4 py-3 flex flex-col gap-0.5 ${dir === "rtl" ? "items-stretch" : ""}`}>
              {NAV_HREFS.map((href, i) => (
                <button
                  key={href}
                  type="button"
                  onClick={() => handleClick(href)}
                  className={`w-full px-3 py-2.5 text-sm text-gray-300 hover:text-accent hover:bg-accent/5 rounded-lg transition-colors ${
                    dir === "rtl" ? "text-right" : "text-left"
                  }`}
                >
                  {navLabelAt(i, lang)}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
