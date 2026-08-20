/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand palette — pulled straight from the design system.
        // Use these as `bg-olive`, `text-sand`, `border-grey/40`, etc.
        olive: {
          DEFAULT: "#596341",
          50: "#f3f4ef",
          100: "#e4e7db",
          200: "#c9d0b8",
          300: "#a9b48e",
          400: "#83936a",
          500: "#596341", // base
          600: "#4a5237",
          700: "#3b422c",
          800: "#2c3121",
          900: "#1d2116",
        },
        cream: {
          DEFAULT: "#FDFCF3",
        },
        sand: {
          DEFAULT: "#E0CEB6",
        },
        grey: {
          DEFAULT: "#A8A8A2",
        },
      },
      fontFamily: {
        // Display / headline face
        display: ["Gilmer", "serif"],
        // Body / utility face
        body: ["Cormorant Garamond", "serif"],
        // Accent / editorial headline face (used sparingly on hero + section titles)
        accent: ["Bodoni Moda", "serif"],
      },
      letterSpacing: {
        widest2: "0.28em",
      },
      maxWidth: {
        content: "1440px",
      },
    },
  },
  plugins: [],
};