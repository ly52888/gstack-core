# Router Kernel

Use this reference when choosing skills, plugins, MCP tools, CLI commands, local scripts, or subthreads.

## Inputs

- User intent and explicit overrides
- Current workspace state
- Mentioned URLs, files, plugins, skills, or tools
- Required freshness: current web/GitHub/library data
- Risk: production, auth, money, data loss, security, legal, medical, financial
- Scope: file count, domains, services, UI/browser needs
- Context pressure and token budget
- Available tool health

## Routing Priority

1. Explicit user request
2. Safety and permission constraints
3. Required freshness or account state
4. Domain fit
5. Lowest sufficient cost
6. Verification quality
7. Fallback availability

## Scoring

Choose a mode from these signals:

- `scope`: number of files, services, pages, assets
- `depth`: simple edit, root cause, architecture, redesign
- `risk`: low, medium, high, critical
- `interactivity`: browser, account login, visual inspection
- `currentness`: needs latest docs, GitHub, prices, release info
- `parallelism`: independent subtasks
- `context_pressure`: normal, high, critical
- `confidence`: clear, partial, ambiguous

Mode selection:

- `native`: clear, low-risk, single surface
- `single-tool`: one specialized tool or skill adds clear value
- `combo`: multiple domains or verification surfaces
- `subthread`: large independent work, high token pressure, or parallel research

Escalate from native to combo when confidence is low, risk is high, three or more domains are involved, production/auth/payment/security/database is touched, a tool fails twice, or context is close to exhaustion.

## Candidate Tool Families

- Code orientation: codegraph, rg, direct file reads
- Natural command intake: natural-command-router, page-bug-intake, clarification-gate
- GitHub: GitHub plugin, gh CLI, local git
- Docs/latest libraries: official docs, Context7, web
- Pre-build planning: multi-ai-council, office-hours, plan-ceo-review, plan-eng-review, plan-design-review
- Browser/QA: Chrome/browser plugin, Playwright/CLI, screenshots
- Creative image: imagegen, Canva, Picsart, Shutterstock
- Video/animation: HyperFrames, Remotion, HeyGen
- Documents/slides/sheets: Documents, Presentations, Spreadsheets, Canva
- Security: guard, careful, freeze, security review
- Recovery: handoff, checkpoint, doctor, route trace

## Fallback Policy

If a preferred plugin/tool is unavailable:

1. Try an equivalent CLI or official API when available.
2. Use local inspection and document the limitation.
3. Ask the user only if the missing capability blocks the task or changes output quality materially.

## Route Trace

When the route is non-trivial, record or report the route decision using `docs/route-trace-template.md` from the project root when available. If that file is unavailable, use the compact trace format from `references/closeout.md`.
