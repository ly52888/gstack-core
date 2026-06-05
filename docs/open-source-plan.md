# Open Source Plan

## Positioning

gstack-core is a Codex-first intelligent workflow router: one skill entry point that selects the right skill, plugin, MCP tool, CLI, or fallback route from plain-language requests.

## Audience

- Codex users who want fewer repeated instructions.
- Teams that need workflow governance and closeout discipline.
- Builders who use multiple skills/plugins and want token-efficient routing.
- Creative operators who need image/video/design tasks to ask for missing conditions before generation.

## Release Scope

v0.1 should include:

- Installable `gstack` skill.
- Router kernel references.
- Clarification gate.
- Creative router.
- Development router.
- Recovery and closeout workflows.
- Capability card spec.
- Doctor and capability validation scripts.
- Routing eval prompts.

## Demo Ideas

- Ask gstack to generate an ad image with missing dimensions; it should ask first.
- Ask gstack to inspect a GitHub PR; it should route to GitHub.
- Ask gstack to prepare a handoff under context pressure.
- Ask gstack to debug a codebase; it should use codegraph or focused search first.
- Ask gstack to finish work; it should verify and report cleanup.

## Future Commercial Layer

- Pro capability packs for development, creative, GitHub/CI, local-prod recovery, and multi-AI planning.
- Team workspace setup: private gstack profiles, capability cards, verification standards, and handoff docs.
- Private registry and policy allowlists.
- Route trace analytics and task-closeout reports.
- Enterprise governance for tool usage, external AI disclosure, verification, and auditability.
- Commercial support and implementation services.

Keep the open-source core strong enough to be trusted. Commercial value should come from packaged expertise, governance, private customization, team rollout, and managed updates, not from crippling the core router.

## Commercial Guardrails

- Do not put private customer defaults into the open-source core.
- Do not require cloud services for the basic skill to work.
- Do not make security, doctor, route trace, or clarification gates paid-only.
- Paid features should reduce team friction, policy risk, and setup time.
- Enterprise controls should make external AI/tool use auditable, not opaque.
