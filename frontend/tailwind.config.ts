import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--background))",
        foreground: "rgb(var(--foreground))",
      },
      boxShadow: {
        glass: "0 12px 40px rgba(0,0,0,0.25)",
      },
    },
  },
  plugins: [],
};

export default config;
