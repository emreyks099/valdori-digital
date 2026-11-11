"use client";

import { useState } from "react";
import { categories } from "@/lib/score";
import { ButtonLink } from "@/components/ui/Button";

const quick: Record<string, string> = {
  web: "Güncel ve mobilde rahat kullanılan bir web sitemiz var",
  seo: "Hizmetimizi arayanlar bizi Google'da bulabiliyor",
  social: "Sosyal medyada planlı ve tutarlı paylaşım yapıyoruz",
  communication: "Gelen taleplere aynı gün içinde dönüyoruz",
  automation: "Tekrarlayan işlerin bir kısmı otomatik yürüyor",
};

const R = 118;
const C = 2 * Math.PI * R;

/** Ana sayfadaki etkileşimli önizleme. Gerçek skor değildir; tam değerlendirmeye davet eder. */
export function ScorePreview() {
  const [on, setOn] = useState<Record<string, boolean>>({});
  const count = categories.filter((c) => on[c.id]).length;
  const ratio = count / categories.length;

  return (
    <section aria-labelledby="skor-baslik" className="section-y relative overflow-clip bg-ink-900">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ember-500/70 to-transparent" />
      <div className="shell grid gap-x-[clamp(2rem,6vw,7rem)] gap-y-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-center">
        <div>
          <p className="t-sign text-ember-500">Dijital Skor</p>
          <h2 id="skor-baslik" className="t-h1 mt-5 max-w-[11ch]">
            Dijitalde neredesiniz?
          </h2>
          <p className="t-lede mt-6 max-w-[32rem] text-ash-400">
            On beş kısa soru, yaklaşık üç dakika. Web sitesi, SEO, sosyal medya, iletişim ve
            otomasyon başlıklarında nerede durduğunuzu ve önce neye odaklanmanız gerektiğini görün.
            Kayıt ya da kişisel bilgi gerekmez.
          </p>
          <div className="mt-9">
            <ButtonLink href="/dijital-skor">Değerlendirmeyi başlatın</ButtonLink>
          </div>
        </div>

        <div className="cut-both relative bg-ink-950 p-6 sm:p-9">
          <div className="flex items-center justify-between">
            <p className="t-sign text-ash-500">Hızlı bakış</p>
            <p className="t-data text-ash-500">Size uyanları işaretleyin</p>
          </div>

          <div className="mt-7 grid items-center gap-8 sm:grid-cols-[auto_1fr]">
            <div className="relative mx-auto size-[11.5rem] sm:size-[13rem]">
              <svg viewBox="0 0 260 260" className="size-full -rotate-90" aria-hidden="true">
                <circle cx="130" cy="130" r={R} fill="none" stroke="#222225" strokeWidth="2" />
                {categories.map((_, i) => (
                  <line
                    key={i}
                    x1="130"
                    y1="4"
                    x2="130"
                    y2="20"
                    stroke="#09090b"
                    strokeWidth="6"
                    transform={`rotate(${(360 / categories.length) * i + 90} 130 130)`}
                  />
                ))}
                <circle
                  cx="130"
                  cy="130"
                  r={R}
                  fill="none"
                  stroke="#FF6828"
                  strokeWidth="5"
                  strokeDasharray={C}
                  strokeDashoffset={C * (1 - ratio)}
                  style={{ transition: "stroke-dashoffset 0.9s cubic-bezier(0.16,1,0.3,1)" }}
                />
              </svg>
              <div className="absolute inset-0 grid place-items-center text-center">
                <p aria-live="polite">
                  <span className="t-serif block text-[4.75rem] leading-none text-bone">{count}</span>
                  <span className="t-sign mt-1 block text-ash-500">/ {categories.length} alan</span>
                </p>
              </div>
            </div>

            <ul className="space-y-1">
              {categories.map((c) => {
                const checked = !!on[c.id];
                return (
                  <li key={c.id}>
                    <label className="group flex min-h-12 cursor-pointer items-center gap-4 border-b hairline py-2.5">
                      <input
                        type="checkbox"
                        className="peer sr-only"
                        checked={checked}
                        onChange={() => setOn((s) => ({ ...s, [c.id]: !s[c.id] }))}
                      />
                      <span
                        aria-hidden="true"
                        className={`grid size-5 shrink-0 place-items-center border transition-colors duration-300 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ember-400 ${
                          checked ? "border-ember-500 bg-ember-500" : "border-bone/40 group-hover:border-bone"
                        }`}
                      >
                        <svg width="11" height="11" viewBox="0 0 11 11" className={checked ? "opacity-100" : "opacity-0"}>
                          <path d="m1.5 5.5 3 3 5-6" fill="none" stroke="#09090b" strokeWidth="2" />
                        </svg>
                      </span>
                      <span className={`text-[0.9375rem] leading-snug transition-colors duration-300 ${checked ? "text-bone" : "text-ash-400"}`}>
                        {quick[c.id]}
                      </span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </div>

          <p className="mt-6 text-[0.8125rem] leading-relaxed text-ash-500">
            Bu bir önizlemedir, skor değildir. Asıl değerlendirme her alanı üç soruyla ölçer ve
            size özel öncelik listesi çıkarır.
          </p>
        </div>
      </div>
    </section>
  );
}
