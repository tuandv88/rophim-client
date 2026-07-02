import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#050505",
        panel: "#111111",
        line: "rgba(255,255,255,0.12)",
        brand: "#E50914",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 20px 60px rgba(229, 9, 20, 0.22)",
      },
    },
  },
  plugins: [],
} satisfies Config;
