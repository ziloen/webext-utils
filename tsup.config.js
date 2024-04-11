import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ["src/index.ts"],
  dts: true,
  outDir: "dist",
  format: ["esm"],
  sourcemap: true,
  platform: "node",
  minify: true,
  clean: true,
})