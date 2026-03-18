import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { writeFileSync } from "fs";
import { resolve } from "path";

/**
 * Generates asset-manifest.json compatible with @entur/micro-frontend.
 * The library expects { entrypoints: string[], files: Record<string, string> }
 * where paths are relative to the host (e.g. "/assets/index-abc123.js").
 */
function assetManifestPlugin(): Plugin {
  return {
    name: "asset-manifest",
    enforce: "post",
    writeBundle(options, bundle) {
      const files: Record<string, string> = {};
      const entrypoints: string[] = [];

      for (const [fileName, chunk] of Object.entries(bundle)) {
        if (fileName.endsWith(".js")) {
          files[fileName] = `/${fileName}`;
          if ("isEntry" in chunk && chunk.isEntry) {
            entrypoints.push(`/${fileName}`);
          }
        } else if (fileName.endsWith(".css")) {
          files[fileName] = `/${fileName}`;
          entrypoints.push(`/${fileName}`);
        }
      }

      const manifest = { entrypoints, files };
      const outDir = options.dir || "build";
      writeFileSync(
        resolve(outDir, "asset-manifest.json"),
        JSON.stringify(manifest, null, 2),
      );
    },
  };
}

export default defineConfig({
  plugins: [react(), assetManifestPlugin()],
  css: {
    postcss: {
      plugins: [
        // Suppress @import warnings from @entur packages that have
        // @import statements after other rules (third-party, can't fix)
        {
          postcssPlugin: "suppress-at-import-warnings",
          prepare() {
            return {
              OnceExit(_root, { result }) {
                result.messages = result.messages.filter(
                  (msg) =>
                    !(
                      msg.type === "warning" &&
                      msg.text?.includes("@import must precede")
                    ),
                );
              },
            };
          },
        },
      ],
    },
  },
  build: {
    outDir: "build",
    chunkSizeWarningLimit: 700,
    // Sentry 7.x has CJS/ESM interop issues; suppress until upgraded
    rollupOptions: {
      onwarn(warning, defaultHandler) {
        if (warning.code === "COMMONJS_VARIABLE_IN_ESM") return;
        defaultHandler(warning);
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  test: {
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
    coverage: {
      reporter: ["text", "lcov"],
    },
  },
});
