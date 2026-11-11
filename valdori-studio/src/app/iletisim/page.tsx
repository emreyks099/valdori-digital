import { breadcrumbJsonLd, pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";
import { PageHero } from "@/components/ui/PageHero";
import { ContactForm } from "@/components/contact/ContactForm";
import { JsonLd } from "@/components/ui/JsonLd";
import { TextLink } from "@/components/ui/Button";
import { TurkeyClock } from "@/components/ui/TurkeyClock";

export const metadata = pageMeta({
  title: "İletişim: Projenizi Konuşalım",
  description:
    "Web tasarım, yazılım, yapay zekâ, otomasyon, SEO ya da sosyal medya projeniz için Valdori Digital Studio ile iletişime geçin. İhtiyacınızı anlatın, neyin mümkün olduğunu birlikte netleştirelim.",
  path: "/iletisim",
});

export default function ContactPage() {
  const configured = Boolean(
    process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL && process.env.CONTACT_FROM_EMAIL,
  );
  return (
    <>
      <PageHero
        crumbs={[{ label: "İletişim" }]}
        lines={["Projenizi", "konuşalım."]}
        lede="Aklınızdaki işi birkaç cümleyle anlatın. Net bir brief olması gerekmiyor; “şunu çözmek istiyorum” demeniz yeterli. Sizi dinledikten sonra neyin mümkün olduğunu, ne kadar süreceğini ve nereden başlamak gerektiğini konuşuruz."
      />
      <section aria-label="İletişim formu" className="bg-ink-950 pb-[var(--section)] pt-[clamp(3rem,6vw,5rem)]">
        <div className="shell grid gap-x-[clamp(2rem,7vw,8rem)] gap-y-14 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
          <div className="relative">
            <ContactForm configured={configured} />
          </div>

          <aside className="space-y-10 lg:sticky lg:top-[calc(var(--header-h)+2rem)] lg:self-start">
            <div>
              <h2 className="t-sign text-ash-500">Sonra ne olur?</h2>
              <ol className="mt-5 border-t hairline">
                {[
                  "Mesajınızı okur, gerekirse birkaç soru sorarız.",
                  "Kısa bir görüşmeyle ihtiyacı ve hedefi netleştiririz.",
                  "Kapsam, takvim ve bütçeyi içeren bir öneri paylaşırız.",
                ].map((t, i) => (
                  <li key={t} className="flex gap-5 border-b hairline py-4">
                    <span className="t-serif text-[2rem] leading-none text-ember-500">{i + 1}</span>
                    <span className="text-bone/85">{t}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div>
              <h2 className="t-sign text-ash-500">Doğrudan yazın</h2>
              <div className="mt-4">
                <TextLink href={site.instagram} external>
                  Instagram {site.instagramHandle}
                </TextLink>
              </div>
            </div>
            <div>
              <h2 className="t-sign text-ash-500">Çalışma bölgesi</h2>
              <p className="mt-3 text-bone/85">Türkiye genelinde ve uluslararası projelerde uzaktan çalışıyoruz.</p>
              <p className="mt-2">
                <TurkeyClock />
              </p>
            </div>
          </aside>
        </div>
      </section>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Ana Sayfa", path: "/" },
            { name: "İletişim", path: "/iletisim" },
          ]),
          { "@context": "https://schema.org", "@type": "ContactPage", url: `${site.url}/iletisim`, name: "İletişim" },
        ]}
      />
    </>
  );
}
