# Requirements traceability

Business requirements live in GitHub issues [#1–#4](https://github.com/nopponcha/coffeeshop-demo/issues). DevOps/QA requirements are [#5](https://github.com/nopponcha/coffeeshop-demo/issues/5). Each acceptance criterion (AC) maps to automated coverage below.

## Issue #1 — Home page and navigation

| AC | Requirement | Test |
| --- | --- | --- |
| AC1 | Page title and main heading show **Bean & Brew** | `tests/issue-1-home.spec.ts` — `#1 AC1 page title and main heading show Bean & Brew` |
| AC2 | Nav links to Menu, Hours, Contact | `#1 AC2 navigation links to Menu, Hours, and Contact sections` |
| AC3 | No console errors on load | `#1 AC3 page loads with no console errors` |
| AC4 | Usable at 375px width, no horizontal scroll | `#1 AC4 mobile 375px layout has no horizontal scroll` |

## Issue #2 — Menu

| AC | Requirement | Test |
| --- | --- | --- |
| AC1 | ≥6 items with name, description, ฿ price | `#2 AC1 menu lists at least 6 items with name, description, and ฿ price` |
| AC2 | ≥2 categories (Coffee, Food) | `#2 AC2 items grouped into Coffee and Food categories` |
| AC3 | Every price is a positive number | `#2 AC3 every listed price is a positive number` |

## Issue #3 — Opening hours

| AC | Requirement | Test |
| --- | --- | --- |
| AC1 | All seven days Mon–Sun | `#3 AC1 hours section shows all seven days Monday to Sunday` |
| AC2 | Weekdays 07:00–18:00, weekends 08:00–17:00 | `#3 AC2 weekdays 07:00–18:00 and weekends 08:00–17:00` |
| AC3 | Address **123 Sukhumvit Rd, Bangkok** | `#3 AC3 shop address 123 Sukhumvit Rd, Bangkok is shown` |

## Issue #4 — Contact form

| AC | Requirement | Test |
| --- | --- | --- |
| AC1 | Name, Email, Message, Send | `#4 AC1 contact section has Name, Email, Message fields and Send button` |
| AC2 | Empty submit shows errors, no thank-you | `#4 AC2 empty submit shows errors and no thank-you message` |
| AC3 | Invalid email (e.g. `abc`) shows email error | `#4 AC3 invalid email "abc" shows email error` |
| AC4 | Valid submit shows thanks and clears form | `#4 AC4 valid submission shows thanks and clears the form` |
| AC5 | No backend (browser-only) | `#4 AC5 form works without backend (client-side only)` |

## Issue #5 — CI/CD and QA

| AC | Requirement | Implementation / test |
| --- | --- | --- |
| AC1 | PR to `main`: lint, build, Playwright on static `out/` | `.github/workflows/ci.yml` job `ci` |
| AC2 | Failing check blocks merge | Repo setting: branch protection requires job `ci` (owner action) |
| AC3 | Merge to `main` publishes GitHub Pages | `deploy-github-pages` job uses `upload-pages-artifact` / `deploy-pages` |
| AC4 | Post-deploy Playwright smoke on live URL | `tests/smoke-live.spec.ts` with retries via curl wait + Playwright |
| AC5 | Every requirement AC has a named Playwright test | See tables above; titles include `#N ACn` |
| AC6 | Playwright HTML report uploaded every run | `actions/upload-artifact` for `playwright-report/` (and smoke on deploy) |
