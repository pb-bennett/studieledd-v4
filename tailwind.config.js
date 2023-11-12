/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary1: "#202E44",
        primary2: "#A9BBC8",
        accent: "#8B734C",
        neutral1: "#F2F2EB",
        neutral2: "#C7BCAB",
      },
    },
  },
  plugins: [],
};
