import { NextRequest, NextResponse } from "next/server";
import { sendEnquiryEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, phone, email, service, details } = body as Record<string, unknown>;

  if (typeof name !== "string" || name.trim().length < 2) {
    return NextResponse.json({ error: "Please share your name." }, { status: 400 });
  }
  if (typeof phone !== "string" || phone.trim().length < 7) {
    return NextResponse.json({ error: "Please share a valid phone number." }, { status: 400 });
  }
  if (typeof service !== "string" || service.trim().length < 2) {
    return NextResponse.json({ error: "Please select a service." }, { status: 400 });
  }

  try {
    const result = await sendEnquiryEmail({
      subject: `New quote request — ${service}`,
      replyTo: typeof email === "string" && email.trim() ? email.trim() : undefined,
      lines: [
        { label: "Name", value: name.trim() },
        { label: "Phone", value: phone.trim() },
        { label: "Email", value: typeof email === "string" ? email.trim() || "—" : "—" },
        { label: "Service", value: service.trim() },
        { label: "Details", value: typeof details === "string" ? details.trim() || "—" : "—" },
      ],
    });

    return NextResponse.json({ ok: true, delivered: result.delivered });
  } catch (error) {
    console.error("[api/quote] failed to send enquiry", error);
    return NextResponse.json(
      { error: "We couldn't send your request right now. Please call or WhatsApp us instead." },
      { status: 502 }
    );
  }
}
