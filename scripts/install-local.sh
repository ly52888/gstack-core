#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SOURCE="$ROOT/skills/gstack"
CARDS="$ROOT/capabilities"
TARGET_ROOT="${CODEX_SKILLS_DIR:-$HOME/.codex/skills}"
TARGET="$TARGET_ROOT/gstack"
MODE="${1:-}"

usage() {
  cat <<'EOF'
Usage:
  scripts/install-local.sh --dry-run
  scripts/install-local.sh --install
  scripts/install-local.sh --replace

Environment:
  CODEX_SKILLS_DIR  Override target skill root. Default: ~/.codex/skills

Notes:
  --install fails if a target already exists.
  --replace backs up the existing target before copying.
  Restart Codex after install or replace.
EOF
}

if [ "$MODE" = "" ] || [ "$MODE" = "-h" ] || [ "$MODE" = "--help" ]; then
  usage
  exit 0
fi

if [ ! -f "$SOURCE/SKILL.md" ]; then
  echo "missing source skill: $SOURCE/SKILL.md" >&2
  exit 1
fi

echo "source: $SOURCE"
echo "target: $TARGET"

if [ "$MODE" = "--dry-run" ]; then
  if [ -e "$TARGET" ]; then
    echo "target exists; use --replace to back it up and replace"
  else
    echo "target is free; use --install"
  fi
  exit 0
fi

mkdir -p "$TARGET_ROOT"

if [ "$MODE" = "--install" ]; then
  if [ -e "$TARGET" ]; then
    echo "target already exists: $TARGET" >&2
    exit 1
  fi
  cp -R "$SOURCE" "$TARGET"
  if [ -d "$CARDS" ]; then
    mkdir -p "$TARGET/capabilities"
    cp "$CARDS"/*.json "$TARGET/capabilities/" 2>/dev/null || true
  fi
  echo "installed: $TARGET"
  exit 0
fi

if [ "$MODE" = "--replace" ]; then
  if [ -e "$TARGET" ]; then
    stamp="$(date +%Y%m%d-%H%M%S)"
    backup="$TARGET.backup-$stamp"
    mv "$TARGET" "$backup"
    echo "backup: $backup"
  fi
  cp -R "$SOURCE" "$TARGET"
  if [ -d "$CARDS" ]; then
    mkdir -p "$TARGET/capabilities"
    cp "$CARDS"/*.json "$TARGET/capabilities/" 2>/dev/null || true
  fi
  echo "installed: $TARGET"
  exit 0
fi

usage
exit 1
