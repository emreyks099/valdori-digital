/**
 * Dijital Skor — puanlama modeli.
 *
 * Bu bir teknik site denetimi DEĞİLDİR; kullanıcının kendi beyanına dayalı bir ön
 * değerlendirmedir. Model bilinçli olarak basit ve açıktır:
 *
 *  - 5 kategori, her kategoride 3 soru.
 *  - Her yanıt 0–3 puan değerindedir.
 *  - Kategori skoru  = (alınan puan / azami puan) × 100, tam sayıya yuvarlanır.
 *  - Genel skor      = kategori skorlarının ağırlıklı ortalaması (ağırlıklar toplamı 1).
 *  - Öneriler        = puan kaybı × kategori ağırlığına göre sıralanır; en yüksek etkili
 *                      olanlar önce gelir.
 *
 * Bu dosya saf fonksiyonlardan oluşur ve `node --test` ile test edilir (score.test.ts).
 */

export type CategoryId = "web" | "seo" | "social" | "communication" | "automation";

export type ServiceRef = "web-tasarim" | "seo" | "sosyal-medya" | "yapay-zeka" | "otomasyon" | "ozel-yazilim";

export type Option = { label: string; points: 0 | 1 | 2 | 3 };

export type Question = {
  id: string;
  category: CategoryId;
  text: string;
  options: Option[];
  /** Yanıt 0 veya 1 puansa gösterilecek öneri */
  advice: { title: string; body: string; service: ServiceRef };
};

export type Category = { id: CategoryId; name: string; weight: number; blurb: string };

export const MAX_POINTS = 3;

export const categories: Category[] = [
  { id: "web", name: "Web Sitesi", weight: 0.25, blurb: "Vitrininiz: tasarım, hız ve mobil deneyim." },
  { id: "seo", name: "SEO", weight: 0.2, blurb: "Arandığınızda bulunabilirliğiniz." },
  { id: "social", name: "Sosyal Medya", weight: 0.15, blurb: "İçeriğinizin tutarlılığı ve etkisi." },
  { id: "communication", name: "İletişim", weight: 0.2, blurb: "Talebin size ulaşma ve yanıtlanma hızı." },
  { id: "automation", name: "Otomasyon", weight: 0.2, blurb: "Tekrarlayan işlerin sisteme devri." },
];

