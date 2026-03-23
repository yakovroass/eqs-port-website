import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";

export async function GET() {
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
}
