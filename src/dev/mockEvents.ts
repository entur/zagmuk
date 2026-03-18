import { TimetableJobEvent } from "../types/event";

export function createMockEvents(): TimetableJobEvent[] {
  const now = Date.now();

  return [
    {
      chouetteJobId: "1001",
      providerId: 2,
      firstEvent: now - 3600000,
      endState: "OK",
      events: [
        { action: "FILE_TRANSFER", state: "OK", date: now - 3600000 },
        { action: "FILE_CLASSIFICATION", state: "OK", date: now - 3500000 },
        { action: "FILE_DELIVERY", state: "OK", date: now - 3400000 },
        { action: "PREVALIDATION", state: "OK", date: now - 3300000 },
        { action: "IMPORT", state: "OK", date: now - 3200000 },
        { action: "VALIDATION_LEVEL_1", state: "OK", date: now - 3100000 },
        { action: "DATASPACE_TRANSFER", state: "OK", date: now - 3000000 },
        { action: "VALIDATION_LEVEL_2", state: "OK", date: now - 2900000 },
        { action: "EXPORT_NETEX", state: "OK", date: now - 2800000 },
        { action: "EXPORT", state: "OK", date: now - 2700000 },
      ],
    },
    {
      chouetteJobId: "1002",
      providerId: 2,
      firstEvent: now - 7200000,
      endState: "FAILED",
      events: [
        { action: "FILE_TRANSFER", state: "OK", date: now - 7200000 },
        { action: "FILE_CLASSIFICATION", state: "OK", date: now - 7100000 },
        { action: "PREVALIDATION", state: "FAILED", date: now - 7000000 },
      ],
    },
    {
      chouetteJobId: "1003",
      providerId: 2,
      firstEvent: now - 86400000,
      endState: "OK",
      events: [
        { action: "FILE_TRANSFER", state: "OK", date: now - 86400000 },
        { action: "FILE_CLASSIFICATION", state: "OK", date: now - 86300000 },
        { action: "FILE_DELIVERY", state: "OK", date: now - 86200000 },
        { action: "PREVALIDATION", state: "OK", date: now - 86100000 },
        { action: "IMPORT", state: "OK", date: now - 86000000 },
        { action: "VALIDATION_LEVEL_1", state: "OK", date: now - 85900000 },
        { action: "EXPORT_NETEX", state: "OK", date: now - 85800000 },
        { action: "EXPORT", state: "OK", date: now - 85700000 },
      ],
    },
  ];
}
