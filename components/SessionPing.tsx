"use client";

import { useEffect } from "react";

const INTERVAL_MS = 15_000;

export default function SessionPing() {
  useEffect(() => {
    const ping = async () => {
      try {
        const res = await fetch("/api/session/ping", { method: "POST", credentials: "include" });
        // Only treat definitive auth outcomes as "signed out". 5xx (e.g. DB blip) must not
        // redirect — login page would still see /api/auth/me as logged-in → bounce / ↔ /login.
        if (res.status === 401 || res.status === 403) {
          const url = res.status === 403 ? "/login?reason=revoked" : "/login";
          window.location.replace(url);
        }
      } catch {
        // Ignore transient network errors; next interval will retry.
      }
    };
    ping();
    const id = setInterval(ping, INTERVAL_MS);
    return () => clearInterval(id);
  }, []);
  return null;
}
