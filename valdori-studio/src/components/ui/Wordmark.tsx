/**
 * Geçici marka işareti: iki obsidyen blok ve aralarındaki kor çizgisi.
 * Resmî logo DEĞİLDİR; kurucu onaylı logo geldiğinde bu bileşen değiştirilir.
 */
export function Mark({ size = 22, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path d="M1 2h6.2l3.3 14.5V22H8.2L1 2Z" fill="currentColor" />
      <path d="M23 2h-6.2l-3.3 14.5V22h2.3L23 2Z" fill="currentColor" />
      <path d="M12 2v20" stroke="#FF6828" strokeWidth="1.6" />
    </svg>
  );
}

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Mark />
      <span
        className="font-display text-[0.9375rem] font-bold uppercase leading-none tracking-[0.16em]"
        style={{ fontStretch: "125%" }}
      >
        Valdori
      </span>
    </span>
  );
}
