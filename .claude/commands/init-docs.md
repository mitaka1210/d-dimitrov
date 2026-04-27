---
argument-hint: [check | write] (optional: check what would be populated without writing, or write the docs)
description: Auto-populate the four template docs (ARCHITECTURE_GUIDE, CODEBASE_MAP, BUSINESS_LOGIC, FRONTEND_DESIGN_SYSTEM) by analyzing the actual project
---

# Init Docs Command

Automatically populate the four template documents in `.claude/docs/` based on a real analysis of the current project. Replaces placeholders like `[Your Project Name]` with actual content.

## Command Syntax

- `/init-docs` - Analyze the project and write the four docs (asks for confirmation before writing)
- `/init-docs check` - Only report what would be populated, do not write
- `/init-docs write` - Write the docs without asking for confirmation (use only when you've already reviewed)

## When To Use

Run this **once**, right after copying the skeleton into a new project. After it runs, the four template docs will reflect the actual project (frameworks, structure, key files, domain logic), so commands like `/start`, `/spec`, `/orchestrate` give project-aware advice instead of generic placeholders.

For ongoing maintenance after the docs are populated, use `/docs-update` instead.

## Process

### Step 1 — Detect project type

Read these files at the project root if they exist:

- `package.json` — Node/JS/TS project; note framework (Next.js, Express, NestJS, Vite, etc.), key dependencies, scripts
- `pyproject.toml`, `requirements.txt`, `setup.py` — Python project; note framework (Django, Flask, FastAPI, etc.)
- `Cargo.toml` — Rust project
- `go.mod` — Go project
- `composer.json` — PHP project
- `Gemfile` — Ruby project
- `pom.xml`, `build.gradle` — Java/JVM project
- `README.md` — project description, badges, getting-started

If none exist, ask the user what kind of project this is before continuing.

### Step 2 — Analyze structure

Delegate to the `codebase-analyzer` agent with this prompt:

> Map this project at the root level. Identify and return:
>
> 1. **Top-level directories** with a one-line purpose for each (skip `node_modules`, `.git`, `.next`, `dist`, `build`, `.idea`, `coverage`)
> 2. **Main entry points** (e.g., `app/layout.tsx`, `src/index.ts`, `main.py`)
> 3. **Architecture style** — feature-based / layered / MVC / hexagonal / monorepo / single-app
> 4. **Domains/features** detected from folder names and route files
> 5. **Database** — ORM (Prisma, TypeORM, SQLAlchemy, etc.), schema files, migrations directory
> 6. **Auth approach** — NextAuth, Passport, JWT, OAuth, custom — and where it lives
> 7. **Frontend framework** — React, Vue, Svelte, Angular, none — and styling approach (SCSS, Tailwind, CSS Modules, styled-components)
> 8. **API surface** — REST routes, GraphQL, tRPC, RPC; list the main route files
> 9. **Testing setup** — Jest, Vitest, Pytest, etc., and test file locations
>
> Return as a structured markdown report. Do NOT invent things — only report what you actually find in the code.

Wait for the agent's report before proceeding.

### Step 3 — Populate `ARCHITECTURE_GUIDE.md`

Replace the placeholder sections (`[Your Project Name]`, `[Brief description]`, the `Project Structure` block) with real content from Step 2.

**Keep unchanged:**
- The "Core Architectural Principles" section
- Universal best-practice sections that aren't placeholders

**Required sections to populate:**
- `Project Overview` — name (from `package.json` `name` field or repo folder), description (from README first paragraph), key characteristics list (framework, DB, auth, deployment)
- `Project Structure` — actual top-level directories with explanations from Step 2
- `Quick Reference` at the bottom — list real entry points and key files

### Step 4 — Populate `CODEBASE_MAP.md`

For each major domain/feature found in Step 2, list:

- The directory path
- 2–5 most important files in it
- Brief purpose of each file

**Format:**
```
## <Domain Name>

Location: `<path>/`

| File | Purpose |
|------|---------|
| `<file>` | <one-line purpose> |
```

If a function table exists in the template, populate with actually-exported functions for top services/utilities only. Do not exhaustively list every function — pick the 5–10 most important per domain.

### Step 5 — Populate `BUSINESS_LOGIC.md`

Inspect API routes, validation schemas (Zod, Joi, Pydantic), middleware, and database schema for domain rules. Document:

- **Entities** — main data models with key fields
- **Rules** — validation constraints, state transitions, permissions, rate limits, business invariants found in code
- **Formulas/calculations** — pricing, scoring, ranking, time-based logic if present

**If no clear business logic exists** (e.g., it's a portfolio site or boilerplate), write:

> No domain-specific business rules detected yet. Add as features develop.
>
> Detected entities: <list anything from DB schema if present>

Do not fabricate rules.

### Step 6 — Populate `FRONTEND_DESIGN_SYSTEM.md`

If a frontend was detected in Step 2:

- **Stack** — framework, styling approach, component library (if any)
- **Component organization** — how components are grouped (per route, atomic, feature-based)
- **Naming conventions** — observed patterns (PascalCase components, kebab-case folders, etc.)
- **Styling patterns** — global styles location, theming approach, breakpoints if found
- **Reusable components** — list any obvious shared components (e.g., `Button`, `Modal`, `DropDown`)

If no frontend exists, replace the entire content with:

> Not applicable — backend-only project.

### Step 7 — Confirm and report

After writing (or in `check` mode, without writing), output a summary:

```
Init Docs complete

Populated:
- ARCHITECTURE_GUIDE.md — <N> sections updated
- CODEBASE_MAP.md — <N> domains documented
- BUSINESS_LOGIC.md — <status: populated | minimal>
- FRONTEND_DESIGN_SYSTEM.md — <status: populated | not-applicable>

Sections kept unchanged (universal principles): <list>

Review the docs and adjust where needed. For ongoing updates, use /docs-update.
```

## Hard Rules

1. **DO NOT invent details.** Only document what is actually present in the code.
2. **Mark uncertain items** as `[TBD - to be filled by maintainer]` rather than guessing.
3. **Preserve the heading structure** of each template — replace content under headings, do not rename headings.
4. **Do not touch** `CODE_PRINCIPLES.md`, `FILE_PRINCIPLES.md`, `AGENT_GUIDE.md`, `DELEGATE_GUIDE.md`, `DEBUG_GUIDE.md`, `POC_GUIDE.md`, `VERIFY_GUIDE.md`, `SPEC_GUIDE.md`, `KIRO_*` — these are universal.
5. **Ask before overwriting** if any of the four target docs already contain non-template content (i.e., the user has already customized them).

## Detection: Is the doc still a template?

A doc is considered "still a template" if it contains any of these strings:
- `[Your Project Name]`
- `[Brief description`
- `<!-- REPLACE`
- `<!-- CUSTOMIZE`
- `[your-project-here]`

If none of those markers are present, treat the doc as already-customized and ask the user before overwriting.
