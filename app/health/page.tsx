import { getHealthPayload } from "@/lib/health-check";

export const dynamic = "force-dynamic";

/**
 * Human-readable health check (same data as GET /api/health).
 * Open the real site URL, e.g. https://main.xxxxx.amplifyapp.com/health
 */
export default async function HealthPage() {
  const payload = await getHealthPayload();
  const ok = payload.ok && payload.database.reachable;

  return (
    <div className="min-h-[100dvh] bg-slate-950 text-gray-200 p-6 font-mono text-sm">
      <h1 className="text-lg font-semibold text-cyan-400 mb-4">Health</h1>
      <p className="text-gray-400 mb-2 max-w-xl">
        השתמש בכתובת האמיתית של האתר (מהדפדפן או מ-Amplify), לא במילים YOUR-DOMAIN. אם הדף הזה נטען — השרת עובד.
      </p>
      <dl className="space-y-2 mb-6">
        <div>
          <dt className="text-gray-500">סטטוס כללי</dt>
          <dd className={ok ? "text-green-400" : "text-amber-300"}>
            {ok ? "OK — DB נגיש" : "בעיה — בדוק למטה"}
          </dd>
        </div>
        <div>
          <dt className="text-gray-500">DATABASE_URL מוגדר (בשרת)</dt>
          <dd>{payload.database.configured ? "כן" : "לא"}</dd>
        </div>
        <div>
          <dt className="text-gray-500">מסד נתונים נגיש</dt>
          <dd>{payload.database.reachable ? "כן" : "לא"}</dd>
        </div>
      </dl>
      <pre className="rounded-lg border border-gray-700 bg-black/40 p-4 overflow-auto text-xs">
        {JSON.stringify(payload, null, 2)}
      </pre>
    </div>
  );
}
