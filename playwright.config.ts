import { defineConfig, devices } from "@playwright/test";

// Runs against a production build on its own port (3000 is usually taken by `npm run dev`):
//   npm run build && npm run test:e2e
// Pick another port if that one is busy:
//   E2E_PORT=3333 npm run test:e2e
// Against the live site instead (skips tests that would send real messages, and the Lab):
//   BASE_URL=https://toonforge.ai npm run test:e2e
const PORT = Number(process.env.E2E_PORT ?? 3217);

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : "list",
  use: {
    baseURL: process.env.BASE_URL ?? `http://localhost:${PORT}`,
    trace: "retain-on-failure",
  },
  projects: [
    {
      name: "desktop",
      use: { ...devices["Desktop Chrome"] },
      testIgnore: /mobile\.spec\.ts/,
    },
    {
      name: "mobile",
      use: { ...devices["Pixel 7"] },
      testMatch: /mobile\.spec\.ts/,
    },
  ],
  webServer: process.env.BASE_URL
    ? undefined
    : {
        command: `npm run start -- --port ${PORT}`,
        url: `http://localhost:${PORT}`,
        // Turns on the /lab practice pages, which are off on the live site.
        env: { LAB_ENABLED: "1" },
        // Never reuse a server that's already running: it could be another app on
        // the same port, or this site built without the Lab.
        reuseExistingServer: false,
        timeout: 120_000,
      },
});
