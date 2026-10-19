import { expect, test, type Page } from "@playwright/test";
import { watchForProblems } from "./helpers";

// The Lab is switched off on the live site.
test.skip(!!process.env.BASE_URL, "The Lab only runs locally and in CI");

const resultNames = (page: Page) => page.getByRole("listitem").getByRole("heading", { level: 2 }).allTextContents();

for (const path of ["/lab", "/lab/tools", "/lab/submit", "/lab/tools/inkpal"]) {
  test(`${path} loads without errors and is hidden from search engines`, async ({ page }) => {
    const problems = watchForProblems(page);
    const res = await page.goto(path);
    expect(res?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex, nofollow");
    expect(problems).toEqual([]);
  });
}

test.describe("tool directory", () => {
  test("search puts the query in the URL and shows the best match first", async ({ page }) => {
    await page.goto("/lab/tools");
    await page.getByLabel("Search tools").fill("comic");
    await page.getByRole("button", { name: "Search" }).click();

    await expect(page).toHaveURL(/[?&]q=comic/);
    // CodeComic matches by name, InkPal only by tag, even though InkPal has more upvotes.
    await expect.poll(() => resultNames(page)).toEqual(["CodeComic", "InkPal"]);
  });

  test("category and price filters work together", async ({ page }) => {
    await page.goto("/lab/tools");
    await page.getByLabel("Category").selectOption("Video");
    await page.getByLabel("Pricing").selectOption("free");
    await page.getByRole("button", { name: "Search" }).click();

    await expect(page.getByRole("status")).toHaveText("1 tool");
    expect(await resultNames(page)).toEqual(["ClipCaption"]);
  });

  test("a search with no results offers a way back", async ({ page }) => {
    await page.goto("/lab/tools?q=spreadsheet");
    await expect(page.getByText("No tools match these filters.")).toBeVisible();

    await page.getByRole("link", { name: "Clear filters" }).click();
    await expect(page).toHaveURL(/\/lab\/tools$/);
    await expect(page.getByRole("status")).toHaveText("10 tools");
  });

  test("hand-edited filters in the URL are ignored, not an error page", async ({ page }) => {
    const res = await page.goto("/lab/tools?category=Weapons&pricing=cheap&sort=%3Cscript%3E");
    expect(res?.status()).toBe(200);
    await expect(page.getByRole("status")).toHaveText("10 tools");
  });

  test("the filters stay filled in after searching, so they can be adjusted", async ({ page }) => {
    await page.goto("/lab/tools?q=music&category=Audio&sort=newest");
    await expect(page.getByLabel("Search tools")).toHaveValue("music");
    await expect(page.getByLabel("Category")).toHaveValue("Audio");
    await expect(page.getByLabel("Sort by")).toHaveValue("newest");
  });
});

test.describe("tool page", () => {
  test("opens from the directory and carries structured data for search engines", async ({ page }) => {
    await page.goto("/lab/tools");
    await page.getByRole("link", { name: "InkPal", exact: true }).click();
    await expect(page).toHaveURL(/\/lab\/tools\/inkpal$/);
    await expect(page).toHaveTitle("InkPal | ToonForge Lab");

    const jsonLd = JSON.parse((await page.locator('script[type="application/ld+json"]').textContent()) ?? "{}");
    expect(jsonLd).toMatchObject({ "@type": "SoftwareApplication", name: "InkPal" });
  });

  test("an unknown tool returns a real 404", async ({ page }) => {
    const res = await page.goto("/lab/tools/no-such-tool");
    expect(res?.status()).toBe(404);
  });

  test("a visitor can upvote once, and the vote is remembered", async ({ page, browser }) => {
    await page.goto("/lab/tools/pixelbrew");
    const count = page.getByTestId("upvote-count");
    const before = Number(await count.textContent());

    await page.getByRole("button", { name: "Upvote PixelBrew" }).click();
    // At least our vote. Other tests running at the same time may add theirs.
    await expect.poll(async () => Number(await count.textContent())).toBeGreaterThan(before);

    await page.reload();
    await expect(page.getByRole("button", { name: "You upvoted PixelBrew" })).toBeDisabled();

    // A different visitor (a fresh browser with no cookies) can still vote.
    const otherVisitor = await browser.newContext();
    const otherPage = await otherVisitor.newPage();
    await otherPage.goto(page.url());
    await expect(otherPage.getByRole("button", { name: "Upvote PixelBrew" })).toBeEnabled();
    await otherVisitor.close();
  });
});
