# Agent Guide - Base Patterns

> **Context Loading**: Reference this guide from any command that uses agents. Load if not already in session.

## Why Use Agents

Agents keep your main context clean. Instead of loading files, reading code, and bloating context:
- **Delegate** the work to specialized agents
- **Receive** concise reports with only essential info
- **Decide** based on findings, not raw data

## Available Agents

| Agent | Purpose | When to Use |
|-------|---------|-------------|
| `investigator` | Bug hunting, root cause analysis | "Why is X broken?", "Find the cause" |
| `codebase-analyzer` | Structure, patterns, architecture | "Where should this go?", "Find patterns" |
| `docs-explorer` | Documentation research | "How does X library work?" |
| `senior-dev-consultant` | Expert advice, architecture | "Review approach", "Security concerns?" |
| `senior-dev-implementer` | Implementation, production-quality code | "Create X", "Fix Y", complex features |
| `test-generator` | Create focused test suites | "Generate tests for X" |
| `task-completion-validator` | Verify completeness | Before marking tasks done |
| `docs-maintainer` | Update documentation | After significant changes |

**Note**: All agents above are from `.claude/agents/`. Never use built-in `general-purpose`.

## Agent Selection Patterns

**Bug Fix:**
1. `investigator` → find root cause
2. `senior-dev-implementer` → implement fix

**New Feature:**
1. `codebase-analyzer` → understand existing patterns
2. `senior-dev-implementer` → implement feature
3. `test-generator` → add tests

**Research/Understanding:**
1. `docs-explorer` → external docs/APIs
2. `codebase-analyzer` → internal code patterns

## Parallel vs Sequential

```
Independent tasks → PARALLEL (single message, multiple Task calls)
  Example: "Investigate auth" + "Investigate database" - no dependency

Dependent tasks → SEQUENTIAL (wait for report, then next)
  Example: "Investigate patterns" → "Implement based on findings"
```

**Rule**: If the next delegation would change based on what an agent finds, run sequentially.

## Report Standards

### The Golden Rule
**Parent Claude must be able to answer user follow-up questions without re-investigating.**

### CRITICAL: Reports Must Be VERIFIABLE

**DO NOT trust agent reports without verification data.**

Agent reports are USELESS if they:
- Make claims without showing actual code
- Say "Line 732" without the actual code at that line
- Assert "function X does Y" without the function's code
- Give vague "file.ts:100-200" ranges without content

**Every claim MUST have PROOF:**
```
BAD: "getItems doesn't filter by status"
GOOD: "getItems at item.service.ts:418-430:
   ```typescript
   return this.prisma.item.findMany({
     where: {
       parentId,
       // BUG: No status filter here!
       OR: [...]
     }
   });
   ```
   This returns CANCELLED items too."
```

**If report lacks exact code snippets proving the issue -> REJECT IT and re-delegate.**

### Every agent report MUST include:

1. **Precise locations**: Full file paths + line numbers
2. **ACTUAL CODE SNIPPETS**: Not just "see line X" - the actual 10-20 lines proving the claim
3. **Root cause WITH reasoning**: WHY it happens AND how you found it
4. **Alternatives ruled out**: What else was checked (so parent knows)
5. **Design decisions**: Why this approach over others
6. **Confidence level**: High/Medium/Low with justification
7. **Edge cases and caveats**: Things parent should know about

**Report Template:**
```markdown
## Findings

**Root Cause:** [Clear explanation]

**How I Found This:**
- Started at: [where investigation began]
- Key discovery: [what led to conclusion]
- Ruled out: [alternatives checked]

**Evidence:**
- File: `src/path/to/file.ts:42-58`
- Code: [code snippet with context]
- Observation: [what this shows and why]

**Why This Happens:**
[2-3 sentences explaining the mechanism - parent needs this to explain to user]

**Fix Required:**
- File: `src/path/to/file.ts:42`
- Change: [exact change]
- Reason: [why this fixes the root cause]

**Design Decisions:**
- [Choice]: [Why this over alternatives]

**Edge Cases:**
- [Edge case]: [How handled]

**Confidence:** [High/Medium/Low] - [justification]
```

### Implementation Report Requirements

**Implementation reports are EQUALLY useless without exact code.**

Implementers MUST report:
```markdown
## Changes Made

**File 1**: `src/services/foo/bar.service.ts`
**Lines changed**: 392-410

**BEFORE:**
```typescript
const result = await this.service.doThing(id);
```

**AFTER:**
```typescript
const items = await this.service.getItems(id);
for (const item of items) {
  await this.service.processItem(item);
}
const result = items.length;
```

**Why**: [Explanation of why this change fixes the issue]
```

**If implementer says "I changed X" without BEFORE/AFTER code -> REJECT and re-delegate.**

