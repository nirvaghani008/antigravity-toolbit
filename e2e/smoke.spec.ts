import { expect, test } from "@playwright/test";
import { scrollThroughPage, watchForProblems } from "./helpers";

// Every public page must load, render its heading and run without errors.
const pages = [
  { path: "/", heading: /Turn Any Idea/i },
  { path: "/about", heading: /./ },
  { path: "/contact", heading: "Get in Touch" },
];

for (const { path, heading } of pages) {
  test(`${path} loads without errors or broken images`, async ({ page }) => {
    const problems = watchForProblems(page);

    const res = await page.goto(path);
    expect(res?.status()).toBe(200);
    await expect(page).toHaveTitle(/ToonForge AI/);
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(heading);

    await scrollThroughPage(page);
    const brokenImages = await page.$$eval("img", (imgs) =>
      imgs.filter((img) => img.complete && img.naturalWidth === 0).map((img) => img.src)
    );
    expect(brokenImages).toEqual([]);
    expect(problems).toEqual([]);
  });
}

test("an unknown page returns 404", async ({ page }) => {
  const res = await page.goto("/this-page-does-not-exist");
  expect(res?.status()).toBe(404);
});

test("sitemap.xml lists every page", async ({ request }) => {
  const res = await request.get("/sitemap.xml");
  expect(res.status()).toBe(200);
  const xml = await res.text();
  for (const path of ["", "/about", "/contact"]) {
    expect(xml).toContain(`<loc>https://toonforge.ai${path}</loc>`);
  }
});

test("robots.txt blocks the API and points at the sitemap", async ({ request }) => {
  const res = await request.get("/robots.txt");
  expect(res.status()).toBe(200);
  const text = await res.text();
  expect(text).toContain("Disallow: /api/");
  expect(text).toContain("Sitemap: https://toonforge.ai/sitemap.xml");
});
