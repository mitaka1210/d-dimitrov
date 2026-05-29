# CLAUDE.md - Project Guidelines

This file provides guidance to Claude Code when working with code in this repository.

## Documentation Structure

**This file (CLAUDE.md)**: Always loaded - contains core principles. Keep it concise.

**Detailed Guides** (Referenced, not loaded — consult when needed):
- `.claude/docs/CODE_PRINCIPLES.md` - Code quality standards (hard limits, patterns).
- `.claude/docs/PROJECT_CONTEXT.md` - **CRITICAL**: Read first for current Tech Stack (DB, Auth, Frameworks).
- `.claude/docs/FILE_PRINCIPLES.md` - File organization (structure, naming).
- `.claude/docs/AGENT_GUIDE.md` - Base patterns for agent delegation
- `.claude/docs/ARCHITECTURE_GUIDE.md` - Core structural patterns (FE-BE communication).
- `.claude/docs/CODEBASE_MAP.md` - File locations, function tables, navigation
- `.claude/docs/BUSINESS_LOGIC.md` - Domain rules & Senior Backend standards (Java 21).
- `.claude/docs/FRONTEND_DESIGN_SYSTEM.md` - State Management & UI patterns (NgRx/RTK).
- `.claude/docs/FRONTEND_TESTING_GUIDE.md` - Testing patterns for React/Next.js, Angular, Vue.
- `.claude/docs/DATABASE_GUIDE.md` - Schema/migration rules (load only when touching DB).
- `.claude/docs/DELEGATE_GUIDE.md` - Agent delegation strategies
- `.claude/docs/DEBUG_GUIDE.md` - Systematic debugging methodologies
- `.claude/docs/POC_GUIDE.md` - Proof of concept patterns for validating unknowns
- `.claude/docs/VERIFY_GUIDE.md` - Evaluate reviewer feedback critically
- `.claude/docs/KIRO_TASK_EXECUTION_GUIDE.md` - Development workflow for Kiro specs

## Documentation Loading Strategy (Token Efficiency)

**Load-on-demand by default.** Do NOT read all docs at session start.

| Step | Action |
|------|--------|
| Session start | Read **only** `CODE_PRINCIPLES.md` + `FILE_PRINCIPLES.md` (the always-read pair). |
| Before a task | Identify which extra docs apply, read **only those**. See `/start` for the routing table. |
| Heavy investigation | Delegate to an agent (e.g., `codebase-analyzer`). Agents work in their own context — main context stays clean. |

**Rule**: every doc not read saves ~500–2500 tokens. Don't read "just in case."

## Available Commands

- `/start` - Load essential project context (principles, architecture)
- `/init-docs` - Auto-populate the four template docs (ARCHITECTURE, CODEBASE_MAP, BUSINESS_LOGIC, FRONTEND_DESIGN_SYSTEM) for a new project
- `/spec` - Create comprehensive strategic plan for complex features, saved to .claude/specs/
- `/delegate` - Delegate tasks to agents, keeping context clean
- `/orchestrate` - Full workflow: analyze → implement → test → document → review
- `/debug` - First-principles debugging for complex issues
- `/poc` - Proof of concept to validate technical feasibility before full build
- `/commit` - Smart git commits with logical grouping
- `/docs-update` - Analyze and update documentation
- `/test` - Create QA test request documents
- `/report` - Generate reviewer briefing documents
- `/verify` - Evaluate reviewer feedback critically
- `/kiro` - Execute tasks from Kiro implementation plans
- `/kiro-create` - Create a new Kiro spec (requirements.md, design.md, tasks.md)
- `/kiro-review` - Review completed Kiro tasks against specifications
- `/progress` - Generate weekly/monthly activity report using ai-doc-studio

## Core Principles
### 1. Initialization Logic
At the start of every session, you MUST:
1. Identify the **Database type** (SQL/NoSQL) and **Framework** from `PROJECT_CONTEXT.md`.
2. Adjust all code generation to match the identified stack (e.g., use JPA for Postgres or SDK for Firebase).

