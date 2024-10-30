// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: [
    "expo",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: [".eslintrc.cjs", "assets"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh"],
  rules: {
    "@typescript-eslint/no-var-requires": 0,
  },
};
