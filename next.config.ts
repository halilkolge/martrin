import { withSentryConfig } from "@sentry/nextjs/config";
import type { NextConfig } from "next";

// exFAT gibi macOS'un AppleDouble (._*) dosyaları ürettiği disklerde
// Turbopack kalıcı önbelleği bozuluyor. Önbellek yalnızca hız içindir.
// Bu yüzden önbellek ayarları yalnızca MARTRIN_DISABLE_TURBO_CACHE=1 iken uygulanır.
const disableTurboCache = process.env.MARTRIN_DISABLE_TURBO_CACHE === "1";

const nextConfig: NextConfig = {
  ...(disableTurboCache
    ? {
        experimental: {
          turbopackFileSystemCacheForBuild: false,
          turbopackFileSystemCacheForDev: false,
        },
      }
    : {}),
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default withSentryConfig(nextConfig, {
  silent: !process.env.CI,
});
