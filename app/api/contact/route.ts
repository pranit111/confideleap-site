import { Resend } from "resend";

import siteData from "@/content/site.json";

type ContactPayload = {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
};

export const runtime = "nodejs";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  const resendApiKey = process.env.RESEND_API_KEY;
  if (!resendApiKey) {
    return Response.json(
      { error: "Server is missing RESEND_API_KEY." },
      { status: 500 }
    );
  }

  const adminEmail = process.env.CONTACT_ADMIN_EMAIL ?? siteData.email;
  const fromEmail = process.env.RESEND_FROM_EMAIL ?? "ConfideLeap <onboarding@resend.dev>";

  if (!adminEmail) {
    return Response.json(
      { error: "Server is missing CONTACT_ADMIN_EMAIL." },
      { status: 500 }
    );
  }

  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return Response.json({ error: "Invalid request payload." }, { status: 400 });
  }

  const name = payload.name?.trim();
  const email = payload.email?.trim().toLowerCase();
  const phone = payload.phone?.trim();
  const subject = payload.subject?.trim();
  const message = payload.message?.trim();

  if (!name || !email || !subject || !message) {
    return Response.json(
      { error: "Please fill in all required fields." },
      { status: 400 }
    );
  }

  if (!isValidEmail(email)) {
    return Response.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  const resend = new Resend(resendApiKey);

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safePhone = escapeHtml(phone || "Not provided");
  const safeSubject = escapeHtml(subject);
  const safeMessage = escapeHtml(message);

  try {
    await Promise.all([
      resend.emails.send({
        from: fromEmail,
        to: [email],
        subject: "Thanks for contacting ConfideLeap",
        html: `
          <div style="font-family: Arial, sans-serif; color: #0e2530; line-height: 1.6;">
            <h2 style="margin-bottom: 8px;">Thanks for contacting us, ${safeName}.</h2>
            <p style="margin: 0 0 12px;">We have received your message and you will get assisted soon.</p>
            <p style="margin: 0 0 12px;">Our team will review your request and get back to you shortly.</p>
            <p style="margin: 0;">Regards,<br/>ConfideLeap Team</p>
          </div>
        `,
      }),
      resend.emails.send({
        from: fromEmail,
        to: [adminEmail],
        replyTo: email,
        subject: `New Contact Form Submission: ${safeSubject}`,
        html: `
          <div style="font-family: Arial, sans-serif; color: #0e2530; line-height: 1.6;">
            <h2 style="margin-bottom: 12px;">New Contact Form Submission</h2>
            <p style="margin: 0 0 6px;"><strong>Name:</strong> ${safeName}</p>
            <p style="margin: 0 0 6px;"><strong>Email:</strong> ${safeEmail}</p>
            <p style="margin: 0 0 6px;"><strong>Phone:</strong> ${safePhone}</p>
            <p style="margin: 0 0 6px;"><strong>Subject:</strong> ${safeSubject}</p>
            <p style="margin: 0 0 6px;"><strong>Message:</strong></p>
            <p style="margin: 0; white-space: pre-wrap;">${safeMessage}</p>
          </div>
        `,
      }),
    ]);

    return Response.json({ ok: true });
  } catch {
    return Response.json(
      { error: "Failed to send your message. Please try again." },
      { status: 500 }
    );
  }
}
