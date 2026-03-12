# Backend (Express): примерен код за httpOnly cookie

Приложението (frontend) вече изпраща `credentials: 'include'` и не записва токен в localStorage. За да работи логинът, backend на **share.d-dimitrov.eu** трябва да:

1. При **POST /api/login** да задава httpOnly cookie с JWT и да връща `{ role, username }` в тялото.
2. При **GET /api/check-auth** да чете токена от cookie (или от header `Authorization`) и да връща `{ isAuthenticated: true, role, username }`.
3. Да има **POST /api/logout**, който изчиства cookie-то.

По-долу са примерни промени за твоя Express код.

---

## 1. Cookie и check-auth

Увери се, че използваш `cookie-parser` (например `app.use(cookieParser())`).

В **check-auth** route:

- Вземи токена от `req.cookies.token`; ако няма, от `req.headers['authorization']` (може да е `Bearer <token>` или само `<token>`).
- След `jwt.verify()` върни в отговора `role` и `username` от payload, за да попълни frontend Redux:

```javascript
const token = req.cookies?.token || req.headers['authorization']?.replace(/^Bearer\s+/i, '')?.trim();
if (!token) {
  return res.status(401).json({ message: translate('missing_token') });
}
try {
  const decoded = jwt.verify(token, SECRET_KEY);
  res.json({
    isAuthenticated: true,
    role: decoded.role,
    username: decoded.username,
  });
} catch (err) {
  // ... същата логика за errorCode и translate(errorCode)
}
```

---

## 2. Login – задаване на cookie

В **POST /api/login** след успешна проверка на парола и генериране на JWT:

- Задай cookie в отговора вместо (или в допълнение) да връщаш токена в JSON.
- В тялото върни само `{ role, username }` (frontend не очаква `token` в отговора).

```javascript
const token = jwt.sign(
  { id: user.id, username: user.username, role: user.role },
  SECRET_KEY,
  { expiresIn: '24h' }
);

// Ако frontend е на друг домейн (cross-origin), използвайте SameSite=None
const COOKIE_OPTIONS = 'HttpOnly; Secure; SameSite=None; Path=/; Max-Age=86400'; // 24h
res.setHeader('Set-Cookie', `token=${token}; ${COOKIE_OPTIONS}`);
res.json({ role: user.role, username: user.username });
```

(Ако работиш без HTTPS локално, за тест може временно да махнеш `Secure`.)

---

## 3. Logout

Нов route **POST /api/logout**:

```javascript
router.post('/', (req, res) => {
  res.setHeader(
    'Set-Cookie',
    'token=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0'
  );
  res.json({ ok: true });
});
```

Регистрирай го в приложението, напр. `app.use('/api/logout', logoutRouter)`.

---

След тези промени на backend, логинът и check-auth ще работят само с cookie; токенът няма да се пази в localStorage и няма да е достъпен за JavaScript (намален риск от XSS).
