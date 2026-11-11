"use client";

import { useEffect, useRef, useState } from "react";

/**
 * WebGL sahnesini tarayıcı boşta kaldığında yükler. three.js ilk yük paketine girmez;
 * sahne gelene kadar (ya da WebGL yoksa) altındaki SVG kompozisyon görünür.
 */
export function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let dispose: (() => void) | undefined;
    let cancelled = false;

    const boot = async () => {
      try {
        const { mountHeroScene } = await import("./heroScene");
        if (cancelled) return;
        dispose = mountHeroScene(canvas, {
          reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
          compact: window.innerWidth < 768,
          onReady: () => setReady(true),
        });
      } catch {
        // WebGL kullanılamıyor: statik kompozisyon yerinde kalır.
      }
    };

    const hasIdle = typeof window.requestIdleCallback === "function";
    const idle = hasIdle
      ? window.requestIdleCallback(boot, { timeout: 1200 })
      : window.setTimeout(boot, 200);

    return () => {
      cancelled = true;
      if (hasIdle) window.cancelIdleCallback(idle);
      else window.clearTimeout(idle);
      dispose?.();
      setReady(false);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`absolute inset-0 size-full transition-opacity duration-[1400ms] ease-out ${
        ready ? "opacity-100" : "opacity-0"
      }`}
    />
  );
}
