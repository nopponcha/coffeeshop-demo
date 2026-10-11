import { expect, test } from "@playwright/test";

test.describe("Issue #4 — Contact form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("./#contact");
  });

  test("#4 AC1 contact section has Name, Email, Message fields and Send button", async ({
    page,
  }) => {
    await expect(page.getByLabel("Name")).toBeVisible();
    await expect(page.getByLabel("Email")).toBeVisible();
    await expect(page.getByLabel("Message")).toBeVisible();
    await expect(page.getByRole("button", { name: "Send" })).toBeVisible();
  });

  test("#4 AC2 empty submit shows errors and no thank-you message", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "Send" }).click();
    await expect(page.getByRole("alert").first()).toBeVisible();
    await expect(page.getByRole("status")).toHaveCount(0);
  });

  test('#4 AC3 invalid email "abc" shows email error', async ({ page }) => {
    await page.getByLabel("Name").fill("Alex");
    await page.getByLabel("Email").fill("abc");
    await page.getByLabel("Message").fill("Hello");
    await page.getByRole("button", { name: "Send" }).click();
    await expect(page.locator("#contact-email-error")).toBeVisible();
    await expect(page.getByRole("status")).toHaveCount(0);
  });

  test("#4 AC4 valid submission shows thanks and clears the form", async ({
    page,
  }) => {
    await page.getByLabel("Name").fill("Alex");
    await page.getByLabel("Email").fill("alex@example.com");
    await page.getByLabel("Message").fill("Table for two on Saturday?");
    await page.getByRole("button", { name: "Send" }).click();

    await expect(page.getByRole("status")).toHaveText("Thanks, we'll be in touch!");
    await expect(page.getByLabel("Name")).toHaveValue("");
    await expect(page.getByLabel("Email")).toHaveValue("");
    await expect(page.getByLabel("Message")).toHaveValue("");
  });

  test("#4 AC5 form works without backend (client-side only)", async ({
    page,
  }) => {
    const requests: string[] = [];
    page.on("request", (req) => {
      if (req.method() === "POST") {
        requests.push(req.url());
      }
    });

    await page.getByLabel("Name").fill("Sam");
    await page.getByLabel("Email").fill("sam@example.com");
    await page.getByLabel("Message").fill("Do you have oat milk?");
    await page.getByRole("button", { name: "Send" }).click();

    await expect(page.getByRole("status")).toBeVisible();
    expect(requests).toEqual([]);
  });
});
