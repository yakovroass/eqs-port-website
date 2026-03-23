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
