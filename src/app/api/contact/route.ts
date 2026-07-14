import { NextResponse } from "next/server";
import { sendMail } from "@/lib/mail";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { firstName, lastName, email, subject, message } = data;

    // Direct basic validation (as requested: no libraries)
    if (!firstName || !lastName || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 },
      );
    }

    // Send the email
    await sendMail({
      firstName,
      lastName,
      email,
      subject,
      message,
    });

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 },
    );
  } catch (error: unknown) {
    const err = error as { message?: string; code?: string; command?: string; response?: string };
    console.error("Contact API Server Error Details:", {
      message: err.message,
      code: err.code,
      command: err.command,
      response: err.response,
    });

    return NextResponse.json(
      {
        error: err.message || "Failed to send email. Please try again later.",
      },
      { status: 500 },
    );
  }
}
