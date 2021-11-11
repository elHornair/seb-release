const colors = require("tailwindcss/colors");

module.exports = {
  purge: {
    content: ["./public/**/*.html", "./src/**/*.{vue,js}"],
  },
  darkMode: false,
  theme: {
    extend: {
      colors: {
        primary: colors.amber,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
