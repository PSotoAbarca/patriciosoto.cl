import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: "#F0F3F0",
          green: "#1A6B3C",
          gold: "#F1C40F",
          dark: "#1C1C1E",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      typography: {
        DEFAULT: {
          css: {
            color: "#1C1C1E",
            a: { color: "#1A6B3C", "&:hover": { color: "#F1C40F" } },
            h1: { color: "#1C1C1E" },
            h2: { color: "#1C1C1E", borderBottomColor: "#F1C40F" },
            h3: { color: "#1C1C1E" },
            strong: { color: "#1A6B3C" },
            blockquote: {
              borderLeftColor: "#1A6B3C",
              color: "#1C1C1E",
            },
            code: {
              color: "#1A6B3C",
              backgroundColor: "#F0F3F0",
              padding: "0.2em 0.4em",
              borderRadius: "0.25rem",
            },
            "code::before": { content: '""' },
            "code::after": { content: '""' },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
