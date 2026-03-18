import { describe, test, expect } from "vitest";
import {
  getPipelineSteps,
  isExperimentalImportEnabled,
  STANDARD_IMPORT_STEPS,
  EXPERIMENTAL_IMPORT_STEPS,
} from "./pipelineConfig";

describe("getPipelineSteps", () => {
  test("returns standard steps when provider is null", () => {
    expect(getPipelineSteps(null)).toBe(STANDARD_IMPORT_STEPS);
  });

  test("returns standard steps when experimental import is not enabled", () => {
    expect(getPipelineSteps({ chouetteInfo: {} })).toBe(STANDARD_IMPORT_STEPS);
  });

  test("returns experimental steps when experimental import is enabled", () => {
    expect(
      getPipelineSteps({ chouetteInfo: { enableExperimentalImport: true } })
    ).toBe(EXPERIMENTAL_IMPORT_STEPS);
  });
});

describe("isExperimentalImportEnabled", () => {
  test("returns false for null provider", () => {
    expect(isExperimentalImportEnabled(null)).toBe(false);
  });

  test("returns false when not enabled", () => {
    expect(isExperimentalImportEnabled({ chouetteInfo: {} })).toBe(false);
  });

  test("returns true when enabled", () => {
    expect(
      isExperimentalImportEnabled({
        chouetteInfo: { enableExperimentalImport: true },
      })
    ).toBe(true);
  });
});
