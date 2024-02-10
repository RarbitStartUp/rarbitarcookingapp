/** @type {import('next').NextConfig} */

const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  register: true,
  scope: "/", // Specify the scope here
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  swcMinify: true,
  disable: false,
  workboxOptions: {
    disableDevLogs: true,
  },
});

const nextConfig = {
  webpackDevMiddleware: false,
};

module.exports = withPWA({
  ...nextConfig, // Merge nextConfig into the withPWA options
  // Your Next.js config
  async headers() {
    return [
      {
        // Match any request origin
        source: '/',
        headers: [
          {
            // Allow requests from any origin
            key: 'Access-Control-Allow-Origin',
            // value: process.env.NEXT_PUBLIC_APP_URL,
            // value: ['https://xxxx.com', 'https://xxx.com'],
          },
        ],
      },
    ];
  },
});