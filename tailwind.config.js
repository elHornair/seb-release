module.exports = {
  purge: {
    content: ["./public/**/*.html", "./src/**/*.{vue,js}"],
  },
  darkMode: false,
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
