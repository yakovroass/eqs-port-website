"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { navChromeMenuButton } from "@/lib/navChrome";
import { useLanguage } from "@/lib/useLanguage";
import { useMaxSm } from "@/lib/useMaxSm";

/** תנועת y כמו החץ; ריענון = רמז שוב; לחיצה או סוף מחזורים = עצירה (בלי localStorage) */
const LANG_HINT_TRANSITION = {
  duration: 2.45,
  repeat: 2,
  ease: "easeInOut" as const,
};

/** הילה על מסגרת הכפתור — חזקה וברורה */
const LANG_HINT_GLOW_REST = "none";
const LANG_HINT_GLOW_KEYFRAMES = [
  "0 0 20px rgba(148,163,184,0.48), 0 0 38px rgba(100,116,139,0.26), 0 0 58px rgba(100,116,139,0.14)",
  "0 0 26px rgba(51,187,255,0.42), 0 0 46px rgba(148,163,184,0.4), 0 0 72px rgba(100,116,139,0.22)",
  "0 0 20px rgba(148,163,184,0.48), 0 0 38px rgba(100,116,139,0.26), 0 0 58px rgba(100,116,139,0.14)",
] as const;

export default function LanguageToggle() {
  const { lang, setLang } = useLanguage();
  const maxSm = useMaxSm();
  const [hintActive, setHintActive] = useState(false);
  const hintY = maxSm ? 3 : 4;

  const dismissAttentionHint = useCallback(() => {
    setHintActive(false);
  }, []);

  useEffect(() => {
    setHintActive(true);
  }, []);

  useEffect(() => {
    if (!hintActive) return;
    const ms = LANG_HINT_TRANSITION.duration * (LANG_HINT_TRANSITION.repeat + 1) * 1000;
    const id = window.setTimeout(dismissAttentionHint, ms);
    return () => window.clearTimeout(id);
  }, [hintActive, dismissAttentionHint]);

  return (
    <motion.button
      type="button"
      onClick={() => {
        dismissAttentionHint();
        setLang(lang === "en" ? "he" : "en");
      }}
      className={`relative flex min-h-[2.75rem] min-w-[2.75rem] items-center justify-center overflow-visible px-2 text-xs outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)] sm:text-sm ${navChromeMenuButton}`}
      animate={hintActive ? { y: [0, hintY, 0] } : { y: 0 }}
      transition={
        hintActive
          ? LANG_HINT_TRANSITION
          : { duration: 0, type: "tween", ease: "linear" }
      }
    >
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] rounded-lg"
        initial={false}
        animate={
          hintActive
            ? { boxShadow: [...LANG_HINT_GLOW_KEYFRAMES] }
            : { boxShadow: LANG_HINT_GLOW_REST }
        }
        transition={
          hintActive
            ? LANG_HINT_TRANSITION
            : { duration: 0, type: "tween", ease: "linear" }
        }
      />
      <motion.span
        key={lang}
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-[2] text-gray-200 font-medium"
      >
        {lang === "en" ? "עב" : "EN"}
      </motion.span>
    </motion.button>
  );
}
