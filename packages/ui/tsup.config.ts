import { defineConfig } from "tsup";

export default defineConfig((options) => ({
  entryPoints: [
    "src/elements/**/*.ts",
    "src/wrappers/**/*.(ts|tsx)"
  ],
  format: ["cjs", "esm"],
  dts: {
    resolve: true,
  },
  sourcemap: true,
  target: 'es2020',
  external: [
    'react',
    'react-dom',
    '@lit/react',
  ],
  // Split chunks to reduce memory pressure
  splitting: true,
  // Disable workers to prevent memory issues during DTS generation
  workers: false,
  ...options,
}));
