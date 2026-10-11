import nodemailer from "nodemailer";
import { siteConfig } from "@/lib/site-config";
import { logActivity, logError } from "@/lib/config-logger";

let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (transporter) return transporter;

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    return null;
  }

  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 587,
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  return transporter;
}

export async function sendEnquiryEmail(options: {
  subject: string;
  replyTo?: string;
  lines: { label: string; value: string }[];
}) {
  const { subject, replyTo, lines } = options;

  const text = lines.map(({ label, value }) => `${label}: ${value}`).join("\n");
  const html = `<div style="font-family:sans-serif;font-size:15px;color:#222">
    <h2 style="margin-bottom:12px">${subject}</h2>
    <table cellpadding="6" style="border-collapse:collapse">
      ${lines
        .map(
          ({ label, value }) =>
            `<tr><td style="font-weight:600;vertical-align:top">${label}</td><td>${value.replace(/\n/g, "<br/>")}</td></tr>`
        )
        .join("")}
    </table>
  </div>`;

  const client = getTransporter();

  if (!client) {
    console.info("[email] SMTP not configured — logging enquiry instead:\n" + text);
    logError(`SMTP not configured — enquiry logged only: ${subject}`);
    return { delivered: false as const };
  }

  try {
    await client.sendMail({
      from: `"Grikim Website" <${process.env.SMTP_USER}>`,
      to: siteConfig.email,
      replyTo,
      subject,
      text,
      html,
    });
  } catch (error) {
    logError(`Failed to send "${subject}": ${error instanceof Error ? error.message : String(error)}`);
    throw error;
  }

  logActivity(`Sent "${subject}" from ${replyTo ?? "unknown sender"}`);
  return { delivered: true as const };
}
