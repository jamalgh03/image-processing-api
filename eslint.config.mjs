import js from "@eslint/js";
import globals from "globals";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    ignores: [
      "image-processing-api/src/**/*.js",
      "image-processing-api/src/**/*.d.ts",
      "image-processing-api/dist/",
      "image-processing-api/node_modules/",
      "node_modules/",
      "dist/",
    ],
  },
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.browser },
  },
  {
    files: ["image-processing-api/src/**/*.ts"],
    languageOptions: {
      parser: tsparser,
      globals: globals.node,
    },
    plugins: { "@typescript-eslint": tseslint },
    rules: {
      ...tseslint.configs.recommended.rules,
    },
  },
]);
