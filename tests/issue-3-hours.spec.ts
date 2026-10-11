import { expect, test } from "@playwright/test";

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

test.describe("Issue #3 — Opening hours", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("./#hours");
  });

  test("#3 AC1 hours section shows all seven days Monday to Sunday", async ({
    page,
  }) => {
    for (const day of DAYS) {
      await expect(page.getByRole("cell", { name: day, exact: true })).toBeVisible();
    }
  });

  test("#3 AC2 weekdays 07:00–18:00 and weekends 08:00–17:00", async ({
    page,
  }) => {
    for (const day of ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]) {
      const row = page.getByRole("row").filter({ hasText: day });
      await expect(row).toContainText("07:00–18:00");
    }
    for (const day of ["Saturday", "Sunday"]) {
      const row = page.getByRole("row").filter({ hasText: day });
      await expect(row).toContainText("08:00–17:00");
    }
  });

  test("#3 AC3 shop address 123 Sukhumvit Rd, Bangkok is shown", async ({
    page,
  }) => {
    await expect(page.locator(".address")).toHaveText("123 Sukhumvit Rd, Bangkok");
  });
});
