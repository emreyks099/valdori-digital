"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { ensureGsap, gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * Lenis + GSAP ticker senkronu. Yalnızca ince işaretçili (masaüstü) cihazlarda ve
 * hareket tercihi açıkken çalışır; dokunmatik cihazlar yerel kaydırmayı korur.
 */
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    ensureGsap();
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    const lenis = new Lenis({ lerp: 0.11, wheelMultiplier: 1, anchors: true });
    window.__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  // Rota değişiminde ölçüler değişir: Lenis ve ScrollTrigger yeniden hesaplanır.
  useEffect(() => {
    const id = window.setTimeout(() => {
      window.__lenis?.resize();
      ScrollTrigger.refresh();
    }, 120);
    return () => window.clearTimeout(id);
  }, [pathname]);

  return null;
}

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}
