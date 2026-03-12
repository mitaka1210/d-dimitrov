# Миграция: JWT в localStorage → httpOnly cookie

**Цел:** Намаляване на риска от откраднат токен при XSS (JavaScript не може да чете httpOnly cookie).

**Текущо:** Токенът се записва в `localStorage` в `store/login/loginSlice.js` и `store/createAccount/createAccountSlice.js`. API е външен: `https://share.d-dimitrov.eu`.

---

## ⚠️ Важно: първо backend, после frontend

**Frontend вече е подготвен** за httpOnly cookie (няма запис/четене на token в localStorage; извиква се `checkAuth` при зареждане и `POST /api/logout` при logout). **Логинът ще работи само след като backend (share.d-dimitrov.eu) поддържа:**

1. При login/create-account: отговор с `Set-Cookie` (httpOnly) с токена.
2. При check-auth: четене на токена от cookie (не от header `Authorization`).
3. Endpoint `POST /api/logout`, който изчиства cookie с `Set-Cookie` с `Max-Age=0`.

Докато backend не е обновен, при логин няма да се зададе cookie и `checkAuth` ще върне грешка – потребителят няма да остане логнат. Обновете първо backend по стъпките по-долу, после деплой на frontend.

---

## 1. Промени на backend (share.d-dimitrov.eu)

### Login / Create-account отговори

- Вместо (или в допълнение) да връщате `{ token, role, username }` в JSON, задайте **httpOnly cookie** с токена:
  - `Set-Cookie: token=<JWT>; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=...`
- Метаданни като `role`, `username` могат да останат в тялото на отговора (не са толкова чувствителни) или да се взимат от `/api/check-auth` след логин.

### Check-auth и защитени endpoints

- Приемайте токена от **cookie** (автоматично изпраща се от браузъра при `credentials: 'include'`), вместо от header `Authorization`.
- Опционално: поддръжка и на двете за преходен период (първо cookie, ако липсва – header).

### Logout

- Добавете endpoint напр. `POST /api/logout`, който изпраща отговор с:
  - `Set-Cookie: token=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0`
  за изчистване на cookie от браузъра.

---

## 2. Промени на frontend (тези са направени)

### Направено в този проект

- Всички `fetch` към `share.d-dimitrov.eu` използват **`credentials: 'include'`**.
- **`store/login/loginSlice.js`:** Няма запис/четене на token в localStorage. При login се връща само отговорът от сървъра (role/username в state). `checkAuth` извиква само с `credentials: 'include'`, без header `Authorization`. При logout се извиква **`logoutApi`** thunk, който прави `POST /api/logout` и изчиства Redux state.
- **`store/createAccount/createAccountSlice.js`:** `credentials: 'include'`, без запис на token в localStorage.
- **`app/Navigation-component/navigation.jsx`** и **`app/HamburgerMenu-page/HamburgerMenuHTML.jsx`:** Показват потребителя от Redux `state.auth.user` / `isAuthenticated`, не от localStorage. При logout се извиква `dispatch(logoutApi())`.
- **`app/UserDropdown/userDropdown.jsx`:** Logout извиква `logoutApi()` вместо `localStorage.clear()`.
- **`app/AuthInit/AuthInit.jsx`:** При зареждане на приложението се извиква `checkAuth()` веднъж, за да се възстанови сесията от cookie (ако backend я е задал).
- **Login форми:** Успехът се определя от `result.meta.requestStatus === 'fulfilled'`, не от `result.payload.token`.

---

## 3. Ред на внедряване

1. **Backend:** Добавяне на задаване на httpOnly cookie при login/create-account и четене от cookie при check-auth; добавяне на `/api/logout`.
2. **Frontend:** Добавяне на `credentials: 'include'` към всички fetch към този API (обратно съвместимо).
3. **Frontend:** Премахване на запис/четене на token от localStorage; разчитане на cookie и на отговорите от сървъра; извикване на logout endpoint при logout.

След тези стъпки токенът няма да е достъпен за JavaScript и ще се изпраща само чрез httpOnly cookie.

---

## 4. Често срещан проблем: 401 „Липсващ токен за достъп“ след логин

**Симптом:** След успешен логин при зареждане или при check-auth backend връща `401` с `{"message":"Липсващ токен за достъп."}`.

**Причина:** При заявката към check-auth backend не получава токен. Обикновено е едно от двете:

### А) Backend при login не задава cookie

Ако при `POST /api/login` в отговора **няма** header `Set-Cookie` с токена, браузърът няма какво да запази и при следващи заявки (вкл. check-auth) няма cookie → „Липсващ токен“.

**Проверка:** DevTools → Network → изберете заявката **login** → Response Headers. Трябва да има нещо като:
```http
Set-Cookie: token=eyJ...; HttpOnly; Path=/; ...
```
Ако няма – в login route на share.d-dimitrov.eu трябва да се задава cookie (вижте `docs/backend-httpOnly-cookie-example.md`).

### Б) Cross-origin: cookie не се записва/изпраща

Ако сайтът е на друг домейн от API (напр. `https://d-dimitrov.eu` или `http://localhost:3000`, а API е на `https://share.d-dimitrov.eu`), при cross-origin отговор браузърът **не записва** cookie с `SameSite=Strict` – затова при check-auth отново няма cookie.

**Проверка:** Network → заявка **check-auth** → Request Headers. Трябва да има:
```http
Cookie: token=...
```
Ако при check-auth няма header `Cookie`, cookie не е запазено (най-често заради SameSite при cross-origin).

**Решение при cross-origin:**

- При задаване на cookie при login използвайте **`SameSite=None`** (и **`Secure`** – задължително при None). Пример:
  ```http
  Set-Cookie: token=<JWT>; HttpOnly; Secure; SameSite=None; Path=/; Max-Age=86400
  ```
- CORS: отговорът от API трябва да включва `Access-Control-Allow-Credentials: true`, а `Access-Control-Allow-Origin` да е конкретен origin (напр. `https://d-dimitrov.eu`), не `*`.
