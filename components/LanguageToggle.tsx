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

/** הילה ניטרלית (slate/gray) כמו כדור החץ — אין כחול */
const LANG_HINT_GLOW_REST = "none";
const LANG_HINT_GLOW_KEYFRAMES = [
  "0 0 16px rgba(148,163,184,0.38), 0 0 32px rgba(100,116,139,0.2), 0 0 50px rgba(100,116,139,0.1)",
  "0 0 22px rgba(203,213,225,0.52), 0 0 44px rgba(148,163,184,0.34), 0 0 64px rgba(100,116,139,0.18)",
  "0 0 16px rgba(148,163,184,0.38), 0 0 32px rgba(100,116,139,0.2), 0 0 50px rgba(100,116,139,0.1)",
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
    const animMs = LANG_HINT_TRANSITION.duration * (LANG_HINT_TRANSITION.repeat + 1) * 1000;
    /* מחכים לסיום האנימציה + 200ms buffer לפני שמכבים את ה-state (הפייד-אאוט הוא על ה-motion עצמו) */
    const id = window.setTimeout(dismissAttentionHint, animMs + 200);
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
          : { duration: 0.5, ease: "easeOut" }
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
            : { duration: 0.9, ease: "easeOut" }
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
