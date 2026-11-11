"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  contactSchema,
  fieldErrors,
  projectTypes,
  type ContactInput,
  type ContactResponse,
  type FieldErrors,
} from "@/lib/contact";
import { site } from "@/lib/site";
import { Button } from "@/components/ui/Button";

type Status = "idle" | "submitting" | "success" | "not_configured" | "rate_limited" | "send_failed";

const statusMessage: Record<Exclude<Status, "idle" | "submitting" | "success">, { title: string; body: string }> = {
  not_configured: {
    title: "Mesajınız gönderilemedi.",
    body: "İletişim formu henüz e-posta servisine bağlanmadı; bu yüzden mesajınız bize ulaşmadı. Şimdilik bize Instagram üzerinden yazabilirsiniz.",
  },
  rate_limited: {
    title: "Çok fazla deneme yapıldı.",
    body: "Kısa sürede birden çok gönderim aldık. Lütfen birkaç dakika sonra yeniden deneyin.",
  },
  send_failed: {
    title: "Mesajınız gönderilemedi.",
    body: "E-posta servisine ulaşırken bir sorun oluştu. Yazdıklarınız duruyor; birazdan yeniden deneyebilir ya da bize Instagram üzerinden yazabilirsiniz.",
  },
};

function Field({
  id,
  label,
  error,
  optional,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="t-sign flex items-center gap-2 text-ash-400">
        {label}
        {optional && <span className="normal-case tracking-normal text-ash-600 [font-stretch:100%]">isteğe bağlı</span>}
      </label>
      {children}
      <p id={`${id}-hata`} role={error ? "alert" : undefined} className="mt-2 min-h-5 text-[0.8125rem] text-[#ff8f8f]">
        {error}
      </p>
    </div>
  );
}

