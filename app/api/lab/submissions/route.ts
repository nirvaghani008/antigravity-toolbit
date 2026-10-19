import { isLabEnabled, labDisabledResponse } from "@/lib/lab/enabled";
import { createSubmission, getLabStore } from "@/lib/lab/store";
import { validateSubmission } from "@/lib/lab/submission-validation";
import type { Category } from "@/lib/lab/tools";
import type { PlanId } from "@/lib/lab/order-rules";

// Like Toolbit's /submit: free listings go to review, paid launches get an order
// and a checkout link.
export async function POST(request: Request) {
  if (!isLabEnabled()) return labDisabledResponse();

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Request body must be valid JSON." }, { status: 400 });
  }
  if (!body || typeof body !== "object") {
    return Response.json({ error: "Request body must be a JSON object." }, { status: 400 });
  }

  const input = body as Record<string, unknown>;
  const errors = validateSubmission(input);
  if (Object.keys(errors).length > 0) {
    return Response.json({ error: "Please fix the highlighted fields.", errors }, { status: 400 });
  }

  const result = createSubmission(getLabStore(), {
    name: input.name as string,
    url: input.url as string,
    email: input.email as string,
    category: (input.category as string).trim() as Category,
    description: input.description as string,
    plan: (input.plan as string).trim() as PlanId,
  });

  if (!result.ok) {
    return Response.json(
      {
        error: `${result.duplicateOf} is already listed or waiting for review with this website.`,
        errors: { url: "This website has already been submitted" },
      },
      { status: 409 }
    );
  }

  const { submission, order } = result;
  return Response.json(
    {
      submissionId: submission.id,
      status: submission.status,
      orderId: order?.id ?? null,
      checkoutUrl: order ? `/lab/checkout/${order.id}` : null,
    },
    { status: 201 }
  );
}
