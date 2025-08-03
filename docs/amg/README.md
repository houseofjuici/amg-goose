# AMG Vertical — Runbook

## Quick Start
1. cd amg-goose
2. cp configs/amg.env.example .env
3. Build CLI (first run): cargo build -p goose-cli --release
4. Run a recipe: scripts/run.sh recipes/amg/fit_advisor.yml

## Environment
Toggle mocks via .env (default true). Fill real creds to hit Shopify/Email/SMS.

## Recipes
- Fit Advisor: product fit recommendation
- Returns: triage decisions and templates
- Order Status: status + ETA message
- Care Nudge: post-purchase tips
- FAQ Autoresponder: quick responses

## UI
Docs site at http://localhost:3000/goose/. Use the app’s Open Project to point to the amg-goose folder.
