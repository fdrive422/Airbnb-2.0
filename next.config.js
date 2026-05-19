/** @type {import('next').NextConfig} */

// Content Security Policy — restrict what the browser can load
const CSP = [
  "default-src 'self'",
  // Next.js requires unsafe-inline for its runtime; unsafe-eval for HMR in dev
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' blob:",
  "style-src 'self' 'unsafe-inline'",
  // Images: local assets, data URIs, all HTTPS (papareact, Unsplash, muscache)
  "img-src 'self' data: blob: https:",
  // Mapbox GL WebGL workers + tile/API endpoints
  "connect-src 'self' https://*.mapbox.com https://api.mapbox.com wss://*.mapbox.com https://www.jsonkeeper.com",
  "worker-src blob:",
  "child-src blob:",
  // Fonts embedded in mapbox-gl
  "font-src 'self' data:",
  // Block all framing
  "frame-src 'none'",
  "frame-ancestors 'none'",
].join("; ");

const securityHeaders = [
  // Prevent clickjacking
  { key: "X-Frame-Options",        value: "DENY" },
  // Stop MIME-type sniffing
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Control referrer information
  { key: "Referrer-Policy",        value: "strict-origin-when-cross-origin" },
  // Restrict browser features
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(self), interest-cohort=()",
  },
  // Force HTTPS for 1 year once visited (deployed only — dev uses HTTP)
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains",
  },
  // CSP
  { key: "Content-Security-Policy", value: CSP },
];

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "links.papareact.com" },
      { protocol: "https", hostname: "**.muscache.com" },
      { protocol: "https", hostname: "a0.muscache.com" },
      { protocol: "https", hostname: "jsonkeeper.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  // Token is now in .env.local — NEXT_PUBLIC_ prefix exposes it to the browser
  // (required for Mapbox GL JS which runs client-side).
  // Do NOT add secrets here; this file is committed to git.
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
};

module.exports = nextConfig;
