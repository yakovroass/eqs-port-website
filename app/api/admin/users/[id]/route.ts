import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";
import { computeSessionDurationMs } from "@/lib/sessionDuration";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const s = await getSessionUser();
  if (!s?.user.isAdmin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const { id } = params;
  const body = await request.json().catch(() => ({}));
  const { password, username: newUsername, displayName, active } = body as {
    password?: string;
    username?: string;
    displayName?: string;
    active?: boolean;
  };

  const target = await prisma.user.findUnique({ where: { id } });
  if (!target) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  let did = false;

  if (password !== undefined) {
    if (typeof password !== "string" || password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    await prisma.user.update({ where: { id }, data: { passwordHash } });
    did = true;
  }

  if (newUsername !== undefined) {
    if (id === s.user.id) {
      return NextResponse.json(
        { error: "Change your own username only from the admin card above" },
        { status: 400 }
      );
    }
    const trimmed = typeof newUsername === "string" ? newUsername.trim() : "";
    if (!trimmed) {
      return NextResponse.json({ error: "Invalid username" }, { status: 400 });
    }
    const taken = await prisma.user.findFirst({
      where: { username: trimmed, NOT: { id } },
    });
    if (taken) {
      return NextResponse.json({ error: "Username already taken" }, { status: 409 });
    }
    await prisma.user.update({ where: { id }, data: { username: trimmed } });
    did = true;
  }

  if (displayName !== undefined) {
    if (id === s.user.id) {
      return NextResponse.json(
        { error: "Change your own name only from the admin card above" },
        { status: 400 }
      );
    }
    await prisma.user.update({
      where: { id },
      data: {
        ...(displayName !== undefined ? { displayName: displayName?.trim() || null } : {}),
      },
    });
    did = true;
  }

  if (active !== undefined) {
    if (typeof active !== "boolean") {
      return NextResponse.json({ error: "Invalid active flag" }, { status: 400 });
    }
    if (active === false && id === s.user.id) {
      return NextResponse.json({ error: "Cannot deactivate yourself" }, { status: 400 });
    }
    if (active === false) {
      const now = new Date();
      await prisma.$transaction(async (tx) => {
        const open = await tx.session.findMany({ where: { userId: id, endedAt: null } });
        for (const sess of open) {
          await tx.session.update({
            where: { id: sess.id },
            data: {
              endedAt: now,
              durationMs: computeSessionDurationMs(sess.createdAt, sess.lastSeenAt),
            },
          });
        }
        await tx.user.update({ where: { id }, data: { active: false } });
      });
    } else {
      await prisma.user.update({ where: { id }, data: { active: true } });
    }
    did = true;
  }

  if (!did) {
    return NextResponse.json({ error: "Nothing to update" }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const s = await getSessionUser();
  if (!s?.user.isAdmin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const { id } = params;
  if (id === s.user.id) {
    return NextResponse.json({ error: "Cannot delete yourself" }, { status: 400 });
  }
  const target = await prisma.user.findUnique({ where: { id } });
  if (!target) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  await prisma.user.delete({ where: { id } });
  return NextResponse.json({ ok: true, deleted: true });
}
