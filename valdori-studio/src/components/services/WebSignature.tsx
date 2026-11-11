"use client";

import { useState } from "react";
import { Segmented, SignatureShell } from "./SignatureShell";

const devices = [
  { id: "desktop", label: "Masaüstü", width: "100%", px: "1440 px" },
  { id: "tablet", label: "Tablet", width: "58%", px: "768 px" },
  { id: "phone", label: "Telefon", width: "30%", px: "390 px" },
] as const;

type DeviceId = (typeof devices)[number]["id"];

/** Aynı sayfa üç genişlikte: düzen küçülmez, yeniden kurulur. */
export function WebSignature() {
  const [device, setDevice] = useState<DeviceId>("desktop");
  const d = devices.find((x) => x.id === device)!;

  return (
    <SignatureShell
      id="web-imza"
      title="Küçültülmüş değil, yeniden kurulmuş."
      lede="Aşağıdaki çerçevenin genişliğini değiştirin. Düzen ekrana sığdırılmaz; her genişlikte içerik yeniden sıralanır, tipografi yeniden ölçeklenir."
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Segmented label="Ekran genişliği" options={devices} value={device} onChange={setDevice} />
        <p className="t-data text-ash-500" aria-live="polite">
          {d.px}
        </p>
      </div>

      <div className="mt-6 bg-ink-950 p-3 sm:p-6">
        <div
          className="@container mx-auto min-w-[15rem] border border-bone/15 bg-[#E7E0D4] text-[#1B1916] transition-[width] duration-[900ms] ease-out-expo"
          style={{ width: d.width }}
        >
          <div className="flex items-center justify-between border-b border-[#1B1916]/15 px-4 py-3 @[560px]:px-7">
            <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] [font-stretch:125%]">Mono</span>
            <span className="hidden gap-5 text-[0.75rem] @[560px]:flex">
              <span>Koleksiyon</span>
              <span>Atölye</span>
              <span>Sipariş</span>
            </span>
            <span className="flex w-5 flex-col gap-1 @[560px]:hidden" aria-hidden="true">
              <span className="h-px bg-current" />
              <span className="h-px bg-current" />
            </span>
          </div>

          <div className="grid gap-5 p-4 @[560px]:gap-7 @[560px]:p-7 @[900px]:grid-cols-[1.25fr_1fr] @[900px]:items-end">
            <div>
              <p className="t-serif text-[2.25rem] leading-[0.95] @[560px]:text-[3.5rem] @[900px]:text-[5.25rem]">
                Elle yapılır, ömür boyu kalır.
              </p>
              <p className="mt-4 max-w-[34ch] text-[0.8125rem] leading-snug @[560px]:text-[0.9375rem]">
                Sipariş üzerine, masif ağaçtan. Her parça atölyemizde tek tek ölçülür ve elle bitirilir.
              </p>
              <span className="mt-5 flex h-11 w-full items-center justify-between bg-[#1B1916] px-4 text-[0.6875rem] uppercase tracking-[0.1em] text-[#E7E0D4] [font-stretch:112%] @[560px]:w-52">
                Siparişe başla
                <span className="size-2 bg-[#A4532B]" />
              </span>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden bg-[#D8CDBB] @[900px]:aspect-[4/5]">
              <span className="absolute bottom-0 left-[18%] h-[78%] w-[52%] rounded-t-full bg-[#A4532B]" />
              <span className="absolute bottom-0 left-[46%] h-[50%] w-[46%] rounded-t-full bg-[#C19A6B] mix-blend-multiply" />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-px border-t border-[#1B1916]/15 bg-[#1B1916]/15 @[560px]:grid-cols-2 @[900px]:grid-cols-3">
            {["Masa", "Sandalye", "Raf"].map((n, i) => (
              <div key={n} className={`flex items-center justify-between bg-[#E7E0D4] px-4 py-4 @[560px]:px-7 ${i === 2 ? "@[560px]:col-span-2 @[900px]:col-span-1" : ""}`}>
                <span className="font-display text-[1.375rem] font-bold uppercase leading-none [font-stretch:68%]">{n}</span>
                <span className="font-mono text-[0.6875rem] opacity-60">0{i + 1}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SignatureShell>
  );
}