### 2. Backend Standards

> ⚠️ Read `PROJECT_CONTEXT.md` first. Apply the matching ruleset below based on the declared framework.

#### Java 21 / Spring Boot
- **Dependency Injection**: Constructor Injection only. No `@Autowired`.
- **Concurrency**: Use **Virtual Threads** (Project Loom) where applicable.
- **Data Transfer**: Use `record` for all DTOs. Entities stay in the DB layer only.
- **Validation**: Bean Validation (`@NotNull`, `@Size`) on incoming record DTOs.
- **Error Handling**: `@RestControllerAdvice` globally. No stack traces to client.

#### Node.js / TypeScript (Express / Fastify / NestJS)
- **Language**: TypeScript mandatory. No `any` types.
- **Async**: `async/await` only. Zero tolerance for raw callbacks.
- **Validation**: **Zod** for all input boundaries (API, external, user input).
- **Data Transfer**: Zod schemas or typed interfaces as DTOs. Never pass raw `req.body`.
- **Error Handling**: Custom error classes + global error middleware. Never `catch (e) {}`.
- **Dependency Injection**: Constructor-based classes. NestJS DI if using NestJS.
- **ORM**: Prisma or Drizzle (preferred). TypeORM acceptable.

### 3. Frontend Standards
- **Angular**: Use `OnPush` strategy and `| async` pipe. No manual `.subscribe()`.
- **React**: Use RTK Query hooks for data fetching. No manual `useEffect` for APIs.
- **All frameworks**: Write **≥ 3 tests per new component** (render + interaction + error). See `FRONTEND_TESTING_GUIDE.md`.
### Ask Before Assuming

- **When instructions are ambiguous**: Ask for clarification rather than assuming
- **When multiple interpretations possible**: Request specific details
- **When requirements seem incomplete**: Ask about missing details
- **Better to ask than sorry**: Clarify first, implement second

### Code Quality (See CODE_PRINCIPLES.md for details)

| Rule | Limit |
|------|-------|
| Function length | Max 50 lines |
| Parameters | Max 4 (use object for more) |
| Component Logic | Max 15 lines (else move to Hook/Service) |
| Nesting depth | Max 4 levels |
| File length | Max 300 lines |

### File Organization (See FILE_PRINCIPLES.md for details)

- One responsibility per file
- Group by feature, not type
- Consistent naming conventions
- Temp files in designated directory only

## Available Expert Agents

See `.claude/docs/DELEGATE_GUIDE.md` for detailed usage patterns.

| Agent | Purpose | When to Use |
|-------|---------|-------------|
| `strategic-planner` | Implementation planning | Start of complex features |
| `senior-dev-consultant` | Expert advice | Architecture decisions, complex debugging |
| `senior-dev-implementer` | Production code | Complex features needing senior-level quality |
| `task-completion-validator` | Verify completeness | Before marking tasks done |
| `investigator` | Deep research | Bug investigation, API research |
| `codebase-analyzer` | Understand structure | Before adding new modules |
| `docs-explorer` | Documentation research | Library/API documentation lookup |
| `test-generator` | Create test suites | After implementing features |
| `docs-maintainer` | Update documentation | After significant changes |

**Quick Reference**:
- Use `codebase-analyzer` instead of opening many files
- Use `docs-explorer` instead of loading extensive docs
- Run multiple agents in parallel when tasks are independent

## Documentation Maintenance

After implementing significant changes:
- Pattern used multiple times → Update architecture guide
- Bug fixed with learnings → Document in debugging guide
- New conventions emerge → Update relevant guides

Run `/docs-update check` to analyze if documentation needs updating.

## Continuous Improvement

This document should evolve with the project. Update these guidelines when you discover new patterns, anti-patterns, or better approaches.
