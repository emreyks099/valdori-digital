import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, kindLabel, projects } from "@/lib/projects";
import { getService } from "@/lib/services";
import { breadcrumbJsonLd, pageMeta } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { ConceptCover } from "@/components/work/ConceptCover";
import { ArrowIcon } from "@/components/ui/Button";
import { DrawLine, Fade } from "@/components/motion/Reveal";
import { FinalCta } from "@/components/home/FinalCta";
import { JsonLd } from "@/components/ui/JsonLd";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projeler/[slug]">) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return pageMeta({
    title: `${p.title}: ${kindLabel[p.kind]}`,
    description: `${p.summary} ${p.kind === "konsept" ? "Kurgusal bir marka üzerine hazırlanmış konsept çalışmadır." : ""}`.trim(),
    path: `/projeler/${p.slug}`,
  });
}

export default async function ProjectPage({ params }: PageProps<"/projeler/[slug]">) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();
  const index = projects.findIndex((x) => x.slug === p.slug);
  const next = projects[(index + 1) % projects.length];
  const words = p.title.split(" ");
  const lines = words.length > 1 ? [words[0], words.slice(1).join(" ")] : [p.title];

  return (
    <>
      <PageHero
        crumbs={[{ label: "Projeler", href: "/projeler" }, { label: p.title }]}
        lines={lines}
        lede={p.summary}
        aside={
          <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-[0.9375rem]">
            <dt className="t-sign pt-1 text-ash-500">Tür</dt>
            <dd className="text-bone">{kindLabel[p.kind]}</dd>
            <dt className="t-sign pt-1 text-ash-500">Sektör</dt>
            <dd className="text-bone">{p.sector}</dd>
            <dt className="t-sign pt-1 text-ash-500">Kapsam</dt>
            <dd className="text-bone">{p.services.map((s) => getService(s)?.name).join(", ")}</dd>
          </dl>
        }
      >
        <div className="cut-both mt-12 overflow-hidden md:mt-16">
          <ConceptCover cover={p.cover} />
        </div>
      </PageHero>

      {p.kind === "konsept" && (
        <div className="bg-ink-950 pt-10">
          <div className="shell">
            <p className="flex max-w-[52rem] gap-4 border border-ember-500/40 bg-ember-900/25 p-5 text-[0.9375rem] text-bone/90">
              <span aria-hidden="true" className="mt-1.5 size-2 shrink-0 bg-ember-500" />
              <span>
                <strong className="font-semibold">Bu bir konsept çalışmadır.</strong> “{p.title}” kurgusal bir markadır;
                gerçek bir işletmeyi ya da müşteri projesini temsil etmez. Çalışma, benzer bir ihtiyaca nasıl
                yaklaşacağımızı göstermek için hazırlanmıştır.
              </span>
            </p>
          </div>
        </div>
      )}

      <section aria-labelledby="senaryo" className="section-y bg-ink-950">
        <div className="shell grid-12 gap-y-6">
          <h2 id="senaryo" className="t-sign col-span-12 text-ember-500 md:col-span-3">
            Senaryo
          </h2>
          <p className="t-statement col-span-12 !text-[clamp(1.5rem,3vw,2.75rem)] text-pretty md:col-span-9">{p.scenario}</p>
        </div>
      </section>

      <section aria-labelledby="yaklasim" className="bg-ink-950 pb-[var(--section)]">
        <div className="shell">
          <h2 id="yaklasim" className="t-h1">
            Yaklaşım
          </h2>
          <ol className="mt-10">
            {p.approach.map((a, i) => (
              <li key={a.title}>
                <DrawLine />
                <Fade className="grid-12 gap-y-3 py-8 md:py-11">
                  <span className="t-serif col-span-2 text-[3.5rem] leading-[0.8] text-ember-500 md:col-span-1 md:text-[4.5rem]">{i + 1}</span>
                  <h3 className="t-h2 col-span-10 text-balance md:col-span-5">{a.title}</h3>
                  <p className="col-span-12 max-w-[34rem] text-ash-400 md:col-span-5 md:col-start-8 md:text-[1.125rem]">{a.body}</p>
                </Fade>
              </li>
            ))}
          </ol>
          <DrawLine />
        </div>
      </section>

      <section aria-labelledby="sistem" className="section-y bg-paper text-ink-950">
        <div className="shell grid-12 gap-y-12">
          <div className="col-span-12 lg:col-span-6">
            <h2 id="sistem" className="t-h1">
              Tasarım sistemi
            </h2>
            <p className="t-sign mt-6 text-ink-950/60">{p.typeNote}</p>
            <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {p.palette.map((c) => (
                <li key={c.hex}>
                  <span className="block aspect-[3/4] border border-ink-950/10" style={{ background: c.hex }} />
                  <span className="mt-2 block text-[0.9375rem] font-medium">{c.name}</span>
                  <span className="t-data text-ink-950/60">{c.hex}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-12 lg:col-span-5 lg:col-start-8">
            <h2 className="t-h3">Konseptin kapsadıkları</h2>
            <ul className="mt-5">
              {p.deliverables.map((d) => (
                <li key={d} className="flex gap-4 border-t hairline-dark py-4">
                  <span className="mt-[0.7em] h-px w-5 shrink-0 bg-ember-700" />
                  {d}
                </li>
              ))}
            </ul>
            <h2 className="t-h3 mt-10">İlgili hizmetler</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {p.services.map((s) => (
                <li key={s}>
                  <Link
                    href={`/hizmetler/${s}`}
                    className="t-sign flex min-h-11 items-center border border-ink-950/30 px-4 transition-colors duration-300 hover:border-ink-950 hover:bg-ink-950 hover:text-bone"
                  >
                    {getService(s)?.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section aria-label="Sıradaki çalışma" className="bg-ink-950">
        <Link href={`/projeler/${next.slug}`} className="group block">
          <div className="shell flex items-center justify-between gap-8 py-[clamp(4rem,9vw,8rem)]">
            <div>
              <p className="t-sign text-ash-500">Sıradaki çalışma</p>
              <p className="mt-4 font-display text-[clamp(3rem,10vw,10rem)] font-extrabold uppercase leading-[0.85] text-bone transition-[font-stretch,color] duration-700 ease-out-expo [font-stretch:62%] group-hover:text-ember-500 group-hover:[font-stretch:84%]">
                {next.title}
              </p>
            </div>
            <span className="grid size-14 shrink-0 place-items-center border border-bone/20 text-bone transition-colors duration-500 group-hover:border-ember-500 group-hover:bg-ember-500 group-hover:text-ink-950 md:size-20">
              <ArrowIcon />
            </span>
          </div>
        </Link>
      </section>

      <FinalCta />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Ana Sayfa", path: "/" },
          { name: "Projeler", path: "/projeler" },
          { name: p.title, path: `/projeler/${p.slug}` },
        ])}
      />
    </>
  );
}
