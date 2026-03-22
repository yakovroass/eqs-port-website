/** קטגוריות לכותרות בדף הגלריה */
export type ShipGalleryCategory = "ships" | "light" | "wake";

export const SHIP_GALLERY_SECTION_LABELS: Record<ShipGalleryCategory, string> = {
  ships: "אוניות — מבט על",
  light: "אלומות אור (דוגמאות SVG)",
  wake: "שובל אחורי במים (דוגמאות SVG)",
};

/**
 * עדכן כשמשנים SVG ב־public/ship-refs/ (גלריה, רקע חי, דפים עם object).
 *
 * איפה רואים אוניות באתר:
 * - `/` — רקע מלא: אוניות SVG (LIVE_BACKGROUND_SHIP_FILES — וריאנטי מכולות)
 * - `/ship-gallery` — כרטיס לכל פריט ב־SHIP_GALLERY_ITEMS
 * - `/ship-11-live` — אונייה 11 אחת על מסלול
 * - `/bg-demos` — אותו רקע אוניות כמו בדף הבית
 */
export const SHIP_REF_SVG_CACHE = "78";

/** מספור רציף — קבצים ב־public/ship-refs/ */
export const SHIP_GALLERY_ITEMS: {
  n: number;
  title: string;
  file: string;
  category: ShipGalleryCategory;
}[] = [
  { n: 11, title: "Feeder מכולות — מטען חלקי על הסיפון", file: "container-feeder-top.svg", category: "ships" },
  /* שוברת קרח (כתומה) הוסרה מהאתר — הקובץ נשאר ב־public/ship-refs/icebreaker-top.svg אם תרצה להחזיר */
];

/**
 * קבצי SVG לרקע החי (דף הבית / bg-demos) — וריאנטי מכולות שונים לסירובין.
 * הגלריה מציגה רק את הפריטים ב־SHIP_GALLERY_ITEMS.
 */
export const LIVE_BACKGROUND_SHIP_FILES: string[] = [
  "container-feeder-top.svg",
  "container-feeder-bg-2.svg",
  "container-feeder-bg-3.svg",
  "container-feeder-bg-4.svg",
  "container-feeder-bg-5.svg",
];
