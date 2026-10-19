import type { LabStore, SentEmail } from "./store";

// What the (pretend) payment provider sends to our webhook.
export interface PaymentEvent {
  id: string;
  type: "payment.succeeded" | "payment.failed" | "refund.succeeded";
  created: number; // unix seconds
  data: { order_id: string; amount_usd: number };
}

export type ProcessResult =
  | "processed"
  | "duplicate" // same event delivered twice: providers retry, so this is normal
  | "unknown_order"
  | "amount_mismatch" // paid less (or more) than the order costs
  | "ignored"; // arrived out of order, e.g. "failed" after "succeeded"

export interface PaymentDeps {
  now: Date;
  sendEmail: (email: Omit<SentEmail, "sentAt">) => void;
}

export function isPaymentEvent(value: unknown): value is PaymentEvent {
  const event = value as PaymentEvent;
  return (
    !!event &&
    typeof event.id === "string" &&
    ["payment.succeeded", "payment.failed", "refund.succeeded"].includes(event.type) &&
    typeof event.data?.order_id === "string" &&
    typeof event.data?.amount_usd === "number"
  );
}

export function processPaymentEvent(store: LabStore, event: PaymentEvent, deps: PaymentDeps): ProcessResult {
  if (store.processedEventIds.has(event.id)) return "duplicate";

  const order = store.orders.get(event.data.order_id);
  // Not marked as processed, so a retry can succeed once the order exists.
  if (!order) return "unknown_order";
  const submission = store.submissions.get(order.submissionId);

  let result: ProcessResult = "processed";
  switch (event.type) {
    case "payment.succeeded":
      if (event.data.amount_usd !== order.amount_usd) {
        result = "amount_mismatch";
      } else if (order.status === "completed" || order.status === "refunded") {
        result = "ignored";
      } else {
        order.status = "completed";
        order.paid_at = deps.now.toISOString();
        if (submission) submission.status = "fast_tracked";
        deps.sendEmail({
          to: submission?.email ?? "",
          subject: `Receipt: paid launch for ${submission?.name ?? "your tool"}`,
          orderId: order.id,
        });
      }
      break;
    case "payment.failed":
      // A late "failed" must never undo a payment that already went through.
      if (order.status !== "pending") result = "ignored";
      else order.status = "failed";
      break;
    case "refund.succeeded":
      if (order.status !== "completed") {
        result = "ignored";
      } else {
        order.status = "refunded";
        if (submission) submission.status = "in_review";
        deps.sendEmail({
          to: submission?.email ?? "",
          subject: `Refund issued for ${submission?.name ?? "your tool"}`,
          orderId: order.id,
        });
      }
      break;
  }

  store.processedEventIds.add(event.id);
  return result;
}

export function outboxMailer(store: LabStore, now: Date): PaymentDeps["sendEmail"] {
  return (email) => store.outbox.push({ ...email, sentAt: now.toISOString() });
}
