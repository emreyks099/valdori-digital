"use client";

import { useEffect, useState } from "react";
import { SignatureShell } from "./SignatureShell";

const flow = [
  { name: "Form gönderilir", manual: "Biri e-postayı fark edene kadar bekler.", auto: "Talep anında yakalanır, eksik alan varsa kullanıcıya sorulur." },
  { name: "CRM’e kaydedilir", manual: "Bilgiler elle tabloya kopyalanır; bazen unutulur.", auto: "Kişi ve talep kaydı otomatik oluşur, yinelenen kayıt birleştirilir." },
  { name: "Sorumluya atanır", manual: "“Buna kim bakıyor?” mesajları dönmeye başlar.", auto: "Konu ve yoğunluğa göre doğru kişiye atanır, bildirim gider." },
  { name: "Müşteriye yanıt gider", manual: "İlk dönüş saatler, bazen günler alır.", auto: "Talebin alındığı ve ne zaman dönüleceği dakikalar içinde iletilir." },
  { name: "Takip hatırlatılır", manual: "Teklif gönderilir, sonrası hafızaya kalır.", auto: "Yanıt gelmediyse üç gün sonra sorumluya hatırlatma düşer." },
  { name: "Rapor hazırlanır", manual: "Ay sonunda tablolar elle derlenir.", auto: "Kaç talep geldi, kaçı dönüştü: özet her hafta kendiliğinden gelir." },
] as const;

/** Bir talebin altı adımlık yolculuğu: elle yürütülen hâli ile otomatik hâli yan yana. */
export function AutomationSignature() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setActive((a) => (a + 1) % flow.length), 2600);
    return () => window.clearInterval(id);
  }, [paused]);

  const step = flow[active];

  return (
    <SignatureShell
      id="otomasyon-imza"
      title="Bir talebin yolculuğu."
      lede="Web sitenizden gelen tek bir başvurunun geçtiği altı adım. Her adımda elle yürütülen hâli ile otomatik hâlini karşılaştırın."
      note="Akış örnek bir senaryodur. Gerçek kurulumda adımlar, kullandığınız araçlara ve iş kurallarınıza göre tasarlanır."
    >
      <div
        onPointerEnter={() => setPaused(true)}
        onPointerLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
      >
        <ol className="relative grid gap-y-1 lg:grid-cols-6 lg:gap-x-0">
          <span aria-hidden="true" className="absolute left-[1.3125rem] top-0 h-full w-px bg-bone/15 lg:left-0 lg:top-[1.3125rem] lg:h-px lg:w-full" />
          <span
            aria-hidden="true"
            className="absolute left-[1.3125rem] top-0 w-px bg-ember-500 transition-[height] duration-700 ease-out-expo lg:hidden"
            style={{ height: `${((active + 0.5) / flow.length) * 100}%` }}
          />
          <span
            aria-hidden="true"
            className="absolute left-0 top-[1.3125rem] hidden h-px bg-ember-500 transition-[width] duration-700 ease-out-expo lg:block"
            style={{ width: `${((active + 0.5) / flow.length) * 100}%` }}
          />
          {flow.map((s, i) => {
            const on = i === active;
            const done = i < active;
            return (
              <li key={s.name} className="relative">
                <button
                  type="button"
                  aria-pressed={on}
                  onClick={() => setActive(i)}
                  className="group flex w-full items-center gap-4 py-2 text-left lg:flex-col lg:items-start lg:gap-5 lg:py-0 lg:pr-4"
                >
                  <span
                    className={`relative z-10 grid size-[2.625rem] shrink-0 place-items-center border font-mono text-[0.75rem] transition-colors duration-500 ${
                      on
                        ? "border-ember-500 bg-ember-500 text-ink-950"
                        : done
                          ? "border-ember-500 bg-ink-900 text-ember-500"
                          : "border-bone/25 bg-ink-900 text-ash-500 group-hover:border-bone group-hover:text-bone"
                    }`}
                  >
                    0{i + 1}
                  </span>
                  <span className={`t-h3 transition-colors duration-500 ${on ? "text-bone" : "text-ash-500 group-hover:text-bone"}`}>
                    {s.name}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>

        <div className="mt-10 grid gap-px bg-bone/10 md:grid-cols-2" aria-live="polite">
          <div className="bg-ink-900 py-7 md:pr-10">
            <p className="t-sign text-ash-500">Elle</p>
            <p key={`m-${active}`} className="t-statement mt-4 !text-[clamp(1.375rem,2.4vw,2.125rem)] text-ash-400 motion-safe:animate-[fade-in_.6s_ease-out_both]">
              {step.manual}
            </p>
          </div>
          <div className="bg-ink-900 py-7 md:pl-10">
            <p className="t-sign text-ember-500">Otomatik</p>
            <p key={`a-${active}`} className="t-statement mt-4 !text-[clamp(1.375rem,2.4vw,2.125rem)] text-bone motion-safe:animate-[fade-in_.6s_ease-out_both]">
              {step.auto}
            </p>
          </div>
        </div>
      </div>
    </SignatureShell>
  );
}
