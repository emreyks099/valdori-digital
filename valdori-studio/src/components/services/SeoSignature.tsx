"use client";

import { useState } from "react";
import { Segmented, SignatureShell } from "./SignatureShell";

const layers = [
  {
    id: "teknik",
    label: "Teknik",
    title: "Önce bulunabilir olmak",
    body: "Arama motoru sayfayı tarayabilmeli, ne hakkında olduğunu anlayabilmeli. Temiz URL, site haritası ve yapılandırılmış veri, sonucun nasıl görüneceğini de belirler.",
    points: ["Taranabilirlik ve dizin kontrolü", "Yapılandırılmış veri (schema.org)", "Canonical ve yönlendirme düzeni"],
  },
  {
    id: "icerik",
    label: "İçerik",
    title: "Sonra soruyu yanıtlamak",
    body: "Başlık ve açıklama, arayan kişiye verilen ilk sözdür. Sayfa o sözü tutmalı: arama niyetine karşılık gelen, konuyu bilen birinin yazdığı içerik.",
    points: ["Arama niyetine göre sayfa planı", "Başlık ve meta açıklama yazımı", "İç bağlantı ve konu kümeleri"],
  },
  {
    id: "deneyim",
    label: "Deneyim",
    title: "Ve sorunsuz çalışmak",
    body: "Ziyaretçi geldiğinde sayfa hızlı açılmalı, tıklamaya anında yanıt vermeli, yüklenirken kaymamalı. Core Web Vitals bunları ölçer.",
    points: ["LCP ≤ 2,5 sn — ana içerik hızlı görünür", "INP ≤ 200 ms — etkileşim gecikmez", "CLS ≤ 0,1 — sayfa yüklenirken kaymaz"],
  },
] as const;

type LayerId = (typeof layers)[number]["id"];

/** Bir arama sonucunun anatomisi: hangi parça hangi çalışmanın ürünü? */
export function SeoSignature() {
  const [id, setId] = useState<LayerId>("teknik");
  const layer = layers.find((l) => l.id === id)!;
  const hi = (target: LayerId) =>
    `transition-[opacity,box-shadow] duration-500 ${id === target ? "opacity-100 shadow-[0_0_0_1px_#FF6828,0_0_28px_-6px_rgba(255,104,40,.6)]" : "opacity-45"}`;

  return (
    <SignatureShell
      id="seo-imza"
      title="Bir arama sonucunun anatomisi."
      lede="Arama sonucundaki her parça ayrı bir çalışmanın ürünüdür. Katmanları seçin; hangi işin sonucun neresine dokunduğunu görün."
      note="Görsel, bir arama sonucunun temsilidir. Core Web Vitals değerleri Google’ın yayımladığı “iyi” eşikleridir; bir ölçüm sonucu değildir."
    >
      <Segmented label="SEO katmanı" options={layers} value={id} onChange={setId} />

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
        <div aria-hidden="true" className="cut bg-ink-950 p-5 sm:p-9">
          <div className="flex h-11 items-center gap-3 border border-bone/20 px-4">
            <svg width="15" height="15" viewBox="0 0 15 15" className="text-ash-500">
              <circle cx="6.5" cy="6.5" r="5" fill="none" stroke="currentColor" strokeWidth="1.4" />
              <path d="m10.5 10.5 4 4" stroke="currentColor" strokeWidth="1.4" />
            </svg>
            <span className="text-[0.9375rem] text-bone/80">özel tasarım web sitesi</span>
          </div>

          <div className="mt-7 space-y-3">
            <div className={`inline-flex items-center gap-2 px-2 py-1.5 ${hi("teknik")}`}>
              <span className="grid size-6 place-items-center bg-bone text-[0.625rem] font-bold text-ink-950">V</span>
              <span className="font-mono text-[0.75rem] text-ash-400">valdoridigital.net › hizmetler › web-tasarim</span>
            </div>
            <div className={`px-2 py-2 ${hi("icerik")}`}>
              <p className="text-[1.25rem] leading-snug text-[#9db8ff] sm:text-[1.375rem]">
                Web Tasarım: Markaya Özel, Hızlı Siteler | Valdori Digital
              </p>
              <p className="mt-1.5 text-[0.875rem] leading-relaxed text-ash-400">
                Şablon değil, markanıza özel tasarım. Mobil öncelikli, hızlı, SEO altyapısı hazır ve dönüşüm odaklı web siteleri.
              </p>
            </div>
            <div className={`flex flex-wrap gap-x-6 gap-y-1 px-2 py-2 text-[0.8125rem] text-[#9db8ff] ${hi("teknik")}`}>
              <span>Sık sorulanlar</span>
              <span>Nasıl ilerler?</span>
              <span>Kapsam</span>
            </div>
            <div className={`grid grid-cols-3 gap-3 px-2 py-3 ${hi("deneyim")}`}>
              {[
                ["LCP", "≤ 2,5 sn"],
                ["INP", "≤ 200 ms"],
                ["CLS", "≤ 0,1"],
              ].map(([k, v]) => (
                <div key={k}>
                  <p className="t-data text-ash-500">{k}</p>
                  <p className="mt-1 font-mono text-[0.8125rem] text-bone">{v}</p>
                  <span className="mt-2 block h-px bg-ember-500" />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 space-y-4 opacity-30">
            {[0, 1].map((i) => (
              <div key={i} className="space-y-2">
                <span className="block h-2 w-40 bg-bone/20" />
                <span className="block h-3 w-[70%] bg-bone/25" />
                <span className="block h-2 w-[88%] bg-bone/15" />
              </div>
            ))}
          </div>
        </div>

        <div className="border-t hairline pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0" aria-live="polite">
          <h3 className="t-h2 text-bone">{layer.title}</h3>
          <p className="mt-5 text-ash-400">{layer.body}</p>
          <ul className="mt-8 space-y-3">
            {layer.points.map((p) => (
              <li key={p} className="flex gap-4 border-t hairline pt-3">
                <span className="mt-[0.6em] h-px w-4 shrink-0 bg-ember-500" />
                <span className="text-bone/85">{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SignatureShell>
  );
}
