#!/usr/bin/env bash
set -euo pipefail
ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"
if [ ! -f .env ]; then
  echo "[run.sh] .env not found. Copying configs/amg.env.example to .env (mock mode)."
  cp configs/amg.env.example .env
fi
RECIPE_PATH=${1:-}
if [ -z "$RECIPE_PATH" ]; then
  echo "Usage: scripts/run.sh <path-to-recipe.yml>"
  echo "Example: scripts/run.sh recipes/amg/fit_advisor.yml"
  exit 1
fi
if [ ! -f "$RECIPE_PATH" ]; then
  echo "Error: recipe not found: $RECIPE_PATH"
  exit 1
fi
if [ -x ./target/release/goose-cli ]; then
  ./target/release/goose-cli run "$RECIPE_PATH"
else
  echo "[run.sh] goose-cli not built; running via cargo. This is slower the first time."
  cargo run -p goose-cli -- run "$RECIPE_PATH"
fi