export type ServiceSlug =
  | "web-tasarim"
  | "yapay-zeka"
  | "otomasyon"
  | "ozel-yazilim"
  | "seo"
  | "sosyal-medya";

export type Service = {
  slug: ServiceSlug;
  name: string;
  /** Liste ve menülerde tek satırlık tanım */
  short: string;
  /** Hizmet evreninde görünen anahtar kavramlar */
  tags: string[];
  metaTitle: string;
  metaDescription: string;
  hero: { lines: string[]; lede: string };
  problem: { title: string; body: string[] };
  /** Müşterinin elde ettiği sonuç — özellik değil fayda */
  outcomes: { title: string; body: string }[];
  scope: { title: string; intro: string; items: { name: string; desc: string }[] };
  steps: { name: string; desc: string }[];
  faqs: { q: string; a: string }[];
  related: ServiceSlug[];
};

export const services: Service[] = [
  {
    slug: "web-tasarim",
    name: "Web Tasarım",
    short: "Markanıza özel tasarlanan, hızlı açılan ve ziyaretçiyi müşteriye çeviren web siteleri.",
    tags: ["Kurumsal site", "Landing page", "E-ticaret arayüzü", "Yeniden tasarım"],
    metaTitle: "Web Tasarım: Markaya Özel, Hızlı Siteler",
    metaDescription:
      "Şablon değil, markanıza özel tasarım. Mobil öncelikli, hızlı, SEO altyapısı hazır ve dönüşüm odaklı web siteleri. Valdori Digital Studio web tasarım hizmeti.",
    hero: {
      lines: ["Şablon değil,", "imza."],
      lede: "Web siteniz çoğu müşterinin sizinle ilk karşılaşması. O ilk saniyeleri hazır bir temaya bırakmıyoruz: markanızın karakterini taşıyan, her ekranda kusursuz çalışan ve ziyaretçiyi adım adım iletişime götüren siteler tasarlayıp geliştiriyoruz.",
    },
    problem: {
      title: "Güzel görünmesi yetmez. Çalışması gerekir.",
      body: [
        "Hazır temalarla kurulan siteler birbirine benzer; ziyaretçi üç saniyede “bunu daha önce gördüm” der ve markanız akılda kalmaz. Üstelik çoğu tema, kullanılmayan onlarca özelliğin kodunu her sayfada yükler: site ağırlaşır, mobilde geç açılır, arama sonuçlarında geride kalır.",
        "Biz tasarıma ekranı doldurmak için değil, bir hedefe ulaşmak için başlarız: ziyaretçi kim, ne arıyor, hangi adımda kararsız kalıyor? Görsel dil, içerik sırası ve teknik altyapı bu sorulara göre kurulur.",
      ],
    },
    outcomes: [
      {
        title: "Akılda kalan ilk izlenim",
        body: "Tipografiden hareket diline kadar markanıza özel bir görsel sistem. Rakiplerinizin sitesiyle karıştırılmayan, ekran görüntüsü alınıp paylaşılan bir vitrin.",
      },
      {
        title: "Her ekranda aynı özen",
        body: "Mobil tasarımı masaüstünün küçültülmüş hâli olarak değil, ayrı bir deneyim olarak ele alırız. 360 pikselden geniş ekrana kadar her kırılım elle kontrol edilir.",
      },
      {
        title: "Hız, baştan tasarlanır",
        body: "Görsel optimizasyonu, gereksiz kodun ayıklanması ve doğru render stratejisi sürecin sonuna bırakılmaz. Core Web Vitals hedefleri tasarım kararlarını belirler.",
      },
      {
        title: "İletişime giden net bir yol",
        body: "Her sayfanın tek bir işi vardır. Çağrı düğmeleri, form uzunluğu ve içerik sırası ziyaretçinin karar anına göre yerleştirilir; neyin işe yaradığı ölçülebilir kalır.",
      },
    ],
    scope: {
      title: "Bir web projesinde neler var?",
      intro: "Teslim ettiğimiz şey birkaç sayfa değil; büyümeye hazır, bakımı kolay bir sistemdir.",
      items: [
        { name: "Strateji ve içerik mimarisi", desc: "Hedef kitle, sayfa yapısı, mesaj hiyerarşisi ve dönüşüm yolları." },
        { name: "Özgün arayüz tasarımı", desc: "Markaya özel tasarım sistemi: renk, tipografi, bileşenler ve hareket dili." },
        { name: "Modern geliştirme", desc: "Next.js ve TypeScript ile hızlı, güvenli ve ölçeklenebilir kod tabanı." },
        { name: "SEO altyapısı", desc: "Semantik yapı, metadata, sitemap, yapılandırılmış veri ve performans optimizasyonu." },
        { name: "İçerik yönetimi", desc: "İçeriğinizi geliştiriciye ihtiyaç duymadan güncelleyebileceğiniz bir yapı." },
        { name: "Bakım ve geliştirme", desc: "Yayın sonrası güncelleme, izleme ve yeni ihtiyaçlar için sürekli destek." },
      ],
    },
    steps: [
      { name: "Keşif", desc: "İşinizi, müşterinizi ve rakiplerinizi dinleyerek başlarız. Sitenin tek bir cümlelik görevini birlikte yazarız." },
      { name: "Tasarım", desc: "Önce yapı, sonra görsel dil. Ana sayfa ve kilit sayfalar gerçek içerikle tasarlanır, onayınıza sunulur." },
      { name: "Geliştirme", desc: "Tasarım piksel hassasiyetiyle koda dökülür; animasyonlar, formlar ve entegrasyonlar bağlanır." },
      { name: "Yayın ve sonrası", desc: "Hız, erişilebilirlik ve tarayıcı testlerinden geçen site yayına alınır; ölçüm ve bakım başlar." },
    ],
    faqs: [
      {
        q: "Bir web sitesi projesi ne kadar sürer?",
        a: "Kapsama göre değişir. Tek sayfalık bir tanıtım sitesi birkaç haftada tamamlanabilirken, çok sayfalı ve özel işlevli kurumsal siteler daha uzun sürer. Keşif görüşmesinin ardından aşama aşama bir takvim paylaşırız.",
      },
      {
        q: "Mevcut sitemi yenileyebilir misiniz?",
        a: "Evet. Mevcut sitenizin içeriğini, arama görünürlüğünü ve teknik durumunu inceleyerek başlarız. Yeniden tasarımda kazanılmış arama trafiğini korumak için URL yapısı ve yönlendirmeler planlanır.",
      },
      {
        q: "Siteyi teslimden sonra kendim güncelleyebilir miyim?",
        a: "Evet. İhtiyacınıza göre bir içerik yönetim yapısı kurarız; metin, görsel ve blog yazılarını teknik bilgi gerekmeden güncelleyebilirsiniz.",
      },
      {
        q: "Hazır tema kullanıyor musunuz?",
        a: "Hayır. Her projede tasarım ve kod o markaya özel üretilir. Bu hem görsel özgünlüğü hem de sitenin hızını doğrudan etkiler.",
      },
    ],
    related: ["seo", "ozel-yazilim", "sosyal-medya"],
  },
  {
    slug: "yapay-zeka",
    name: "Yapay Zekâ",
    short: "Müşteri sorularını yanıtlayan, belgeleri okuyan ve ekibinize zaman kazandıran AI çözümleri.",
    tags: ["AI chatbot", "Destek asistanı", "Bilgi asistanı", "Doküman işleme"],
    metaTitle: "Yapay Zekâ Çözümleri: Chatbot ve AI Asistan",
    metaDescription:
      "İşletmenize özel yapay zekâ çözümleri: müşteri destek asistanları, kurumsal bilgi asistanları, doküman işleme ve AI destekli raporlama. Somut senaryolarla tanışın.",
    hero: {
      lines: ["Sorulara yetişen", "bir zekâ."],
      lede: "Yapay zekâ bir moda sözcüğü değil; doğru kurulduğunda her gün aynı soruları yanıtlayan, aynı belgeleri okuyan, aynı raporu hazırlayan ekibinize zaman kazandıran bir çalışma arkadaşı. Biz onu işinizin gerçek verisine ve kurallarına bağlarız.",
    },
    problem: {
      title: "Genel bir sohbet robotu işinizi bilmez.",
      body: [
        "Herkesin kullandığı yapay zekâ araçları etkileyicidir ama sizin fiyat listenizi, iade politikanızı, randevu takviminizi bilmez. Bilmediği yerde tahmin yürütür; bu da müşteriye yanlış bilgi vermek demektir.",
        "Farkı yaratan model değil, kurulumdur: asistanın hangi kaynaklardan beslendiği, neyi yanıtlayıp neyi insana devrettiği, yanıtlarının nasıl denetlendiği. Biz bu sistemi tasarlarız.",
      ],
    },
    outcomes: [
      {
        title: "Mesai dışında da yanıt",
        body: "Web sitenizdeki veya mesajlaşma kanalınızdaki asistan, sık sorulan soruları anında yanıtlar; yanıtlayamadığını uygun kişiye bağlamıyla birlikte devreder.",
      },
      {
        title: "Dağınık bilgi, tek kapı",
        body: "Prosedürler, sözleşmeler, ürün dokümanları… Ekibiniz aradığını klasörlerde değil, kaynak göstererek yanıt veren bir bilgi asistanında bulur.",
      },
      {
        title: "Belgelerden veriye",
        body: "Fatura, form, teklif gibi belgelerdeki bilgiler okunur, sınıflandırılır ve kullandığınız sisteme aktarılır. Elle veri girişi azalır.",
      },
      {
        title: "Kontrol sizde",
        body: "Asistanın yetki sınırlarını, ses tonunu ve hangi durumda insana başvuracağını siz belirlersiniz. Yanıtlar kayıt altındadır ve gözden geçirilebilir.",
      },
    ],
    scope: {
      title: "Neler kurabiliriz?",
      intro: "Her çözüm, mevcut iş akışınıza ve kullandığınız araçlara göre şekillenir.",
      items: [
        { name: "AI chatbot ve satış asistanı", desc: "Ürün ve hizmet sorularını yanıtlayan, talep toplayan, randevuya yönlendiren asistanlar." },
        { name: "Müşteri destek asistanı", desc: "Sık sorulan konuları çözen, karmaşık talepleri özetleyerek ekibe devreden destek katmanı." },
        { name: "Kurumsal bilgi asistanı", desc: "Şirket içi dokümanlarınız üzerinde, kaynak göstererek yanıt veren arama ve soru-cevap sistemi." },
        { name: "Doküman işleme", desc: "Belgelerden veri çıkarma, sınıflandırma, özetleme ve sistemlere aktarma." },
        { name: "AI destekli içerik ve raporlama", desc: "Taslak üretimi, veri özetleri ve düzenli raporlar için insan onaylı akışlar." },
        { name: "Özel iş akışları", desc: "Yapay zekâyı CRM, e-posta veya operasyon araçlarınıza bağlayan uçtan uca çözümler." },
      ],
    },
    steps: [
      { name: "Senaryo seçimi", desc: "Yapay zekânın en çok zaman kazandıracağı, riski düşük ilk kullanım alanını birlikte belirleriz." },
      { name: "Bilgi ve kural tasarımı", desc: "Asistanın besleneceği kaynaklar, yanıt sınırları ve insana devir kuralları tanımlanır." },
      { name: "Kurulum ve test", desc: "Gerçek sorularla denenir; hatalı ve eksik yanıtlar düzeltilene kadar iyileştirilir." },
      { name: "Devreye alma ve izleme", desc: "Kademeli olarak yayına alınır, konuşmalar izlenir ve sistem düzenli olarak güncellenir." },
    ],
    faqs: [
      {
        q: "Yapay zekâ asistanı yanlış bilgi verirse ne olur?",
        a: "Hiçbir dil modeli hatasız değildir; bu yüzden asistanı yalnızca sizin onayladığınız kaynaklara dayandırır, emin olmadığı durumlarda yanıt vermek yerine insana devretmesini sağlarız. Konuşmalar kayıt altında tutulur ve düzenli gözden geçirilir.",
      },
      {
        q: "Verilerimiz güvende mi?",
        a: "Hangi verinin hangi servise gönderildiğini proje başında açıkça belgeleriz. Kişisel veri içeren senaryolarda veri minimizasyonu uygular, KVKK kapsamındaki yükümlülüklerinizi hukuk danışmanınızla birlikte değerlendirmenizi öneririz.",
      },
      {
        q: "Hangi yapay zekâ modellerini kullanıyorsunuz?",
        a: "İhtiyaca göre seçeriz. Model tercihi; doğruluk, maliyet, hız ve veri politikası gibi ölçütlere göre her proje için ayrı değerlendirilir. Tek bir sağlayıcıya bağımlı kalmayacak bir mimari kurmaya özen gösteririz.",
      },
      {
        q: "Küçük bir işletme için de anlamlı mı?",
        a: "Çoğu zaman evet. Günde onlarca kez yanıtlanan aynı sorular ya da elle yapılan tekrarlı işler varsa, küçük kapsamlı bir asistan bile fark yaratabilir. Uygun olmadığını düşünürsek bunu da açıkça söyleriz.",
      },
    ],
    related: ["otomasyon", "ozel-yazilim", "web-tasarim"],
  },
  {
    slug: "otomasyon",
    name: "Otomasyon",
    short: "Tekrarlayan işleri sistemlere devreden, araçlarınızı birbirine bağlayan iş akışları.",
    tags: ["İş akışı", "Entegrasyon", "Bildirim", "Raporlama"],
    metaTitle: "İş Otomasyonu: Tekrarlayan İşleri Devredin",
    metaDescription:
      "Form, CRM, e-posta, faturalama ve raporlama araçlarınızı birbirine bağlayan otomasyon çözümleri. Elle yapılan tekrarlı işleri azaltın, hatayı düşürün.",
    hero: {
      lines: ["İş akar.", "Siz bakarsınız."],
      lede: "Bir formdan gelen talebi tabloya kopyalamak, müşteriye teşekkür e-postası atmak, ay sonunda raporu elle derlemek… Bunlar iş değil, işin sürtünmesi. Otomasyon bu sürtünmeyi ortadan kaldırır; ekibiniz dikkat gerektiren işe döner.",
    },
    problem: {
      title: "Kopyala–yapıştır bir iş modeli değildir.",
      body: [
        "Araçlar çoğaldıkça aralarındaki boşluğu insanlar doldurur: bir sistemden alıp diğerine yazmak, hatırlatma atmak, durum güncellemek. Her elle adım hem zaman hem de hata riski demektir; bir talep gözden kaçar, bir fatura gecikir.",
        "Otomasyon, kuralları belli olan bu adımları yazılıma devretmektir. Amaç insanı devreden çıkarmak değil; insanın yalnızca karar gerektiren noktada devreye girmesini sağlamaktır.",
      ],
    },
    outcomes: [
      {
        title: "Kaçan talep kalmaz",
        body: "Her başvuru anında kaydedilir, ilgili kişiye atanır ve müşteriye otomatik bilgi verilir. Takip, birinin hatırlamasına bağlı olmaktan çıkar.",
      },
      {
        title: "Araçlarınız aynı dili konuşur",
        body: "Web siteniz, CRM’iniz, e-posta ve muhasebe araçlarınız arasında veri kendiliğinden akar; aynı bilgi iki kez girilmez.",
      },
      {
        title: "Hata yüzeyi daralır",
        body: "Kuralı net olan işlemler her seferinde aynı biçimde çalışır. Elle girişten kaynaklanan tutarsızlıklar azalır.",
      },
      {
        title: "Görünür operasyon",
        body: "Hangi iş hangi aşamada, nerede birikiyor? Akışlar ölçülebilir hâle gelir; raporlar kendiliğinden hazırlanır.",
      },
    ],
    scope: {
      title: "Hangi işler otomatikleşir?",
      intro: "Kuralı tarif edilebilen her tekrarlı adım bir otomasyon adayıdır.",
      items: [
        { name: "Talep ve müşteri akışları", desc: "Form → CRM → atama → bilgilendirme → takip hatırlatması." },
        { name: "Teklif ve evrak süreçleri", desc: "Şablondan teklif üretimi, onay akışı, imza ve arşivleme." },
        { name: "Bildirim ve hatırlatmalar", desc: "Randevu, ödeme ve teslim tarihleri için otomatik e-posta ve mesajlar." },
        { name: "Veri senkronizasyonu", desc: "Sistemler arası çift yönlü veri aktarımı ve tutarlılık kontrolleri." },
        { name: "Raporlama", desc: "Farklı kaynaklardan toplanan verinin düzenli özet raporlara dönüşmesi." },
        { name: "AI destekli adımlar", desc: "Gelen mesajı sınıflandırma, özetleme veya taslak yanıt hazırlama gibi akıllı ara adımlar." },
      ],
    },
    steps: [
      { name: "Süreç haritası", desc: "Mevcut akışı adım adım çıkarır, nerede zaman kaybedildiğini ve nerede hata oluştuğunu görünür kılarız." },
      { name: "Önceliklendirme", desc: "En sık tekrarlanan ve kuralı en net olan adımlardan başlarız; küçük ama hemen işe yarayan kazanımlar." },
      { name: "Kurulum", desc: "Akışlar kurulur, hata durumları ve istisnalar için insan onayı noktaları eklenir." },
      { name: "İzleme", desc: "Akışlar kayıt altında çalışır; takılan bir adım olduğunda siz müşteriden önce haberdar olursunuz." },
    ],
    faqs: [
      {
        q: "Hangi araçlarla çalışıyorsunuz?",
        a: "Kullandığınız araçların API veya entegrasyon desteği olması yeterli. Hazır otomasyon platformlarının yettiği yerde onları, yetmediği yerde özel geliştirilen entegrasyonları kullanırız. Araç seçimi maliyet ve bakım kolaylığına göre yapılır.",
      },
      {
        q: "Otomasyon bozulursa ne olur?",
        a: "Her akış hata durumları düşünülerek kurulur: başarısız adımlar kaydedilir, yeniden denenir ve gerekirse ilgili kişiye bildirim gider. Kritik akışlarda sessiz başarısızlığa izin verilmez.",
      },
      {
        q: "Nereden başlamalıyım?",
        a: "Ekibinizin her hafta tekrarladığı ve “bunu keşke elle yapmasak” dediği işi düşünün. Çoğu zaman en iyi ilk aday odur. Dijital Skor değerlendirmesi de hangi alanda boşluk olduğunu görmenize yardımcı olur.",
      },
    ],
    related: ["yapay-zeka", "ozel-yazilim", "web-tasarim"],
  },
  {
    slug: "ozel-yazilim",
    name: "Özel Yazılım",
    short: "Hazır yazılımların sığmadığı yerde: işinize göre kurulan CRM, panel ve web uygulamaları.",
    tags: ["CRM", "SaaS", "Yönetim paneli", "API entegrasyonu"],
    metaTitle: "Özel Yazılım: CRM, SaaS ve Yönetim Paneli",
    metaDescription:
      "İş süreçlerinize göre tasarlanan özel yazılımlar: CRM, SaaS ürünleri, yönetim panelleri, API entegrasyonları ve raporlama sistemleri. Güvenli ve sürdürülebilir mimari.",
    hero: {
      lines: ["İşinize göre", "kurulan sistem."],
      lede: "Hazır yazılımlar ortalama bir işletme için tasarlanır. Sizin süreciniz ortalama değilse ya yazılıma uyarsınız ya da tablolarla yama yaparsınız. Üçüncü yol: işinizin gerçek akışına göre kurulan, sizinle birlikte büyüyen bir yazılım.",
    },
    problem: {
      title: "Tablolar bir noktada taşar.",
      body: [
        "Her işletme bir yerde elektronik tabloyla başlar. Sonra tablo büyür, kopyaları çoğalır, kimin hangi sürümde çalıştığı belirsizleşir. Müşteri bilgisi bir yerde, sipariş başka yerde, rapor ise birinin bilgisayarındadır.",
        "Özel yazılım pahalı bir lüks değil; doğru kapsamla başlandığında dağınıklığın maliyetinden daha ucuz bir yatırımdır. Kilit nokta, her şeyi birden yapmaya çalışmamak: en çok acıtan süreçten başlayıp aşama aşama büyütmek.",
      ],
    },
    outcomes: [
      {
        title: "Tek doğru kaynak",
        body: "Müşteri, sipariş, stok, görev… Veriniz tek bir sistemde, herkesin aynı güncel bilgiye baktığı bir yapıda toplanır.",
      },
      {
        title: "Süreciniz, sizin kurallarınız",
        body: "Onay adımları, yetkiler, bildirimler ve ekranlar işinizin gerçek akışına göre tasarlanır; yazılıma göre çalışmak zorunda kalmazsınız.",
      },
      {
        title: "Karar için veri",
        body: "Panolar ve raporlar, sorduğunuz sorulara göre kurulur. Ay sonunu beklemeden nerede durduğunuzu görürsünüz.",
      },
      {
        title: "Büyümeye açık mimari",
        body: "Yeni modül, yeni entegrasyon, artan kullanıcı sayısı… Sistem, baştan bunlar düşünülerek kurulur; yeniden yazmak gerekmez.",
      },
    ],
    scope: {
      title: "Ne geliştiriyoruz?",
      intro: "Fikir aşamasındaki bir üründen, yıllardır kullanılan bir sistemin yenilenmesine kadar.",
      items: [
        { name: "CRM ve müşteri sistemleri", desc: "Müşteri kaydı, satış hattı, teklif ve takip süreçleri için size özel çözümler." },
        { name: "SaaS ürünleri", desc: "Abonelik, çok kiracılı yapı ve ödeme altyapısıyla pazara çıkmaya hazır ürünler." },
        { name: "Yönetim panelleri", desc: "Operasyonu, içeriği veya veriyi yönettiğiniz, rol bazlı yetkilendirilmiş arayüzler." },
        { name: "Özel web uygulamaları", desc: "Rezervasyon, teklif hesaplama, müşteri portalı gibi işinize özgü araçlar." },
        { name: "API entegrasyonları", desc: "Ödeme, kargo, muhasebe ve üçüncü taraf servislerle güvenilir bağlantılar." },
        { name: "Veri ve raporlama", desc: "Farklı kaynaklardaki veriyi birleştiren panolar ve otomatik raporlar." },
      ],
    },
    steps: [
      { name: "Kapsam", desc: "İş hedefini, kullanıcıları ve kritik akışları netleştirir; ilk sürümde nelerin olacağına birlikte karar veririz." },
      { name: "Mimari ve arayüz", desc: "Veri modeli, yetki yapısı ve ekran akışları tasarlanır. Kod yazılmadan önce sistemin nasıl çalışacağını görürsünüz." },
      { name: "Aşamalı geliştirme", desc: "Kısa döngülerle ilerleriz; her döngünün sonunda çalışan, denenebilir bir parça teslim edilir." },
      { name: "Yayın ve bakım", desc: "Testler, yedekleme ve izleme kurulur. Yayın sonrası hata düzeltme ve yeni özellikler planlı biçimde sürer." },
    ],
    faqs: [
      {
        q: "Kodun sahibi kim olur?",
        a: "Sözleşmede aksi kararlaştırılmadıkça, sizin için geliştirilen yazılımın kaynak kodu teslim edilir. Sahiplik ve lisans koşulları proje başında yazılı olarak netleştirilir.",
      },
      {
        q: "Güvenliği nasıl ele alıyorsunuz?",
        a: "Yetkilendirme, girdi doğrulama, şifreli bağlantı, gizli anahtarların güvenli saklanması ve düzenli yedekleme varsayılan uygulamalarımızdır. Kişisel veri işleyen sistemlerde veri minimizasyonu ve erişim kayıtları tasarıma dahil edilir.",
      },
      {
        q: "Hazır bir yazılım almak daha mantıklı olmaz mı?",
        a: "Bazen olur. Süreciniz standartsa ve hazır bir ürün ihtiyacınızı karşılıyorsa bunu öneririz. Özel yazılım, hazır çözümlerin sürecinizi kısıtladığı veya birden fazla aracı yamalarla bir arada tuttuğunuz noktada anlam kazanır.",
      },
      {
        q: "Hangi teknolojileri kullanıyorsunuz?",
        a: "Ağırlıklı olarak TypeScript, React ve Next.js ile çalışır; veritabanı ve altyapı seçimini projenin ihtiyacına göre yaparız. Öncelik, yaygın ve iyi desteklenen teknolojilerle uzun ömürlü bir kod tabanı kurmaktır.",
      },
    ],
    related: ["otomasyon", "yapay-zeka", "web-tasarim"],
  },
  {
    slug: "seo",
    name: "SEO",
    short: "Teknik altyapı, içerik ve performansla kalıcı organik görünürlük.",
    tags: ["Teknik SEO", "İçerik stratejisi", "Performans", "Yerel SEO"],
    metaTitle: "SEO Hizmeti: Teknik SEO ve İçerik",
    metaDescription:
      "Teknik SEO, içerik stratejisi, site hızı ve dönüşüm optimizasyonunu birlikte ele alan SEO hizmeti. Gerçekçi hedefler, şeffaf raporlama, kalıcı organik büyüme.",
    hero: {
      lines: ["Aranan yerde", "bulunmak."],
      lede: "İnsanlar bir ihtiyaç duyduğunda önce arar. O anda karşılarına çıkmak reklam bütçesiyle de mümkün; ama bütçe bittiğinde görünürlük de biter. SEO, sitenizi arama motorları ve insanlar için gerçekten iyi hâle getirerek kalıcı bir görünürlük kurar.",
    },
    problem: {
      title: "Sıralama bir hile değil, bir sonuçtur.",
      body: [
        "SEO uzun süre anahtar kelime doldurmak ve bağlantı satın almak olarak pazarlandı. Arama motorları bu yöntemleri artık ödüllendirmiyor; çoğu zaman cezalandırıyor. Bugün sıralamayı belirleyen şey, sayfanın arayan kişinin sorusunu ne kadar iyi yanıtladığı ve ne kadar sorunsuz çalıştığı.",
        "Bu yüzden SEO’yu ayrı bir “paket” olarak değil, sitenin kendisinin kalitesi olarak ele alıyoruz: sağlam teknik temel, arama niyetine göre yazılmış içerik ve hızlı, kullanışlı sayfalar.",
      ],
    },
    outcomes: [
      {
        title: "Arama motorlarının anlayacağı bir site",
        body: "Taranabilirlik, dizin yapısı, yapılandırılmış veri ve temiz URL mimarisi. İçeriğiniz ne kadar iyi olursa olsun, önce bulunabilir olması gerekir.",
      },
      {
        title: "Doğru soruya doğru sayfa",
        body: "Müşterilerinizin gerçekten aradığı konuları belirler, her arama niyetine karşılık gelen bir sayfa planlarız. Trafik değil, ilgili trafik hedeflenir.",
      },
      {
        title: "Hız bir sıralama meselesidir",
        body: "Core Web Vitals ölçümleri izlenir, yavaşlatan unsurlar ayıklanır. Hızlı site hem arama motorunun hem ziyaretçinin tercihidir.",
      },
      {
        title: "Ziyaretten talebe",
        body: "Gelen trafiğin ne yaptığını ölçeriz. Sıralamada yükselmek bir ara adımdır; asıl hedef, ziyaretin iletişim talebine dönüşmesidir.",
      },
    ],
    scope: {
      title: "SEO çalışması neleri kapsar?",
      intro: "Tek seferlik bir işlem değil; ölçüp iyileştirerek ilerleyen sürekli bir çalışma.",
      items: [
        { name: "Teknik denetim", desc: "Tarama hataları, dizin durumu, site mimarisi, mobil uyum ve hız analizi." },
        { name: "Anahtar kelime ve niyet araştırması", desc: "Sektörünüzde gerçekten aranan konuların ve rekabet düzeyinin haritası." },
        { name: "İçerik stratejisi", desc: "Hizmet sayfaları ve blog için konu planı; uzmanlığınızı gösteren özgün içerikler." },
        { name: "Sayfa içi optimizasyon", desc: "Başlık yapısı, metadata, iç bağlantılar ve yapılandırılmış veri." },
        { name: "Yerel görünürlük", desc: "Fiziksel hizmet veren işletmeler için işletme profili ve yerel arama optimizasyonu." },
        { name: "Ölçüm ve raporlama", desc: "Görünürlük, trafik ve dönüşüm verilerinin düzenli, anlaşılır raporları." },
      ],
    },
    steps: [
      { name: "Denetim", desc: "Sitenizin bugünkü teknik ve içerik durumunu ölçer, en çok etki yaratacak sorunları sıralarız." },
      { name: "Temel onarım", desc: "Taramayı ve dizine eklenmeyi engelleyen teknik sorunlar ile hız problemleri giderilir." },
      { name: "İçerik üretimi", desc: "Öncelikli arama niyetleri için sayfalar ve yazılar planlanır, yazılır ve yayınlanır." },
      { name: "Ölçüm döngüsü", desc: "Sonuçlar izlenir; işe yarayan büyütülür, yaramayan değiştirilir." },
    ],
    faqs: [
      {
        q: "İlk sayfa garantisi veriyor musunuz?",
        a: "Hayır. Sıralamaları arama motorları belirler; garanti veren hiç kimse bu sözü tutacak konumda değildir. Verebileceğimiz söz; doğru yöntemlerle, şeffaf biçimde çalışmak ve ilerlemeyi ölçülebilir verilerle raporlamaktır.",
      },
      {
        q: "Sonuçları ne zaman görürüm?",
        a: "Teknik iyileştirmelerin etkisi birkaç hafta içinde görülebilir; içerik ve otorite kazanımı ise aylar ölçeğinde gelişir. Süre; sektörünüzdeki rekabete, sitenizin geçmişine ve çalışmanın sürekliliğine bağlıdır.",
      },
      {
        q: "Yapay zekâ ile üretilmiş içerik kullanıyor musunuz?",
        a: "Yapay zekâyı araştırma ve taslak aşamalarında yardımcı araç olarak kullanabiliriz; ancak yayınlanan içerik, konuyu bilen bir insanın elinden geçer. Arama motorlarının ölçütü içeriğin nasıl üretildiği değil, okuyana gerçekten yardımcı olup olmadığıdır.",
      },
    ],
    related: ["web-tasarim", "sosyal-medya", "otomasyon"],
  },
  {
    slug: "sosyal-medya",
    name: "Sosyal Medya",
    short: "Stratejiden Reels’e: tutarlı, tasarlanmış ve ölçülen bir sosyal medya varlığı.",
    tags: ["Instagram yönetimi", "İçerik üretimi", "Reels", "Marka dili"],
    metaTitle: "Sosyal Medya Yönetimi: Strateji ve İçerik",
    metaDescription:
      "Marka stratejisi, profesyonel görsel tasarım, Reels üretimi ve performans değerlendirmesiyle sosyal medya yönetimi. Tutarlı, planlı ve ölçülebilir içerik.",
    hero: {
      lines: ["Akışta durduran", "içerik."],
      lede: "Sosyal medyada sorun paylaşım yapmamak değil, fark edilmemek. Rastgele paylaşılan görseller yerine; kimin için, ne söylediği belli olan, tek bakışta sizin olduğu anlaşılan bir içerik sistemi kurarız.",
    },
    problem: {
      title: "Paylaşmak başka, var olmak başka.",
      body: [
        "Birçok işletmenin sosyal medyası aynı döngüdedir: aklına geldikçe paylaşım, her seferinde farklı bir görsel dil, sonuçsuz kalan emek. Takipçi sayısı artsa bile bunun işe ne kattığı belli değildir.",
        "Biz içeriği bir sistem olarak ele alırız: markanın ne söyleyeceği, hangi formatta söyleyeceği ve bunun nasıl ölçüleceği baştan tanımlanır. Böylece her paylaşım bir öncekinin üzerine koyar.",
      ],
    },
    outcomes: [
      {
        title: "Tanınan bir görsel dil",
        body: "Renk, tipografi ve kompozisyon kuralları olan bir şablon sistemi. Gönderi, kaydırılırken bile markanıza ait olduğunu belli eder.",
      },
      {
        title: "Planlı bir takvim",
        body: "İçerik sütunları ve aylık takvimle paylaşım, son dakika telaşından çıkar. Ne zaman, ne paylaşılacağı önceden bellidir.",
      },
      {
        title: "Hareketli içerik",
        body: "Reels ve kısa videolar için fikir, kurgu ve tasarım. Trend kovalamak yerine markanıza uyan formatlar geliştirilir.",
      },
      {
        title: "Sayılarla değerlendirme",
        body: "Erişim, etkileşim ve profilinizden gelen talepler düzenli olarak raporlanır; içerik planı bu veriye göre güncellenir.",
      },
    ],
    scope: {
      title: "Sosyal medya çalışması neleri kapsar?",
      intro: "Yalnızca gönderi tasarımı değil; strateji, üretim ve değerlendirme döngüsünün tamamı.",
      items: [
        { name: "Marka ve içerik stratejisi", desc: "Hedef kitle, ses tonu, içerik sütunları ve rakip analizi." },
        { name: "Görsel tasarım sistemi", desc: "Gönderi, hikâye ve kapak şablonları; tutarlı bir profil görünümü." },
        { name: "İçerik üretimi", desc: "Metin yazımı, görsel tasarım ve paylaşıma hazır içerikler." },
        { name: "Reels ve kısa video", desc: "Senaryo, kurgu, hareketli grafik ve altyazı." },
        { name: "Instagram yönetimi", desc: "Paylaşım planlama, profil düzeni ve öne çıkanların yönetimi." },
        { name: "Performans değerlendirmesi", desc: "Aylık rapor, öne çıkan içerikler ve bir sonraki dönem için öneriler." },
      ],
    },
    steps: [
      { name: "Strateji", desc: "Markanın sosyal medyada neyi, kime, hangi tonda anlatacağını belirleriz." },
      { name: "Sistem", desc: "Şablonlar, içerik sütunları ve takvim kurulur; profil görünümü yenilenir." },
      { name: "Üretim", desc: "İçerikler dönemlik olarak hazırlanır, onayınıza sunulur ve planlanır." },
      { name: "Değerlendirme", desc: "Sonuçlar raporlanır; neyin işe yaradığı görülür ve plan güncellenir." },
    ],
    faqs: [
      {
        q: "Takipçi artışı garantisi veriyor musunuz?",
        a: "Hayır. Takipçi sayısı tek başına iş sonucu değildir ve dürüstçe garanti edilemez. Odaklandığımız şey; doğru kitleye ulaşan, markanızı doğru anlatan ve talebe dönüşebilen tutarlı içeriktir.",
      },
      {
        q: "Çekim yapıyor musunuz?",
        a: "İçerik planına göre çekim ihtiyacını birlikte değerlendiririz. Elinizdeki görsellerle, tasarım ağırlıklı içeriklerle veya planlı çekimlerle ilerlemek mümkündür; kapsam proje başında netleştirilir.",
      },
      {
        q: "Hangi platformlarda çalışıyorsunuz?",
        a: "Odağımız Instagram’dır. Diğer platformlar, hedef kitlenizin gerçekten orada olup olmadığına göre değerlendirilir; her platformda var olmak yerine doğru yerde iyi olmak önceliğimizdir.",
      },
    ],
    related: ["web-tasarim", "seo", "yapay-zeka"],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export const processSteps = [
  {
    name: "Keşif",
    desc: "İşinizi, müşterinizi ve hedefinizi dinleriz. Varsayımla değil, sizin anlattıklarınızla başlarız.",
    output: "Proje özeti",
  },
  {
    name: "Strateji",
    desc: "Neyi, kimin için, hangi sırayla yapacağımızı netleştiririz. Kapsam, takvim ve başarı ölçütleri yazılı hâle gelir.",
    output: "Yol haritası",
  },
  {
    name: "Tasarım",
    desc: "Yapı, görsel dil ve etkileşim tasarlanır. Gerçek içerikle hazırlanan ekranları görür, yönü birlikte belirleriz.",
    output: "Tasarım sistemi",
  },
  {
    name: "Geliştirme",
    desc: "Tasarım, temiz ve sürdürülebilir koda dönüşür. Entegrasyonlar bağlanır, içerik yerleşir.",
    output: "Çalışan ürün",
  },
  {
    name: "Test",
    desc: "Farklı cihazlarda, tarayıcılarda ve gerçek kullanım senaryolarında denenir. Hız ve erişilebilirlik ölçülür.",
    output: "Kalite raporu",
  },
  {
    name: "Teslim",
    desc: "Yayına alınır, kullanım için gereken bilgi aktarılır. Sonrasında ölçüm, bakım ve geliştirme sürer.",
    output: "Yayın ve destek",
  },
] as const;
