import { randomUUID } from "node:crypto";
import { PLANS, type Order, type PlanId } from "./order-rules";
import { hostOf, normalizeToolUrl } from "./submission-validation";
import { SEED_TOOLS, type Category, type Tool } from "./tools";

// In-memory stand-in for Toolbit's database. It lives on globalThis so every route in
// the same server process shares one copy, and it resets when the server restarts.

export type SubmissionStatus = "in_review" | "awaiting_payment" | "fast_tracked";

export interface Submission {
  id: string;
  name: string;
  url: string;
  email: string;
  category: Category;
  description: string;
  plan: PlanId;
  status: SubmissionStatus;
  orderId: string | null;
  createdAt: string;
}

export interface StoredOrder extends Order {
  submissionId: string;
  createdAt: string;
}

export interface SentEmail {
  to: string;
  subject: string;
  orderId: string;
  sentAt: string;
}

export interface LabStore {
  tools: Map<string, Tool>;
  votes: Map<string, Set<string>>;
  submissions: Map<string, Submission>;
  orders: Map<string, StoredOrder>;
  processedEventIds: Set<string>;
  outbox: SentEmail[];
}

function createStore(): LabStore {
  return {
    tools: new Map(SEED_TOOLS.map((tool) => [tool.slug, { ...tool }])),
    votes: new Map(),
    submissions: new Map(),
    orders: new Map(),
    processedEventIds: new Set(),
    outbox: [],
  };
}

const globalForLab = globalThis as typeof globalThis & { __toonforgeLab?: LabStore };

export function getLabStore(): LabStore {
  globalForLab.__toonforgeLab ??= createStore();
  return globalForLab.__toonforgeLab;
}

// Tests call this so each one starts from the same seeded data.
export function resetLabStore(): LabStore {
  globalForLab.__toonforgeLab = createStore();
  return globalForLab.__toonforgeLab;
}

const newId = (prefix: string) => `${prefix}_${randomUUID().replace(/-/g, "").slice(0, 12)}`;

// ---- Tools and upvotes ----

// Cookie that identifies a visitor for "one upvote per visitor".
export const VISITOR_COOKIE = "lab_visitor";

export function upvoteCount(store: LabStore, slug: string): number {
  const tool = store.tools.get(slug);
  return tool ? tool.upvotes + (store.votes.get(slug)?.size ?? 0) : 0;
}

export function listTools(store: LabStore): Tool[] {
  return [...store.tools.values()].map((tool) => ({ ...tool, upvotes: upvoteCount(store, tool.slug) }));
}

export function getTool(store: LabStore, slug: string): Tool | null {
  const tool = store.tools.get(slug);
  return tool ? { ...tool, upvotes: upvoteCount(store, slug) } : null;
}

export function hasVoted(store: LabStore, slug: string, visitorId: string | undefined): boolean {
  return !!visitorId && !!store.votes.get(slug)?.has(visitorId);
}

// One vote per visitor per tool, like Toolbit's locked-down increment_counter RPC.
export function castVote(store: LabStore, slug: string, visitorId: string) {
  if (!store.tools.has(slug)) return null;
  const voters = store.votes.get(slug) ?? new Set<string>();
  store.votes.set(slug, voters);
  const alreadyVoted = voters.has(visitorId);
  voters.add(visitorId);
  return { count: upvoteCount(store, slug), alreadyVoted };
}

// ---- Submissions and orders ----

export type CreateSubmissionResult =
  | { ok: true; submission: Submission; order: StoredOrder | null }
  | { ok: false; duplicateOf: string };

export function createSubmission(
  store: LabStore,
  input: { name: string; url: string; email: string; category: Category; description: string; plan: PlanId },
  now: Date = new Date()
): CreateSubmissionResult {
  const url = normalizeToolUrl(input.url);
  if (!url) throw new Error("createSubmission needs a validated URL");
  const host = hostOf(url);

  const listed = [...store.tools.values()].find((tool) => hostOf(normalizeToolUrl(tool.url)!) === host);
  if (listed) return { ok: false, duplicateOf: listed.name };
  const pending = [...store.submissions.values()].find((sub) => hostOf(sub.url) === host);
  if (pending) return { ok: false, duplicateOf: pending.name };

  const createdAt = now.toISOString();
  const submission: Submission = {
    id: newId("sub"),
    name: input.name.trim(),
    url,
    email: input.email.trim(),
    category: input.category,
    description: input.description.trim(),
    plan: input.plan,
    status: input.plan === "paid_launch" ? "awaiting_payment" : "in_review",
    orderId: null,
    createdAt,
  };

  let order: StoredOrder | null = null;
  if (PLANS[input.plan].priceUsd > 0) {
    order = {
      id: newId("ord"),
      plan_id: input.plan,
      amount_usd: PLANS[input.plan].priceUsd,
      status: "pending",
      paid_at: null,
      submissionId: submission.id,
      createdAt,
    };
    submission.orderId = order.id;
    store.orders.set(order.id, order);
  }

  store.submissions.set(submission.id, submission);
  return { ok: true, submission, order };
}

export function getOrder(store: LabStore, orderId: string) {
  const order = store.orders.get(orderId);
  if (!order) return null;
  const submission = store.submissions.get(order.submissionId) ?? null;
  const emails = store.outbox.filter((email) => email.orderId === orderId);
  return { order, submission, emails };
}
