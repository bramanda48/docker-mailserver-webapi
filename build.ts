import * as esbuild from "esbuild";
import { denoPlugins } from "esbuild/loader";
import { path } from "./deps.ts";

await esbuild.build({
  entryPoints: ["./src/main.ts"],
  plugins: [
    ...denoPlugins({
      configPath: path.resolve("./deno.jsonc"),
    }),
  ],
  bundle: true,
  sourcemap: true,
  outfile: "./dist/main.esm.js",
  minify: true,
  format: "esm",
});
esbuild.stop();
