/** @type {import('tailwindcss').Config} */
const themeConfig = require('./src/theme-config').default;

module.exports = {
   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
   theme: {
      extend: {
         colors: themeConfig.colors,
      },
   },
   plugins: [],
};
