/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#f4f5f1", ink: "#151515", muted: "#76797d", line: "#e6e7e2", shell: "#d5dadc",
        deep: { DEFAULT: "#151515", 2: "#232323", 3: "#0d0d0d" },
        signal: { DEFAULT: "#d6f45b", soft: "#f0fbc8", ink: "#151515" },
        lime: { DEFAULT: "#d6f45b", soft: "#f0fbc8" },
        violet: { DEFAULT: "#a77bff", soft: "#efe6ff", ink: "#6c3fd6" },
        sky: { DEFAULT: "#bcd6ee", soft: "#e7f0f9", ink: "#3d6fd6" },
        rose: { soft: "#fde6ec", ink: "#e0466b" },
        mint: { soft: "#e3f6e6", ink: "#2c9a4b" },
        live: "#ff5a1f",
        ok: "#2c9a4b", warn: "#c2620a", bad: "#d6334b",
      },
      fontFamily: {
        display: ['"Poppins"', "system-ui", "sans-serif"],
        sans: ['"DM Sans"', "system-ui", "-apple-system", '"Segoe UI"', "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "Menlo", "monospace"],
      },
      borderRadius: { card: "28px", img: "22px" },
    },
  },
  plugins: [],
};
