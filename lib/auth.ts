import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { SESSION_COOKIE } from "@/lib/session-cookie";

export { SESSION_COOKIE };

export async function getSessionUser() {
  try {
    const token = cookies().get(SESSION_COOKIE)?.value;
    if (!token) return null;
    const session = await prisma.session.findUnique({
      where: { token },
      include: { user: true },
    });
    if (!session || session.endedAt || !session.user.active) return null;
    return { session, user: session.user };
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    if (msg.includes("Dynamic server usage")) {
      throw e;
    }
    console.error("[getSessionUser]", msg);
    return null;
  }
}
