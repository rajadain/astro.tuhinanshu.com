const js = require("@eslint/js");
const globals = require("globals");
const astro = require("eslint-plugin-astro");

module.exports = [
  {
    ignores: [".astro/**", ".husky/**", ".vscode/**", "node_modules/**", "public/**", "dist/**"],
  },
  js.configs.recommended,
  ...astro.configs["flat/recommended"],
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
];
