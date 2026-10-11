import { expect, test } from "@playwright/test";

const LIVE_URL =
  process.env.PLAYWRIGHT_LIVE_URL ??
  "https://nopponcha.github.io/coffeeshop-demo/";

test.describe("Live site smoke", () => {
  test.use({ baseURL: LIVE_URL });

  test("live GitHub Pages site loads Bean & Brew home", async ({ page }) => {
    test.skip(!process.env.PLAYWRIGHT_LIVE_URL, "Set PLAYWRIGHT_LIVE_URL to run live smoke");

    await page.goto("./", { waitUntil: "domcontentloaded", timeout: 60_000 });
    await expect(page.getByRole("heading", { level: 1, name: "Bean & Brew" })).toBeVisible({
      timeout: 30_000,
    });
    await expect(page.locator("#menu")).toBeAttached();
    await expect(page.locator("#hours")).toBeAttached();
    await expect(page.locator("#contact")).toBeAttached();
  });
});
