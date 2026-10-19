import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Card from "@/components/ui/Card";

export const metadata: Metadata = { title: "Overview" };

const FEATURES = [
  {
    title: "Tool directory and search",
    href: "/lab/tools",
    toolbit: "Toolbit's /search",
    what: "Search by name or tag, filter by category and price, sort by popularity or launch date. Filters live in the URL.",
    tests: ["lib/lab/tools.test.ts", "e2e/lab-directory.spec.ts"],
  },
  {
    title: "Tool pages and upvotes",
    href: "/lab/tools/inkpal",
    toolbit: "Tool pages and the increment_counter RPC",
    what: "One upvote per visitor, structured data for search engines, and “Launched 3 days ago” labels.",
    tests: ["app/api/lab/tools/[slug]/upvote/route.test.ts", "components/lab/UpvoteButton.test.tsx", "lib/lab/seo.test.ts", "lib/lab/dates.test.ts"],
  },
  {
    title: "Submit a tool",
    href: "/lab/submit",
    toolbit: "Toolbit's /submit",
    what: "Validated form, duplicate-website check, and a choice between a free listing and a $49 paid launch.",
    tests: ["lib/lab/submission-validation.test.ts", "app/api/lab/submissions/route.test.ts", "components/lab/SubmitToolForm.test.tsx"],
  },
  {
    title: "Checkout and payment webhook",
    href: "/lab/submit",
    toolbit: "Dodo checkout, the signed webhook and utils/orders.ts",
    what: "A fake payment page sends a signed webhook. Checks signatures, replays, duplicate deliveries, refunds and who counts as paid.",
    tests: ["lib/lab/order-rules.test.ts", "lib/lab/webhook-signature.test.ts", "lib/lab/payments.test.ts", "app/api/lab/webhooks/payments/route.test.ts", "e2e/lab-checkout.spec.ts"],
  },
];

export default function LabOverviewPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-3 max-w-3xl">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">Testing Lab</h1>
        <p className="text-slate-300 leading-relaxed">
          Each feature here works like one on Toolbit, with tests at every level. Use it to see what tests for the
          real site will look like before writing them there.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {FEATURES.map((feature) => (
          <Card key={feature.title} variant="glass" hover={false} className="p-6 space-y-3 border-slate-800/80">
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-white">
                <Link href={feature.href} className="hover:text-purple-300">
                  {feature.title}
                </Link>
              </h2>
              <p className="text-xs font-mono text-purple-300/90">Copies: {feature.toolbit}</p>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">{feature.what}</p>
            <ul className="space-y-1">
              {feature.tests.map((file) => (
                <li key={file} className="text-[11px] font-mono text-slate-400 break-all">
                  {file}
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </div>
  );
}
