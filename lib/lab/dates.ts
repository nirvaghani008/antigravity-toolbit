const DAY = 24 * 60 * 60 * 1000;

// "Launched 3 days ago" style labels for tool cards. `now` is a parameter so tests
// can pin the clock; pages pass nothing and get the real time.
export function formatLaunchDate(launchedAt: string, now: Date = new Date()): string {
  const launched = new Date(`${launchedAt.slice(0, 10)}T00:00:00Z`);
  if (Number.isNaN(launched.getTime())) return "Launch date unknown";

  const today = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  const days = Math.round((today - launched.getTime()) / DAY);

  if (days < 0) return "Launching soon";
  if (days === 0) return "Launched today";
  if (days === 1) return "Launched yesterday";
  if (days < 14) return `Launched ${days} days ago`;
  if (days < 60) return `Launched ${Math.floor(days / 7)} weeks ago`;
  return `Launched on ${launched.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  })}`;
}
