import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { PaymentEvent } from "@/lib/lab/payments";
import { createSubmission, getLabStore, resetLabStore } from "@/lib/lab/store";
import { SIGNATURE_HEADER, signPayload } from "@/lib/lab/webhook-signature";
import { POST } from "./route";

const SECRET = "whsec_route_test";
let orderId: string;

// Sends a webhook the way the payment provider would: JSON body plus a signature header.
function deliver(
  event: PaymentEvent,
  { secret = SECRET, timestamp = Math.floor(Date.now() / 1000), body = JSON.stringify(event) } = {}
) {
  return POST(
    new Request("http://localhost/api/lab/webhooks/payments", {
      method: "POST",
      headers: { "Content-Type": "application/json", [SIGNATURE_HEADER]: signPayload(JSON.stringify(event), secret, timestamp) },
      body,
    })
  );
}

const paid = (id = "evt_paid"): PaymentEvent => ({
  id,
  type: "payment.succeeded",
  created: 0,
  data: { order_id: orderId, amount_usd: 49 },
});

beforeEach(() => {
  vi.stubEnv("LAB_ENABLED", "1");
  vi.stubEnv("LAB_WEBHOOK_SECRET", SECRET);
  const store = resetLabStore();
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
afterEach(() => {
  vi.unstubAllEnvs();
});

const order = () => getLabStore().orders.get(orderId)!;

describe("POST /api/lab/webhooks/payments", () => {
  it("records a signed payment and sends one receipt", async () => {
    const res = await deliver(paid());
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ received: true, result: "processed" });
    expect(order().status).toBe("completed");
    expect(getLabStore().outbox).toHaveLength(1);
  });

  it("answers 200 to a repeat delivery but changes nothing", async () => {
    await deliver(paid());
    const again = await deliver(paid());
    expect(again.status).toBe(200);
    expect((await again.json()).result).toBe("duplicate");
    expect(getLabStore().outbox).toHaveLength(1);
  });

  it("rejects a request signed with the wrong secret (401)", async () => {
    const res = await deliver(paid(), { secret: "whsec_guess" });
    expect(res.status).toBe(401);
    expect(order().status).toBe("pending");
  });

  it("rejects a body changed after signing, e.g. a bigger refund (401)", async () => {
    const tampered = JSON.stringify({ ...paid(), data: { order_id: orderId, amount_usd: 0 } });
    const res = await deliver(paid(), { body: tampered });
    expect(res.status).toBe(401);
  });

  it("rejects a valid request replayed 10 minutes later (401)", async () => {
    const res = await deliver(paid(), { timestamp: Math.floor(Date.now() / 1000) - 600 });
    expect(res.status).toBe(401);
    expect((await res.json()).error).toContain("stale");
  });

  it("rejects a request with no signature at all (401)", async () => {
    const res = await POST(
      new Request("http://localhost/api/lab/webhooks/payments", { method: "POST", body: JSON.stringify(paid()) })
    );
    expect(res.status).toBe(401);
  });

  it("returns 404 for an order it doesn't know, so the provider retries", async () => {
    const res = await deliver({ ...paid(), data: { order_id: "ord_missing", amount_usd: 49 } });
    expect(res.status).toBe(404);
  });

  it("returns 422 when the amount paid doesn't match the order", async () => {
    const res = await deliver({ ...paid(), data: { order_id: orderId, amount_usd: 1 } });
    expect(res.status).toBe(422);
    expect(order().status).toBe("pending");
  });

  it("rejects an event type it doesn't understand (400)", async () => {
    const res = await deliver({ ...paid(), type: "subscription.paused" as PaymentEvent["type"] });
    expect(res.status).toBe(400);
  });
});
