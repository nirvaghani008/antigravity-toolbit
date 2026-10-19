import { describe, expect, it } from "vitest";
import { normalizeToolUrl, validateSubmission } from "./submission-validation";

describe("normalizeToolUrl", () => {
  it.each([
    ["https://inkpal.example", "https://inkpal.example"],
    ["HTTPS://WWW.InkPal.Example/", "https://inkpal.example"],
    ["inkpal.example", "https://inkpal.example"],
    ["http://inkpal.example/pricing/", "https://inkpal.example/pricing"],
  ])("turns %j into %j", (input, expected) => {
    expect(normalizeToolUrl(input)).toBe(expected);
  });

  it.each(["", "   ", "not a url", "localhost", "javascript:alert(1)", "ftp://files.example", "https://.example"])(
    "rejects %j",
    (input) => {
      expect(normalizeToolUrl(input)).toBeNull();
    }
  );
});

describe("validateSubmission", () => {
  const valid = {
    name: "Sketchify",
    url: "sketchify.example",
    email: "maya@studio.com",
    category: "Image",
    description: "Turns photos into pencil sketches in one click.",
    plan: "free_listing",
  };

  it("accepts a complete submission", () => {
    expect(validateSubmission(valid)).toEqual({});
  });

  it("reports every missing field at once", () => {
    expect(Object.keys(validateSubmission({})).sort()).toEqual([
      "category",
      "description",
      "email",
      "name",
      "plan",
      "url",
    ]);
  });

  it.each([
    ["name", { name: "X" }, "Tool name must be at least 2 characters"],
    ["name", { name: "X".repeat(61) }, "Tool name must be 60 characters or fewer"],
    ["url", { url: "my tool" }, "Enter a website address like https://example.com"],
    ["email", { email: "maya@" }, "Please enter a valid email address"],
    ["category", { category: "Crypto" }, "Choose a category"],
    ["description", { description: "Too short" }, "Description must be at least 20 characters"],
    ["description", { description: "x".repeat(281) }, "Description must be 280 characters or fewer"],
    ["plan", { plan: "lifetime_deal" }, "Choose a listing plan"],
  ])("rejects a bad %s", (field, change, message) => {
    expect(validateSubmission({ ...valid, ...change })).toEqual({ [field]: message });
  });

  it("rejects values that aren't text, as a hand-made API request might send", () => {
    expect(validateSubmission({ ...valid, name: 42, plan: ["paid_launch"] })).toMatchObject({
      name: expect.any(String),
      plan: expect.any(String),
    });
  });
});
