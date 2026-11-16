# Valdori Digital — Logo Paketi

## Konsept
**"Step V" monogramı.** Sol kol sabit zemin, sağ kol bir adım yukarıda ve Ember renginde: müşteriyi bir basamak öteye taşıyan dijital ivme. Sağ üstteki kare "piksel" dijital üretimi (yazılım, AI, otomasyon) temsil eder ve tek başına marka işareti olarak da kullanılabilir (bullet, imleç, köşe vurgusu).

Wordmark özel çizim geometrik bir yazı — font dosyası yok, tamamı vektör path. Hiçbir ortamda font yüzünden bozulmaz.

## Renkler
| Token | HEX | RGB | Kullanım |
|---|---|---|---|
| Ink | `#0E0E12` | 14, 14, 18 | Ana metin, koyu zemin |
| Bone | `#F2EEE6` | 242, 238, 230 | Açık zemin, koyu zeminde logo |
| Ember | `#FF5B1F` | 255, 91, 31 | Vurgu — yalnızca sembolde ve CTA'larda, küçük dozda |

Ember, Bone üzerinde gövde metni için yeterli kontrast vermez (≈2.9:1); metin için değil, grafik vurgu için kullanın.

## Dosyalar
- `svg/` — master vektörler (web ve baskı için asıl kaynak)
  - `valdori-logo-horizontal-*` — ana logo (site header, belge antetleri)
  - `valdori-logo-stacked-*` — dikey (kare alanlar, kapak, sosyal profil afişi)
  - `valdori-symbol-*` — tek başına monogram
  - `valdori-wordmark-*` — sadece yazı
  - `valdori-appicon-{dark,light,ember}` — zeminli kare ikon (sosyal medya profil fotoğrafı)
  - `valdori-og-image.svg` — sosyal paylaşım görseli
- Varyant ekleri: `color` (açık zemin), `color-reverse` (koyu zemin), `ink` (tek renk siyah), `white` (tek renk beyaz — fotoğraf üstü)
- `png/` — şeffaf PNG'ler; logolar 1000/2000/4000 px, semboller 256/512/1024 px genişlik
- `favicon/` — `favicon.ico` (16/32/48), `favicon.svg`, apple-touch-icon, android-chrome, `site.webmanifest`
- `tokens.json` — renk token'ları

## Favicon kurulumu
`favicon/` içeriğini site köküne kopyalayın:
```html
<link rel="icon" href="/favicon.ico" sizes="48x48">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<meta property="og:image" content="/valdori-og-image-1200x630.png">
```

## Kullanım kuralları
- **Boşluk:** Logonun çevresinde en az sembolün sağ kol genişliği kadar (≈ cap yüksekliğinin %20'si) boş alan bırakın.
- **Minimum boyut:** Yatay logo dijitalde 120 px / baskıda 30 mm genişlik. Altında yalnızca sembolü kullanın. Sembol minimum 16 px.
- **Yapmayın:** Renkleri değiştirmek, sembolü döndürmek/esnetmek, kolların sırasını değiştirmek, gölge/gradient eklemek, Ember zemin üzerinde Ember sembol kullanmak.
- Baskı için Ember yaklaşık karşılığı: Pantone 1655 C (onaylı prova ile doğrulayın).

## Yeniden üretme
```bash
python3 tools/build.py     # SVG'ler
node tools/export.js       # PNG + favicon (Playwright gerekir)
```
Geometri `tools/build.py` içindedir; renk veya oran değişikliği tek yerden yapılır.
