import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { SESSION_COOKIE } from "@/lib/auth";
import { sessionCookieDomain, sessionCookieSecure } from "@/lib/session-cookie";
import { computeSessionDurationMs } from "@/lib/sessionDuration";

export async function POST(request: Request) {
  const token = cookies().get(SESSION_COOKIE)?.value;
  if (token) {
    const sess = await prisma.session.findFirst({
      where: { token, endedAt: null },
    });
    if (sess) {
      const endedAt = new Date();
      const durationMs = computeSessionDurationMs(sess.createdAt, sess.lastSeenAt);
      await prisma.session.update({
        where: { id: sess.id },
        data: { endedAt, durationMs },
      });
      const activeVisit = await prisma.visitSession.findFirst({
        where: { userId: sess.userId, endedAt: null },
        orderBy: { lastSeenAt: "desc" },
      });
      if (activeVisit) {
        await prisma.visitSession.update({
          where: { id: activeVisit.id },
          data: {
            endedAt,
            durationMs: computeSessionDurationMs(activeVisit.startedAt, activeVisit.lastSeenAt),
          },
        });
      }
    }
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, "", {
    httpOnly: true,
    path: "/",
    maxAge: 0,
    sameSite: "lax",
    secure: sessionCookieSecure(request),
    domain: sessionCookieDomain(request),
  });
  return res;
}
