import type { ReactNode } from "react";
import { PageHero } from "@/components/ui/PageHero";

/** Yayın öncesi doğrulanması gereken alanı görünür biçimde işaretler. */
export function Todo({ children }: { children: ReactNode }) {
  return (
    <mark className="bg-ember-500/20 px-1.5 py-0.5 text-ember-300 [box-decoration-break:clone]">
      [Doğrulanacak: {children}]
    </mark>
  );
}

export function LegalPage({
  crumb,
  lines,
  lede,
  children,
}: {
  crumb: string;
  lines: string[];
  lede: string;
  children: ReactNode;
}) {
  return (
    <>
      <PageHero crumbs={[{ label: crumb }]} lines={lines} lede={lede} size="h1" ignite={false} />
      <section className="bg-ink-950 pb-[var(--section)] pt-[clamp(3rem,6vw,5rem)]">
        <div className="shell">
          <p className="mb-12 flex max-w-[52rem] gap-4 border border-ember-500/40 bg-ember-900/25 p-5 text-[0.9375rem] text-bone/90">
            <span aria-hidden="true" className="mt-1.5 size-2 shrink-0 bg-ember-500" />
            <span>
              <strong className="font-semibold">Taslak metin.</strong> Bu sayfa, sitenin bugünkü teknik
              işleyişine göre hazırlanmış bir taslaktır; hukuki danışmanlık niteliği taşımaz. Turuncu
              işaretli alanlar yayın öncesinde şirket bilgileriyle tamamlanmalı ve metin bir hukuk
              danışmanına onaylatılmalıdır.
            </span>
          </p>
          <div className="prose-v">{children}</div>
        </div>
      </section>
    </>
  );
}
