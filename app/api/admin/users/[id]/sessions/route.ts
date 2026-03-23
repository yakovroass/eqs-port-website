import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";
import { computeSessionDurationMs, formatDurationHe } from "@/lib/sessionDuration";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const s = await getSessionUser();
  if (!s?.user.isAdmin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const { id: userId } = params;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, username: true },
  });
  if (!user) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const totalLogins = await prisma.session.count({ where: { userId } });

  const rows = await prisma.session.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 100,
    select: {
      id: true,
      createdAt: true,
      lastSeenAt: true,
      endedAt: true,
      durationMs: true,
    },
  });

  const sessions = rows.map((row) => {
    const ended = Boolean(row.endedAt);
    const stored = row.durationMs;
    const computed =
      stored ??
      (ended ? computeSessionDurationMs(row.createdAt, row.lastSeenAt) : null);
    const activeApproxMs = !ended
      ? computeSessionDurationMs(row.createdAt, row.lastSeenAt)
      : null;
    const displayMs = computed ?? activeApproxMs ?? 0;

    return {
      id: row.id,
      loginAt: row.createdAt.toISOString(),
      lastSeenAt: row.lastSeenAt.toISOString(),
      endedAt: row.endedAt?.toISOString() ?? null,
      ended,
      durationMs: stored,
      durationLabel: formatDurationHe(displayMs),
      note: ended
        ? "סשן נסגר (התנתקות או ביטול). משך לפי פעילות אחרונה מדווחת."
        : "סשן פעיל. משך משוער לפי ping אחרון.",
    };
  });

  return NextResponse.json({
    username: user.username,
    totalLogins,
    sessions,
  });
}
