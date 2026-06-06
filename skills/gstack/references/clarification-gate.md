# Clarification Gate

Ask before acting when required inputs are missing and guessing would produce low-quality, risky, or hard-to-reverse output.

Do not ask for permission that Codex already has. Treat the current Codex session permissions, project trust, enabled plugins, logged-in browser sessions, GitHub connector, MCP servers, and shell sandbox policy as the authority for whether an operation may run.

## Ask Style

- Ask one to three short questions.
- Offer defaults only when safe.
- Do not ask for facts that can be discovered locally.
- Do not ask for "permission" to run an already-authorized tool, command, browser check, GitHub read, test, build, or file edit.
- If the user explicitly says to improvise, choose defaults and state them in the route preview.

## Minimum Inputs

### Development

- Goal
- Target scope or affected area
- Acceptance signal
- Constraints: do not touch, runtime, deadline, branch

### Pre-Build Multi-AI Council

- Idea or goal
- Evidence or reference material: URLs, screenshots, notes, docs, public examples
- Whether external AI discussion may receive non-public material, only when such material is needed
- Target user or primary use case, if not inferable from the reference
- Business or success metric, if needed for product decisions
- Constraints: stack, budget, timeline, must-use/must-not-do, if known
- Shareable data policy: what can be provided to external AI, what is blocked

### Website Clone / Inspired Redesign

- Reference site URL or screenshots
- What should be learned from the reference site, if user has preferences
- What must be differentiated, if user already knows
- Target audience and business goal, if not obvious
- Asset ownership constraints: logos, photos, icons, fonts, copy, if relevant
- Legal/compliance concerns or jurisdiction, if relevant

If the user provides only a URL plus "I need to build a site/project like this, start", proceed to browser evidence gathering first. Ask clarifying questions after evidence gathering, not before, unless browser/external AI access is actually unavailable or non-public disclosure is required.

### Debugging

- Symptom
- Reproduction or observed failure, unless screenshot/current browser evidence is enough to start
- Expected behavior, if not inferable
- Recent changes if known

### Page Bug / Screenshot / Task Failure

- Visible evidence: current browser page, screenshot, selected text, URL, route, or appshot
- Symptom: what failed or looked wrong
- Expected behavior, if not obvious
- Reproduction steps, task id, account role, or input data only when needed

If the user says "this page", "here", or provides a screenshot/appshot, start from that evidence. Ask for more only when reproduction or scope is blocked.

### GitHub

- Repository or PR/issue URL
- Desired action: inspect, comment, fix, merge, publish
- Follow the current Codex/GitHub permission state. Ask only before destructive or public write actions such as merge, release, force-push, deleting branches/issues, or posting user-attributed comments when the user did not ask for that action.

### Image

- Use case
- Subject
- Aspect ratio or destination
- Style or visual reference
- Text/copy if text is required
- Save location if project-bound

### Video

- Use case
- Duration
- Aspect ratio
- Script or message
- Visual style
- Voice/subtitles/music requirements
- Source assets or instruction to generate assets

### Presentation/Design

- Audience
- Source content
- Brand kit or style
- Slide count or format
- Final destination: editable design, deck, image export

## Proceed Without Asking

Proceed when missing inputs are non-critical and defaults are obvious:

- No save path for preview-only image
- No exact test command but repo exposes standard scripts
- No route trace preference
- Minor copy or formatting edits with clear target
- Codex already has filesystem/shell/browser/GitHub/plugin permission and the action is non-destructive
- Browser or GitHub evidence gathering is needed and the relevant tool is enabled/logged in

## Ask Only For Real Blockers

Ask the user only when:

- The task lacks facts that cannot be discovered locally.
- The next action sends non-public data to an external AI or third-party service.
- The next action is irreversible or high-impact: production data deletion, force push, public release, real payment, mass messaging, ad spend, auth/payment/database boundary change.
- A tool returns a real login/authorization prompt that Codex cannot satisfy.
