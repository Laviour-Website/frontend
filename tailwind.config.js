/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  plugins: [require("tw-elements/dist/plugin")],
  theme: {
    extend: {
      screens: {
        xs: "350px",
        btw: "450px",
      },
      gridTemplateColumns: {
        // Simple 16 column grid
        "product-4": "repeat(4, minmax(auto, 1fr))",
        "product-3": "repeat(3, minmax(auto, 1fr))",
        "product-2": "repeat(2, minmax(auto, 1fr))",

        // Complex site-specific column configuration
        footer: "200px minmax(900px, 1fr) 100px",
      },
      gridTemplateRows: {
        // Simple 8 row grid
        20: "repeat(20, minmax(0, 1fr))",

        // Complex site-specific row configuration
        // 'layout': '200px minmax(900px, 1fr) 100px',
      },
      gridRowStart: {
        8: "8",
        9: "9",
        10: "10",
        11: "11",
        12: "12",
        13: "13",
        14: "14",
        15: "15",
        16: "16",
        17: "17",
      },
      gridRowEnd: {
        8: "8",
        9: "9",
        10: "10",
        11: "11",
        12: "12",
        15: "15",
        16: "16",
        17: "17",
        21: "21",
      },
    },
    keyframes: {
      initialSlideA: {
        "0%": { transform: "translateX(100%)" },
        "100%": { transform: "translateX(0%)" },
      },
      initialSlideB: {
        "0%": { transform: "translateX(100%)" },
        "100%": { transform: "translateX(100%)" },
      },

      nextSlideB: {
        "0%": { transform: "translateX(100%)" },
        "100%": { transform: "translateX(0%)" },
      },
      nextSlideA: {
        "0%": { transform: "translateX(0%)" },
        "100%": { transform: "translateX(-100%)" },
      },
      prevSlideB: {
        "0%": { transform: "translateX(0%)" },
        "100%": { transform: "translateX(100%)" },
      },
      nextSlideA: {
        "0%": { transform: "translateX(-100%)" },
        "100%": { transform: "translateX(0%)" },
      },
    },
    animation: {
      initialSlideA: "initialSlideA 1s ease-in-out",
      initialSlideB: "initialSlideB 1s ease-in-out infinite",
      nextSlideA: "nextSlideA 1s ease-in-out",
      nextSlideB: "nextSlideB 1s ease-in-out",
      prevSlideA: "prevSlideA 1s ease-in-out",
      prevSlideA: "prevSlideB 1s ease-in-out",
    },
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }

      "3xl": "1800px",
      // => @meida (min-width: 1800px)
    },
  },
};
