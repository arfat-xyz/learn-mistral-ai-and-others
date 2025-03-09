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
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      keyframes: {
        rainbow: {
          to: { backgroundPosition: "300vh" },
        },
      },
      animation: {
        rainbow: "rainbow 4s linear infinite",
      },
    },
  },
  safelist: [
    "rainbowHeading", // Add your custom class here
  ],
  plugins: [],
};
export default config;
