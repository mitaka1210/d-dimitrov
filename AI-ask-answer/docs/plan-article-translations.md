# Plan: Article Translations (Multi-language Blog)

## Контекст

Блогът съхраняваше статии само на един език без поддръжка на превод. Добавена е функционалност за показване на статии на избрания език (BG/EN), с автоматичен превод чрез безплатен API (MyMemory) и постоянно съхранение на преводите в базата данни. Преводът се тригерва от отделния admin app чрез REST API.

---

## DB промени

### Migration: `database/migrations/003_create_article_translations.sql`

```sql
CREATE TABLE IF NOT EXISTS article_translations (
    id         SERIAL PRIMARY KEY,
    article_id INTEGER NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
    language   VARCHAR(10) NOT NULL,
    title      TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(article_id, language)
);

CREATE TABLE IF NOT EXISTS section_translations (
    id         SERIAL PRIMARY KEY,
    section_id INTEGER NOT NULL REFERENCES sections(id) ON DELETE CASCADE,
    language   VARCHAR(10) NOT NULL,
    title      TEXT NOT NULL,
    content    TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(section_id, language)
);
```

Пусни migration:
```bash
psql "$DATABASE_URL" -f database/migrations/003_create_article_translations.sql
```

---

## Backend промени

### 1. `GET /api/getArticles?lang=en`
**Файл:** `app/api/getArticles/route.ts`

Добавен `?lang=` query параметър. При подаден език прави `LEFT JOIN` с `article_translations` и `section_translations` и връща `COALESCE(превод, оригинал)`. Ако превод не съществува — fallback към оригинала (БГ).

### 2. `POST /api/admin/articles/[id]/translate`
**Файл:** `app/api/admin/articles/[id]/translate/route.ts`

- Изисква admin JWT токен (cookie `token` с `role: "admin"`)
- Тяло: `{ "sourceLang": "bg", "targetLang": "en" }` (по подразбиране bg→en)
- Взима заглавие и секции от DB
- Извиква **MyMemory API** (безплатен, без ключ): `https://api.mymemory.translated.net/get?q={text}&langpair=bg|en`
- UPSERT в `article_translations` и `section_translations`
- Връща преведеното съдържание

### 3. `GET /api/admin/articles/[id]/translation?lang=en`
**Файл:** `app/api/admin/articles/[id]/translation/route.ts`

Връща съществуващия превод на статията за дадения език (за показване в admin app).

### 4. `PUT /api/admin/articles/[id]/translation`
**Файл:** `app/api/admin/articles/[id]/translation/route.ts`

- Тяло: `{ lang, title, sections: [{id, title, content}] }`
- UPSERT — позволява ръчно редактиране/корекция на превода от admin app-а

---

## Frontend промени

### Redux slice — `store/getArticles/getArticlesSlice.js`
`fetchArticles` приема `lang` параметър и го подава към API-то:
```js
dispatch(fetchArticles('en'))  // fetch с превод
dispatch(fetchArticles())       // fetch без превод (BG оригинал)
```

### `app/cardAquariums/CardAquariumsHTML.jsx`
- Добавен `useStoredLanguage()` hook
- `useEffect` re-fetch-ва статиите при смяна на езика:
```js
useEffect(() => {
  dispatch(fetchArticles(lang));
}, [lang, dispatch]);
```

### `app/Blog-Page/BlogHTML.jsx`
- Добавен `useStoredLanguage()` hook
- Подава `lang` при първоначален fetch

---

## Translation API (MyMemory)

```
GET https://api.mymemory.translated.net/get?q={text}&langpair=bg|en
```

- Безплатен, без API ключ
- Лимит: ~5 000 символа/ден на безплатния tier
- Преводът за всяка секция се вика отделно (за по-добри резултати)

---

## Ключови файлове

| Файл | Промяна |
|------|---------|
| `database/migrations/003_create_article_translations.sql` | Нова migration |
| `app/api/getArticles/route.ts` | Добавен `?lang=` param + JOIN translations |
| `app/api/admin/articles/[id]/translate/route.ts` | Нов — авто-превод чрез MyMemory |
| `app/api/admin/articles/[id]/translation/route.ts` | Нов — четене и запазване на превод |
| `store/getArticles/getArticlesSlice.js` | `fetchArticles` приема `lang` |
| `app/cardAquariums/CardAquariumsHTML.jsx` | Re-fetch при смяна на език |
| `app/Blog-Page/BlogHTML.jsx` | Подава `lang` при fetch |

---

## Как да се използва от admin app-а

### Авто-превод на статия (BG → EN):
```http
POST /api/admin/articles/42/translate
Cookie: token=<admin_jwt>
Content-Type: application/json

{ "targetLang": "en" }
```

### Четене на превода:
```http
GET /api/admin/articles/42/translation?lang=en
Cookie: token=<admin_jwt>
```

### Ръчно редактиране/запазване:
```http
PUT /api/admin/articles/42/translation
Cookie: token=<admin_jwt>
Content-Type: application/json

{
  "lang": "en",
  "title": "My translated title",
  "sections": [
    { "id": 101, "title": "Section title", "content": "Section content..." }
  ]
}
```

---

## Верификация

1. Пусни migration срещу DB
2. Тригерни `POST /api/admin/articles/{id}/translate` за тестова статия
3. Смени езика на сайта на EN → статиите трябва да се показват на английски
4. Върни се на BG → показва се оригиналното БГ съдържание
5. Ръчно редактирай превод чрез `PUT` и провери, че се запазва
