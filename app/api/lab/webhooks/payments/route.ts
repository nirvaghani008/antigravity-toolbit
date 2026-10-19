import { isLabEnabled, labDisabledResponse } from "@/lib/lab/enabled";
import { handlePaymentWebhook } from "@/lib/lab/webhook-handler";

// Where the payment provider reports payments and refunds. Every request must carry
// a valid signature; see lib/lab/webhook-signature.ts.
export async function POST(request: Request) {
  if (!isLabEnabled()) return labDisabledResponse();
  return handlePaymentWebhook(request);
}