export const questions: Question[] = [
  // ---- Web Sitesi ----
  {
    id: "web-1",
    category: "web",
    text: "İşletmenizin web sitesi ne durumda?",
    options: [
      { label: "Web sitemiz yok", points: 0 },
      { label: "Var ama yıllardır güncellenmedi", points: 1 },
      { label: "Güncel, hazır bir temayla kurulu", points: 2 },
      { label: "Markamıza özel tasarlandı ve güncel", points: 3 },
    ],
    advice: {
      title: "Markanıza özel, güncel bir web sitesi kurun",
      body: "Web sitesi, dijitaldeki diğer tüm çalışmaların vardığı yerdir. Güncel olmayan ya da hiç olmayan bir site, reklam ve sosyal medya emeğinin karşılığını almanızı zorlaştırır.",
      service: "web-tasarim",
    },
  },
  {
    id: "web-2",
    category: "web",
    text: "Siteniz telefonda nasıl çalışıyor?",
    options: [
      { label: "Bilmiyorum / sitemiz yok", points: 0 },
      { label: "Açılıyor ama kullanması zor", points: 1 },
      { label: "Kullanılabilir, yer yer sorunlu", points: 2 },
      { label: "Hızlı açılıyor ve rahat kullanılıyor", points: 3 },
    ],
    advice: {
      title: "Mobil deneyimi ve açılış hızını iyileştirin",
      body: "Ziyaretlerin büyük bölümü telefondan gelir. Geç açılan ya da parmakla kullanması zor bir site, ziyaretçiyi daha içeriği görmeden kaybeder.",
      service: "web-tasarim",
    },
  },
  {
    id: "web-3",
    category: "web",
    text: "Ziyaretçi sitenizde ne yapacağını net biçimde görüyor mu?",
    options: [
      { label: "Belirgin bir yönlendirme yok", points: 0 },
      { label: "İletişim bilgisi var ama arka planda", points: 1 },
      { label: "Bazı sayfalarda çağrı düğmeleri var", points: 2 },
      { label: "Her sayfada net bir sonraki adım var", points: 3 },
    ],
    advice: {
      title: "Her sayfaya net bir sonraki adım ekleyin",
      body: "Ziyaretçi ne yapacağını aramak zorunda kalmamalı. Her sayfanın tek bir hedefi ve o hedefe götüren görünür bir çağrısı olmalı.",
      service: "web-tasarim",
    },
  },
  // ---- SEO ----
  {
    id: "seo-1",
    category: "seo",
    text: "Müşterileriniz sunduğunuz hizmeti Google'da aradığında sizi buluyor mu?",
    options: [
      { label: "Hayır / hiç kontrol etmedim", points: 0 },
      { label: "Yalnızca marka adımızla aranınca", points: 1 },
      { label: "Bazı aramalarda çıkıyoruz", points: 2 },
      { label: "Hedeflediğimiz aramalarda üst sıralardayız", points: 3 },
    ],
    advice: {
      title: "Hizmetlerinizle ilgili aramalarda görünür olun",
      body: "Sizi adınızla arayan zaten tanıyordur. Asıl fırsat, ihtiyacını arayan ama sizi henüz tanımayan kişilerin karşısına çıkmaktır.",
      service: "seo",
    },
  },
  {
    id: "seo-2",
    category: "seo",
    text: "Sitenizde düzenli olarak içerik yayınlıyor musunuz?",
    options: [
      { label: "Hayır", points: 0 },
      { label: "Çok seyrek", points: 1 },
      { label: "Ara sıra, plansız", points: 2 },
      { label: "Planlı ve düzenli", points: 3 },
    ],
    advice: {
      title: "Müşterilerinizin sorularına yanıt veren içerikler yayınlayın",
      body: "Hizmet sayfaları ve blog yazıları, arama motorlarının sizi hangi konularla ilişkilendireceğini belirler. Planlı içerik, zamanla biriken bir görünürlük kazandırır.",
      service: "seo",
    },
  },
  {
    id: "seo-3",
    category: "seo",
    text: "Sitenizin arama performansını takip ediyor musunuz?",
    options: [
      { label: "Hayır", points: 0 },
      { label: "Araç kurulu ama bakmıyoruz", points: 1 },
      { label: "Ara sıra bakıyoruz", points: 2 },
      { label: "Düzenli izliyor ve buna göre aksiyon alıyoruz", points: 3 },
    ],
    advice: {
      title: "Arama performansını ölçmeye başlayın",
      body: "Ölçülmeyen şey iyileştirilemez. Hangi aramalardan ziyaret aldığınızı ve hangi sayfaların işe yaradığını düzenli olarak izlemek, sonraki adımı belirler.",
      service: "seo",
    },
  },
  // ---- Sosyal Medya ----
  {
    id: "social-1",
    category: "social",
    text: "Sosyal medyada ne sıklıkla paylaşım yapıyorsunuz?",
    options: [
      { label: "Hesabımız yok ya da aktif değil", points: 0 },
      { label: "Aklımıza geldikçe", points: 1 },
      { label: "Haftada bir-iki, plansız", points: 2 },
      { label: "Bir içerik takvimine göre düzenli", points: 3 },
    ],
    advice: {
      title: "Bir içerik takvimi oluşturun",
      body: "Düzensiz paylaşım, hem algoritmada hem takipçinin aklında yer edinmeyi zorlaştırır. Mütevazı ama düzenli bir takvim, yoğun ama kesintili paylaşımdan daha etkilidir.",
      service: "sosyal-medya",
    },
  },
  {
    id: "social-2",
    category: "social",
    text: "Paylaşımlarınız tek bakışta size ait olduğunu belli ediyor mu?",
    options: [
      { label: "Hayır, her paylaşım farklı görünüyor", points: 0 },
      { label: "Logomuz var, o kadar", points: 1 },
      { label: "Benzer renkler kullanıyoruz", points: 2 },
      { label: "Tutarlı bir tasarım sistemimiz var", points: 3 },
    ],
    advice: {
      title: "Tutarlı bir görsel dil kurun",
      body: "Akışta hızla kaydırılan onlarca gönderi arasında tanınmak için renk, tipografi ve kompozisyonda tutarlılık gerekir. Bir şablon sistemi bunu kolaylaştırır.",
      service: "sosyal-medya",
    },
  },
  {
    id: "social-3",
    category: "social",
    text: "Sosyal medyadan iş talebi geliyor mu?",
    options: [
      { label: "Hayır / bilmiyorum", points: 0 },
      { label: "Çok nadiren", points: 1 },
      { label: "Ara sıra", points: 2 },
      { label: "Düzenli olarak, takip de ediyoruz", points: 3 },
    ],
    advice: {
      title: "İçeriği talebe bağlayın",
      body: "Beğeni bir ara göstergedir. Profilinizde net bir yönlendirme, hizmetlerinizi anlatan içerikler ve gelen mesajların takibi, ilgiyi talebe çevirir.",
      service: "sosyal-medya",
    },
  },
  // ---- İletişim ----
  {
    id: "communication-1",
    category: "communication",
    text: "Bir müşteri adayı size ne kadar kolay ulaşıyor?",
    options: [
      { label: "Yalnızca telefonla", points: 0 },
      { label: "Telefon ve sosyal medya mesajı", points: 1 },
      { label: "Ek olarak sitede iletişim formu var", points: 2 },
      { label: "Form, mesajlaşma ve randevu gibi birden çok kanal", points: 3 },
    ],
    advice: {
      title: "Size ulaşmanın yollarını çoğaltın",
      body: "Herkes telefon açmak istemez. Kısa bir form, mesajlaşma bağlantısı ya da çevrim içi randevu; mesai dışında gelen ilgiyi de yakalar.",
      service: "web-tasarim",
    },
  },
  {
    id: "communication-2",
    category: "communication",
    text: "Gelen taleplere ne kadar sürede dönüyorsunuz?",
    options: [
      { label: "Değişken, bazen günler sürüyor", points: 0 },
      { label: "Genellikle ertesi gün", points: 1 },
      { label: "Aynı gün içinde", points: 2 },
      { label: "Dakikalar içinde ya da otomatik ilk yanıtla", points: 3 },
    ],
    advice: {
      title: "İlk yanıt süresini kısaltın",
      body: "Talep bırakan kişi çoğu zaman aynı anda birkaç yere başvurur. Otomatik bir ilk yanıt ya da sık soruları karşılayan bir asistan, siz dönene kadar ilgiyi canlı tutar.",
      service: "yapay-zeka",
    },
  },
  {
    id: "communication-3",
    category: "communication",
    text: "Müşteri adaylarının kaydını nerede tutuyorsunuz?",
    options: [
      { label: "Kayıt tutmuyoruz", points: 0 },
      { label: "Defter, telefon rehberi ya da mesaj geçmişi", points: 1 },
      { label: "Bir elektronik tablo", points: 2 },
      { label: "CRM ya da benzeri bir sistem", points: 3 },
    ],
    advice: {
      title: "Talepleri tek bir yerde kaydedin",
      body: "Dağınık kayıt, unutulan takip demektir. Basit bir CRM bile kimin ne zaman aradığını, hangi aşamada olduğunu ve kime dönülmesi gerektiğini görünür kılar.",
      service: "ozel-yazilim",
    },
  },
  // ---- Otomasyon ----
  {
    id: "automation-1",
    category: "automation",
    text: "Ekibiniz aynı bilgiyi birden fazla yere elle giriyor mu?",
    options: [
      { label: "Evet, sürekli", points: 0 },
      { label: "Sık sık", points: 1 },
      { label: "Nadiren", points: 2 },
      { label: "Hayır, sistemlerimiz birbirine bağlı", points: 3 },
    ],
    advice: {
      title: "Araçlarınızı birbirine bağlayın",
      body: "Aynı verinin iki kez girilmesi hem zaman kaybı hem hata kaynağıdır. Form, CRM, e-posta ve muhasebe araçları arasındaki veri akışı otomatikleştirilebilir.",
      service: "otomasyon",
    },
  },
  {
    id: "automation-2",
    category: "automation",
    text: "Hatırlatma, bilgilendirme ve takip mesajları nasıl gönderiliyor?",
    options: [
      { label: "Göndermiyoruz", points: 0 },
      { label: "Elle, hatırladıkça", points: 1 },
      { label: "Bir kısmı otomatik", points: 2 },
      { label: "Tamamı otomatik akışlarla", points: 3 },
    ],
    advice: {
      title: "Hatırlatma ve takip mesajlarını otomatikleştirin",
      body: "Randevu hatırlatması, teklif takibi, teşekkür mesajı… Kuralı belli olan bu iletişimler bir kez kurulduğunda kendiliğinden çalışır ve hiçbiri unutulmaz.",
      service: "otomasyon",
    },
  },
  {
    id: "automation-3",
    category: "automation",
    text: "İşinizde yapay zekâ araçlarından yararlanıyor musunuz?",
    options: [
      { label: "Hayır", points: 0 },
      { label: "Bireysel olarak, ara sıra", points: 1 },
      { label: "Belirli işlerde düzenli kullanıyoruz", points: 2 },
      { label: "İş akışlarımıza entegre", points: 3 },
    ],
    advice: {
      title: "Yapay zekâ için ilk kullanım alanınızı belirleyin",
      body: "Sık sorulan soruları yanıtlamak, belgeleri özetlemek, taslak hazırlamak… Küçük ve net bir senaryoyla başlamak, yapay zekânın işinize ne katacağını en hızlı gösteren yoldur.",
      service: "yapay-zeka",
    },
  },
];

