import nodemailer from "nodemailer";
import { siteConfig } from "@/lib/site-config";
import { logActivity, logError } from "@/lib/config-logger";
import { businessNotificationEmail, customerConfirmationEmail } from "@/lib/email-templates";

let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (transporter) return transporter;

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_PASS_B64 } = process.env;

  // cPanel's Node.js App env var export script breaks on values containing
  // "=" (like this password), mangling the vars that follow it. SMTP_PASS_B64
  // is a padding-stripped base64 workaround for that cPanel bug; SMTP_PASS
  // (plain) is used when set directly, e.g. in local dev.
  const smtpPass = SMTP_PASS_B64
    ? Buffer.from(SMTP_PASS_B64, "base64").toString("utf8")
    : SMTP_PASS;

  if (!SMTP_HOST || !SMTP_USER || !smtpPass) {
    return null;
  }

  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 587,
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: smtpPass },
  });

  return transporter;
}

function textFromRows(intro: string, rows: { label: string; value: string }[]) {
  return [intro, "", ...rows.map(({ label, value }) => `${label}: ${value}`)].join("\n");
}

async function sendHtmlEmail(options: {
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
  logLabel: string;
}) {
  const { to, subject, html, text, replyTo, logLabel } = options;
  const client = getTransporter();

  if (!client) {
    console.info(`[email] SMTP not configured — logging ${logLabel} instead:\n` + text);
    logError(`SMTP not configured — ${logLabel} logged only: ${subject}`);
    return { delivered: false as const };
  }

  // MAIL_FROM is the visible "From" address (defaults to SMTP_USER, since
  // on the current setup they're the same account). Kept as a separate
  // variable in case the auth identity and the visible sender ever need to
  // differ.
  const fromAddress = process.env.MAIL_FROM || process.env.SMTP_USER;

  try {
    await client.sendMail({
      from: `"Grikim Website" <${fromAddress}>`,
      to,
      replyTo,
      subject,
      text,
      html,
    });
  } catch (error) {
    logError(`Failed to send ${logLabel} "${subject}": ${error instanceof Error ? error.message : String(error)}`);
    throw error;
  }

  logActivity(`Sent ${logLabel} "${subject}" to ${to}`);
  return { delivered: true as const };
}

export async function sendEnquiryEmail(options: {
  subject: string;
  submitterName: string;
  replyTo?: string;
  rows: { label: string; value: string }[];
}) {
  const { subject, submitterName, replyTo, rows } = options;

  return sendHtmlEmail({
    to: siteConfig.email,
    subject,
    replyTo,
    html: businessNotificationEmail({ subject, submitterName, rows, replyTo }),
    text: textFromRows(`${submitterName} just submitted this through the Grikim website.`, rows),
    logLabel: "business notification",
  });
}

export async function sendCustomerConfirmation(options: {
  to: string;
  customerName: string;
  heading: string;
  intro: string;
  rows: { label: string; value: string }[];
}) {
  const { to, customerName, heading, intro, rows } = options;

  try {
    return await sendHtmlEmail({
      to,
      subject: heading,
      html: customerConfirmationEmail({ customerName, heading, intro, rows }),
      text: textFromRows(intro, rows),
      logLabel: "customer confirmation",
    });
  } catch {
    // A failed confirmation email should never fail the enquiry itself --
    // the business notification is what matters; this is a nice-to-have.
    return { delivered: false as const };
  }
}
