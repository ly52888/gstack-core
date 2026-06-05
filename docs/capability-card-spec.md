# Capability Card Spec

Capability cards are JSON files in `skills/gstack/capabilities/*.json`. The repository also keeps a root copy in `capabilities/*.json` for validation and documentation. They let gstack discover and reason about skills, plugins, MCP servers, CLI tools, local scripts, and subthread workflows without loading every full instruction file.

## Required Fields

```json
{
  "id": "creative.image.imagegen",
  "type": "skill",
  "target": "imagegen",
  "best_for": ["raster image generation"],
  "triggers": ["generate image"],
  "required_inputs": ["use_case", "subject"],
  "fallback": ["canva"],
  "verification": ["subject matches"],
  "when_not_to_use": ["existing SVG should be edited directly"]
}
```

## Field Meanings

- `id`: Stable route identifier.
- `type`: One of `skill`, `plugin`, `mcp`, `cli`, `local-script`, `subthread`, `built-in`, `workflow`.
- `target`: Skill/plugin/tool name visible to Codex.
- `best_for`: High-signal use cases.
- `triggers`: Words, phrases, or situations that suggest the route.
- `required_inputs`: Inputs that must exist before execution.
- `optional_inputs`: Useful but not mandatory inputs.
- `cost`: Relative token/time/account cost.
- `risk`: Operational or quality risk.
- `requires_network`: Whether network is normally required.
- `requires_auth`: Whether account/API auth is normally required.
- `fallback`: Practical alternatives.
- `verification`: Observable evidence needed before closeout.
- `when_not_to_use`: Clear negative cases.

## Design Rules

- Cards should be short and specific.
- Required inputs should prevent bad output, not create unnecessary questions.
- Fallbacks must be real options.
- Verification must be observable by Codex or the user.
