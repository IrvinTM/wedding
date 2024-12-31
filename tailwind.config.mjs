import defaultTheme from "tailwindcss/defaultTheme";
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        elegant: ["Elegant", ...defaultTheme.fontFamily.sans],
        secondary: ["Secondary", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: "#B48B58",
        background: "#fef7ff",
      },
    },
  },
  plugins: [],
};
