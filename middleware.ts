import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE } from "@/lib/session-cookie";

function isPublicPath(pathname: string): boolean {
  if (pathname.startsWith("/_next")) return true;
  if (pathname === "/favicon.ico") return true;
  if (pathname === "/login") return true;
  if (pathname === "/health") return true;
  if (pathname === "/api/auth/login") return true;
  if (pathname === "/api/auth/me") return true;
  if (pathname === "/api/health") return true;
  if (pathname === "/api/auth/session-check") return true;
  if (pathname.startsWith("/ship-refs/")) return true;
  /* דפי הדגמה — ללא התחברות (קישורים מגלריה / פיתוח) */
  if (
    pathname === "/ship-gallery" ||
    pathname === "/ship-hull-variants" ||
    pathname === "/ship-11-live" ||
    pathname === "/ship-bridge-demos"
  ) {
    return true;
  }
  if (pathname.startsWith("/images/")) return true;
  if (pathname.startsWith("/bg-demos/")) return true;
  const staticExt = /\.(?:svg|png|jpe?g|gif|webp|ico|txt|html?|pdf|md)$/i;
  if (staticExt.test(pathname)) return true;
  if (pathname === "/robots.txt" || pathname === "/sitemap.xml") return true;
  return false;
}

function isLocalDevHost(request: NextRequest): boolean {
  const hostHeader = request.headers.get("x-forwarded-host") || request.headers.get("host") || "";
  const host = hostHeader.split(",")[0].trim().toLowerCase();
  const hostname = host.split(":")[0];
  return hostname === "localhost" || hostname === "127.0.0.1";
}

function stripTrailingSlash(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }
  return pathname;
}

export async function middleware(request: NextRequest) {
  const pathname = stripTrailingSlash(request.nextUrl.pathname);
  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }
  if (pathname === "/" && isLocalDevHost(request)) {
    return NextResponse.next();
  }

  try {
    const cookie = request.cookies.get(SESSION_COOKIE)?.value;
    if (!cookie) {
      if (pathname.startsWith("/api")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      return NextResponse.redirect(new URL("/login", request.url));
    }
    // Keep middleware lightweight: cookie gate only.
    // DB-backed user/admin checks are enforced inside route handlers/pages.
    return NextResponse.next();
  } catch (e) {
    console.error("[middleware]", e instanceof Error ? e.message : e);
    if (pathname.startsWith("/api")) {
      return NextResponse.json({ error: "Service unavailable" }, { status: 503 });
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
