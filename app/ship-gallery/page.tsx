import type { Metadata } from "next";
import Link from "next/link";
import { Fragment } from "react";
import {
  SHIP_GALLERY_ITEMS,
  SHIP_GALLERY_SECTION_LABELS,
  SHIP_REF_SVG_CACHE,
  type ShipGalleryCategory,
} from "@/lib/shipGalleryItems";

const GALLERY_CATEGORY_ORDER: ShipGalleryCategory[] = ["ships"];

export const metadata: Metadata = {
  title: "גלריית אוניות | EQS.PORT",
  description: "גלריית אוניות במבט על — פנסים, אלומות והילה כמו אונייה 11.",
};

export default function ShipGalleryPage() {
  return (
    <div dir="rtl" lang="he" className="min-h-screen bg-[#d4d4d4] text-slate-900 pb-10">
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
        <header className="px-4 pt-8 pb-4 text-center max-w-3xl mx-auto">
          <p className="text-xs text-slate-600 mb-2">
            <code className="bg-white/80 px-1 rounded">npm run dev</code> → <strong>/ship-gallery</strong>
          </p>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900">גלריית אוניות — מבט על</h1>
          <p className="text-sm text-slate-600 mt-2">
            דגם אונייה 11 (Feeder מכולות). רקע חי מהאתר בתוך הכרטיס, אלומות לבנות ופנסים מהבהבים.
            שוברת הקרח (כתומה) הוסרה מהגלריה והרקע.
          </p>
          <p className="text-xs text-slate-500 mt-2">
            <Link href="/" className="text-sky-700 underline">
              דף הבית
            </Link>
            {" · "}
            <Link href="/ship-11-live" className="text-sky-700 underline">
              אונייה 11 — שיט חי
            </Link>
            {" · "}
            <Link href="/ship-bridge-demos" className="text-sky-700 underline">
              דוגמאות מגדל פיקוח
            </Link>
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 px-3 max-w-[1400px] mx-auto">
          {GALLERY_CATEGORY_ORDER.map((category, catIdx) => (
            <Fragment key={category}>
              <h2
                className={`col-span-full text-right text-base md:text-lg font-bold text-slate-800 border-b border-slate-300/80 pb-2 ${
                  catIdx === 0 ? "mt-0" : "mt-8"
                }`}
              >
                {SHIP_GALLERY_SECTION_LABELS[category]}
              </h2>
              {SHIP_GALLERY_ITEMS.filter((item) => item.category === category).map((item) => (
                <figure
                  key={item.n}
                  className="bg-white/90 rounded-xl border border-black/5 p-3 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="inline-flex items-center justify-center min-w-[2.25rem] h-9 rounded-lg bg-sky-600 text-white font-bold text-sm">
                      {item.n}
                    </span>
                    <figcaption className="text-right text-sm font-semibold text-slate-800 leading-snug flex-1">
                      {item.title}
                    </figcaption>
                  </div>
                  <div className="relative rounded-lg overflow-hidden border border-cyan-500/25 bg-[#050810] p-3 shadow-[0_0_28px_rgba(0,168,255,0.08)]">
                    <div
                      className="pointer-events-none absolute inset-0 z-0 animated-grid-bg opacity-[0.92]"
                      aria-hidden
                    />
                    <object
                      type="image/svg+xml"
                      data={`/ship-refs/${item.file}?v=${SHIP_REF_SVG_CACHE}`}
                      title={`דוגמה ${item.n}: ${item.title}`}
                      className="relative z-10 w-full block aspect-[1580/330] max-h-[min(420px,60vh)]"
                      aria-label={`דוגמה ${item.n}: ${item.title}`}
                    />
                  </div>
                  <code className="block mt-2 text-[0.65rem] text-slate-500 break-all">
                    ship-refs/{item.file}
                  </code>
                </figure>
              ))}
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
