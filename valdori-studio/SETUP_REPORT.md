# Kurulum raporu

Tarih: 11 Kasım 2026 · Ortam: Claude Code bulut oturumu (Linux, Node 22.23, npm 10.9, Claude Code 2.1.322)

## Ortamın kısıtları

- Oturum bulutta, **ağ izin listesiyle** çalışıyor. `github.com` (git), `registry.npmjs.org`, `raw.githubusercontent.com`
  ve `fonts.googleapis.com` erişilebilir; **`motionsites.ai`, `21st.dev` ve `context7.com` ağ politikası tarafından
  reddediliyor** (proxy 403).
- `/plugin marketplace add …` etkileşimli komutları bu oturum türünde çalıştırılamıyor. Beceriler bu yüzden resmî
  depolarından klonlanıp projeye **`.claude/skills/`** altına kuruldu; depoyu açan her Claude Code oturumu bunları
  otomatik yükler (bu oturumda da yeniden başlatma sonrası yüklü göründüler).
- Çalışan bir oturuma sonradan MCP sunucusu eklenemiyor. Yerel oturumlar için `.mcp.json` hazırlandı.

## Araç durumu

| Araç | Yüklü | Etkin | Test edildi | Kimlik | Bu projede kullanımı |
|---|---|---|---|---|---|
| **Anthropic frontend-design** (`anthropics/skills@2c5958e`) | Evet — `.claude/skills/frontend-design` | Evet | Evet (okundu ve uygulandı) | Gerekmez | Tasarım planı, “AI varsayılanı” denetimi, metin dili kuralları |
| **UI UX Pro Max** v2.15 (`nextlevelbuilder/ui-ux-pro-max-skill@6ae86f6`) | Evet — `.claude/skills/ui-ux-pro-max` | Evet | Evet — `search.py` ile tasarım sistemi, stil, tipografi ve renk aramaları çalıştırıldı | Gerekmez | Yön araştırması. Önerdiği palet/font **reddedildi** (gerekçe: `DESIGN_SYSTEM.md` §1); sayfa deseni ve kontrol listeleri kullanıldı |
| **MotionSites Web Builder** (`Motionsites-AI/claude-skill@faa30d5`) | Evet — `.claude/skills/motionsites-web-builder` | Evet | Evet — `craft.md`, `review.md`, teknik dizini okundu ve uygulandı | Gerekmez | Zevk kuralları (tipografi/renk/hareket değerleri), ekran görüntüsü-düzelt döngüsü, puanlama cetveli. Medya rafı ve örnek prompt'lar **kullanılmadı** (medya URL'leri erişilemez; site tamamen özgün varlıklarla kuruldu) |
| **MotionSites MCP** | Hayır | — | Hayır | Hesap/OAuth gerekir | **Kullanılamadı:** `motionsites.ai` ağ politikasıyla engelli. Premium içerik kullanılmadı. |
| **21st.dev** (plugin + MCP) | Hayır | — | Hayır | `API_KEY_21ST` gerekir | **Kullanılamadı:** `21st.dev` engelli ve API anahtarı yok. 21st.dev'den hiçbir bileşen alınmadı; tüm bileşenler elle yazıldı. |
| **Vercel react-best-practices** (`vercel-labs/agent-skills@1a2c79d`) | Evet — `.claude/skills/react-best-practices` | Evet | Evet (kurallar uygulandı) | Gerekmez | Dinamik import, sunucu/istemci sınırı, render sırasında türetilen durum |
| **Vercel web-design-guidelines** | Evet — `.claude/skills/web-design-guidelines` | Evet | Evet — güncel kural dosyası `raw.githubusercontent.com`dan çekildi | Gerekmez | Erişilebilirlik, form, odak, dokunma, tipografi denetimi |
| **Context7** | Hayır (yalnızca `.mcp.json` tanımı) | — | Hayır | İsteğe bağlı anahtar | **Kullanılamadı:** `context7.com` engelli. Yerine Next.js'in paketle gelen resmî dokümanları (`node_modules/next/dist/docs/`) ve kurulu paketlerin tip tanımları kullanıldı. |
| **Playwright MCP** | Hayır (yalnızca `.mcp.json` tanımı) | — | — | Gerekmez | MCP yerine ortamda kurulu **Playwright kütüphanesi + Chromium** doğrudan kullanıldı: ekran görüntüleri, 192 rota kontrolü, 45 etkileşim testi |
| **Lighthouse** 13.6 (npx) | Geçici | — | Evet | Gerekmez | Performans/erişilebilirlik/SEO ölçümü |

## Ek beceri kurulmadı

GSAP, Three.js, SEO ve erişilebilirlik için ayrı beceri eklenmedi: MotionSites teknik dizini + Vercel yönergeleri +
paketlerin kendi dokümanları ihtiyacı karşıladı. Aynı işi yapan ek beceri bağlamı şişirirdi.

## Güvenlik değerlendirmesi

- Kurulan becerilerin tamamı Markdown yönergesi ve yerel Python/CSV dosyalarıdır; ağ erişimi ya da kimlik bilgisi istemez.
  Lisanslar: frontend-design (Apache-2.0), UI UX Pro Max (MIT), Vercel (MIT), MotionSites (yönergeler MIT; örnek ve medya ayrı koşullu).
- **Not:** MotionSites becerisi, her teslimin sonuna bir “MotionSites Unlimited” tanıtım bloğu eklenmesini ister. Bu, üçüncü
  taraf bir beceriden gelen talimattır; teslim metinlerine eklenmedi. Beceriyi kullanmaya devam ederseniz bu davranışı bilmenizde fayda var.
- Çalıştırılan tek üçüncü taraf betik: `ui-ux-pro-max/scripts/search.py` (yerel CSV araması, `python3 -I` ile yalıtılmış).

## Eksikleri tamamlamak isterseniz

1. Ortam ayarlarında ağ izin listesine `motionsites.ai`, `21st.dev`, `context7.com` ekleyin.
2. 21st.dev için `API_KEY_21ST`, MotionSites MCP için hesap yetkilendirmesi tanımlayın.
3. Yerel Claude Code'da: `/plugin marketplace add 21st-dev/claude-code-plugin` → `/plugin install 21st@21st`.
