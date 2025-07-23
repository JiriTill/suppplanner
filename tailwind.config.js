// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        // Define your custom colors based on the logo
        primary: {
          DEFAULT: '#227C70', // Dark Green from the apple
          light: '#339989',
          dark: '#1A5F56',
        },
        accent: {
          DEFAULT: '#FFC857', // Gold/Yellow-Orange from the capsule
          light: '#FFD98C',
          dark: '#E6B04D',
        },
        secondary: {
          DEFAULT: '#4CAF50', // A slightly brighter green for contrast if needed, or stick to primary/accent
        },
        // You can add the teal/blue-green here if you want to use it more explicitly
        // tealish: '#2A9D8F', // Example for the other capsule half
      },
      fontFamily: {
        sans: ['Inter', 'Arial', 'sans-serif'], // Add Inter as the primary font
      },
    },
  },
  plugins: [],
}
