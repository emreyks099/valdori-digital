import { ImageResponse } from "next/og";

export const alt = "Valdori Digital Studio — Tasarım göz alır. Sistem iş görür.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Paylaşım görseli: hero kompozisyonunun durağan hâli. Metin yalnızca ASCII'dir; yazı tipi bağımlılığı yoktur. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#09090B",
          color: "#F4F1EC",
          padding: 64,
          position: "relative",
        }}
      >
        <svg width="1200" height="630" viewBox="0 0 1200 630" style={{ position: "absolute", left: 0, top: 0 }}>
          <defs>
            <radialGradient id="g" cx="50%" cy="45%" r="45%">
              <stop offset="0" stopColor="#FF6828" stopOpacity="0.4" />
              <stop offset="1" stopColor="#FF6828" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="l" x1="1" x2="0">
              <stop offset="0" stopColor="#8a3210" />
              <stop offset="0.5" stopColor="#141416" />
            </linearGradient>
            <linearGradient id="r" x1="0" x2="1">
              <stop offset="0" stopColor="#8a3210" />
              <stop offset="0.5" stopColor="#141416" />
            </linearGradient>
          </defs>
          <rect width="1200" height="630" fill="url(#g)" />
          <path d="M330 -20 500 -20 590 630 440 630Z" fill="url(#l)" />
          <path d="M870 -20 700 -20 610 630 760 630Z" fill="url(#r)" />
          <rect x="598" y="-20" width="4" height="660" fill="#FF6828" />
        </svg>
        <div style={{ display: "flex", fontSize: 26, letterSpacing: 10, fontWeight: 700 }}>VALDORI</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 148, fontWeight: 800, letterSpacing: -5, lineHeight: 0.92 }}>VALDORI</div>
          <div style={{ display: "flex", fontSize: 148, fontWeight: 800, letterSpacing: -5, lineHeight: 0.92, color: "#FF6828" }}>
            DIGITAL STUDIO
          </div>
          <div style={{ display: "flex", marginTop: 28, fontSize: 28, color: "#B6B6BC" }}>valdoridigital.net</div>
        </div>
      </div>
    ),
    size,
  );
}
