"use client";

import { useState } from "react";
import { SignatureShell } from "./SignatureShell";

const modules = [
  { id: "crm", name: "Müşteri kaydı", span: "sm:col-span-2", kind: "table" },
  { id: "teklif", name: "Teklif ve sipariş", span: "", kind: "steps" },
  { id: "stok", name: "Stok", span: "", kind: "bars" },
  { id: "rapor", name: "Raporlama", span: "sm:col-span-2", kind: "chart" },
  { id: "bildirim", name: "Bildirimler", span: "", kind: "list" },
  { id: "api", name: "Entegrasyonlar", span: "", kind: "nodes" },
] as const;

type ModuleId = (typeof modules)[number]["id"];

function Panel({ kind }: { kind: (typeof modules)[number]["kind"] }) {
  const line = "h-px bg-bone/15";
  switch (kind) {
    case "table":
      return (
        <div className="space-y-2.5">
          {[78, 56, 68, 44].map((w, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="size-2 bg-bone/30" />
              <span className="h-1.5 bg-bone/25" style={{ width: `${w}%` }} />
              <span className={`ml-auto h-1.5 w-8 ${i === 1 ? "bg-ember-500" : "bg-bone/15"}`} />
            </div>
          ))}
        </div>
      );
    case "steps":
      return (
        <div className="flex items-center gap-1.5">
          {[1, 1, 1, 0].map((on, i) => (
            <span key={i} className={`h-7 flex-1 ${on ? (i === 2 ? "bg-ember-500" : "bg-bone/30") : "border border-dashed border-bone/25"}`} />
          ))}
        </div>
      );
    case "bars":
      return (
        <div className="flex h-16 items-end gap-2">
          {[60, 85, 35, 70, 20].map((h, i) => (
            <span key={i} className={`flex-1 ${h < 30 ? "bg-ember-500" : "bg-bone/25"}`} style={{ height: `${h}%` }} />
          ))}
        </div>
      );
    case "chart":
      return (
        <svg viewBox="0 0 300 70" className="h-16 w-full" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 58 40 50 80 54 120 36 160 40 200 22 240 26 300 8" fill="none" stroke="#FF6828" strokeWidth="2" vectorEffect="non-scaling-stroke" />
          <path d="M0 64 40 60 80 62 120 52 160 56 200 44 240 48 300 38" fill="none" stroke="rgba(244,241,236,.3)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        </svg>
      );
    case "list":
      return (
        <div className="space-y-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <span className={`size-1.5 rounded-full ${i === 0 ? "bg-ember-500" : "bg-bone/30"}`} />
              <span className={`flex-1 ${line}`} />
            </div>
          ))}
        </div>
      );
    case "nodes":
      return (
        <div className="flex items-center justify-between">
          {[0, 1, 2].map((i) => (
            <span key={i} className="contents">
              <span className={`size-7 border ${i === 1 ? "border-ember-500 bg-ember-500/20" : "border-bone/30"}`} />
              {i < 2 && <span className="h-px flex-1 border-t border-dashed border-bone/30" />}
            </span>
          ))}
        </div>
      );
  }
}

/** Modülleri açıp kapatın: sistem, ihtiyaç kadar büyür. */
export function SoftwareSignature() {
  const [on, setOn] = useState<Record<ModuleId, boolean>>({
    crm: true,
    teklif: true,
    stok: false,
    rapor: true,
    bildirim: false,
    api: false,
  });
  const active = modules.filter((m) => on[m.id]);

  return (
    <SignatureShell
      id="yazilim-imza"
      title="İhtiyaç kadar sistem."
      lede="İyi bir yazılım projesi her şeyi birden yapmaya çalışmaz. Modülleri açıp kapatın: ilk sürüm en çok ihtiyaç duyulanla başlar, gerisi sırası geldikçe eklenir."
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.6fr)]">
        <fieldset>
          <legend className="t-sign text-ash-500">Modüller</legend>
          <ul className="mt-4 border-t hairline">
            {modules.map((m) => (
              <li key={m.id} className="border-b hairline">
                <label className="group flex min-h-14 cursor-pointer items-center justify-between gap-4">
                  <span className={`t-h3 transition-colors duration-300 ${on[m.id] ? "text-bone" : "text-ash-500 group-hover:text-bone"}`}>
                    {m.name}
                  </span>
                  <input
                    type="checkbox"
                    className="peer sr-only"
                    checked={on[m.id]}
                    onChange={() => setOn((s) => ({ ...s, [m.id]: !s[m.id] }))}
                  />
                  <span
                    aria-hidden="true"
                    className={`relative h-6 w-11 shrink-0 border transition-colors duration-300 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ember-400 ${
                      on[m.id] ? "border-ember-500 bg-ember-500" : "border-bone/30"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 size-[1.125rem] transition-transform duration-500 ease-out-expo ${
                        on[m.id] ? "translate-x-[1.375rem] bg-ink-950" : "translate-x-0.5 bg-bone/60"
                      }`}
                    />
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </fieldset>

        <div className="cut relative min-h-[24rem] bg-ink-950 p-4 sm:p-6" aria-live="polite">
          <div className="flex items-center justify-between border-b hairline pb-3">
            <span className="t-data text-ash-500">sistem / genel bakış</span>
            <span className="t-data text-ember-400">
              {active.length} / {modules.length} modül
            </span>
          </div>
          {active.length === 0 ? (
            <p className="grid min-h-[18rem] place-items-center text-center text-ash-500">
              Henüz modül seçilmedi. Soldan bir modül açarak başlayın.
            </p>
          ) : (
            <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {active.map((m) => (
                <li
                  key={m.id}
                  className={`border border-bone/12 bg-ink-900 p-4 motion-safe:animate-[fade-in_.5s_ease-out_both] ${m.span}`}
                >
                  <p className="t-sign mb-5 text-bone/80">{m.name}</p>
                  <Panel kind={m.kind} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </SignatureShell>
  );
}
