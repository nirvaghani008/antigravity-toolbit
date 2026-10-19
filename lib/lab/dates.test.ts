import { afterEach, describe, expect, it, vi } from "vitest";
import { formatLaunchDate } from "./dates";

// Pin "now" so these tests give the same answer on any day they run.
const now = new Date("2026-10-19T15:30:00Z");

describe("formatLaunchDate", () => {
  it.each([
    ["2026-10-19", "Launched today"],
    ["2026-10-18", "Launched yesterday"],
    ["2026-10-16", "Launched 3 days ago"],
    ["2026-10-06", "Launched 13 days ago"],
    ["2026-10-05", "Launched 2 weeks ago"],
    ["2026-08-21", "Launched 8 weeks ago"],
    ["2026-08-20", "Launched on 20 Aug 2026"],
    ["2026-10-25", "Launching soon"],
  ])("labels %s as %j", (launchedAt, expected) => {
    expect(formatLaunchDate(launchedAt, now)).toBe(expected);
  });

  it("ignores the time of day, so a late-night launch still counts as today", () => {
    expect(formatLaunchDate("2026-10-19T23:59:00Z", now)).toBe("Launched today");
  });

  it("handles a bad date without crashing", () => {
    expect(formatLaunchDate("not-a-date", now)).toBe("Launch date unknown");
  });

  describe("with a fake system clock", () => {
    afterEach(() => {
      vi.useRealTimers();
    });

    it("uses the current time when no date is passed in", () => {
      // The other way to control time: replace the clock for the whole test.
      vi.useFakeTimers();
      vi.setSystemTime(new Date("2026-12-25T09:00:00Z"));
      expect(formatLaunchDate("2026-12-24")).toBe("Launched yesterday");
    });
  });
});
