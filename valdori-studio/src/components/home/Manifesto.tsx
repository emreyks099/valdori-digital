import { DrawLine, Fade, ScrubWords } from "@/components/motion/Reveal";

export function Manifesto() {
  return (
    <section aria-labelledby="manifesto-baslik" className="section-y relative bg-ink-950">
      <div className="shell">
        <div className="grid-12 gap-y-8">
          <h2 id="manifesto-baslik" className="t-sign col-span-12 text-ash-500 md:col-span-3">
            Manifesto
          </h2>
          <ScrubWords className="t-statement col-span-12 text-pretty md:col-span-9">
            Güzel görünen bir site tek başına iş getirmez. Ziyaretçiyi müşteriye, tekrarlayan işi
            otomasyona, veriyi karara dönüştüren bir sistem gerekir. Biz ikisini aynı masada
            kurarız: göz alan vitrini de, onu çalıştıran makine dairesini de.
          </ScrubWords>
        </div>

        <div className="mt-[clamp(4rem,9vw,9rem)]">
          <DrawLine />
          <div className="grid md:grid-cols-2">
            <Fade className="relative border-b hairline py-10 md:border-b-0 md:border-r md:py-16 md:pr-[8%]">
              <p className="t-serif text-[clamp(3.25rem,8.2vw,8.5rem)] leading-[0.92] text-bone">Vitrin</p>
              <p className="t-lede mt-6 max-w-[30rem] text-ash-400">
                Markanızın karakterini taşıyan tasarım, akılda kalan hareket ve her ekranda aynı
                özen. İnsanların ilk saniyede gördüğü ve hatırladığı şey.
              </p>
              <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[0.9375rem] text-bone/85">
                <li>Web tasarım</li>
                <li>Sosyal medya</li>
                <li>SEO</li>
              </ul>
            </Fade>
            <Fade delay={0.12} className="relative py-10 md:py-16 md:pl-[8%]">
              <p className="t-serif text-[clamp(3.25rem,8.2vw,8.5rem)] leading-[0.92] text-ember-500">
                Makine dairesi
              </p>
              <p className="t-lede mt-6 max-w-[30rem] text-ash-400">
                Talebi kaydeden formlar, soruları yanıtlayan asistanlar, kendiliğinden akan iş
                süreçleri. Kimsenin görmediği ama işi asıl yürüten kısım.
              </p>
              <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[0.9375rem] text-bone/85">
                <li>Özel yazılım</li>
                <li>Yapay zekâ</li>
                <li>Otomasyon</li>
              </ul>
            </Fade>
          </div>
          <DrawLine />
        </div>
      </div>
    </section>
  );
}
