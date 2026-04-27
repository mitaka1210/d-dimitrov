# Verify Guide

> **Purpose**: Evaluate reviewer feedback critically. Verify before agreeing, argue back with evidence when wrong.

## Why This Matters

Reviewers provide valuable feedback, but they:
- See a diff, not the full context
- May not know design decisions or constraints
- Can misunderstand intent or miss related code
- Sometimes apply rules that don't fit the situation

Your job: **Review the reviewer** before implementing their suggestions.

## When to Use `/verify`

- Received PR feedback you're unsure about
- Reviewer suggests a change that seems wrong
- Need to validate if feedback applies to your situation
- Want to formulate a response to reviewer comments

## Evaluation Process

### Step 1: Understand the Claim

Parse what the reviewer is actually saying:
- What specific change are they requesting?
- What problem do they think exists?
- What's their reasoning?

### Step 2: Investigate

Before agreeing or disagreeing:
- Read the actual code they're commenting on
- Check surrounding context they may have missed
- Look for related code that explains the decision
- Review any specs or design docs

### Step 3: Classify the Feedback

| Classification | Meaning | Action |
|----------------|---------|--------|
| **Correct** | Reviewer found a real issue | Confirm and propose fix |
| **Partially Correct** | Valid point but incomplete understanding | Acknowledge + clarify |
| **Wrong - Missing Context** | Would be right, but they missed something | Explain the context |
| **Wrong - Incorrect** | Their suggestion would break something | Explain with evidence |
| **Preference** | Style/approach difference, both valid | Discuss or defer |

### Step 4: Respond

**If Reviewer is Correct**:
```
You're right. [Brief acknowledgment of the issue]

Proposed fix:
- [Specific change with file:line reference]
- [Why this fixes it]
```

**If Reviewer is Wrong (Missing Context)**:
```
Good catch, but this is intentional because [reason].

Context you may have missed:
- [File X:line Y shows Z]
- [Design decision: reason]
- [This prevents: problem]
```

**If Reviewer is Wrong (Would Break Things)**:
```
This would actually cause [problem] because:
- [Evidence from code]
- [What would break]

The current approach handles [edge case] by [mechanism].
```

**If Partially Correct**:
```
You're right about [valid point].

However, [clarification about the part they misunderstood].

I'll fix [the valid issue] by [specific change].
```

## Response Quality Checklist

- [ ] Referenced specific files and line numbers
- [ ] Provided evidence, not just opinions
- [ ] Acknowledged valid points before disagreeing
- [ ] Proposed concrete fix if accepting feedback
- [ ] Explained reasoning, not just conclusions

## Examples

### Example 1: Reviewer Missing Context

**Reviewer says**: "This function is too long, should be split up"

**Investigation**: Function is 45 lines, under the 50-line limit. It's a single cohesive operation.

**Response**:
```
This function is 45 lines, within our 50-line limit (CODE_PRINCIPLES.md).
It handles a single cohesive operation - splitting would fragment the logic
without improving readability. The steps are sequential and tightly coupled.
```

### Example 2: Reviewer is Correct

**Reviewer says**: "This doesn't handle the null case"

**Investigation**: Check the code - they're right, null would cause an error.

**Response**:
```
You're right, null isn't handled here.

Fix: Add early return guard at line 42:
if (!data) return null;

This matches the pattern used in similar-service.ts:78.
```

### Example 3: Reviewer Would Break Things

**Reviewer says**: "Remove this setTimeout, it's a code smell"

**Investigation**: The setTimeout is intentional for debouncing user input.

**Response**:
```
This setTimeout is intentional - it debounces rapid user input to prevent
excessive API calls. Removing it would cause:
- Multiple concurrent requests on each keystroke
- Race conditions in state updates
- Unnecessary server load

See the related discussion in the original PR #123.
```

## Anti-Patterns

| Don't | Do Instead |
|-------|------------|
| "I think it's fine" | "Line X handles this because Y" |
| Agree without checking | Verify the claim in actual code |
| Dismiss without explanation | Explain why with evidence |
| Get defensive | Stay factual and objective |
| Ignore valid points | Acknowledge what's correct |

## Integration with Workflow

After using `/verify`:

1. **If fix needed**: Implement the fix
2. **If pushback needed**: Share your response with the reviewer
3. **If discussion needed**: Escalate with specific questions
4. **Document**: If this reveals a pattern, update relevant docs
