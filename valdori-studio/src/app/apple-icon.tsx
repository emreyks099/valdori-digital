import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#09090B" }}>
        <svg width="180" height="180" viewBox="0 0 64 64">
          <path d="M9 12h14.5l7 31v9h-4.6L9 12Z" fill="#F4F1EC" />
          <path d="M55 12H40.5l-7 31v9h4.6L55 12Z" fill="#F4F1EC" />
          <path d="M32 10v44" stroke="#FF6828" strokeWidth="3" />
        </svg>
      </div>
    ),
    size,
  );
}
