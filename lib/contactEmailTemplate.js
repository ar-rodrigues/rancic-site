/**
 * HTML email template for contact form submissions.
 * Uses site colors; edit the STYLES object and this file to alter layout and branding.
 */

const STYLES = {
  pageBg: "#f5f5f5",
  cardBg: "#ffffff",
  cardBorder: "#24A4FF",
  cardRadius: "12px",
  accent: "#0e42a1",
  accentLight: "#3d8bda",
  text: "#171717",
  textMuted: "#666666",
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
};

function escapeHtml(text) {
  if (typeof text !== "string") return "";
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/\n/g, "<br>");
}

/**
 * Builds the HTML body for the contact form notification email.
 * @param {Object} params
 * @param {string} params.name - Sender name
 * @param {string} params.email - Sender email
 * @param {string} params.message - Message body
 * @returns {string} HTML string suitable for nodemailer html option
 */
export function getContactEmailHtml({ name, email, message }) {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message);

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Contact form submission</title>
</head>
<body style="margin:0; padding:0; background-color:${STYLES.pageBg}; font-family:${STYLES.fontFamily};">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:${STYLES.pageBg}; padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px; background-color:${STYLES.cardBg}; border:1px solid ${STYLES.cardBorder}; border-radius:${STYLES.cardRadius}; box-shadow:0 4px 20px rgba(0,0,0,0.08);">
          <tr>
            <td style="padding:24px 24px 16px; border-bottom:2px solid ${STYLES.accent};">
              <h1 style="margin:0; font-size:20px; font-weight:700; color:${STYLES.accent};">
                New contact form message
              </h1>
            </td>
          </tr>
          <tr>
            <td style="padding:24px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="padding:8px 0; width:100px; vertical-align:top; font-weight:600; color:${STYLES.textMuted}; font-size:14px;">Name</td>
                  <td style="padding:8px 0; font-size:15px; color:${STYLES.text};">${safeName}</td>
                </tr>
                <tr>
                  <td style="padding:8px 0; font-weight:600; color:${STYLES.textMuted}; font-size:14px;">Email</td>
                  <td style="padding:8px 0; font-size:15px; color:${STYLES.text};"><a href="mailto:${safeEmail}" style="color:${STYLES.accentLight}; text-decoration:none;">${safeEmail}</a></td>
                </tr>
                <tr>
                  <td style="padding:12px 0 8px; font-weight:600; color:${STYLES.textMuted}; font-size:14px; vertical-align:top;">Message</td>
                  <td style="padding:12px 0 8px; font-size:15px; color:${STYLES.text}; line-height:1.6;">${safeMessage}</td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:16px 24px; background-color:${STYLES.pageBg}; border-radius:0 0 ${STYLES.cardRadius} ${STYLES.cardRadius}; font-size:12px; color:${STYLES.textMuted};">
              Sent via website contact form
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`.trim();
}

/**
 * Plain-text fallback for the same content.
 * @param {Object} params
 * @param {string} params.name
 * @param {string} params.email
 * @param {string} params.message
 * @returns {string}
 */
export function getContactEmailText({ name, email, message }) {
  return `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\n---\nSent via website contact form`;
}
