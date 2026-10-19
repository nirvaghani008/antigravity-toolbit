import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { getLabStore, resetLabStore } from "@/lib/lab/store";
import { POST } from "./route";

const valid = {
  name: "Sketchify",
  url: "https://sketchify.example",
  email: "maya@studio.com",
  category: "Image",
  description: "Turns photos into pencil sketches in one click.",
  plan: "free_listing",
};

function submit(body: unknown) {
  return POST(
    new Request("http://localhost/api/lab/submissions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: typeof body === "string" ? body : JSON.stringify(body),
    })
  );
}

beforeEach(() => {
  vi.stubEnv("LAB_ENABLED", "1");
  resetLabStore();
});
afterEach(() => {
  vi.unstubAllEnvs();
});

describe("POST /api/lab/submissions", () => {
  it("queues a free listing for review, with no order", async () => {
    const res = await submit(valid);
    expect(res.status).toBe(201);
    expect(await res.json()).toMatchObject({ status: "in_review", orderId: null, checkoutUrl: null });
  });

  it("creates a $49 pending order and a checkout link for a paid launch", async () => {
    const res = await submit({ ...valid, plan: "paid_launch" });
    const data = await res.json();

    expect(res.status).toBe(201);
    expect(data).toMatchObject({ status: "awaiting_payment", checkoutUrl: `/lab/checkout/${data.orderId}` });
    expect(getLabStore().orders.get(data.orderId)).toMatchObject({
      plan_id: "paid_launch",
      amount_usd: 49,
      status: "pending",
    });
  });

  it("stores the website in one standard form", async () => {
    const res = await submit({ ...valid, url: "WWW.Sketchify.example/" });
    const { submissionId } = await res.json();
    expect(getLabStore().submissions.get(submissionId)?.url).toBe("https://sketchify.example");
  });

  it("returns every field error with 400", async () => {
    const res = await submit({ ...valid, name: "", email: "nope" });
    expect(res.status).toBe(400);
    expect((await res.json()).errors).toEqual({
      name: "Tool name must be at least 2 characters",
      email: "Please enter a valid email address",
    });
  });

  it.each(["https://inkpal.example", "http://www.InkPal.example/", "inkpal.example"])(
    "refuses %j because that tool is already listed (409)",
    async (url) => {
      const res = await submit({ ...valid, url });
      expect(res.status).toBe(409);
      expect((await res.json()).error).toContain("InkPal");
    }
  );

  it("refuses the same website submitted twice", async () => {
    await submit(valid);
    const second = await submit({ ...valid, name: "Sketchify Pro" });
    expect(second.status).toBe(409);
    expect(getLabStore().submissions.size).toBe(1);
  });

  it("rejects broken JSON with 400", async () => {
    expect((await submit("{ nope")).status).toBe(400);
  });

  it("acts as if it doesn't exist when the Lab is switched off", async () => {
    vi.stubEnv("LAB_ENABLED", "0");
    const res = await submit(valid);
    expect(res.status).toBe(404);
    expect(getLabStore().submissions.size).toBe(0);
  });
});
