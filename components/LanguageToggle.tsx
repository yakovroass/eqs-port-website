"use client";

import { motion } from "framer-motion";
import { navChromeButton } from "@/lib/navChrome";
import { useLanguage } from "@/lib/useLanguage";

export default function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  return (
    <button
      type="button"
      onClick={() => setLang(lang === "en" ? "he" : "en")}
      className={`relative flex items-center justify-center min-h-[2.75rem] min-w-[2.75rem] px-2 text-xs sm:text-sm ${navChromeButton}`}
    >
      <motion.span
        key={lang}
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-gray-200 font-medium"
      >
        {lang === "en" ? "עב" : "EN"}
      </motion.span>
    </button>
  );
}
