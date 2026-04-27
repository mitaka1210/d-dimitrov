# Delegate Command - Comprehensive Guide

> **Context Loading**: This file is REFERENCED by the `/delegate` command. Main Claude loads it when running delegate workflows.

## Purpose

Delegate complex tasks to specialized agents for investigation and implementation while keeping the main Claude instance's context minimal and focused on management and decision-making.

## Command Syntax

- `/delegate <task>` - Brief task description (e.g., "fix login flow", "investigate CSS errors")

---

## Core Principles

When user invokes `/delegate`, you MUST:

1. ✅ **Delegate ALL investigation** to specialized agents
2. ✅ **Receive rich reports** - agents return detailed findings with reasoning
3. ✅ **Act as manager** - review reports, make decisions, delegate implementation
4. ✅ **Share fully with user** - don't filter out details, show the complete picture
5. ✅ **Run agents in parallel** when tasks are independent
6. ❌ **NEVER commit changes** until user explicitly tests first
7. ✅ **Let agents use judgment** - they can report what THEY think is important

---

## User Transparency (CRITICAL)

**You are a transparent intermediary, not a filter.**

### The Problem
When you receive a detailed report from an agent and summarize it too aggressively, the user:
- Doesn't see the alternatives that were considered
- Can't understand the reasoning behind recommendations
- Has to dig into hidden fields to find what the agent actually said
- Loses trust because they feel information is being hidden

### The Solution
**Share the full picture with the user.** Your job is to:
- Present ALL options the agent discovered (not just the recommended one)
- Explain the trade-offs and reasoning
- Show the key evidence and file locations
- Let the user make informed decisions

### Examples

❌ **Too Filtered:**
> "The investigator recommends approach B. I'll implement that."

✅ **Transparent:**
> "The investigator found three approaches:
>
> **Approach A** (Quick fix): Change X at file:line
> - Pro: Fast, minimal changes
> - Con: Doesn't address root cause, may recur
>
> **Approach B** (Proper fix): Refactor Y at file:line
> - Pro: Addresses root cause, cleaner code
> - Con: More files to change, needs more testing
>
> **Approach C** (Comprehensive): Redesign Z
> - Pro: Best long-term solution
> - Con: Significant effort, scope creep risk
>
> The investigator recommends **B** because [reasoning]. I agree - it balances effort vs quality. Should I proceed with B, or do you prefer a different approach?"

### When in Doubt, Share More

If you're unsure whether to include something, include it. Users can skim past extra detail, but they can't see information you've hidden.

---

## Mini-Delegation Strategy (Recommended for Large Tasks)

For better control over complex tasks, use **sequential mini-delegations** instead of one large delegation:

### Why Mini-Delegate?

- **Better control**: Review each piece before proceeding
- **Avoid wasted work**: Course-correct early if something is wrong
- **Cleaner context**: Each agent focuses on a smaller scope
- **Informed decisions**: Use findings from one delegation to inform the next

### When to Mini-Delegate vs Full Delegate

**Mini-delegate (sequential) when:**
- Task has multiple distinct parts (backend → frontend → tests)
- Later work depends on earlier findings
- You want to review/approve between steps
- Risk of going in wrong direction is high

**Full delegate (parallel) when:**
- Tasks are truly independent
- No dependencies between the work
- Speed is priority over control
- Simple, low-risk changes

### Mini-Delegation Pattern

```
User: /delegate build user notification system

Claude thinks: This is large. I'll break it down:
1. First: Investigate current patterns and plan approach
2. Then: Implement backend API/service
3. Then: Implement frontend components
4. Finally: Add tests

Claude: "This is a larger task. I'll mini-delegate for better control:

Step 1: Let me first investigate your current notification patterns..."
[Launches investigator agent]

[Agent returns findings]

Claude: "Found: You use EventEmitter pattern. I'll now delegate the backend service..."
[Launches implementer for backend only]

[Agent completes backend]

Claude: "Backend complete. Now delegating frontend components..."
[Launches implementer for frontend]

...and so on
```

### Example: Full-Stack Feature

**User:** `/delegate add password reset flow`

**Mini-delegation sequence:**

1. **Investigation** (first)
   - Delegate: "Analyze current auth patterns, email service, and user model"
   - Wait for report
   - Review findings with user if needed

2. **Backend API** (after investigation)
   - Delegate: "Create password reset endpoints based on [findings]"
   - Wait for completion
   - User can test API before frontend work

3. **Frontend UI** (after backend works)
   - Delegate: "Create reset password form and flow"
   - Wait for completion
   - User tests full flow

