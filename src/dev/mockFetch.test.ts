import { describe, test, expect, afterEach, vi } from "vitest";
import { installMockFetch } from "./mockFetch";

describe("installMockFetch", () => {
  const originalFetch = globalThis.fetch;

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  test("intercepts requests to events/timetable endpoint", async () => {
    installMockFetch();
    const response = await fetch(
      "https://api.dev.entur.io/timetable-admin/v1/events/timetable/2"
    );
    expect(response.ok).toBe(true);
    const data = await response.json();
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBe(3);
  });

  test("passes through non-matching requests", async () => {
    const fakeFetch = vi.fn().mockResolvedValue(new Response("ok"));
    globalThis.fetch = fakeFetch;
    installMockFetch();
    await fetch("https://example.com/other");
    expect(fakeFetch).toHaveBeenCalledOnce();
  });
});
