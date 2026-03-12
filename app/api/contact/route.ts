import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { name, email, subject, message } = await request.json();

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: "Todos los campos son requeridos." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;

  // If no API key configured, return success in dev mode
  if (!apiKey || apiKey === "re_placeholder") {
    console.log("[Contact form - DEV MODE]", { name, email, subject, message });
    return NextResponse.json({ ok: true, dev: true });
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Formulario <noreply@patriciosotoa.com>",
        to: ["hola@patriciosotoa.com"],
        reply_to: email,
        subject: `[patriciosotoa.com] ${subject}`,
        text: `Nombre: ${name}\nEmail: ${email}\n\n${message}`,
        html: `
          <p><strong>Nombre:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Asunto:</strong> ${subject}</p>
          <hr />
          <p>${message.replace(/\n/g, "<br/>")}</p>
        `,
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      console.error("[Resend error]", err);
      return NextResponse.json({ error: "Error al enviar." }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[Contact route error]", err);
    return NextResponse.json({ error: "Error interno." }, { status: 500 });
  }
}
