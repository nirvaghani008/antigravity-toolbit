import React from "react";
import type { Metadata } from "next";
import Card from "@/components/ui/Card";
import SubmitToolForm from "@/components/lab/SubmitToolForm";

export const metadata: Metadata = { title: "Submit a tool" };

export default function SubmitToolPage() {
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[3fr_2fr]">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Submit a tool</h1>
          <p className="text-slate-400 text-sm">
            Free listings join the review queue. A paid launch goes through a test checkout first.
          </p>
        </div>
        <Card variant="glass" hover={false} className="p-6 sm:p-8 border-slate-800/80">
          <SubmitToolForm />
        </Card>
      </div>

      <aside className="space-y-3 text-sm text-slate-400">
        <h2 className="text-base font-bold text-white">Things to try</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Submit with empty fields to see every error at once.</li>
          <li>Use <span className="font-mono text-slate-200">www.InkPal.example/</span>. It matches an existing tool, so you get a duplicate error.</li>
          <li>Pick the paid launch, then pay or decline on the test checkout page.</li>
        </ul>
      </aside>
    </div>
  );
}
