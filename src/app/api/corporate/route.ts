import { NextRequest, NextResponse } from "next/server";
import { sendEnquiryEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { company, name, phone, email, need, details } = body as Record<string, unknown>;

  if (typeof name !== "string" || name.trim().length < 2) {
    return NextResponse.json({ error: "Please share your name." }, { status: 400 });
  }
  if (typeof phone !== "string" || phone.trim().length < 7) {
    return NextResponse.json({ error: "Please share a valid phone number." }, { status: 400 });
  }
  if (typeof email !== "string" || !email.includes("@")) {
    return NextResponse.json({ error: "Please share a valid work email." }, { status: 400 });
  }
  if (typeof need !== "string" || need.trim().length < 2) {
    return NextResponse.json({ error: "Please select what you need." }, { status: 400 });
  }

  try {
    const result = await sendEnquiryEmail({
      subject: `New corporate enquiry — ${need}`,
      replyTo: email.trim(),
      lines: [
        { label: "Company / organisation", value: typeof company === "string" ? company.trim() || "—" : "—" },
        { label: "Name", value: name.trim() },
        { label: "Phone", value: phone.trim() },
        { label: "Work email", value: email.trim() },
        { label: "Need", value: need.trim() },
        { label: "Contract / tender details", value: typeof details === "string" ? details.trim() || "—" : "—" },
      ],
    });

    return NextResponse.json({ ok: true, delivered: result.delivered });
  } catch (error) {
    console.error("[api/corporate] failed to send enquiry", error);
    return NextResponse.json(
      { error: "We couldn't send your request right now. Please call or email us instead." },
      { status: 502 }
    );
  }
}
