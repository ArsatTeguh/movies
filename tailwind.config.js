/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        tombol: "#e32d20",
      },
      screens: {
        hp: "400px",
        tablet: "640px",

        laptop: "1024px",

        desktop: "1280px",
      },
    },
  },
  plugins: [],
};
