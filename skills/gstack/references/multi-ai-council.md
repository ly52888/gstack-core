# Multi-AI Council

Use this before building a new system, website, product workflow, major feature, marketing funnel, clone/inspired redesign, or architecture direction when the user wants multiple AI perspectives to improve requirements before implementation.

The final deliverable is not "paste external AI answers into a document." The workflow must be a multi-round council: Codex gathers evidence in the browser, external AIs critique from different angles, Codex feeds the strongest objections back for another round, and only after convergence produces an implementation-ready plan. Do not start development until the council is complete or the user explicitly stops it. If the user already said "start", "continue", or "execute" and Codex permissions allow the work, continue after the council unless a real blocker remains.

## Purpose

Do not use multiple AIs as a novelty. Use them to create pressure on weak assumptions:

- Product-market fit and target user clarity
- Core workflow and information architecture
- UX and conversion risk
- Technical feasibility and architecture risk
- Security, abuse, privacy, compliance, and operational risk
- Scope control and MVP sequencing
- Competitive differentiation

## Evidence Policy

External AI review is valuable only when it receives enough concrete context. Do not over-sanitize until the brief becomes generic. Instead use **data classification + Codex permission state + minimum necessary disclosure**.

Classify inputs before external sharing:

- `public`: public website URLs, public copy, public screenshots, public docs, public competitor facts.
- `shareable`: non-secret business goals, target users, desired differentiation, constraints the user allows sharing.
- `sensitive`: internal strategy, exact margins, private customer data, non-public code, unpublished launch plans.
- `blocked`: credentials, tokens, private keys, passwords, payment data, exact customer PII, production secrets.

Share public material without asking again when web/browser/plugin access is already authorized. Share non-public `shareable` material only if the user has allowed this category of disclosure in the current task or project. Summarize sensitive material only if the summary still preserves decision value and the user approves. Never share blocked material.

If there is not enough concrete material for an external AI to reason from, ask the user for URLs, screenshots, competitor notes, product goals, target users, constraints, or legal/compliance concerns before opening external AI.

## Hard Gates

Before opening external AI sites or browser tabs:

1. Use the current Codex permission state. If Chrome/Browser/plugin automation is enabled and logged in, do not ask for another browser/tool permission.
2. Strip blocked material: secrets, tokens, passwords, private keys, payment data, exact customer PII, and production credentials.
3. Ask the user only if non-public `shareable` or `sensitive` material must be sent outside Codex and no prior disclosure permission exists.
4. Prepare an evidence brief with enough useful detail. If removing sensitive details would make the brief too generic, ask the user for shareable substitutes instead of proceeding.
5. If the external AI tool/account is unavailable, run an internal council simulation and clearly label it as internal-only.
6. Do not let external AI outputs override local project facts, user constraints, law, safety, or verified data.
7. Require external AIs to base responses only on the provided brief, attached screenshots, URLs, and explicitly cited sources. They must label assumptions and refuse to invent facts from memory.

## When To Ask First

Ask for missing inputs when any of these are unclear:

- What is being built: system, website, app, workflow, agent, creative asset
- Target users and top use case
- Business goal or success metric
- Constraints: budget, timeline, stack, must-use tools, must-not-do items
- Whether non-public material may be provided to external AI, when needed

## Website Clone / Inspired Redesign Workflow

Use this when the user wants to "clone", "replicate", "copy", "复刻", "仿站", or build something inspired by another website.

The goal is **not** to create a 1:1 copy. The goal is to learn from the reference site and produce a legally safer, differentiated implementation.

Ask for or gather:

- Reference website URL(s)
- Screenshots or pages to analyze
- What the user likes: layout, flow, conversion pattern, content structure, interaction, visual tone
- What must be different: brand, copy, layout, palette, components, information architecture, business model
- Target audience and business goal
- Jurisdiction or compliance constraints if relevant
- Assets ownership: logos, photos, icons, fonts, trademarks

Council questions for external AIs:

