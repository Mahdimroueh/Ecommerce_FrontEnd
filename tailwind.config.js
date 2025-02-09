/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-color": "#00927c",
        "secondary-color": "#eaf0f1",
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        // playfair: ["Playfair Display", "serif"],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      "winter",
      "dracula", // Use the built-in light theme
      // You can add other themes here if needed
    ],
  },
};