4. **Tests** (after implementation)
   - Delegate: "Add tests for password reset flow"
   - Complete

### Parallel vs Sequential Decision

```
Independent tasks → Run in PARALLEL (single message, multiple agents)
Example: "Investigate auth" + "Investigate database" - no dependency

Dependent tasks → Run SEQUENTIALLY (wait for report, then next)
Example: "Investigate patterns" → "Implement based on findings" - depends on first
```

### Key Rule

**If the next delegation would change based on what an agent finds, run them sequentially.**

If the tasks are truly independent and one agent's findings won't influence what you ask the next agent to do, run them in parallel for speed.

---

## Workflow Pattern

### Step 1: Parse Task
- Extract the core task from arguments
- Identify what needs investigation vs implementation
- Determine which specialized agents to use

### Step 2: Create Agent Tasks
Create 1-3 specialized agent tasks (ONLY from `.claude/agents/`):
- `investigator` - Debug issues, find root causes, analyze code
- `docs-explorer` - Research documentation without loading into context
- `codebase-analyzer` - Understand project structure and patterns
- `senior-dev-consultant` - Expert second opinions on complex decisions
- `senior-dev-implementer` - Implement fixes, create files, modify code

**NEVER use `general-purpose`** - it's a built-in agent that doesn't load project context.

### Step 3: Run Agents
- Launch agents with clear, specific instructions
- Request concise reports with PRECISE details (see Report Standards below)
- Run independent agents in parallel (single message, multiple Task calls)
- Demand file paths, line numbers, code snippets in all reports

### Step 4: Receive & Store Rich Context
- Get reports from all agents (verify they follow Report Standards)
- **Store the full detailed reports** in your context - you NEED this for user AND for yourself
- Key details to retain:
  - Root causes with reasoning chains
  - All file:line references
  - Code snippets that explain the issue/change
  - Alternatives considered and why rejected
  - Design decisions and rationale
  - Edge cases and caveats
  - **ALL options the agent discovered** (not just the recommended one)
- **Test:** Could you answer "why?" or "how?" about any finding?
- **Prepare to share richly with user** - see Step 5 for what transparency looks like

### Step 5: Share Findings & Get Confirmation (MANDATORY)

**ALWAYS share investigation results with user BEFORE implementing.**

**CRITICAL: Share the FULL picture, not just your conclusion.**

❌ **BAD (too filtered):**
> "The investigator recommends Option B, so we'll go with that."

✅ **GOOD (transparent):**
> "The investigator found 3 possible approaches:
> - **Option A**: [what it is] - Pros: X, Cons: Y
> - **Option B**: [what it is] - Pros: X, Cons: Y
> - **Option C**: [what it is] - Pros: X, Cons: Y
>
> The investigator recommends **Option B** because [reasoning].
>
> I agree with this recommendation because [your reasoning], but Option A could also work if [condition]. What do you think?"

#### What to Share With User

1. **The full investigation results:**
   - Root cause with explanation (not just "found the bug")
   - HOW the agent found it (the reasoning chain)
   - File paths and relevant code snippets
   - What alternatives were checked and ruled out

2. **ALL options discovered (not just the recommended one):**
   - Each option with pros/cons
   - Trade-offs between them
   - Why the agent recommends what they recommend
   - Your own assessment (agree/disagree with agent?)

3. **Context the user needs:**
   - Edge cases or caveats
   - Potential risks or concerns
   - Things that might need follow-up
   - Anything the agent flagged as important

4. **Clear ask for confirmation:**
   - "Should I proceed with Option B?"
   - "Which approach do you prefer?"
   - "Any concerns before I implement?"

#### Why Full Transparency Matters

- **User is the decision maker** - they need the full picture to decide
- **User may have context** - past attempts, business constraints, preferences
- **Builds trust** - user sees you're not hiding complexity
- **Prevents re-work** - user can course-correct before implementation
- **User learns** - understanding the reasoning helps them grow

#### Wait for Confirmation

- Do NOT implement until user explicitly approves
- If user asks questions, answer them fully (you have the agent report!)
- If user suggests a different approach, discuss trade-offs
- If user wants more info, you should be able to provide it without re-investigating

### Step 6: Implement (Only After Approval)
- Delegate implementation to agents if complex
- Make changes based on agent reports
- Test locally if possible

### Step 7: Report Completion (Be Thorough)

Share the full implementation details with user:

1. **What was implemented:**
   - Summary of the changes
   - Key decisions made during implementation
   - Any deviations from the original plan (and why)

