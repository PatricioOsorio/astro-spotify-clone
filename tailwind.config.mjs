/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#fff0f9",
          100: "#ffe4f6",
          200: "#ffc9ee",
          300: "#ff9cdf",
          400: "#ff5fc7",
          500: "#ff30ad",
          600: "#f50d8b",
          700: "#e20074",
          800: "#b0045a",
          900: "#92094d",
          950: "#5b002b",
        },
      },
    },
  },
  plugins: [],
};
