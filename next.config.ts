import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Lets other devices on your network (e.g. your phone) use the dev server.
  // Only affects `next dev`. Add the new address here if your IP changes.
  allowedDevOrigins: ["172.30.233.19"],
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
