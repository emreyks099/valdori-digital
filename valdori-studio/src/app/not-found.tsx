import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { mainNav } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sayfa bulunamadı",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="grain relative isolate flex min-h-svh flex-col justify-end overflow-clip bg-ink-950 pb-16 pt-[calc(var(--header-h)+3rem)]">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 rotate-[9deg] bg-gradient-to-b from-transparent via-ember-500 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(40%_50%_at_50%_45%,rgba(255,104,40,0.16),transparent_70%)]" />
      </div>
      <div className="shell">
        <p aria-hidden="true" className="t-serif text-[clamp(9rem,38vw,34rem)] leading-[0.74] text-ink-700">
          404
        </p>
        <h1 className="t-h1 mt-6">Bu sayfa burada değil.</h1>
        <p className="t-lede mt-5 max-w-[34rem] text-ash-400">
          Aradığınız adres taşınmış, silinmiş ya da hiç var olmamış olabilir. Ana sayfadan devam
          edebilir ya da aşağıdaki bölümlere göz atabilirsiniz.
        </p>
        <div className="mt-9 flex flex-col gap-6 sm:flex-row sm:items-center">
          <ButtonLink href="/">Ana sayfaya dönün</ButtonLink>
          <ul className="flex flex-wrap gap-x-7 gap-y-2">
            {mainNav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="t-sign link-line py-2 text-bone/80 hover:text-bone">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
