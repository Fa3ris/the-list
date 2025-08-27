import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
// import pluginVue from "eslint-plugin-vue";
// import markdown from "@eslint/markdown";
// import css from "@eslint/css";
import { defineConfig, globalIgnores } from "eslint/config";

// FIXME: understand how to configure this shit
export default defineConfig([
  globalIgnores(['docs/.vitepress/{cache,dist}/', 'eslint.config.js']),
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    plugins: {
      js,
      tseslint
    },
    extends: [js.configs.recommended, tseslint.configs.recommendedTypeChecked],
    languageOptions: { globals: globals.browser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      }
     },
  },
  // {
  //   files: ["**/*.{ts,mts,cts}"],

  // }
  // tseslint.configs.recommended,
  // pluginVue.configs["flat/essential"],
  // {
  //   files: ["**/*.vue"],
  //   languageOptions: { parserOptions: { parser: tseslint.parser } },
  // },
  // {
  //   files: ["**/*.md"],
  //   ...markdown.configs.recommended,
  // },
  // {
  //   files: ["**/*.css"],
  //   ...css.configs.recommended
  // },
]);
