import { build } from "esbuild";
import path from "path";

await build({
  entryPoints: [path.resolve("eleventy.config.ts")],
  bundle: true,
  platform: "node",
  format: "esm",
  outfile: ".eleventy/eleventy.config.js"
});