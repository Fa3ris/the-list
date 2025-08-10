import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";
import markdown from "@eslint/markdown";
import css from "@eslint/css";
import { defineConfig } from "eslint/config";

// FIXME: understand how to configure this shit
export default tseslint.config([
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,vue}"],
    ...js.configs.recommended,
    languageOptions: { globals: globals.browser },
  },
  tseslint.configs.recommended,
  pluginVue.configs["flat/essential"],
  {
    files: ["**/*.vue"],
    languageOptions: { parserOptions: { parser: tseslint.parser } },
  },
  {
    files: ["**/*.md"],
    ...markdown.configs.recommended,
  },
  {
    files: ["**/*.css"],
    ...css.configs.recommended
  },
]);
