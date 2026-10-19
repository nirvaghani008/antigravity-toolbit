"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function CheckoutButtons({ orderId, amountUsd }: { orderId: string; amountUsd: number }) {
  const router = useRouter();
  const [pending, setPending] = useState<"succeeded" | "declined" | null>(null);
  const [error, setError] = useState<string | null>(null);

  const pay = async (outcome: "succeeded" | "declined") => {
    setError(null);
    setPending(outcome);
    try {
      const res = await fetch(`/api/lab/checkout/${orderId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ outcome }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      router.push(data.orderUrl);
    } catch (err) {
      setError(err instanceof Error && err.message ? err.message : "Payment could not be processed.");
      setPending(null);
    }
  };

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={() => pay("succeeded")}
        disabled={pending !== null}
        className="w-full rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-500 disabled:opacity-60 cursor-pointer"
      >
        {pending === "succeeded" ? "Processing…" : `Pay $${amountUsd} with test card`}
      </button>
      <button
        type="button"
        onClick={() => pay("declined")}
        disabled={pending !== null}
        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-60 cursor-pointer"
      >
        {pending === "declined" ? "Processing…" : "Simulate a declined card"}
      </button>
      {error && (
        <p role="alert" className="text-sm text-rose-600">
          {error}
        </p>
      )}
    </div>
  );
}
