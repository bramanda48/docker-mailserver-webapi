import * as esbuild from "esbuild";
import copyPlugin from "esbuild/copy";
import { denoPlugins } from "esbuild/loader";
import { path } from "./deps.ts";

await esbuild.build({
  entryPoints: ["./src/main.ts"],
  plugins: [
    ...denoPlugins({
      configPath: path.resolve("./deno.jsonc"),
    }),
    copyPlugin({
      baseDir: "./",
      baseOutDir: "./dist",
      files: [{ from: "static/**/*", to: "static/[path]/[name][ext]" }],
    }),
  ],
  bundle: true,
  sourcemap: true,
  outfile: "./dist/main.esm.js",
  minify: true,
  format: "esm",
});
esbuild.stop();