import { randomUUID } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";
import { isLabEnabled, labDisabledResponse } from "@/lib/lab/enabled";
import { castVote, getLabStore, VISITOR_COOKIE } from "@/lib/lab/store";

// One upvote per visitor per tool. A visitor is identified by a cookie set on
// their first vote.
export async function POST(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  if (!isLabEnabled()) return labDisabledResponse();

  const { slug } = await params;
  const existing = request.cookies.get(VISITOR_COOKIE)?.value;
  const visitorId = existing && /^[0-9a-f-]{36}$/.test(existing) ? existing : randomUUID();

  const result = castVote(getLabStore(), slug, visitorId);
  if (!result) {
    return NextResponse.json({ error: "Tool not found" }, { status: 404 });
  }

  const response = NextResponse.json({ count: result.count, alreadyVoted: result.alreadyVoted });
  if (visitorId !== existing) {
    response.cookies.set(VISITOR_COOKIE, visitorId, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
    });
  }
  return response;
}
