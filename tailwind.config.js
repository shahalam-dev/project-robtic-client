module.exports = {
  darkMode: "class",
  daisyui: {
    themes: ["emerald"],
  },
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {},
  },
  plugins: [require("daisyui")],
};
