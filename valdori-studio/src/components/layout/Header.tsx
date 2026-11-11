"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { mainNav, site } from "@/lib/site";
import { Wordmark } from "@/components/ui/Wordmark";
import { ArrowIcon } from "@/components/ui/Button";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const lastY = useRef(0);

  // Kaydırma yönüne göre gizle / göster
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const y = window.scrollY;
        setScrolled(y > 24);
        const delta = y - lastY.current;
        if (Math.abs(delta) > 6) {
          setHidden(delta > 0 && y > 320);
          lastY.current = y;
        }
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const close = useCallback((restoreFocus = false) => {
    setOpen(false);
    if (restoreFocus) burgerRef.current?.focus();
  }, []);

  // Rota değişince menü kapanır (Activity ile sayfalar bellekte kalsa da).
  // Render sırasında türetilir; effect içinde setState gerekmez.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  // Açıkken: sayfa kaydırması kilitlenir, Esc kapatır, odak panelde kalır
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = "hidden";
    window.__lenis?.stop();
    const first = panelRef.current?.querySelector<HTMLElement>("a");
    first?.focus({ preventScroll: true });

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close(true);
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const items = [
        burgerRef.current,
        ...panelRef.current.querySelectorAll<HTMLElement>("a, button"),
      ].filter(Boolean) as HTMLElement[];
      const firstEl = items[0];
      const lastEl = items[items.length - 1];
      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    };
    const onResize = () => {
      if (window.innerWidth >= 1024) close();
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      root.style.overflow = prev;
      window.__lenis?.start();
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open, close]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-transform duration-500 ease-out-expo ${
          hidden && !open ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div
          className={`absolute inset-0 -z-10 border-b transition-[opacity,border-color] duration-500 ${
            scrolled && !open
              ? "hairline bg-ink-950/75 opacity-100 backdrop-blur-xl"
              : "border-transparent opacity-0"
          }`}
        />
        <div className="shell flex h-[var(--header-h)] items-center justify-between gap-6">
          <Link
            href="/"
            aria-label={`${site.name} — ana sayfa`}
            className="relative z-10 -ml-1 flex h-11 items-center px-1 text-bone"
          >
            <Wordmark />
          </Link>

          <nav aria-label="Ana menü" className="hidden lg:block">
            <ul className="flex items-center gap-9">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className="link-line t-sign py-3 text-bone/80 transition-colors duration-300 hover:text-bone aria-[current=page]:text-bone"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/iletisim"
              className="group hidden h-11 items-center gap-3 border border-bone/25 pl-4 pr-1.5 text-bone transition-colors duration-300 hover:border-ember-500 sm:inline-flex"
            >
              <span className="t-sign">Projenizi Konuşalım</span>
              <span className="grid size-8 place-items-center bg-bone text-ink-950 transition-colors duration-300 group-hover:bg-ember-500">
                <ArrowIcon />
              </span>
            </Link>

            <button
              ref={burgerRef}
              type="button"
              className="relative z-10 grid size-11 place-items-center border border-bone/25 text-bone lg:hidden"
              aria-expanded={open}
              aria-controls="mobil-menu"
              aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
              onClick={() => setOpen((v) => !v)}
            >
              <span aria-hidden="true" className="relative block h-3 w-5">
                <span
                  className={`absolute left-0 top-0 h-px w-full bg-current transition-transform duration-500 ease-out-expo ${
                    open ? "translate-y-[5.5px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`absolute bottom-0 left-0 h-px w-full bg-current transition-transform duration-500 ease-out-expo ${
                    open ? "-translate-y-[5.5px] -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobil menü */}
      <div
        id="mobil-menu"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menü"
        inert={!open}
        className={`fixed inset-0 z-40 flex flex-col overflow-y-auto overscroll-contain bg-ink-950 pt-[var(--header-h)] transition-[clip-path,visibility] duration-700 ease-out-expo lg:hidden ${
          open
            ? "visible [clip-path:inset(0_0_0_0)]"
            : "invisible [clip-path:inset(0_0_100%_0)]"
        }`}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 top-1/3 h-[70vh] w-px origin-top rotate-[14deg] bg-gradient-to-b from-transparent via-ember-500 to-transparent opacity-70"
        />
        <nav aria-label="Mobil menü" className="shell flex flex-1 flex-col justify-center py-8">
          <ul>
            {[{ href: "/", label: "Ana Sayfa" }, ...mainNav, { href: "/iletisim", label: "İletişim" }].map(
              (item, i) => (
                <li key={item.href} className="overflow-hidden border-b hairline">
                  <Link
                    href={item.href}
                    onClick={() => close()}
                    aria-current={
                      (item.href === "/" ? pathname === "/" : isActive(item.href)) ? "page" : undefined
                    }
                    style={{ transitionDelay: open ? `${120 + i * 55}ms` : "0ms" }}
                    className={`flex items-baseline justify-between gap-4 py-3.5 font-display text-[clamp(2.25rem,11vw,3.75rem)] font-extrabold uppercase leading-none text-bone transition-transform duration-700 ease-out-expo [font-stretch:62%] aria-[current=page]:text-ember-500 ${
                      open ? "translate-y-0" : "translate-y-full"
                    }`}
                  >
                    {item.label}
                    <span className="t-data text-ash-600">0{i + 1}</span>
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>
        <div className="shell flex items-center justify-between pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-4">
          <a
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="t-sign flex h-11 items-center text-bone"
          >
            Instagram <span className="ml-2 text-ash-500 normal-case tracking-normal">{site.instagramHandle}</span>
          </a>
        </div>
      </div>
    </>
  );
}
