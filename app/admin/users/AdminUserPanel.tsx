"use client";

import { Fragment, useCallback, useEffect, useState } from "react";
import Link from "next/link";
import PasswordField from "@/components/PasswordField";

export type UserRow = {
  id: string;
  displayName: string | null;
  username: string;
  isAdmin: boolean;
  active: boolean;
  createdAt: string;
  loginCount: number;
};

type SessionRow = {
  id: string;
  loginAt: string;
  lastSeenAt: string;
  endedAt: string | null;
  ended: boolean;
  durationLabel: string;
  note: string;
};

function SessionPackTable({ pack }: { pack: { totalLogins: number; sessions: SessionRow[] } }) {
  return (
    <div className="space-y-3">
      <p className="text-xs text-gray-500">
        סה״כ סשנים (כניסות): <strong className="text-gray-300">{pack.totalLogins}</strong>
        {pack.totalLogins > pack.sessions.length && (
          <span> — מוצגים {pack.sessions.length} האחרונים</span>
        )}
      </p>
      <div className="overflow-x-auto rounded-lg border border-gray-700/50">
        <table className="w-full text-xs text-right min-w-[36rem]">
          <thead className="bg-black/40 text-gray-500">
            <tr>
              <th className="px-2 py-1.5">כניסה</th>
              <th className="px-2 py-1.5">פעילות אחרונה</th>
              <th className="px-2 py-1.5">סגירה</th>
              <th className="px-2 py-1.5">משך משוער</th>
              <th className="px-2 py-1.5">סטטוס</th>
            </tr>
          </thead>
          <tbody>
            {pack.sessions.map((s) => (
              <tr key={s.id} className="border-t border-gray-800/80">
                <td className="px-2 py-1.5 whitespace-nowrap text-gray-300">
                  {new Date(s.loginAt).toLocaleString("he-IL")}
                </td>
                <td className="px-2 py-1.5 whitespace-nowrap text-gray-400">
                  {new Date(s.lastSeenAt).toLocaleString("he-IL")}
                </td>
                <td className="px-2 py-1.5 whitespace-nowrap text-gray-500">
                  {s.endedAt ? new Date(s.endedAt).toLocaleString("he-IL") : "—"}
                </td>
                <td className="px-2 py-1.5 text-cyan-200/90">{s.durationLabel}</td>
                <td className="px-2 py-1.5 text-gray-500 max-w-[12rem]">
                  {s.ended ? "נסגר" : "פעיל"}
                  <span className="block text-[10px] text-gray-600 mt-0.5">{s.note}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function AdminUserPanel({
  users: initial,
  currentUserId,
}: {
  users: UserRow[];
  currentUserId: string;
}) {
  const PASSWORD_STORE_KEY = "eqs-known-passwords-v1";
  const [users, setUsers] = useState(initial);
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [guideOpen, setGuideOpen] = useState(false);
  const [myAccountOpen, setMyAccountOpen] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [sessionsByUser, setSessionsByUser] = useState<
    Record<string, { totalLogins: number; sessions: SessionRow[] } | "loading" | "error">
  >({});

  const [knownPasswordsByUser, setKnownPasswordsByUser] = useState<Record<string, string>>({});
  useEffect(() => {
    try {
      const raw = localStorage.getItem(PASSWORD_STORE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as Record<string, string>;
      if (parsed && typeof parsed === "object") {
        setKnownPasswordsByUser(parsed);
      }
    } catch {
      // ignore malformed local storage
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(PASSWORD_STORE_KEY, JSON.stringify(knownPasswordsByUser));
    } catch {
      // ignore storage write failures
    }
  }, [knownPasswordsByUser]);


  const generateNumericPassword = (len = 8) => {
    let out = "";
    for (let i = 0; i < len; i++) out += Math.floor(Math.random() * 10).toString();
    return out;
  };

  const copyCreateCredentials = async () => {
    setErr(null);
    setMsg(null);
    const u = username.trim();
    if (!u || !password) {
      setErr("מלא שם משתמש וסיסמה לפני העתקה");
      return;
    }
    const text = `שם משתמש: ${u}\nסיסמא: ${password}`;
    try {
      await navigator.clipboard.writeText(text);
      setMsg("הטקסט הועתק");
    } catch {
      setErr("ההעתקה נכשלה");
    }
  };

  const copyCredentialsForUser = async (u: UserRow) => {
    setErr(null);
    setMsg(null);
    const known = knownPasswordsByUser[u.id];
    if (!known) {
      setErr("אין סיסמה ידועה עבור המשתמש הזה (צריך ליצור/לאפס סיסמה כדי להעתיק)");
      return;
    }
    const text = `שם משתמש: ${u.username}\nסיסמא: ${known}`;
    try {
      await navigator.clipboard.writeText(text);
      setMsg("פרטי המשתמש הועתקו");
    } catch {
      setErr("ההעתקה נכשלה");
    }
  };

  const me = users.find((u) => u.id === currentUserId);
  const [myPwd1, setMyPwd1] = useState("");
  const [myPwd2, setMyPwd2] = useState("");

  const refresh = useCallback(async () => {
    const r = await fetch("/api/admin/users", { credentials: "include" });
    if (!r.ok) return;
    const data = (await r.json()) as {
      users: Array<UserRow & { loginCount?: number; _count?: { sessions: number } }>;
    };
    setUsers(
      data.users.map((u) => ({
        id: u.id,
        displayName: u.displayName ?? null,
        username: u.username,
        isAdmin: u.isAdmin,
        active: u.active,
        createdAt: typeof u.createdAt === "string" ? u.createdAt : String(u.createdAt),
        loginCount: u.loginCount ?? u._count?.sessions ?? 0,
      }))
    );
  }, []);

  const loadSessions = async (userId: string) => {
    setSessionsByUser((m) => ({ ...m, [userId]: "loading" }));
    const r = await fetch(`/api/admin/users/${userId}/sessions`, { credentials: "include" });
    if (!r.ok) {
      setSessionsByUser((m) => ({ ...m, [userId]: "error" }));
      return;
    }
    const data = (await r.json()) as { totalLogins: number; sessions: SessionRow[] };
    setSessionsByUser((m) => ({ ...m, [userId]: data }));
  };

  const toggleExpand = (u: UserRow) => {
    if (expandedId === u.id) {
      setExpandedId(null);
      return;
    }
    setExpandedId(u.id);
    if (!sessionsByUser[u.id] || sessionsByUser[u.id] === "error") {
      void loadSessions(u.id);
    }
  };

  const createUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(null);
    setErr(null);
    setBusy(true);
    try {
      const r = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, password, isAdmin, displayName }),
      });
      const data = (await r.json().catch(() => ({}))) as { error?: string; user?: { id?: string } };
      if (!r.ok) {
        setErr(data.error || "Failed");
        return;
      }
      setMsg("המשתמש נוצר");
      const createdId = data.user?.id;
      if (createdId) {
        setKnownPasswordsByUser((prev) => ({ ...prev, [createdId]: password }));
      }
      setUsername("");
      setDisplayName("");
      setPassword("");
      setIsAdmin(false);
      await refresh();
    } finally {
      setBusy(false);
    }
  };

  const setAccess = async (userId: string, active: boolean) => {
    setErr(null);
    const r = await fetch(`/api/admin/users/${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ active }),
    });
    const data = (await r.json().catch(() => ({}))) as { error?: string };
    if (!r.ok) {
      setErr(data.error || "Failed");
      return;
    }
    setMsg(active ? "הגישה הופעלה" : "הגישה בוטלה");
    if (!active && expandedId === userId) setExpandedId(null);
    await refresh();
  };

  const resetSessions = async (user: UserRow) => {
    setErr(null);
    setMsg(null);
    if (user.id === currentUserId) {
      setErr("לא ניתן לאפס את הסשנים של המשתמש הנוכחי");
      return;
    }
    const r = await fetch(`/api/admin/users/${user.id}/sessions`, {
      method: "DELETE",
      credentials: "include",
    });
    const data = (await r.json().catch(() => ({}))) as { error?: string };
    if (!r.ok) {
      setErr(data.error || "איפוס סשנים נכשל");
      return;
    }
    setSessionsByUser((prev) => {
      const next = { ...prev };
      delete next[user.id];
      return next;
    });
    if (expandedId === user.id) setExpandedId(null);
    setMsg("סשנים אופסו למשתמש");
    await refresh();
  };

  const deleteUser = async (user: UserRow) => {
    setErr(null);
    const r = await fetch(`/api/admin/users/${user.id}`, {
      method: "DELETE",
      credentials: "include",
    });
    const data = (await r.json().catch(() => ({}))) as { error?: string };
    if (!r.ok) {
      setErr(data.error || "Failed");
      return;
    }
    if (expandedId === user.id) setExpandedId(null);
    setKnownPasswordsByUser((prev) => {
      const next = { ...prev };
      delete next[user.id];
      return next;
    });
    setMsg("המשתמש נמחק לגמרי");
    await refresh();
  };

  const saveMyPassword = async () => {
    setErr(null);
    setMsg(null);
    if (myPwd1.length < 8) {
      setErr("סיסמה קצרה מדי (מינימום 8 תווים)");
      return;
    }
    if (myPwd1 !== myPwd2) {
      setErr("הסיסמאות אינן תואמות");
      return;
    }
    const r = await fetch(`/api/admin/users/${currentUserId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ password: myPwd1 }),
    });
    const data = (await r.json().catch(() => ({}))) as { error?: string };
    if (!r.ok) {
      setErr(data.error || "שמירה נכשלה");
      return;
    }
    setMyPwd1("");
    setMyPwd2("");
    setMsg("הסיסמה עודכנה (הסשן הנוכחי נשאר פעיל)");
  };

  return (
    <div className="space-y-8" dir="rtl">
      <p className="text-sm text-gray-400 text-end">
        <Link href="/" className="text-cyan-400 hover:text-cyan-300">
          חזרה לאתר ←
        </Link>
      </p>

      {me && (
        <section className="rounded-xl border border-amber-500/35 bg-amber-950/15 p-4 space-y-4">
          <button
            type="button"
            onClick={() => setMyAccountOpen((o) => !o)}
            className="w-full flex items-center justify-between gap-2 text-start"
          >
            <h2 className="text-base font-semibold text-amber-100">מנהל</h2>
            <span className="text-amber-300/80 text-sm">{myAccountOpen ? "▼" : "◀"}</span>
          </button>
          {myAccountOpen && (
          <>
          <p className="text-xs text-gray-400 leading-relaxed">שם המשתמש של המנהל הוא ADMIN.</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="block text-xs font-medium text-gray-400">שם משתמש</label>
              <input
                value="ADMIN"
                readOnly
                className="w-full rounded-lg border border-gray-600 bg-black/40 px-3 py-2 text-sm text-white"
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <p className="text-xs font-medium text-gray-400">סיסמה חדשה</p>
              <div className="grid gap-3 sm:grid-cols-2 max-w-2xl">
                <PasswordField
                  label="סיסמה חדשה"
                  value={myPwd1}
                  onChange={setMyPwd1}
                  minLength={8}
                  inputClassName="w-full rounded-lg border border-gray-600 bg-black/40 py-2 ps-3 pe-11 text-sm text-white focus:border-amber-500/50 focus:outline-none focus:ring-1 focus:ring-amber-500/30"
                />
                <PasswordField
                  label="אימות סיסמה"
                  value={myPwd2}
                  onChange={setMyPwd2}
                  minLength={8}
                  inputClassName="w-full rounded-lg border border-gray-600 bg-black/40 py-2 ps-3 pe-11 text-sm text-white focus:border-amber-500/50 focus:outline-none focus:ring-1 focus:ring-amber-500/30"
                />
              </div>
              <button
                type="button"
                onClick={() => void saveMyPassword()}
                className="rounded-lg bg-amber-800/90 hover:bg-amber-700 px-4 py-2 text-sm text-white"
              >
                שמור סיסמה חדשה
              </button>
            </div>
          </div>
          </>
          )}
        </section>
      )}

      <section className="rounded-xl border border-cyan-900/40 bg-cyan-950/20 overflow-hidden">
        <button
          type="button"
          onClick={() => setGuideOpen((o) => !o)}
          className="w-full flex items-center justify-between gap-2 px-4 py-3 text-start text-sm font-medium text-cyan-100 hover:bg-white/5"
        >
          <span>מדריך</span>
          <span className="text-cyan-400/80">{guideOpen ? "▼" : "◀"}</span>
        </button>
        {guideOpen && (
          <div className="px-4 pb-4 pt-0 text-sm text-gray-300 space-y-3 leading-relaxed border-t border-cyan-900/30">
            <p>1) צור משתמש חדש עם איש קשר, שם משתמש וסיסמה.</p>
            <p>2) סיסמה אקראית מספרית: כפתור ליד שדה הסיסמה.</p>
            <p>3) הפעל/כבה גישה לכל משתמש בשורה שלו.</p>
            <p>4) מחק לגמרי משתמש אם הוא לא נדרש.</p>
          </div>
        )}
      </section>

      <form
        onSubmit={createUser}
        className="rounded-xl border border-gray-700/60 bg-black/20 p-4 space-y-3"
      >
        <h2 className="text-sm font-medium text-white">יצירת משתמש</h2>
        <div className="grid gap-3 lg:grid-cols-3">
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1">איש קשר</label>
            <input
              placeholder="למשל: דני כהן"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full rounded-lg border border-gray-600 bg-black/40 px-3 py-2 text-sm text-white"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1">שם משתמש</label>
            <input
              placeholder="שם משתמש"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-lg border border-gray-600 bg-black/40 px-3 py-2 text-sm text-white"
              required
            />
          </div>
          <PasswordField
            label="סיסמה (מינ׳ 8)"
            value={password}
            onChange={setPassword}
            minLength={8}
            required
            placeholder="••••••••"
            inputClassName="w-full rounded-lg border border-gray-600 bg-black/40 py-2 ps-3 pe-11 text-sm text-white placeholder:text-gray-600 focus:border-cyan-500/60 focus:outline-none focus:ring-1 focus:ring-cyan-500/40"
          />
          <div className="flex items-end">
            <button
              type="button"
              onClick={() => setPassword(generateNumericPassword(8))}
              className="w-full rounded-lg border border-cyan-700/50 bg-cyan-900/35 hover:bg-cyan-800/40 px-3 py-2 text-sm text-cyan-100"
            >
              צור סיסמה מספרית
            </button>
          </div>
          <div className="flex items-end">
            <button
              type="button"
              onClick={() => void copyCreateCredentials()}
              className="w-full rounded-lg border border-gray-600 bg-black/30 hover:bg-black/40 px-3 py-2 text-sm text-gray-200"
            >
              העתק שם משתמש + סיסמה
            </button>
          </div>
        </div>
        <label className="flex items-center gap-2 text-sm text-gray-300">
          <input type="checkbox" checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)} />
          הרשאות מנהל
        </label>
        <button
          type="submit"
          disabled={busy}
          className="rounded-lg bg-cyan-700/90 hover:bg-cyan-600 px-4 py-2 text-sm text-white disabled:opacity-50"
        >
          צור משתמש
        </button>
        {msg && <p className="text-sm text-emerald-400">{msg}</p>}
        {err && <p className="text-sm text-red-400">{err}</p>}
      </form>

      <div className="overflow-x-auto rounded-xl border border-gray-700/60">
        <table className="w-full text-sm text-right">
          <thead className="bg-black/30 text-gray-400">
            <tr>
              <th className="px-4 py-2">איש קשר</th>
              <th className="px-4 py-2">שם משתמש</th>
              <th className="px-4 py-2">סיסמה ידועה</th>
              <th className="px-4 py-2">מנהל</th>
              <th className="px-4 py-2">פעיל</th>
              <th className="px-4 py-2">סשנים</th>
              <th className="px-4 py-2 w-48">פעולות</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <Fragment key={u.id}>
                <tr className="border-t border-gray-800">
                  <td className="px-4 py-2 text-gray-200">{u.displayName || "—"}</td>
                  <td className="px-4 py-2 text-white font-medium">
                    {u.username}
                    {u.id === currentUserId && (
                      <span className="text-amber-400/90 text-xs font-normal ms-2">(אתה)</span>
                    )}
                  </td>
                  <td className="px-4 py-2 text-gray-300">{knownPasswordsByUser[u.id] || "לא ידועה"}</td>
                  <td className="px-4 py-2">{u.isAdmin ? "כן" : "—"}</td>
                  <td className="px-4 py-2">{u.active ? "כן" : "לא"}</td>
                  <td className="px-4 py-2 text-gray-300">
                    <span className="block">{u.loginCount}</span>
                    <span className="block text-[11px] text-gray-500 whitespace-nowrap">
                      נוצר: {new Date(u.createdAt).toLocaleString("he-IL")}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex flex-wrap gap-2 justify-end">
                      <button
                        type="button"
                        onClick={() => toggleExpand(u)}
                        className="text-cyan-400 hover:text-cyan-300 text-xs"
                      >
                        {expandedId === u.id ? "סגור פעילות" : "פעילות / סשנים"}
                      </button>
                      <button
                        type="button"
                        onClick={() => void copyCredentialsForUser(u)}
                        className="text-gray-400 hover:text-white text-xs"
                      >
                        העתק משתמש+סיסמה
                      </button>
                      {u.id !== currentUserId && (
                        <button
                          type="button"
                          onClick={() => void resetSessions(u)}
                          className="text-indigo-300 hover:text-indigo-200 text-xs"
                        >
                          אפס סשנים
                        </button>
                      )}
                      {u.id !== currentUserId && (
                        <button
                          type="button"
                          onClick={() => {
                            void setAccess(u.id, !u.active);
                          }}
                          className={`text-xs ${u.active ? "text-amber-300 hover:text-amber-200" : "text-emerald-300 hover:text-emerald-200"}`}
                        >
                          {u.active ? "כבה גישה" : "הפעל גישה"}
                        </button>
                      )}
                      {u.id !== currentUserId && (
                        <button
                          type="button"
                          onClick={() => {
                            void deleteUser(u);
                          }}
                          className="text-red-400 hover:text-red-300 text-xs"
                        >
                          מחק לגמרי
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
                {expandedId === u.id && (
                  <tr className="border-t border-gray-800 bg-black/25">
                    <td colSpan={7} className="px-4 py-4 text-start" dir="rtl">
                      {sessionsByUser[u.id] === "loading" && (
                        <p className="text-gray-500 text-sm">טוען…</p>
                      )}
                      {sessionsByUser[u.id] === "error" && (
                        <p className="text-red-400 text-sm">שגיאה בטעינה</p>
                      )}
                      {sessionsByUser[u.id] && typeof sessionsByUser[u.id] === "object" && (
                        <SessionPackTable
                          pack={sessionsByUser[u.id] as { totalLogins: number; sessions: SessionRow[] }}
                        />
                      )}
                    </td>
                  </tr>
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
