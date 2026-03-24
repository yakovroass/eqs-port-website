import { NextResponse } from "next/server";
import { randomBytes } from "crypto";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { SESSION_COOKIE } from "@/lib/auth";
import { sessionCookieDomain, sessionCookieSecure } from "@/lib/session-cookie";
import { computeSessionDurationMs } from "@/lib/sessionDuration";

const MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { username, password } = body as { username?: string; password?: string };
    const typed = username?.trim() ?? "";
    const pass = typeof password === "string" ? password.trim() : "";
    if (!typed || !pass) {
      return NextResponse.json(
        { error: "Missing credentials", code: "MISSING_CREDENTIALS" },
        { status: 400 }
      );
    }
    const candidates = await prisma.user.findMany({
      where: {
        username: { equals: typed, mode: "insensitive" },
        active: true,
      },
    });
    let user: (typeof candidates)[0] | null = null;
    for (const u of candidates) {
      try {
        if (await bcrypt.compare(pass, u.passwordHash)) {
          user = u;
          break;
        }
      } catch {
        /* invalid hash format */
      }
    }
    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials", code: "INVALID_CREDENTIALS" },
        { status: 401 }
      );
    }
    const token = randomBytes(32).toString("hex");
    await prisma.session.create({
      data: { token, userId: user.id },
    });
    const now = new Date();
    const activeVisit = await prisma.visitSession.findFirst({
      where: { userId: user.id, endedAt: null },
      orderBy: { lastSeenAt: "desc" },
    });
    if (activeVisit) {
      await prisma.visitSession.update({
        where: { id: activeVisit.id },
        data: {
          endedAt: now,
          durationMs: computeSessionDurationMs(activeVisit.startedAt, activeVisit.lastSeenAt),
        },
      });
    }
    await prisma.visitSession.create({
      data: { userId: user.id, startedAt: now, lastSeenAt: now },
    });
    const response = NextResponse.json({ ok: true });
    response.cookies.set(SESSION_COOKIE, token, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: MAX_AGE_SECONDS,
      secure: sessionCookieSecure(request),
      domain: sessionCookieDomain(request),
    });
    return response;
  } catch (e) {
    console.error("[auth/login]", e instanceof Error ? e.message : e);
    return NextResponse.json(
      { error: "Database unavailable", code: "DB_UNAVAILABLE" },
      { status: 503 }
    );
  }
}
