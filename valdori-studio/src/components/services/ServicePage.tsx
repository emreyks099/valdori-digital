import Link from "next/link";
import type { ReactNode } from "react";
import { getService, type Service } from "@/lib/services";
import { PageHero } from "@/components/ui/PageHero";
import { ButtonLink, ArrowIcon } from "@/components/ui/Button";
import { Faq } from "@/components/ui/Faq";
import { JsonLd } from "@/components/ui/JsonLd";
import { FinalCta } from "@/components/home/FinalCta";
import { DrawLine, Fade, SplitLines } from "@/components/motion/Reveal";
import { breadcrumbJsonLd, faqJsonLd, serviceJsonLd } from "@/lib/seo";

/**
 * Hizmet sayfası iskeleti. Ortak anlatı sırası korunur; her sayfanın karakterini
 * `visual` (hero sahnesi) ve `signature` (o hizmete özgü etkileşimli bölüm) belirler.
 */
export function ServicePage({
  service,
  visual,
  signature,
  cta,
}: {
  service: Service;
  visual: ReactNode;
  signature: ReactNode;
  cta: { title: [string, string]; lede: string };
}) {
  const path = `/hizmetler/${service.slug}`;
  return (
    <>
      <PageHero
        crumbs={[{ label: "Hizmetler", href: "/hizmetler" }, { label: service.name }]}
        lines={service.hero.lines}
        lede={service.hero.lede}
        aside={<ButtonLink href="/iletisim">Projenizi Konuşalım</ButtonLink>}
      >
        <div className="mt-12 md:mt-20">{visual}</div>
      </PageHero>

      {/* Sorun */}
      <section className="section-y bg-ink-950">
        <div className="shell grid-12 gap-y-8">
          <SplitLines as="h2" className="t-h1 col-span-12 lg:col-span-6 lg:sticky lg:top-[calc(var(--header-h)+2rem)] lg:self-start">
            {service.problem.title}
          </SplitLines>
          <Fade stagger={0.12} className="col-span-12 space-y-6 lg:col-span-5 lg:col-start-8">
            {service.problem.body.map((p) => (
              <p key={p.slice(0, 24)} className="t-lede text-pretty text-ash-400">
                {p}
              </p>
            ))}
          </Fade>
        </div>
      </section>

      {/* İmza bölümü */}
      {signature}

      {/* Kazanımlar */}
      <section aria-labelledby="kazanimlar" className="section-y bg-ink-950">
        <div className="shell">
          <h2 id="kazanimlar" className="t-sign text-ember-500">
            Size ne kazandırır?
          </h2>
          <ul className="mt-8">
            {service.outcomes.map((o) => (
              <li key={o.title}>
                <DrawLine />
                <Fade className="grid-12 gap-y-3 py-8 md:py-11">
                  <h3 className="t-h2 col-span-12 text-balance md:col-span-6">{o.title}</h3>
                  <p className="col-span-12 max-w-[34rem] text-ash-400 md:col-span-5 md:col-start-8 md:text-[1.125rem]">
                    {o.body}
                  </p>
                </Fade>
              </li>
            ))}
          </ul>
          <DrawLine />
        </div>
      </section>

      {/* Kapsam — açık zemin */}
      <section aria-labelledby="kapsam" className="section-y bg-paper text-ink-950">
        <div className="shell grid-12 gap-y-10">
          <div className="col-span-12 lg:col-span-5">
            <h2 id="kapsam" className="t-h1">
              {service.scope.title}
            </h2>
            <p className="t-lede mt-6 max-w-[28rem] text-ink-950/70">{service.scope.intro}</p>
          </div>
          <dl className="col-span-12 lg:col-span-6 lg:col-start-7">
            {service.scope.items.map((item) => (
              <div key={item.name} className="grid gap-x-8 gap-y-1 border-t hairline-dark py-5 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
                <dt className="t-h3">{item.name}</dt>
                <dd className="text-ink-950/70">{item.desc}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Nasıl ilerler */}
      <section aria-labelledby="adimlar" className="section-y bg-ink-900">
        <div className="shell">
          <SplitLines as="h2" className="t-h1 max-w-[14ch]">
            <span id="adimlar">Nasıl ilerler?</span>
          </SplitLines>
          <Fade as="ol" stagger={0.1} className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
            {service.steps.map((s, i) => (
              <li key={s.name} className="border-t border-bone/20 pt-5">
                <span className="t-serif block text-[4.5rem] leading-[0.8] text-ember-500">{i + 1}</span>
                <h3 className="t-h3 mt-6 text-bone">{s.name}</h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-ash-400">{s.desc}</p>
              </li>
            ))}
          </Fade>
        </div>
      </section>

      {/* SSS */}
      <section aria-labelledby="sss" className="section-y bg-ink-950">
        <div className="shell grid-12 gap-y-8">
          <h2 id="sss" className="t-h1 col-span-12 lg:col-span-4">
            Sık sorulanlar
          </h2>
          <div className="col-span-12 lg:col-span-7 lg:col-start-6">
            <Faq items={service.faqs} />
          </div>
        </div>
      </section>

      {/* İlgili hizmetler */}
      <section aria-labelledby="ilgili" className="bg-ink-950 pb-[var(--section)]">
        <div className="shell">
          <h2 id="ilgili" className="t-sign text-ash-500">
            Birlikte düşünülür
          </h2>
          <ul className="mt-6 border-t hairline">
            {service.related.map((slug) => {
              const r = getService(slug)!;
              return (
                <li key={slug} className="border-b hairline">
                  <Link href={`/hizmetler/${slug}`} className="group flex items-center justify-between gap-6 py-6">
                    <span className="font-display text-[clamp(1.875rem,4.6vw,4rem)] font-extrabold uppercase leading-none text-bone transition-[font-stretch,color] duration-700 ease-out-expo [font-stretch:62%] group-hover:text-ember-500 group-hover:[font-stretch:88%]">
                      {r.name}
                    </span>
                    <span className="hidden max-w-[26rem] text-right text-[0.9375rem] text-ash-400 md:block">{r.short}</span>
                    <ArrowIcon className="shrink-0 text-ember-500 transition-transform duration-500 ease-out-expo group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <FinalCta title={cta.title} lede={cta.lede} />

      <JsonLd
        data={[
          serviceJsonLd({ name: service.name, description: service.metaDescription, path }),
          faqJsonLd(service.faqs),
          breadcrumbJsonLd([
            { name: "Ana Sayfa", path: "/" },
            { name: "Hizmetler", path: "/hizmetler" },
            { name: service.name, path },
          ]),
        ]}
      />
    </>
  );
}
