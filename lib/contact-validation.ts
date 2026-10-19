// Shared by the contact form (app/contact/page.tsx) and its API route
// (app/api/contact/route.ts) so the browser and the server always apply the same rules.

export const MIN_MESSAGE_LENGTH = 10;

const EMAIL_PATTERN = /\S+@\S+\.\S+/;

export type ContactErrors = Partial<Record<"name" | "email" | "message", string>>;

export function validateContact(input: {
  name?: unknown;
  email?: unknown;
  message?: unknown;
}): ContactErrors {
  const name = typeof input.name === "string" ? input.name.trim() : "";
  const email = typeof input.email === "string" ? input.email.trim() : "";
  const message = typeof input.message === "string" ? input.message.trim() : "";
  const errors: ContactErrors = {};

  if (!name) errors.name = "Name is required";

  if (!email) {
    errors.email = "Email is required";
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = "Please enter a valid email address";
  }

  if (!message) {
    errors.message = "Message cannot be empty";
  } else if (message.length < MIN_MESSAGE_LENGTH) {
    errors.message = `Message must be at least ${MIN_MESSAGE_LENGTH} characters long`;
  }

  return errors;
}
