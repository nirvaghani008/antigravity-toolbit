import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/contact");
});

test("a valid message goes through the real API and shows the thank-you panel", async ({ page }) => {
  test.skip(!!process.env.BASE_URL, "Don't send real messages to the live site");

  await page.getByLabel("Your Name").fill("Maya Lin");
  await page.getByLabel("Email Address").fill("maya@studio.com");
  await page.getByLabel("Subject / Topic").selectOption("Press & Media");
  await page.getByLabel("Your Message").fill("Can we interview your founders next week?");

  const apiResponse = page.waitForResponse("**/api/contact");
  await page.getByRole("button", { name: "Send Message" }).click();
  expect((await apiResponse).status()).toBe(200);
  await expect(page.getByText("Message Received!")).toBeVisible();
});

test("the browser blocks an empty form before anything is sent", async ({ page }) => {
  let sent = false;
  page.on("request", (req) => {
    if (req.url().includes("/api/contact")) sent = true;
  });

  await page.getByRole("button", { name: "Send Message" }).click();

  const nameMissing = await page
    .getByLabel("Your Name")
    .evaluate((input: HTMLInputElement) => input.validity.valueMissing);
  expect(nameMissing).toBe(true);
  expect(sent).toBe(false);
});

test("a too-short message shows the form's own error", async ({ page }) => {
  await page.getByLabel("Your Name").fill("Maya Lin");
  await page.getByLabel("Email Address").fill("maya@studio.com");
  await page.getByLabel("Your Message").fill("Hi");
  await page.getByRole("button", { name: "Send Message" }).click();

  await expect(page.getByText("Message must be at least 10 characters long")).toBeVisible();
});

test("the API rejects bad data even when the form is bypassed", async ({ request }) => {
  const res = await request.post("/api/contact", {
    data: { name: "Maya", email: "not-an-email", message: "Long enough message" },
  });
  expect(res.status()).toBe(400);
  expect(await res.json()).toEqual({ error: "Please enter a valid email address" });

  const broken = await request.post("/api/contact", {
    headers: { "Content-Type": "application/json" },
    data: "{ not json",
  });
  expect(broken.status()).toBe(400);
});
