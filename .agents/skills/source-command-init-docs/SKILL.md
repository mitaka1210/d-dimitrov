---
name: "source-command-init-docs"
description: "Migrated source command `init-docs`"
---

# source-command-init-docs

Use this skill when the user asks to run the migrated source command `init-docs`.

## Command Template

# Init Docs

Populate the four template docs in `.Codex/docs/` from real project analysis. Run **once** after copying the skeleton.

## Syntax

| Command | Behavior |
|---------|----------|
| `/init-docs` | Analyze + write (asks for confirmation) |
| `/init-docs check` | Report only, no writes |
| `/init-docs write` | Write without asking |

For ongoing maintenance, use `/docs-update`.

## Process

**1. Detect stack** — read root manifests if present: `package.json`, `pyproject.toml`/`requirements.txt`, `Cargo.toml`, `go.mod`, `composer.json`, `Gemfile`, `pom.xml`/`build.gradle`, `README.md`. If none, ask the user.

**2. Analyze** — delegate to `codebase-analyzer`:

> Map this project. Return: top-level dirs (skip `node_modules`, `.git`, `.next`, `dist`, `build`, `.idea`, `coverage`); main entry points; architecture style; domains/features; database (ORM, schema, migrations); auth approach; frontend framework + styling; API surface (REST/GraphQL/tRPC); testing setup. Report only what's actually in the code — do not invent.

**3. Populate PROJECT_CONTEXT.md first** — this is the most critical file. Fill every field from the analysis:

| Field | How to detect |
|-------|---------------|
| Frontend Framework + version | `package.json` → `dependencies` (angular, react, next, vue...) |
| State Management | `package.json` → `@ngrx/*`, `@reduxjs/toolkit`, `zustand`, `jotai`... |
| Backend Framework + version | `pom.xml` / `build.gradle` (Spring Boot), `package.json` (express, fastify, nestjs), `requirements.txt` (FastAPI, Django) |
| Primary Database | ORM config files: `prisma/schema.prisma`, `application.yml`, `.env` (DATABASE_URL) |
| Auth Provider | `package.json` / imports: `firebase-admin`, `@auth0/*`, `passport`, `spring-security` |
| ORM / Driver | `prisma`, `drizzle-orm`, `typeorm`, `hibernate` (from pom.xml) |
| Migrations | `prisma/migrations/`, `db/migrations/`, `flyway`, `liquibase` |
| Deployment Platform | `Dockerfile`, `render.yaml`, `vercel.json`, `railway.json`, `.github/workflows/` |
| Special Libraries | Top 10 non-framework deps from `package.json` / `pom.xml` |

Mark fields as `[TBD - not detectable from code]` only if genuinely absent from all files.

**4. Populate the 4 docs** based on the report:

| File | What to write |
|------|---------------|
| `ARCHITECTURE_GUIDE.md` | Replace `[Your Project Name]`, description, structure. Keep "Core Architectural Principles" unchanged. |
| `CODEBASE_MAP.md` | One section per domain: path + table of 2-5 key files with purpose. Top 5-10 functions max per domain. |
| `BUSINESS_LOGIC.md` | Entities, validation rules, formulas found in code. If none: write "No domain-specific rules detected yet" + list any DB entities. |
| `FRONTEND_DESIGN_SYSTEM.md` | Stack, component organization, naming, styling, reusable components. If no frontend: "Not applicable — backend-only project." |

**5. Report** — summarize what was populated, kept unchanged, or marked `[TBD - to be filled by maintainer]`.

## Hard Rules

1. **Don't invent.** Only document what's in the code; mark unknowns as `[TBD]`.
2. **Preserve heading structure** of each template. Replace content under headings, never rename them.
3. **Don't touch** `CODE_PRINCIPLES.md`, `FILE_PRINCIPLES.md`, `AGENT_GUIDE.md`, `DELEGATE_GUIDE.md`, `DEBUG_GUIDE.md`, `POC_GUIDE.md`, `VERIFY_GUIDE.md`, `SPEC_GUIDE.md`, `KIRO_*`, `DATABASE_GUIDE.md` — these are universal.
4. **Ask before overwriting** if a target doc lacks template markers (already customized).
5. **PROJECT_CONTEXT.md is always populated first** — it's the foundation all other docs and commands depend on.

## Template Detection

A doc is "still a template" if it contains any of: `[Your Project Name]`, `[Brief description`, `<!-- REPLACE`, `<!-- CUSTOMIZE`, `[your-project-here]`. If none present, ask before overwriting.
