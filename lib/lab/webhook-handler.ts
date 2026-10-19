import { isPaymentEvent, outboxMailer, processPaymentEvent } from "./payments";
import { getLabStore } from "./store";
import { SIGNATURE_HEADER, verifySignature, webhookSecret } from "./webhook-signature";

// Shared by the real webhook route and the fake checkout, so both go through the
// same signature check and processing.
export async function handlePaymentWebhook(request: Request): Promise<Response> {
  // Read the raw text: the signature covers the exact bytes, not re-serialized JSON.
  const body = await request.text();
  const check = verifySignature(body, request.headers.get(SIGNATURE_HEADER), webhookSecret());
  if (!check.ok) {
    return Response.json({ error: `Invalid signature (${check.reason})` }, { status: 401 });
  }

  let event: unknown;
  try {
    event = JSON.parse(body);
  } catch {
    return Response.json({ error: "Body must be JSON" }, { status: 400 });
  }
  if (!isPaymentEvent(event)) {
    return Response.json({ error: "Unrecognized event" }, { status: 400 });
  }

  const store = getLabStore();
  const now = new Date();
  const result = processPaymentEvent(store, event, { now, sendEmail: outboxMailer(store, now) });

  if (result === "unknown_order") {
    return Response.json({ error: "Unknown order", result }, { status: 404 });
  }
  if (result === "amount_mismatch") {
    return Response.json({ error: "Amount does not match the order", result }, { status: 422 });
  }
  return Response.json({ received: true, result });
}
