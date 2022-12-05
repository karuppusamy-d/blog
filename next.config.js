/* eslint-disable @typescript-eslint/no-var-requires */
const siteMetaData = require("./data/siteMetadata");

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const disablePWA =
  process.env.NODE_ENV !== "production" || process.env.DISABLE_PWA === "true";

const withPWA = require("next-pwa")({
  dest: "public",
  disable: disablePWA,
});

module.exports = withBundleAnalyzer(
  withPWA({
    reactStrictMode: true,
    webpack: (config) => {
      // SVG Loader
      config.module.rules.push({
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      });
      return config;
    },

    // Redirects
    async redirects() {
      return [
        {
          source: "/resume",
          destination: siteMetaData.resume,
          permanent: false,
        },
      ];
    },
  })
);
