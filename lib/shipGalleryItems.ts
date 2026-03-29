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
 * - `/ship-hull-variants` — רק וריאנטי גוף שמופיעים ברקע החי (SITE_HULL_VARIANTS)
 */
export const SHIP_REF_SVG_CACHE = "85";

/** וריאנטי Feeder שמוצגים באתר (רקע חי + דף `/ship-hull-variants`). סדר התצוגה כמו ברקע. */
export const SITE_HULL_VARIANTS: readonly {
  n: number;
  key: string;
  file: string;
  title: string;
  note: string;
}[] = [
  { n: 7, key: "copper", file: "container-feeder-hull-copper.svg", title: "נחושת / ברונזה", note: "מתכת חמה, הילה כתומה־זהובה" },
  { n: 10, key: "crimson", file: "container-feeder-hull-crimson.svg", title: "אדום עמוק (Crimson)", note: "אדום תעשייתי, הילה אדומה" },
  { n: 11, key: "arctic", file: "container-feeder-hull-arctic.svg", title: "ארקטי / קרח", note: "כחול־אפור בהיר, הילה כמעט לבנה" },
];

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
 * קבצי SVG לרקע החי (דף הבית / bg-demos) — זהה לסדר `SITE_HULL_VARIANTS`.
 * בכל קובץ — משכי אנימציה שונים (פנסים / מכ״ם) כדי שלא יסתנכרנו בין אוניות.
 */
export const LIVE_BACKGROUND_SHIP_FILES: string[] = SITE_HULL_VARIANTS.map((item) => item.file);
