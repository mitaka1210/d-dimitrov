// javascript
// file: `app/DropDown/test.js`
import i18n from '../../i18n';

const SUPPORTED = ['bg', 'en'];

export function translateWebsite(lang = 'en') {
    if (!SUPPORTED.includes(lang)) return;

    // 1) change i18next language (updates internal state)
    i18n.changeLanguage(lang).catch(() => { /* ignore */ });

    // 2) ensure detector cache/localStorage is in sync
    try {
        localStorage.setItem('i18nextLng', lang);
    } catch (e) { /* ignore if unavailable */ }

    // 3) If you use Next.js locale prefixes (e.g. /bg/...), update URL so Next will load right locale.
/*    if (typeof window === 'undefined') return;
    try {
        const url = new URL(window.location.href);
        const parts = url.pathname.split('/'); // leading / produces ["", "maybe-locale", ...]
        if (SUPPORTED.includes(parts[1])) {
            parts[1] = lang;
        } else {
            parts.splice(1, 0, lang);
        }
        const newPath = parts.join('/') + url.search + url.hash;
        const currentFull = window.location.pathname + window.location.search + window.location.hash;
        if (newPath !== currentFull) {
            // navigate to new URL (full reload ensures Next loads locale files)
            window.location.href = newPath;
        }
    } catch (e) { /!* ignore URL errors *!/ }*/
}
