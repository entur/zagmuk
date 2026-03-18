import { describe, test, expect, vi } from "vitest";
import { getLastValidDate } from "./buttonConfig";

describe("getLastValidDate", () => {
  test("returns null for ALL_TIME", () => {
    expect(getLastValidDate("ALL_TIME")).toBeNull();
  });

  test("returns null for unknown filter", () => {
    expect(getLastValidDate("UNKNOWN")).toBeNull();
  });

  test("returns a date ~12 hours ago for LAST_12_HOURS", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-03-18T12:00:00Z"));
    const result = getLastValidDate("LAST_12_HOURS");
    expect(result).toEqual(new Date("2026-03-18T00:00:00Z"));
    vi.useRealTimers();
  });

  test("returns a date ~24 hours ago for LAST_24_HOURS", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-03-18T12:00:00Z"));
    const result = getLastValidDate("LAST_24_HOURS");
    expect(result).toEqual(new Date("2026-03-17T12:00:00Z"));
    vi.useRealTimers();
  });

  test("returns a date ~7 days ago for LAST_WEEK", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-03-18T12:00:00Z"));
    const result = getLastValidDate("LAST_WEEK");
    expect(result).toEqual(new Date("2026-03-11T12:00:00Z"));
    vi.useRealTimers();
  });

  test("returns a date ~1 month ago for LAST_MONTH", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-03-18T12:00:00Z"));
    const result = getLastValidDate("LAST_MONTH");
    expect(result).toEqual(new Date("2026-02-18T12:00:00Z"));
    vi.useRealTimers();
  });
});
