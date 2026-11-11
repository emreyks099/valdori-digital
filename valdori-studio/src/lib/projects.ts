import type { ServiceSlug } from "./services";

/**
 * Projeler. `kind: "konsept"` olanlar müşteri işi DEĞİLDİR: kurgusal markalar üzerine
 * hazırlanmış yaklaşım gösterimleridir ve arayüzde her yerde açıkça etiketlenir.
 * Gerçek bir müşteri projesi eklendiğinde `kind: "musteri"` kullanılır.
 */
export type Project = {
  slug: string;
  kind: "konsept" | "musteri";
  cover: "mono" | "kiyi" | "rota" | "firin";
  title: string;
  sector: string;
  summary: string;
  services: ServiceSlug[];
  scenario: string;
  approach: { title: string; body: string }[];
  deliverables: string[];
  palette: { name: string; hex: string }[];
  typeNote: string;
};

export const projects: Project[] = [
  {
    slug: "atolye-mono",
    kind: "konsept",
    cover: "mono",
    title: "Atölye Mono",
    sector: "El yapımı mobilya",
    summary: "Küçük bir mobilya atölyesi için, ürünü değil zanaatı öne çıkaran e-ticaret deneyimi.",
    services: ["web-tasarim", "seo"],
    scenario:
      "Sipariş üzerine masif mobilya üreten küçük bir atölye düşünün. Ürünleri pahalı ve bekleme süresi uzun; pazaryerlerinde seri üretimle fiyat üzerinden kıyaslanmak istemiyor. Sitenin işi, ziyaretçiye neden beklemeye değeceğini hissettirmek.",
    approach: [
      {
        title: "Katalog değil, atölye ziyareti",
        body: "Ana sayfa bir ürün ızgarasıyla değil, yapım sürecinin yakın plan anlatımıyla açılır. Ürün sayfaları ölçü ve fiyattan önce malzemeyi, birleşim detayını ve ustayı gösterir.",
      },
      {
        title: "Sakin bir tipografi, sıcak bir palet",
        body: "Yüksek kontrastlı bir serif ile sade bir grotesk eşleşir. Renkler ahşabın kendisinden gelir: meşe, toprak ve kireç beyazı. Arayüz geri çekilir, fotoğraf konuşur.",
      },
      {
        title: "Sipariş, bir sohbet gibi",
        body: "Ölçü ve malzeme seçimi uzun bir form yerine adım adım ilerleyen bir yapılandırıcıyla yapılır. Her adımda tahmini teslim süresi ve fiyat aralığı güncellenir.",
      },
    ],
    deliverables: [
      "Marka uyumlu arayüz tasarım sistemi",
      "Ürün yapılandırıcı akışı",
      "Hikâye odaklı ürün sayfası şablonu",
      "Ürün ve kategori sayfaları için SEO yapısı",
    ],
    palette: [
      { name: "Kireç", hex: "#E7E0D4" },
      { name: "Meşe", hex: "#C19A6B" },
      { name: "Toprak", hex: "#A4532B" },
      { name: "İs", hex: "#1B1916" },
    ],
    typeNote: "Didone italik başlıklar · sade grotesk gövde",
  },
  {
    slug: "kiyi-klinik",
    kind: "konsept",
    cover: "kiyi",
    title: "Kıyı Klinik",
    sector: "Ağız ve diş sağlığı",
    summary: "Bir diş kliniği için randevu akışı ve sık sorulan soruları yanıtlayan yapay zekâ asistanı.",
    services: ["web-tasarim", "yapay-zeka", "otomasyon"],
    scenario:
      "Bir diş kliniğinin telefonu gün boyu aynı sorularla çalıyor: fiyat aralığı, randevu saatleri, tedavi süresi. Sekreter hem hastayla ilgilenip hem telefona yetişemiyor; mesai dışı aramalar ise cevapsız kalıyor.",
    approach: [
      {
        title: "Kaygıyı azaltan bir arayüz",
        body: "Klinik siteleri çoğu zaman soğuk ve kalabalıktır. Burada geniş boşluklar, yumuşak bir deniz paleti ve kısa cümleler kullanıldı; her ekranda tek bir net eylem var: randevu al.",
      },
      {
        title: "Sınırlarını bilen bir asistan",
        body: "Asistan yalnızca kliniğin onayladığı bilgilerden yanıt verir: çalışma saatleri, tedavi türleri, hazırlık bilgileri. Tıbbi değerlendirme gerektiren her soruda hekime yönlendirir ve bunu açıkça söyler.",
      },
      {
        title: "Randevudan hatırlatmaya otomatik akış",
        body: "Çevrim içi randevu takvime işlenir, hastaya onay ve bir gün önce hatırlatma gider. İptal edilen saat, bekleme listesindeki hastaya otomatik önerilir.",
      },
    ],
    deliverables: [
      "Randevu odaklı web sitesi tasarımı",
      "Yapay zekâ asistanı konuşma tasarımı ve sınır kuralları",
      "Randevu–hatırlatma otomasyon akışı",
      "Tedavi sayfaları için içerik yapısı",
    ],
    palette: [
      { name: "Derin", hex: "#0F3B43" },
      { name: "Kıyı", hex: "#2F7F86" },
      { name: "Köpük", hex: "#DCE9E6" },
      { name: "Kum", hex: "#F0E6D6" },
    ],
    typeNote: "Geniş kesim başlıklar · okunaklı, yumuşak gövde",
  },
  {
    slug: "rota-panel",
    kind: "konsept",
    cover: "rota",
    title: "Rota Panel",
    sector: "Lojistik operasyonu",
    summary: "Bölgesel bir taşımacılık firması için sevkiyat, araç ve teslimat takibini birleştiren operasyon paneli.",
    services: ["ozel-yazilim", "otomasyon"],
    scenario:
      "Orta ölçekli bir taşımacılık firması sevkiyatları tabloda, araçları ayrı bir uygulamada, müşteri bildirimlerini ise telefonla yürütüyor. Operasyon sorumlusu günün büyük kısmını “şu an nerede?” sorusunu yanıtlayarak geçiriyor.",
    approach: [
      {
        title: "Tek ekran, tek doğru",
        body: "Sevkiyat, araç ve sürücü bilgisi tek veri modelinde birleşir. Ana ekran bir harita değil, bir öncelik listesidir: geciken, riskli ve yolunda olan sevkiyatlar.",
      },
      {
        title: "Yoğun veri için sakin arayüz",
        body: "Koyu zemin, tek bir sinyal rengi ve tabular rakamlar. Renk yalnızca dikkat gerektiren yerde kullanılır; her şey yolundaysa ekran sessizdir.",
      },
      {
        title: "Soru sorulmadan gelen yanıt",
        body: "Durum değişiklikleri müşteriye otomatik bildirilir. Gecikme tahmini eşiği aştığında operasyon sorumlusu ve müşteri aynı anda bilgilendirilir.",
      },
    ],
    deliverables: [
      "Veri modeli ve rol bazlı yetki tasarımı",
      "Operasyon paneli arayüzü",
      "Müşteri bildirim otomasyonları",
      "Haftalık performans raporu şablonu",
    ],
    palette: [
      { name: "Gece", hex: "#0D0F0E" },
      { name: "Asfalt", hex: "#1C201E" },
      { name: "Sinyal", hex: "#C8F03C" },
      { name: "Sis", hex: "#AEB6B1" },
    ],
    typeNote: "Dar kesim başlıklar · eş aralıklı rakamlar",
  },
  {
    slug: "firin-no-7",
    kind: "konsept",
    cover: "firin",
    title: "Fırın No.7",
    sector: "Butik fırın",
    summary: "Mahalle fırını için tanınır bir Instagram dili ve ön sipariş akışı.",
    services: ["sosyal-medya", "otomasyon"],
    scenario:
      "Ekşi mayalı ekmekleriyle bilinen küçük bir fırın düşünün. Ürünler öğlene kadar tükeniyor, siparişler doğrudan mesajla alınıyor ve yarısı gözden kaçıyor. Instagram hesabı var ama her paylaşım başka bir elden çıkmış gibi.",
    approach: [
      {
        title: "Tek renk, tek rakam",
        body: "Tuğla kırmızısı ve büyük bir “7”: akışta kaydırırken bile tanınan bir işaret. Bütün şablonlar bu iki öğenin etrafında kurulur.",
      },
      {
        title: "Dört içerik sütunu",
        body: "Bugün fırından çıkanlar, mayanın hikâyesi, mahalleden yüzler ve ön sipariş duyuruları. Her sütunun kendi şablonu ve haftalık yeri vardır.",
      },
      {
        title: "Mesajdan siparişe",
        body: "Profildeki bağlantı kısa bir ön sipariş formuna gider. Sipariş fırının listesine düşer, müşteriye teslim saatiyle onay gider; mesaj kutusunda kaybolan sipariş kalmaz.",
      },
    ],
    deliverables: [
      "Instagram şablon sistemi",
      "Aylık içerik takvimi yapısı",
      "Reels kurgu formatları",
      "Ön sipariş formu ve bildirim akışı",
    ],
    palette: [
      { name: "Tuğla", hex: "#B5371F" },
      { name: "Kabuk", hex: "#7A2415" },
      { name: "Un", hex: "#F3EBDD" },
      { name: "Kömür", hex: "#1A1513" },
    ],
    typeNote: "Didone rakam · geniş kesim etiketler",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export const kindLabel: Record<Project["kind"], string> = {
  konsept: "Konsept çalışma",
  musteri: "Müşteri projesi",
};
