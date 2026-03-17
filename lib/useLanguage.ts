"use client";

import { createContext, useContext } from "react";
import type { Lang } from "./translations";

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  dir: "ltr" | "rtl";
}

export const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => {},
  dir: "ltr",
});

export function useLanguage() {
  return useContext(LanguageContext);
}

export function tx(obj: { en: string; he: string }, lang: Lang): string {
  return obj[lang];
}
