import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";
import AdminUserPanel, { type UserRow } from "./AdminUserPanel";

export default async function AdminUsersPage() {
  const s = await getSessionUser();
  if (!s?.user.isAdmin) redirect("/");

  const rows = await prisma.user.findMany({
    orderBy: { username: "asc" },
    select: {
      id: true,
      displayName: true,
      username: true,
      isAdmin: true,
      active: true,
      createdAt: true,
      _count: { select: { sessions: true, visitSessions: true } },
    },
  });

  const users: UserRow[] = rows.map((u) => ({
    id: u.id,
    displayName: u.displayName,
    username: u.username,
    isAdmin: u.isAdmin,
    active: u.active,
    createdAt: u.createdAt.toISOString(),
    loginCount: u._count.sessions,
    visitCount: u._count.visitSessions,
  }));

  return (
    <div className="min-h-screen bg-[#050810] text-gray-100 p-6" dir="rtl">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold text-white mb-6 text-right">ניהול גישה</h1>
        <AdminUserPanel users={users} currentUserId={s.user.id} />
      </div>
    </div>
  );
}
