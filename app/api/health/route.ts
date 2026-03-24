import { NextResponse } from "next/server";
import { getHealthPayload } from "@/lib/health-check";

export const dynamic = "force-dynamic";

/**
 * Lightweight DB check for production debugging (no secrets in response).
 * Open: GET /api/health — or browser-friendly GET /health
 */
export async function GET() {
  const payload = await getHealthPayload();
  const status = payload.ok ? 200 : 503;
  return NextResponse.json(payload, { status });
}
