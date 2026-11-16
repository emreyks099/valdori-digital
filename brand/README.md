# Valdori Digital — Logo Paketi

Bu paket **valdoridigital.net**'teki mevcut kimlikten birebir üretildi: sembol geometrisi sitenin `icon.svg` ve header SVG'sinden, renkler ve fontlar sitenin CSS değişkenlerinden alındı. Yeni bir logo değil; dağınık duran mevcut logonun düzenli, her ortamda kullanılabilir hâli.

## İşaret
- **Sembol:** Kesik kollu V + sağ üstte ayrık Cyan paralelkenar ("kapak"). Kapak Cyan, gövde zemine göre Ice veya Night.
- **Wordmark:** Sitedeki geometrik, ince çizgili "VALDORI". Sitede `stroke` ile çiziliyor; bu pakette **dolgu path'e çevrildi**, yani Figma, Illustrator ya da matbaada kalınlığı kaymaz.
- **Tanımlayıcı:** "DIGITAL", JetBrains Mono Medium ile geniş harf aralıklı. Sitedeki etiket ve eyebrow diliyle aynı.

## Renkler (sitenin CSS token'ları)
| Token | HEX | Kullanım |
|---|---|---|
| Night `--night` | `#05070D` | Ana zemin, theme-color |
| Night 2 | `#0A0E17` | İkincil zemin |
| Graphite `--graphite` | `#1B1F27` | Kart / yüzey |
| Ice `--ice` | `#E8EEF6` | Metin, koyu zeminde logo |
| Cyan `--cyan` | `#19E3FF` | Vurgu, sembol kapağı (koyu zemin) |
| Cyan 2 `--cyan-2` | `#00B8D9` | Açık zeminde sembol kapağı |
| Cyan Light | `#9DF4FF` | Gradient tepe tonu |

Açık zeminde `#19E3FF` neredeyse kaybolur (beyaz üzerinde ≈1.6:1). Açık zemin varyantlarında bu yüzden `#00B8D9` kullanıldı.

## Fontlar
Unbounded (display) · Manrope (gövde) · JetBrains Mono (etiket/tanımlayıcı). Üçü de Google Fonts'ta, ücretsiz.

## Dosyalar
- `svg/`: master vektörler
  - `valdori-logo-horizontal-*`: ana logo, sitedeki header lockup'ı
  - `valdori-logo-full-*`: yatay + DIGITAL (antet, sunum, e-posta imzası)
  - `valdori-logo-stacked-*`: dikey (kare alanlar, kapaklar)
  - `valdori-symbol-*` / `valdori-wordmark-*`: tek parçalar
  - `valdori-appicon-{night,cyan,ice}`: yuvarlatılmış kare ikon (site favicon oranları)
  - `valdori-avatar-night`: sosyal medya profil fotoğrafı (köşesiz, platform kendisi yuvarlıyor)
  - `valdori-banner-linkedin` (1584×396), `valdori-banner-x` (1500×500)
- Varyantlar: `on-dark` (koyu zemin, renkli), `on-light` (açık zemin, renkli), `mono-dark` (tek renk Night), `mono-light` (tek renk beyaz, fotoğraf üstü)
- `png/`: şeffaf PNG; logolar 1000/2000/4000 px, semboller 256/512/1024 px, ikonlar 512/1024
- `favicon/`: `favicon.ico` (16/32/48), `favicon.svg`, apple-touch, android-chrome, `site.webmanifest`
- `tokens.json`: renk ve font token'ları

## Kullanım kuralları
- **Boşluk:** Logonun her yanında en az kapak paralelkenarının yüksekliği kadar boşluk bırakın.
- **Minimum boyut:** Yatay logo dijitalde 120 px, baskıda 30 mm. Bunun altında sadece sembolü kullanın. Sembol için alt sınır 16 px.
- **Kapak her zaman Cyan.** Tek renk varyant gerekmedikçe kapağı gövdeyle aynı renge boyamayın.
- **Yapmayın:** Sembolü döndürmek, esnetmek, gölge/glow'u logonun parçası gibi kullanmak (glow sahne efektidir, logo değil), wordmark'ı başka fontla yeniden yazmak.

## Yeniden üretme
```bash
pip install shapely fonttools
python3 tools/build.py   # SVG
node tools/export.js     # PNG + favicon (Playwright)
cd favicon && convert favicon-16x16.png favicon-32x32.png favicon-48x48.png favicon.ico
```
