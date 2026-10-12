import { NextResponse } from "next/server";
import { sendMail } from "@/lib/mail";

/* ─── Limits ──────────────────────────────────────────────── */

const MAX_LENGTH = {
  firstName: 80,
  lastName: 80,
  email: 254,
  subject: 200,
  message: 5000,
} as const;

type ContactField = keyof typeof MAX_LENGTH;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/*
 * Best-effort rate limit: 5 messages per IP per 10 minutes, per server
 * instance. Good enough to stop casual abuse of the SMTP account; use a
 * shared store (e.g. Upstash/Redis) if you need a hard guarantee.
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear(); // bound memory
  return recent.length > MAX_PER_WINDOW;
}

function clientIp(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

/* ─── Handler ─────────────────────────────────────────────── */

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real visitors never fill this hidden field. Pretend success.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ message: "Email sent successfully" }, { status: 200 });
  }

  if (isRateLimited(clientIp(request))) {
    return NextResponse.json(
      { error: "Too many messages. Please try again in a few minutes." },
      { status: 429 },
    );
  }

  const fields = {} as Record<ContactField, string>;
  for (const key of Object.keys(MAX_LENGTH) as ContactField[]) {
    const value = body[key];
    if (typeof value !== "string" || value.trim() === "") {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }
    if (value.length > MAX_LENGTH[key]) {
      return NextResponse.json({ error: `${key} is too long` }, { status: 400 });
    }
    fields[key] = value.trim();
  }

  if (!EMAIL_REGEX.test(fields.email)) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
  }

  try {
    await sendMail(fields);
    return NextResponse.json({ message: "Email sent successfully" }, { status: 200 });
  } catch (error: unknown) {
    // Log details server-side only; never leak SMTP internals to the browser.
    const err = error as { message?: string; code?: string; command?: string };
    console.error("Contact API: failed to send email", {
      message: err.message,
      code: err.code,
      command: err.command,
    });
    return NextResponse.json(
      { error: "Failed to send email. Please try again later." },
      { status: 500 },
    );
  }
}
