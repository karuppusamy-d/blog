/* eslint-disable @typescript-eslint/no-var-requires */
const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Poppins'", "sans-serif"],
        mono: ["Consolas", "Monaco", "Andale Mono", "Ubuntu Mono", "monospace"],
      },
      colors: {
        primary: colors.sky,
        gray: colors.neutral,
        code: "#f5f7ff",
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme("colors.gray.700"),
            a: {
              color: theme("colors.primary.400"),
              "&:hover": {
                color: `${theme("colors.primary.500")} !important`,
              },
              code: { color: theme("colors.primary.400") },
            },
            h1: {
              fontWeight: "700",
              letterSpacing: theme("letterSpacing.tight"),
              color: theme("colors.gray.900"),
            },
            h2: {
              fontWeight: "700",
              letterSpacing: theme("letterSpacing.tight"),
              color: theme("colors.gray.900"),
            },
            h3: {
              fontWeight: "600",
              color: theme("colors.gray.900"),
            },
            "h4,h5,h6": {
              fontWeight: "500",
              color: theme("colors.gray.900"),
            },
            "p > code": {
              color: theme("colors.primary.500"),
              backgroundColor: theme("colors.code"),
              padding: "0.3em 0.6em",
              borderRadius: "0.25rem",
            },
            "code::before": {
              content: "none",
            },
            "code::after": {
              content: "none",
            },
            hr: { borderColor: theme("colors.gray.200") },
            "ol li::marker": {
              fontWeight: "600",
              color: theme("colors.gray.500"),
            },
            "ul li::marker": {
              backgroundColor: theme("colors.gray.500"),
            },
            strong: { color: theme("colors.gray.600") },
            blockquote: {
              color: theme("colors.gray.900"),
              borderLeftColor: theme("colors.gray.200"),
              paddingLeft: "0.6em",
            },
            pre: {
              color: theme("colors.gray.900"),
              backgroundColor: theme("colors.code"),
            },
          },
        },
        dark: {
          css: {
            color: theme("colors.gray.300"),
            a: {
              color: theme("colors.primary.500"),
              "&:hover": {
                color: `${theme("colors.primary.400")} !important`,
              },
              code: { color: theme("colors.primary.500") },
            },
            h1: {
              fontWeight: "700",
              letterSpacing: theme("letterSpacing.tight"),
              color: theme("colors.gray.100"),
            },
            h2: {
              fontWeight: "700",
              letterSpacing: theme("letterSpacing.tight"),
              color: theme("colors.gray.100"),
            },
            h3: {
              fontWeight: "600",
              color: theme("colors.gray.100"),
            },
            "h4,h5,h6": {
              color: theme("colors.gray.100"),
            },
            "p > code": {
              backgroundColor: theme("colors.gray.800"),
              color: theme("colors.primary.400"),
            },
            hr: { borderColor: theme("colors.gray.700") },
            "ol li::marker": {
              fontWeight: "600",
              color: theme("colors.gray.400"),
            },
            "ul li::marker": {
              backgroundColor: theme("colors.gray.400"),
            },
            strong: { color: theme("colors.gray.100") },
            thead: {
              th: {
                color: theme("colors.gray.100"),
              },
            },
            tbody: {
              tr: {
                borderBottomColor: theme("colors.gray.700"),
              },
            },
            blockquote: {
              color: theme("colors.gray.100"),
              borderLeftColor: theme("colors.gray.700"),
            },
            pre: {
              backgroundColor: theme("colors.gray.800"),
              color: theme("colors.gray.200"),
            },
          },
        },
      }),
      boxShadow: {
        light: "0 0 12px 0 rgba(0, 0, 0, 0.09)",
        dark: "0 1px 1px 0 rgba(75, 85, 99, 0.3)",
        "light-lg": "0 2px 20px 0 rgba(0, 0, 0, 0.09)",
        "scroll-to": "0px 2px 15px 2px rgb(0 0 0 / 9%)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
