import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";
import { decodeKnownPasswordForAdmin, encodeKnownPasswordForAdmin } from "@/lib/knownPassword";
import { presenceMapFromOpenSessions } from "@/lib/adminPresence";

export async function GET() {
  const s = await getSessionUser();
  if (!s?.user.isAdmin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const [users, openSessions] = await Promise.all([
    prisma.user.findMany({
      orderBy: { username: "asc" },
      select: {
        id: true,
        displayName: true,
        username: true,
        isAdmin: true,
        active: true,
        createdAt: true,
        knownPasswordEnc: true,
        _count: { select: { sessions: true, visitSessions: true } },
      },
    }),
    prisma.session.findMany({
      where: { endedAt: null },
      select: { userId: true, lastSeenAt: true },
    }),
  ]);
  const presence = presenceMapFromOpenSessions(openSessions);
  return NextResponse.json({
    users: users.map((u) => {
      const p = presence.get(u.id);
      return {
        id: u.id,
        displayName: u.displayName,
        username: u.username,
        isAdmin: u.isAdmin,
        active: u.active,
        createdAt: u.createdAt,
        knownPassword: decodeKnownPasswordForAdmin(u.knownPasswordEnc),
        _count: u._count,
        loggedIn: Boolean(p?.loggedIn),
        activeNow: Boolean(p?.activeNow),
        openDeviceCount: p?.openDeviceCount ?? 0,
      };
    }),
  });
}

export async function POST(request: Request) {
  const s = await getSessionUser();
  if (!s?.user.isAdmin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const body = await request.json().catch(() => ({}));
  const { username, password, isAdmin, displayName } = body as {
    username?: string;
    password?: string;
    isAdmin?: boolean;
    displayName?: string;
  };
  if (!username?.trim() || !password || password.length < 8) {
    return NextResponse.json(
      { error: "Username and password (min 8 characters) required" },
      { status: 400 }
    );
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const knownPasswordEnc = encodeKnownPasswordForAdmin(password);
  try {
    const user = await prisma.user.create({
      data: {
        username: username.trim(),
        displayName: displayName?.trim() || null,
        passwordHash,
        knownPasswordEnc,
        knownPasswordSetAt: new Date(),
        isAdmin: Boolean(isAdmin),
        active: true,
      },
      select: { id: true, displayName: true, username: true, isAdmin: true, active: true },
    });
    return NextResponse.json({ user });
  } catch {
    return NextResponse.json({ error: "Username already exists" }, { status: 409 });
  }
}
