# Görevler

## Tamamlanan
- [x] Ortam denetimi, beceri kurulumu (`.claude/skills`), MCP tanımları (`.mcp.json`)
- [x] Yaratıcı yön seçimi ve tasarım sistemi (Obsidyen & Kor)
- [x] Next.js 16 projesi, fontlar, global stiller, güvenlik başlıkları (CSP dahil)
- [x] Header (kaydırmada gizlenen), erişilebilir mobil menü, footer
- [x] Ana sayfa: WebGL hero + SVG yedeği, manifesto, hizmet evreni, tasarım↔mühendislik taraması,
      yatay süreç, konsept çalışmalar, skor önizleme, kinetik kapanış
- [x] Hizmetler dizini + 6 hizmet sayfası (her biri kendi etkileşimli imza bölümüyle)
- [x] Projeler dizini + detay altyapısı (4 konsept, kodda kurulmuş kapaklar)
- [x] Hakkımızda
- [x] Dijital Skor: model, 10 birim testi, arayüz, paylaşılabilir sonuç bağlantısı
- [x] İletişim: zod doğrulama, bal küpü, süre tuzağı, köken denetimi, hız sınırı, Resend entegrasyonu
- [x] Blog: Markdown içerik katmanı, liste, kategori, detay (içindekiler), 6 yazı
- [x] Yasal sayfa taslakları (noindex, doğrulanacak alanlar işaretli)
- [x] SEO: metadata, canonical, Open Graph görseli, JSON-LD, sitemap, robots, manifest, ikonlar
- [x] 404, hata ve global hata sayfaları
- [x] Sayfa geçişleri (React ViewTransition), reduced-motion dalları
- [x] QA: lint, typecheck, build, 192 rota kontrolü, 45 etkileşim testi, Lighthouse, 3 görsel döngü

## Kullanıcı girdisi bekleyen (yayın öncesi)
- [ ] **E-posta servisi:** Resend hesabı + alan adı doğrulaması + 3 ortam değişkeni (`.env.example`).
      Tanımlanana kadar form mesaj göndermez ve bunu ziyaretçiye söyler.
- [ ] **Yasal metinler:** `/gizlilik` ve `/cerez-politikasi` içindeki turuncu “Doğrulanacak” alanları
      (unvan, adres, saklama süresi, hukuki sebep…) + hukuk danışmanı onayı; sonra `noindex` kaldırılır.
- [ ] **Resmî logo:** `src/components/ui/Wordmark.tsx` ve `src/app/icon.svg` geçici işaret kullanıyor.
- [ ] **Yayın onayı:** Netlify sitesi oluşturma ve `valdoridigital.net` DNS yönlendirmesi.
- [ ] **İletişim bilgisi:** Doğrulanmış e-posta/telefon/WhatsApp varsa `src/lib/site.ts`e eklenir.
- [ ] **Çalışma bölgesi cümlesi:** `/iletisim`deki “Türkiye genelinde ve uluslararası projelerde uzaktan
      çalışıyoruz.” ifadesi brief'teki pazar tanımından türetildi; teyit edilmeli.

## Sonraki iyileştirmeler (öneri)
- [ ] Gerçek GPU'lu cihazlarda hero sahnesinin kare hızı ve Lighthouse ölçümü (bu ortamda GPU yok)
- [ ] Safari / Firefox / gerçek iOS-Android cihaz testi (yalnızca Chromium ile test edildi)
- [ ] Gerçek müşteri projeleri geldikçe `kind: "musteri"` kayıtları ve fotoğraf/video varlıkları
- [ ] Blog yazılarına kapak görseli ve yazar alanı
- [ ] Gizlilik dostu analitik (ör. Plausible) + çerez politikası güncellemesi
- [ ] Paylaşımlı hız sınırlama deposu (çok örnekli sunucusuz ortam için)
- [ ] Cloudflare Turnstile gibi görünmez bir bot doğrulaması (spam artarsa)
- [ ] İngilizce sürüm (uluslararası hedef için `/en`)
