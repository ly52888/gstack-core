# gstack-core

Codex-first intelligent workflow router.

gstack-core is a lightweight skill framework for routing plain-language work into the right Codex skills, plugins, MCP tools, CLI commands, and recovery workflows. It focuses on reducing wasted context, preventing off-track execution, asking for missing conditions before generation, and closing tasks with verification.

> Independent open-source project. gstack-core is not affiliated with, endorsed by, or sponsored by OpenAI.

## What It Does

- Routes development, debugging, documentation, creative, GitHub, browser, and recovery tasks from one gstack entry point.
- Uses progressive disclosure: load only the relevant reference or capability card.
- Asks clarifying questions when required inputs are missing.
- Prefers local codegraph and focused inspection before broad file reads.
- Records route decisions and verification evidence for later debugging.
- Includes a doctor script and eval prompts for open-source validation.

## Project Layout

```text
gstack-core/
├── skills/gstack/              # Installable Codex skill
│   ├── SKILL.md
│   ├── agents/openai.yaml
│   ├── capabilities/
│   ├── references/
│   └── scripts/
│       └── codex-codegraph/    # Optional local code graph helper
├── capabilities/               # Root copy for project-level validation and docs
├── evals/                      # Routing and behavior eval prompts
└── docs/                       # Open-source design notes
```

## Install

Copy or symlink `skills/gstack` into your Codex skills directory:

```bash
mkdir -p "$HOME/.codex/skills"
ln -s "$(pwd)/skills/gstack" "$HOME/.codex/skills/gstack"
```

Restart Codex after installing or updating a skill.

Or use the local installer:

```bash
scripts/install-local.sh --dry-run
scripts/install-local.sh --install
```

If `gstack` already exists, use `--replace`; the installer creates a timestamped backup first.

## Validate

```bash
npm test
skills/gstack/scripts/gstack-doctor.sh
```

Preview a route decision locally:

```bash
node scripts/route-preview.mjs "用 gstack 生成一张 Telegram 广告图"
```

## Capability Cards

Capability cards live in `skills/gstack/capabilities/*.json` for installed skill use, with a root copy in `capabilities/*.json` for project-level validation and docs. They describe when to use a skill, plugin, MCP server, CLI, local script, or fallback route. See `docs/capability-card-spec.md`.

## Core Behavior

- `Route Preview`: explain the selected intent, mode, tools, missing inputs, and verification target before complex work.
- `Clarification Gate`: ask before executing when required inputs are missing.
- `Capability Cards`: keep plugin/skill/tool routing data outside the always-loaded skill body.
- `Doctor`: check local readiness and optional tool availability.
- `Route Trace`: record why a route was chosen and how it was verified.
- `Codegraph Lite`: optional bundled local symbol/index helper for orientation and impact checks.

## Commercial Direction

gstack-core is intended to stay useful as an open-source core while leaving room for commercial packs, team setup, private registries, and enterprise governance. The open-source project should prove the routing model; paid layers can add packaged workflows, organization policy, route analytics, and private capability distribution.

See:

- `docs/commercial-roadmap.md`
- `docs/product-positioning.md`
- `docs/enterprise-governance.md`
- `docs/marketing-copy.md`
- `docs/brand-guidelines.md`

## Open Source Prep

Before publishing:

```bash
npm test
node scripts/route-preview.mjs "Use gstack. Fix the failing GitHub CI for this PR."
node scripts/route-preview.mjs "Use gstack. Context is almost full. Prepare a handoff."
```

## Status

Early v1 scaffold. The core behavior is documented and ready for iterative testing against real Codex tasks.
