---
name: "source-command-start"
description: "Migrated source command `start`"
---

# source-command-start

Use this skill when the user asks to run the migrated source command `start`.

## Command Template

# Start

Load minimal project context. **Lazy by default — read only what the current task needs.**

## Always read (essential, ~core principles)

1. `.Codex/docs/CODE_PRINCIPLES.md` — hard limits + long-term solutions philosophy
2. `.Codex/docs/FILE_PRINCIPLES.md` — file organization (short)

## Read on demand (only if relevant to the task)

| If the task involves… | Read |
|-----------------------|------|
| Project architecture decisions | `ARCHITECTURE_GUIDE.md` |
| Finding/locating files | `CODEBASE_MAP.md` |
| Domain rules, validation, business logic | `BUSINESS_LOGIC.md` |
| UI / styling / components | `FRONTEND_DESIGN_SYSTEM.md` |
| Database schema, migrations, Prisma | `DATABASE_GUIDE.md` |
| Delegating to agents | `AGENT_GUIDE.md` + `DELEGATE_GUIDE.md` |
| Debugging | `DEBUG_GUIDE.md` |
| Proof of concept | `POC_GUIDE.md` |
| Reviewing feedback | `VERIFY_GUIDE.md` |
| Strategic planning | `SPEC_GUIDE.md` |
| Kiro spec workflow | `KIRO_*_GUIDE.md` |
| QA test requests | `TESTING_REQUEST_GUIDE.md` |
| React/Next.js/Angular/Vue components or features | `FRONTEND_TESTING_GUIDE.md` |

**Do NOT read these upfront.** Read only when about to do related work.

## Confirm

After reading the always-read files, output:

> Context loaded: CODE_PRINCIPLES, FILE_PRINCIPLES. Other docs available on demand.

Then proceed with the task.
