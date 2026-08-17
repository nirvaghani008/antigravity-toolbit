import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validation
    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json(
        { error: "Name is required." },
        { status: 400 }
      );
    }

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      return NextResponse.json(
        { error: "A valid email address is required." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || message.trim().length < 10) {
      return NextResponse.json(
        { error: "Message must be at least 10 characters long." },
        { status: 400 }
      );
    }

    // Log payload for server debugging / connecting to email service (e.g. Resend / SendGrid / Supabase)
    console.log("[Contact Submission Received]:", {
      name,
      email,
      subject: subject || "General Inquiry",
      messageLength: message.length,
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
  } catch (error) {
    console.error("[Contact Submission Error]:", error);
    return NextResponse.json(
      { error: "Failed to process contact request. Please try again later." },
      { status: 500 }
    );
  }
}
