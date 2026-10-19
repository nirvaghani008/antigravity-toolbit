import { describe, expect, it } from "vitest";
import { parseToolFilters, searchTools, SEED_TOOLS, type Tool, type ToolFilters } from "./tools";

const names = (filters: Partial<ToolFilters>) =>
  searchTools(SEED_TOOLS, { q: "", category: null, pricing: null, sort: "popular", ...filters }).map((t) => t.name);

describe("parseToolFilters", () => {
  it("reads valid values from the URL", () => {
    expect(parseToolFilters({ q: " anime ", category: "Image", pricing: "paid", sort: "newest" })).toEqual({
      q: "anime",
      category: "Image",
      pricing: "paid",
      sort: "newest",
    });
  });

  it("ignores unknown or hand-edited values instead of crashing", () => {
    expect(parseToolFilters({ category: "Weapons", pricing: "cheap", sort: "DROP TABLE" })).toEqual({
      q: "",
      category: null,
      pricing: null,
      sort: "popular",
    });
  });

  it("uses the first value when a parameter appears twice (?q=a&q=b)", () => {
    expect(parseToolFilters({ q: ["anime", "video"] }).q).toBe("anime");
  });

  it("sorts by best match when searching, and by popularity when browsing", () => {
    expect(parseToolFilters({ q: "anime" }).sort).toBe("relevance");
    expect(parseToolFilters({}).sort).toBe("popular");
  });

  it("caps very long search text", () => {
    expect(parseToolFilters({ q: "a".repeat(500) }).q).toHaveLength(80);
  });
});

describe("searchTools", () => {
  it("ranks a name match above a tag match above a description match, whatever the upvotes", () => {
    const base = { ...SEED_TOOLS[0], tags: [] as string[], tagline: "A tool" };
    const tools: Tool[] = [
      { ...base, slug: "diary", name: "Daily Diary", tagline: "Keep an anime-style journal", upvotes: 900 },
      { ...base, slug: "sketch", name: "Sketchbook", tags: ["anime"], upvotes: 500 },
      { ...base, slug: "studio", name: "Anime Studio", upvotes: 1 },
    ];
    const ranked = searchTools(tools, parseToolFilters({ q: "anime" })).map((t) => t.name);
    expect(ranked).toEqual(["Anime Studio", "Sketchbook", "Daily Diary"]);
  });

  it("ignores upper/lower case", () => {
    expect(names({ q: "CAPTIONS" })).toEqual(["ClipCaption", "Reelsmith"]);
  });

  it("combines category and pricing filters", () => {
    expect(names({ category: "Video", pricing: "free" })).toEqual(["ClipCaption"]);
  });

  it("returns nothing when no tool matches", () => {
    expect(names({ q: "spreadsheet" })).toEqual([]);
  });

  it("sorts by upvotes, most first", () => {
    const upvotes = searchTools(SEED_TOOLS, parseToolFilters({})).map((t) => t.upvotes);
    expect(upvotes).toEqual([...upvotes].sort((a, b) => b - a));
  });

  it("sorts by launch date, newest first", () => {
    expect(names({ sort: "newest" }).slice(0, 3)).toEqual(["PixelBrew", "InkPal", "Plotline"]);
  });

  it("doesn't change the list it was given", () => {
    const before = SEED_TOOLS.map((t) => t.slug);
    searchTools(SEED_TOOLS, parseToolFilters({ sort: "newest" }));
    expect(SEED_TOOLS.map((t) => t.slug)).toEqual(before);
  });
});
