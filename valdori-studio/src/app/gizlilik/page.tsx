import Link from "next/link";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";
import { LegalPage, Todo } from "@/components/ui/LegalPage";

export const metadata = pageMeta({
  title: "Gizlilik Bilgilendirmesi",
  description:
    "Valdori Digital Studio web sitesinde hangi kişisel verilerin, hangi amaçla işlendiğine dair gizlilik bilgilendirmesi.",
  path: "/gizlilik",
  // Taslak hâldeyken dizine eklenmez; metin onaylandığında bu satır kaldırılır.
  noindex: true,
});

export default function PrivacyPage() {
  return (
    <LegalPage
      crumb="Gizlilik"
      lines={["Gizlilik", "bilgilendirmesi"]}
      lede="Bu sitede hangi verilerinizin, ne amaçla ve nasıl işlendiğini sade bir dille anlatıyoruz."
    >
      <h2 id="veri-sorumlusu">Veri sorumlusu</h2>
      <p>
        Bu web sitesi {site.name} tarafından işletilmektedir. Veri sorumlusunun unvanı ve iletişim
        bilgileri: <Todo>şirket/şahıs unvanı, adres, vergi/MERSİS bilgisi, KVKK başvuruları için iletişim adresi</Todo>
      </p>

      <h2 id="toplanan-veriler">Hangi verileri işliyoruz?</h2>
      <h3>İletişim formu</h3>
      <p>
        İletişim formunu doldurduğunuzda paylaştığınız ad, e-posta adresi, (isteğe bağlı) telefon ve
        şirket bilgisi ile mesajınız, yalnızca talebinize yanıt vermek amacıyla işlenir. Form
        gönderimi e-posta altyapı sağlayıcımız üzerinden tarafımıza iletilir:{" "}
        <Todo>e-posta servis sağlayıcısının adı, sunucu konumu ve yurt dışına aktarım durumu</Todo>
      </p>
      <h3>Dijital Skor</h3>
      <p>
        <Link href="/dijital-skor">Dijital Skor</Link> değerlendirmesinde verdiğiniz yanıtlar yalnızca
        tarayıcınızda işlenir; sunucularımıza gönderilmez ve saklanmaz. Sonuç bağlantısını
        paylaşırsanız yanıtlarınız o bağlantının içinde kodlanmış olarak yer alır.
      </p>
      <h3>Sunucu kayıtları</h3>
      <p>
        Site, barındırma sağlayıcısı üzerinde çalışır. Güvenlik ve hata ayıklama amacıyla IP adresi,
        tarayıcı bilgisi ve istek zamanı gibi teknik kayıtlar barındırma sağlayıcısı tarafından
        tutulabilir: <Todo>barındırma sağlayıcısı, kayıt saklama süresi</Todo>
      </p>

      <h2 id="hukuki-sebep">İşleme amacı ve hukuki sebep</h2>
      <p>
        İletişim formu verileri, talebinize yanıt verilmesi ve teklif sürecinin yürütülmesi amacıyla
        işlenir. 6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamındaki hukuki sebep:{" "}
        <Todo>hukuk danışmanı tarafından belirlenecek (ör. sözleşmenin kurulması, meşru menfaat ya da açık rıza)</Todo>
      </p>

      <h2 id="saklama">Saklama süresi</h2>
      <p>
        Form aracılığıyla iletilen bilgiler, talebin sonuçlandırılması için gereken süre boyunca
        saklanır: <Todo>somut saklama süresi ve silme prosedürü</Todo>
      </p>

      <h2 id="aktarim">Üçüncü taraflarla paylaşım</h2>
      <p>
        Verileriniz pazarlama amacıyla üçüncü taraflara satılmaz ya da kiralanmaz. Yalnızca hizmetin
        sunulması için gerekli altyapı sağlayıcılarıyla (barındırma, e-posta iletimi) paylaşılır.
      </p>

      <h2 id="haklar">Haklarınız</h2>
      <p>
        KVKK’nın 11. maddesi uyarınca; kişisel verilerinizin işlenip işlenmediğini öğrenme, işlenmişse
        bilgi talep etme, düzeltilmesini ya da silinmesini isteme ve işlemeye itiraz etme haklarına
        sahipsiniz. Başvuru yöntemi: <Todo>başvuru kanalı (e-posta/KEP/posta adresi)</Todo>
      </p>

      <h2 id="cerezler">Çerezler</h2>
      <p>
        Çerez kullanımına ilişkin bilgi için <Link href="/cerez-politikasi">Çerez Politikası</Link>{" "}
        sayfasına bakabilirsiniz.
      </p>

      <h2 id="guncelleme">Güncellemeler</h2>
      <p>
        Bu metin, sitenin işleyişi değiştikçe güncellenir. Son güncelleme tarihi:{" "}
        <Todo>yayın tarihi</Todo>
      </p>
    </LegalPage>
  );
}
