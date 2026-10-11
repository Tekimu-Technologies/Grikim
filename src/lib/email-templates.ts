import { siteConfig } from "@/lib/site-config";

// Hex equivalents of the site's OKLCH theme tokens (globals.css) -- email
// clients don't support oklch()/CSS variables, so these are the computed
// sRGB values for the light theme palette.
const COLOR = {
  primary: "#c4530f",
  primaryDark: "#9c4109",
  primaryForeground: "#fdfcf8",
  background: "#fbfaf7",
  foreground: "#201914",
  muted: "#f2eee7",
  mutedForeground: "#665b53",
  accent: "#efdecc",
  border: "#e3ddd6",
} as const;

const SITE_URL = "https://grikimenterpriseltd.co.ke";
// Hosted, not a cid: attachment -- a brand-new sending domain with zero
// reputation plus a MIME attachment is a strong spam-filter trigger
// (confirmed: Truehost hard-rejected both emails with "550 high-probability
// spam" until the attachment was removed in favour of this).
const LOGO_URL = `${SITE_URL}/email/logo.png`;

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function button(label: string, href: string) {
  return `
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:28px auto 4px">
      <tr>
        <td align="center" style="border-radius:10px;background:${COLOR.primary};">
          <a href="${href}" style="display:inline-block;padding:14px 32px;font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:15px;font-weight:600;color:${COLOR.primaryForeground};text-decoration:none;border-radius:10px;">
            ${escapeHtml(label)}
          </a>
        </td>
      </tr>
    </table>`;
}

