import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import Badge from "@/components/ui/Badge";
import UpvoteButton from "@/components/lab/UpvoteButton";
import { formatLaunchDate } from "@/lib/lab/dates";
import { buildToolJsonLd, serializeJsonLd } from "@/lib/lab/seo";
import { getLabStore, getTool, hasVoted, VISITOR_COOKIE } from "@/lib/lab/store";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tool = getTool(getLabStore(), slug);
  return tool ? { title: tool.name, description: tool.tagline } : { title: "Tool not found" };
}

export default async function ToolPage({ params }: Props) {
  const { slug } = await params;
  const store = getLabStore();
  const tool = getTool(store, slug);
  if (!tool) notFound();

  const visitorId = (await cookies()).get(VISITOR_COOKIE)?.value;

  return (
    <article className="space-y-8 max-w-3xl">
      <script
        type="application/ld+json"
        // Escaped by serializeJsonLd so tool text can't break out of the script tag.
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildToolJsonLd(tool, "https://toonforge.ai")) }}
      />
      <Link href="/lab/tools" className="text-sm text-slate-400 hover:text-white">
        ← All tools
      </Link>
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="purple" size="sm">{tool.category}</Badge>
          <Badge variant={tool.pricing === "paid" ? "amber" : "emerald"} size="sm">{tool.pricing}</Badge>
          <span className="text-xs text-slate-500">{formatLaunchDate(tool.launchedAt)}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">{tool.name}</h1>
        <p className="text-lg text-slate-300">{tool.tagline}</p>
      </div>

      <UpvoteButton
        slug={tool.slug}
        toolName={tool.name}
        initialCount={tool.upvotes}
        initialVoted={hasVoted(store, tool.slug, visitorId)}
      />

      <dl className="grid grid-cols-[max-content_1fr] gap-x-6 gap-y-2 text-sm">
        <dt className="text-slate-500">Website</dt>
        <dd className="text-slate-200 font-mono">{tool.url.replace("https://", "")}</dd>
        <dt className="text-slate-500">Tags</dt>
        <dd className="text-slate-200">{tool.tags.join(", ")}</dd>
      </dl>
    </article>
  );
}
