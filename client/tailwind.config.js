import tailwindcssAnimate from "tailwindcss-animate";
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0f5da7",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      boxShadow: {
        "custom-border": "4px 4px 10px rgba(50, 155, 213, 1)",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};
