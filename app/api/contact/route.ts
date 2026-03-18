import { NextResponse } from "next/server";

const WEB3FORMS_KEY = process.env.WEB3FORMS_ACCESS_KEY;
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const TO_EMAIL = process.env.CONTACT_EMAIL || "yakovroass@gmail.com";
const FROM_EMAIL = process.env.RESEND_FROM || "EQS.PORT Website <onboarding@resend.dev>";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, message } = body as {
      name?: string;
      email?: string;
      company?: string;
      message?: string;
    };

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ error: "Missing required fields: name, email, message" }, { status: 400 });
    }

    const subject = `[EQS.PORT] Investment inquiry from ${name}${company ? ` — ${company}` : ""}`;
    const textBody = `Name: ${name}\nEmail: ${email}\nCompany: ${company || "—"}\n\nMessage:\n${message}`;

    // Web3Forms — no domain verification; set WEB3FORMS_ACCESS_KEY in Amplify
    if (WEB3FORMS_KEY) {
      const w3 = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject,
          from_name: name,
          email,
          message: textBody,
          replyto: email,
        }),
      });
      const w3Json = (await w3.json()) as { success?: boolean; message?: string };
      if (!w3.ok || !w3Json.success) {
        console.error("Web3Forms error:", w3Json);
        return NextResponse.json(
          { error: w3Json.message || "Failed to send message" },
          { status: 500 }
        );
      }
      return NextResponse.json({ ok: true, via: "web3forms" });
    }

    if (RESEND_API_KEY) {
      const { Resend } = await import("resend");
      const resend = new Resend(RESEND_API_KEY);
      const { data, error } = await resend.emails.send({
        from: FROM_EMAIL,
        to: TO_EMAIL,
        subject,
        text: textBody,
      });
      if (error) {
        console.error("Resend error:", error);
        return NextResponse.json({ error: error.message || "Failed to send" }, { status: 500 });
      }
      return NextResponse.json({ ok: true, id: data?.id, via: "resend" });
    }

    return NextResponse.json(
      {
        error:
          "Email not configured. Add WEB3FORMS_ACCESS_KEY (recommended) or RESEND_API_KEY in Amplify environment variables, then redeploy.",
      },
      { status: 503 }
    );
  } catch (e) {
    console.error("Contact API error:", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
