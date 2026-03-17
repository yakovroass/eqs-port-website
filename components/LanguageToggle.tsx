"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/useLanguage";

export default function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  return (
    <button
      onClick={() => setLang(lang === "en" ? "he" : "en")}
      className="relative flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg border border-accent/20 bg-accent/5 hover:bg-accent/10 transition-colors text-xs sm:text-sm"
    >
      <motion.span
        key={lang}
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-accent font-medium"
      >
        {lang === "en" ? "עב" : "EN"}
      </motion.span>
    </button>
  );
}
