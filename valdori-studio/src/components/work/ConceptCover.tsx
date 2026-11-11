import type { Project } from "@/lib/projects";

/**
 * Konsept kapakları. Fotoğraf ya da stok görsel yok: her kapak, ilgili konseptin
 * paleti ve tipografisiyle kodda kurulmuş özgün bir kompozisyondur. Ölçüler kapsayıcı
 * sorgu birimiyle (cqw) verilir; kapak her boyutta aynı oranları korur.
 */

function Mono() {
  return (
    <div className="absolute inset-0 bg-[#E7E0D4] text-[#1B1916]">
      <div className="absolute left-[6cqw] top-[5cqw] flex w-[88cqw] justify-between text-[1.25cqw] uppercase tracking-[0.18em] [font-stretch:125%]">
        <span>Atölye Mono</span>
        <span className="opacity-60">Masa — Sandalye — Raf</span>
      </div>
      <div className="absolute bottom-0 left-[52cqw] h-[52cqw] w-[30cqw] rounded-t-full bg-[#A4532B]" />
      <div className="absolute bottom-0 left-[60cqw] h-[34cqw] w-[30cqw] rounded-t-full bg-[#C19A6B] mix-blend-multiply" />
      <div className="absolute bottom-[9cqw] left-[47cqw] size-[9cqw] rounded-full bg-[#1B1916]" />
      <p className="t-serif absolute bottom-[3cqw] left-[5cqw] text-[27cqw] leading-[0.8]">Mono</p>
      <p className="absolute left-[6cqw] top-[13cqw] max-w-[30cqw] text-[1.7cqw] leading-[1.35]">
        Elle yapılır, ömür boyu kalır. Sipariş üzerine masif mobilya.
      </p>
    </div>
  );
}

function Kiyi() {
  return (
    <div className="absolute inset-0 bg-[#0F3B43] text-[#DCE9E6]">
      <svg className="absolute inset-0 size-full" viewBox="0 0 1000 690" preserveAspectRatio="none" aria-hidden="true">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <path
            key={i}
            d={`M0 ${420 + i * 46} C 220 ${360 + i * 46}, 380 ${480 + i * 46}, 560 ${420 + i * 46} S 860 ${370 + i * 46}, 1000 ${430 + i * 46}`}
            fill="none"
            stroke="#2F7F86"
            strokeWidth="1.5"
            opacity={0.9 - i * 0.12}
          />
        ))}
      </svg>
      <p className="absolute left-[6cqw] top-[6cqw] font-display text-[13.5cqw] font-bold uppercase leading-[0.82] [font-stretch:125%]">
        Kıyı
      </p>
      <p className="absolute left-[6.4cqw] top-[20cqw] text-[1.25cqw] uppercase tracking-[0.2em] opacity-70 [font-stretch:125%]">
        Ağız ve diş sağlığı kliniği
      </p>
      <div className="absolute right-[6cqw] top-[9cqw] w-[36cqw] space-y-[1.4cqw] text-[1.55cqw] leading-[1.35]">
        <p className="ml-auto w-[76%] bg-[#DCE9E6] px-[1.8cqw] py-[1.3cqw] text-[#0F3B43]">
          Cumartesi günü randevu alabilir miyim?
        </p>
        <p className="w-[88%] bg-[#2F7F86]/55 px-[1.8cqw] py-[1.3cqw]">
          Elbette. Cumartesi 10.30 ve 14.00 uygun görünüyor. Hangisini ayıralım?
        </p>
        <div className="flex gap-[1cqw]">
          {["10.30", "14.00"].map((t) => (
            <span key={t} className="border border-[#DCE9E6]/60 px-[1.6cqw] py-[0.8cqw] text-[1.35cqw]">
              {t}
            </span>
          ))}
        </div>
      </div>
      <div className="absolute bottom-[5cqw] left-[6cqw] flex items-center gap-[1.5cqw] bg-[#F0E6D6] px-[2.4cqw] py-[1.4cqw] text-[1.45cqw] uppercase tracking-[0.12em] text-[#0F3B43] [font-stretch:112%]">
        Randevu al
      </div>
    </div>
  );
}