2. **Technical details:**
   - Files created/modified with line ranges
   - Key code changes (show snippets for complex logic)
   - How it integrates with existing code

3. **What to test:**
   - Specific scenarios to verify
   - Edge cases that were handled
   - Any areas of uncertainty

4. **Potential concerns:**
   - Things to watch out for
   - Known limitations
   - Future improvements that might be needed

**DO NOT commit** - inform user testing is required first

### Step 8: User Tests
- Wait for user to test in browser/terminal
- User reports "it works" or describes issues
- Only after user confirms → offer to commit

---

## Agent Selection Guide

| Agent | Best For | Use When |
|-------|----------|----------|
| `investigator` | Bug hunting, root cause analysis | "Why is X broken?", "Find the bug in Y" |
| `codebase-analyzer` | Structure, patterns, architecture | "Where should this go?", "Find existing patterns" |
| `docs-explorer` | Documentation, API research | "How does X library work?", "Config options?" |
| `senior-dev-consultant` | Complex decisions, architecture | "Review this approach", "Security concerns?" |
| `senior-dev-implementer` | Implementation, production-quality code | "Create X", "Fix Y", "Update Z", complex features |
| `test-generator` | Test creation | "Generate tests for X" |
| `task-completion-validator` | Verify completeness | Before marking tasks done |

**Note**: All agents above are from `.claude/agents/` and load project context. Never use `general-purpose`.

### Common Agent Combinations

**New Feature:**
1. `codebase-analyzer` → understand patterns
2. `senior-dev-implementer` → implement
3. `test-generator` → create tests
4. `task-completion-validator` → verify done

**Bug Fix:**
1. `investigator` → find root cause
2. `senior-dev-implementer` → fix
3. `test-generator` → regression test

**Refactoring:**
1. `codebase-analyzer` → map dependencies
2. `senior-dev-consultant` → plan approach
3. `senior-dev-implementer` → execute
4. `task-completion-validator` → verify nothing broken

---

## Example Workflows

### Example 1: Fix Login Persistence

**User:** `/delegate fix login persistence`

**Claude Response:**
1. Creates investigator task: "Why doesn't login persist after magic link?"
2. Gets report: "AuthContext only checks localStorage on mount, race condition"
3. Summarizes to user: "Found race condition - redirect happens before token stored"
4. Creates senior-dev-implementer task: "Remove 2-second delay from verify page"
5. Reports completion: "Fixed - redirect now immediate, removed setTimeout"
6. Waits: "Ready to test - please verify login persists after clicking magic link"

### Example 2: Port Content

**User:** `/delegate port Bulgarian education content`

**Claude Response:**
1. Creates docs-explorer task: "Extract Bulgarian content from btc_reference"
2. Creates codebase-analyzer task: "Find current education content structure"
3. Gets reports with structure comparisons
4. Summarizes: "Reference has 3 complete files, need to transform HTML → JSX"
5. Creates senior-dev-implementer task: "Transform 3 Bulgarian files"
6. Reports: "Created bg/fiat-experiment.js, bg/why-bitcoin.js, bg/why-not-gold.js"
7. Waits: "Test at /bg/education/fiat-experiment - should show Bulgarian content"

### Example 3: Investigate Errors

**User:** `/delegate investigate API 404 errors`

**Claude Response:**
1. Creates investigator task: "Find missing API routes causing 404s"
2. Gets report: "/api/assets/prices and /api/portfolio don't exist - Phase 7 not implemented"
3. Summarizes: "These are expected - Phase 7 (Portfolios) not built yet"
4. No fix needed: "These 404s are normal for current phase"

---

## Report Standards (CRITICAL)

### The Golden Rule

**You must be able to answer user follow-up questions without re-investigating.**

If the user asks "why did you conclude X?" or "what about Y?" or "how does that work?", you should have enough detail from agent reports to explain. Never be in the position of saying "I don't know, let me investigate again."

**Every Agent Report MUST Include:**

### 1. Precise File Locations
- FULL file paths: `src/components/Example.jsx`
- Exact line numbers: `Line 42` or `Lines 38-45`
- Multiple locations if relevant

### 2. Rich Code Context
- Code snippets with enough context (10-20 lines is fine)
- BEFORE/AFTER comparisons for changes
- Surrounding context that helps understand the change

### 3. Root Cause Analysis WITH Reasoning
- Why the issue exists (not just what)
- **How the agent reached this conclusion** (the reasoning chain)
- What alternatives were considered and ruled out
- Confidence level (high/medium/low) with justification

### 4. Implementation Details
- Specific functions/variables affected
- Dependencies and relationships
- Side effects or considerations
- Design decisions made and WHY

