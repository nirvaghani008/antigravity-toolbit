import { expect, test, type Page } from "@playwright/test";

test.skip(!!process.env.BASE_URL, "The Lab only runs locally and in CI");

// Tests share one server, so each one submits a website nobody else uses.
const uniqueId = () => `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`;

async function fillSubmitForm(page: Page, plan: "Free listing" | "Paid launch") {
  const id = uniqueId();
  const name = `Tool ${id}`;
  await page.goto("/lab/submit");
  await page.getByLabel("Tool name").fill(name);
  await page.getByLabel("Website URL").fill(`${id}.example`);
  await page.getByLabel("Your email").fill(`founder+${id}@studio.com`);
  await page.getByLabel("Category").selectOption("Video");
  await page.getByLabel("Short description").fill("Generates storyboards from a script.");
  await page.getByRole("radio", { name: new RegExp(plan) }).check();
  return { name, email: `founder+${id}@studio.com` };
}

test("a free listing goes straight to the review queue", async ({ page }) => {
  const { name } = await fillSubmitForm(page, "Free listing");
  await page.getByRole("button", { name: "Submit for review" }).click();
  await expect(page.getByRole("heading", { name: `${name} is in the review queue` })).toBeVisible();
});

test("paid launch: checkout, signed webhook, receipt and fast track", async ({ page }) => {
  const { name, email } = await fillSubmitForm(page, "Paid launch");
  await page.getByRole("button", { name: "Continue to payment ($49)" }).click();

  // On the pretend payment provider's page.
  await expect(page).toHaveURL(/\/lab\/checkout\/ord_/);
  await expect(page.getByText(`Paid launch for ${name}`)).toBeVisible();
  await page.getByRole("button", { name: "Pay $49 with test card" }).click();

  // Back on our site, after the webhook was verified and processed.
  await expect(page).toHaveURL(/\/lab\/orders\/ord_/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Payment received");
  await expect(page.getByText("Fast-tracked: review within 48 hours")).toBeVisible();
  await expect(page.getByText(`Receipt: paid launch for ${name}`)).toContainText(email);

  // Going back to checkout can't charge the same order twice.
  await page.goBack();
  await page.reload();
  await expect(page.getByText("This order is already completed.")).toBeVisible();
  await expect(page.getByRole("button", { name: /Pay \$49/ })).toHaveCount(0);
});

test("paid launch: a declined card can be retried", async ({ page }) => {
  await fillSubmitForm(page, "Paid launch");
  await page.getByRole("button", { name: "Continue to payment ($49)" }).click();
  await page.getByRole("button", { name: "Simulate a declined card" }).click();

  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Payment declined");
  await expect(page.getByText("None yet.")).toBeVisible(); // no receipt for a failed payment

  await page.getByRole("link", { name: "Try payment again" }).click();
  await expect(page.getByText("Your last payment was declined.")).toBeVisible();
  await page.getByRole("button", { name: "Pay $49 with test card" }).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Payment received");
});

test("a website that's already listed is refused", async ({ page }) => {
  await fillSubmitForm(page, "Free listing");
  await page.getByLabel("Website URL").fill("www.InkPal.example/");
  await page.getByRole("button", { name: "Submit for review" }).click();

  // Next.js has its own hidden role="alert" for page changes, so pick ours by its text.
  await expect(page.getByRole("alert").filter({ hasText: "InkPal is already listed" })).toBeVisible();
  await expect(page.getByText("This website has already been submitted")).toBeVisible();
});

test("an empty form shows every problem and sends nothing", async ({ page }) => {
  let sent = false;
  page.on("request", (req) => {
    if (req.url().includes("/api/lab/submissions")) sent = true;
  });
  await page.goto("/lab/submit");
  await page.getByRole("button", { name: "Submit for review" }).click();

  await expect(page.getByText("Website URL is required")).toBeVisible();
  await expect(page.getByText("Choose a category")).toBeVisible();
  expect(sent).toBe(false);
});

test("the payment webhook refuses an unsigned request from outside", async ({ request }) => {
  const res = await request.post("/api/lab/webhooks/payments", {
    data: { id: "evt_fake", type: "payment.succeeded", created: 0, data: { order_id: "ord_x", amount_usd: 49 } },
  });
  expect(res.status()).toBe(401);
});
