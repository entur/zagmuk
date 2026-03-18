import { createMockEvents } from "./mockEvents";

export function installMockFetch(): void {
  const originalFetch = window.fetch;

  window.fetch = async (input, init) => {
    const url =
      typeof input === "string"
        ? input
        : input instanceof URL
        ? input.toString()
        : input.url;

    if (url.includes("/events/timetable/")) {
      return new Response(JSON.stringify(createMockEvents()), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    return originalFetch(input, init);
  };
}
