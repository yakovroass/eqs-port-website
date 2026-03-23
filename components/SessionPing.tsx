"use client";

import { useEffect } from "react";

const INTERVAL_MS = 120_000;

export default function SessionPing() {
  useEffect(() => {
    const ping = () => {
      fetch("/api/session/ping", { method: "POST", credentials: "include" }).catch(() => {});
    };
    ping();
    const id = setInterval(ping, INTERVAL_MS);
    return () => clearInterval(id);
  }, []);
  return null;
}
