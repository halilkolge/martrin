import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // exFAT gibi macOS'un AppleDouble (._*) dosyaları ürettiği disklerde
  // Turbopack kalıcı önbelleği bozuluyor. Önbellek yalnızca hız içindir.
  experimental: {
    turbopackFileSystemCacheForBuild: false,
    turbopackFileSystemCacheForDev: false,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
