---
argument-hint: [focus area] (optional: specific feature, bug fix, or aspect to emphasize)
description: Generate reviewer briefing - summarize context, changes, conclusions for handoff
---

# Report Command

Generate a comprehensive briefing document for a reviewer based on the current conversation context.

## Purpose

Create a copy-paste ready summary that gives a reviewer the full picture of:
- What we worked on and why
- What changes were made
- What we concluded and decided
- What we expect/think about the solution
- What specifically needs review/investigation

## Output Format

Generate a report in this structure:

```markdown
# Review Briefing: [Topic/Feature Name]

## Context
[What problem were we solving? What was the goal?]

## Changes Made
[List of files changed and what was done to each - be specific]

## Key Decisions & Rationale
[What approaches did we choose and why? What did we reject and why?]

## What We Concluded
[Summary of our findings, solution, and reasoning]

## Expected Behavior
[How should this work now? What's the expected outcome?]

## Areas of Concern / Uncertainty
[Any parts we're less confident about, edge cases to watch]

## Review Focus
[What specifically should the reviewer look at? What questions do we want answered?]
```

## Arguments

$ARGUMENTS - Optional focus area to emphasize in the report.

## Task

1. Review the conversation context to extract:
   - The problem/feature being addressed
   - Files that were modified or discussed
   - Decisions made and alternatives considered
   - Conclusions reached
   - Any uncertainties or concerns raised

2. Check recent git changes if relevant:
   - `git diff --name-only` for changed files
   - `git log -5 --oneline` for recent commits

3. Generate the report in the format above

4. Present the report in a code block so user can easily copy-paste

## Integration with /verify

After receiving reviewer feedback, use `/verify <feedback>` to:
- Evaluate if reviewer's concerns are valid
- Provide evidence-based responses
- Confirm and fix legitimate issues

The report you generate here gives the reviewer context, and their feedback comes back through `/verify` for evaluation.
