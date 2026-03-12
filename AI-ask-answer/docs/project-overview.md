# Преглед на проекта d-dimitrov

Документ с обобщение на всичко, което е разбрано за проекта от преглед на кода и структурата.

---

## 1. Какво е проектът

**d-dimitrov** е личен портфолио и блог на Димитър Димитров. Включва представяне на професионалния път, умения, проекти, статии и възможност за взаимодействие (коментари, лайкове, абонамент за новини).

- **Основен домейн:** d-dimitrov.eu (българска версия)
- **Английска версия:** eng.d-dimitrov.eu
- **Демо:** https://d-dimitrov.eu

---

## 2. Технологичен стек

### Frontend
- **Next.js 16** (App Router), **React 19**
- **TypeScript** и JavaScript (JSX) в някои компоненти
- **Redux Toolkit** – състояние (логин, статии, коментари, лайкове, акаунти и др.)
- **i18next** + **react-i18next** + **next-i18next** – двуезичност (bg / en)
- **Стилове:** SASS/SCSS, Tailwind CSS 4, CSS variables, typography.scss, reusable-styles.scss
- **UI:** MUI, Emotion, styled-components, Font Awesome, react-icons, Framer Motion
- **Други:** next-auth, Google OAuth (@react-oauth/google), axios, react-slick, typed.js

### Езици и локализация
- **Поддържани езици:** `bg`, `en`
- **Начален/подразбиране език:** `en` (зададен в `next-i18next.config.js` като `defaultLocale` и в `i18n.js` като `fallbackLng`)
- **Детекция:** localStorage (`i18nextLng`) → navigator → htmlTag → path → subdomain
- **Преводи:** `public/locales/bg/translation.json`, `public/locales/en/translation.json`

### Backend и данни
- **База данни:** PostgreSQL (pg), с поддръжка на основен и fallback (напр. Neon) в production
- **Връзка с DB:** `database/db.js` – connection pool, SSL в production
- **Външен API:** конфигурирани endpoints в `configurationAPI/api-endpoints.js` (localhost:5000 за коментари, лайкове, todos; localhost:3000 за статии)
- **Изображения:** от `share.d-dimitrov.eu` (remotePatterns в next.config.js)
- **Автентикация:** NextAuth (app/api/auth/[...nextauth]), JWT, bcrypt

### Инфраструктура
- **Docker:** един сервиз `app` (порт 3400→3000), .env.production, volume за upload снимки
- **Мрежа:** external docker_network (Nginx и др. вероятно са извън този compose файл)
- **README споменава:** Nginx reverse proxy, Cloudflare (DNS, CDN, SSL)

---

## 3. Структура на приложението (App Router)

Коренът е пренасочен от `/` към `/Home-page` (redirect в next.config.js).

### Основни страници
- **Home-page** – начална страница, лоудър, навигация
- **about-page** – за автора
- **Skills-page** – умения
- **Timeline-page** – хронология/милестоуни
- **Projects-page** – проекти
- **Contacts-page** – контакти
- **Blog-Page** – блог
- **Improvements-website** – подобрения/блог по теми
- **ReadArticles** – четене на статия

### Статии и съдържание
- **programingArticles** – статии за програмиране
- **cardAquariums** – картки за аквариуми
- **novatio-Apps** – Novatio приложения

### Потребители и взаимодействие
- **Login-page**, **SignUpForm**, **mobileLoginSignUpForm**
- **UserDropdown**
- **leaveComment**, **addComments**
- **Like** – лайкове
- **newsletterSignup**
- **Email-form**

### Други
- **my-services**, **mobileSkills**, **skill-Pyramid**
- **loader**, **Footer-page**
- **Navigation-component** (навигация), **SEO** компонент за мета тагове

---

## 4. Състояние (Redux) и API

- **store:** Redux Toolkit – login, googleLogin, createAccount, getArticles, getCommentsForArticle, addComments, likesSlice, articlesSectionById, storeState
- **API endpoints (configurationAPI/api-endpoints.js):** статии (3000), todos/comments/likes (5000) – т.е. част от логиката е външен сървър на порт 5000
- **Базата** се ползва от Next.js приложението (database/db.js), не от отделна backend папка в този репо

---

## 5. Конфигурация

- **next.config.js:** i18n от next-i18next, redirect `/` → `/Home-page`, images.remotePatterns за share.d-dimitrov.eu
- **next-i18next.config.js:** locales [bg, en], defaultLocale: "en", localeDetection: false, localePath: public/locales
- **i18n.js:** ресурси bg/en, fallbackLng "en", LanguageDetector, localStorage cache
- **package.json:** име "mitaka-website", scripts dev (dotenv .env.development, turbopack), build:prod, build, start, lint
- **.env:** очаква се DATABASE_URL, NEON_DATABASE_URL (опционално), NEXTAUTH_*, DATABASE_SSL в production

---

## 6. Важни детайли

- Много страници четат езика от `localStorage.getItem("i18nextLng") || 'en'` за SEO title/description и съдържание.
- Компонентите често са динамично заредени (`dynamic(..., { ssr: false })`) заради използване на localStorage или browser API.
- SEO компонентът получава title, description, url, lang и се използва в различни страници.
- Docker production монтира `/ssd/docker/share_upload_images` в `/app/upload` за качени файлове.

---

*Документът отразява състоянието на проекта при преглед на кода. За актуални инструкции за стартиране и деплой виж README.md в корена.*
