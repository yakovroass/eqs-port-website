import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";

/** Admin only: delete all login sessions + visit rows for the current user (testing / reset). */
export async function DELETE() {
  const s = await getSessionUser();
  if (!s?.user.isAdmin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const userId = s.user.id;
  await prisma.$transaction([
    prisma.session.deleteMany({ where: { userId } }),
    prisma.visitSession.deleteMany({ where: { userId } }),
  ]);
  return NextResponse.json({ ok: true });
}
