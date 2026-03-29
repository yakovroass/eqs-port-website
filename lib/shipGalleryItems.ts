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
 * - `/ship-hull-variants` — כל וריאנטי הגוף לבחירה (`ALL_HULL_VARIANTS`); ברקע החי רק `SITE_HULL_VARIANTS`
 */
export const SHIP_REF_SVG_CACHE = "95";

/** מטא־דאטה לדף `/ship-hull-variants` — כל הצבעים והדגם המקורי (לבחירתך מול הרקע החי). */
export type HullVariantMeta = {
  n: number;
  key: string;
  file: string;
  title: string;
  note: string;
};

export const ALL_HULL_VARIANTS: readonly HullVariantMeta[] = [
  { n: 1, key: "original", file: "container-feeder-top.svg", title: "מקורי — כחול־פלדה", note: "הדגם הבסיסי כמו בגלריה (מס׳ 11)" },
  { n: 2, key: "teal", file: "container-feeder-hull-teal.svg", title: "ירוק־כחול (Teal)", note: "גוף ירוק־ים, הילה תואמת" },
  { n: 3, key: "burgundy", file: "container-feeder-hull-burgundy.svg", title: "בורגונדי / אדום־חום", note: "גוף חם, הילה ורודה־מעומעמת" },
  { n: 4, key: "sand", file: "container-feeder-hull-sand.svg", title: "חול / חאקי תעשייתי", note: "גוף חום־חול, הילה חמה" },
  { n: 5, key: "charcoal", file: "container-feeder-hull-charcoal.svg", title: "פחם / אפור מתכת", note: "גוף אפור־כהה תעשייתי" },
  { n: 6, key: "navy", file: "container-feeder-hull-navy.svg", title: "כחול צי (Navy)", note: "כחול עמוק, הילה כחולה" },
  { n: 7, key: "copper", file: "container-feeder-hull-copper.svg", title: "נחושת / ברונזה", note: "מתכת חמה, הילה כתומה־זהובה" },
  { n: 8, key: "forest", file: "container-feeder-hull-forest.svg", title: "ירוק יער", note: "ירוק עמוק, הילה ירוקה רכה" },
  { n: 9, key: "violet", file: "container-feeder-hull-violet.svg", title: "סגול (Violet)", note: "סגול עשיר, הילה סגולה" },
  { n: 10, key: "crimson", file: "container-feeder-hull-crimson.svg", title: "אדום עמוק (Crimson)", note: "אדום תעשייתי, הילה אדומה" },
  { n: 11, key: "arctic", file: "container-feeder-hull-arctic.svg", title: "ארקטי / קרח", note: "כחול־אפור בהיר, הילה כמעט לבנה" },
  { n: 12, key: "amber", file: "container-feeder-hull-amber.svg", title: "ענבר / זהב", note: "צהוב־חום מתכתי, הילה זהובה" },
  { n: 13, key: "lilac", file: "container-feeder-hull-lilac.svg", title: "לילך / אפור־סגול", note: "סגול אפור רך, הילה לילך" },
];

/** רקע חי: 1 מקורי, 11 ארקטי, 7 נחושת */
export const SITE_HULL_VARIANTS: readonly HullVariantMeta[] = [
  { n: 1, key: "original", file: "container-feeder-top.svg", title: "מקורי — כחול־פלדה", note: "הדגם הבסיסי כמו בגלריה (מס׳ 11)" },
  { n: 11, key: "arctic", file: "container-feeder-hull-arctic.svg", title: "ארקטי / קרח", note: "כחול־אפור בהיר, הילה כמעט לבנה" },
  { n: 7, key: "copper", file: "container-feeder-hull-copper.svg", title: "נחושת / ברונזה", note: "מתכת חמה, הילה כתומה־זהובה" },
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
