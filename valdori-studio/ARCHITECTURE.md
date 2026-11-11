# Teknik mimari

## Yığın ve gerekçe

| Katman | Seçim | Neden |
|---|---|---|
| Çatı | Next.js 16.4 (App Router, `cacheComponents`, Turbopack) | Tüm sayfalar statik üretilir; tek dinamik uç `/api/contact` |
| Dil | TypeScript (strict) | Tip güvenli rota parametreleri (`PageProps<"/blog/[slug]">`) |
| Stil | Tailwind CSS v4 (`@theme` + `@utility`) | Tokenlar tek dosyada; tipografi sınıfları özel utility |
| Hareket | GSAP 3.15 (ScrollTrigger, SplitText) + Lenis | Kaydırma koreografisi; Lenis yalnız ince işaretçide |
| 3D | three.js (ham; R3F/Drei **yok**) | Tek sahne için React sarmalayıcı gereksiz; paket küçük, kontrol tam |
| Doğrulama | zod 4 (`jitless`) | İstemci ve sunucuda aynı şema; CSP ile uyumlu |
| İçerik | Markdown + gray-matter + marked | Blog yazısı = dosya; CMS bağımlılığı yok |

Bilinçli olarak eklenmeyenler: UI kiti, durum yöneticisi, CSS-in-JS, R3F/Drei, post-processing, analitik, MDX.

## Dizin yapısı

```
src/
  app/                      Rotalar (her klasör bir sayfa) + sitemap/robots/manifest/ikon/OG
    api/contact/route.ts    Tek sunucu ucu
  components/
    layout/                 Header (mobil menü dahil), Footer, SmoothScroll
    motion/                 Reveal (SplitLines, Fade, ScrubWords, DrawLine, Parallax), Magnetic
    ui/                     Button, PageHero, Faq, JsonLd, Wordmark, TurkeyClock, LegalPage
    home/                   Ana sayfa bölümleri + heroScene.ts (three.js)
    services/               ServicePage iskeleti, ServiceStage, glifler, 6 imza bileşeni
    work/ blog/ score/ contact/
  content/blog/*.md         Blog yazıları
  lib/
    site.ts                 Doğrulanmış marka verisi (tek kaynak)
    services.ts projects.ts İçerik verisi (tipli)
    score.ts (+ .test.ts)   Dijital Skor modeli — saf fonksiyonlar
    contact.ts              zod şeması (istemci + sunucu)
    rate-limit.ts           Bellek içi hız sınırlayıcı
    blog.ts seo.ts gsap.ts
scripts/                    QA betikleri (Playwright)
qa/                         QA raporları (JSON) ve Lighthouse çıktıları
```

## Sunucu / istemci sınırı

Sayfalar ve iskelet sunucu bileşenidir. `"use client"` yalnızca etkileşim ya da tarayıcı API'si gereken yaprak
bileşenlerde: Header, SmoothScroll, motion/*, HeroCanvas, ServiceUniverse, CraftSplit, Process, ScorePreview,
FinalCta, imza bileşenleri, ScoreQuiz, ContactForm, TurkeyClock, error sayfaları.

`three` yalnızca `HeroCanvas` içinden `import()` ile, tarayıcı boşta kaldığında yüklenir; ilk yük paketinde yoktur.

## Hero sahnesi dayanıklılığı (`components/home/heroScene.ts`)

1. Altında her zaman statik SVG kompozisyon vardır (LCP bunu boyar; WebGL yoksa o kalır).
2. Donanım hızlandırması yoksa ya da renderer yazılımsalsa (SwiftShader/llvmpipe) sahne **kurulmaz**.
3. Kare süresi > 42 ms ise çözünürlük kademeli düşer; > 75 ms'de döngü durur, tek kare kalır.
4. Görünüm dışında ve sekme gizliyken döngü durur. `prefers-reduced-motion`: tek kare.
5. `?gl=1` yalnızca test içindir (GPU'suz ortamda sahneyi zorlar).

## `cacheComponents` ve Activity ile ilgili notlar

- Önceki rota bellekte gizli tutulur: DOM sorguları bileşen `ref`'ine göre kapsamlanır; menü durumu `pathname`
  değişiminde render sırasında sıfırlanır; tüm effect'ler temizlenir (`useGSAP` scope + `matchMedia`).
- `loading.tsx` yoktur (bkz. CLAUDE.md kural 4). Dinamik rotalar `generateStaticParams` ile statik üretilir.
- Footer'da yıl yoktur ve saat istemcide hesaplanır (sunucuda `new Date()` kullanılmaz).

## İletişim akışı (`/api/contact`)

```
istemci: zod doğrulama → POST JSON
sunucu : köken denetimi → içerik türü → hız sınırı (IP başına 10 dk'da 5) → gövde ≤ 12 KB
         → bal küpü / süre tuzağı (sessizce 200) → zod → ortam değişkeni yoksa 503 not_configured
         → Resend API (10 sn zaman aşımı) → 200 | 502
```

- Yanıtlar `Cache-Control: no-store`. E-posta gövdesinde kullanıcı girdisi HTML-kaçışlıdır; konu satırından satır sonu ayıklanır.
- Kişisel veri günlüğe yazılmaz (yalnızca durum kodu / hata adı).
- Bilinen sınır: hız sınırlayıcı bellek içidir; sunucusuz ortamda örnek başınadır.

## Güvenlik başlıkları (`next.config.ts`)

CSP (`default-src 'self'`, `frame-ancestors 'none'`, `object-src 'none'`, `form-action 'self'`), `X-Content-Type-Options`,
`X-Frame-Options: DENY`, `Referrer-Policy`, `Permissions-Policy`, HSTS. `script-src`/`style-src` içinde `'unsafe-inline'`
bilinçli bir ödünleşimdir: nonce tabanlı CSP tüm sayfaları dinamik render'a zorlar. Üçüncü taraf betik yoktur.

## SEO

`lib/seo.ts → pageMeta()` her sayfa için başlık, açıklama, canonical, Open Graph ve Twitter alanlarını üretir.
JSON-LD: Organization + WebSite (layout), Service + FAQPage (hizmetler), BlogPosting (yazılar), BreadcrumbList (tümü),
ItemList (hizmet dizini). Yasal taslaklar ve boş kategoriler `noindex`. Sitemap yazı tarihlerini `lastModified` olarak kullanır.
