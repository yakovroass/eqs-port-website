"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { navChromeButton } from "@/lib/navChrome";
import { useLanguage } from "@/lib/useLanguage";

const LANG_ATTENTION_KEY = "eqs-lang-attention-shown";

/** תנועת y כמו כפתור החץ; אחרי לחיצה או סוף המחזורים — עצירה (גם בפרודקשן) */
const LANG_HINT_TRANSITION = {
  duration: 2,
  repeat: 2,
  ease: "easeInOut" as const,
};

/** הילה רק על מסגרת הכפתור (box-shadow), לא על הטקסט — ערכים קטנים מהחץ */
const LANG_HINT_GLOW_REST = "none";
const LANG_HINT_GLOW_KEYFRAMES = [
  "0 0 8px rgba(148,163,184,0.22), 0 0 16px rgba(100,116,139,0.1)",
  "0 0 11px rgba(51,187,255,0.18), 0 0 20px rgba(148,163,184,0.18)",
  "0 0 8px rgba(148,163,184,0.22), 0 0 16px rgba(100,116,139,0.1)",
] as const;

export default function LanguageToggle() {
  const { lang, setLang } = useLanguage();
  const [hintActive, setHintActive] = useState(false);

  const dismissAttentionHint = useCallback(() => {
    try {
      localStorage.setItem(LANG_ATTENTION_KEY, "1");
    } catch {
      /* private mode */
    }
    setHintActive(false);
  }, []);

  useEffect(() => {
    try {
      if (localStorage.getItem(LANG_ATTENTION_KEY)) return;
      setHintActive(true);
    } catch {
      setHintActive(true);
    }
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
      className={`relative flex min-h-[2.75rem] min-w-[2.75rem] items-center justify-center overflow-visible px-2 text-xs outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)] sm:text-sm ${navChromeButton}`}
      animate={hintActive ? { y: [0, 6, 0] } : { y: 0 }}
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
