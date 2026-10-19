import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CheckoutButtons from "@/components/lab/CheckoutButtons";
import { PLANS, normalizePaidPlanId, type PlanId } from "@/lib/lab/order-rules";
import { getLabStore, getOrder } from "@/lib/lab/store";

export const metadata: Metadata = { title: "Test checkout" };

// Styled like a separate payment provider's page on purpose: in real life the
// visitor leaves the site to pay.
export default async function CheckoutPage({ params }: { params: Promise<{ orderId: string }> }) {
  const { orderId } = await params;
  const found = getOrder(getLabStore(), orderId);
  if (!found) notFound();
  const { order, submission } = found;
  const canPay = order.status === "pending" || order.status === "failed";

  return (
    <div className="mx-auto max-w-md rounded-2xl bg-white p-6 sm:p-8 text-slate-900 shadow-2xl space-y-6">
      <div className="flex items-center justify-between">
        <span className="font-bold tracking-tight text-indigo-700">TestPay</span>
        <span className="rounded bg-amber-100 px-2 py-0.5 text-[11px] font-semibold text-amber-800">Sandbox</span>
      </div>

      <div className="space-y-1">
        <h1 className="text-2xl font-bold">Pay ToonForge Lab</h1>
        <p className="text-sm text-slate-500">Order <span className="font-mono">{order.id}</span></p>
      </div>

      <div className="flex items-baseline justify-between border-y border-slate-200 py-4">
        <span className="text-sm">
          {PLANS[normalizePaidPlanId(order.plan_id) as PlanId]?.label ?? order.plan_id} for {submission?.name}
        </span>
        <span className="text-xl font-bold">${order.amount_usd}</span>
      </div>

      {order.status === "failed" && (
        <p className="rounded-lg bg-rose-50 p-3 text-sm text-rose-700">Your last payment was declined. You can try again.</p>
      )}

      {canPay ? (
        <CheckoutButtons orderId={order.id} amountUsd={order.amount_usd} />
      ) : (
        <p className="text-sm">
          This order is already {order.status}.{" "}
          <Link href={`/lab/orders/${order.id}`} className="text-indigo-700 underline">
            View order
          </Link>
        </p>
      )}

      <p className="text-[11px] text-slate-400">No real money moves. The buttons send a signed test webhook to the Lab.</p>
    </div>
  );
}
