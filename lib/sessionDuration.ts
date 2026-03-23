/** משך פעילות משוער: מההתחברות עד הפעילות האחרונה שנרשמה (ping). */
export function computeSessionDurationMs(createdAt: Date, lastSeenAt: Date): number {
  return Math.max(0, lastSeenAt.getTime() - createdAt.getTime());
}

export function formatDurationHe(ms: number): string {
  const sec = Math.floor(ms / 1000);
  if (sec < 60) return `${sec} שנ׳`;
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min} דק׳`;
  const h = Math.floor(min / 60);
  const m = min % 60;
  return m ? `${h} ש׳ ${m} דק׳` : `${h} ש׳`;
}
