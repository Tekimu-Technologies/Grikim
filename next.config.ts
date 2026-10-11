import type { NextConfig } from "next";
const { loadExternalEnv } = require("./load-external-env");

loadExternalEnv();

// Script/style still need 'unsafe-inline' -- Next.js's own hydration and
// Tailwind's runtime both rely on it, and a nonce-based strict CSP needs
// middleware changes that haven't been tested against this site yet. Not
// adding Strict-Transport-Security here: the production site is still on
// plain HTTP (AutoSSL hasn't been run), and HSTS would break access
// entirely until it is -- add it once HTTPS is confirmed live.
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https://images.pexels.com",
  "font-src 'self' data:",
  "connect-src 'self'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          { key: "Content-Security-Policy", value: CSP },
        ],
      },
    ];
  },
};

export default nextConfig;
