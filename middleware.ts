import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * קישור מ-WhatsApp/אפליקציות לפעמים מציג מטמון ישן גם עם Cache-Control.
 * הפניה מ-/ ל-/?_=timestamp גורמת לכל פתיחה להיחשב ככתובת חדשה → טעינה עדכנית.
 */
export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  if (pathname === "/" && !searchParams.has("_")) {
    const url = request.nextUrl.clone();
    url.searchParams.set("_", String(Date.now()));
    const res = NextResponse.redirect(url, 302);
    res.headers.set("Cache-Control", "no-store, no-cache, must-revalidate");
    return res;
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/",
};
