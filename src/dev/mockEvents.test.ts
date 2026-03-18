import { describe, test, expect, vi } from "vitest";
import { createMockEvents } from "./mockEvents";

describe("createMockEvents", () => {
  test("returns three mock events", () => {
    const events = createMockEvents();
    expect(events).toHaveLength(3);
  });

  test("returns events with correct end states", () => {
    const events = createMockEvents();
    expect(events[0].endState).toBe("OK");
    expect(events[1].endState).toBe("FAILED");
    expect(events[2].endState).toBe("OK");
  });

  test("returns events with timestamps relative to now", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-03-18T12:00:00Z"));
    const now = Date.now();
    const events = createMockEvents();
    expect(events[0].firstEvent).toBe(now - 3600000);
    expect(events[1].firstEvent).toBe(now - 7200000);
    expect(events[2].firstEvent).toBe(now - 86400000);
    vi.useRealTimers();
  });

  test("first event has a full pipeline of steps", () => {
    const events = createMockEvents();
    expect(events[0].events.length).toBeGreaterThan(5);
    expect(events[0].events[0].action).toBe("FILE_TRANSFER");
  });

  test("failed event stops at PREVALIDATION", () => {
    const events = createMockEvents();
    const failed = events[1];
    const lastEvent = failed.events[failed.events.length - 1];
    expect(lastEvent.action).toBe("PREVALIDATION");
    expect(lastEvent.state).toBe("FAILED");
  });
});
