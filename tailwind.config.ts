import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          ink: "#050B14",
          navy: "#071B36",
          blue: "#0E3A67",
          steel: "#6E8398",
          ice: "#E7EEF4",
          paper: "#F5F7F9",
          amber: "#F4B91F",
          cyan: "#58B5E1",
          line: "#A8B8C7",
        },
      },
      fontFamily: {
        display: ["Space Grotesk", "Inter", "ui-sans-serif", "system-ui"],
        sans: ["Inter", "ui-sans-serif", "system-ui"],
        mono: ["IBM Plex Mono", "ui-monospace", "SFMono-Regular"],
      },
      boxShadow: {
        technical: "0 24px 80px rgba(3, 14, 28, 0.18)",
        amber: "0 16px 50px rgba(244, 185, 31, 0.2)",
      },
      backgroundImage: {
        blueprint:
          "linear-gradient(rgba(88,181,225,.07) 1px, transparent 1px), linear-gradient(90deg, rgba(88,181,225,.07) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
} satisfies Config;