export type Answers = Record<string, number>;

export type CategoryResult = {
  id: CategoryId;
  name: string;
  score: number;
  points: number;
  maxPoints: number;
};

export type Band = { id: "baslangic" | "gelisiyor" | "guclu" | "ileri"; label: string; summary: string };

export type Recommendation = {
  questionId: string;
  category: CategoryId;
  title: string;
  body: string;
  service: ServiceRef;
  impact: number;
};

export type ScoreResult = {
  overall: number;
  band: Band;
  categories: CategoryResult[];
  recommendations: Recommendation[];
};

export const bands: (Band & { min: number })[] = [
  {
    id: "ileri",
    min: 85,
    label: "İleri",
    summary:
      "Dijital altyapınız güçlü. Bundan sonrası ince ayar: ölçüm, optimizasyon ve yeni fırsat alanları.",
  },
  {
    id: "guclu",
    min: 65,
    label: "Güçlü",
    summary:
      "Sağlam bir temeliniz var. Birkaç alandaki boşluğu kapatmak, mevcut emeğinizin karşılığını belirgin biçimde artırabilir.",
  },
  {
    id: "gelisiyor",
    min: 40,
    label: "Gelişiyor",
    summary:
      "Temel taşlar yerinde ama aralarında boşluklar var. Önceliklendirilmiş birkaç adım hızlı fark yaratır.",
  },
  {
    id: "baslangic",
    min: 0,
    label: "Başlangıç",
    summary:
      "Dijitalde önünüzde geniş bir alan var. İyi haber: doğru sırayla atılan ilk adımların etkisi en yüksek olanlardır.",
  },
];