function Rota() {
  const rows = [
    ["IST → ANK", "Yolda", "14.20", 78],
    ["IZM → BUR", "Yolda", "16.05", 52],
    ["ANK → KON", "Gecikme", "17.40", 34],
    ["BUR → IST", "Teslim", "11.10", 100],
  ] as const;
  return (
    <div className="absolute inset-0 bg-[#0D0F0E] text-[#AEB6B1]">
      <svg className="absolute inset-0 size-full" viewBox="0 0 1000 690" aria-hidden="true">
        <defs>
          <pattern id="rg" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M50 0H0V50" fill="none" stroke="#1C201E" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="1000" height="690" fill="url(#rg)" />
        <path d="M70 560 C 200 520, 240 380, 380 360 S 560 250, 640 190 S 860 150, 940 90" fill="none" stroke="#C8F03C" strokeWidth="3" />
        <path d="M70 560 C 200 520, 240 380, 380 360 S 560 250, 640 190 S 860 150, 940 90" fill="none" stroke="#C8F03C" strokeWidth="14" opacity=".12" />
        {[
          [70, 560],
          [380, 360],
          [640, 190],
          [940, 90],
        ].map(([x, y], i) => (
          <rect key={i} x={x - 7} y={y - 7} width="14" height="14" fill={i === 2 ? "#C8F03C" : "#0D0F0E"} stroke="#C8F03C" strokeWidth="2" />
        ))}
      </svg>
      <p className="absolute left-[5cqw] top-[5cqw] font-display text-[15cqw] font-extrabold uppercase leading-[0.8] text-[#C8F03C] [font-stretch:62%]">
        Rota
      </p>
      <div className="absolute bottom-[5cqw] right-[5cqw] w-[46cqw] bg-[#1C201E]/95 p-[2cqw] font-mono text-[1.25cqw] backdrop-blur-sm">
        <div className="flex justify-between border-b border-[#AEB6B1]/20 pb-[1cqw] text-[1.05cqw] uppercase tracking-[0.14em]">
          <span>Aktif sevkiyat</span>
          <span className="text-[#C8F03C]">24</span>
        </div>
        {rows.map(([route, status, eta, p]) => (
          <div key={route} className="grid grid-cols-[1.3fr_1fr_.7fr] items-center gap-[1cqw] border-b border-[#AEB6B1]/10 py-[1cqw] last:border-0">
            <span className="text-[#E6EAE7]">{route}</span>
            <span className={status === "Gecikme" ? "text-[#C8F03C]" : ""}>{status}</span>
            <span className="text-right tabular-nums">{eta}</span>
            <span className="col-span-3 h-px bg-[#AEB6B1]/15">
              <span className="block h-px bg-[#C8F03C]" style={{ width: `${p}%` }} />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Firin() {
  return (
    <div className="absolute inset-0 bg-[#B5371F] text-[#F3EBDD]">
      <p className="t-serif absolute -bottom-[9cqw] left-[3cqw] text-[62cqw] leading-[0.7] text-[#7A2415]">7</p>
      <p className="absolute left-[6cqw] top-[5cqw] text-[1.3cqw] uppercase tracking-[0.2em] [font-stretch:125%]">
        Fırın No.7
      </p>
      <p className="absolute left-[6cqw] top-[10cqw] max-w-[28cqw] font-display text-[5.2cqw] font-bold uppercase leading-[0.9] [font-stretch:68%]">
        Bugün fırından çıkanlar
      </p>
      <div className="absolute right-[5cqw] top-[7cqw] flex gap-[1.6cqw]">
        {[
          { bg: "#F3EBDD", fg: "#B5371F", big: "07.00", small: "Ekşi maya" },
          { bg: "#1A1513", fg: "#F3EBDD", big: "Ön sipariş", small: "Cuma'ya kadar" },
          { bg: "#7A2415", fg: "#F3EBDD", big: "48 saat", small: "Mayanın hikâyesi" },
        ].map((c, i) => (
          <div
            key={c.big}
            className="flex h-[30cqw] w-[16.5cqw] flex-col justify-between p-[1.5cqw]"
            style={{ background: c.bg, color: c.fg, transform: `translateY(${i * 3.2}cqw)` }}
          >
            <span className="text-[1cqw] uppercase tracking-[0.16em] [font-stretch:125%]">No.7</span>
            <span>
              <span className="block font-display text-[3.3cqw] font-bold uppercase leading-[0.92] [font-stretch:68%]">
                {c.big}
              </span>
              <span className="mt-[0.6cqw] block text-[1.15cqw]">{c.small}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

const covers = { mono: Mono, kiyi: Kiyi, rota: Rota, firin: Firin } as const;

export function ConceptCover({
  cover,
  className = "",
}: {
  cover: Project["cover"];
  className?: string;
}) {
  const C = covers[cover];
  return (
    <div
      aria-hidden="true"
      className={`relative isolate aspect-[16/11] w-full overflow-hidden [container-type:inline-size] ${className}`}
    >
      <C />
    </div>
  );
}
