import { z } from "zod";

/** İstemci ve sunucunun ortak kullandığı iletişim formu şeması. */

// Zod, hız için `new Function` dener; CSP (unsafe-eval yok) ile çakışmaması için kapatılır.
z.config({ jitless: true });

export const projectTypes = [
  "Web Tasarım",
  "Yapay Zekâ",
  "Otomasyon",
  "Özel Yazılım",
  "SEO",
  "Sosyal Medya",
  "Henüz emin değilim",
] as const;

/** Formun en erken gönderilebileceği süre (ms). Daha hızlı gönderimler bot sayılır. */
export const MIN_FILL_MS = 2500;

const trimmed = (min: number, max: number, minMsg: string, maxMsg: string) =>
  z.string().trim().min(min, minMsg).max(max, maxMsg);

export const contactSchema = z.object({
  name: trimmed(2, 80, "Adınızı yazın.", "Ad en fazla 80 karakter olabilir."),
  email: z
    .string()
    .trim()
    .max(160, "E-posta adresi çok uzun.")
    .pipe(z.email("Geçerli bir e-posta adresi yazın. Örnek: ad@sirket.com")),
  phone: z
    .string()
    .trim()
    .max(30, "Telefon numarası çok uzun.")
    .regex(/^[0-9+()\s-]*$/, "Telefon numarası yalnızca rakam, boşluk ve + ( ) - içerebilir.")
    .optional()
    .default(""),
  company: z.string().trim().max(120, "Şirket adı en fazla 120 karakter olabilir.").optional().default(""),
  projectTypes: z
    .array(z.enum(projectTypes))
    .min(1, "En az bir proje türü seçin.")
    .max(projectTypes.length),
  message: trimmed(
    20,
    3000,
    "İhtiyacınızı birkaç cümleyle anlatın (en az 20 karakter).",
    "Mesaj en fazla 3000 karakter olabilir.",
  ),
  consent: z.literal(true, "Devam etmek için bilgilendirmeyi onaylamanız gerekir."),
  /** Bal küpü: gerçek kullanıcılar bu alanı görmez ve doldurmaz. */
  website: z.string().max(0).optional().default(""),
  /** Formun açılmasından gönderilmesine kadar geçen süre */
  elapsedMs: z.number().int().nonnegative(),
});

export type ContactInput = z.input<typeof contactSchema>;
export type ContactData = z.output<typeof contactSchema>;

export type FieldErrors = Partial<Record<keyof ContactInput, string>>;

export function fieldErrors(error: z.ZodError): FieldErrors {
  const out: FieldErrors = {};
  for (const issue of error.issues) {
    const key = issue.path[0] as keyof ContactInput | undefined;
    if (key && !out[key]) out[key] = issue.message;
  }
  return out;
}

export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export type ContactResponse =
  | { ok: true }
  | { ok: false; code: "invalid"; errors: FieldErrors }
  | { ok: false; code: "rate_limited" | "not_configured" | "send_failed" | "bad_request" };
