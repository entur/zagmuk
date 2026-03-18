import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { writeFileSync } from "fs";
import { resolve } from "path";
import { createRequire } from "module";

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

/**
 * Resolves webpack's ~ prefix in CSS @import statements.
 * @entur packages use @import "~@entur/tokens/..." which webpack resolved
 * from node_modules. Vite doesn't support this natively.
 */
function resolveTildePlugin(): Plugin {
  return {
    name: "resolve-tilde-css",
    enforce: "pre",
    transform(code, id) {
      if (id.endsWith(".css") && code.includes("~@entur")) {
        const imports: string[] = [];
        const stripped = code.replace(
          /@import\s+["']~(@entur\/[^"']+)["'];?/g,
          (_, pkg) => {
            const localRequire = createRequire(id);
            const resolved = localRequire.resolve(pkg);
            imports.push(`@import "${resolved}";`);
            return "";
          },
        );
        // Move resolved @imports to the top so postcss processes them
        return { code: imports.join("\n") + "\n" + stripped, map: null };
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), assetManifestPlugin(), resolveTildePlugin()],
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
    chunkSizeWarningLimit: 1200,
    // Build as IIFE (not ESM) because @entur/micro-frontend loads scripts
    // via <script> tags, not <script type="module">
    rollupOptions: {
      output: {
        format: "iife",
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
