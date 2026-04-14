import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const VALID_TZ = new Set(Intl.supportedValuesOf("timeZone"));

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

  const { firstName, lastName, email, date, hour, minute, timeZone, notes } =
    body as Record<string, unknown>;

  const errors: string[] = [];

  if (typeof firstName !== "string" || !firstName.trim())
    errors.push("First name is required.");
  if (typeof lastName !== "string" || !lastName.trim())
    errors.push("Last name is required.");
  if (typeof email !== "string" || !email.trim() || !email.includes("@"))
    errors.push("A valid email is required.");

  if (
    (typeof firstName === "string" && firstName.length > 100) ||
    (typeof lastName === "string" && lastName.length > 100)
  )
    errors.push("Name fields must be under 100 characters.");

  if (typeof date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(date))
    errors.push("A valid date (YYYY-MM-DD) is required.");
  if (typeof hour !== "number" || hour < 0 || hour > 23)
    errors.push("A valid hour is required.");
  if (typeof minute !== "number" || (minute !== 0 && minute !== 30))
    errors.push("A valid minute is required.");
  if (typeof timeZone !== "string" || !VALID_TZ.has(timeZone))
    errors.push("A valid time zone is required.");

  if (typeof notes === "string" && notes.length > 2000)
    errors.push("Notes must be under 2,000 characters.");

  if (errors.length > 0) {
    return NextResponse.json({ error: errors.join(" ") }, { status: 400 });
  }

  const trimmedFirst = (firstName as string).trim();
  const trimmedLast = (lastName as string).trim();
  const trimmedEmail = (email as string).trim();
  const trimmedNotes =
    typeof notes === "string" ? notes.trim() : "";

  const slotDate = new Date(`${date}T${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}:00`);
  const formattedSlot = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: timeZone as string,
  }).format(slotDate);

  const shortDate = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: timeZone as string,
  }).format(slotDate);

  const lines = [
    `Name: ${trimmedFirst} ${trimmedLast}`,
    `Email: ${trimmedEmail}`,
    "",
    `Requested slot: ${formattedSlot}`,
    `Time zone: ${timeZone}`,
  ];
  if (trimmedNotes) {
    lines.push("", `Notes: ${trimmedNotes}`);
  }

  try {
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: trimmedEmail,
      subject: `Call request: ${trimmedFirst} ${trimmedLast} — ${shortDate}`,
      text: lines.join("\n"),
    });

    if (error) {
      console.error("Resend API error:", error);
      return NextResponse.json(
        { error: "Failed to send request. Please try again." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Unexpected send error:", err);
    return NextResponse.json(
      { error: "Failed to send request. Please try again." },
      { status: 500 },
    );
  }
}
