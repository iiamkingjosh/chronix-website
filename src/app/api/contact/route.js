import { Resend } from "resend";

export const runtime = "nodejs";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const body = await req.json();

    const { firstName, lastName, email, phone, message } = body;

    console.log("Incoming form data:", body);

    const response = await resend.emails.send({
      from: "Chronix <info@chronixtechnology.com>", // ✅ YOUR VERIFIED DOMAIN
      to: "info@chronixtechnology.com", // ✅ WHERE YOU RECEIVE MAILS
      subject: "New Contact Form Message",
      html: `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `,
    });

    console.log("Resend response:", response);

    return new Response(
      JSON.stringify({
        success: true,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("ERROR SENDING EMAIL:", error);

    return new Response(
      JSON.stringify({
        success: false,
      }),
      { status: 500 }
    );
  }
}