import { defineConfig } from "tsup"

export default defineConfig({
  entry: [
    "src/index.ts",
  ],
  outDir: "dist",
  bundle: true,
  minify: true,
  dts: true,
  format: ["esm"],
  platform: "node",
  treeshake: true,
  sourcemap: false,
  clean: true,
})