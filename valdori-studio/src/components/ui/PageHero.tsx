import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";

type Crumb = { label: string; href?: string };

/**
 * İç sayfa girişi. Başlık satırları CSS ile maskeden yükselir (hydration beklemez);
 * `ignite` açıksa son satır, ana sayfadaki gibi ışıkla aydınlanır.
 */
export function PageHero({
  crumbs,
  lines,
  lede,
  children,
  aside,
  ignite = true,
  size = "display",
}: {
  crumbs: Crumb[];
  lines: string[];
  lede?: string;
  children?: ReactNode;
  aside?: ReactNode;
  ignite?: boolean;
  size?: "display" | "h1";
}) {
  const sizeClass =
    size === "display"
      ? "t-display !text-[clamp(3.25rem,11.2vw,12rem)]"
      : "t-h1 !text-[clamp(2.75rem,8vw,8rem)]";
  return (
    <section className="relative isolate overflow-clip bg-ink-950 pt-[calc(var(--header-h)+clamp(2.5rem,7vw,6rem))]">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute right-[12%] top-0 h-[120%] w-px origin-top rotate-[12deg] bg-gradient-to-b from-ember-500/0 via-ember-500/60 to-ember-500/0" />
        <div className="absolute right-0 top-0 h-[70%] w-[55%] bg-[radial-gradient(60%_60%_at_70%_20%,rgba(255,104,40,0.13),transparent_70%)]" />
      </div>
      <div className="shell">
        <nav aria-label="Sayfa yolu" className="enter-fade" style={{ "--d": "0.1s" } as CSSProperties}>
          <ol className="t-sign flex flex-wrap items-center gap-x-3 gap-y-1 text-ash-500">
            <li>
              <Link href="/" className="link-line py-2 hover:text-bone">
                Valdori
              </Link>
            </li>
            {crumbs.map((c) => (
              <li key={c.label} className="flex items-center gap-3">
                <span aria-hidden="true" className="h-px w-4 bg-ash-600" />
                {c.href ? (
                  <Link href={c.href} className="link-line py-2 hover:text-bone">
                    {c.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="text-bone">
                    {c.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        <h1 className="mt-8 text-bone md:mt-12" aria-label={lines.join(" ")}>
          {lines.map((line, i) => {
            const last = i === lines.length - 1 && ignite && lines.length > 1;
            return (
              <span key={line} aria-hidden="true" className={`line-mask ${sizeClass}`}>
                <span style={{ "--d": `${0.15 + i * 0.1}s` } as CSSProperties}>
                  {last ? (
                    <span className="lit-text enter-ignite" style={{ "--d": "0.7s" } as CSSProperties}>
                      {line}
                    </span>
                  ) : (
                    line
                  )}
                </span>
              </span>
            );
          })}
        </h1>

        {(lede || aside || children) && (
          <div className="grid-12 mt-9 gap-y-8 border-t hairline pt-7 md:mt-12 md:pt-9">
            {lede && (
              <p
                className="enter-fade t-lede col-span-12 max-w-[40rem] text-pretty text-bone/80 md:col-span-7"
                style={{ "--d": "0.75s" } as CSSProperties}
              >
                {lede}
              </p>
            )}
            {aside && (
              <div
                className="enter-fade col-span-12 md:col-span-4 md:col-start-9 md:justify-self-end"
                style={{ "--d": "0.9s" } as CSSProperties}
              >
                {aside}
              </div>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
