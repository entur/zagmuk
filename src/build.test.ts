/**
 * Validates that the build output is compatible with @entur/micro-frontend.
 * Run `npm run build` before running these tests.
 */
import { describe, test, expect } from "vitest";
import { readFileSync, existsSync } from "fs";
import { resolve } from "path";

interface AssetManifest {
  entrypoints: string[];
  files: Record<string, string>;
}

const buildDir = resolve(__dirname, "../build");
const manifestPath = resolve(buildDir, "asset-manifest.json");

function readManifest(): AssetManifest {
  return JSON.parse(readFileSync(manifestPath, "utf-8"));
}

function readEntryJs(): string {
  const manifest = readManifest();
  const jsPath = Object.values(manifest.files).find((f) => f.endsWith(".js"))!;
  return readFileSync(resolve(buildDir, jsPath.slice(1)), "utf-8");
}

describe("build output", () => {
  test("asset-manifest.json exists and has correct structure", () => {
    expect(existsSync(manifestPath)).toBe(true);
    const manifest = readManifest();
    expect(manifest.entrypoints).toBeDefined();
    expect(manifest.files).toBeDefined();
    expect(manifest.entrypoints.length).toBeGreaterThan(0);
  });

  test("asset-manifest.json only lists entry JS (no code-split chunks)", () => {
    const manifest = readManifest();
    const jsFiles = Object.values(manifest.files).filter((f) =>
      f.endsWith(".js")
    );
    expect(jsFiles).toHaveLength(1);
  });

  test("entry JS is IIFE format (not ESM)", () => {
    const js = readEntryJs();
    expect(js.startsWith("(function()")).toBe(true);
    expect(js).not.toMatch(/^export /m);
  });

  test("entry JS contains no dynamic import() calls", () => {
    const js = readEntryJs();
    expect(js).not.toContain("import(");
  });
});
