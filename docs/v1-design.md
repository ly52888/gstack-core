# gstack-core v1 Design

## Goal

Build a general Codex-first skill router that turns plain-language requests into the right workflow without wasting context or producing under-specified outputs.

## Non-Goals

- Full SaaS platform
- Mandatory database memory
- Automatic installation of every plugin
- Project-specific defaults baked into the open-source core
- Replacing Codex reasoning with a rigid rules engine

## Architecture

- `SKILL.md`: small entry point and routing index.
- `references/`: conditional workflow details.
- `capabilities/`: community-extensible capability cards.
- `scripts/gstack-doctor.sh`: local readiness check.
- `evals/`: behavior prompts for route quality.

## Release Criteria

- Installable skill folder.
- Doctor script passes structural checks.
- At least five routing evals.
- No private project names in core routing.
- Clear fallback behavior for unavailable tools.
- Route trace template exists.
- Capability card validation exists.
