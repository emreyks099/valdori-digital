"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { ensureGsap, gsap, MQ, SplitText, useGSAP } from "@/lib/gsap";

/**
 * Hareket sözlüğü. Her bileşenin dinlenme durumu görünürdür: JS çalışmazsa ya da
 * kullanıcı azaltılmış hareket istiyorsa içerik olduğu gibi okunur.
 */

type BaseProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  delay?: number;
};

/** Satır satır maskeden yükselen başlık */
export function SplitLines({ children, className, as: Tag = "div", delay = 0 }: BaseProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      ensureGsap();
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        let split: SplitText | undefined;
        let killed = false;
        document.fonts.ready.then(() => {
          if (killed) return;
          split = SplitText.create(el, {
            type: "lines",
            mask: "lines",
            linesClass: "split-line",
            autoSplit: true,
            aria: "none",
            onSplit: (self) =>
              gsap.from(self.lines, {
                yPercent: 108,
                duration: 1.15,
                ease: "expo.out",
                stagger: 0.085,
                delay,
                scrollTrigger: { trigger: el, start: "top 88%", once: true },
              }),
          });
        });
        return () => {
          killed = true;
          split?.revert();
        };
      });
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}

/** Yumuşak belirme — yalnızca destekleyici içerik için */
export function Fade({
  children,
  className,
  as: Tag = "div",
  delay = 0,
  y = 28,
  stagger,
}: BaseProps & { y?: number; stagger?: number }) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      ensureGsap();
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const targets = stagger ? Array.from(el.children) : el;
        gsap.from(targets, {
          opacity: 0, // visibility değil: gizliyken de klavye odağı alabilsin
          y,
          duration: 1,
          ease: "power3.out",
          delay,
          stagger: stagger ?? 0,
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}

/** Kaydırma hızında okunan metin: sözcükler ışık geçtikçe aydınlanır */
export function ScrubWords({ children, className, as: Tag = "p" }: BaseProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      ensureGsap();
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        let split: SplitText | undefined;
        let killed = false;
        document.fonts.ready.then(() => {
          if (killed) return;
          split = SplitText.create(el, {
            type: "words",
            autoSplit: true,
            aria: "none",
            onSplit: (self) =>
              gsap.fromTo(
                self.words,
                { opacity: 0.3 },
                {
                  opacity: 1,
                  ease: "none",
                  stagger: 0.08,
                  scrollTrigger: {
                    trigger: el,
                    start: "top 78%",
                    end: "bottom 45%",
                    scrub: 0.6,
                  },
                },
              ),
          });
        });
        return () => {
          killed = true;
          split?.revert();
        };
      });
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}

/** Çizgi: soldan sağa çizilir */
export function DrawLine({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      ensureGsap();
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.from(ref.current, {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 1.4,
          ease: "expo.inOut",
          scrollTrigger: { trigger: ref.current, start: "top 92%", once: true },
        });
      });
    },
    { scope: ref },
  );

  return <div ref={ref} aria-hidden="true" className={`h-px w-full bg-bone/15 ${className}`} />;
}

/** Katman paralaksı — yalnızca masaüstü */
export function Parallax({
  children,
  className,
  speed = 0.15,
}: {
  children: ReactNode;
  className?: string;
  speed?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      ensureGsap();
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MQ.desktopMotion, () => {
        gsap.fromTo(
          el,
          { yPercent: -speed * 100 },
          {
            yPercent: speed * 100,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