export function ContactForm({ configured }: { configured: boolean }) {
  const formRef = useRef<HTMLFormElement>(null);
  const startedAt = useRef(0);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [dirty, setDirty] = useState(false);
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  // Yazılmış ama gönderilmemiş mesaj varken sayfadan çıkışta uyar
  useEffect(() => {
    if (!dirty || status === "success") return;
    const warn = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty, status]);

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "submitting") return;
    const fd = new FormData(e.currentTarget);
    const input: ContactInput = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      company: String(fd.get("company") ?? ""),
      projectTypes: fd.getAll("projectTypes").map(String) as ContactInput["projectTypes"],
      message: String(fd.get("message") ?? ""),
      consent: (fd.get("consent") === "on") as true,
      website: String(fd.get("website") ?? ""),
      elapsedMs: Date.now() - startedAt.current,
    };

    const parsed = contactSchema.safeParse(input);
    if (!parsed.success) {
      const errs = fieldErrors(parsed.error);
      setErrors(errs);
      const first = Object.keys(errs)[0];
      const el = formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`);
      el?.focus();
      return;
    }
    setErrors({});
    setStatus("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      const body = (await res.json()) as ContactResponse;
      if (body.ok) {
        setStatus("success");
        setDirty(false);
        return;
      }
      if (body.code === "invalid") {
        setErrors(body.errors);
        setStatus("idle");
        const first = Object.keys(body.errors)[0];
        formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
        return;
      }
      setStatus(body.code === "bad_request" ? "send_failed" : body.code);
    } catch {
      setStatus("send_failed");
    }
  };

  if (status === "success") {
    return (
      <div ref={successRef} tabIndex={-1} className="cut border border-ember-500/50 bg-ink-900 p-8 outline-none sm:p-12" role="status">
        <p className="t-sign text-ember-500">Mesajınız gönderildi</p>
        <p className="t-h2 mt-5">Teşekkürler. En kısa sürede dönüş yapacağız.</p>
        <p className="mt-5 max-w-[34rem] text-ash-400">
          Mesajınız bize ulaştı. Bu arada çalışmalarımıza göz atabilir ya da Dijital Skor
          değerlendirmesini tamamlayabilirsiniz.
        </p>
        <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
          <Link href="/projeler" className="t-sign link-line py-2 text-bone">
            Projeler
          </Link>
          <Link href="/dijital-skor" className="t-sign link-line py-2 text-bone">
            Dijital Skor
          </Link>
        </div>
      </div>
    );
  }

  const failure = status !== "idle" && status !== "submitting" ? statusMessage[status] : null;

  return (
    <form ref={formRef} onSubmit={onSubmit} onChange={() => setDirty(true)} noValidate className="space-y-7">
      {!configured && (
        <p className="flex gap-4 border border-ember-500/40 bg-ember-900/25 p-5 text-[0.9375rem] text-bone/90">
          <span aria-hidden="true" className="mt-1.5 size-2 shrink-0 bg-ember-500" />
          <span>
            Bu form henüz e-posta servisine bağlanmadı; gönderilen mesajlar şu an iletilmiyor. Bize{" "}
            <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-ember-300">
              Instagram üzerinden
            </a>{" "}
            ulaşabilirsiniz.
          </span>
        </p>
      )}

      <fieldset>
        <legend className="t-sign text-ash-400">Ne üzerine konuşalım?</legend>
        <div className="mt-4 flex flex-wrap gap-2">
          {projectTypes.map((t) => (
            <label key={t} className="cursor-pointer">
              <input
                type="checkbox"
                name="projectTypes"
                value={t}
                className="peer sr-only"
                aria-describedby="projectTypes-hata"
              />
              <span className="flex min-h-11 items-center gap-2.5 border border-bone/25 px-4 text-[0.9375rem] text-bone/80 transition-colors duration-300 hover:border-bone hover:text-bone peer-checked:border-ember-500 peer-checked:bg-ember-500 peer-checked:text-ink-950 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ember-400">
                {t}
              </span>
            </label>
          ))}
        </div>
        <p id="projectTypes-hata" role={errors.projectTypes ? "alert" : undefined} className="mt-2 min-h-5 text-[0.8125rem] text-[#ff8f8f]">
          {errors.projectTypes}
        </p>
      </fieldset>

      <div className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
        <Field id="name" label="Adınız" error={errors.name}>
          <input id="name" name="name" type="text" autoComplete="name" required maxLength={80} className="field" placeholder="Ad Soyad…" aria-invalid={!!errors.name} aria-describedby="name-hata" />
        </Field>
        <Field id="email" label="E-posta" error={errors.email}>
          <input id="email" name="email" type="email" inputMode="email" autoComplete="email" spellCheck={false} required maxLength={160} className="field" placeholder="ad@sirket.com…" aria-invalid={!!errors.email} aria-describedby="email-hata" />
        </Field>
        <Field id="phone" label="Telefon" optional error={errors.phone}>
          <input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" maxLength={30} className="field" placeholder="05xx xxx xx xx…" aria-invalid={!!errors.phone} aria-describedby="phone-hata" />
        </Field>
        <Field id="company" label="Şirket" optional error={errors.company}>
          <input id="company" name="company" type="text" autoComplete="organization" maxLength={120} className="field" placeholder="Şirket ya da marka adı…" aria-invalid={!!errors.company} aria-describedby="company-hata" />
        </Field>
      </div>

      <Field id="message" label="İhtiyacınız" error={errors.message}>
        <textarea id="message" name="message" required maxLength={3000} rows={5} className="field" placeholder="Ne yapmak istiyorsunuz, bugün sizi en çok ne zorluyor?…" aria-invalid={!!errors.message} aria-describedby="message-hata" />
      </Field>

      {/* Bal küpü: ekran okuyuculardan ve klavyeden gizli */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Web siteniz (boş bırakın)
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div>
        <label className="flex cursor-pointer items-start gap-4">
          <input type="checkbox" name="consent" className="peer sr-only" aria-describedby="consent-hata" aria-invalid={!!errors.consent} />
          <span
            aria-hidden="true"
            className="mt-0.5 grid size-6 shrink-0 place-items-center border border-bone/40 text-transparent transition-colors duration-300 peer-checked:border-ember-500 peer-checked:bg-ember-500 peer-checked:text-ink-950 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ember-400"
          >
            <svg width="12" height="12" viewBox="0 0 11 11">
              <path d="m1.5 5.5 3 3 5-6" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
          </span>
          <span className="text-[0.9375rem] text-ash-400">
            Paylaştığım bilgilerin, talebime yanıt verilmesi amacıyla işlenmesini kabul ediyorum.{" "}
            <Link href="/gizlilik" className="text-bone underline underline-offset-4 hover:text-ember-300">
              Gizlilik bilgilendirmesi
            </Link>
          </span>
        </label>
        <p id="consent-hata" role={errors.consent ? "alert" : undefined} className="mt-2 min-h-5 text-[0.8125rem] text-[#ff8f8f]">
          {errors.consent}
        </p>
      </div>

      <div aria-live="polite">
        {failure && (
          <div className="mb-6 border border-[#ff5a5a]/50 bg-[#ff5a5a]/10 p-5" role="alert">
            <p className="font-semibold text-bone">{failure.title}</p>
            <p className="mt-1 text-[0.9375rem] text-bone/80">
              {failure.body}{" "}
              {status !== "rate_limited" && (
                <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
                  {site.instagramHandle}
                </a>
              )}
            </p>
          </div>
        )}
      </div>

      <Button type="submit" aria-disabled={status === "submitting"}>
        {status === "submitting" ? "Gönderiliyor…" : "Mesajı gönder"}
      </Button>
    </form>
  );
}
