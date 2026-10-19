import { describe, expect, it } from "vitest";
import { signPayload, verifySignature } from "./webhook-signature";

const secret = "whsec_test";
const body = JSON.stringify({ id: "evt_1", type: "payment.succeeded" });
const now = new Date("2026-10-19T10:00:00Z");
const nowSeconds = Math.floor(now.getTime() / 1000);

describe("webhook signatures", () => {
  it("accepts a correctly signed request", () => {
    expect(verifySignature(body, signPayload(body, secret, nowSeconds), secret, now)).toEqual({ ok: true });
  });

  it("accepts small clock differences between servers", () => {
    const header = signPayload(body, secret, nowSeconds - 60);
    expect(verifySignature(body, header, secret, now).ok).toBe(true);
  });

  it("rejects a missing or garbled header", () => {
    expect(verifySignature(body, null, secret, now)).toEqual({ ok: false, reason: "missing" });
    expect(verifySignature(body, "v1=abc", secret, now)).toEqual({ ok: false, reason: "malformed" });
    expect(verifySignature(body, `t=${nowSeconds},v1=not-hex`, secret, now)).toEqual({ ok: false, reason: "malformed" });
  });

  it("rejects a body that was changed after signing", () => {
    const header = signPayload(body, secret, nowSeconds);
    const tampered = body.replace("succeeded", "refunded");
    expect(verifySignature(tampered, header, secret, now)).toEqual({ ok: false, reason: "mismatch" });
  });

  it("rejects a request signed with someone else's secret", () => {
    const header = signPayload(body, "whsec_attacker", nowSeconds);
    expect(verifySignature(body, header, secret, now)).toEqual({ ok: false, reason: "mismatch" });
  });

  it("rejects an old request replayed later, even with a valid signature", () => {
    const sixMinutesAgo = nowSeconds - 6 * 60;
    expect(verifySignature(body, signPayload(body, secret, sixMinutesAgo), secret, now)).toEqual({
      ok: false,
      reason: "stale",
    });
  });
});
