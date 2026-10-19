import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createSubmission, getLabStore, resetLabStore } from "@/lib/lab/store";
import { POST } from "./route";

let orderId: string;

function pay(outcome: unknown, id = orderId) {
  return POST(
    new Request(`http://localhost/api/lab/checkout/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ outcome }),
    }),
    { params: Promise.resolve({ orderId: id }) }
  );
}

beforeEach(() => {
  vi.stubEnv("LAB_ENABLED", "1");
  const created = createSubmission(resetLabStore(), {
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

describe("POST /api/lab/checkout/[orderId] (fake payment provider)", () => {
  it("pays through the signed webhook and links to the order", async () => {
    const res = await pay("succeeded");
    expect(await res.json()).toEqual({ status: "completed", orderUrl: `/lab/orders/${orderId}` });
    expect(order().status).toBe("completed");
    expect(getLabStore().outbox.map((email) => email.subject)).toEqual(["Receipt: paid launch for Sketchify"]);
  });

  it("records a declined card, then lets the visitor try again", async () => {
    expect((await (await pay("declined")).json()).status).toBe("failed");
    expect((await (await pay("succeeded")).json()).status).toBe("completed");
  });

  it("won't charge an order twice (409)", async () => {
    await pay("succeeded");
    const again = await pay("succeeded");
    expect(again.status).toBe(409);
    expect(getLabStore().outbox).toHaveLength(1);
  });

  it("rejects an unknown outcome (400) and an unknown order (404)", async () => {
    expect((await pay("free-money")).status).toBe(400);
    expect((await pay("succeeded", "ord_missing")).status).toBe(404);
  });
});
