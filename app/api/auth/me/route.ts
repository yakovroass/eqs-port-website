import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const s = await getSessionUser();
    if (!s) {
      return NextResponse.json({ user: null }, { status: 401 });
    }
    return NextResponse.json({
      user: {
        id: s.user.id,
        username: s.user.username,
        isAdmin: s.user.isAdmin,
      },
    });
  } catch (e) {
    console.error("[auth/me]", e instanceof Error ? e.message : e);
    return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
  }
}
