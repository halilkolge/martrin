import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["src/db/__tests__/*.db.test.ts"],
    exclude: [...configDefaults.exclude, "**/._*"],
    testTimeout: 30_000,
    hookTimeout: 30_000,
  },
});
