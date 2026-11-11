# Tasarım sistemi — OBSİDYEN & KOR

Kaynak: `src/app/globals.css` (`@theme` tokenları ve `@utility` sınıfları). Bu belge kararların gerekçesini tutar.

## 1. Yaratıcı araştırma ve yön seçimi

Kullanılan kaynaklar: `frontend-design` (iki geçişli plan + “AI varsayılanları” listesi), `motionsites-web-builder`
(craft.md zevk kuralları, review.md puanlama cetveli, teknik dizini), `ui-ux-pro-max` (stil/tipografi/renk araması),
Vercel `web-design-guidelines`. 21st.dev ve MotionSites MCP'ye erişilemedi (bkz. `SETUP_REPORT.md`); bu kaynaklardan
bileşen ya da premium içerik **kullanılmadı**.

Değerlendirilen üç yön:

| Yön | Fikir | Karar |
|---|---|---|
| **A. Obsidyen & Kor** | Mat siyah mimari bloklar; formu ortaya çıkaran sıcak ışık; dar/geniş grotesk + didone italik | **Seçildi** |
| B. Kâğıt & Köz | Kırık beyaz editoryal sayfa, siyah mürekkep, turuncu damga | Elendi: “krem zemin + serif + kiremit vurgu” en yaygın AI varsayılanı; sinematik değil |
| C. Sinyal / Mavi kopya | Teknik çizim ızgarası, mono tipografi, tel kafes 3D | Elendi: geliştirici aracı gibi durur, premium hissi zayıf |

A seçildi; B'den **tek bir açık zeminli bölüm** (ritim ve kontrast için: süreç, kapsam), C'den **ölçü/etiket notları**
(yalnızca bilgi taşıdığı yerde: tasarım↔mühendislik bölümü) ödünç alındı.

UI UX Pro Max'in tasarım sistemi önerisi (Brutalism + pembe/camgöbeği palet + Inter/Playfair) **reddedildi**: marka
brief'iyle çelişiyor. Araçtan alınan ve kullanılanlar: “scroll-triggered storytelling” sayfa deseni, kinetik tipografi
stil kaydının uygulama kontrol listesi (reduced-motion, JS'siz geri dönüş), teslim öncesi kontrol listesi.

**Ana fikir:** *Işık formu ortaya çıkarır.* Valdori'nin işi de bu: bir işletmenin dijital formunu görünür kılmak.
Turuncu bu yüzden bir dolgu rengi değil, **ışıktır**: kenarı sıyırır, etkin olanı gösterir, metni “tutuşturur”.

**İmza:** Hero'daki açıklık (iki blok + kor çizgisi) ve aynı ışıkla aydınlanan başlık satırı. Destekleyici tek
tipografik hareket: Archivo'nun **genişlik ekseni** (hover'da genişleyen hizmet adları, imleci izleyen kapanış başlığı).

## 2. Renk

| Token | Değer | Kullanım |
|---|---|---|
| `ink-950` | `#09090B` | Sayfa zemini |
| `ink-900` / `800` / `700` / `600` | `#0E0E10` / `#171719` / `#222225` / `#2F2F34` | Yükseltilmiş yüzeyler, çizgiler |
| `bone` | `#F4F1EC` | Birincil metin, birincil düğme |
| `paper` | `#E9E4DB` | Açık bölüm zemini |
| `ash-400` / `500` / `600` | `#B6B6BC` / `#99999F` / `#7A7A82` | İkincil metin (koyu zeminde ≥ 4,5:1) |
| `ember-500` | `#FF6828` | Işık: vurgu, etkin durum, odak |
| `ember-300` / `400` | `#FFB37A` / `#FF8A4C` | Işığın parlak ucu, bağlantı |
| `ember-700` | `#C2410C` | Açık zeminde vurgu (kontrast için koyulaştırılmış) |
| `steel-300` / `500` | `#C9CCD1` / `#7C8088` | Soğuk metalik karşı ağırlık (WebGL kenar ışığı) |

Kurallar: turuncu en fazla üç öğe türünde (çizgi/ışık, etkin durum, tek vurgu sözcüğü). Hiyerarşi yeni renkle değil
opaklıkla kurulur. Mor/mavi degrade, dekoratif “glow” küresi yok. Konsept kapakları kendi paletlerini taşır (kapsam gösterimi).

## 3. Tipografi

| Aile | Rol | Lisans |
|---|---|---|
| **Archivo** (değişken: `wght` 100–900, `wdth` 62–125) | Her şey: dar = ifade, normal = okuma, geniş = işaret | SIL OFL 1.1 |
| **Bodoni Moda** italik | Editoryal karşı ses: büyük rakamlar, “Vitrin / Makine dairesi”, konsept başlıkları | SIL OFL 1.1 |
| **Geist Mono** | Yalnızca gerçek veri: sayaç, saat, kod notu | SIL OFL 1.1 |

Fontlar `next/font/google` ile derleme zamanında indirilir ve siteden sunulur (üçüncü taraf isteği yok). `latin-ext` dahil.