## Agent Instructions Template

When launching an agent, include:

```
TASK: [Specific task description]

SCOPE: [What to look at, what to ignore]

REPORT REQUIREMENTS:
- Root cause with reasoning chain (how you found it)
- All relevant file:line references
- Code snippets with context (10-20 lines fine)
- Alternatives you considered and why rejected
- Your recommended approach with rationale
- Confidence level (High/Medium/Low)

IMPORTANT - USE YOUR JUDGMENT:
- If you find something important that wasn't explicitly asked for, INCLUDE IT
- If you see related issues or concerns, MENTION THEM
- If you discover options/alternatives, PRESENT THEM ALL with trade-offs
- Your insights matter - don't limit yourself to only what was asked

DO NOT:
- [Things to avoid]
- Filter out findings just because they weren't specifically requested
```

### Key Principle: Agent Autonomy

Agents are experts. Don't micromanage their reports. Tell them:
- **What you need** (the task)
- **What you'll do with it** (so they know what's relevant)
- **That their judgment matters** (include what THEY think is important)

Bad: "Only tell me if X is the problem"
Good: "Investigate why X happens, and flag anything else you notice"

## Anti-Patterns

| Don't | Do Instead |
|-------|------------|
| Read files yourself | Delegate to agent |
| Discard agent reports, keep only summaries | **Store enough detail to answer user questions** |
| Vague instructions that produce thin reports | Specific, scoped tasks with rich report requirements |
| Run dependent tasks in parallel | Sequential with findings |
| Commit before user tests | Always wait for user confirmation |
| Use `general-purpose` for implementation | Use `senior-dev-implementer` (loads project context) |
| Delegate without architecture context | Include key constraints in prompt |
| Say "I don't know" to user follow-ups | Have enough context from agents to explain |
| **Trust agent claims without code proof** | **Reject reports that lack actual code snippets** |
| **Re-read files agent already read** | **Demand proper report with code in delegation** |
| **Accept "Line X has bug" without seeing code** | **Require exact code showing the bug** |

## Critical: Use ONLY Custom Agents

**The Rule**: ONLY use agents defined in `.claude/agents/`. NEVER use built-in agents like `general-purpose`.

**Why**: Our custom agents have this instruction at the top:
```
**FIRST**: Read `.claude/commands/start.md` and follow its instructions to load project context...
```

Built-in agents like `general-purpose` do NOT load project context. They work blind.

**Available Custom Agents** (in `.claude/agents/`):
- `investigator` - Bug hunting, research (loads context)
- `senior-dev-implementer` - Production code (loads context)
- `senior-dev-consultant` - Architecture advice (loads context)
- `codebase-analyzer` - Structure analysis (loads context)
- `docs-explorer` - Documentation research (loads context)
- `strategic-planner` - Implementation planning (loads context)
- `task-completion-validator` - Verify completeness (loads context)
- `test-generator` - Create tests (loads context)
- `docs-maintainer` - Update documentation (loads context)

**NEVER use**:
- `general-purpose` - Built-in, NO context loading
- Any agent not in `.claude/agents/`

### What to Include When Delegating

For implementation tasks, ALWAYS include:

```markdown
## Project Context (REQUIRED)
<!-- Pull key architectural constraints from ARCHITECTURE_GUIDE.md -->
- [Server architecture, e.g., "Single Express server on port 3000"]
- [API structure, e.g., "REST API at /api/*"]
- [Database, e.g., "PostgreSQL with Prisma ORM"]
- [Key constraint that agents often get wrong]

## Spec Reference (if applicable)
- Link to spec file: .claude/specs/<name>.md
- Phase being implemented: <phase>

## Patterns to Follow
- Check existing similar code in: <path>
- Follow conventions from: <file>
```

### Agent Selection Decision Tree

```
Is this implementation work?
├── YES → Use `senior-dev-implementer` (ALWAYS)
└── NO → Is it investigation/research?
    ├── YES → Use `investigator` or `codebase-analyzer`
    └── NO → Match to specific agent from .claude/agents/
```

**Remember**: Never use `general-purpose` - it's shown in the WRONG example below.

### Example: Wrong vs Right Delegation

**WRONG** (no context = agent guesses wrong):
```
Task: Create an API endpoint to fetch user data
Agent: general-purpose
```
No context given. Agent might assume wrong architecture, wrong patterns.

**RIGHT** (context prevents mistakes):
```
Task: Add user data API endpoint

## Project Context
- [Your architecture from ARCHITECTURE_GUIDE.md]
- [Key constraints agents need to know]
- [Patterns to follow]

## Task
Add GET /api/users/:id endpoint following existing patterns in user.routes.ts.

Agent: senior-dev-implementer
```
