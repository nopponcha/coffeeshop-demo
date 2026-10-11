import { chromium } from "@playwright/test";
import { spawn } from "node:child_process";
import { mkdirSync } from "node:fs";
import { join } from "node:path";

const ARTIFACT_DIR =
  process.env.DESIGN_SCREENSHOT_DIR ??
  "/opt/cursor/artifacts/design-review";
const BASE_URL =
  process.env.PLAYWRIGHT_BASE_URL ?? "http://127.0.0.1:3000/coffeeshop-demo/";

mkdirSync(ARTIFACT_DIR, { recursive: true });

function startServer() {
  return spawn("node", ["scripts/serve-out.mjs"], {
    cwd: process.cwd(),
    stdio: ["ignore", "pipe", "pipe"],
    env: { ...process.env, PORT: "3000", HOST: "127.0.0.1" },
  });
}

async function waitForServer() {
  for (let i = 0; i < 30; i++) {
    try {
      const res = await fetch(BASE_URL);
      if (res.ok) return;
    } catch {
      /* retry */
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error("Static server did not become ready");
}

async function scrollToSection(page, selector) {
  await page.locator(selector).scrollIntoViewIfNeeded();
  await page.waitForTimeout(200);
}

const server = startServer();
try {
  await waitForServer();
  const browser = await chromium.launch();
  const desktop = await browser.newContext({
    viewport: { width: 1280, height: 800 },
  });
  const page = await desktop.newPage();

  await page.goto(BASE_URL, { waitUntil: "networkidle" });

  await page.screenshot({
    path: join(ARTIFACT_DIR, "desktop-full-page.png"),
    fullPage: true,
  });

  await scrollToSection(page, "#top");
  await page.screenshot({
    path: join(ARTIFACT_DIR, "desktop-hero-nav.png"),
  });

  await scrollToSection(page, "#menu");
  await page.screenshot({
    path: join(ARTIFACT_DIR, "desktop-menu.png"),
  });

  await scrollToSection(page, "#hours");
  await page.screenshot({
    path: join(ARTIFACT_DIR, "desktop-hours.png"),
  });

  await scrollToSection(page, "#contact");
  await page.getByRole("button", { name: "Send" }).click();
  await page.getByRole("alert").first().waitFor();
  await page.screenshot({
    path: join(ARTIFACT_DIR, "desktop-contact-errors.png"),
  });

  await page.getByLabel("Name").fill("Alex");
  await page.getByLabel("Email").fill("alex@example.com");
  await page.getByLabel("Message").fill("Table for two on Saturday?");
  await page.getByRole("button", { name: "Send" }).click();
  await page.getByRole("status").waitFor();
  await page.screenshot({
    path: join(ARTIFACT_DIR, "desktop-contact-success.png"),
  });

  const mobile = await browser.newContext({
    viewport: { width: 375, height: 812 },
  });
  const mobilePage = await mobile.newPage();
  await mobilePage.goto(BASE_URL, { waitUntil: "networkidle" });
  await mobilePage.screenshot({
    path: join(ARTIFACT_DIR, "mobile-full-page-375.png"),
    fullPage: true,
  });

  await browser.close();
  console.log(`Saved design screenshots to ${ARTIFACT_DIR}`);
} finally {
  server.kill("SIGTERM");
}
