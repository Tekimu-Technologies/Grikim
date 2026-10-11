import { NextRequest, NextResponse } from "next/server";
import { sendEnquiryEmail, sendCustomerConfirmation } from "@/lib/email";
import { logActivity, logError } from "@/lib/config-logger";
import {
  getClientIp,
  rateLimit,
  isHoneypotTripped,
  isSameOrigin,
  withinLength,
  isPlausiblePhone,
} from "@/lib/security";

export async function POST(req: NextRequest) {
  if (!isSameOrigin(req)) {
    logActivity(`Blocked quote submission: cross-origin request from ${getClientIp(req)}`);
    return NextResponse.json({ error: "Invalid request." }, { status: 403 });
  }

  const ip = getClientIp(req);
  if (!rateLimit(`quote:${ip}`, 5, 10 * 60 * 1000)) {
    logActivity(`Blocked quote submission: rate limit exceeded for ${ip}`);
    return NextResponse.json(
      { error: "Too many requests. Please try again in a few minutes." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const record = body as Record<string, unknown>;

  if (isHoneypotTripped(record)) {
    logActivity(`Blocked quote submission: honeypot tripped from ${ip}`);
    // Pretend success so bots don't learn to adapt.
    return NextResponse.json({ ok: true, delivered: true });
  }

  const { name, phone, email, service, details } = record;

  if (typeof name !== "string" || name.trim().length < 2 || !withinLength(name, 150)) {
    return NextResponse.json({ error: "Please share your name." }, { status: 400 });
  }
  if (typeof phone !== "string" || !isPlausiblePhone(phone)) {
    return NextResponse.json({ error: "Please share a valid phone number." }, { status: 400 });
  }
  if (typeof service !== "string" || service.trim().length < 2) {
    return NextResponse.json({ error: "Please select a service." }, { status: 400 });
  }
  if (!withinLength(details, 3000) || !withinLength(email, 190)) {
    return NextResponse.json({ error: "One of the fields is too long." }, { status: 400 });
  }

  const submitterName = name.trim();
  const submitterEmail = typeof email === "string" && email.trim().includes("@") ? email.trim() : undefined;
  const rows = [
    { label: "Name", value: submitterName },
    { label: "Phone", value: phone.trim() },
    { label: "Email", value: typeof email === "string" ? email.trim() || "—" : "—" },
    { label: "Service", value: service.trim() },
    { label: "Details", value: typeof details === "string" ? details.trim() || "—" : "—" },
  ];

  try {
    const result = await sendEnquiryEmail({
      subject: `New quote request — ${service.trim()}`,
      submitterName,
      replyTo: submitterEmail,
      rows,
    });

    if (submitterEmail) {
      void sendCustomerConfirmation({
        to: submitterEmail,
        customerName: submitterName,
        heading: "We've received your quote request",
        intro: `Thanks for requesting a quote for ${service.trim()}. Our team has your request and will be in touch shortly with pricing and next steps.`,
        rows,
      });
    }

    return NextResponse.json({ ok: true, delivered: result.delivered });
  } catch (error) {
    logError(`[api/quote] failed to send enquiry: ${error instanceof Error ? error.message : String(error)}`);
    console.error("[api/quote] failed to send enquiry", error);
    return NextResponse.json(
      { error: "We couldn't send your request right now. Please call or WhatsApp us instead." },
      { status: 502 }
    );
  }
}
