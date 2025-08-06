
import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts', 'src/schema/index.ts', 'src/seed.ts'],
  format: ['esm'],
  dts: true,
  clean: true,
  sourcemap: true,
  external: ['mysql2'],
})