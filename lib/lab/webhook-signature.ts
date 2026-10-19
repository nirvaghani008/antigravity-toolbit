import { createHmac, timingSafeEqual } from "node:crypto";

// Payment providers sign each webhook so nobody else can fake "payment succeeded".
// This uses the common "t=<unix seconds>,v1=<hex HMAC-SHA256 of `${t}.${body}`>" format.
export const SIGNATURE_HEADER = "x-labpay-signature";
export const SIGNATURE_TOLERANCE_SECONDS = 5 * 60;

export function webhookSecret(): string {
  return process.env.LAB_WEBHOOK_SECRET || "whsec_lab_local_only";
}

export function signPayload(body: string, secret: string, timestamp: number): string {
  const digest = createHmac("sha256", secret).update(`${timestamp}.${body}`).digest("hex");
  return `t=${timestamp},v1=${digest}`;
}

export type SignatureCheck =
  | { ok: true }
  | { ok: false; reason: "missing" | "malformed" | "stale" | "mismatch" };

export function verifySignature(
  body: string,
  header: string | null,
  secret: string,
  now: Date = new Date()
): SignatureCheck {
  if (!header) return { ok: false, reason: "missing" };

  const parts = Object.fromEntries(
    header.split(",").map((part) => {
      const [key, ...rest] = part.trim().split("=");
      return [key, rest.join("=")];
    })
  );
  const timestamp = Number(parts.t);
  if (!Number.isInteger(timestamp) || !/^[0-9a-f]{64}$/.test(parts.v1 ?? "")) {
    return { ok: false, reason: "malformed" };
  }

  // Rejects a captured webhook being sent again much later (a replay attack).
  if (Math.abs(now.getTime() / 1000 - timestamp) > SIGNATURE_TOLERANCE_SECONDS) {
    return { ok: false, reason: "stale" };
  }

  const expected = Buffer.from(signPayload(body, secret, timestamp).split("v1=")[1], "hex");
  const received = Buffer.from(parts.v1, "hex");
  // Constant-time comparison, so response timing doesn't leak how much of a guess matched.
  if (!timingSafeEqual(expected, received)) return { ok: false, reason: "mismatch" };
  return { ok: true };
}
