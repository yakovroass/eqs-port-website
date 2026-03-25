"use client";

import { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import PasswordField from "@/components/PasswordField";
import HeroFloatingParticles from "@/components/HeroFloatingParticles";

function loginUiMessage(
  status: number,
  data: { error?: string; code?: string }
): string {
  const code = data.code;
  if (code === "DB_UNAVAILABLE" || status === 503) {
    return "השרת לא מתחבר למסד הנתונים. בדוק ש־DATABASE_URL מוגדר ב-Amplify (כולל runtime), בלי טקסט מצורף אחרי ה־URL, ואז Redeploy. בדיקה: פתח את כתובת האתר האמיתית עם /health או /api/health.";
  }
  if (code === "INVALID_CREDENTIALS" || status === 401) {
    return "שם משתמש או סיסמה לא תואמים למה שנשמר במסד. ודא שאתה משתמש ב־ADMIN_USERNAME / ADMIN_PASSWORD, ושאחרי שינוי סיסמה בוצע דיפלוי (כדי ש־db:seed יעדכן את ה־hash).";
  }
  if (code === "MISSING_CREDENTIALS" || status === 400) {
    return "חסרים שם משתמש או סיסמה.";
  }
  return data.error || "Login failed";
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const reason = searchParams.get("reason");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (reason) return;
    fetch("/api/auth/me", { credentials: "include" })
      .then((r) => r.json())
      .then((d: { user?: unknown }) => {
        if (d?.user) router.replace("/");
      })
      .catch(() => {});
  }, [router, reason]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string; code?: string };
      if (!res.ok) {
        setError(loginUiMessage(res.status, data));
        return;
      }
      const me = (await fetch("/api/auth/me", { credentials: "include" }).then((r) =>
        r.json().catch(() => ({}))
      )) as { user?: unknown };
      if (!me.user) {
        window.location.assign("/login?reason=session");
        return;
      }
      window.location.assign("/");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-[100dvh] overflow-hidden bg-[#050810]">
      <div className="animated-grid-bg fixed inset-0 pointer-events-none z-0" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0" aria-hidden>
        <HeroFloatingParticles variant="ships" shipCountOverride={3} shipMotionMode="random" />
      </div>
      <div className="absolute top-0 left-0 right-0 h-[100dvh] min-h-[100svh] overflow-hidden pointer-events-none z-0" aria-hidden>
        <div className="relative h-full w-full">
          <HeroFloatingParticles variant="original" />
        </div>
      </div>

      <div className="relative z-10 min-h-[100dvh] flex items-center justify-center px-4 py-8 sm:py-10">
        <div className="flex w-full max-w-[min(100%,36rem)] flex-col items-center gap-6">
          <div className="flex w-full justify-center px-2" dir="ltr">
            <Image
              src="/pngwlogo.png"
              alt="EQS.PORT"
              width={1061}
              height={992}
              sizes="(max-width: 640px) 96vw, 560px"
              className="h-auto w-full max-w-[24rem] sm:max-w-[30rem] will-change-[filter] motion-safe:animate-[eqs-logo-edge-glow_3.6s_ease-in-out_infinite]"
              priority
              quality={92}
            />
          </div>
          <div className="w-full max-w-[22rem] mx-auto rounded-2xl overflow-hidden border border-gray-500/20 bg-[rgb(10_18_36/0.2)] shadow-[0_8px_40px_rgba(0,0,0,0.2)] backdrop-blur-xl">
          <div className="px-5 pb-6 pt-5 sm:px-6 sm:pb-7 sm:pt-6">
            {reason === "revoked" && (
              <p className="text-sm text-amber-300/95 mb-4 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2">
                Your access is no longer valid. Please request access from the site owner.
              </p>
            )}
            {reason === "session" && (
              <p className="text-sm text-red-300/95 mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2">
                Sign in succeeded, but the session cookie was not available on the next request. Please
                clear site cookies and sign in again.
              </p>
            )}
            <form onSubmit={onSubmit}>
              <div className="space-y-1.5">
                <div>
                  <label htmlFor="username" className="block text-xs font-medium text-gray-400 mb-0.5">
                    Username
                  </label>
                  <input
                    id="username"
                    autoComplete="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full rounded-lg border border-gray-700 bg-slate-950/90 px-3 py-2 text-sm text-gray-200 placeholder:text-gray-500 focus:border-cyan-500/60 focus:outline-none focus:ring-1 focus:ring-cyan-500/35"
                    required
                  />
                </div>
                <PasswordField
                  id="password"
                  label="Password"
                  autoComplete="current-password"
                  value={password}
                  onChange={setPassword}
                  required
                  className="[&_label]:mb-0.5"
                  inputClassName="w-full rounded-lg border border-gray-700 bg-slate-950/90 py-2 ps-3 pe-11 text-sm text-gray-200 placeholder:text-gray-500 focus:border-cyan-500/60 focus:outline-none focus:ring-1 focus:ring-cyan-500/35"
                />
              </div>
              {error && <p className="mt-2.5 text-sm text-red-400">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="mt-4 w-full rounded-lg bg-cyan-600/90 hover:bg-cyan-500 text-white text-sm font-medium py-2 transition-colors disabled:opacity-50"
              >
                {loading ? "Signing in…" : "Sign in"}
              </button>
            </form>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[100dvh] flex items-center justify-center bg-[#050810] text-gray-400">
          Loading…
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
