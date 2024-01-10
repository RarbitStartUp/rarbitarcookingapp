const withPWA = require("@ducanh2912/next-pwa").default;

module.exports = withPWA({
  pwa: {
    dest: "public",
    cacheOnFrontEndNav: true,
    aggressiveFrontEndNavCaching: true,
    reloadOnOnline: true,
    swcMinify: true,
    disable: false,
    workboxOptions: {
      disableDevLogs: true,
    },
  },
  // Your other Next.js config options go here
});
