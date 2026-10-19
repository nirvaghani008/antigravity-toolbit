import type { Tool } from "./tools";

const PRICE_USD: Record<Tool["pricing"], number> = { free: 0, freemium: 0, paid: 49 };

// schema.org data that lets search engines show a tool as an app with a price.
export function buildToolJsonLd(tool: Tool, siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    description: tool.tagline,
    url: `${siteUrl}/lab/tools/${tool.slug}`,
    sameAs: tool.url,
    applicationCategory: `${tool.category}Application`,
    operatingSystem: "Web",
    datePublished: tool.launchedAt,
    offers: {
      "@type": "Offer",
      price: PRICE_USD[tool.pricing].toFixed(2),
      priceCurrency: "USD",
    },
  };
}

// JSON goes inside a <script> tag, so a tool named "</script><script>..." must not
// be able to close it early. Escaping "<" keeps the JSON valid and the page safe.
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
