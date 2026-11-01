import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 90 is used for screenshots, the portrait, and full-size certificates.
    qualities: [75, 90],
  },
  cacheComponents: true,
  partialPrefetching: true,
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
