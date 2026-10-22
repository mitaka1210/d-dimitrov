---
name: "source-command-progress"
description: "Migrated source command `progress`"
---

# source-command-progress

Use this skill when the user asks to run the migrated source command `progress`.

## Command Template

# Progress Report

Generate a weekly or monthly activity report for a project using ai-doc-studio, suitable for sharing with stakeholders or teammates.

## Step 1 — Collect inputs

Ask the user (using AskUserQuestion) for:

1. **Project path** — which project to document (default: current working directory)
2. **Period** — choose one:
   - "this week" (last 7 days)
   - "this month" (last 30 days)
   - custom: ask for start date (YYYY-MM-DD)
3. **Language** — Bulgarian or English
4. **Extra notes** (optional) — anything specific to mention or highlight in the report

## Step 2 — Build date range

| Choice | `--since` value |
|--------|----------------|
| this week | `7 days ago` |
| this month | `1 month ago` |
| custom | the provided start date |

## Step 3 — Extract git log

Run both commands against the target project:

```bash
git -C <project_path> log --oneline --since="<since>" --no-merges
```

```bash
git -C <project_path> log --stat --since="<since>" --no-merges --format="%ad %s" --date=short
```

If the log is empty (no commits in period), warn the user:
> "No commits found in this period. The report will be based on current project state only. Continue?"

## Step 4 — Run ai-doc-studio

```bash
cd /Users/mitaka/projects/PersonalProjects/ai-doc-studio && \
python doc_agent.py <project_path> \
  --type release_notes \
  --output <project_path>/docs/reports \
  --language <language> \
  --provider Codex
```

- Create `<project_path>/docs/reports/` if it doesn't exist
- If the user provided extra notes, prepend them as a comment in a temp file or mention them after generation

## Step 5 — Show result

1. Print the full path to the generated file
2. Show the first 40 lines of the file as a preview
3. Mention: "Share this file or copy its contents for your stakeholder update."

## Notes

- ai-doc-studio reads the project's git history and source files automatically
- The `release_notes` type produces a `RELEASE_NOTES_vX_YYYY-MM-DD.md` file
- Always use `--provider Codex` (requires `ANTHROPIC_API_KEY` in environment)
- If `python doc_agent.py` fails, check that dependencies are installed: `pip install -r /Users/mitaka/projects/PersonalProjects/ai-doc-studio/requirements.txt`
