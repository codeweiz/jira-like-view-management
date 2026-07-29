import path from "node:path";
import { defineConfig } from "vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

/**
 * Standalone SPA build for GitHub Pages.
 * TanStack Start SSR/nitro static presets are not used here — Pages is static-only.
 *
 * Output: .output/public  (deployed by .github/workflows/deploy-pages.yml)
 * URL:    https://codeweiz.github.io/jira-like-view-management/
 */
export default defineConfig({
  base: "/jira-like-view-management/",
  root: path.resolve("."),
  publicDir: false,
  plugins: [tailwindcss(), viteReact()],
  resolve: {
    alias: {
      "@": path.resolve("src"),
    },
  },
  build: {
    outDir: ".output/public",
    emptyOutDir: true,
    sourcemap: false,
    rollupOptions: {
      input: path.resolve("index.pages.html"),
    },
  },
});
