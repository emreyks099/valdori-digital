import type { ReactNode } from "react";
import { SplitLines } from "@/components/motion/Reveal";

/** İmza bölümlerinin ortak çerçevesi: başlık + açıklama + etkileşimli alan. */
export function SignatureShell({
  id,
  title,
  lede,
  note,
  children,
}: {
  id: string;
  title: string;
  lede: string;
  note?: string;
  children: ReactNode;
}) {
  return (
    <section aria-labelledby={id} className="section-y relative overflow-clip bg-ink-900">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ember-500/60 to-transparent" />
      <div className="shell">
        <div className="grid-12 items-end gap-y-6">
          <SplitLines as="h2" className="t-h1 col-span-12 lg:col-span-7">
            <span id={id}>{title}</span>
          </SplitLines>
          <p className="t-lede col-span-12 max-w-[32rem] text-ash-400 lg:col-span-4 lg:col-start-9">{lede}</p>
        </div>
        <div className="mt-12 lg:mt-16">{children}</div>
        {note && <p className="mt-6 max-w-[48rem] text-[0.8125rem] leading-relaxed text-ash-500">{note}</p>}
      </div>
    </section>
  );
}

export function Segmented<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly { id: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-2">
      {options.map((o) => {
        const on = o.id === value;
        return (
          <button
            key={o.id}
            type="button"
            aria-pressed={on}
            onClick={() => onChange(o.id)}
            className={`t-sign min-h-11 border px-4 transition-colors duration-300 ${
              on
                ? "border-ember-500 bg-ember-500 text-ink-950"
                : "border-bone/25 text-bone/80 hover:border-bone hover:text-bone"
            }`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
