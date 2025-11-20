// i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import bg from "./public/locales/bg/translation.json";
import en from "./public/locales/en/translation.json";

const resources = {
    bg: { translation: bg },
    en: { translation: en },
};

i18n
    .use(LanguageDetector) // enable browser detector (reads/writes i18nextLng)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: "en",
        debug: false,
        supportedLngs: ["bg", "en"], // replaces deprecated 'whitelist'
        detection: {
            order: ["localStorage", "navigator", "htmlTag", "path", "subdomain"],
            caches: ["localStorage"], // store chosen lang in localStorage as 'i18nextLng'
            lookupLocalStorage: "i18nextLng",
        },
        interpolation: { escapeValue: false },
    });

export default i18n;
