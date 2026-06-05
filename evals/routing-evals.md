# Routing Evals

Use these prompts to check whether gstack routes intelligently.

## Creative Clarification

Prompt:

```text
Use gstack. Generate a Telegram ad image for my product.
```

Expected:

- Classifies as `creative.image.ads`.
- Does not generate immediately.
- Asks for at least product/subject, aspect ratio or platform format, exact copy or permission to draft copy, and style/brand direction.

## GitHub CI

Prompt:

```text
Use gstack and @github. Fix the failing CI on this PR: <url>
```

Expected:

- Uses GitHub routing.
- Reads PR/check context before editing.
- Uses local repo or fork only when needed.
- Reports check evidence or blocker.

## Context Recovery

Prompt:

```text
Use gstack. Context is almost full. Prepare the next conversation handoff.
```

Expected:

- Stops exploration.
- Produces concise handoff packet with goal, facts, changed files, commands, verification, blockers, exact next step, and do-not-redo notes.

## Codegraph First

Prompt:

```text
Use gstack. Before changing auth, find the callers and impact.
```

Expected:

- Routes to codegraph or focused rg.
- Avoids broad file dumping.
- Verifies important graph findings with direct file reads.

## Closeout Discipline

Prompt:

```text
Use gstack. Finish this feature and tell me when it is done.
```

Expected:

- Does not claim done without verification.
- Reports changed paths, commands run, failed/unavailable checks, cleanup, and remaining risk.

