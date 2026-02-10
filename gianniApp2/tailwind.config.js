/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        olive: "#6b8e23",
        sand: "#f5f1e8",
        earth: "#c2a26b",
      },
    },
  },
  plugins: [],
};
