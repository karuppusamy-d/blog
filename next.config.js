/* eslint-disable @typescript-eslint/no-var-requires */
const withPWA = require("next-pwa");
const siteMetaData = require("./data/siteMetadata");

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const isProd = process.env.NODE_ENV === "production";

module.exports = withBundleAnalyzer(
  withPWA({
    reactStrictMode: true,
    webpack: (config, { dev, isServer }) => {
      // SVG Loader
      config.module.rules.push({
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      });

      // Replace React with Preact only in client production build
      if (!dev && !isServer) {
        Object.assign(config.resolve.alias, {
          "react/jsx-runtime.js": "preact/compat/jsx-runtime",
          react: "preact/compat",
          "react-dom": "preact/compat",
        });
      }

      return config;
    },

    pwa: {
      dest: "public",
      disable: !isProd,
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
