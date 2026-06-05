# Contributing

gstack-core is designed around small, reviewable additions.

## Good Contributions

- New capability cards with clear triggers, required inputs, fallback, and verification.
- Small reference updates that improve routing quality.
- Eval prompts that catch bad routing, missing clarification, or weak closeout.
- Doctor checks that identify real install problems without blocking optional workflows.

## Avoid

- Project-specific defaults in the core skill.
- Huge always-loaded instructions.
- Adding a tool without fallback behavior.
- Routes that generate creative assets without required constraints.
- Claims of completion without verification.

## Capability Card Checklist

- The card passes `npm run validate:capabilities`.
- Required inputs are not too broad.
- `when_not_to_use` is specific.
- Fallbacks are realistic.
- Verification is observable.

## Skill Design

Keep `skills/gstack/SKILL.md` lean. Put detailed behavior in one-level reference files under `skills/gstack/references/`.

