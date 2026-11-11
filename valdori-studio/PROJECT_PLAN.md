# Proje planı

**Hedef:** Valdori Digital Studio için sıfırdan, sinematik, çok sayfalı, çalışan bir web sitesi.
**Durum (11 Kasım 2026):** 10 aşamanın tamamı uygulandı; yayın öncesi kullanıcı girdisi bekleyen kalemler `TASKS.md`de.

| # | Aşama | Durum | Çıktı |
|---|---|---|---|
| 1 | Ortam ve beceriler | Tamam (3 araç ağ politikasıyla engelli) | `SETUP_REPORT.md` |
| 2 | Yaratıcı araştırma | Tamam | `DESIGN_SYSTEM.md` §1 |
| 3 | Tasarım sistemi | Tamam | `DESIGN_SYSTEM.md`, `src/app/globals.css` |
| 4 | Teknik temel | Tamam | `ARCHITECTURE.md` |
| 5 | Sinematik ana sayfa | Tamam | 8 bölüm + footer |
| 6 | Tüm sayfalar | Tamam | 32 rota |
| 7 | İşlevsel sistemler | Tamam | Dijital Skor, iletişim API, blog, proje detay |
| 8 | Hareket ve cila | Tamam (3 QA döngüsü) | `QA_REPORT.md` §5 |
| 9 | Kalite güvence | Tamam | `QA_REPORT.md` |
| 10 | Yayına hazırlık | Tamam — **yayın yapılmadı** (onay gerekir) | `README.md` |

## Sayfa haritası

```
/                              Ana sayfa (hero, manifesto, hizmet evreni, tasarım↔mühendislik,
                               süreç, konsept çalışmalar, skor önizleme, kapanış)
/hizmetler                     Vitrin / Makine dairesi ayrımıyla 6 hizmet
/hizmetler/web-tasarim         İmza: genişliği değişen duyarlı çerçeve
/hizmetler/yapay-zeka          İmza: 3 senaryolu konuşma gösterimi + “arka planda”
/hizmetler/otomasyon           İmza: 6 adımlı talep akışı, elle ↔ otomatik
/hizmetler/ozel-yazilim        İmza: modül aç/kapa ile büyüyen sistem panosu
/hizmetler/seo                 İmza: arama sonucunun anatomisi (3 katman)
/hizmetler/sosyal-medya        İmza: 9 karelik şablon sistemi + içerik sütunları
/projeler, /projeler/[slug]    4 konsept çalışma (kurgusal markalar, etiketli)
/hakkimizda                    Vizyon, tasarım/teknoloji yaklaşımı, 5 ilke, kurucu
/dijital-skor                  15 soruluk çalışan değerlendirme
/iletisim                      Form + sunucu tarafı işleme
/blog, /blog/[slug], /blog/kategori/[kategori]   6 yazı, 6 kategori
/gizlilik, /cerez-politikasi   Taslak (noindex), doğrulanacak alanlar işaretli
/sitemap.xml /robots.txt /manifest.webmanifest /opengraph-image /icon.svg /apple-icon
```
