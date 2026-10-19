import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { POST } from "./route";

function post(body: unknown) {
  return POST(
    new Request("http://localhost/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: typeof body === "string" ? body : JSON.stringify(body),
    })
  );
}

const valid = {
  name: "Maya Lin",
  email: "maya@studio.com",
  subject: "Press & Media",
  message: "Can we interview your founders next week?",
};

describe("POST /api/contact", () => {
  beforeEach(() => {
    // The route logs each submission; keep test output clean.
    vi.spyOn(console, "log").mockImplementation(() => {});
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("accepts a valid submission", async () => {
    const res = await post(valid);
    expect(res.status).toBe(200);
    expect(await res.json()).toMatchObject({ success: true });
  });

  it("logs the submission without the message text", async () => {
    await post(valid);
    expect(console.log).toHaveBeenCalledWith(
      "[Contact Submission Received]:",
      expect.objectContaining({ email: valid.email, messageLength: valid.message.length })
    );
    expect(JSON.stringify(vi.mocked(console.log).mock.calls)).not.toContain(valid.message);
  });

  it.each([
    ["name", { ...valid, name: " " }, "Name is required"],
    ["email", { ...valid, email: "not-an-email" }, "Please enter a valid email address"],
    ["message", { ...valid, message: "hi" }, "Message must be at least 10 characters long"],
  ])("rejects a bad %s with 400", async (_field, body, error) => {
    const res = await post(body);
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ error });
  });

  it("rejects broken JSON with 400, not a server error", async () => {
    const res = await post("{ not json");
    expect(res.status).toBe(400);
  });

  it.each([null, "a string", 42])("rejects a JSON body that is not an object (%j)", async (body) => {
    const res = await post(JSON.stringify(body));
    expect(res.status).toBe(400);
  });
});
