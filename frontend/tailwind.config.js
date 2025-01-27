/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark", "cupcake"], // or false to disable themes
    darkTheme: "dark",
    base: true,
    styled: true,
    utils: true,
    logs: true,
  },
};
