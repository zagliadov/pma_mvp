/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'tablet': '640px',
        // => @media (min-width: 640px) { ... }

        'laptop': '1024px',
        // => @media (min-width: 1024px) { ... }

        'desktop': '1280px',
        // => @media (min-width: 1280px) { ... }
      },
      colors: {
        gray: {
          50: "#F1F2F2",
          100: "#E3E4E4",
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