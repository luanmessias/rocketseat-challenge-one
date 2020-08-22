module.exports = {
  env: {
    es2020: true,
    node: true,
  },
  plugins: ["prettier"],
  extends: ["airbnb-base", "prettier"],
  parserOptions: {
    ecmaVersion: 11,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    "class-methods-use-this": "off",
    "no-param-reassign": "off",
    camelcase: "off",
    "no-unused-vars": ["error", { argsIgnorePattern: "next" }],
    "prettier/prettier": "error",
  },
};
