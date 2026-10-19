import { randomUUID } from "node:crypto";
import { isLabEnabled, labDisabledResponse } from "@/lib/lab/enabled";
import type { PaymentEvent } from "@/lib/lab/payments";
import { getLabStore } from "@/lib/lab/store";
import { handlePaymentWebhook } from "@/lib/lab/webhook-handler";
import { SIGNATURE_HEADER, signPayload, webhookSecret } from "@/lib/lab/webhook-signature";

// Pretends to be the payment provider's sandbox. After the "card" is charged it sends
// a signed webhook exactly like a real provider would, so the whole flow is tested.
export async function POST(request: Request, { params }: { params: Promise<{ orderId: string }> }) {
  if (!isLabEnabled()) return labDisabledResponse();

  const { orderId } = await params;
  const order = getLabStore().orders.get(orderId);
  if (!order) return Response.json({ error: "Order not found" }, { status: 404 });
  if (order.status !== "pending" && order.status !== "failed") {
    return Response.json({ error: `This order is already ${order.status}.` }, { status: 409 });
  }

  const { outcome } = (await request.json().catch(() => ({}))) as { outcome?: string };
  if (outcome !== "succeeded" && outcome !== "declined") {
    return Response.json({ error: 'outcome must be "succeeded" or "declined"' }, { status: 400 });
  }

  // A declined card can be retried, so a failed order goes back to pending first.
  if (order.status === "failed") order.status = "pending";

  const timestamp = Math.floor(Date.now() / 1000);
  const event: PaymentEvent = {
    id: `evt_${randomUUID()}`,
    type: outcome === "succeeded" ? "payment.succeeded" : "payment.failed",
    created: timestamp,
    data: { order_id: order.id, amount_usd: order.amount_usd },
  };
  const body = JSON.stringify(event);
  const webhook = await handlePaymentWebhook(
    new Request("http://localhost/api/lab/webhooks/payments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        [SIGNATURE_HEADER]: signPayload(body, webhookSecret(), timestamp),
      },
      body,
    })
  );
  if (!webhook.ok) {
    return Response.json({ error: "The payment could not be recorded." }, { status: 502 });
  }

  return Response.json({ status: order.status, orderUrl: `/lab/orders/${order.id}` });
}
