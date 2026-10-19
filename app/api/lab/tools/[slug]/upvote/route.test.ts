import { NextRequest } from "next/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { resetLabStore, VISITOR_COOKIE } from "@/lib/lab/store";
import { SEED_TOOLS } from "@/lib/lab/tools";
import { POST } from "./route";

const inkpal = SEED_TOOLS.find((tool) => tool.slug === "inkpal")!;

function vote(slug: string, visitorId?: string) {
  return POST(
    new NextRequest(`http://localhost/api/lab/tools/${slug}/upvote`, {
      method: "POST",
      headers: visitorId ? { cookie: `${VISITOR_COOKIE}=${visitorId}` } : {},
    }),
    { params: Promise.resolve({ slug }) }
  );
}

const visitor = (n: number) => `00000000-0000-4000-8000-${String(n).padStart(12, "0")}`;

beforeEach(() => {
  vi.stubEnv("LAB_ENABLED", "1");
  resetLabStore();
});
afterEach(() => {
  vi.unstubAllEnvs();
});

describe("POST /api/lab/tools/[slug]/upvote", () => {
  it("counts a first-time visitor's vote and gives them a visitor cookie", async () => {
    const res = await vote("inkpal");
    expect(await res.json()).toEqual({ count: inkpal.upvotes + 1, alreadyVoted: false });
    expect(res.headers.get("set-cookie")).toMatch(new RegExp(`^${VISITOR_COOKIE}=[0-9a-f-]{36};.*HttpOnly`, "i"));
  });

  it("doesn't count the same visitor twice", async () => {
    await vote("inkpal", visitor(1));
    const second = await vote("inkpal", visitor(1));
    expect(await second.json()).toEqual({ count: inkpal.upvotes + 1, alreadyVoted: true });
  });

  it("counts different visitors separately", async () => {
    await vote("inkpal", visitor(1));
    const res = await vote("inkpal", visitor(2));
    expect((await res.json()).count).toBe(inkpal.upvotes + 2);
  });

  it("counts 25 votes arriving at the same moment correctly", async () => {
    await Promise.all(Array.from({ length: 25 }, (_, i) => vote("inkpal", visitor(i))));
    const check = await vote("inkpal", visitor(0));
    expect((await check.json()).count).toBe(inkpal.upvotes + 25);
  });

  it("replaces a forged visitor cookie with a fresh one", async () => {
    const res = await vote("inkpal", "admin'; DROP TABLE votes;--");
    expect(res.headers.get("set-cookie")).toMatch(/^lab_visitor=[0-9a-f-]{36};/);
  });

  it("returns 404 for a tool that doesn't exist", async () => {
    const res = await vote("not-a-tool", visitor(1));
    expect(res.status).toBe(404);
  });
});
