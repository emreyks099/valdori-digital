import type { ServiceSlug } from "@/lib/services";

/**
 * Hizmet glifleri — her hizmetin mimari çizim dilinde soyut bir işareti.
 * Tek çizgi kalınlığı, tek vurgu rengi; hareket yalnızca anlam taşıdığı yerde.
 */

const line = { stroke: "currentColor", strokeWidth: 1, fill: "none", vectorEffect: "non-scaling-stroke" } as const;
const ember = "#FF6828";

function Web() {
  return (
    <>
      <rect x="40" y="70" width="320" height="230" {...line} />
      <path d="M40 104h320" {...line} />
      <circle cx="58" cy="87" r="3.5" fill={ember} />
      <circle cx="72" cy="87" r="3.5" {...line} />
      <path d="M64 136h150M64 160h110" stroke="currentColor" strokeWidth="9" />
      <rect x="64" y="188" width="74" height="22" fill={ember} />
      <rect x="236" y="126" width="100" height="150" {...line} />
      <path d="m236 276 100-150M236 126l100 150" {...line} opacity=".35" />
      <path d="M64 240h150M64 254h124M64 268h140" {...line} opacity=".5" />
      {/* mobil çerçeve: aynı içerik, başka ölçü */}
      <rect x="282" y="200" width="92" height="160" {...line} fill="#09090B" />
      <path d="M296 226h50M296 240h36" stroke="currentColor" strokeWidth="6" />
      <rect x="296" y="258" width="40" height="13" fill={ember} />
      <path d="M296 292h64M296 304h52M296 316h60" {...line} opacity=".5" />
    </>
  );
}

function Ai() {
  return (
    <>
      <circle cx="200" cy="200" r="150" {...line} opacity=".25" />
      <circle cx="200" cy="200" r="104" {...line} opacity=".45" strokeDasharray="2 7" />
      <circle cx="200" cy="200" r="58" {...line} />
      <path d="M200 142v116M142 200h116M159 159l82 82M241 159l-82 82" {...line} opacity=".4" />
      <circle cx="200" cy="200" r="13" fill={ember}>
        <animate attributeName="r" values="11;15;11" dur="3.2s" repeatCount="indefinite" />
      </circle>
      {[
        [200, 50],
        [330, 125],
        [330, 275],
        [200, 350],
        [70, 275],
        [70, 125],
      ].map(([x, y], i) => (
        <g key={i}>
          <path d={`M200 200 ${x} ${y}`} {...line} opacity=".3" />
          <rect x={x - 7} y={y - 7} width="14" height="14" {...line} fill="#09090B" />
        </g>
      ))}
      <path
        d="M200 200 330 125"
        stroke={ember}
        strokeWidth="1.5"
        strokeDasharray="10 150"
        style={{ animation: "flow 2.4s linear infinite" }}
      />
      <path
        d="M70 275 200 200"
        stroke={ember}
        strokeWidth="1.5"
        strokeDasharray="10 150"
        style={{ animation: "flow 3.1s linear infinite" }}
      />
    </>
  );
}

function Automation() {
  return (
    <>
      <rect x="40" y="60" width="92" height="56" {...line} />
      <rect x="154" y="172" width="92" height="56" {...line} />
      <rect x="268" y="60" width="92" height="56" {...line} />
      <rect x="40" y="284" width="92" height="56" {...line} />
      <rect x="268" y="284" width="92" height="56" fill={ember} />
      <path d="M132 88h36v84M246 200h58v-84M200 228v84h-68M246 312h22" {...line} opacity=".45" />
      <path
        d="M132 88h36v84M246 200h58v-84M200 228v84h-68M246 312h22"
        stroke={ember}
        strokeWidth="1.5"
        fill="none"
        strokeDasharray="6 26"
        style={{ animation: "flow 1.8s linear infinite" }}
      />
      <path d="M58 82h40M58 94h26M172 194h40M172 206h56M286 82h56M286 94h30M58 306h56M58 318h34" {...line} opacity=".55" />
      <path d="m298 312 12 12 22-24" stroke="#09090B" strokeWidth="2.5" fill="none" />
    </>
  );
}

function Software() {
  return (
    <>
      {[0, 1, 2].map((i) => (
        <path
          key={i}
          d={`M200 ${86 + i * 62} 344 ${158 + i * 62} 200 ${230 + i * 62} 56 ${158 + i * 62}Z`}
          {...line}
          fill="#09090B"
          opacity={i === 0 ? 1 : 0.55}
        />
      )).reverse()}
      <path d="M200 86 344 158 200 230 56 158Z" {...line} />
      <path d="M128 122 272 194M164 104 308 176M92 140l144 72" {...line} opacity=".35" />
      <path d="M272 122 128 194M236 104 92 176M308 140l-144 72" {...line} opacity=".35" />
      <path d="M200 122 236 140 200 158 164 140Z" fill={ember} />
      <path d="M56 158v124M344 158v124M200 230v124" {...line} opacity=".3" />
    </>
  );
}

function Seo() {
  return (
    <>
      <path d="M40 340h320" {...line} />
      {[
        [64, 290, 0.35],
        [124, 250, 0.45],
        [184, 214, 0.6],
        [244, 160, 0.8],
      ].map(([x, y, o], i) => (
        <rect key={i} x={x} y={y} width="36" height={340 - y} {...line} opacity={o} />
      ))}
      <rect x="304" y="96" width="36" height="244" fill={ember} />
      <path d="M82 290 142 250 202 214 262 160 322 96" {...line} strokeDasharray="3 6" />
      <circle cx="322" cy="96" r="5" fill="#09090B" stroke={ember} strokeWidth="1.5" />
      <circle cx="112" cy="104" r="40" {...line} />
      <path d="m141 133 34 34" stroke="currentColor" strokeWidth="5" />
      <path d="M94 98h36M94 110h22" {...line} opacity=".6" />
    </>
  );
}

function Social() {
  const cells = [0, 1, 2].flatMap((r) => [0, 1, 2].map((c) => [c, r] as const));
  return (
    <>
      {cells.map(([c, r], i) => {
        const x = 62 + c * 96;
        const y = 62 + r * 96;
        if (i === 4) {
          return (
            <g key={i}>
              <rect x={x} y={y} width="84" height="84" fill={ember} />
              <path d={`M${x + 33} ${y + 26}v32l26-16Z`} fill="#09090B" />
            </g>
          );
        }
        return (
          <g key={i} opacity={i % 2 ? 0.55 : 0.9}>
            <rect x={x} y={y} width="84" height="84" {...line} />
            {i % 3 === 0 && <path d={`M${x} ${y + 84} ${x + 84} ${y}`} {...line} opacity=".5" />}
            {i % 3 === 1 && <circle cx={x + 42} cy={y + 42} r="22" {...line} />}
            {i % 3 === 2 && <path d={`M${x + 16} ${y + 34}h52M${x + 16} ${y + 50}h34`} stroke="currentColor" strokeWidth="6" />}
          </g>
        );
      })}
    </>
  );
}

const glyphs: Record<ServiceSlug, () => React.JSX.Element> = {
  "web-tasarim": Web,
  "yapay-zeka": Ai,
  otomasyon: Automation,
  "ozel-yazilim": Software,
  seo: Seo,
  "sosyal-medya": Social,
};

export function ServiceGlyph({ slug, className = "" }: { slug: ServiceSlug; className?: string }) {
  const G = glyphs[slug];
  return (
    <svg viewBox="0 0 400 400" aria-hidden="true" className={className}>
      <G />
    </svg>
  );
}
