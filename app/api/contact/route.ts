import { NextResponse } from "next/server";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const TO_EMAIL = process.env.CONTACT_EMAIL || "yakovroass@gmail.com";
const FROM_EMAIL = process.env.RESEND_FROM || "EQS.PORT Website <onboarding@resend.dev>";

export async function POST(request: Request) {
  if (!RESEND_API_KEY) {
    return NextResponse.json(
      { error: "Email service not configured. Set RESEND_API_KEY in environment." },
      { status: 503 }
    );
  }

  try {
    const body = await request.json();
    const { name, email, company, message } = body as { name?: string; email?: string; company?: string; message?: string };

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ error: "Missing required fields: name, email, message" }, { status: 400 });
    }

    const { Resend } = await import("resend");
    const resend = new Resend(RESEND_API_KEY);

    const subject = `[EQS.PORT] Investment inquiry from ${name}${company ? ` — ${company}` : ""}`;
    const text = `Name: ${name}\nEmail: ${email}\nCompany: ${company || "—"}\n\nMessage:\n${message}`;

    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      subject,
      text,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: error.message || "Failed to send" }, { status: 500 });
    }

    return NextResponse.json({ ok: true, id: data?.id });
  } catch (e) {
    console.error("Contact API error:", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
