const withPWA = require("next-pwa");

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const isProd = process.env.NODE_ENV === "production";

module.exports = withBundleAnalyzer(
  withPWA({
    reactStrictMode: true,
    pageExtensions: ["js", "jsx", "md", "mdx"],
    future: {
      webpack5: true,
    },
    webpack: (config, { dev, isServer }) => {
      // SVG Loader
      config.module.rules.push({
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      });

      // Replace React with Preact only in client production build
      if (!dev && !isServer) {
        Object.assign(config.resolve.alias, {
          react: "preact/compat",
          "react-dom/test-utils": "preact/test-utils",
          "react-dom": "preact/compat",
        });
      }

      return config;
    },

    pwa: {
      dest: "public",
      disable: !isProd,
    },
  })
);
