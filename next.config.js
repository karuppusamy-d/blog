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
      config.module.rules.push({
        test: /\.(png|jpe?g|gif|mp4)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              publicPath: "/_next",
              name: "static/media/[name].[hash].[ext]",
            },
          },
        ],
      });

      config.module.rules.push({
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      });

      if (!dev && !isServer) {
        // Replace React with Preact only in client production build
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
      // TODO:Temporary Fix for PWA
      buildExcludes: [/middleware-manifest\.json$/],
    },
  })
);
