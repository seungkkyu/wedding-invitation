import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  // 예전 링크(/?v=film)는 디자인별 경로(/film)로 보낸다
  redirects() {
    return [
      {
        source: "/",
        has: [{ type: "query", key: "v", value: "(?<v>pixel|film|magazine|letter|scrapbook)" }],
        destination: "/:v",
        permanent: true,
      },
    ];
  },
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
