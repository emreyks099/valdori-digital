import Link from "next/link";
import { kindLabel, projects } from "@/lib/projects";
import { getService } from "@/lib/services";
import { breadcrumbJsonLd, pageMeta } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { ConceptCover } from "@/components/work/ConceptCover";
import { ArrowIcon } from "@/components/ui/Button";
import { Fade } from "@/components/motion/Reveal";
import { FinalCta } from "@/components/home/FinalCta";
import { JsonLd } from "@/components/ui/JsonLd";

export const metadata = pageMeta({
  title: "Projeler: Konsept Çalışmalar",
  description:
    "Valdori Digital Studio’nun tasarım ve mühendislik yaklaşımını gösteren konsept çalışmalar. Kurgusal markalar üzerine hazırlanmış web, yapay zekâ, yazılım ve sosyal medya konseptleri.",
  path: "/projeler",
});

const spans = [
  "lg:col-span-7",
  "lg:col-span-5 lg:mt-[14vw]",
  "lg:col-span-5 lg:col-start-2",
  "lg:col-span-6 lg:col-start-7 lg:-mt-[6vw]",
] as const;

export default function ProjectsPage() {
  const concepts = projects.filter((p) => p.kind === "konsept");
  const client = projects.filter((p) => p.kind === "musteri");

  return (
    <>
      <PageHero
        crumbs={[{ label: "Projeler" }]}
        lines={["Konsept", "çalışmalar."]}
        lede="Bu sayfadaki çalışmalar müşteri projesi değildir. Nasıl düşündüğümüzü ve neyi ne kadar özenle yaptığımızı göstermek için, kurgusal markalar üzerine hazırladığımız konseptlerdir. Müşteri projeleri yayımlandıkça burada ayrı bir başlık altında yer alacak."
      />

      {client.length > 0 && (
        <section aria-labelledby="musteri" className="bg-ink-950 pt-[var(--section)]">
          <div className="shell">
            <h2 id="musteri" className="t-sign text-ember-500">
              Müşteri projeleri
            </h2>
          </div>
        </section>
      )}

      <section aria-label="Konsept çalışmalar" className="section-y bg-ink-950">
        <div className="shell">
          <ul className="grid-12 gap-y-16 lg:gap-y-[7vw]">
            {concepts.map((p, i) => (
              <li key={p.slug} className={`col-span-12 ${spans[i % spans.length]}`}>
                <Fade>
                  <Link href={`/projeler/${p.slug}`} className="group block">
                    <div className="cut overflow-hidden bg-ink-800">
                      <ConceptCover
                        cover={p.cover}
                        className="transition-transform duration-[1200ms] ease-out-expo group-hover:scale-[1.035]"
                      />
                    </div>
                    <div className="mt-5 flex items-start justify-between gap-6">
                      <div>
                        <p className="t-sign mb-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-ash-500">
                          <span className="flex items-center gap-2 text-bone">
                            <span className="size-1.5 bg-ember-500" />
                            {kindLabel[p.kind]}
                          </span>
                          <span>{p.sector}</span>
                        </p>
                        <h2 className="t-h2">{p.title}</h2>
                        <p className="mt-2 max-w-[34rem] text-ash-400">{p.summary}</p>
                        <p className="mt-4 flex flex-wrap gap-x-5 gap-y-1">
                          {p.services.map((s) => (
                            <span key={s} className="t-sign text-bone/70">
                              {getService(s)?.name}
                            </span>
                          ))}
                        </p>
                      </div>
                      <span className="mt-1 grid size-11 shrink-0 place-items-center border border-bone/20 text-bone transition-colors duration-500 group-hover:border-ember-500 group-hover:bg-ember-500 group-hover:text-ink-950">
                        <ArrowIcon />
                      </span>
                    </div>
                  </Link>
                </Fade>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FinalCta
        title={["Sıradaki proje", "sizinki olsun."]}
        lede="Konseptlerde gördüğünüz özeni kendi markanız için istiyorsanız, işinizi ve hedefinizi anlatın."
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Ana Sayfa", path: "/" },
          { name: "Projeler", path: "/projeler" },
        ])}
      />
    </>
  );
}
