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
          10: "#FBFCFC",
          50: "#F1F2F2",
          100: "#E3E4E4",
          150: "#EBEBEB",
          200: "#E7E8E8",
          300: "#C7C9C8",
          400: "#8E9491",
          600: "#565B59",
          900: "#0B0C0C",
        },
        primary: {
          50: "#E9F4EF",
          100: "#d3e7de",
          300: "#7AB79B",
          500: "#218758",
          600: "#196542"
        },
        red: {
          100: "#ED7668",
          600: "#D71616",
          800: "#D71616",
          900: "#FF2B63",
        },
        green: {
          100: "#7EC770",
          900: "#00B050",
        },
        yellow: {
          100: "#F4DC40",
        },
        orange: {
          100: "#FDAE4B",
          900: "#FF9739",
        },
        violet: {
          100: "#CC90E3",
          900: "#6E5EE6",
        },
        blue: {
          100: "#8DBED8",
          900: "#00ABFB",
        }
      }
    },
  },
  plugins: [],
}