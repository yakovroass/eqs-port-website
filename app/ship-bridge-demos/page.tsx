import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "דוגמאות מגדל פיקוח (Feeder) | EQS.PORT",
  description: "ארבע אפשרויות מבט-על למגדל הפיקוח של אונייה 11 — השוואה חזותית.",
};

const DEMOS = [
  {
    n: 1,
    title: "מקונן + קווי חלון + מכ״ם",
    desc: "ברירת המחדל על האנייה בקובץ הראשי.",
    file: "feeder-bridge-demo-1.svg",
  },
  {
    n: 2,
    title: "משושה במישור",
    desc: "קונטור משושה כפול.",
    file: "feeder-bridge-demo-2.svg",
  },
  {
    n: 3,
    title: "מינימליסטי",
    desc: "בלוק רחב + בלוק קדמי צר.",
    file: "feeder-bridge-demo-3.svg",
  },
  {
    n: 4,
    title: "מדרגה",
    desc: "בלוק תחתון רחב + גשר קדימה.",
    file: "feeder-bridge-demo-4.svg",
  },
] as const;

export default function ShipBridgeDemosPage() {
  return (
    <div
      dir="rtl"
      lang="he"
      className="min-h-screen bg-[#050810] text-[var(--text-primary)] pb-16"
    >
      <div
        className="animated-grid-bg fixed inset-0 pointer-events-none opacity-90 z-0"
        aria-hidden
      />
      <div className="relative z-10 max-w-4xl mx-auto px-4 pt-10">
        <p className="text-xs text-[var(--text-secondary)] mb-2 text-center">
          על גבי האנייה ב־<code className="text-sky-400/90">/ship-gallery</code> רואים רק{" "}
          <strong>אפשרות אחת</strong> (שאר האפשרויות מוסתרות ב־SVG עם{" "}
          <code className="text-sky-400/90">display:none</code>).
        </p>
        <h1 className="text-xl md:text-2xl font-bold text-center gradient-text mb-2">
          דוגמאות מגדל פיקוח — Feeder (מבט על)
        </h1>
        <p className="text-sm text-[var(--text-secondary)] text-center max-w-xl mx-auto mb-8 leading-relaxed">
          כאן כל ארבע האפשרויות זו לצד זו. לבחירה קבועה בקובץ האנייה ראה{" "}
          <code className="text-xs text-sky-300/90">docs/container-feeder-bridge-options.md</code>
        </p>

        <nav className="flex flex-wrap justify-center gap-3 text-sm mb-10">
          <Link href="/ship-gallery" className="text-accent underline underline-offset-2">
            גלריית אוניות
          </Link>
          <span className="text-[var(--text-secondary)]">·</span>
          <Link href="/ship-11-live" className="text-accent underline underline-offset-2">
            אונייה 11 חיה
          </Link>
          <span className="text-[var(--text-secondary)]">·</span>
          <Link href="/" className="text-accent underline underline-offset-2">
            דף הבית
          </Link>
        </nav>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {DEMOS.map((d) => (
            <figure
              key={d.n}
              className="rounded-xl border border-cyan-500/20 bg-[#0a0e18]/90 p-4 shadow-[0_0_24px_rgba(0,168,255,0.06)]"
            >
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="inline-flex items-center justify-center min-w-[2rem] h-8 rounded-lg bg-sky-600 text-white text-sm font-bold">
                  {d.n}
                </span>
                <figcaption className="text-right text-sm font-semibold text-slate-100 flex-1">
                  {d.title}
                </figcaption>
              </div>
              <div className="rounded-lg bg-[#050810] border border-slate-700/80 p-6 flex items-center justify-center min-h-[200px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/ship-refs/${d.file}?v=2`}
                  alt={d.title}
                  width={220}
                  height={220}
                  className="max-w-full h-auto w-[min(220px,70vw)]"
                />
              </div>
              <p className="mt-3 text-xs text-slate-400 text-right leading-snug">{d.desc}</p>
              <code className="block mt-2 text-[0.65rem] text-slate-500 break-all">
                ship-refs/{d.file}
              </code>
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
}
