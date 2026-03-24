import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { SESSION_COOKIE } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const token = cookies().get(SESSION_COOKIE)?.value;
    if (!token) {
      return NextResponse.json({ ok: false }, { status: 401 });
    }
    const session = await prisma.session.findUnique({
      where: { token },
      include: { user: true },
    });
    if (!session || session.endedAt) {
      return NextResponse.json({ ok: false }, { status: 401 });
    }
    if (!session.user.active) {
      return NextResponse.json({ ok: false, code: "REVOKED" }, { status: 403 });
    }
    return NextResponse.json({
      ok: true,
      userId: session.userId,
      isAdmin: session.user.isAdmin,
    });
  } catch (e) {
    console.error("[auth/session-check]", e instanceof Error ? e.message : e);
    return NextResponse.json({ ok: false, error: "Database unavailable" }, { status: 503 });
  }
}
