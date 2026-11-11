import { ButtonLink } from "@/components/ui/Button";
import { TurkeyClock } from "@/components/ui/TurkeyClock";
import { HeroCanvas } from "./HeroCanvas";

/** WebGL yüklenene kadar ve WebGL olmayan cihazlarda görünen statik kompozisyon */
function HeroPoster() {
  return (
    <svg
      aria-hidden="true"
      className="absolute inset-0 size-full"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <radialGradient id="hp-glow" cx="50%" cy="46%" r="42%">
          <stop offset="0" stopColor="#FF6828" stopOpacity=".34" />
          <stop offset=".45" stopColor="#FF6828" stopOpacity=".07" />
          <stop offset="1" stopColor="#FF6828" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="hp-l" x1="1" x2="0">
          <stop offset="0" stopColor="#7a2c0e" />
          <stop offset=".12" stopColor="#2a1208" />
          <stop offset=".5" stopColor="#0d0d0f" />
        </linearGradient>
        <linearGradient id="hp-r" x1="0" x2="1">
          <stop offset="0" stopColor="#7a2c0e" />
          <stop offset=".12" stopColor="#2a1208" />
          <stop offset=".5" stopColor="#0d0d0f" />
        </linearGradient>
        <linearGradient id="hp-blade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FF6828" stopOpacity="0" />
          <stop offset=".25" stopColor="#FFB37A" />
          <stop offset="1" stopColor="#FF6828" />
        </linearGradient>
      </defs>
      <rect width="1440" height="900" fill="#09090B" />
      <rect width="1440" height="900" fill="url(#hp-glow)" />
      <path d="M430 -40 600 -40 708 760 560 760Z" fill="url(#hp-l)" />
      <path d="M1010 -40 840 -40 732 760 880 760Z" fill="url(#hp-r)" />
      <rect x="719" y="-40" width="2" height="800" fill="url(#hp-blade)" />
    </svg>
  );
}

export function Hero() {
  return (
    <section className="grain relative isolate flex min-h-[40rem] h-svh flex-col overflow-clip bg-ink-950">
      <div className="absolute inset-0 -z-10">
        <HeroPoster />
        <HeroCanvas />
        {/* Metin koruması: alt kenara doğru zemine karışır */}
        <div className="absolute inset-x-0 bottom-0 h-[46%] bg-gradient-to-t from-ink-950 via-ink-950/55 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink-950/80 to-transparent" />
      </div>

      <div className="shell relative z-10 flex flex-1 flex-col pt-[calc(var(--header-h)+1.25rem)]">
        <div className="enter-fade flex items-start justify-between gap-6" style={{ "--d": "1.5s" } as React.CSSProperties}>
          <p className="t-sign max-w-[22ch] text-bone/70 sm:max-w-none">
            Tasarım, yazılım ve yapay zekâ stüdyosu
          </p>
          <TurkeyClock className="hidden text-bone/70 sm:inline-block" />
        </div>

        <div className="mt-auto pb-[max(1.75rem,env(safe-area-inset-bottom))] md:pb-10">
          <h1 className="text-bone">
            <span className="sr-only">Tasarım göz alır. Sistem iş görür.</span>

            {/* Masaüstü: iki satır */}
            <span aria-hidden="true" className="hidden sm:block">
              <span className="line-mask t-display !text-[clamp(3.5rem,10.4vw,12.75rem)]">
                <span style={{ "--d": "0.25s" } as React.CSSProperties}>Tasarım göz alır.</span>
              </span>
              <span className="line-mask t-display !text-[clamp(3.5rem,10.4vw,12.75rem)]">
                <span style={{ "--d": "0.38s" } as React.CSSProperties}>
                  <span className="lit-text enter-ignite" style={{ "--d": "0.9s" } as React.CSSProperties}>
                    Sistem iş görür.
                  </span>
                </span>
              </span>
            </span>

            {/* Mobil: dört satır, sözcükler ekranı doldurur */}
            <span aria-hidden="true" className="block sm:hidden">
              {["Tasarım", "göz alır."].map((w, i) => (
                <span key={w} className="line-mask t-display !text-[21.5vw]">
                  <span style={{ "--d": `${0.25 + i * 0.09}s` } as React.CSSProperties}>{w}</span>
                </span>
              ))}
              {["Sistem", "iş görür."].map((w, i) => (
                <span key={w} className="line-mask t-display !text-[21.5vw]">
                  <span style={{ "--d": `${0.43 + i * 0.09}s` } as React.CSSProperties}>
                    <span className="lit-text enter-ignite" style={{ "--d": "0.95s" } as React.CSSProperties}>
                      {w}
                    </span>
                  </span>
                </span>
              ))}
            </span>
          </h1>

          <div className="mt-7 grid gap-7 border-t hairline pt-6 md:mt-9 md:grid-cols-12 md:items-end md:gap-8 md:pt-7">
            <p
              className="enter-fade t-lede max-w-[34rem] text-pretty text-bone/80 md:col-span-6"
              style={{ "--d": "1.05s" } as React.CSSProperties}
            >
              İlk bakışta etkileyen, perde arkasında işinizi yürüten dijital deneyimler. Web
              tasarımı, özel yazılımı, yapay zekâyı ve otomasyonu tek stüdyoda birleştiriyoruz.
            </p>
            <div
              className="enter-fade flex flex-col gap-3 xs:flex-row xs:flex-wrap md:col-span-6 md:justify-end"
              style={{ "--d": "1.2s" } as React.CSSProperties}
            >
              <ButtonLink href="/iletisim" className="justify-between">
                Projenizi Konuşalım
              </ButtonLink>
              <ButtonLink href="/projeler" variant="ghost" className="justify-between">
                Çalışmalarımızı Keşfedin
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