### 5. Actionable Fixes
- Exact changes needed (not vague suggestions)
- Line-by-line modifications when implementing
- Files created/deleted/modified list
- **Rationale for the approach chosen**

### 6. Context for Follow-up Questions
- Edge cases and how they're handled
- What was checked but ruled out
- Potential concerns or caveats
- Things the user should know about

### WHY Rich Reports Matter

✅ **For you (main Claude):** Can discuss intelligently with user
✅ **For user questions:** Can answer "why?" and "how?" without new investigation
✅ **For next agent:** Can implement immediately without re-investigation
✅ **For trust:** User sees you understand the codebase deeply

### Report Format Template

```markdown
## Investigation Results

**Root Cause:**
[Clear explanation of the problem]

**How I Found This:**
- Started at: [where investigation began]
- Key discovery: [what led to the conclusion]
- Ruled out: [alternatives that were checked]

**Evidence:**
- File: `src/path/to/file.js:42-58`
- Code: [code snippet with context - 10-15 lines is fine]
- Observation: [what this shows and why it matters]

**Why This Happens:**
[2-3 sentences explaining the mechanism - so you can explain to user]

**Fix Required:**
- File: `src/path/to/file.js:42`
- Change: [exact change]
- Reason: [why this fix addresses the root cause]

**Design Decisions:**
- [Choice made]: [Why this approach over alternatives]

**Edge Cases:**
- [Edge case]: [How it's handled]

**Side Effects / Concerns:**
[Things to be aware of]

**Confidence:** [High/Medium/Low] - [justification]
```

### What to Store vs Summarize

**Store in your context (need this for user questions):**
- Root causes and reasoning chains
- File locations and line numbers
- Key code snippets
- Design decisions and rationale
- Edge cases and caveats

**Summarize for user (brief version):**
- What the problem/solution is
- What will change
- Next steps

---

## Quality Standards

### Agent Instructions Must:
- Be specific and actionable
- Define exact scope
- Request specific return format (enforce Report Standards)
- Include context about the project
- Specify what NOT to do
- Demand file paths and line numbers in response

### Agent Reports Should:
- Follow Report Standards above (file paths, line numbers, code snippets)
- Be concise but complete (all essential info, no fluff)
- Enable implementation without re-investigation
- Allow main Claude to answer user questions without new agents
- State root cause and "why" clearly

### Your Context Should:
- **Hold enough detail to answer user follow-up questions**
- Include: root causes, reasoning, file locations, key code snippets
- Include: alternatives ruled out, design decisions, edge cases
- Track what's been investigated and why
- Store user's latest feedback
- Keep implementation plan clear

---

## Agent Reports: Trust but Verify

**Treat agent reports as "agent said X", not "reality is X".**

Agents can be wrong due to:
- **Lack of context** - They don't see the full picture you have
- **Hallucinations** - They may confidently state incorrect things
- **Misunderstandings** - They may misinterpret instructions or code
- **Partial information** - They may miss edge cases or related issues

**Example**: Agent says "All 24 tests pass" - this is what the agent *claims*, not necessarily reality.

### When to Be Extra Skeptical

- When something seems too easy/quick for the complexity involved
- When agent claims success but you haven't seen evidence
- When the fix seems unrelated to the problem
- When agent's explanation doesn't quite make sense
- When agent's confidence seems higher than warranted

### Practical Verification

**Don't**: Verify everything (defeats the purpose of delegation)

**Do**: Spot-check critical changes:
- Run tests yourself for important fixes
- Glance at a changed file to confirm it looks right
- Ask clarifying questions if something seems off

A quick verification costs little context but catches agent mistakes before they compound into bigger issues.

---

## Anti-Patterns to Avoid

❌ Reading files yourself instead of using agents
❌ Implementing without investigation first
❌ Committing before user tests
❌ Vague agent instructions that produce thin reports
❌ Not running parallel agents when possible
❌ **Discarding agent reports and keeping only summaries** (you need the detail!)
❌ Saying "I don't know" when user asks follow-up about your investigation
❌ **Treating agent claims as fact** - "agent said X" ≠ "reality is X"

---

## Success Criteria

✅ **You can answer user follow-up questions** without re-investigating
✅ Agent reports include reasoning, alternatives, and rationale
✅ Fixes are based on investigation findings with clear justification
✅ User tests before any commits
✅ Tasks complete efficiently with minimal back-and-forth
✅ User sees you as knowledgeable about their codebase

---

This command maximizes efficiency by preserving context space for high-level management while agents handle detailed investigation and implementation work.
