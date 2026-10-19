import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

for (const [link, sectionId] of [
  ["Features", "features"],
  ["How It Works", "how-it-works"],
  ["Showcase", "showcase"],
  ["Pricing", "pricing"],
]) {
  test(`header link "${link}" scrolls to its section`, async ({ page }) => {
    await page.locator("header nav").getByRole("link", { name: link, exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`#${sectionId}$`));
    await expect(page.locator(`#${sectionId}`)).toBeInViewport();
  });
}

test("header links reach the About and Contact pages", async ({ page }) => {
  const nav = page.locator("header nav");
  await nav.getByRole("link", { name: "About", exact: true }).click();
  await expect(page).toHaveURL(/\/about$/);

  await nav.getByRole("link", { name: "Contact", exact: true }).click();
  await expect(page).toHaveURL(/\/contact$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Get in Touch");
});

test("the demo's Generate button runs a render and finishes", async ({ page }) => {
  const demo = page.locator("#demo");
  await demo.getByRole("button", { name: "Generate Cartoon Animation Now" }).click();
  await expect(demo.getByRole("button", { name: /Rendering Animation/ })).toBeVisible();
  // The simulated render takes about 1.8 seconds.
  await expect(demo.getByRole("button", { name: "Generate Cartoon Animation Now" })).toBeEnabled({
    timeout: 5_000,
  });
});

test("pricing switches between annual and monthly in the real page", async ({ page }) => {
  const pricing = page.locator("#pricing");
  await expect(pricing.getByText("$14", { exact: true })).toBeVisible();
  await pricing.getByRole("button", { name: "Monthly Billing" }).click();
  await expect(pricing.getByText("$19", { exact: true })).toBeVisible();
});

test("FAQ answers open one at a time", async ({ page }) => {
  const questions = page.locator("#faq").getByRole("button", { expanded: true });
  await expect(questions).toHaveCount(1); // the first answer starts open

  const second = page.getByRole("button", { name: /How long can generated AI cartoon videos be/ });
  await second.click();
  await expect(second).toHaveAttribute("aria-expanded", "true");
  await expect(questions).toHaveCount(1);
});
