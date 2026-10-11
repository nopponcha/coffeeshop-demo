import { defineConfig, devices } from "@playwright/test";

const basePath = process.env.PLAYWRIGHT_BASE_PATH ?? "/coffeeshop-demo";
const port = Number(process.env.PLAYWRIGHT_PORT ?? 3000);
const host = process.env.PLAYWRIGHT_HOST ?? "127.0.0.1";
const baseURL =
  process.env.PLAYWRIGHT_BASE_URL ?? `http://${host}:${port}${basePath}/`;

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [["html", { open: "never" }], ["list"]],
  use: {
    baseURL,
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: process.env.PLAYWRIGHT_SKIP_WEBSERVER
    ? undefined
    : {
        command: `node scripts/serve-out.mjs`,
        url: baseURL,
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
      },
});
