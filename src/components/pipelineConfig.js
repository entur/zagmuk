/**
 * Pipeline configuration for import events.
 *
 * This module defines which steps are shown in the EventStepper for different
 * types of import pipelines. The order of steps in each array determines their
 * display order in the UI.
 */

/**
 * Steps for standard import pipeline.
 * Used when provider.chouetteInfo.enableExperimentalImport is false or undefined.
 */
export const STANDARD_IMPORT_STEPS = [
  "FILE_TRANSFER",
  "FILE_CLASSIFICATION",
  "FILE_DELIVERY",
  "PREVALIDATION",
  "IMPORT",
  "VALIDATION_LEVEL_1",
  "DATASPACE_TRANSFER",
  "VALIDATION_LEVEL_2",
  "EXPORT_NETEX",
  "EXPORT_NETEX_POSTVALIDATION",
  "EXPORT_NETEX_MERGED_POSTVALIDATION",
  "EXPORT_NETEX_BLOCKS",
  "EXPORT",
  "OTP2_BUILD_GRAPH",
  "EXPORT_NETEX_BLOCKS_POSTVALIDATION",
];

/**
 * Steps for experimental import pipeline.
 * Used when provider.chouetteInfo.enableExperimentalImport is true.
 *
 * Differences from standard pipeline:
 * - Removed: IMPORT, VALIDATION_LEVEL_1, DATASPACE_TRANSFER, VALIDATION_LEVEL_2
 * - Added: FILTERING (after PREVALIDATION, before EXPORT_NETEX)
 */
export const EXPERIMENTAL_IMPORT_STEPS = [
  "FILE_TRANSFER",
  "FILE_CLASSIFICATION",
  "FILE_DELIVERY",
  "PREVALIDATION",
  "FILTERING",
  "EXPORT_NETEX_POSTVALIDATION",
  "EXPORT_NETEX_MERGED_POSTVALIDATION",
  "EXPORT_NETEX_BLOCKS",
  "EXPORT",
  "OTP2_BUILD_GRAPH",
  "EXPORT_NETEX_BLOCKS_POSTVALIDATION",
];

/**
 * Event groups that should be combined and displayed together in the UI.
 * Each group is rendered as a vertical stack in the stepper.
 */
export const COMBINED_EVENT_GROUPS = [
  ["EXPORT_NETEX_BLOCKS", "EXPORT", "OTP2_BUILD_GRAPH"],
];

/**
 * Events related to ANTU validation.
 * These events are conditionally displayed based on their state and configuration.
 */
export const ANTU_VALIDATION_EVENTS = [
  "PREVALIDATION",
  "EXPORT_NETEX_POSTVALIDATION",
  "EXPORT_NETEX_MERGED_POSTVALIDATION",
  "EXPORT_NETEX_BLOCKS_POSTVALIDATION",
];

/**
 * Events related to NeTEx blocks export.
 * These events can be hidden when in IGNORED state.
 */
export const NETEX_BLOCKS_EVENTS = [
  "EXPORT_NETEX_BLOCKS",
  "EXPORT_NETEX_BLOCKS_POSTVALIDATION",
];

/**
 * Get the appropriate pipeline steps based on provider configuration.
 *
 * @param {Object|null} provider - The provider object
 * @returns {string[]} Array of step names in order
 */
export function getPipelineSteps(provider) {
  const isExperimentalImport =
    provider?.chouetteInfo?.enableExperimentalImport === true;

  return isExperimentalImport
    ? EXPERIMENTAL_IMPORT_STEPS
    : STANDARD_IMPORT_STEPS;
}

/**
 * Check if a provider has experimental import enabled.
 *
 * @param {Object|null} provider - The provider object
 * @returns {boolean} True if experimental import is enabled
 */
export function isExperimentalImportEnabled(provider) {
  return provider?.chouetteInfo?.enableExperimentalImport === true;
}
