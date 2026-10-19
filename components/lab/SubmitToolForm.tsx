"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Textarea from "@/components/ui/Textarea";
import { CheckIcon } from "@/components/Icons";
import { PLANS, type PlanId } from "@/lib/lab/order-rules";
import { validateSubmission, type SubmissionErrors } from "@/lib/lab/submission-validation";
import { CATEGORIES } from "@/lib/lab/tools";

const EMPTY = { name: "", url: "", email: "", category: "", description: "", plan: "free_listing" as PlanId };

const PLAN_DETAILS: Record<PlanId, string> = {
  free_listing: "Reviewed in about 2 weeks",
  paid_launch: "Reviewed in 48 hours and featured on launch day",
};

export default function SubmitToolForm() {
  const router = useRouter();
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState<SubmissionErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [queued, setQueued] = useState<{ name: string; id: string } | null>(null);

  const set = (field: keyof typeof EMPTY) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm({ ...form, [field]: e.target.value });

  const price = PLANS[form.plan].priceUsd;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);
    const found = validateSubmission(form);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setLoading(true);
    try {
      const res = await fetch("/api/lab/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrors(data.errors ?? {});
        setServerError(data.error ?? "Something went wrong. Please try again.");
        return;
      }
      if (data.checkoutUrl) {
        router.push(data.checkoutUrl);
        return;
      }
      setQueued({ name: form.name.trim(), id: data.submissionId });
      setForm(EMPTY);
    } catch {
      setServerError("Couldn't reach the server. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  if (queued) {
    return (
      <div className="p-8 bg-emerald-950/60 border border-emerald-800/80 rounded-2xl space-y-3" role="status">
        <div className="flex items-center gap-3">
          <CheckIcon className="w-6 h-6 text-emerald-300" />
          <h2 className="text-xl font-bold text-emerald-200">{queued.name} is in the review queue</h2>
        </div>
        <p className="text-sm text-emerald-300/80">
          Free listings are reviewed in about 2 weeks. Reference: <span className="font-mono">{queued.id}</span>
        </p>
        <Button type="button" variant="outline" size="sm" onClick={() => setQueued(null)}>
          Submit another tool
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {serverError && (
        <div role="alert" className="p-4 rounded-xl bg-rose-950/60 border border-rose-800/80 text-rose-300 text-sm">
          {serverError}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input label="Tool name" value={form.name} onChange={set("name")} error={errors.name} placeholder="e.g. InkPal" />
        <Input
          label="Website URL"
          inputMode="url"
          value={form.url}
          onChange={set("url")}
          error={errors.url}
          placeholder="https://yourtool.com"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input label="Your email" type="email" value={form.email} onChange={set("email")} error={errors.email} placeholder="you@studio.com" />
        <Select
          label="Category"
          value={form.category}
          onChange={set("category")}
          error={errors.category}
          options={[{ value: "", label: "Select…" }, ...CATEGORIES.map((c) => ({ value: c, label: c }))]}
        />
      </div>

      <Textarea
        label="Short description"
        rows={3}
        value={form.description}
        onChange={set("description")}
        error={errors.description}
        helperText={`${form.description.trim().length}/280 characters`}
      />

      <fieldset className="space-y-2">
        <legend className="block text-xs font-semibold text-slate-200 tracking-wide mb-1.5">Listing plan</legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {(Object.keys(PLANS) as PlanId[]).map((plan) => (
            <label
              key={plan}
              className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 ${
                form.plan === plan ? "border-purple-500/70 bg-purple-950/30" : "border-slate-800 bg-slate-900/60"
              }`}
            >
              <input
                type="radio"
                name="plan"
                value={plan}
                checked={form.plan === plan}
                onChange={() => setForm({ ...form, plan })}
                className="mt-1 accent-purple-500"
              />
              <span className="space-y-0.5">
                <span className="block text-sm font-semibold text-white">
                  {PLANS[plan].label} · ${PLANS[plan].priceUsd}
                </span>
                <span className="block text-xs text-slate-400">{PLAN_DETAILS[plan]}</span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <Button type="submit" variant="primary" size="lg" isLoading={loading} className="w-full font-bold">
        {price > 0 ? `Continue to payment ($${price})` : "Submit for review"}
      </Button>
    </form>
  );
}
