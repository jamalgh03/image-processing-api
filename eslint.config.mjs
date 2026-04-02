import js from "@eslint/js";
import globals from "globals";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";

export default [
  {
    ignores: [
      "dist/",
      "node_modules/",
      "**/*.d.ts"
    ],
  },
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: { 
      globals: globals.node 
    },
    rules: {
      ...js.configs.recommended.rules,
    },
  },
  {
    files: ["src/**/*.ts", "spec/**/*.ts"], 
    languageOptions: {
      parser: tsparser,
      globals: globals.node,
    },
    plugins: { 
      "@typescript-eslint": tseslint 
    },
    rules: {
      ...tseslint.configs.recommended.rules,
    },
  },
];