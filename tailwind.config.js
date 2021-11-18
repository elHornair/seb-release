const colors = require("tailwindcss/colors");

module.exports = {
  purge: {
    content: ["./public/**/*.html", "./src/**/*.{vue,js}"],
  },
  darkMode: false,
  theme: {
    extend: {
      colors: {
        primary: colors.blueGray,
        eth: {
          red: "rgb(210, 32, 53)",
          green: "rgb(100, 201, 79)",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
