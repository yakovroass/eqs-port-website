import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE } from "@/lib/session-cookie";

function isPublicPath(pathname: string): boolean {
  if (pathname.startsWith("/_next")) return true;
  if (pathname === "/favicon.ico") return true;
  if (pathname === "/login") return true;
  if (pathname === "/health") return true;
  if (pathname === "/api/auth/login") return true;
  if (pathname === "/api/health") return true;
  if (pathname === "/api/auth/session-check") return true;
  if (pathname.startsWith("/ship-refs/")) return true;
  if (pathname.startsWith("/images/")) return true;
  if (pathname.startsWith("/bg-demos/")) return true;
  const staticExt = /\.(?:svg|png|jpe?g|gif|webp|ico|txt|html?|pdf|md)$/i;
  if (staticExt.test(pathname)) return true;
  if (pathname === "/robots.txt" || pathname === "/sitemap.xml") return true;
  return false;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }

  const cookie = request.cookies.get(SESSION_COOKIE)?.value;
  if (!cookie) {
    if (pathname.startsWith("/api")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const verifyUrl = new URL("/api/auth/session-check", request.url);
  const res = await fetch(verifyUrl, {
    headers: { cookie: request.headers.get("cookie") || "" },
    cache: "no-store",
  });

  if (!res.ok) {
    if (pathname.startsWith("/api")) {
      return NextResponse.json(
        { error: res.status === 403 ? "Access revoked" : "Unauthorized" },
        { status: res.status === 403 ? 403 : 401 }
      );
    }
    const login = new URL("/login", request.url);
    if (res.status === 403) {
      login.searchParams.set("reason", "revoked");
    }
    return NextResponse.redirect(login);
  }

  const data = (await res.json()) as { ok?: boolean; isAdmin?: boolean };
  const needsAdmin = pathname.startsWith("/admin") || pathname.startsWith("/api/admin");
  if (needsAdmin && !data.isAdmin) {
    if (pathname.startsWith("/api")) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
