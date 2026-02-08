import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { getContactEmailHtml, getContactEmailText } from "@/lib/contactEmailTemplate";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const rateLimitMap = new Map();

function getClientIp(request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp;
  return "unknown";
}

function checkRateLimit(ip) {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true };
  }
  if (now >= entry.resetAt) {
    entry.count = 1;
    entry.resetAt = now + RATE_LIMIT_WINDOW_MS;
    return { allowed: true };
  }
  entry.count += 1;
  if (entry.count > RATE_LIMIT_MAX_REQUESTS) {
    return { allowed: false, retryAfter: Math.ceil((entry.resetAt - now) / 1000) };
  }
  return { allowed: true };
}

function validateBody(body) {
  const { email, name, message, website } = body;
  const honeypotFilled = typeof website === "string" && website.trim() !== "";
  if (!email || typeof email !== "string" || !emailRegex.test(email.trim())) {
    return { valid: false, error: "Invalid or missing email." };
  }
  if (!name || typeof name !== "string" || !name.trim()) {
    return { valid: false, error: "Name is required." };
  }
  if (!message || typeof message !== "string" || !message.trim()) {
    return { valid: false, error: "Message is required." };
  }
  return {
    valid: true,
    honeypot: honeypotFilled,
    data: { email: email.trim(), name: name.trim(), message: message.trim() },
  };
}

export async function POST(request) {
  try {
    const ip = getClientIp(request);
    const rateLimit = checkRateLimit(ip);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: "Too many requests. Please try again later.",
          retryAfter: rateLimit.retryAfter,
        },
        { status: 429 }
      );
    }

    const body = await request.json();
    const validation = validateBody(body);
    if (!validation.valid) {
      return NextResponse.json(
        { success: false, error: validation.error },
        { status: 400 }
      );
    }
    if (validation.honeypot) {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    const { email, name, message } = validation.data;
    const host = process.env.SMTP_HOST;
    const port = process.env.SMTP_PORT;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const toEmail = process.env.CONTACT_EMAIL || user;

    if (!host || !port || !user || !pass) {
      return NextResponse.json(
        { success: false, error: "Email service is not configured." },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host,
      port: Number(port),
      secure: Number(port) === 465,
      auth: { user, pass },
    });

    const payload = { name, email, message };
    await transporter.sendMail({
      from: user,
      to: toEmail,
      subject: `Contact form: ${name}`,
      text: getContactEmailText(payload),
      html: getContactEmailHtml(payload),
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to send message." },
      { status: 500 }
    );
  }
}
