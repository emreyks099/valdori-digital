import { breadcrumbJsonLd, pageMeta } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { ScoreQuiz } from "@/components/score/ScoreQuiz";
import { Faq } from "@/components/ui/Faq";
import { JsonLd } from "@/components/ui/JsonLd";

export const metadata = pageMeta({
  title: "Dijital Skor: 3 Dakikada Dijital Değerlendirme",
  description:
    "Web sitesi, SEO, sosyal medya, iletişim ve otomasyon alanlarında 15 soruluk ücretsiz ön değerlendirme. 0–100 arası skorunuzu ve öncelikli adımlarınızı görün. Kayıt gerekmez.",
  path: "/dijital-skor",
});

const faqs = [
  {
    q: "Skor nasıl hesaplanıyor?",
    a: "Her yanıt 0 ile 3 arasında puanlanır. Bir alanın skoru, o alandaki üç sorudan aldığınız puanın azami puana oranıdır. Genel skor, alan skorlarının ağırlıklı ortalamasıdır: Web Sitesi %25, SEO %20, İletişim %20, Otomasyon %20, Sosyal Medya %15.",
  },
  {
    q: "Bu bir site denetimi mi?",
    a: "Hayır. Sitenizi teknik olarak taramıyor ya da ölçmüyoruz. Skor yalnızca verdiğiniz yanıtlara dayanır ve bir ön değerlendirme niteliğindedir. Gerçek bir teknik inceleme için bizimle iletişime geçebilirsiniz.",
  },
  {
    q: "Yanıtlarım kaydediliyor mu?",
    a: "Hayır. Hesaplama tamamen tarayıcınızda yapılır; yanıtlarınız sunucularımıza gönderilmez. Sonuç bağlantısını kopyalarsanız yanıtlarınız yalnızca o bağlantının içinde, kodlanmış olarak taşınır.",
  },
  {
    q: "Öneriler neye göre sıralanıyor?",
    a: "Düşük puan aldığınız sorular, ilgili alanın ağırlığıyla çarpılarak sıralanır. Böylece genel skorunuzu en çok etkileyen boşluklar listenin başında yer alır.",
  },
];

export default function ScorePage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Dijital Skor" }]}
        lines={["Dijitalde", "neredesiniz?"]}
        size="display"
      />
      <section aria-label="Dijital Skor değerlendirmesi" className="bg-ink-950 pb-[var(--section)] pt-[clamp(3rem,6vw,5rem)]">
        <div className="shell">
          <ScoreQuiz />
        </div>
      </section>
      <section aria-labelledby="skor-sss" className="section-y bg-ink-900">
        <div className="shell grid-12 gap-y-8">
          <h2 id="skor-sss" className="t-h1 col-span-12 lg:col-span-4">
            Değerlendirme hakkında
          </h2>
          <div className="col-span-12 lg:col-span-7 lg:col-start-6">
            <Faq items={faqs} />
          </div>
        </div>
      </section>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Ana Sayfa", path: "/" },
          { name: "Dijital Skor", path: "/dijital-skor" },
        ])}
      />
    </>
  );
}
