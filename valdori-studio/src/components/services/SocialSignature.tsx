"use client";

import { useState } from "react";
import { Segmented, SignatureShell } from "./SignatureShell";

const pillars = [
  { id: "hepsi", label: "Tüm akış" },
  { id: "urun", label: "Ürün" },
  { id: "hikaye", label: "Hikâye" },
  { id: "bilgi", label: "Bilgi" },
  { id: "duyuru", label: "Duyuru" },
] as const;

type PillarId = (typeof pillars)[number]["id"];
type Tile = { pillar: Exclude<PillarId, "hepsi">; kind: "type" | "number" | "shape" | "reel" | "quote"; a: string; b?: string; tone: "ember" | "bone" | "ink" | "deep" };

const tiles: Tile[] = [
  { pillar: "urun", kind: "type", a: "Yeni", b: "koleksiyon", tone: "ember" },
  { pillar: "bilgi", kind: "number", a: "3", b: "adımda bakım", tone: "ink" },
  { pillar: "hikaye", kind: "shape", a: "Atölyeden", tone: "bone" },
  { pillar: "hikaye", kind: "reel", a: "Yapım süreci", tone: "deep" },
  { pillar: "duyuru", kind: "type", a: "Cumartesi", b: "açığız", tone: "bone" },
  { pillar: "urun", kind: "shape", a: "Detay", tone: "ink" },
  { pillar: "bilgi", kind: "quote", a: "İyi malzeme, yarı iştir.", tone: "deep" },
  { pillar: "urun", kind: "reel", a: "Ürün yakın plan", tone: "ember" },
  { pillar: "duyuru", kind: "number", a: "7", b: "gün kaldı", tone: "ink" },
];

const tones: Record<Tile["tone"], string> = {
  ember: "bg-ember-500 text-ink-950",
  bone: "bg-bone text-ink-950",
  ink: "bg-ink-800 text-bone",
  deep: "bg-[#3a1508] text-bone",
};

function TileArt({ t }: { t: Tile }) {
  const label = <span className="absolute left-[7%] top-[7%] text-[max(7px,3.4cqw)] font-semibold uppercase tracking-[0.16em] [font-stretch:125%]">Marka</span>;
  switch (t.kind) {
    case "type":
      return (
        <>
          {label}
          <span className="absolute bottom-[8%] left-[7%] font-display text-[17cqw] font-extrabold uppercase leading-[0.86] [font-stretch:62%]">
            {t.a}
            <br />
            {t.b}
          </span>
        </>
      );
    case "number":
      return (
        <>
          {label}
          <span className="t-serif absolute -bottom-[6%] right-[6%] text-[78cqw] leading-[0.8] text-ember-500">{t.a}</span>
          <span className="absolute bottom-[8%] left-[7%] max-w-[45%] text-[5.4cqw] leading-tight">{t.b}</span>
        </>
      );
    case "shape":
      return (
        <>
          {label}
          <span className="absolute bottom-0 left-[20%] h-[66%] w-[44%] rounded-t-full bg-ember-500" />
          <span className="absolute bottom-0 left-[48%] h-[42%] w-[36%] rounded-t-full bg-ember-700 mix-blend-multiply" />
          <span className="absolute right-[7%] top-[7%] text-[4.6cqw]">{t.a}</span>
        </>
      );
    case "reel":
      return (
        <>
          {label}
          <span className="absolute left-1/2 top-1/2 grid size-[26%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-current">
            <svg viewBox="0 0 10 10" className="ml-[8%] w-[36%]">
              <path d="M1 0v10l8-5Z" fill="currentColor" />
            </svg>
          </span>
          <span className="absolute bottom-[7%] left-[7%] text-[4.8cqw]">{t.a}</span>
          <span className="absolute bottom-[7%] right-[7%] font-mono text-[4cqw] opacity-70">0:24</span>
        </>
      );
    case "quote":
      return (
        <>
          {label}
          <span className="t-serif absolute inset-x-[8%] bottom-[10%] text-[11.5cqw] leading-[1]">{t.a}</span>
        </>
      );
  }
}

/** Dört içerik sütunu, tek görsel dil: akıştaki her kare aynı sistemin parçası. */
export function SocialSignature() {
  const [pillar, setPillar] = useState<PillarId>("hepsi");
  const count = pillar === "hepsi" ? tiles.length : tiles.filter((t) => t.pillar === pillar).length;

  return (
    <SignatureShell
      id="sosyal-imza"
      title="Dokuz kare, tek ses."
      lede="Tutarlılık tek tip görünmek değildir. Bir şablon sistemi; ürün, hikâye, bilgi ve duyuru içeriklerini farklı ama aynı elden çıkmış gösterir. İçerik sütunlarını seçin."
      note="Akış, bir şablon sisteminin temsili gösterimidir; gerçek bir hesaba ait değildir."
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Segmented label="İçerik sütunu" options={pillars} value={pillar} onChange={setPillar} />
        <p className="t-data text-ash-500" aria-live="polite">
          {count} / {tiles.length} gönderi
        </p>
      </div>

      <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] lg:items-center">
        <ul aria-hidden="true" className="mx-auto grid w-full max-w-[34rem] grid-cols-3 lg:mx-0 gap-1.5 bg-ink-950 p-1.5 sm:gap-2 sm:p-2">
          {tiles.map((t, i) => {
            const on = pillar === "hepsi" || t.pillar === pillar;
            return (
              <li
                key={i}
                className={`relative aspect-[4/5] overflow-hidden transition-[opacity,transform,filter] duration-700 ease-out-expo [container-type:inline-size] ${tones[t.tone]} ${
                  on ? "scale-100 opacity-100" : "scale-[0.94] opacity-20 grayscale"
                }`}
              >
                <TileArt t={t} />
              </li>
            );
          })}
        </ul>

        <dl className="border-t hairline">
          {[
            ["Ürün", "Ne sunduğunuzu gösterir. Yakın plan, detay ve kullanım anları."],
            ["Hikâye", "Kim olduğunuzu anlatır. Süreç, ekip ve perde arkası."],
            ["Bilgi", "Uzmanlığınızı kanıtlar. Kısa ipuçları ve sık sorulanlar."],
            ["Duyuru", "Harekete geçirir. Tarih, kampanya ve yenilikler."],
          ].map(([k, v]) => {
            const on = pillar === "hepsi" || pillars.find((p) => p.label === k)?.id === pillar;
            return (
              <div key={k} className={`grid grid-cols-[6.5rem_1fr] gap-4 border-b hairline py-5 transition-opacity duration-500 ${on ? "opacity-100" : "opacity-35"}`}>
                <dt className="t-h3 text-bone">{k}</dt>
                <dd className="text-ash-400">{v}</dd>
              </div>
            );
          })}
        </dl>
      </div>
    </SignatureShell>
  );
}
