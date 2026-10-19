import { describe, expect, it } from "vitest";
import {
  getRefundDecision,
  isCompletedOrderForPlan,
  isFreeTierOrder,
  isOrderPaid,
  normalizePaidPlanId,
  type Order,
} from "./order-rules";

// The same shape of tests the Toolbit guide suggests for utils/orders.ts.
describe("who gets paid features", () => {
  it("maps legacy plan names to current ones", () => {
    expect(normalizePaidPlanId("tool_expedited")).toBe("paid_launch");
    expect(normalizePaidPlanId(" Featured_Launch ")).toBe("paid_launch");
    expect(normalizePaidPlanId("basic_listing")).toBe("free_listing");
    expect(normalizePaidPlanId(null)).toBe("");
  });

  it("treats only a completed order as paid", () => {
    expect(isOrderPaid({ status: "completed" })).toBe(true);
    expect(isOrderPaid({ status: "pending" })).toBe(false);
    expect(isOrderPaid({ status: "refunded" })).toBe(false);
    expect(isOrderPaid(null)).toBe(false);
  });

  it("treats a $0 order as free tier, even with a paid plan id", () => {
    expect(isFreeTierOrder({ plan_id: "paid_launch", amount_usd: 0 })).toBe(true);
    expect(isFreeTierOrder({ plan_id: "paid_launch", amount_usd: 49 })).toBe(false);
  });

  it("checks the exact plan, not just 'paid'", () => {
    const order = { plan_id: "tool_expedited", status: "completed" as const };
    expect(isCompletedOrderForPlan(order, "paid_launch")).toBe(true);
    expect(isCompletedOrderForPlan(order, "free_listing")).toBe(false);
  });
});

describe("refunds", () => {
  const paidAt = "2026-10-01T12:00:00Z";
  const paid: Order = { id: "ord_1", plan_id: "paid_launch", amount_usd: 49, status: "completed", paid_at: paidAt };
  const daysAfter = (days: number) => new Date(new Date(paidAt).getTime() + days * 24 * 60 * 60 * 1000);

  it("gives a full refund inside the 14-day window, including the last day", () => {
    expect(getRefundDecision(paid, daysAfter(3))).toEqual({ eligible: true, amountUsd: 49 });
    expect(getRefundDecision(paid, daysAfter(14))).toEqual({ eligible: true, amountUsd: 49 });
  });

  it("refuses once the window has closed", () => {
    expect(getRefundDecision(paid, daysAfter(14.01))).toEqual({ eligible: false, reason: "window_closed" });
  });

  it("refuses orders that were never paid, already refunded, or free", () => {
    expect(getRefundDecision({ ...paid, status: "pending", paid_at: null }, daysAfter(1)).eligible).toBe(false);
    expect(getRefundDecision({ ...paid, status: "refunded" }, daysAfter(1))).toEqual({
      eligible: false,
      reason: "already_refunded",
    });
    expect(getRefundDecision({ ...paid, amount_usd: 0 }, daysAfter(1))).toEqual({
      eligible: false,
      reason: "free_order",
    });
  });
});
