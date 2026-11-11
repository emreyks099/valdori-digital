import Link from "next/link";
import { pageMeta } from "@/lib/seo";
import { LegalPage, Todo } from "@/components/ui/LegalPage";

export const metadata = pageMeta({
  title: "Çerez Politikası",
  description: "Valdori Digital Studio web sitesinde çerez ve benzeri teknolojilerin kullanımına dair bilgilendirme.",
  path: "/cerez-politikasi",
  noindex: true,
});

export default function CookiePage() {
  return (
    <LegalPage
      crumb="Çerez Politikası"
      lines={["Çerez", "politikası"]}
      lede="Bu sitenin çerezleri ve tarayıcı depolamasını nasıl kullandığını açıklıyoruz."
    >
      <h2 id="durum">Bugünkü durum</h2>
      <p>
        Bu site şu an <strong>izleme, reklam ya da analitik çerezi kullanmamaktadır</strong>. Üçüncü
        taraf izleme betiği, reklam pikseli ya da sosyal medya eklentisi yüklenmez. Bu nedenle sitede
        bir çerez onay penceresi gösterilmemektedir.
      </p>

      <h2 id="depolama">Tarayıcı depolaması</h2>
      <ul>
        <li>
          <strong>Dijital Skor:</strong> Yanıtlarınız tarayıcı belleğinde tutulur; çerez ya da kalıcı
          depolama kullanılmaz. Sonuç bağlantısı, yanıtları adresin “#” sonrası bölümünde taşır ve bu
          bölüm sunucuya gönderilmez.
        </li>
        <li>
          <strong>İletişim formu:</strong> Form verisi yalnızca gönderdiğiniz anda sunucuya iletilir;
          tarayıcınızda saklanmaz.
        </li>
      </ul>

      <h2 id="zorunlu">Zorunlu teknik kayıtlar</h2>
      <p>
        Barındırma altyapısı, sitenin güvenli ve kesintisiz çalışması için teknik çerezler ya da
        kayıtlar kullanabilir: <Todo>barındırma sağlayıcısının kullandığı teknik çerezler</Todo>
      </p>

      <h2 id="gelecek">İleride analitik eklenirse</h2>
      <p>
        Siteye ziyaret ölçümü ya da reklam amaçlı bir araç eklenmesi hâlinde, bu sayfa güncellenecek
        ve zorunlu olmayan çerezler için açık rızanız alınmadan hiçbir çerez yerleştirilmeyecektir:{" "}
        <Todo>analitik aracı seçilirse adı, amaçları, saklama süreleri ve onay mekanizması</Todo>
      </p>

      <h2 id="kontrol">Çerezleri nasıl kontrol edersiniz?</h2>
      <p>
        Tarayıcınızın ayarlarından çerezleri silebilir ya da engelleyebilirsiniz. Kişisel verilerinizin
        işlenmesine dair ayrıntılar için <Link href="/gizlilik">Gizlilik Bilgilendirmesi</Link>{" "}
        sayfasına bakabilirsiniz.
      </p>
    </LegalPage>
  );
}
