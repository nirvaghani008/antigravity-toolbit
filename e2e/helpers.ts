import type { Page } from "@playwright/test";

// Collects everything that would mean "this page is broken" while a test runs:
// JavaScript crashes, console errors (React hydration errors land here) and
// same-site files such as images or scripts that fail to load.
export function watchForProblems(page: Page) {
  const problems: string[] = [];
  const origin = () => new URL(page.url()).origin;

  page.on("pageerror", (err) => problems.push(`JS error: ${err.message}`));
  page.on("console", (msg) => {
    if (msg.type() === "error") problems.push(`console.error: ${msg.text()}`);
  });
  page.on("response", (res) => {
    if (res.status() >= 400 && res.url().startsWith(origin())) {
      problems.push(`HTTP ${res.status()}: ${res.url()}`);
    }
  });

  return problems;
}

// Scrolls to the bottom so lazy-loaded images below the fold load too.
export async function scrollThroughPage(page: Page) {
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += window.innerHeight) {
      window.scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
  });
  await page.waitForLoadState("networkidle");
}
