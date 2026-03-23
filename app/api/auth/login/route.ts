import { NextResponse } from "next/server";
import { randomBytes } from "crypto";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { SESSION_COOKIE } from "@/lib/auth";

const MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const { username, password } = body as { username?: string; password?: string };
  if (!username?.trim() || !password) {
    return NextResponse.json({ error: "Missing credentials" }, { status: 400 });
  }
  const typed = username.trim();
  const user = await prisma.user.findFirst({
    where: {
      OR: [{ username: typed }, { username: typed.toLowerCase() }, { username: typed.toUpperCase() }],
    },
    orderBy: { createdAt: "asc" },
  });
  if (!user || !user.active) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }
  const token = randomBytes(32).toString("hex");
  await prisma.session.create({
    data: { token, userId: user.id },
  });
  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE_SECONDS,
    secure: process.env.NODE_ENV === "production",
  });
  return response;
}
