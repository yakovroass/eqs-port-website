"use client";

import {
  IconCarCrane,
  IconCarCraneFilled,
  IconCrane,
  IconForklift,
  IconTruck,
  IconTruckLoading,
} from "@tabler/icons-react";

/**
 * דף עזר: אייקונים מ־@tabler/icons-react (MIT) לבחירה לשלב 1 ב־FutureTargets.
 * פתח: /crane-icons
 */
const OPTIONS = [
  { id: "car-crane", label: "IconCarCrane — מנוף על משאית (נייד)", Icon: IconCarCrane },
  { id: "crane", label: "IconCrane — מנוף צריח / זרוע", Icon: IconCrane },
  { id: "car-crane-filled", label: "IconCarCraneFilled — מנוף על משאית (מלא)", Icon: IconCarCraneFilled },
  { id: "forklift", label: "IconForklift — מלגזה", Icon: IconForklift },
  { id: "truck", label: "IconTruck — משאית", Icon: IconTruck },
  { id: "truck-loading", label: "IconTruckLoading — משאית + מטען", Icon: IconTruckLoading },
] as const;

export default function CraneIconsPickerPage() {
  return (
    <div className="min-h-screen bg-[#050810] text-white p-6 md:p-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-2">אייקונים לבחירה (Tabler Icons)</h1>
        <p className="text-gray-400 text-sm mb-2">
          כל האייקונים מספריית <code className="text-accent">@tabler/icons-react</code> — אותו מקור כמו באתר.
        </p>
        <p className="text-gray-500 text-xs mb-8">
          כתוב בצ׳אט את ה־id (למשל <code className="text-gray-300">car-crane</code>) כדי לעדכן את{" "}
          <code className="text-gray-300">FutureTargets</code>.
        </p>
        <div className="space-y-3">
          {OPTIONS.map(({ id, label, Icon }) => (
            <div
              key={id}
              className="flex items-center gap-4 rounded-xl border border-gray-700/30 bg-[rgb(10_18_36/0.35)] backdrop-blur-md px-4 py-3"
            >
              <div className="shrink-0 w-14 h-14 rounded-lg bg-white/5 flex items-center justify-center text-cyan-300">
                <Icon className="w-9 h-9" stroke={1.5} />
              </div>
              <div className="min-w-0">
                <div className="font-mono text-amber-400/90 text-sm">{id}</div>
                <div className="text-gray-300 text-sm">{label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
