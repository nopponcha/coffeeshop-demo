import { expect, test } from "@playwright/test";

test.describe("Issue #1 — Home page and navigation", () => {
  test("#1 AC1 page title and main heading show Bean & Brew", async ({
    page,
  }) => {
    await page.goto("./");
    await expect(page).toHaveTitle(/Bean & Brew/);
    await expect(page.getByRole("heading", { level: 1, name: "Bean & Brew" })).toBeVisible();
  });

  test("#1 AC2 navigation links to Menu, Hours, and Contact sections", async ({
    page,
  }) => {
    await page.goto("./");

    await page.getByRole("navigation", { name: "Main" }).getByRole("link", { name: "Menu" }).click();
    await expect(page.locator("#menu")).toBeInViewport();

    await page.getByRole("navigation", { name: "Main" }).getByRole("link", { name: "Hours" }).click();
    await expect(page.locator("#hours")).toBeInViewport();

    await page.getByRole("navigation", { name: "Main" }).getByRole("link", { name: "Contact" }).click();
    await expect(page.locator("#contact")).toBeInViewport();
  });

  test("#1 AC3 page loads with no console errors", async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        consoleErrors.push(msg.text());
      }
    });
    page.on("pageerror", (err) => {
      consoleErrors.push(err.message);
    });

    await page.goto("./");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    expect(consoleErrors, consoleErrors.join("\n")).toEqual([]);
  });

  test("#1 AC4 mobile 375px layout has no horizontal scroll", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("./");

    const hasHorizontalScroll = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    expect(hasHorizontalScroll).toBe(false);
  });
});
