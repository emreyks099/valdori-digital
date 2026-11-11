import { NextResponse } from "next/server";
import {
  contactSchema,
  escapeHtml,
  fieldErrors,
  MIN_FILL_MS,
  type ContactResponse,
} from "@/lib/contact";
import { rateLimit } from "@/lib/rate-limit";

const MAX_BODY_BYTES = 12_000;

function json(body: ContactResponse, status: number) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

function clientIp(request: Request): string {
  const h = request.headers;
  return (
    h.get("x-nf-client-connection-ip") ??
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    h.get("x-real-ip") ??
    "unknown"
  );
}

export async function POST(request: Request) {
  // 1) Yalnızca aynı kökenden gelen JSON istekleri
  const origin = request.headers.get("origin");
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  if (origin && host) {
    try {
      if (new URL(origin).host !== host) return json({ ok: false, code: "bad_request" }, 403);
    } catch {
      return json({ ok: false, code: "bad_request" }, 400);
    }
  }
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return json({ ok: false, code: "bad_request" }, 415);
  }

  // 2) Hız sınırı: IP başına 10 dakikada 5 gönderim
  if (!rateLimit(`contact:${clientIp(request)}`, 5, 10 * 60 * 1000)) {
    return json({ ok: false, code: "rate_limited" }, 429);
  }

  // 3) Gövde boyutu ve biçimi
  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) return json({ ok: false, code: "bad_request" }, 413);
  let payload: unknown;
  try {
    payload = JSON.parse(raw);
  } catch {
    return json({ ok: false, code: "bad_request" }, 400);
  }

  // 4) Bot tuzakları. Botlara ipucu vermemek için başarı yanıtı döner, e-posta gönderilmez.
  const probe = payload as { website?: unknown; elapsedMs?: unknown };
  const honeypotFilled = typeof probe?.website === "string" && probe.website.length > 0;
  const tooFast = typeof probe?.elapsedMs === "number" && probe.elapsedMs < MIN_FILL_MS;
  if (honeypotFilled || tooFast) return json({ ok: true }, 200);

  // 5) Doğrulama
  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return json({ ok: false, code: "invalid", errors: fieldErrors(parsed.error) }, 400);
  }
  const data = parsed.data;

  // 6) E-posta servisi yapılandırılmamışsa bunu açıkça bildir — sahte başarı yok.
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !to || !from) {
    return json({ ok: false, code: "not_configured" }, 503);
  }

  const rows: [string, string][] = [
    ["Ad", data.name],
    ["E-posta", data.email],
    ["Telefon", data.phone || "—"],
    ["Şirket", data.company || "—"],
    ["Proje türü", data.projectTypes.join(", ")],
  ];
  const html = `<table style="font-family:system-ui,sans-serif;font-size:14px;border-collapse:collapse">${rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 16px 6px 0;color:#666;vertical-align:top">${escapeHtml(k)}</td><td style="padding:6px 0">${escapeHtml(v)}</td></tr>`,
    )
    .join("")}</table><p style="font-family:system-ui,sans-serif;font-size:14px;white-space:pre-wrap;margin-top:16px">${escapeHtml(data.message)}</p>`;
  const text = `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\n${data.message}`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: data.email,
        subject: `Yeni proje talebi — ${data.name.replace(/[\r\n]+/g, " ")}`,
        html,
        text,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      console.error("[contact] e-posta servisi hata döndü:", res.status);
      return json({ ok: false, code: "send_failed" }, 502);
    }
  } catch (err) {
    console.error("[contact] e-posta gönderilemedi:", err instanceof Error ? err.name : "unknown");
    return json({ ok: false, code: "send_failed" }, 502);
  }

  return json({ ok: true }, 200);
}
