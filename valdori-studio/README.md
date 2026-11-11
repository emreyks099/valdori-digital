# Valdori Studio

Valdori Digital Studio web sitesi — Next.js 16, TypeScript, Tailwind CSS v4, GSAP, Three.js.

## Gereksinimler

- Node.js **22.18+** (birim testleri Node'un yerleşik TypeScript desteğini kullanır)
- npm 10+

## Kurulum ve çalıştırma

```bash
npm install
cp .env.example .env.local   # isteğe bağlı: iletişim formu için (aşağıya bakın)
npm run dev                  # http://localhost:3000
```

```bash
npm run build && npm run start   # production
npm run check                    # lint + typecheck + birim testleri + build
```

## Ortam değişkenleri

| Değişken | Zorunlu | Açıklama |
|---|---|---|
| `RESEND_API_KEY` | Form için | [Resend](https://resend.com) API anahtarı (gizli) |
| `CONTACT_TO_EMAIL` | Form için | Mesajların gideceği adres |
| `CONTACT_FROM_EMAIL` | Form için | Resend'de doğrulanmış alan adından gönderen adres |

Üçü de tanımlı değilse site çalışır; iletişim formu ise mesaj **göndermez** ve ziyaretçiye bunu açıkça söyler
(sayfada uyarı + API `503 not_configured`). Sahte başarı mesajı gösterilmez.

## QA betikleri

Çalışan bir production sunucusu (`npm run start`) ve Playwright gerekir (`npm i -D playwright && npx playwright install chromium`).

```bash
npm run qa:routes    # 32 rota × 6 genişlik → qa/routes-report.json
npm run qa:e2e       # 45 etkileşim testi  → qa/e2e-report.json
node scripts/shot.mjs /hizmetler/seo seo 390 844      # tek ekran görüntüsü → qa/shots/
node scripts/elshot.mjs / "footer" footer 1440 900    # bir öğenin görüntüsü
```

## İçerik güncelleme

- **Blog yazısı:** `src/content/blog/<slug>.md` dosyası ekleyin (frontmatter: `title`, `description`, `category`, `date`,
  `readingMinutes`, `excerpt`). Liste, kategori sayfası, sitemap ve yapılandırılmış veri kendiliğinden güncellenir.
- **Hizmet metinleri:** `src/lib/services.ts` · **Projeler:** `src/lib/projects.ts` · **Marka bilgisi:** `src/lib/site.ts`
- **Skor soruları ve ağırlıklar:** `src/lib/score.ts` (değişiklikten sonra `npm test`)

## Yayınlama

> Bu depo henüz hiçbir yere yayınlanmadı. Alan adı ve canlı ortam değişiklikleri kurucu onayı gerektirir.

### Netlify (önerilen — `netlify.toml` hazır)

1. Netlify'da “Add new site → Import from Git” ile bu depoyu seçin. Depo kökündeki `netlify.toml`, derleme klasörünü
   (`valdori-studio`), komutu ve Node sürümünü tanımlar; Next.js çalışma zamanı otomatik algılanır.
2. Site ayarlarında üç ortam değişkenini tanımlayın.
3. Önce Netlify'ın verdiği geçici adreste kontrol edin: iletişim formundan gerçek bir mesaj gönderin, PageSpeed Insights çalıştırın.
4. Onaydan sonra `valdoridigital.net` alan adını bağlayın (DNS + otomatik TLS).

### Alternatifler

- **Vercel:** “Root Directory” = `valdori-studio`; başka ayar gerekmez.
- **Kendi sunucunuz:** `npm run build && npm run start` (Node 22), önüne TLS sonlandıran bir ters vekil.

Statik dışa aktarım (`output: "export"`) **kullanılamaz**: iletişim formu bir sunucu ucuna ihtiyaç duyar.

### Yayın öncesi kontrol listesi

- [ ] Üç ortam değişkeni tanımlı, formdan gerçek mesaj alındı
- [ ] `/gizlilik` ve `/cerez-politikasi` içindeki “Doğrulanacak” alanlar dolduruldu, hukuk onayı alındı, `noindex` kaldırıldı
- [ ] Resmî logo geldiyse `Wordmark.tsx` ve `icon.svg` güncellendi
- [ ] Yayın adresinde PageSpeed Insights ve Rich Results Test çalıştırıldı
- [ ] Google Search Console'a `sitemap.xml` gönderildi
- [ ] Safari ve gerçek mobil cihazda gözle kontrol edildi

## Belgeler

`CLAUDE.md` (kurallar) · `PROJECT_PLAN.md` · `DESIGN_SYSTEM.md` · `ARCHITECTURE.md` · `TASKS.md` · `SETUP_REPORT.md` · `QA_REPORT.md`

## Lisanslar

Yazı tipleri (Archivo, Bodoni Moda, Geist Mono) SIL Open Font License 1.1 ile lisanslıdır. Sitede stok fotoğraf ya da
üçüncü taraf görsel yoktur; tüm görseller (WebGL sahnesi, SVG glifler, konsept kapakları) bu depoda kodla üretilmiştir.
