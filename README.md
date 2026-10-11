# Bean & Brew — Coffee Shop Demo

Static demo site for **Bean & Brew**, built as a five-team exercise (business requirements, dev lead, development, DevOps, QA). Requirements are tracked in [GitHub issues #1–#5](https://github.com/nopponcha/coffeeshop-demo/issues).

**Live site (after deploy):** [https://nopponcha.github.io/coffeeshop-demo/](https://nopponcha.github.io/coffeeshop-demo/)

## Five-team workflow

| Team | Responsibility | Artifact |
| --- | --- | --- |
| Business | User stories and acceptance criteria | Issues [#1](https://github.com/nopponcha/coffeeshop-demo/issues/1)–[#4](https://github.com/nopponcha/coffeeshop-demo/issues/4) |
| Development lead | Stack, hosting, traceability | [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) |
| Development | Next.js UI and contact form | `src/` |
| DevOps | CI, GitHub Pages deploy | [.github/workflows/ci.yml](.github/workflows/ci.yml) |
| QA | Playwright tests per AC | [docs/REQUIREMENTS.md](docs/REQUIREMENTS.md), `tests/` |

Typical flow: implement on a `cursor/*` branch → open PR → **`ci`** job runs lint, typecheck, build, and Playwright → merge to `main` → deploy + live smoke test.

## Local development

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (no base path in dev).

## Build and test (same as CI)

```bash
npm run lint
npm run typecheck
npm run build
npm run test:e2e
```

Playwright uses `scripts/serve-out.mjs` to serve `out/` at `http://127.0.0.1:3000/coffeeshop-demo/`, matching GitHub Pages URL paths.

Optional live smoke (after deploy):

```bash
PLAYWRIGHT_LIVE_URL=https://nopponcha.github.io/coffeeshop-demo/ PLAYWRIGHT_SKIP_WEBSERVER=1 npm run test:smoke
```

## Docs

- [docs/REQUIREMENTS.md](docs/REQUIREMENTS.md) — AC ↔ test mapping
- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) — technical decisions

## Owner setup (one-time)

The Cursor GitHub app cannot change these settings; the repo owner should:

1. **Settings → Pages → Build and deployment → Source:** GitHub Actions.
2. **Settings → Branches → Branch protection rule for `main`:** require status check **`ci`** before merging (satisfies issue #5 AC2).
