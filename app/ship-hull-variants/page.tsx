import type { Metadata } from "next";
import Link from "next/link";
import { SHIP_REF_SVG_CACHE, SITE_HULL_VARIANTS } from "@/lib/shipGalleryItems";

export const metadata: Metadata = {
  title: "וריאנטי צבע גוף — Feeder | EQS.PORT",
  description: "אותה אוניית מכולות (Feeder) עם גרדיאנט גוף שונה — לבחירת עיצוב.",
};

export default function ShipHullVariantsPage() {
  const v = SHIP_REF_SVG_CACHE;
  return (
    <div dir="rtl" lang="he" className="min-h-screen bg-[#d4d4d4] text-slate-900 pb-12">
      <div
        className="min-h-screen"
        style={{
          backgroundImage: `
            linear-gradient(45deg, #ccc 25%, transparent 25%),
            linear-gradient(-45deg, #ccc 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, #ccc 75%),
            linear-gradient(-45deg, transparent 75%, #ccc 75%)`,
          backgroundSize: "16px 16px",
          backgroundPosition: "0 0, 0 8px, 8px -8px, -8px 0",
        }}
      >
        <header className="px-4 pt-8 pb-6 text-center max-w-3xl mx-auto">
          <p className="text-xs text-slate-600 mb-2">
            <code className="bg-white/80 px-1 rounded">/ship-hull-variants</code>
          </p>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900">אותה אונייה — צבעי גוף שונים</h1>
          <p className="text-sm text-slate-600 mt-2">
            כאן מוצגים רק וריאנטי הגוף שמופיעים ברקע החי בדף הבית. דגם Feeder מכולות זהה (פנסים,
            מכ״ם, אלומות, מכולות) — משתנה רק גרדיאנט הדופן וההילה. המספרים תואמים למספור הדגם.
          </p>
          <p className="text-xs text-slate-500 mt-3">
            <Link href="/ship-gallery" className="text-sky-700 underline">
              גלריית אוניות
            </Link>
            {" · "}
            <Link href="/" className="text-sky-700 underline">
              דף הבית
            </Link>
          </p>
        </header>

        <div className="max-w-7xl mx-auto px-4 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {SITE_HULL_VARIANTS.map((item) => (
            <figure
              key={item.key}
              className="rounded-xl border border-slate-400/60 bg-white/90 shadow-sm overflow-hidden"
            >
              <figcaption className="px-4 py-3 border-b border-slate-200/90 bg-slate-50/90">
                <div className="flex items-start justify-between gap-3">
                  <span
                    className="flex h-10 min-w-[2.5rem] shrink-0 items-center justify-center rounded-lg bg-sky-700 text-lg font-bold text-white shadow-sm"
                    aria-label={`מספר וריאנט ${item.n}`}
                  >
                    {item.n}
                  </span>
                  <div className="min-w-0 flex-1 text-right">
                    <div className="font-semibold text-slate-900">{item.title}</div>
                    <div className="text-xs text-slate-600 mt-0.5">{item.note}</div>
                  </div>
                </div>
                <code className="text-[0.65rem] text-slate-500 mt-2 block break-all">
                  #{item.n} · ship-refs/{item.file}
                </code>
              </figcaption>
              <div className="relative bg-[#050810] p-3 sm:p-4">
                <div
                  className="pointer-events-none absolute inset-0 z-0 animated-grid-bg opacity-[0.92]"
                  aria-hidden
                />
                <img
                  src={`/ship-refs/${item.file}?v=${v}`}
                  alt={`#${item.n} ${item.title}`}
                  decoding="async"
                  className="relative z-10 w-full h-auto block aspect-[1580/330] max-h-[min(380px,55vh)] object-contain object-center bg-transparent"
                />
              </div>
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
}
