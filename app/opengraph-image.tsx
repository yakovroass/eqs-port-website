import { ImageResponse } from "next/og";

export const runtime = "edge";
export const contentType = "image/png";
export const size = { width: 1200, height: 630 };
export const alt = "EQS. PORT logo";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#050810",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            fontFamily: 'Inter, system-ui, -apple-system, "Segoe UI", sans-serif',
            fontWeight: 800,
            fontSize: 160,
            letterSpacing: "-0.03em",
          }}
        >
          <span style={{ color: "#00a8ff" }}>eqs.</span>
          <span style={{ color: "#00e5ff" }}>port</span>
        </div>
      </div>
    ),
    size,
  );
}
