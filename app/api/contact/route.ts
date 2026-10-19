import { NextResponse } from "next/server";
import { validateContact } from "@/lib/contact-validation";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Request body must be valid JSON." },
      { status: 400 }
    );
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json(
      { error: "Request body must be a JSON object." },
      { status: 400 }
    );
  }

  const { name, email, subject, message } = body as Record<string, unknown>;

  // Same rules as the contact form, so the browser and server never disagree.
  const [firstError] = Object.values(validateContact({ name, email, message }));
  if (firstError) {
    return NextResponse.json({ error: firstError }, { status: 400 });
  }

  // Log payload for server debugging / connecting to email service (e.g. Resend / SendGrid / Supabase)
  console.log("[Contact Submission Received]:", {
    name,
    email,
    subject: subject || "General Inquiry",
    messageLength: (message as string).length,
    timestamp: new Date().toISOString(),
  });

  // Simulated email dispatch delay
  return NextResponse.json(
    {
      success: true,
      message:
        "Thank you for contacting ToonForge AI! Your inquiry has been received and our team will respond within 24 hours.",
    },
    { status: 200 }
  );
}
