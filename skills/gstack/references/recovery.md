# Recovery

Use this reference when context, quota, network, tool availability, or long-running work threatens completion.

## Context Pressure

When context is high:

1. Stop broad exploration.
2. Summarize current goal, facts, edits, commands, blockers, and next step.
3. Write or return a concise handoff packet.
4. Continue only with focused actions.

## Interruption Recovery

On resume:

- Re-read the newest user request.
- Check route trace or handoff first.
- Inspect current files before assuming prior state.
- Continue from the latest verified fact, not from memory alone.

## Quota or Network Failure

If a remote/API/plugin call fails:

- Retry once when transient.
- Switch to local fallback when quality remains acceptable.
- Ask the user when the fallback changes the expected deliverable.
- Record the blocked external dependency.

## Handoff Packet

```text
Goal:
Current facts:
Changed files:
Commands run:
Verification:
Blockers:
Exact next step:
Do not redo:
```

