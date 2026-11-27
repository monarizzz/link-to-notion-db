import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* 本番は Cloudflare が /api/* を API の Worker へ振り分ける。Web から API へ中継する経路を本番に作らないよう、next dev のときだけ流す */
  async rewrites() {
    if (process.env.NODE_ENV !== "development") {
      return [];
    }

    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    if (!baseUrl) {
      throw new Error("NEXT_PUBLIC_API_BASE_URL が設定されていません");
    }

    return [{ source: "/api/:path*", destination: `${baseUrl}/api/:path*` }];
  },
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
};

export default nextConfig;
