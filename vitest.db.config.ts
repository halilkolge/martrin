import { configDefaults, defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    environment: "node",
    include: ["src/db/__tests__/*.db.test.ts", "src/server/**/*.db.test.ts"],
    exclude: [...configDefaults.exclude, "**/._*"],
    testTimeout: 30_000,
    hookTimeout: 30_000,
  },
});
