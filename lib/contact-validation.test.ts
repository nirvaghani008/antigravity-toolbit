import { describe, expect, it } from "vitest";
import { validateContact } from "./contact-validation";

const valid = {
  name: "Maya Lin",
  email: "maya@studio.com",
  message: "I'd like a quote for 20 anime clips.",
};

describe("validateContact", () => {
  it("accepts a complete, valid message", () => {
    expect(validateContact(valid)).toEqual({});
  });

  it("requires a name, and treats spaces-only as empty", () => {
    expect(validateContact({ ...valid, name: "" }).name).toBe("Name is required");
    expect(validateContact({ ...valid, name: "   " }).name).toBe("Name is required");
  });

  it("requires an email", () => {
    expect(validateContact({ ...valid, email: "" }).email).toBe("Email is required");
  });

  it.each(["maya", "maya@studio", "@studio.com", "maya studio.com"])(
    "rejects the malformed email %j",
    (email) => {
      expect(validateContact({ ...valid, email }).email).toBe(
        "Please enter a valid email address"
      );
    }
  );

  it("requires a message of at least 10 characters, ignoring surrounding spaces", () => {
    expect(validateContact({ ...valid, message: "" }).message).toBe("Message cannot be empty");
    expect(validateContact({ ...valid, message: "   too short   " }).message).toBe(
      "Message must be at least 10 characters long"
    );
    expect(validateContact({ ...valid, message: "1234567890" }).message).toBeUndefined();
  });

  it("rejects values that are not strings, as a hand-made API request might send", () => {
    const errors = validateContact({ name: 42, email: ["maya@studio.com"], message: null });
    expect(Object.keys(errors).sort()).toEqual(["email", "message", "name"]);
  });

  it("reports every problem at once, so the form can mark all bad fields", () => {
    expect(Object.keys(validateContact({})).sort()).toEqual(["email", "message", "name"]);
  });
});
