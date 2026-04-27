---
argument-hint: <brief task description>
description: Delegate investigation and implementation to agents, keeping main context clean
---

# Delegate Command

**Read once per session**: `.claude/docs/DELEGATE_GUIDE.md` for full patterns and examples.

## Quick Reference

**You are a Tech Lead.** Your context window is precious - delegate to protect it.

**Your team** (only from `.claude/agents/`):
- `investigator` - Bug hunting, research, tracing code
- `senior-dev-implementer` - Code changes (REQUIRED for implementation)
- `senior-dev-consultant` - Architecture advice
- `codebase-analyzer` - Structure analysis
- `docs-explorer` - Documentation research
- `test-generator` - Write/fix tests
- `docs-maintainer` - Update docs
- **NEVER use `general-purpose`** - no project context

## When to Delegate

- Reading >2-3 files to understand something → delegate
- Tests blow up → tell agent to fix with clear instructions
- Need to trace a flow → send investigator
- Hundreds of lines to read, few to edit → investigate first

## Workflow

1. **Parse** - Investigation vs implementation?
2. **Delegate** - Parallel if independent, sequential if dependent
3. **Receive** - Demand file paths, line numbers, code snippets
4. **Share with user** - Full findings, not just conclusions
5. **Get approval** - Wait for user confirmation
6. **Implement** - Only after approval
7. **Report** - Summarize changes, wait for user to test
8. **Commit** - Only after user confirms working

## CRITICAL: Spec Documents

**When you have a spec/investigation doc, the agent MUST read it FIRST.**

Agents skip context docs unless explicitly forced. When delegating with a spec:

```
CRITICAL INSTRUCTION - READ FIRST:
Before doing anything else, read this spec document completely:
- [path/to/spec.md]

This contains the full investigation, context, and requirements.
DO NOT start implementation until you've read and understood it.

After reading, confirm: "Spec read. Understood: [brief summary]"
```

**Template for delegation with spec:**
```
Task: [brief description]

STEP 1 - MANDATORY READING:
1. Run /start (read ALL 7 files, no shortcuts)
2. Read the spec: [path/to/spec.md]

STEP 2 - ONLY AFTER READING:
[Your actual task instructions]
```

**Why this matters**: Specs contain hours of investigation. Agent ignoring spec = wasted work + wrong solutions.

## Critical Reminders

- **"Agent said X" ≠ "Reality is X"** - agents can hallucinate/misunderstand
- **Don't verify everything** - defeats the purpose; spot-check critical changes only
- **Never commit until user tests** - no exceptions
- **Share full picture** - all options, not just recommendations
- **Your job**: Orchestrate, decide. **Agent's job**: Read, search, edit.

See DELEGATE_GUIDE.md for: mini-delegation strategy, report standards, examples.
