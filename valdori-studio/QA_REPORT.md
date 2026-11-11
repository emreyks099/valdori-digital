# Kalite güvence raporu

Tarih: 11 Kasım 2026 · Ölçümler production build (`next build` + `next start`) üzerinde, Chromium (Playwright) ile yapıldı.

> **Ortam sınırı:** Test ortamında GPU yok. WebGL yalnızca yazılımsal (SwiftShader) çalışıyor; site bu durumu algılayıp
> hero sahnesini kurmuyor ve statik SVG kompozisyonu gösteriyor. Dolayısıyla aşağıdaki Lighthouse ve kare hızı sayıları
> **yedek yol** içindir. Hero sahnesinin görsel doğruluğu `?gl=1` ile zorlanarak ekran görüntüsünden denetlendi;
> gerçek GPU'da kare hızı **ölçülmedi**.

## 1. Teknik kontroller

| Kontrol | Sonuç |
|---|---|
| Bağımlılık kurulumu (`npm install`) | Başarılı · `npm audit --omit=dev`: 0 açık |
| ESLint (`npm run lint`) | 0 hata, 0 uyarı |
| TypeScript (`next typegen && tsc --noEmit`) | 0 hata |
| Birim testleri (`npm test`) | **10 / 10** — Dijital Skor modeli (yapı, 0/100 sınırları, ağırlıklı ortalama, yuvarlama, öneri sıralaması, monotonluk, geçersiz girdi, bant sınırları, kodlama gidiş-dönüşü) |
| Production build | Başarılı · 32 rota statik üretildi, 1 dinamik uç (`/api/contact`) |
| Sunucu HTML'i | Tüm içerik ilk HTML'de (akış sınırı / gizli şablon yok) |

## 2. Rota taraması — `npm run qa:routes`

32 rota × 6 genişlik (360, 390, 768, 1024, 1440, 1920) = **192 kontrol, 0 hata.**

Her kontrolde: HTTP durumu, konsol/sayfa hatası, yatay taşma, tek ve görünür `<h1>`, başlık ≤ 70 karakter, açıklama 70–200
karakter, canonical varlığı, `alt`'sız görsel. Ayrıca 31 benzersiz iç bağlantının tamamı 200 döndü (**kırık bağlantı yok**);
var olmayan adres 404 sayfasını 404 koduyla döndürüyor.

## 3. Etkileşim testleri — `npm run qa:e2e`

**45 / 45 geçti.**

- **Mobil menü (9):** düğme ≥ 44px, açılır/kapanır, `aria-expanded`, kaydırma kilidi, Esc, gezinme sonrası kapanma
- **Gezinme ve klavye (5):** hero CTA'ları, proje detayına geçiş, “İçeriğe geç” ilk odak, görünür odak halkası
- **Dijital Skor (10):** 15 soru yanıtlanır; arayüzdeki genel skor, bant ve 5 kategori skoru modelin çıktısıyla **birebir aynı**;
  öneri sırası doğru; sonuç URL'de taşınır ve yeni sekmede aynı sonucu açar; bozuk bağlantı reddedilir; **hiçbir yanıt sunucuya gönderilmez**
- **İletişim formu (6):** boş gönderimde alan hataları ve ilk hataya odak; geçersiz e-posta; e-posta servisi yokken API 503 ve
  **dürüst hata mesajı** (sahte başarı yok); yazılanlar korunur
- **API güvenliği (11):** geçersiz veri 400, onaysız 400, aşırı uzun 400, bozuk JSON 400, büyük gövde 413, yanlış içerik türü 415,
  farklı köken 403, bal küpü ve hızlı gönderim sessizce yutulur, GET 405, **6. istekte 429**
- **Azaltılmış hareket (3):** yumuşak kaydırma kapalı, sabitleme yok, gizli kalan içerik yok
- **JS kapalı (1):** ana içerik okunur

**Test edilemeyen:** Gerçek e-posta gönderimi (Resend anahtarı yok). Başarı yolu kod incelemesiyle doğrulandı, uçtan uca denenmedi.

## 4. Lighthouse 13.6 (mobil emülasyon, yavaşlatılmış 4G)

| Sayfa | Performans | Erişilebilirlik | En iyi uygulamalar | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|
| `/` | 96 | 96 | 100 | 100 | 0,9 sn | 0 | 230 ms |
| `/hizmetler/web-tasarim` | 95 | 100 | 100 | 100 | 0,9 sn | 0 | 270 ms |
| `/dijital-skor` | 100 | 100 | 100 | 100 | 0,9 sn | 0 | 80 ms |
| `/blog/core-web-vitals-rehberi` | 100 | 100 | 100 | 100 | 0,9 sn | 0 | 70 ms |
| `/iletisim` | 100 | 100 | 100 | 100 | 0,9 sn | 0 | 80 ms |

