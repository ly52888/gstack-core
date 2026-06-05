# Route Trace Template

Use this after non-trivial tasks or when a route choice may need debugging.

```text
Route:
Mode:
User override:
Why this route:
Inputs available:
Inputs missing:
Clarification asked:
Tools/skills/plugins used:
Fallbacks used:
Files changed:
Commands run:
Verification:
Cleanup:
Remaining risk:
Exact next step:
```

## Good Trace

```text
Route: creative.image
Mode: combo
User override: none
Why this route: user requested an ad image, not code-native SVG
Inputs available: platform = Telegram
Inputs missing: subject, aspect ratio, exact copy, style
Clarification asked: yes
Tools/skills/plugins used: none yet
Fallbacks used: none
Verification: blocked until required inputs arrive
Remaining risk: generating now would produce generic output
Exact next step: ask for product/subject, format, copy, and style
```

