import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { SESSION_COOKIE } from "@/lib/auth";
import { computeSessionDurationMs } from "@/lib/sessionDuration";

export async function POST() {
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
    }
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, "", {
    httpOnly: true,
    path: "/",
    maxAge: 0,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
  return res;
}
