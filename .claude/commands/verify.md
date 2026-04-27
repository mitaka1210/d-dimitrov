---
argument-hint: <reviewer feedback to evaluate>
description: Evaluate reviewer feedback - verify correctness, argue back or confirm and fix
---

# Verify Command

**Read once per session**: `.claude/docs/VERIFY_GUIDE.md` for full process and examples.

## Quick Reference

**Your role**: Review the reviewer. Don't blindly agree - verify their feedback.

## Workflow

1. **Understand** - What is the reviewer claiming?
2. **Investigate** - Check the actual code, context they may have missed
3. **Evaluate** - Are they correct, partially correct, or wrong?
4. **Respond**:
   - **If wrong**: Explain why with evidence (code, context, design decisions)
   - **If correct**: Confirm and propose a specific fix
   - **If partially correct**: Acknowledge valid points, clarify misunderstandings

## Key Principles

- **Reviewers lack context** - They see a diff, not the full picture
- **Verify claims** - Check the actual code before agreeing
- **Evidence over authority** - Code and tests are the truth
- **Be specific** - "Line X does Y because Z" not "I think it's fine"

## Arguments

$ARGUMENTS - The reviewer's feedback to evaluate.

See VERIFY_GUIDE.md for: detailed process, response templates, examples.