export function bandFor(score: number): Band {
  const b = bands.find((x) => score >= x.min) ?? bands[bands.length - 1];
  return { id: b.id, label: b.label, summary: b.summary };
}

export function isComplete(answers: Answers): boolean {
  return questions.every((q) => isValidAnswer(q, answers[q.id]));
}

function isValidAnswer(q: Question, optionIndex: unknown): optionIndex is number {
  return (
    typeof optionIndex === "number" &&
    Number.isInteger(optionIndex) &&
    optionIndex >= 0 &&
    optionIndex < q.options.length
  );
}

/**
 * Yanıtlardan skoru hesaplar. `answers`: soru kimliği → seçilen seçeneğin sırası.
 * Eksik ya da geçersiz yanıt varsa hata fırlatır; yarım veriden skor üretilmez.
 */
export function computeScore(answers: Answers): ScoreResult {
  const cats: CategoryResult[] = categories.map((c) => {
    const qs = questions.filter((q) => q.category === c.id);
    let points = 0;
    for (const q of qs) {
      const idx = answers[q.id];
      if (!isValidAnswer(q, idx)) {
        throw new Error(`Eksik ya da geçersiz yanıt: ${q.id}`);
      }
      points += q.options[idx].points;
    }
    const maxPoints = qs.length * MAX_POINTS;
    return {
      id: c.id,
      name: c.name,
      points,
      maxPoints,
      score: Math.round((points / maxPoints) * 100),
    };
  });

  const overall = Math.round(
    cats.reduce((sum, c) => {
      const weight = categories.find((x) => x.id === c.id)!.weight;
      return sum + (c.points / c.maxPoints) * 100 * weight;
    }, 0),
  );

  const recommendations: Recommendation[] = questions
    .map((q) => {
      const pts = q.options[answers[q.id]].points;
      const weight = categories.find((c) => c.id === q.category)!.weight;
      return { q, pts, impact: (MAX_POINTS - pts) * weight };
    })
    .filter((x) => x.pts <= 1)
    .sort((a, b) => b.impact - a.impact || questions.indexOf(a.q) - questions.indexOf(b.q))
    .map(({ q, impact }) => ({
      questionId: q.id,
      category: q.category,
      title: q.advice.title,
      body: q.advice.body,
      service: q.advice.service,
      impact: Math.round(impact * 100) / 100,
    }));

  return { overall, band: bandFor(overall), categories: cats, recommendations };
}

/** Yanıtları paylaşılabilir kısa bir dizgeye çevirir: her soru için tek rakam. */
export function encodeAnswers(answers: Answers): string {
  return questions.map((q) => String(answers[q.id])).join("");
}

export function decodeAnswers(code: string): Answers | null {
  if (!/^[0-3]+$/.test(code) || code.length !== questions.length) return null;
  const answers: Answers = {};
  questions.forEach((q, i) => {
    answers[q.id] = Number(code[i]);
  });
  return isComplete(answers) ? answers : null;
}
