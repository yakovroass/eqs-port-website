import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * קישור מ-WhatsApp/אפליקציות לפעמים מציג מטמון ישן גם עם Cache-Control.
 * הפניה מ-/ ל-/?_=timestamp גורמת לכל פתיחה להיחשב ככתובת חדשה → טעינה עדכנית.
 */
export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const base = request.nextUrl.origin;

  // /go — קישור לשליחה: כל פתיחה פוגשת את השרת, תמיד גרסה עדכנית (גם מ-WhatsApp)
  if (pathname === "/go") {
    const url = new URL("/?_=" + Date.now(), base);
    const res = NextResponse.redirect(url, 307);
    res.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0");
    res.headers.set("Pragma", "no-cache");
    res.headers.set("Expires", "0");
    return res;
  }

  if (pathname === "/" && !searchParams.has("_")) {
    const url = request.nextUrl.clone();
    url.searchParams.set("_", String(Date.now()));
    const res = NextResponse.redirect(url, 307);
    res.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0");
    res.headers.set("Pragma", "no-cache");
    res.headers.set("Expires", "0");
    return res;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/go"],
};
