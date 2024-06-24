/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",

    "./node_modules/@frames.js/render/dist/*.{ts,tsx,js,css}",
    "./node_modules/@frames.js/render/dist/**/*.{ts,tsx,js,css}",
    "./node_modules/frames.js/dist/render/next/*.{ts,tsx,js,css}",
    "./node_modules/frames.js/dist/**/*.{ts,tsx,js,css}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
