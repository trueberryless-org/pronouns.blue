import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1"],
  images: {
    remotePatterns: [{ protocol: "https", hostname: "cdn.bsky.app" }],
  },
  async headers() {
    return [
      {
        // Profile page HTML shells are client-side-only skeletons — cache them
        // aggressively at Netlify's CDN edge. Browser gets no-store so hydration
        // always runs fresh; the CDN keeps the skeleton for 24 h and serves stale
        // for up to 7 days while a background regeneration is in flight.
        source: "/profile/:handle",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, must-revalidate",
          },
          {
            key: "Netlify-CDN-Cache-Control",
            value:
              "public, s-maxage=86400, stale-while-revalidate=604800, durable",
          },
        ],
      },
    ];
  },
  serverExternalPackages: [
    "thread-stream",
    "pino",
    "@atproto/oauth-client-node",
    "@atproto/oauth-client",
    "@atproto/lex",
    "@atproto-labs/fetch",
    "@atproto-labs/fetch-node",
    "@atproto/common-web",
    "@atproto/syntax",
  ],
};

export default nextConfig;
