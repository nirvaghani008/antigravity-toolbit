import { CATEGORIES } from "./tools";
import { PLANS, type PlanId } from "./order-rules";

export interface SubmissionInput {
  name: string;
  url: string;
  email: string;
  category: string;
  description: string;
  plan: string;
}

export type SubmissionErrors = Partial<Record<keyof SubmissionInput, string>>;

// "HTTPS://www.Example.com/" and "example.com" are the same tool, so compare hosts.
export function normalizeToolUrl(raw: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;
  const withScheme = /^[a-z][a-z0-9+.-]*:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  let url: URL;
  try {
    url = new URL(withScheme);
  } catch {
    return null;
  }
  if (url.protocol !== "https:" && url.protocol !== "http:") return null;
  const host = url.hostname.toLowerCase().replace(/^www\./, "");
  if (!host.includes(".") || host.startsWith(".") || host.endsWith(".")) return null;
  const path = url.pathname.replace(/\/+$/, "");
  return `https://${host}${path}`;
}

export function hostOf(normalizedUrl: string): string {
  return new URL(normalizedUrl).hostname;
}

export function validateSubmission(input: Partial<Record<keyof SubmissionInput, unknown>>): SubmissionErrors {
  const text = (value: unknown) => (typeof value === "string" ? value.trim() : "");
  const errors: SubmissionErrors = {};

  const name = text(input.name);
  if (name.length < 2) errors.name = "Tool name must be at least 2 characters";
  else if (name.length > 60) errors.name = "Tool name must be 60 characters or fewer";

  const url = text(input.url);
  if (!url) errors.url = "Website URL is required";
  else if (!normalizeToolUrl(url)) errors.url = "Enter a website address like https://example.com";

  const email = text(input.email);
  if (!email) errors.email = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Please enter a valid email address";

  if (!(CATEGORIES as readonly string[]).includes(text(input.category))) {
    errors.category = "Choose a category";
  }

  const description = text(input.description);
  if (description.length < 20) errors.description = "Description must be at least 20 characters";
  else if (description.length > 280) errors.description = "Description must be 280 characters or fewer";

  if (!(text(input.plan) in PLANS)) errors.plan = "Choose a listing plan";

  return errors;
}

export function isPlanId(value: unknown): value is PlanId {
  return typeof value === "string" && value in PLANS;
}
