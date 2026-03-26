/** Max age of last ping to consider the user "live" on the site (admin indicator). */
export const ADMIN_ACTIVE_NOW_MS = 90_000;
/** Max inactivity to still treat an un-ended session as "currently logged in". */
export const ADMIN_LOGGED_IN_WINDOW_MS = 12 * 60 * 60 * 1000;

export type AdminUserPresence = {
  loggedIn: boolean;
  activeNow: boolean;
  /** Open auth sessions (e.g. desktop + mobile = 2). */
  openDeviceCount: number;
};

export function presenceMapFromOpenSessions(
  rows: { userId: string; lastSeenAt: Date }[],
  nowMs = Date.now()
): Map<string, AdminUserPresence> {
  const map = new Map<string, AdminUserPresence>();
  for (const row of rows) {
    // Ignore stale sessions that never got explicit logout (old cookies/browser closes).
    if (row.lastSeenAt.getTime() <= nowMs - ADMIN_LOGGED_IN_WINDOW_MS) continue;
    const cur = map.get(row.userId) ?? {
      loggedIn: true,
      activeNow: false,
      openDeviceCount: 0,
    };
    cur.openDeviceCount += 1;
    if (row.lastSeenAt.getTime() > nowMs - ADMIN_ACTIVE_NOW_MS) {
      cur.activeNow = true;
    }
    map.set(row.userId, cur);
  }
  return map;
}
