import { expect, test } from "@playwright/test";
import { menuCategories } from "../src/data/menu";

test.describe("Issue #2 — Menu section", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("./#menu");
  });

  test("#2 AC1 menu lists at least 6 items with name, description, and ฿ price", async ({
    page,
  }) => {
    const items = page.locator("#menu .menu-item");
    await expect(items).toHaveCount(7);

    const first = items.first();
    await expect(first.locator(".menu-item__name")).not.toBeEmpty();
    await expect(first.locator(".menu-item__desc")).not.toBeEmpty();
    await expect(first.locator(".menu-item__price")).toHaveText(/฿\d+/);
  });

  test("#2 AC2 items grouped into Coffee and Food categories", async ({
    page,
  }) => {
    await expect(page.getByRole("heading", { name: "Coffee", exact: true })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Food", exact: true })).toBeVisible();
  });

  test("#2 AC3 every listed price is a positive number", async () => {
    for (const category of menuCategories) {
      for (const item of category.items) {
        expect(item.priceBaht).toBeGreaterThan(0);
      }
    }
    const prices = menuCategories.flatMap((c) => c.items.map((i) => i.priceBaht));
    expect(prices.length).toBeGreaterThanOrEqual(6);
  });
});
