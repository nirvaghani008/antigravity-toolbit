// A small directory of made-up AI tools, searched and filtered the way Toolbit's /search is.

export const CATEGORIES = ["Image", "Video", "Writing", "Audio", "Code", "Productivity"] as const;
export type Category = (typeof CATEGORIES)[number];

export const PRICING = ["free", "freemium", "paid"] as const;
export type Pricing = (typeof PRICING)[number];

export const SORTS = ["relevance", "popular", "newest"] as const;
export type Sort = (typeof SORTS)[number];

export interface Tool {
  slug: string;
  name: string;
  tagline: string;
  url: string;
  category: Category;
  pricing: Pricing;
  tags: string[];
  launchedAt: string; // ISO date
  upvotes: number;
}

export const SEED_TOOLS: Tool[] = [
  { slug: "inkpal", name: "InkPal", tagline: "Turn rough sketches into clean comic line art", url: "https://inkpal.example", category: "Image", pricing: "freemium", tags: ["comic", "sketch", "line art"], launchedAt: "2026-10-15", upvotes: 214 },
  { slug: "animora", name: "Animora", tagline: "Anime-style portraits from a single selfie", url: "https://animora.example", category: "Image", pricing: "paid", tags: ["anime", "portrait", "selfie"], launchedAt: "2026-09-02", upvotes: 389 },
  { slug: "reelsmith", name: "Reelsmith", tagline: "Cut long videos into short vertical clips", url: "https://reelsmith.example", category: "Video", pricing: "freemium", tags: ["shorts", "editing", "captions"], launchedAt: "2026-10-01", upvotes: 172 },
  { slug: "toonvoice", name: "ToonVoice", tagline: "Cartoon character voices with lip-sync timing", url: "https://toonvoice.example", category: "Audio", pricing: "paid", tags: ["voice", "lip sync", "animation"], launchedAt: "2026-08-20", upvotes: 95 },
  { slug: "plotline", name: "Plotline", tagline: "Storyboards and scripts for short animations", url: "https://plotline.example", category: "Writing", pricing: "free", tags: ["script", "storyboard", "anime"], launchedAt: "2026-10-12", upvotes: 58 },
  { slug: "clipcaption", name: "ClipCaption", tagline: "Accurate subtitles in 40 languages", url: "https://clipcaption.example", category: "Video", pricing: "free", tags: ["captions", "subtitles", "translation"], launchedAt: "2026-07-14", upvotes: 301 },
  { slug: "pixelbrew", name: "PixelBrew", tagline: "Pixel art sprites and tilesets for games", url: "https://pixelbrew.example", category: "Image", pricing: "free", tags: ["pixel art", "games", "sprites"], launchedAt: "2026-10-18", upvotes: 41 },
  { slug: "codecomic", name: "CodeComic", tagline: "Explain code changes as four-panel comics", url: "https://codecomic.example", category: "Code", pricing: "freemium", tags: ["code review", "comic", "docs"], launchedAt: "2026-06-30", upvotes: 127 },
  { slug: "beatloom", name: "BeatLoom", tagline: "Royalty-free background music for videos", url: "https://beatloom.example", category: "Audio", pricing: "freemium", tags: ["music", "soundtrack"], launchedAt: "2026-09-25", upvotes: 233 },
  { slug: "brieflyai", name: "BrieflyAI", tagline: "Meeting notes and action items in one click", url: "https://brieflyai.example", category: "Productivity", pricing: "paid", tags: ["notes", "meetings", "summary"], launchedAt: "2026-05-11", upvotes: 412 },
];

export interface ToolFilters {
  q: string;
  category: Category | null;
  pricing: Pricing | null;
  sort: Sort;
}

type RawParams = Record<string, string | string[] | undefined>;

function first(value: string | string[] | undefined): string {
  return (Array.isArray(value) ? value[0] : value)?.trim() ?? "";
}

// URL query values come from anyone, so anything unknown falls back to "no filter".
export function parseToolFilters(params: RawParams): ToolFilters {
  const q = first(params.q).slice(0, 80);
  const category = first(params.category);
  const pricing = first(params.pricing);
  const sort = first(params.sort);
  return {
    q,
    category: (CATEGORIES as readonly string[]).includes(category) ? (category as Category) : null,
    pricing: (PRICING as readonly string[]).includes(pricing) ? (pricing as Pricing) : null,
    sort: (SORTS as readonly string[]).includes(sort) ? (sort as Sort) : q ? "relevance" : "popular",
  };
}

// Higher score = better match. 0 means no match.
function matchScore(tool: Tool, query: string): number {
  const q = query.toLowerCase();
  const name = tool.name.toLowerCase();
  if (name === q) return 100;
  if (name.startsWith(q)) return 80;
  if (name.includes(q)) return 60;
  if (tool.tags.some((tag) => tag.toLowerCase() === q)) return 50;
  if (tool.tags.some((tag) => tag.toLowerCase().includes(q))) return 40;
  if (tool.tagline.toLowerCase().includes(q)) return 20;
  return 0;
}

export function searchTools(tools: Tool[], filters: ToolFilters): Tool[] {
  const scored = tools
    .filter((tool) => !filters.category || tool.category === filters.category)
    .filter((tool) => !filters.pricing || tool.pricing === filters.pricing)
    .map((tool) => ({ tool, score: filters.q ? matchScore(tool, filters.q) : 1 }))
    .filter(({ score }) => score > 0);

  const byName = (a: Tool, b: Tool) => a.name.localeCompare(b.name);
  const compare = {
    relevance: (a: (typeof scored)[number], b: (typeof scored)[number]) =>
      b.score - a.score || b.tool.upvotes - a.tool.upvotes || byName(a.tool, b.tool),
    popular: (a: (typeof scored)[number], b: (typeof scored)[number]) =>
      b.tool.upvotes - a.tool.upvotes || byName(a.tool, b.tool),
    newest: (a: (typeof scored)[number], b: (typeof scored)[number]) =>
      b.tool.launchedAt.localeCompare(a.tool.launchedAt) || byName(a.tool, b.tool),
  }[filters.sort];

  return scored.sort(compare).map(({ tool }) => tool);
}
