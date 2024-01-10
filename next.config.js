import withPWA from "@ducanh2912/next-pwa";

export default withPWA({
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
