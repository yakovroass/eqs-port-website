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
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("pointerdown", onPointerDown, true);
    return () => document.removeEventListener("pointerdown", onPointerDown, true);
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const handleClick = (href: string) => {
    setMenuOpen(false);
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
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 flex items-center justify-between gap-3 min-h-[4.75rem] sm:min-h-[5.5rem] py-2">
        <button
          type="button"
          onClick={() => handleClick("#hero")}
          className="flex items-center gap-3 sm:gap-5 group shrink-0 min-w-0"
        >
          <Image
            src="/logo.png"
            alt="EQS.PORT"
            width={587}
            height={555}
            priority
            quality={95}
            sizes="(max-width: 640px) 56px, 72px"
            className="w-14 h-14 sm:w-16 sm:h-16 object-contain shrink-0 rounded-xl"
          />
          <span
            dir="ltr"
            className="whitespace-nowrap font-black tracking-tighter text-white group-hover:text-gray-100 transition-colors leading-none flex items-center h-14 sm:h-16 text-[clamp(2.1rem,7.2vw,2.8rem)] sm:text-[clamp(2.6rem,5.8vw,3.5rem)]"
          >
            EQS<span className="text-white ml-0.5">.</span>
            <span className="ml-1.5 sm:ml-2">PORT</span>
          </span>
        </button>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <LanguageToggle />
          <div className="relative">
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex flex-col justify-center gap-[5px] px-3 py-2 min-w-[2.75rem] min-h-[2.75rem] items-center rounded-lg border border-accent/20 bg-dark-800/50 hover:bg-accent/10 hover:border-accent/40 transition-colors"
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
                className="w-[15px] h-[1.5px] bg-accent rounded-full block origin-center"
              />
              <motion.span
                animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.15 }}
                className="w-[15px] h-[1.5px] bg-accent rounded-full block"
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
                className="w-[15px] h-[1.5px] bg-accent rounded-full block origin-center"
              />
            </button>
            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full end-0 mt-2 w-[min(16.5rem,calc(100vw-1.5rem))] z-[100] rounded-xl border border-gray-700 bg-[#0b0f18] shadow-2xl shadow-black/50 overflow-hidden"
                >
                  <div
                    className={`py-2 px-1 flex flex-col gap-0.5 max-h-[min(70vh,24rem)] overflow-y-auto overscroll-contain ${dir === "rtl" ? "items-stretch" : ""}`}
                  >
                    {NAV_HREFS.map((href, i) => (
                      <button
                        key={href}
                        type="button"
                        onClick={() => handleClick(href)}
                        className={`w-full px-3 py-2.5 text-sm text-gray-100 hover:text-white hover:bg-white/10 rounded-lg transition-colors ${
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
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
