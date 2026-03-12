/**
 * Един източник за текущия език от localStorage (i18nextLng).
 * Използвайте getStoredLanguage() в обикновени функции/effects,
 * useStoredLanguage() в React компоненти.
 */

const STORED_LANG_KEY = "i18nextLng";
const DEFAULT_LANG = "en";

/**
 * Връща записания език от localStorage или 'en'. SSR-safe (върши проверка за window).
 */
export function getStoredLanguage(): string {
  if (typeof window === "undefined") return DEFAULT_LANG;
  return localStorage.getItem(STORED_LANG_KEY) || DEFAULT_LANG;
}
