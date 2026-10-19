import { expect, test } from "@playwright/test";

// Runs on a phone-sized screen (see the "mobile" project in playwright.config.ts).

for (const path of ["/", "/about", "/contact"]) {
  test(`${path} fits the phone screen without sideways scrolling`, async ({ page }) => {
    await page.goto(path);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth
    );
    expect(overflow).toBeLessThanOrEqual(0);
  });
}

test("the menu button opens the menu and its links navigate", async ({ page }) => {
  await page.goto("/");
  const contactLink = page.locator("header").getByRole("link", { name: "Contact" });
  await expect(contactLink).toBeHidden();

  await page.getByRole("button", { name: "Toggle menu" }).click();
  await expect(contactLink).toBeVisible();

  await contactLink.click();
  await expect(page).toHaveURL(/\/contact$/);
  await expect(contactLink).toBeHidden(); // the menu closes after choosing a page
});
