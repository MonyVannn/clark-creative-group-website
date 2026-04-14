import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const from = process.env.RESEND_FROM;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!from || !to) {
    console.error("Missing RESEND_FROM or CONTACT_TO_EMAIL env vars");
    return NextResponse.json(
      { error: "Server configuration error." },
      { status: 500 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 },
    );
  }

  const { firstName, lastName, email, message, phone, company } = body as Record<
    string,
    unknown
  >;

  const errors: string[] = [];

  if (typeof firstName !== "string" || !firstName.trim())
    errors.push("First name is required.");
  if (typeof lastName !== "string" || !lastName.trim())
    errors.push("Last name is required.");
  if (typeof email !== "string" || !email.trim() || !email.includes("@"))
    errors.push("A valid email is required.");
  if (typeof message !== "string" || !message.trim())
    errors.push("Message is required.");

  if (
    (typeof firstName === "string" && firstName.length > 100) ||
    (typeof lastName === "string" && lastName.length > 100)
  )
    errors.push("Name fields must be under 100 characters.");

  if (typeof message === "string" && message.length > 10_000)
    errors.push("Message must be under 10,000 characters.");

  const phoneStr =
    typeof phone === "string" && phone.trim() ? phone.trim() : "";
  const companyStr =
    typeof company === "string" && company.trim() ? company.trim() : "";
  if (phoneStr.length > 50) errors.push("Phone must be under 50 characters.");
  if (companyStr.length > 200)
    errors.push("Company must be under 200 characters.");

  if (errors.length > 0) {
    return NextResponse.json({ error: errors.join(" ") }, { status: 400 });
  }

  const trimmedFirst = (firstName as string).trim();
  const trimmedLast = (lastName as string).trim();
  const trimmedEmail = (email as string).trim();
  const trimmedMessage = (message as string).trim();

  try {
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: trimmedEmail,
      subject: `New contact: ${trimmedFirst} ${trimmedLast}`,
      text: [
        `Name: ${trimmedFirst} ${trimmedLast}`,
        `Email: ${trimmedEmail}`,
        ...(phoneStr ? [`Phone: ${phoneStr}`] : []),
        ...(companyStr ? [`Company: ${companyStr}`] : []),
        "",
        trimmedMessage,
      ].join("\n"),
    });

    if (error) {
      console.error("Resend API error:", error);
      return NextResponse.json(
        { error: "Failed to send message. Please try again." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Unexpected send error:", err);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 },
    );
  }
}
