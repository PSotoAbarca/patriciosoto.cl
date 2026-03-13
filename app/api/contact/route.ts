import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import sanitizeHtml from "sanitize-html";

// ── Input validation schema (Zod) ─────────────────────────────────────────────
const ContactSchema = z.object({
  name: z.string().min(1).max(100).trim(),
  email: z.string().email().max(254).trim(),
  subject: z.string().min(1).max(200).trim(),
  message: z.string().min(1).max(2000).trim(),
  // Honeypot: must be empty — bots fill it, humans don't see it
  website: z.string().max(0).optional(),
});

// ── Simple in-memory rate limiter (resets on server restart / cold start) ─────
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;          // max requests per window
const WINDOW_MS = 60 * 60 * 1000; // 1 hour

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  if (entry.count >= RATE_LIMIT) return true;

  entry.count += 1;
  return false;
}

// ── Sanitize helper: strip ALL html tags ─────────────────────────────────────
function clean(value: string): string {
  return sanitizeHtml(value, { allowedTags: [], allowedAttributes: {} });
}

// ── Route handler ─────────────────────────────────────────────────────────────
export async function POST(request: NextRequest) {
  // 1. Rate limiting by IP
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Demasiados intentos. Inténtalo más tarde." },
      { status: 429 }
    );
  }

  // 2. Parse & validate body
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Cuerpo inválido." }, { status: 400 });
  }

  const parsed = ContactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Datos inválidos.", details: parsed.error.flatten().fieldErrors },
      { status: 422 }
    );
  }

  const { name, email, subject, message, website } = parsed.data;

  // 3. Honeypot check — silent reject
  if (website && website.length > 0) {
    return NextResponse.json({ ok: true }); // pretend success to confuse bots
  }

  // 4. Sanitize all inputs (strip HTML)
  const safeName    = clean(name);
  const safeEmail   = clean(email);
  const safeSubject = clean(subject);
  const safeMessage = clean(message);

  // 5. Dev mode (no API key)
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || apiKey === "re_placeholder") {
    console.log("[Contact form - DEV MODE] Message received (not sent)");
    return NextResponse.json({ ok: true, dev: true });
  }

  // 6. Send via Resend
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Formulario patriciosotoa.com <noreply@patriciosotoa.com>",
        to: ["hola@patriciosotoa.com"],
        reply_to: safeEmail,
        subject: `[patriciosotoa.com] ${safeSubject}`,
        // Plain-text version (safe)
        text: `Nombre: ${safeName}\nEmail: ${safeEmail}\nAsunto: ${safeSubject}\n\n${safeMessage}`,
        // HTML version: all values pre-sanitized, then escaped for HTML context
        html: `
          <p><strong>Nombre:</strong> ${safeName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <p><strong>Asunto:</strong> ${safeSubject}</p>
          <hr />
          <p style="white-space:pre-wrap">${safeMessage}</p>
        `,
      }),
    });

    if (!res.ok) {
      console.error("[Resend error] status:", res.status);
      return NextResponse.json({ error: "Error al enviar." }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[Contact route error]", err instanceof Error ? err.message : "unknown");
    return NextResponse.json({ error: "Error interno." }, { status: 500 });
  }
}
