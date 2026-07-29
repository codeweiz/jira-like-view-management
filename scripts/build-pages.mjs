/**
 * Build static SPA for GitHub Pages and rename index.pages.html → index.html.
 */
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const outDir = path.join(root, ".output", "public");

const build = spawnSync(
  "npx",
  ["vite", "build", "--config", "vite.pages.config.ts"],
  { stdio: "inherit", env: process.env },
);
if (build.status !== 0) process.exit(build.status ?? 1);

const pagesHtml = path.join(outDir, "index.pages.html");
const indexHtml = path.join(outDir, "index.html");
if (fs.existsSync(pagesHtml)) {
  fs.renameSync(pagesHtml, indexHtml);
}

// SPA fallback for client-side routes under project pages
if (fs.existsSync(indexHtml)) {
  fs.copyFileSync(indexHtml, path.join(outDir, "404.html"));
}

fs.writeFileSync(path.join(outDir, ".nojekyll"), "");
console.log("[pages] built → .output/public");
