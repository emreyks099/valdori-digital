import { breadcrumbJsonLd, pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";
import { PageHero } from "@/components/ui/PageHero";
import { DrawLine, Fade, ScrubWords, SplitLines } from "@/components/motion/Reveal";
import { FinalCta } from "@/components/home/FinalCta";
import { JsonLd } from "@/components/ui/JsonLd";
import { TextLink } from "@/components/ui/Button";

export const metadata = pageMeta({
  title: "Hakkımızda: Tasarım ve Mühendislik Stüdyosu",
  description:
    "Valdori Digital Studio; tasarımı, yazılımı, yapay zekâyı ve otomasyonu bir araya getiren dijital teknoloji stüdyosudur. Vizyonumuz, yaklaşımımız ve çalışma ilkelerimiz.",
  path: "/hakkimizda",
});

const principles = [
  ["Özgünlük bir tercih değil, başlangıç noktasıdır", "Her iş boş sayfadan başlar. Şablon kullanmayız; çünkü başkasıyla aynı görünen bir marka, hatırlanmayan bir markadır."],
  ["Güzel olan, çalışmak zorundadır", "Bir tasarım hızlı açılmıyorsa, mobilde kullanılmıyorsa ya da ziyaretçiyi bir sonraki adıma götürmüyorsa bitmemiştir."],
  ["Söz verdiğimizi yaparız, yapamayacağımızı söyleriz", "İlk sayfa garantisi, takipçi garantisi, gerçekçi olmayan takvimler vermeyiz. Neyin mümkün olduğunu baştan, açıkça konuşuruz."],
  ["Teknoloji araçtır, amaç iş sonucudur", "Yapay zekâ ya da otomasyon, bir sorunu çözdüğü için önerilir; moda olduğu için değil. Gerekmiyorsa önermeyiz."],
  ["Teslim, ilişkinin sonu değildir", "Yayına alınan iş ölçülür, bakılır ve geliştirilir. Uzun vadede yanınızda olacak biçimde çalışırız."],
] as const;

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Hakkımızda" }]}
        lines={["Sıradan bir", "ajans değiliz."]}
        lede="Valdori Digital Studio; tasarımı, yazılımı, yapay zekâyı, otomasyonu ve dijital büyümeyi tek çatı altında birleştiren bir dijital teknoloji stüdyosudur. İşletmelere yalnızca güzel görünen değil, gerçekten çalışan dijital deneyimler kurarız."
      />

      <section aria-labelledby="vizyon" className="section-y bg-ink-950">
        <div className="shell grid-12 gap-y-8">
          <h2 id="vizyon" className="t-sign col-span-12 text-ember-500 md:col-span-3">
            Vizyon
          </h2>
          <ScrubWords className="t-statement col-span-12 text-pretty md:col-span-9">
            Bir işletmenin dijitaldeki varlığı, ürününün ya da hizmetinin kendisi kadar özenli olmalı.
            Biz bu özeni; tasarımın sezgisiyle mühendisliğin disiplinini aynı masada buluşturarak
            kuruyoruz. Hedefimiz, Türkiye’den başlayıp uluslararası ölçekte iş yapan markaların
            yanında duran bir stüdyo olmak.
          </ScrubWords>
        </div>
      </section>

      <section aria-labelledby="iki-disiplin" className="relative overflow-clip bg-ink-900">
        <div className="grid md:grid-cols-2">
          <Fade className="section-y shell md:border-r md:hairline">
            <p className="t-serif text-[clamp(3.5rem,9vw,9rem)] leading-[0.9] text-bone">Tasarım</p>
            <h2 id="iki-disiplin" className="sr-only">
              Tasarım ve teknoloji yaklaşımımız
            </h2>
            <p className="t-lede mt-8 max-w-[30rem] text-ash-400">
              Tasarımı süs olarak görmüyoruz. Tipografi, boşluk ve hareket; bir markanın nasıl
              hissettirdiğini ve ziyaretçinin ne yapacağını belirleyen kararlardır. Her ekranı,
              sanki tek ekranmış gibi tasarlarız.
            </p>
          </Fade>
          <Fade delay={0.1} className="section-y shell max-md:!pt-0">
            <p className="t-serif text-[clamp(3.5rem,9vw,9rem)] leading-[0.9] text-ember-500">Teknoloji</p>
            <p className="t-lede mt-8 max-w-[30rem] text-ash-400">
              Teknolojiyi gösteriş için kullanmıyoruz. Seçtiğimiz her araç; hızı, güvenliği ve
              bakım kolaylığını gözeterek seçilir. Yapay zekâ ve otomasyonu, ancak gerçek bir işi
              kolaylaştırdığında devreye alırız.
            </p>
          </Fade>
        </div>
      </section>

      <section aria-labelledby="ilkeler" className="section-y bg-ink-950">
        <div className="shell">
          <SplitLines as="h2" className="t-h1 max-w-[12ch]">
            <span id="ilkeler">Nasıl çalışırız?</span>
          </SplitLines>
          <ol className="mt-12">
            {principles.map(([t, d], i) => (
              <li key={t}>
                <DrawLine />
                <Fade className="grid-12 gap-y-3 py-8 md:py-10">
                  <span className="t-data col-span-12 text-ember-500 md:col-span-1 md:pt-2">0{i + 1}</span>
                  <h3 className="t-h2 col-span-12 text-balance md:col-span-6">{t}</h3>
                  <p className="col-span-12 max-w-[32rem] text-ash-400 md:col-span-4 md:col-start-9 md:text-[1.0625rem]">{d}</p>
                </Fade>
              </li>
            ))}
          </ol>
          <DrawLine />
        </div>
      </section>

      <section aria-labelledby="kurucu" className="section-y bg-paper text-ink-950">
        <div className="shell grid-12 gap-y-8">
          <h2 id="kurucu" className="t-sign col-span-12 text-ink-950/60 md:col-span-3">
            Kurucu
          </h2>
          <div className="col-span-12 md:col-span-8">
            <p className="font-display text-[clamp(3rem,9vw,9rem)] font-extrabold uppercase leading-[0.85] [font-stretch:62%]">
              {site.founder}
            </p>
            <p className="t-lede mt-8 max-w-[38rem] text-ink-950/75">
              Valdori Digital Studio, {site.founder} tarafından kuruldu. Web tasarımı, özel yazılım,
              yapay zekâ, otomasyon, SEO ve sosyal medya alanlarını tek bir bakışla ele alma fikri,
              stüdyonun çıkış noktasıdır.
            </p>
            <div className="mt-8">
              <TextLink href={site.instagram} external className="!text-ink-950">
                Instagram’da {site.instagramHandle}
              </TextLink>
            </div>
          </div>
        </div>
      </section>

      <FinalCta title={["Birlikte", "çalışalım."]} />
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Ana Sayfa", path: "/" },
            { name: "Hakkımızda", path: "/hakkimizda" },
          ]),
          { "@context": "https://schema.org", "@type": "AboutPage", url: `${site.url}/hakkimizda`, name: "Hakkımızda", about: { "@id": `${site.url}/#organization` } },
        ]}
      />
    </>
  );
}
