module.exports = {
  root: true,

  env: {
    node: true,
  },

  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-essential",
    "plugin:vue/vue3-strongly-recommended",
    "plugin:vue/vue3-recommended",
    "@vue/prettier",
    "@vue/typescript",
  ],

  parserOptions: {
    parser: "@typescript-eslint/parser",
  },

  rules: {},
};
