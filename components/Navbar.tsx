"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useLanguage, tx } from "@/lib/useLanguage";
import { t } from "@/lib/translations";
import LanguageToggle from "./LanguageToggle";

const NAV_KEYS = ["home", "problem", "market", "solution", "process", "future", "invest", "contact"] as const;
const NAV_HREFS = ["#hero", "#problem", "#market", "#solution", "#process", "#future", "#invest", "#contact"];

export default function Navbar() {
  const { lang } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (href: string) => {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-dark-900/80 backdrop-blur-xl border-b border-accent/10 shadow-lg shadow-accent/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 flex items-center justify-between h-20 sm:h-22 lg:h-28">
        <button onClick={() => handleClick("#hero")} className="flex items-center gap-2 sm:gap-4 lg:gap-5 group min-w-0">
          <Image
            src="/logo.png"
            alt="EQS.PORT"
            width={400}
            height={400}
            priority
            quality={95}
            sizes="88px"
            className="w-14 h-14 sm:w-16 sm:h-16 lg:w-[88px] lg:h-[88px] object-contain shrink-0 rounded-xl"
          />
          <span dir="ltr" className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight sm:tracking-wider text-white group-hover:text-gray-100 transition-colors">
            EQS<span className="text-accent glow-text">.</span>PORT
          </span>
        </button>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1 shrink-0">
          {NAV_KEYS.map((key, i) => (
            <button
              key={key}
              onClick={() => handleClick(NAV_HREFS[i])}
              className="px-3 py-2 text-sm text-gray-400 hover:text-accent transition-colors rounded-lg hover:bg-accent/5"
            >
              {tx(t.nav[key], lang)}
            </button>
          ))}
          <div className="ml-2">
            <LanguageToggle />
          </div>
        </div>

        {/* Mobile controls */}
        <div className="lg:hidden flex items-center gap-1 shrink-0">
          <LanguageToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex flex-col gap-1.5 p-1.5"
            aria-label="Toggle menu"
          >
            <motion.span animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }} className="w-5 h-0.5 bg-gray-300 block" />
            <motion.span animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }} className="w-5 h-0.5 bg-gray-300 block" />
            <motion.span animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }} className="w-5 h-0.5 bg-gray-300 block" />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden bg-dark-900/95 backdrop-blur-xl border-b border-accent/10 overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {NAV_KEYS.map((key, i) => (
                <button
                  key={key}
                  onClick={() => handleClick(NAV_HREFS[i])}
                  className="text-left px-4 py-3 text-gray-300 hover:text-accent hover:bg-accent/5 rounded-lg transition-colors"
                >
                  {tx(t.nav[key], lang)}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
