import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

/**
 * Lightweight DB check for production debugging (no secrets in response).
 * Open: GET /api/health
 */
export async function GET() {
  const configured = Boolean(process.env.DATABASE_URL?.trim());
  if (!configured) {
    return NextResponse.json(
      {
        ok: false,
        database: { configured: false, reachable: false },
      },
      { status: 503 }
    );
  }
  try {
    await prisma.$queryRaw`SELECT 1`;
    return NextResponse.json({
      ok: true,
      database: { configured: true, reachable: true },
    });
  } catch (e) {
    console.error("[health]", e instanceof Error ? e.message : e);
    return NextResponse.json(
      {
        ok: false,
        database: { configured: true, reachable: false },
      },
      { status: 503 }
    );
  }
}
