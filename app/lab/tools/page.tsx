import React from "react";
import type { Metadata } from "next";
import Form from "next/form";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { formatLaunchDate } from "@/lib/lab/dates";
import { getLabStore, listTools } from "@/lib/lab/store";
import { CATEGORIES, PRICING, parseToolFilters, searchTools } from "@/lib/lab/tools";

export const metadata: Metadata = { title: "Tool directory" };

export default async function ToolDirectoryPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const filters = parseToolFilters(params);
  const results = searchTools(listTools(getLabStore()), filters);
  // "Recommended" sends no sort, so a search ranks by best match and browsing by upvotes.
  const chosenSort = params.sort === "popular" || params.sort === "newest" ? params.sort : "";
  const now = new Date();

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Tool directory</h1>
        <p className="text-slate-400 text-sm">Search works on names, tags and descriptions. Filters are kept in the address bar, so results can be shared.</p>
      </div>

      {/* GET form: submitting puts the filters in the URL, e.g. /lab/tools?q=anime&category=Image */}
      <Form action="/lab/tools" className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr_auto] lg:items-end">
        <Input label="Search tools" name="q" type="search" defaultValue={filters.q} placeholder="Try “anime” or “captions”" />
        <Select
          label="Category"
          name="category"
          defaultValue={filters.category ?? ""}
          options={[{ value: "", label: "All categories" }, ...CATEGORIES.map((c) => ({ value: c, label: c }))]}
        />
        <Select
          label="Pricing"
          name="pricing"
          defaultValue={filters.pricing ?? ""}
          options={[{ value: "", label: "Any price" }, ...PRICING.map((p) => ({ value: p, label: p[0].toUpperCase() + p.slice(1) }))]}
        />
        <Select
          label="Sort by"
          name="sort"
          defaultValue={chosenSort}
          options={[
            { value: "", label: "Recommended" },
            { value: "popular", label: "Most upvoted" },
            { value: "newest", label: "Newest" },
          ]}
        />
        <Button type="submit" variant="primary" size="md" className="h-[46px]">
          Search
        </Button>
      </Form>

      <p role="status" className="text-sm text-slate-400">
        {results.length === 1 ? "1 tool" : `${results.length} tools`}
        {filters.q && <> matching “{filters.q}”</>}
      </p>

      {results.length === 0 ? (
        <Card variant="subtle" hover={false} className="p-8 text-center space-y-3">
          <p className="text-slate-200 font-semibold">No tools match these filters.</p>
          <Link href="/lab/tools" className="text-sm text-purple-300 hover:text-purple-200 underline">
            Clear filters
          </Link>
        </Card>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {results.map((tool) => (
            <li key={tool.slug}>
              <Card variant="glass" className="h-full p-5 space-y-3 border-slate-800/80">
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-lg font-bold text-white">
                    <Link href={`/lab/tools/${tool.slug}`} className="hover:text-purple-300">
                      {tool.name}
                    </Link>
                  </h2>
                  <span className="font-mono text-xs text-purple-300 whitespace-nowrap">▲ {tool.upvotes}</span>
                </div>
                <p className="text-sm text-slate-300">{tool.tagline}</p>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="purple" size="sm">{tool.category}</Badge>
                  <Badge variant={tool.pricing === "paid" ? "amber" : "emerald"} size="sm">{tool.pricing}</Badge>
                  <span className="text-[11px] text-slate-500">{formatLaunchDate(tool.launchedAt, now)}</span>
                </div>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