function detailsCard(rows: { label: string; value: string }[]) {
  const rowsHtml = rows
    .map(
      ({ label, value }, i) => `
      <tr style="background:${i % 2 === 0 ? COLOR.background : COLOR.muted};">
        <td style="padding:13px 18px;font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:13px;font-weight:600;color:${COLOR.mutedForeground};text-transform:uppercase;letter-spacing:0.04em;white-space:nowrap;vertical-align:top;width:130px;">
          ${escapeHtml(label)}
        </td>
        <td style="padding:13px 18px;font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:15px;color:${COLOR.foreground};line-height:1.5;">
          ${escapeHtml(value).replace(/\n/g, "<br/>")}
        </td>
      </tr>`
    )
    .join("");

  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${COLOR.border};border-radius:12px;overflow:hidden;margin:20px 0;">
      ${rowsHtml}
    </table>`;
}

function layout(options: { previewText: string; eyebrow: string; title: string; bodyHtml: string }) {
  const { previewText, eyebrow, title, bodyHtml } = options;

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<meta name="color-scheme" content="light"/>
<title>${escapeHtml(title)}</title>
</head>
<body style="margin:0;padding:0;background:${COLOR.muted};">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(previewText)}</div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${COLOR.muted};padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:100%;background:${COLOR.background};border-radius:16px;overflow:hidden;box-shadow:0 1px 3px rgba(32,25,20,0.08);">

          <!-- Header band -->
          <tr>
            <td style="background:linear-gradient(135deg,${COLOR.primary},${COLOR.primaryDark});background-color:${COLOR.primary};padding:26px 28px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="48" style="vertical-align:middle;">
                    <img src="${LOGO_URL}" width="40" height="40" alt="Grikim" style="display:block;border-radius:9px;"/>
                  </td>
                  <td style="vertical-align:middle;padding-left:12px;">
                    <div style="font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:17px;font-weight:700;color:${COLOR.primaryForeground};letter-spacing:0.01em;">
                      GRIKIM <span style="font-weight:400;opacity:0.9;">Enterprise Ltd</span>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Eyebrow / accent strip -->
          <tr>
            <td style="background:${COLOR.accent};padding:10px 28px;">
              <div style="font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:${COLOR.primaryDark};">
                ${escapeHtml(eyebrow)}
              </div>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:30px 28px 10px;">
              <h1 style="margin:0 0 6px;font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:22px;font-weight:700;color:${COLOR.foreground};">
                ${escapeHtml(title)}
              </h1>
              ${bodyHtml}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:28px 28px 32px;border-top:1px solid ${COLOR.border};margin-top:10px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding-top:22px;">
                    <img src="${LOGO_URL}" width="32" height="32" alt="Grikim" style="display:block;border-radius:7px;margin:0 auto 10px;"/>
                    <div style="font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:14px;font-weight:700;color:${COLOR.foreground};">
                      ${escapeHtml(siteConfig.name)}
                    </div>
                    <div style="font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:12px;color:${COLOR.mutedForeground};margin-top:4px;">
                      ${escapeHtml(siteConfig.tagline)}
                    </div>

                    <div style="font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:13px;color:${COLOR.mutedForeground};line-height:1.9;margin-top:16px;">
                      ${escapeHtml(siteConfig.location)}<br/>
                      <a href="${siteConfig.phoneHref}" style="color:${COLOR.primary};text-decoration:none;font-weight:600;">${escapeHtml(siteConfig.phone)}</a>
                      &nbsp;&middot;&nbsp;
                      <a href="${siteConfig.emailHref}" style="color:${COLOR.primary};text-decoration:none;font-weight:600;">${escapeHtml(siteConfig.email)}</a>
                    </div>

                    <div style="font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:12px;color:${COLOR.mutedForeground};margin-top:14px;">
                      <a href="${siteConfig.socials.instagram}" style="color:${COLOR.mutedForeground};text-decoration:none;">Instagram</a>
                      &nbsp;&middot;&nbsp;
                      <a href="${siteConfig.socials.x}" style="color:${COLOR.mutedForeground};text-decoration:none;">X</a>
                      &nbsp;&middot;&nbsp;
                      <a href="${siteConfig.whatsappHref}" style="color:${COLOR.mutedForeground};text-decoration:none;">WhatsApp</a>
                    </div>

                    <div style="margin-top:18px;">
                      <a href="${SITE_URL}" style="font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:12px;color:${COLOR.primary};text-decoration:none;font-weight:600;">
                        grikimenterpriseltd.co.ke &rarr;
                      </a>
                    </div>

                    <div style="font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:11px;color:${COLOR.mutedForeground};opacity:0.75;margin-top:18px;">
                      &copy; ${new Date().getFullYear()} ${escapeHtml(siteConfig.name)}. All rights reserved.
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function businessNotificationEmail(options: {
  subject: string;
  submitterName: string;
  rows: { label: string; value: string }[];
  replyTo?: string;
}) {
  const { subject, submitterName, rows, replyTo } = options;

  const bodyHtml = `
    <p style="margin:0;font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:15px;color:${COLOR.mutedForeground};line-height:1.6;">
      ${escapeHtml(submitterName)} just submitted this through the Grikim website. Full details below.
    </p>
    ${detailsCard(rows)}
    ${replyTo ? button(`Reply to ${submitterName}`, `mailto:${replyTo}`) : ""}
  `;

  return layout({
    previewText: `${subject} from ${submitterName}`,
    eyebrow: "Website enquiry",
    title: subject,
    bodyHtml,
  });
}

export function customerConfirmationEmail(options: {
  customerName: string;
  heading: string;
  intro: string;
  rows: { label: string; value: string }[];
}) {
  const { customerName, heading, intro, rows } = options;
  const firstName = customerName.trim().split(/\s+/)[0] || customerName;

  const bodyHtml = `
    <p style="margin:0 0 4px;font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:15px;color:${COLOR.foreground};line-height:1.6;">
      Hi ${escapeHtml(firstName)},
    </p>
    <p style="margin:0;font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:15px;color:${COLOR.mutedForeground};line-height:1.6;">
      ${escapeHtml(intro)}
    </p>
    ${detailsCard(rows)}
    <p style="margin:18px 0 0;font-family:'Segoe UI',Helvetica,Arial,sans-serif;font-size:14px;color:${COLOR.mutedForeground};line-height:1.6;">
      Need to reach us sooner? Call or WhatsApp
      <a href="${siteConfig.phoneHref}" style="color:${COLOR.primary};font-weight:600;text-decoration:none;">${escapeHtml(siteConfig.phone)}</a>
      &mdash; we're one message away.
    </p>
    ${button("Chat with us on WhatsApp", siteConfig.whatsappHref)}
  `;

  return layout({
    previewText: `Thanks for reaching out to Grikim Enterprise Ltd`,
    eyebrow: "We received your message",
    title: heading,
    bodyHtml,
  });
}
