// Envoi du formulaire de contact via l'API Resend (https://resend.com).
// Tant que RESEND_API_KEY n'est pas configurée, on renvoie 503 et le
// client retombe sur le mailto: classique.
const CONTACT_TO = process.env.CONTACT_TO ?? "arqdev@outlook.fr";
// L'adresse d'expédition par défaut de Resend fonctionne sans domaine vérifié.
const CONTACT_FROM = process.env.CONTACT_FROM ?? "ARQDEV <onboarding@resend.dev>";

const MAX_LENGTHS = { name: 200, email: 320, message: 5000 } as const;

export async function POST(req: Request) {
  if (!process.env.RESEND_API_KEY) {
    return Response.json({ error: "unconfigured" }, { status: 503 });
  }

  let name: string, email: string, message: string;
  try {
    const body = (await req.json()) as Record<string, unknown>;
    name = String(body.name ?? "").trim();
    email = String(body.email ?? "").trim();
    message = String(body.message ?? "").trim();
  } catch {
    return Response.json({ error: "invalid_json" }, { status: 400 });
  }

  if (
    !name ||
    !message ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    name.length > MAX_LENGTHS.name ||
    email.length > MAX_LENGTHS.email ||
    message.length > MAX_LENGTHS.message
  ) {
    return Response.json({ error: "invalid_fields" }, { status: 400 });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: CONTACT_FROM,
      to: [CONTACT_TO],
      reply_to: email,
      subject: `Projet — ${name}`,
      text: `Nom : ${name}\nEmail : ${email}\n\n${message}`,
    }),
  });

  if (!res.ok) {
    return Response.json({ error: "send_failed" }, { status: 502 });
  }

  return Response.json({ ok: true });
}
