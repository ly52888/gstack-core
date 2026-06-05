# Enterprise Governance

## Goal

Help teams control how Codex uses skills, plugins, external AI, browser sessions, GitHub, and local scripts.

## Governance Surfaces

- Tool routing: which plugins, MCP servers, CLIs, and scripts can be used.
- Data disclosure: what may be sent to external AI, browsers, or third-party services.
- Verification: what evidence is required before completion.
- Security: which routes require guard/security review.
- Recovery: how handoff, context overflow, quota, and network failures are handled.
- Audit: what route traces are stored.

## Policy Concepts

Future enterprise configs may define:

```json
{
  "allowed_tools": ["GitHub", "Chrome", "Context7"],
  "blocked_tools": ["unknown-external-ai"],
  "external_ai": {
    "default": "ask",
    "blocked_data": ["credentials", "payment_data", "customer_pii"],
    "require_evidence_pack": true
  },
  "high_risk_routes": ["auth", "payment", "database", "production"],
  "required_closeout": ["tests", "route_trace", "docs_update"]
}
```

This is a planning sketch. The current open-source core documents the behavior but does not enforce centralized policy yet.

## Governance Opportunity

Team value comes from making AI-assisted work explainable and governable:

- Who approved external AI sharing?
- Which tool route was chosen and why?
- What evidence was used?
- What verification ran?
- Which files changed?
- Was the task safe to ship?

## Open Core Boundary

The open core should keep the policy language and local checks. Future maintained layers can add:

- Centralized policy distribution.
- Team dashboards.
- Managed registry.
- Compliance exports.
- Pack approval workflows.