| Sınıf | Genişlik / ağırlık | Boyut | Satır | Kullanım |
|---|---|---|---|---|
| `t-mega` | 62 / 800 | `clamp(4.25rem, 15.5vw, 17.5rem)` | 0,82 | Dev sözcük |
| `t-display` | 62 / 800 | `clamp(3.25rem, 9.6vw, 10.5rem)` | 0,86 | Hero, sayfa girişleri |
| `t-h1` | 68 / 700 | `clamp(2.75rem, 7vw, 7rem)` | 0,90 | Bölüm başlığı |
| `t-h2` | 75 / 650 | `clamp(2rem, 4.4vw, 4.25rem)` | 0,96 | Alt başlık |
| `t-h3` | 82 / 600 | `clamp(1.375rem, 2.1vw, 2rem)` | 1,08 | Öğe başlığı |
| `t-statement` | 88 / 500 | `clamp(1.75rem, 4.1vw, 4.25rem)` | 1,08 | Manifesto |
| `t-lede` | 100 / 400 | `clamp(1.125rem, 1.45vw, 1.375rem)` | 1,5 | Giriş paragrafı |
| `t-sign` | 125 / 600, +0,14em, büyük harf | 11px | 1,2 | Konum/yön işareti |
| `t-serif` | Bodoni italik | bağlama göre | — | Editoryal an |
| `t-data` | Geist Mono | 12px, tabular | 1,4 | Veri |

Gövde 17px / 1,6. Satır uzunluğu ≤ 68ch. Büyük harf başlıklarda İ/Ö/Ü noktaları için maske dolgusu zorunlu.

## 4. Düzen

- `--gutter: clamp(1.25rem, 4.2vw, 4.5rem)` · `--section: clamp(6rem, 13vw, 13rem)` · azami genişlik 120rem
- 12 sütun ızgara (`grid-12`), sütun aralığı `clamp(0.75rem, 1.6vw, 1.75rem)`
- Kırılımlar: 26rem (xs), 40rem, 48rem, 64rem (masaüstü düzeni), 80rem, 112rem
- **Kesik köşe** (`cut`, `cut-both`, 14px pah): taş blokların pahı; tüm çerçeve ve birincil düğmede ortak motif. Yuvarlak köşe yok.
- Kompozisyon: asimetrik ızgara yerleşimleri, satır tabanlı tipografik listeler, bölme çizgileri. **Tekrarlayan kart ızgarası yok.**
- Numara yalnızca gerçek sıralarda kullanılır (süreç adımları, öneri önceliği, akış).

## 5. Hareket

| Yer | Hareket | Teknik |
|---|---|---|
| Hero | Satırlar maskeden yükselir → ikinci satır ışıkla tutuşur; WebGL'de kor çizgisi yanar | CSS keyframes (hydration beklemez) + Three.js |
| Hero (kaydırma/imleç) | Bloklar aralanır, kamera açıklığa ilerler; ışık imleci izler | rAF, lerp 0,05 |
| Manifesto | Sözcükler kaydırma hızında aydınlanır | SplitText + scrub |
| Hizmet evreni | Etkin ad 62→100 genişler, sahnede glif değişir | CSS `font-stretch` geçişi |
| Tasarım↔Mühendislik | Kor çizgisi ekranı tarar, alttaki yapıyı açar | `clip-path` + CSS değişkeni scrub |
| Süreç | Bölüm sabitlenir, altı adım yatay akar | ScrollTrigger pin (yalnız ≥1024px) |
| Kapanış | Başlık genişliği imlecin x konumunu izler | `quickTo` + CSS değişkeni |
| Sayfa geçişi | 0,22 sn çıkış / 0,55 sn giriş | React `<ViewTransition>` |

Eğriler: giriş `cubic-bezier(0.16, 1, 0.3, 1)`; durum değişimi `cubic-bezier(0.65, 0, 0.35, 1)`. Hover ≤ 0,55 sn.
Her bölümün **kendi** hareket mantığı vardır; “her şeye fade-up” yok. Sonsuz döngü yalnızca anlam taşıyan üç yerde
(akış çizgisi, yazıyor göstergesi, hero ışığının nefesi) ve `prefers-reduced-motion` altında durur.

**Azaltılmış hareket:** Lenis kapalı, sabitleme yok, tüm içerik son durumda; WebGL tek kare çizer.
**Dokunmatik:** hover'a bağlı hiçbir bilgi yok (hizmet açıklamaları mobilde hep açık); manyetik etki ve imleç takibi kapalı.

## 6. Bileşen ilkeleri

- **Düğme:** kemik zemin + mürekkep metin + turuncu ok çipi; hover'da turuncu dolgu soldan süpürür. İkincil: 1px çerçeve.
- **Bağlantı:** alt çizgi soldan büyür; etkin sayfa turuncu çizgi.
- **Form alanı:** yalnızca alt çizgi; odakta turuncu. Hata metni alanın altında, `role="alert"`.
- **Seçim çipleri / anahtarlar:** gerçek `checkbox`/`radio` + görsel katman (klavye ve ekran okuyucu tam destek).
- **Odak:** her etkileşimli öğede 2px `ember-400` halka. Dokunma hedefi ≥ 44px.
- **Metin dili:** sen/siz değil “siz”; eylem adı akış boyunca aynı kalır; hata mesajı ne olduğunu ve ne yapılacağını söyler.
