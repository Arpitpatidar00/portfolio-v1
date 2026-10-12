import type { NextConfig } from "next";

const ONE_YEAR = 60 * 60 * 24 * 365;
const THIRTY_DAYS = 60 * 60 * 24 * 30;

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
  { key: "Strict-Transport-Security", value: `max-age=${ONE_YEAR}` },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,

  images: {
    // Every <Image> is resized and converted (AVIF/WebP) by Cloudinary's CDN,
    // not by the Next.js server. Source files live in /assets (see README).
    loader: "custom",
    loaderFile: "./src/lib/cloudinary-loader.ts",
  },

  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      {
        // Not content-hashed, so cache for 30 days and revalidate in the background.
        source: "/resume/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: `public, max-age=${THIRTY_DAYS}, stale-while-revalidate=${THIRTY_DAYS}`,
          },
        ],
      },
    ];
  },
};

export default nextConfig;
