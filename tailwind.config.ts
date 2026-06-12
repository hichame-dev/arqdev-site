import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0A0A0A",
        smoke: "#1A1A1A",
        paper: "#F2EDE4",
        bone: "#EDE6D6",
        mist: "#F8F5EE",
        signal: "#8A7855",
        muted: "#6B6B6B",
        background: "#0A0A0A",

        navy: "#0A0A0A",
        dark: "#0A0A0A",
        surface: "#F2EDE4",
        cream: "#F2EDE4",
        lightgray: "#F8F5EE",
        indigo: "#8A7855",
        violet: "#8A7855",
        "slate-accent": "#6B6B6B",
      },
      fontFamily: {
        heading: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-space-mono)", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
