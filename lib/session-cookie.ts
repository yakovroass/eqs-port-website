/** HttpOnly session token cookie (opaque DB id). */
export const SESSION_COOKIE = "eqs_session";

/** Amplify / proxies often terminate TLS; use forwarded proto so Secure cookies work. */
export function sessionCookieSecure(request: Request): boolean {
  const fwd = request.headers.get("x-forwarded-proto");
  if (fwd) {
    return fwd.split(",")[0].trim().toLowerCase() === "https";
  }
  if (request.headers.get("x-forwarded-ssl") === "on") return true;
  try {
    return new URL(request.url).protocol === "https:";
  } catch {
    return false;
  }
}

/** Share session across eqsport.io and www.eqsport.io. */
export function sessionCookieDomain(request: Request): string | undefined {
  const hostHeader = request.headers.get("x-forwarded-host") || request.headers.get("host");
  const host = hostHeader?.split(",")[0].trim().toLowerCase();
  if (!host) return undefined;
  const hostname = host.split(":")[0];
  if (hostname === "eqsport.io" || hostname.endsWith(".eqsport.io")) {
    return ".eqsport.io";
  }
  return undefined;
}
