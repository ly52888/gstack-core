# Clarification Gate

Ask before acting when required inputs are missing and guessing would produce low-quality, risky, or hard-to-reverse output.

## Ask Style

- Ask one to three short questions.
- Offer defaults only when safe.
- Do not ask for facts that can be discovered locally.
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
- Whether external AI/browser discussion is allowed when non-public material will be shared
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

If the user provides only a URL plus "I need to build a site/project like this, start", proceed to browser evidence gathering first. Ask clarifying questions after evidence gathering, not before, unless browser/external AI permission or access is blocked.

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
- Permission-sensitive actions require explicit confirmation

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
- Source assets or permission to generate them

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
