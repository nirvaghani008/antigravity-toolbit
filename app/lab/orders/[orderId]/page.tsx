import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import { PLANS, normalizePaidPlanId, type OrderStatus, type PlanId } from "@/lib/lab/order-rules";
import { getLabStore, getOrder } from "@/lib/lab/store";

export const metadata: Metadata = { title: "Order" };

const STATUS: Record<OrderStatus, { heading: string; badge: "emerald" | "amber" | "pink" | "neutral"; label: string }> = {
  completed: { heading: "Payment received", badge: "emerald", label: "Paid" },
  pending: { heading: "Waiting for payment", badge: "amber", label: "Pending" },
  failed: { heading: "Payment declined", badge: "pink", label: "Declined" },
  refunded: { heading: "Order refunded", badge: "neutral", label: "Refunded" },
};

const SUBMISSION_STATUS = {
  fast_tracked: "Fast-tracked: review within 48 hours",
  in_review: "In the free review queue",
  awaiting_payment: "Waiting for payment before review",
};

export default async function OrderPage({ params }: { params: Promise<{ orderId: string }> }) {
  const { orderId } = await params;
  const found = getOrder(getLabStore(), orderId);
  if (!found) notFound();
  const { order, submission, emails } = found;
  const status = STATUS[order.status];

  return (
    <div className="max-w-2xl space-y-6">
      <div className="space-y-2">
        <Badge variant={status.badge} size="md">{status.label}</Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">{status.heading}</h1>
      </div>

      <Card variant="glass" hover={false} className="p-6 border-slate-800/80">
        <dl className="grid grid-cols-[max-content_1fr] gap-x-6 gap-y-3 text-sm">
          <dt className="text-slate-500">Tool</dt>
          <dd className="text-slate-100">{submission?.name}</dd>
          <dt className="text-slate-500">Plan</dt>
          <dd className="text-slate-100">{PLANS[normalizePaidPlanId(order.plan_id) as PlanId]?.label ?? order.plan_id}</dd>
          <dt className="text-slate-500">Amount</dt>
          <dd className="text-slate-100 font-mono">${order.amount_usd}</dd>
          <dt className="text-slate-500">Listing</dt>
          <dd className="text-slate-100">{submission ? SUBMISSION_STATUS[submission.status] : "Unknown"}</dd>
          <dt className="text-slate-500">Order</dt>
          <dd className="text-slate-400 font-mono">{order.id}</dd>
        </dl>
      </Card>

      <section className="space-y-2" aria-labelledby="emails-heading">
        <h2 id="emails-heading" className="text-base font-bold text-white">Emails sent</h2>
        {emails.length === 0 ? (
          <p className="text-sm text-slate-500">None yet.</p>
        ) : (
          <ul className="space-y-1 text-sm text-slate-300">
            {emails.map((email) => (
              <li key={`${email.subject}-${email.sentAt}`}>
                {email.subject} <span className="text-slate-500">to {email.to}</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      {(order.status === "pending" || order.status === "failed") && (
        <Link href={`/lab/checkout/${order.id}`} className="inline-block text-sm text-purple-300 underline hover:text-purple-200">
          {order.status === "failed" ? "Try payment again" : "Go to checkout"}
        </Link>
      )}
    </div>
  );
}
