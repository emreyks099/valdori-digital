import Link from "next/link";
import { legalNav, mainNav, site } from "@/lib/site";
import { services } from "@/lib/services";
import { TurkeyClock } from "@/components/ui/TurkeyClock";
import { ArrowIcon } from "@/components/ui/Button";
import { Wordmark } from "@/components/ui/Wordmark";

export function Footer() {
  return (
    <footer className="relative overflow-clip border-t hairline bg-ink-950">
      <div className="shell grid gap-x-8 gap-y-14 pb-16 pt-20 md:grid-cols-12 md:pt-28">
        <div className="md:col-span-5">
          <Link href="/" aria-label={`${site.name} — ana sayfa`} className="inline-flex text-bone">
            <Wordmark />
          </Link>
          <p className="mt-6 max-w-[24rem] text-ash-400">
            Tasarımı, yazılımı, yapay zekâyı ve otomasyonu tek stüdyoda birleştiren dijital
            teknoloji stüdyosu.
          </p>
          <Link
            href="/iletisim"
            className="group mt-8 inline-flex items-center gap-4 border-b border-bone/30 pb-3 transition-colors duration-300 hover:border-ember-500"
          >
            <span className="t-sign">Projenizi Konuşalım</span>
            <ArrowIcon className="text-ember-500 transition-transform duration-500 ease-out-expo group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </div>

        <nav aria-label="Hizmetler" className="md:col-span-3 md:col-start-7">
          <h2 className="t-sign text-ash-500">Hizmetler</h2>
          <ul className="mt-5 space-y-1">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/hizmetler/${s.slug}`}
                  className="link-line py-1.5 text-bone/85 hover:text-bone"
                >
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Stüdyo" className="md:col-span-2">
          <h2 className="t-sign text-ash-500">Stüdyo</h2>
          <ul className="mt-5 space-y-1">
            {[...mainNav.slice(1), { href: "/iletisim", label: "İletişim" }].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="link-line py-1.5 text-bone/85 hover:text-bone">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-1">
          <h2 className="t-sign text-ash-500">Sosyal</h2>
          <ul className="mt-5">
            <li>
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="link-line py-1.5 text-bone/85 hover:text-bone"
              >
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Dev sözcük: alt kenarda kesilir, kor çizgisi altından sızar */}
      <div aria-hidden="true" className="relative select-none">
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] bg-[radial-gradient(60%_100%_at_50%_100%,rgba(255,104,40,0.22),transparent_70%)]" />
        <p
          className="-mb-[0.19em] whitespace-nowrap text-center font-display text-[24.5vw] font-extrabold uppercase leading-[0.8] tracking-[-0.01em] text-ink-800 [font-stretch:100%] 3xl:text-[29rem]"
        >
          Valdori
        </p>
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-ember-500 to-transparent" />
      </div>

      <div className="relative border-t hairline bg-ink-950">
        <div className="shell flex flex-col gap-4 py-5 text-[0.8125rem] text-ash-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {site.name}. Tüm hakları saklıdır.</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {legalNav.map((item) => (
              <Link key={item.href} href={item.href} className="link-line py-1 hover:text-bone">
                {item.label}
              </Link>
            ))}
            <TurkeyClock />
          </div>
        </div>
      </div>
    </footer>
  );
}
