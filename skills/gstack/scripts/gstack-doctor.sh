#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PROJECT_ROOT="$(cd "$ROOT/../.." && pwd)"

ok() { printf 'ok     %s\n' "$1"; }
warn() { printf 'warn   %s\n' "$1"; }
fail() { printf 'fail   %s\n' "$1"; }

printf 'gstack doctor\n'
printf 'skill root: %s\n' "$ROOT"

[ -f "$ROOT/SKILL.md" ] && ok "SKILL.md" || fail "missing SKILL.md"

for ref in router-kernel natural-command-router clarification-gate creative-router multi-ai-council development-router recovery closeout doctor; do
  [ -f "$ROOT/references/$ref.md" ] && ok "references/$ref.md" || fail "missing references/$ref.md"
done

for cmd in git node npm; do
  if command -v "$cmd" >/dev/null 2>&1; then
    ok "$cmd: $(command -v "$cmd")"
  else
    warn "$cmd not found"
  fi
done

if command -v gh >/dev/null 2>&1; then
  ok "gh: $(command -v gh)"
else
  warn "gh not found; use GitHub plugin or web fallback"
fi

if command -v open >/dev/null 2>&1; then
  ok "macOS open command available"
else
  warn "open command not found"
fi

if [ -d "$ROOT/capabilities" ]; then
  count="$(find "$ROOT/capabilities" -type f -name '*.json' | wc -l | tr -d ' ')"
  ok "skill capability cards: $count"
elif [ -d "$PROJECT_ROOT/capabilities" ]; then
  count="$(find "$PROJECT_ROOT/capabilities" -type f -name '*.json' | wc -l | tr -d ' ')"
  ok "project capability cards: $count"
else
  warn "capabilities directory not found"
fi

if [ -f "$ROOT/scripts/codex-codegraph/bin/codex-codegraph.js" ]; then
  ok "bundled codegraph helper"
else
  warn "bundled codegraph helper not found"
fi

printf 'done\n'
