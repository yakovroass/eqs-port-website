import type { Metadata } from "next";
import Link from "next/link";
import { SHIP_REF_SVG_CACHE } from "@/lib/shipGalleryItems";

export const metadata: Metadata = {
  title: "אונייה 11 — שיט חי | EQS.PORT",
  description: "Feeder מכולות על רקע הרשת החי של האתר, עם אנימציית שיט.",
};

export default function Ship11LivePage() {
  return (
    <div
      dir="rtl"
      lang="he"
      className="relative min-h-screen bg-[#050810] text-[var(--text-primary)] overflow-x-hidden"
    >
      <div
        className="animated-grid-bg fixed inset-0 z-0 pointer-events-none"
        aria-hidden
      />
      <div className="relative z-10 flex min-h-screen flex-col">
        <header className="px-4 pt-8 pb-6 text-center max-w-2xl mx-auto">
          <p className="text-xs text-[var(--text-secondary)] mb-3">
            רקע חי כמו בדף הבית · פנסים מהבהבים מהקובץ SVG
          </p>
          <h1 className="text-xl md:text-2xl font-bold gradient-text">
            אונייה 11 — Feeder מכולות (מטען חלקי)
          </h1>
          <nav className="mt-4 flex flex-wrap items-center justify-center gap-3 text-sm">
            <Link
              href="/"
              className="text-accent underline decoration-accent/40 underline-offset-2 hover:decoration-accent"
            >
              דף הבית
            </Link>
            <span className="text-[var(--text-secondary)]">·</span>
            <Link
              href="/ship-gallery"
              className="text-accent underline decoration-accent/40 underline-offset-2 hover:decoration-accent"
            >
              גלריית אוניות
            </Link>
            <span className="text-[var(--text-secondary)]">·</span>
            <Link
              href="/ship-bridge-demos"
              className="text-accent underline decoration-accent/40 underline-offset-2 hover:decoration-accent"
            >
              דוגמאות מגדל פיקוח
            </Link>
          </nav>
        </header>

        <main className="flex-1 flex flex-col items-center justify-center px-3 pb-16 w-full max-w-6xl mx-auto">
          <div
            className="relative w-full h-[min(42vh,400px)] min-h-[220px] overflow-hidden rounded-xl border border-cyan-500/25 shadow-[0_0_40px_rgba(0,168,255,0.12)] glow-border"
            aria-label="מסלול שיט"
          >
            <div className="ship-11-sail">
              <object
                type="image/svg+xml"
                data={`/ship-refs/container-feeder-top.svg?v=${SHIP_REF_SVG_CACHE}`}
                title="Feeder מכולות — אונייה 11"
                className="h-full w-full block pointer-events-none select-none"
                aria-label="אוניית מכולות עם אלומות ופנסי ניווט"
              />
            </div>
          </div>
          <p className="mt-6 text-center text-sm text-[var(--text-secondary)] max-w-md leading-relaxed">
            האנימציה חוזרת על עצמה; ברקע הרשת התכלת הנעה של האתר (
            <code className="text-xs text-sky-300/90">animated-grid-bg</code>
            ).
          </p>
        </main>
      </div>
    </div>
  );
}
