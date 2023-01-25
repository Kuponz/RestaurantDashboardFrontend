
/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  // put other next-pwa options here
});

const nextConfig = withPWA({
  reactStrictMode: true,
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
  },
  // put other next js options here
});
module.exports = nextConfig;
