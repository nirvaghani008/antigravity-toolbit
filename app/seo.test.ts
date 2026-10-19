import { describe, expect, it } from "vitest";
import robots from "./robots";
import sitemap from "./sitemap";

describe("sitemap.xml", () => {
  it("lists every public page on the production domain", () => {
    const urls = sitemap().map((entry) => entry.url);
    expect(urls).toEqual([
      "https://toonforge.ai",
      "https://toonforge.ai/about",
      "https://toonforge.ai/contact",
    ]);
  });
});

describe("robots.txt", () => {
  it("lets crawlers in, keeps them out of the API, and points at the sitemap", () => {
    const { rules, sitemap: sitemapUrl } = robots();
    expect(rules).toMatchObject({ userAgent: "*", allow: "/", disallow: "/api/" });
    expect(sitemapUrl).toBe("https://toonforge.ai/sitemap.xml");
  });
});
