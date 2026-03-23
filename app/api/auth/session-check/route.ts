import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { SESSION_COOKIE } from "@/lib/auth";

export async function GET() {
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
}