- What elements are generic patterns versus potentially protectable expression?
- Which parts should not be copied 1:1: copy, logo, brand marks, images, icons, illustrations, exact layout, animation timing, trade dress?
- What differentiated design directions preserve the business goal without cloning?
- What legal/compliance/privacy risks should be considered?
- What should be rebuilt from scratch with original assets and copy?
- What MVP scope captures the useful workflow while changing presentation and content?

Hard requirements:

- Do not ask external AI to recreate copyrighted copy, unique artwork, logos, or proprietary assets.
- Do not request pixel-perfect cloning.
- Require all outputs to propose differentiated alternatives.
- If law/regulation matters, treat external AI as issue spotting only, not legal advice.

## Reference Website Intake

When the user provides a website and says they are logged in or credentials are ready, Codex should first use the available browser/Chrome workflow to organize evidence before contacting external AIs.

Simple startup phrases such as "我需要开发一个这样的网站", "类似项目", "参考这个做", "复刻", "仿站", or "开始启动" with a URL are enough to begin evidence gathering. Do not require a long form first. Gather what can be learned from the reference site, then ask only the missing decisions that matter.

Collect, when accessible:

- URL, page purpose, target user, visible conversion goal
- key pages and navigation structure
- screenshots or visual observations
- content sections and messaging hierarchy
- forms, checkout, onboarding, pricing, dashboard, or critical flows
- interaction patterns and UX strengths
- obvious weaknesses and friction
- assets that must not be copied: logo, photos, illustrations, icons, exact copy, brand marks
- potential compliance surfaces: privacy, cookies, payments, claims, regulated content, user data

If browser access is unavailable, ask the user for screenshots, exported page text, public URLs, or a short walkthrough. Do not proceed to external AI with only a vague sentence unless the user explicitly accepts an internal-only brainstorming pass.

## Council Roles

Use 3-6 roles depending on task size:

- `Product Strategist`: target user, value prop, positioning, MVP cuts
- `UX Architect`: flows, IA, friction, onboarding, conversion
- `Senior Engineer`: architecture, data model, integration, maintainability
- `Security/Abuse Reviewer`: auth, permissions, fraud, privacy, compliance
- `Growth/Marketing Reviewer`: acquisition, copy, funnel, differentiation
- `Red Team`: attacks assumptions, finds failure modes, asks "why will this fail?"

For small tasks, use Product + Engineer + Red Team only.

## External AI Multi-Round Workflow

Use this only when browser/Chrome automation is available and allowed.

Minimum standard:

- Use at least 3 external AI participants when available.
- Run at least 3 rounds unless a blocker appears or the user explicitly asks to stop early.
- Give each AI a role-specific prompt.
- Feed summarized objections from one round into the next round.
- Require evidence-based answers and assumption labels every round.
- Codex is the moderator and final synthesizer, not a copy-paste relay.

Suggested AI mix:

- One general reasoning AI
- One product/UX-oriented AI
- One engineering/security-oriented AI
- Optional fourth: legal/compliance/IP issue-spotting AI
- Optional fifth: marketing/growth AI

Round 0: Evidence Pack

1. Codex opens and studies the reference website or supplied materials.
2. Codex prepares an evidence pack:
   - Goal
   - Target users
   - Public reference URLs/screenshots/material
   - Current assumptions
   - Constraints
   - Differentiation requirements
   - Legal/compliance questions
   - Questions to challenge
   - Desired output format
3. Codex classifies disclosure level. Public material may be shared under current Codex/browser permissions; ask only before sharing non-public material without prior approval.

Round 1: Independent Critique

Ask each external AI independently:

   - what the reference site is doing well
   - what should be learned, not copied
   - top risks
   - missing requirements
   - wrong assumptions or unsupported assumptions
   - recommended MVP scope
   - hard questions for the user
   - sources used, or "only based on provided brief"

Round 2: Cross-Attack

Codex summarizes Round 1 into:

   - consensus
   - contradictions
   - strongest objections
   - risky assumptions
   - proposed differentiated directions

Then send each external AI the summary and ask it to attack the other perspectives:

   - which recommendation is dangerous or weak?
   - what did the other reviewers miss?
   - what would make this product fail?
   - which clone-like elements create legal/IP/trust risk?
   - what evidence is still missing?

