// Who counts as paid, and who can get a refund. Mirrors the pure helpers the Toolbit
// guide suggests pulling out of utils/orders.ts so they can be unit tested.

export const PLANS = {
  free_listing: { label: "Free listing", priceUsd: 0 },
  paid_launch: { label: "Paid launch", priceUsd: 49 },
} as const;
export type PlanId = keyof typeof PLANS;

// Old plan names that may still be stored on older orders.
const LEGACY_PLAN_IDS: Record<string, PlanId> = {
  tool_expedited: "paid_launch",
  featured_launch: "paid_launch",
  basic_listing: "free_listing",
};

export const REFUND_WINDOW_DAYS = 14;

export type OrderStatus = "pending" | "completed" | "failed" | "refunded";

export interface Order {
  id: string;
  plan_id: string;
  amount_usd: number;
  status: OrderStatus;
  paid_at?: string | null;
}

export function normalizePaidPlanId(planId: string | null | undefined): string {
  if (!planId) return "";
  const id = planId.trim().toLowerCase();
  return LEGACY_PLAN_IDS[id] ?? id;
}

export function isOrderPaid(order: Pick<Order, "status"> | null | undefined): boolean {
  return order?.status === "completed";
}

// A $0 order is free tier even if it carries a paid plan id (e.g. a 100% coupon).
export function isFreeTierOrder(order: Pick<Order, "plan_id" | "amount_usd">): boolean {
  return order.amount_usd <= 0 || normalizePaidPlanId(order.plan_id) === "free_listing";
}

export function isCompletedOrderForPlan(
  order: Pick<Order, "plan_id" | "status">,
  planId: PlanId
): boolean {
  return isOrderPaid(order) && normalizePaidPlanId(order.plan_id) === planId;
}

export type RefundDecision =
  | { eligible: true; amountUsd: number }
  | { eligible: false; reason: "not_paid" | "already_refunded" | "free_order" | "window_closed" };

export function getRefundDecision(order: Order, now: Date = new Date()): RefundDecision {
  if (order.status === "refunded") return { eligible: false, reason: "already_refunded" };
  if (!isOrderPaid(order) || !order.paid_at) return { eligible: false, reason: "not_paid" };
  if (isFreeTierOrder(order)) return { eligible: false, reason: "free_order" };

  const daysSincePaid = (now.getTime() - new Date(order.paid_at).getTime()) / (24 * 60 * 60 * 1000);
  if (daysSincePaid > REFUND_WINDOW_DAYS) return { eligible: false, reason: "window_closed" };

  return { eligible: true, amountUsd: order.amount_usd };
}
