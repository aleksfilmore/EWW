import { NextRequest, NextResponse } from "next/server";

const MAILERLITE_API = "https://connect.mailerlite.com/api";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required." }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    const apiKey = process.env.MAILERLITE_API_KEY;
    if (!apiKey) {
      console.error("MAILERLITE_API_KEY is not set");
      return NextResponse.json({ error: "Newsletter service not configured." }, { status: 500 });
    }

    const response = await fetch(`${MAILERLITE_API}/subscribers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        Accept: "application/json",
      },
      body: JSON.stringify({
        email,
        resubscribe: true,
        status: "active",
      }),
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      console.error("MailerLite error:", data);
      // 422 can mean the subscriber already exists — treat as success
      if (response.status === 422) {
        return NextResponse.json({ ok: true });
      }
      return NextResponse.json({ error: "Failed to subscribe." }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Subscribe route error:", err);
    return NextResponse.json({ error: "Unexpected error." }, { status: 500 });
  }
}
