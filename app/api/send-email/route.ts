import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { email, message } = await req.json();

    const { data, error } = await resend.emails.send({
      from: 'GRWUHI <onboarding@resend.dev>',
      to: email,
      subject: "New Contact Form Submission",
      html: `<p>${message}</p>`,
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ message: "Success", data }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}