# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is D. Dimitrov's personal portfolio and blog platform - a full-stack Next.js application with multi-language support (Bulgarian/English). The application features a blog system with articles, user authentication via Google OAuth, and is deployed as a Dockerized application on a self-hosted server behind Nginx.

**Live Sites:**
- Main (Bulgarian): https://d-dimitrov.eu
- English: https://eng.d-dimitrov.eu

## Development Commands

### Running the Application

```bash
# Start development server (uses .env.development with Turbopack)
npm run dev

# Build for production (uses .env.production)
npm run build:prod

# Build without starting
npm run build

# Start production server
npm start

# Lint the code
npm run lint
```

### Docker Commands

```bash
# Build and start all containers
docker-compose up -d --build

# View logs
docker-compose logs -f

# Stop containers
docker-compose down

# Rebuild specific service
docker-compose up -d --build app
```

### Environment Files

The project uses environment-specific configuration:
- `.env.development` - Local development (uses local PostgreSQL at 192.168.100.100:5434)
- `.env.production` - Production deployment

Required environment variables:
- `DATABASE_URL` - Primary PostgreSQL connection string
- `NEON_DATABASE_URL` - Fallback database (NeonDB)
- `NEXTAUTH_SECRET` - NextAuth.js secret for session encryption
- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` - Google OAuth credentials
- `TELEGRAM_BOT_TOKEN` / `TELEGRAM_CHAT_ID` - (Optional) For database failover alerts

## Architecture Overview

### Tech Stack
- **Frontend:** Next.js 16 (App Router), React 19, TypeScript
- **State Management:** Redux Toolkit (RTK)
- **Styling:** SCSS/Sass, Tailwind CSS, Material-UI, Emotion
- **Backend:** Next.js API Routes (serverless functions)
- **Database:** PostgreSQL with connection pooling + NeonDB fallback
- **Authentication:** NextAuth.js with Google OAuth
- **Internationalization:** i18next + react-i18next
- **Icons:** FontAwesome, React Icons, MUI Icons
- **Deployment:** Docker + docker-compose on self-hosted server

### Project Structure

```
My-blog/
├── app/                          # Next.js App Router pages & components
│   ├── [PageName]-page/          # Page components (e.g., Home-page, About-page)
│   ├── api/                      # API routes (serverless functions)
│   │   ├── auth/[...nextauth]/   # NextAuth.js OAuth handler
│   │   ├── getArticles/          # Fetch all articles with sections
│   │   ├── login/                # User login tracking
│   │   ├── addComments/          # Comment submission
│   │   └── newsLetter/           # Newsletter signup
│   ├── layout.tsx                # Root layout with providers
│   ├── globals.css               # Global styles
│   ├── reusable-styles.scss      # Shared SCSS styles
│   ├── variables.scss            # SCSS variables
│   └── typography.scss           # Typography definitions
├── store/                        # Redux Toolkit slices
│   ├── storeState/store.js       # Main Redux store configuration
│   ├── getArticles/              # Articles state management
│   ├── login/                    # Auth state management
│   ├── createAccount/            # Account creation
│   ├── likesSlice/               # Like/dislike functionality
│   └── api/                      # RTK Query API definitions
├── database/
│   └── db.js                     # PostgreSQL connection pool with automatic failover
├── public/
│   └── locales/                  # i18next translation files
│       ├── bg/translation.json   # Bulgarian translations
│       └── en/translation.json   # English translations
├── content-BG.js                 # Bulgarian static content
├── content-EN.js                 # English static content
├── i18n.js                       # i18next configuration
├── next.config.js                # Next.js configuration
├── docker-compose.yml            # Docker orchestration
└── Dockerfile                    # Multi-stage Docker build
```

### Key Architectural Patterns

#### 1. Database Connection Management (`database/db.js`)

The application uses a sophisticated PostgreSQL connection strategy:

- **Dual Database Setup:** Primary database with automatic failover to NeonDB backup
- **Connection Pooling:** Reuses connections efficiently (max: 10 connections)
- **Health Checks:** Periodic checks every 15 seconds to detect primary DB failures
- **Automatic Failover:** Switches to fallback database after 2 consecutive failures
- **Telegram Alerts:** Sends notifications when failover occurs (if configured)
- **Development Mode:** Uses global connection pool to prevent connection leaks during hot reload

**Important:** The database module distinguishes between connection errors (triggers failover) and SQL errors (doesn't trigger failover). When working with database queries, check for column name mismatches or SQL syntax errors that won't automatically fail over.

#### 2. Next.js API Routes Pattern

All API routes follow a consistent pattern:

```typescript
// app/api/[endpoint]/route.ts
import { NextResponse } from 'next/server';
import pool from '../../../database/db';

