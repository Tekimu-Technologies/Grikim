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
    logActivity(`Blocked corporate submission: cross-origin request from ${getClientIp(req)}`);
    return NextResponse.json({ error: "Invalid request." }, { status: 403 });
  }

  const ip = getClientIp(req);
  if (!rateLimit(`corporate:${ip}`, 5, 10 * 60 * 1000)) {
    logActivity(`Blocked corporate submission: rate limit exceeded for ${ip}`);
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
    logActivity(`Blocked corporate submission: honeypot tripped from ${ip}`);
    return NextResponse.json({ ok: true, delivered: true });
  }

  const { company, name, phone, email, need, details } = record;

  if (typeof name !== "string" || name.trim().length < 2 || !withinLength(name, 150)) {
    return NextResponse.json({ error: "Please share your name." }, { status: 400 });
  }
  if (typeof phone !== "string" || !isPlausiblePhone(phone)) {
    return NextResponse.json({ error: "Please share a valid phone number." }, { status: 400 });
  }
  if (typeof email !== "string" || !email.includes("@") || !withinLength(email, 190)) {
    return NextResponse.json({ error: "Please share a valid work email." }, { status: 400 });
  }
  if (typeof need !== "string" || need.trim().length < 2) {
    return NextResponse.json({ error: "Please select what you need." }, { status: 400 });
  }
  if (!withinLength(details, 3000) || !withinLength(company, 200)) {
    return NextResponse.json({ error: "One of the fields is too long." }, { status: 400 });
  }

  const submitterName = name.trim();
  const submitterEmail = email.trim();
  const rows = [
    { label: "Company / organisation", value: typeof company === "string" ? company.trim() || "—" : "—" },
    { label: "Name", value: submitterName },
    { label: "Phone", value: phone.trim() },
    { label: "Work email", value: submitterEmail },
    { label: "Need", value: need.trim() },
    { label: "Contract / tender details", value: typeof details === "string" ? details.trim() || "—" : "—" },
  ];

  try {
    const result = await sendEnquiryEmail({
      subject: `New corporate enquiry — ${need.trim()}`,
      submitterName,
      replyTo: submitterEmail,
      rows,
    });

    void sendCustomerConfirmation({
      to: submitterEmail,
      customerName: submitterName,
      heading: "We've received your corporate enquiry",
      intro: `Thanks for reaching out about ${need.trim()}. Our team has your request and will be in touch shortly with next steps.`,
      rows,
    });

    return NextResponse.json({ ok: true, delivered: result.delivered });
  } catch (error) {
    logError(`[api/corporate] failed to send enquiry: ${error instanceof Error ? error.message : String(error)}`);
    console.error("[api/corporate] failed to send enquiry", error);
    return NextResponse.json(
      { error: "We couldn't send your request right now. Please call or email us instead." },
      { status: 502 }
    );
  }
}
