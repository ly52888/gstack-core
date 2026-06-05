# Development Router

Use this reference for coding, debugging, review, testing, refactoring, and release work.

## Default Flow

1. Inspect local context first: docs, file tree, git status when applicable.
2. Use codegraph or focused `rg` before broad reads.
3. Produce a route preview for non-trivial work.
4. Make the smallest coherent change.
5. Run focused verification.
6. Update docs/handoff when the repo already maintains them.
7. Clean temporary artifacts unless they are part of the deliverable.

## Tool Mapping

- Orientation: codegraph, rg, direct file reads
- Bug/root cause: investigate workflow, logs, tests, runtime probes
- Review: review/code-review/security as needed
- Tests: test-generator or repo test commands
- Refactor: refactoring-expert only when structure is the task or necessary
- Frontend UX: design-review/gpt-taste/browser
- GitHub PR/CI: GitHub plugin, gh-fix-ci, gh-address-comments
- Docs: document-release/docs steward

## Guardrails

Before risky edits, identify:

- Files in scope
- Files explicitly out of scope
- Runtime or production state
- Rollback path
- Verification command

Never claim completion without evidence.

## Bundled Codegraph

When installed, gstack may include a lightweight codegraph helper:

```bash
node <gstack-skill-root>/scripts/codex-codegraph/bin/codex-codegraph.js init
node <gstack-skill-root>/scripts/codex-codegraph/bin/codex-codegraph.js index
node <gstack-skill-root>/scripts/codex-codegraph/bin/codex-codegraph.js status
```

Use it for symbol search, callers/callees, impact analysis, and affected-file test scoping. Verify important graph findings with direct file reads before risky edits.
