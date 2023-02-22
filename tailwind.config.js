/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          50: "#F1F2F2",
          400: "#8E9491",
          600: "#565B59",
        },
        primary: {
          500: "#218758"
        }
      }
    },
  },
  plugins: [],
}