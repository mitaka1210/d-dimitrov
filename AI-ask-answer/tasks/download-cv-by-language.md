# Task: Download CV by language (open in new tab)

## Goal

When the user clicks the "Download CV" button on the About page, open the correct CV PDF in a new tab: Bulgarian version when language is BG, English version otherwise.

## Steps

### 1. Expose CVs under `public/`

- Next.js serves static files only from `public/`. CVs currently live in `assets/CV/` and are not reachable by URL.
- Create folder: `public/cv/`
- Add PDFs with URL-safe names:
  - `public/cv/cv-en.pdf` — copy from `assets/CV/CV - eng.Dimitar Dimitrov.pdf`
  - `public/cv/cv-bg.pdf` — copy from `assets/CV/CV - инж. Димитър Димитров.pdf`
- Resulting URLs: `/cv/cv-en.pdf`, `/cv/cv-bg.pdf`

### 2. Implement `downloadCV` and fix button in `AboutHTML.jsx`

- **Fix button:** Change `onClick="downloadCV()"` to `onClick={downloadCV}` (React expects a function, not a string).
- **Implement `downloadCV`:**
  - Read language: `localStorage.getItem('i18nextLng')` with fallback `'en'`.
  - If `lang === 'bg'` open `/cv/cv-bg.pdf`, else open `/cv/cv-en.pdf`.
  - Use `window.open(url, '_blank')` to open in a new tab.

### 3. Verify

- On About page, click "CV" button with language set to EN → new tab shows English CV.
- Switch to BG, click "CV" → new tab shows Bulgarian CV.

## Files

| File | Change |
|------|--------|
| `AI-ask-answer/task/download-cv-by-language.md` | This plan. |
| `public/cv/cv-en.pdf` | Copy from `assets/CV/CV - eng.Dimitar Dimitrov.pdf`. |
| `public/cv/cv-bg.pdf` | Copy from `assets/CV/CV - инж. Димитър Димитров.pdf`. |
| `app/about-page/AboutHTML.jsx` | Implement `downloadCV`, fix `onClick`. |
