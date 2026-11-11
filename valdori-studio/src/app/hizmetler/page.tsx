import Link from "next/link";
import { services } from "@/lib/services";
import { breadcrumbJsonLd, pageMeta } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { ServiceGlyph } from "@/components/services/ServiceGlyph";
import { ArrowIcon } from "@/components/ui/Button";
import { Fade } from "@/components/motion/Reveal";
import { FinalCta } from "@/components/home/FinalCta";
import { JsonLd } from "@/components/ui/JsonLd";

export const metadata = pageMeta({
  title: "Hizmetler: Tasarım, Yazılım ve Yapay Zekâ",
  description:
    "Valdori Digital Studio hizmetleri: web tasarım, yapay zekâ çözümleri, iş otomasyonu, özel yazılım, SEO ve sosyal medya yönetimi. Tek stüdyo, baştan sona birlikte düşünülmüş bir bütün.",
  path: "/hizmetler",
});

const groups = [
  { name: "Vitrin", note: "İnsanların gördüğü ve hatırladığı", slugs: ["web-tasarim", "sosyal-medya", "seo"] },
  { name: "Makine dairesi", note: "İşi perde arkasında yürüten", slugs: ["ozel-yazilim", "yapay-zeka", "otomasyon"] },
] as const;

export default function ServicesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Hizmetler" }]}
        lines={["Vitrin ve", "makine dairesi."]}
        lede="Bir işletmenin dijitalde iki yüzü vardır: müşterinin gördüğü ve işi yürüten. Çoğu ajans birini yapar. Biz ikisini birlikte tasarlarız; çünkü biri olmadan diğeri yarım kalır."
      />

      {groups.map((g, gi) => (
        <section key={g.name} aria-labelledby={`grup-${gi}`} className={`${gi === 0 ? "pt-[var(--section)]" : "pt-[clamp(4rem,8vw,8rem)]"} bg-ink-950 last-of-type:pb-[var(--section)]`}>
          <div className="shell">
            <div className="flex flex-wrap items-end justify-between gap-4 border-b border-bone/25 pb-5">
              <h2 id={`grup-${gi}`} className={`t-serif text-[clamp(2.75rem,6vw,5.5rem)] leading-[0.95] ${gi === 1 ? "text-ember-500" : "text-bone"}`}>
                {g.name}
              </h2>
              <p className="t-sign pb-2 text-ash-500">{g.note}</p>
            </div>
            <ul>
              {g.slugs.map((slug, si) => {
                const s = services.find((x) => x.slug === slug)!;
                const n = gi * 3 + si + 1;
                return (
                  <li key={slug} className="border-b hairline">
                    <Fade>
                      <Link
                        href={`/hizmetler/${slug}`}
                        className="group grid items-center gap-x-8 gap-y-5 py-9 md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)_auto] md:py-12"
                      >
                        <div className="flex items-baseline gap-5">
                          <span className="t-data text-ember-500">0{n}</span>
                          <h3 className="font-display text-[clamp(2.5rem,6.2vw,6rem)] font-extrabold uppercase leading-[0.88] text-bone transition-[font-stretch] duration-700 ease-out-expo [font-stretch:62%] group-hover:[font-stretch:86%]">
                            {s.name}
                          </h3>
                        </div>
                        <div className="pl-10 md:pl-0">
                          <p className="max-w-[32rem] text-[1.0625rem] text-ash-400">{s.short}</p>
                          <p className="mt-4 flex flex-wrap gap-x-5 gap-y-1">
                            {s.tags.map((t) => (
                              <span key={t} className="t-sign text-bone/70">
                                {t}
                              </span>
                            ))}
                          </p>
                        </div>
                        <div className="flex items-center gap-6 pl-10 md:pl-0">
                          <ServiceGlyph slug={s.slug} className="hidden size-28 text-bone/80 transition-transform duration-700 ease-out-expo group-hover:scale-110 lg:block" />
                          <span className="grid size-12 place-items-center border border-bone/20 text-bone transition-colors duration-500 group-hover:border-ember-500 group-hover:bg-ember-500 group-hover:text-ink-950">
                            <ArrowIcon />
                          </span>
                        </div>
                      </Link>
                    </Fade>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      ))}

      <section aria-labelledby="neden-tek" className="section-y bg-paper text-ink-950">
        <div className="shell grid-12 gap-y-10">
          <h2 id="neden-tek" className="t-h1 col-span-12 lg:col-span-6">
            Neden tek stüdyo?
          </h2>
          <div className="col-span-12 space-y-8 lg:col-span-5 lg:col-start-8">
            {[
              ["Parçalar birbirini tanır", "Web sitenizdeki form, CRM’inizi; CRM’iniz otomasyonu; otomasyon raporu besler. Ayrı ekipler bunları sonradan birbirine uydurmaya çalışır; biz baştan birlikte tasarlarız."],
              ["Tek muhatap, tek sorumluluk", "Bir şey çalışmadığında “o bizim işimiz değil” cevabını duymazsınız. Tasarımdan koda, içerikten entegrasyona sorumluluk tek yerdedir."],
              ["İhtiyacınız kadar", "Altı hizmetin hepsini almanız gerekmez. Bugün en çok fark yaratacak olanla başlar, ihtiyaç doğdukça genişletiriz."],
            ].map(([t, d]) => (
              <div key={t} className="border-t hairline-dark pt-5">
                <h3 className="t-h3">{t}</h3>
                <p className="mt-2 text-ink-950/70">{d}</p>
              </div>
            ))}
            <p className="pt-2">
              <Link href="/dijital-skor" className="group inline-flex items-center gap-3 border-b border-ink-950/40 pb-2">
                <span className="t-sign">Nereden başlayacağınızı Dijital Skor ile görün</span>
                <ArrowIcon className="text-ember-700 transition-transform duration-500 ease-out-expo group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            </p>
          </div>
        </div>
      </section>

      <FinalCta />
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Ana Sayfa", path: "/" },
            { name: "Hizmetler", path: "/hizmetler" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: services.map((s, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: s.name,
              url: `https://valdoridigital.net/hizmetler/${s.slug}`,
            })),
          },
        ]}
      />
    </>
  );
}
