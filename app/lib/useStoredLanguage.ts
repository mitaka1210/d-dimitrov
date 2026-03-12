"use client";

import { useEffect, useState } from "react";
import { getStoredLanguage } from "./stored-language";

/**
 * React hook за текущия език от localStorage (i18nextLng).
 * Подходящ за страници/компоненти за SEO title, съдържание и т.н.
 */
export function useStoredLanguage(): string {
  const [lang, setLang] = useState("en");

  useEffect(() => {
    setLang(getStoredLanguage());
    const handleStorage = () => setLang(getStoredLanguage());
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return lang;
}
