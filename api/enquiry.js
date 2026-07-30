/* Enquiry handler. Runs on Vercel, server-side.
 *
 * The Resend API key lives in an environment variable and never reaches the
 * browser. This whole site is static and public, so a key in site.js would be
 * readable by anyone viewing source and usable to send mail as this domain.
 *
 * The Resend integration on Vercel Marketplace sets two of these for you:
 *
 *   RESEND_API_KEY        set by the integration   the sending key
 *   RESEND_EMAIL_DOMAIN   set by the integration   a domain Resend has verified
 *   ENQUIRY_TO            optional                 default jeremy@badenbower.com
 *   ENQUIRY_FROM          optional                 overrides the From address
 *
 * The From address has to sit on a domain Resend has verified, or the send is
 * rejected. Resolution order below: ENQUIRY_FROM if you set one, otherwise
 * enquiries@RESEND_EMAIL_DOMAIN from the integration, otherwise
 * onboarding@resend.dev, which Resend accepts from anyone and is only good for
 * a smoke test.
 *
 * To send as maseratighibliopencup.com, verify that domain at resend.com/domains,
 * add the DNS records it gives you, then set ENQUIRY_FROM to
 * enquiries@maseratighibliopencup.com.
 *
 * No npm dependency: this calls the REST API with fetch, which the Vercel Node
 * runtime provides. The site keeps its "no build step" property.
 */

const TO_DEFAULT = "jeremy@badenbower.com";
/* The integration provisions a verified domain; use it unless told otherwise. */
function fromAddress() {
  if (process.env.ENQUIRY_FROM) return process.env.ENQUIRY_FROM;
  const d = process.env.RESEND_EMAIL_DOMAIN;
  if (d) return `enquiries@${d.replace(/^https?:\/\//, "").replace(/\/+$/, "")}`;
  return "onboarding@resend.dev";
}
const MAX = { name: 200, email: 320, phone: 60, message: 5000 };

const clean = (v, limit) =>
  typeof v === "string" ? v.trim().slice(0, limit) : "";

const escapeHtml = (s) =>
  s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])
  );

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.error("RESEND_API_KEY is not set");
    return res.status(500).json({ error: "not_configured" });
  }

  let body = req.body;
  if (typeof body === "string") {
    try { body = JSON.parse(body); } catch { body = {}; }
  }
  body = body || {};

  /* Honeypot. Real people leave it empty; bots fill everything in. Answer 200
     so the bot believes it worked and does not retry. */
  if (clean(body.company, 100)) return res.status(200).json({ ok: true });

  const name = clean(body.name, MAX.name);
  const email = clean(body.email, MAX.email);
  const phone = clean(body.phone, MAX.phone);
  const message = clean(body.message, MAX.message);

  const errors = {};
  if (!name) errors.name = "Add your name so we know who is asking.";
  if (!email) errors.email = "Add an email so we can reply.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.email = "That email does not look complete. Check it and try again.";
  if (!message) errors.message = "Add a line or two so we can answer properly.";
  if (Object.keys(errors).length) return res.status(400).json({ errors });

  /* Header injection guard: a newline in a header field would let someone
     append their own headers. */
  const safeName = name.replace(/[\r\n]+/g, " ");

  const rows = [
    ["Name", name],
    ["Email", email],
    ["Phone", phone || "not given"],
  ]
    .map(
      ([k, v]) =>
        `<tr><td style="padding:4px 16px 4px 0;color:#8a8a8a;font:13px system-ui">${k}</td>` +
        `<td style="padding:4px 0;font:15px system-ui">${escapeHtml(v)}</td></tr>`
    )
    .join("");

  const html =
    `<div style="font:15px/1.6 system-ui;color:#111">` +
    `<p style="margin:0 0 16px;font:600 13px system-ui;letter-spacing:.08em;text-transform:uppercase;color:#8a8a8a">` +
    `Enquiry from maseratighibliopencup.com</p>` +
    `<table style="border-collapse:collapse;margin-bottom:20px">${rows}</table>` +
    `<div style="white-space:pre-wrap;padding:16px;background:#f6f6f4;border-radius:2px">` +
    `${escapeHtml(message)}</div></div>`;

  const text =
    `Enquiry from maseratighibliopencup.com\n\n` +
    `Name:  ${name}\nEmail: ${email}\nPhone: ${phone || "not given"}\n\n${message}\n`;

  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `Ghibli Open Cup <${fromAddress()}>`,
        to: [process.env.ENQUIRY_TO || TO_DEFAULT],
        reply_to: email,
        subject: `Ghibli Open Cup enquiry from ${safeName}`,
        html,
        text,
      }),
    });

    if (!r.ok) {
      const detail = await r.text();
      console.error("Resend rejected the send:", r.status, detail);
      return res.status(502).json({ error: "send_failed" });
    }
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Resend request failed:", err);
    return res.status(502).json({ error: "send_failed" });
  }
}