export async function GET/POST(req) {
  try {
    const result = await pool.query('SELECT ...');
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
```

**Key conventions:**
- Import database connection from `database/db.js` (not `database/db`)
- Always use parameterized queries ($1, $2) to prevent SQL injection
- Return `NextResponse.json()` for all responses
- Log errors with descriptive messages
- Set appropriate HTTP status codes

#### 3. Redux Toolkit State Management

The store is configured in `store/storeState/store.js`:

- **Slices:** Each feature has its own slice (articles, auth, createAccount, etc.)
- **RTK Query:** Used for caching API responses (`articlesLikesDislikes` API)
- **Async Thunks:** Used for async operations in slices

When adding new features:
1. Create a slice in `store/[featureName]/[featureName]Slice.js`
2. Import and add to `store/storeState/store.js` reducer
3. Use `useDispatch` and `useSelector` in components

#### 4. Internationalization (i18n)

The app supports Bulgarian (bg) and English (en):

- **Configuration:** `i18n.js` sets up i18next with browser language detection
- **Translation Files:** `public/locales/[lang]/translation.json`
- **Static Content:** `content-BG.js` and `content-EN.js` for non-JSON content
- **Usage in Components:** Import `useTranslation()` from `react-i18next`

```javascript
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation();
  return <div>{t('key.from.translation.json')}</div>;
}
```

#### 5. Page Component Organization

Pages follow this naming pattern:
- **Folder:** `app/[PageName]-page/`
- **Main Component:** `page.tsx` (Next.js App Router convention)
- **HTML/Logic Component:** `[PageName]HTML.jsx` or similar

Example: `app/Home-page/page.tsx` imports from `HomePageHTML.jsx`

#### 6. Authentication Flow

- **Provider:** NextAuth.js with Google OAuth (`app/api/auth/[...nextauth]/route.ts`)
- **Root Provider:** `app/Provider.tsx` wraps the app with SessionProvider
- **Login Tracking:** Separate API route logs user logins to database (`app/api/login/route.ts`)

### Styling Approach

The project uses multiple styling solutions (historical reasons):

1. **SCSS Modules:** `reusable-styles.scss`, `variables.scss`, `typography.scss`
2. **Tailwind CSS:** Utility-first classes (configured in `tailwind.config.ts`)
3. **Material-UI:** Pre-built components with `@mui/material`
4. **Emotion:** Styled components for MUI theming
5. **Inline Styles:** Some legacy components

**Recommendation:** For new features, prefer Tailwind CSS for consistency.

## Important Development Notes

### Database Queries

- Always import from `database/db` (ES module): `import pool from '../../../database/db'`
- The pool has automatic failover - don't handle connection errors manually
- Use async/await with try/catch for all database operations
- Test queries with both primary and fallback databases

### API Routes

- All routes are in `app/api/[endpoint]/route.ts`
- Use `export const dynamic = "force-dynamic"` to disable caching when needed
- Set `export const revalidate = 0` for real-time data
- Always validate input with `express-validator` or manual checks

### Next.js Configuration

- Root redirect: `/` → `/Home-page` (configured in `next.config.js`)
- Remote images allowed from `share.d-dimitrov.eu` domain
- i18n locales: `bg` (Bulgarian), `en` (English), default is `en`

### Docker Deployment

The production Docker setup:
- **Multi-stage build:** Builder stage installs deps and builds, runner stage is minimal
- **Volume mount:** `/ssd/docker/share_upload_images` → `/app/upload` for persistent images
- **Network:** Uses external `docker_network` for Nginx reverse proxy communication
- **Port:** Exposes 3000 internally (Nginx proxies to it)

### Type Safety

- TypeScript is configured with strict mode
- Path alias `@/*` maps to `./src/*` (but `src/` directory doesn't exist - legacy config)
- React 19 types are enforced via overrides in `package.json`

### Common Gotchas

1. **Hot Reload Issues:** If DB connections leak during development, restart the dev server
2. **i18n Hydration Errors:** Ensure `useSuspense: false` in i18n config to avoid SSR mismatches
3. **API Caching:** Next.js aggressively caches API routes - use `dynamic = "force-dynamic"` or `revalidate = 0`
4. **Docker Build Context:** Dockerfile copies `.env.production` before build - ensure it exists
5. **Redux Provider:** Must be a Client Component - `Provider.tsx` uses `"use client"` directive

## Testing

**Note:** No test framework is currently configured. If adding tests:
- Install Jest + React Testing Library
- Add `npm test` script to `package.json`
- Create `__tests__` directories alongside components

## Deployment Workflow

1. **Push to GitHub:** Code changes are pushed to repository
2. **Server Pull:** SSH into server and pull latest changes
3. **Rebuild Containers:** `docker-compose up -d --build`
4. **Nginx Reload:** Nginx automatically routes to the new container
5. **Cloudflare:** CDN caching is handled automatically (or manually purged if needed)

## Linting & Code Quality

- **ESLint:** Configured with Next.js preset (`eslint-config-next`)
- **React Hooks:** Additional linting via `eslint-plugin-react-hooks`
- Run `npm run lint` before committing

## Additional Resources

- **Next.js Docs:** https://nextjs.org/docs
- **Redux Toolkit:** https://redux-toolkit.js.org
- **NextAuth.js:** https://next-auth.js.org
- **i18next:** https://www.i18next.com
- **PostgreSQL:** https://www.postgresql.org/docs/

---

**Current Branch:** feature/MB-34

When working on this codebase, remember that it's a production application with active users. Always test database queries locally before deploying, and be cautious with schema changes.
