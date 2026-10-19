import { beforeEach, describe, expect, it, vi } from "vitest";
import { processPaymentEvent, type PaymentEvent } from "./payments";
import { createSubmission, resetLabStore, type LabStore } from "./store";

let store: LabStore;
let orderId: string;
const sendEmail = vi.fn();
const deps = () => ({ now: new Date("2026-10-19T10:00:00Z"), sendEmail });

function event(type: PaymentEvent["type"], overrides: Partial<PaymentEvent["data"]> = {}, id = `evt_${type}`): PaymentEvent {
  return { id, type, created: 0, data: { order_id: orderId, amount_usd: 49, ...overrides } };
}

beforeEach(() => {
  store = resetLabStore();
  sendEmail.mockClear();
  const created = createSubmission(store, {
    name: "Sketchify",
    url: "sketchify.example",
    email: "maya@studio.com",
    category: "Image",
    description: "Turns photos into pencil sketches.",
    plan: "paid_launch",
  });
  if (!created.ok || !created.order) throw new Error("setup failed");
  orderId = created.order.id;
});

const order = () => store.orders.get(orderId)!;
const submission = () => store.submissions.get(order().submissionId)!;

describe("processPaymentEvent", () => {
  it("marks the order paid, fast-tracks the tool and emails a receipt", () => {
    expect(processPaymentEvent(store, event("payment.succeeded"), deps())).toBe("processed");
    expect(order()).toMatchObject({ status: "completed", paid_at: "2026-10-19T10:00:00.000Z" });
    expect(submission().status).toBe("fast_tracked");
    expect(sendEmail).toHaveBeenCalledOnce();
    expect(sendEmail).toHaveBeenCalledWith(
      expect.objectContaining({ to: "maya@studio.com", subject: "Receipt: paid launch for Sketchify" })
    );
  });

  it("handles the same event delivered twice only once (providers retry)", () => {
    processPaymentEvent(store, event("payment.succeeded"), deps());
    expect(processPaymentEvent(store, event("payment.succeeded"), deps())).toBe("duplicate");
    expect(sendEmail).toHaveBeenCalledOnce();
  });

  it("refuses a payment for the wrong amount", () => {
    expect(processPaymentEvent(store, event("payment.succeeded", { amount_usd: 1 }), deps())).toBe("amount_mismatch");
    expect(order().status).toBe("pending");
    expect(sendEmail).not.toHaveBeenCalled();
  });

  it("never lets a late 'failed' event undo a successful payment", () => {
    processPaymentEvent(store, event("payment.succeeded"), deps());
    expect(processPaymentEvent(store, event("payment.failed"), deps())).toBe("ignored");
    expect(order().status).toBe("completed");
  });

  it("marks a declined payment as failed and sends nothing", () => {
    expect(processPaymentEvent(store, event("payment.failed"), deps())).toBe("processed");
    expect(order().status).toBe("failed");
    expect(submission().status).toBe("awaiting_payment");
    expect(sendEmail).not.toHaveBeenCalled();
  });

  it("refunds a paid order and removes the fast track", () => {
    processPaymentEvent(store, event("payment.succeeded"), deps());
    expect(processPaymentEvent(store, event("refund.succeeded"), deps())).toBe("processed");
    expect(order().status).toBe("refunded");
    expect(submission().status).toBe("in_review");
    expect(sendEmail).toHaveBeenLastCalledWith(expect.objectContaining({ subject: "Refund issued for Sketchify" }));
  });

  it("ignores a refund for an order that was never paid", () => {
    expect(processPaymentEvent(store, event("refund.succeeded"), deps())).toBe("ignored");
    expect(order().status).toBe("pending");
  });

  it("lets an event for an unknown order be retried later", () => {
    const unknown = { ...event("payment.succeeded"), data: { order_id: "ord_missing", amount_usd: 49 } };
    expect(processPaymentEvent(store, unknown, deps())).toBe("unknown_order");
    expect(store.processedEventIds.has(unknown.id)).toBe(false);
  });
});
