# Architecture

## Product

**Bean & Brew** is a single-page marketing site: hero intro, menu, opening hours, and a client-side contact form. There is no server or API — the form validates and acknowledges submission entirely in the browser, which matches static hosting on GitHub Pages.

## Tech stack

| Layer | Choice | Rationale |
| --- | --- | --- |
| Framework | Next.js 15 App Router (TypeScript) | Familiar React model, static export for free hosting |
| Hosting | GitHub Pages | Zero cost, matches course/demo constraints |
| CI | GitHub Actions | Lint, typecheck, build, E2E on every PR |
| QA | Playwright | Reliable AC-titled tests, HTML report artifacts |
| Styling | Plain CSS | Small surface area; no extra build tooling |

## Static export and `basePath`

Production builds set `basePath` / `assetPrefix` to `/coffeeshop-demo` so assets resolve under [https://nopponcha.github.io/coffeeshop-demo/](https://nopponcha.github.io/coffeeshop-demo/). Local `next dev` uses an empty base path for convenience. CI and production builds use `NODE_ENV=production`, which activates the GitHub Pages base path in `next.config.ts`.

Playwright uses `scripts/serve-out.mjs` to mount `out/` at `/coffeeshop-demo` (same path prefix as GitHub Pages). Defaults are set in `playwright.config.ts`.

## Repository layout

```
src/app/          Next.js routes (single home page)
src/components/   Header, contact form (client component)
src/data/         Menu and hours data (shared with tests)
tests/            Playwright specs (one file per issue + smoke)
docs/             Requirements traceability and this document
.github/workflows/ci.yml
```

## Branch and PR workflow (five-team simulation)

1. **Business** — Issues #1–#4 define acceptance criteria (already in GitHub).
2. **Development lead** — Architecture, basePath strategy, traceability in `docs/`.
3. **Development** — Implement UI and client-side form on a feature branch (`cursor/*-737f`).
4. **DevOps** — GitHub Actions: job `ci` on PRs; deploy + live smoke on push to `main`.
5. **QA** — Playwright tests named `#issue ACn …`; HTML report uploaded as an artifact.

Flow: open PR → `ci` must pass → review → squash/merge to `main` → deploy job publishes Pages → smoke verifies live URL.

## Quality gates

- `npm run lint` — ESLint (Next.js config)
- `npm run typecheck` — `tsc --noEmit`
- `npm run build` — static export to `out/`
- `npm run test:e2e` — all requirement AC tests against served `out/`
- `npm run test:smoke` — live URL only (deploy workflow)
