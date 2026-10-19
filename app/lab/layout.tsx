import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import Badge from "@/components/ui/Badge";
import { isLabEnabled } from "@/lib/lab/enabled";

export const metadata: Metadata = {
  title: { default: "ToonForge Lab", template: "%s | ToonForge Lab" },
  robots: { index: false, follow: false },
};

const LAB_LINKS = [
  { href: "/lab", label: "Overview" },
  { href: "/lab/tools", label: "Tool directory" },
  { href: "/lab/submit", label: "Submit a tool" },
];

export default async function LabLayout({ children }: { children: React.ReactNode }) {
  // Check per request, so LAB_ENABLED on the server decides, not the build.
  await connection();
  if (!isLabEnabled()) notFound();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-20 space-y-8">
      <div className="flex flex-col gap-3 rounded-2xl border border-amber-500/30 bg-amber-950/20 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <Badge variant="amber" size="sm">
            Lab
          </Badge>
          <p className="text-xs text-amber-100/80 leading-relaxed">
            Practice features that copy Toolbit&apos;s flows, built for trying out tests. Hidden on the live site.
          </p>
        </div>
        <nav aria-label="Lab" className="flex flex-wrap gap-2">
          {LAB_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:border-slate-700"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
      {children}
    </div>
  );
}
