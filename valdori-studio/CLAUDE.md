# Valdori Studio — kalıcı geliştirme kuralları

@AGENTS.md

Bu dosya, projede çalışan her oturumun (insan ya da yapay zekâ) uyması gereken kuralları tutar.
Bağlam kaybolduğunda sırayla şunlar okunur: `TASKS.md` → `PROJECT_PLAN.md` → `DESIGN_SYSTEM.md` → `ARCHITECTURE.md`.

## Değişmez kurallar

1. **Uydurma yok.** Müşteri, referans, istatistik, ekip üyesi, ofis, telefon, e-posta, adres uydurulmaz.
   Doğrulanmış marka verisi yalnızca `src/lib/site.ts` içindedir.
2. **Konsept işler etiketlidir.** `projects.ts` içindeki `kind: "konsept"` kayıtları arayüzde her yerde
   “Konsept” olarak görünür. Gerçek iş eklenirken `kind: "musteri"` kullanılır.
3. **Sahte başarı yok.** Bir entegrasyon yapılandırılmamışsa arayüz bunu söyler (bkz. iletişim formu).
4. **Next.js 16.** Kod yazmadan önce `node_modules/next/dist/docs/` altındaki ilgili rehber okunur.
   `cacheComponents` açıktır: sunucu bileşenlerinde `new Date()`, `Math.random()`, `cookies()` gibi
   istek-zamanı değerleri `Suspense` dışında kullanılmaz. `loading.tsx` EKLENMEZ (statik HTML'i gizli
   bir akış sınırının içine alır; JS'siz içerik kaybolur — QA'da yakalandı).
5. **Hareketin dinlenme durumu görünürdür.** Animasyonlar `gsap.from` ile kurulur; JS çalışmazsa içerik
   okunur. Gizlemek için `visibility` değil `opacity` kullanılır (klavye odağı kaybolmasın).
   Her animasyon `gsap.matchMedia` ile `prefers-reduced-motion` dalına sahiptir.
6. **Türkçe tipografi.** Maskeli satırlarda İ/Ö/Ü noktaları kırpılmamalı (`.line-mask`,
   `.split-line-mask` dolgu değerleri bunun içindir). `<html lang="tr">` büyük harf dönüşümü için şarttır.
7. **Turuncu ışıktır, dolgu değildir.** `ember` yalnızca vurgu, etkin durum ve ışık efektinde kullanılır.
8. **Kart ızgarası yok.** Yeni bölümler `DESIGN_SYSTEM.md`deki kompozisyon ilkelerine göre tasarlanır.
9. **Gizli anahtarlar** yalnızca ortam değişkenindedir; `NEXT_PUBLIC_` önekiyle gizli veri açılmaz.

## Komutlar

```bash
npm run dev         # geliştirme sunucusu
npm run check       # lint + typecheck + birim testleri + production build
npm test            # Dijital Skor modeli testleri (node --test)
npm run qa:routes   # tüm rotalar × 6 genişlik (çalışan sunucu gerekir: npm run start)
npm run qa:e2e      # etkileşim testleri (çalışan sunucu + playwright gerekir)
```

Bir iş, `npm run check` geçmeden ve ilgili sayfanın ekran görüntüsüne bakılmadan “tamamlandı” sayılmaz.

## Yeni içerik ekleme

- **Blog yazısı:** `src/content/blog/<slug>.md` (frontmatter şeması `src/lib/blog.ts`). Gövdede H1 yok.
- **Hizmet:** `src/lib/services.ts` + `src/app/hizmetler/<slug>/page.tsx` + bir imza bileşeni + glif.
- **Proje:** `src/lib/projects.ts` + `ConceptCover` içinde bir kapak.
