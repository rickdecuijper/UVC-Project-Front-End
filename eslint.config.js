import prettier from "eslint-config-prettier";
import { includeIgnoreFile } from "@eslint/compat";
import js from "@eslint/js";
import svelte from "eslint-plugin-svelte";
import globals from "globals";
import { fileURLToPath } from "node:url";
import svelteConfig from "./svelte.config.js";
import sonarjs from "eslint-plugin-sonarjs";

const gitignorePath = fileURLToPath(new URL("./.gitignore", import.meta.url));

export default [
  includeIgnoreFile(gitignorePath),

  js.configs.recommended,
  ...svelte.configs.recommended,
  prettier,
  ...svelte.configs.prettier,

  {
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
    rules: {
      "no-unused-vars": ["error", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
      "no-undef": "error",
      "no-console": ["error", { allow: ["warn", "error"] }],
      "no-debugger": "error",
      eqeqeq: ["error", "always"],
      curly: ["error", "all"],
      "no-empty": "error",
      "no-var": "error",
      "prefer-const": "error",
      "object-shorthand": "error",
      "no-nested-ternary": "error",
      "no-unneeded-ternary": "error",

      "svelte/require-each-key": "error",
      "svelte/no-at-html-tags": "error",
      "svelte/no-unused-svelte-ignore": "error",
      "svelte/no-useless-mustaches": "error",
      "svelte/first-attribute-linebreak": ["error", { multiline: "below", singleline: "below" }],
      "svelte/no-inner-declarations": "error",
      "svelte/valid-compile": "error",
      "svelte/no-ignored-unsubscribe": "error",
      "svelte/no-reactive-literals": "error"
    }
  },

  {
    files: ["**/*.svelte", "**/*.svelte.js"],
    languageOptions: { parserOptions: { svelteConfig } }
  },

  // SonarJS for code smells + complexity
  {
    plugins: { sonarjs },
    rules: {
      ...sonarjs.configs.recommended.rules,
      complexity: ["warn", { max: 33 }],
      "sonarjs/cognitive-complexity": ["warn", 33]
    }
  }
];
