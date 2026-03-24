import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { SESSION_COOKIE } from "@/lib/auth";
import { computeSessionDurationMs } from "@/lib/sessionDuration";

export const dynamic = "force-dynamic";
const VISIT_IDLE_MS = 20 * 60 * 1000;

export async function POST() {
  try {
    const token = cookies().get(SESSION_COOKIE)?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const session = await prisma.session.findUnique({
      where: { token },
      include: { user: true },
    });
    if (!session || session.endedAt || !session.user.active) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const now = new Date();
    await prisma.session.update({
      where: { id: session.id },
      data: { lastSeenAt: now },
    });

    const activeVisit = await prisma.visitSession.findFirst({
      where: { userId: session.userId, endedAt: null },
      orderBy: { lastSeenAt: "desc" },
    });
    if (!activeVisit) {
      await prisma.visitSession.create({
        data: { userId: session.userId, startedAt: now, lastSeenAt: now },
      });
    } else {
      const idleForMs = now.getTime() - activeVisit.lastSeenAt.getTime();
      if (idleForMs > VISIT_IDLE_MS) {
        const endedAt = now;
        const durationMs = computeSessionDurationMs(activeVisit.startedAt, activeVisit.lastSeenAt);
        await prisma.visitSession.update({
          where: { id: activeVisit.id },
          data: { endedAt, durationMs },
        });
        await prisma.visitSession.create({
          data: { userId: session.userId, startedAt: now, lastSeenAt: now },
        });
      } else {
        await prisma.visitSession.update({
          where: { id: activeVisit.id },
          data: { lastSeenAt: now },
        });
      }
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[session/ping]", e instanceof Error ? e.message : e);
    return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
  }
}
