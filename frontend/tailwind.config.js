/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["cyberpunk", "dark"],
    darkTheme: "dark",
    base: true,
    styled: true,
    utils: true,
    logs: true,
  },
};
