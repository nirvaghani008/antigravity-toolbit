import { describe, expect, it } from "vitest";
import { buildToolJsonLd, serializeJsonLd } from "./seo";
import { SEED_TOOLS, type Tool } from "./tools";

const inkpal = SEED_TOOLS.find((tool) => tool.slug === "inkpal")!;

describe("tool structured data (JSON-LD)", () => {
  it("describes the tool as a web app with a price", () => {
    expect(buildToolJsonLd(inkpal, "https://toonforge.ai")).toMatchObject({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "InkPal",
      url: "https://toonforge.ai/lab/tools/inkpal",
      applicationCategory: "ImageApplication",
      offers: { "@type": "Offer", price: "0.00", priceCurrency: "USD" },
    });
  });

  it("gives paid tools a non-zero price", () => {
    const paid = SEED_TOOLS.find((tool) => tool.pricing === "paid")!;
    expect(buildToolJsonLd(paid, "https://toonforge.ai").offers.price).toBe("49.00");
  });

  it("can't be used to inject a script through a tool's name", () => {
    const evil: Tool = { ...inkpal, name: '</script><script>alert("hacked")</script>' };
    const html = serializeJsonLd(buildToolJsonLd(evil, "https://toonforge.ai"));

    expect(html).not.toContain("</script>");
    // Still valid JSON that reads back to the original name.
    expect(JSON.parse(html).name).toBe(evil.name);
  });
});