Ham çıktılar: `qa/lighthouse/*.json`. Hedefler (90+ / 95+ / 95+) bu ortamda karşılandı; yerel sunucu ölçümü olduğu için ağ
gecikmesi gerçek barındırmadan düşüktür. **Yayın sonrası PageSpeed Insights ile yeniden ölçülmelidir.**

Ana sayfadaki tek erişilebilirlik uyarısı: manifesto sözcükleri kaydırmayla aydınlanırken (opaklık 0,3 → 1) geçiş anındaki
kontrast. Metin kaydırma tamamlandığında tam kontrasta ulaşır; azaltılmış harekette baştan tam kontrasttadır. Bilinçli bırakıldı.

## 5. Görsel kalite — üç döngü

Soru: *“Bu, premium bir yaratıcı stüdyonun işi gibi mi, yoksa standart AI çıktısı gibi mi görünüyor?”*

**Döngü 1 — Görsel denetim**
- Büyük harfli başlıklarda Ö/Ü/İ noktaları satır maskesinde kırpılıyordu → maske dolgusu (CSS ve SplitText maskeleri için ayrı ayrı).
- Hero'da bloklar görünmüyor, yalnızca çizgi görünüyordu → malzeme ve ışık yeniden kuruldu.
- Hero'da iki aşırı parlak ışık lekesi (“iki güneş”) → clearcoat kaldırıldı, ışıklar geri çekildi, şiddet yarıya indi.
- Hero'da turuncu ekranı kaplıyordu → şiddet bir kez daha düşürüldü (turuncu “ışık” kalmalı, dolgu olmamalı).
- Konsept kapakları ölçeklemeyle kırpılıyor, “Konsept” etiketi başlığın üstüne biniyordu → ölçek kaldırıldı, etiket kapağın dışına alındı.
- Footer'daki dev sözcük mobilde sağdan taşıyordu → boyut düşürüldü.

**Döngü 2 — Etkileşim denetimi**
- Hizmet evreninde etkin ad iki satıra kırılıp düzeni zıplatıyordu → boyut ve `nowrap` ayarı; edilgen adların kontrastı artırıldı.
- Kaydırmayla beliren içerik `visibility: hidden` olduğu için **Tab ile erişilemiyordu** → `opacity`'ye çevrildi.
- `loading.tsx` statik HTML'i gizli bir akış sınırına alıyor, **JS'siz içerik görünmüyordu** → dosya kaldırıldı.
- SplitText, `<p>` üzerine geçersiz `aria-label` ekliyordu → `aria: "none"`.
- Yazılımsal WebGL ana iş parçacığını kilitliyordu (TBT 13 sn) → yazılımsal renderer algılama + uyarlanabilir kalite.
- zod'un `new Function` denemesi CSP ihlali üretiyordu → `jitless`.

**Döngü 3 — Son kalite kontrolü (jenerik görünen yerler)**
- Tasarım↔mühendislik çerçevesinde mobilde notlar üst üste biniyordu → dar ekranda ikincil notlar gizlendi.
- SEO başlıkları 70 karakteri aşıyordu → şablon ve başlıklar kısaltıldı.
- MotionSites cetveliyle öz değerlendirme (1–10): ilk bakış 8 · imza 8 · tipografi 9 · kompozisyon 8 · renk/ışık 8 ·
  medya entegrasyonu 7 · hareket 8 · mobil 8 · metin 8 · cila 8 → **ortalama 8,0, 7'nin altı yok.**
  En zayıf alan medya: fotoğraf/video yok, tüm görseller kodda üretildi. Gerçek proje görselleri geldiğinde en çok yükselecek alan burası.

## 6. Bilinen sınırlar ve açık kalemler

- Yalnızca **Chromium** ile test edildi. Safari, Firefox ve gerçek iOS/Android cihazlarda denenmedi. `font-stretch` geçişi ve
  View Transitions desteklenmeyen tarayıcılarda animasyonsuz çalışır (işlev kaybı yok).
- Hero WebGL sahnesi gerçek GPU'da ölçülmedi (bkz. üstteki not).
- E-posta gönderimi uçtan uca denenmedi (anahtar yok).
- Hız sınırlayıcı bellek içidir; çok örnekli sunucusuz ortamda örnek başına sayar.
- Yasal sayfalar taslaktır ve `noindex`tir.
- Ekran okuyucuyla (NVDA/VoiceOver) elle test yapılmadı; denetim Lighthouse/axe kuralları ve klavye testleriyle sınırlıdır.