Round 3: Convergence Review

Codex drafts a candidate final plan:

   - differentiated positioning
   - MVP scope
   - UX/page structure
   - technical approach
   - legal/compliance/IP guardrails
   - do-not-copy list
   - open questions

Send this plan back to at least two external AIs and ask:

   - approve / reject / revise
   - remaining fatal flaws
   - missing user decisions
   - what should be removed before development

Round 4: Optional User Decision Round

If the external AIs still disagree on major direction, ask the user to choose among clear options before writing the final spec.

Codex synthesis:

4. Capture each response as structured notes. Do not paste huge raw responses into final output.
5. Run final synthesis:
   - Agreement points
   - Contradictions
   - Strongest objections
   - Decisions recommended now
   - Questions still requiring user input
   - Differentiated MVP requirements draft
   - Do-not-copy list
   - Development readiness decision
6. If building continues, convert the synthesis into a short implementation-ready spec or task plan. If the user already asked to start/continue/execute and no real blocker remains, proceed into development without another permission prompt. Ask only when the plan requires a user business decision or high-risk irreversible action.

## Internal Council Fallback

If external AI tools, accounts, browser control, network, or required disclosure approval are missing, run the same council roles internally and label the result:

```text
Mode: internal multi-perspective review; no external AI browser discussion was performed.
```

Internal fallback is acceptable for early thinking, but should not be represented as external validation.

## Prompt Template

```text
You are the <role>. Review this product/system idea before implementation.

Brief:
<evidence brief>

Focus on:
- incorrect assumptions
- missing requirements
- failure modes
- MVP cuts
- questions the builder must answer before coding
- legal/compliance/IP/privacy issues where relevant

Rules:
- Use only the provided brief, screenshots, URLs, and explicitly cited sources.
- Do not rely on memory as fact.
- Label assumptions separately.
- If evidence is missing, ask for it instead of inventing.
- For clone/inspired redesign tasks, do not recommend 1:1 copying; propose differentiated alternatives.

Return concise bullets. Be critical and practical.
```

## Cross-Attack Prompt Template

```text
You are the <role>. You previously reviewed this project. Now critique the combined feedback from other reviewers.

Evidence pack:
<evidence brief>

Round 1 summary:
<summary>

Your task:
- attack weak assumptions
- identify dangerous recommendations
- point out missing evidence
- flag clone/IP/compliance/privacy risks
- propose concrete revisions

Rules:
- Use only the evidence pack and round summary.
- Do not rely on memory as fact.
- Label assumptions separately.
- If evidence is missing, say exactly what is missing.
```

## Final Plan Review Prompt Template

```text
Review this candidate final plan before development.

Evidence pack:
<evidence brief>

Candidate plan:
<plan>

Return:
- approve / reject / revise
- fatal flaws
- missing decisions
- do-not-build-yet items
- changes required before coding

Rules:
- Do not introduce new facts unless sourced.
- Do not recommend 1:1 copying.
- Be strict: if the plan is not ready, say why.
```

## Output Format

```text
Route: planning.multi-ai-council | Mode: <external-browser|internal-fallback|hybrid>
Inputs used:
External AIs used:
Disclosure level:
Evidence provided:
Rounds completed:

Consensus:
Contradictions:
Strongest attacks:
Missing requirements:
Legal/compliance/IP risks:
Unsupported assumptions:
Recommended MVP:
Differentiation strategy:
Do-not-copy list:
Open questions for user:
Do-not-build-yet list:
Development readiness: <ready|not ready|ready after user answers>
Next step:
```

## Stop Conditions

Stop and ask the user before continuing only when:

- External AI requires login or paid access not available.
- Prompt contains blocked material.
- Available evidence is too generic for useful external review.
- A user decision is needed to choose target customer, MVP, pricing, or stack.
- A proposed direction has high legal, security, payment, health, or financial risk.
- Fewer than the required council rounds completed and the route cannot continue with an internal fallback or scoped plan.
