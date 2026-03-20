import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "EQS. PORT — Industrial Trade Platform";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * תמונת תצוגה מקדימה (WhatsApp / Instagram / LinkedIn וכו').
 * משחזר את מראה הלוגו מ־public/logo.svg על רקע כהה כמו האתר.
 */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#050810",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "baseline",
            letterSpacing: "-0.02em",
          }}
        >
          <span
            style={{
              fontSize: 132,
              fontWeight: 800,
              fontFamily:
                'ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif',
              color: "#00a8ff",
            }}
          >
            eqs.
          </span>
          <span
            style={{
              fontSize: 132,
              fontWeight: 800,
              fontFamily:
                'ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif',
              color: "#00e5ff",
            }}
          >
            port
          </span>
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 38,
            fontWeight: 600,
            color: "#a8b4cc",
            fontFamily:
              'ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif',
          }}
        >
          Industrial Trade Platform
        </div>
      </div>
    ),
    { ...size },
  );
}
