# План: Преместване на PERN логин в d-dimitrov

## Текущо състояние

- **Frontend:** `store/login/loginSlice.js` вика външен API `https://share.d-dimitrov.eu` за `POST /api/login`, `GET /api/check-auth`, `POST /api/logout` с `credentials: 'include'`.
- **Текущ `app/api/login/route.ts`:** прави друго — записва `name`, `email` в таблица `logins` (не е auth логин). Тази функционалност е преместена в `app/api/record-login/route.ts`.
- **DB:** `database/db.js` вече има `query()` с failover (primary/fallback). Export е `export default { query }`.
- **Зависимости:** `bcrypt`, `jsonwebtoken`, `pg` са в `package.json`.

## Архитектура след миграция

- `POST /api/login` — auth логин (username/password), задава httpOnly cookie, връща `{ role, username }`.
- `GET /api/check-auth` — чете cookie, връща `{ role, username }` или 401.
- `POST /api/logout` — изчиства cookie.
- `POST /api/record-login` — запис name/email в `logins` (предишната логика от `/api/login`).

## Файлове

| Файл | Описание |
|------|----------|
| `database/migrations/002_create_users_and_user_logins.sql` | Таблици users, user_logins |
| `app/lib/errorMessages/bg.json`, `en.json` | Съобщения за грешки при логин |
| `app/api/login/route.ts` | PERN login логика + JWT cookie |
| `app/api/check-auth/route.ts` | Проверка на cookie, връща user |
| `app/api/logout/route.ts` | Изчистване на cookie |
| `app/api/record-login/route.ts` | Запис name/email в logins |
| `store/login/loginSlice.js` | API_BASE = '' (same-origin) |

## Environment

- В `.env.development` / `.env.production` добави: `SECRET_KEY=<секретен-ключ-за-jwt>`.

## Ред на изпълнение

1. Пусни миграцията: `psql "$DATABASE_URL" -f database/migrations/002_create_users_and_user_logins.sql`
2. Създай поне един потребител в `users` (password с bcrypt hash).
3. Стартирай приложението и тествай логин от формата.
