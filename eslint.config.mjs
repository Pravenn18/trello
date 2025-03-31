import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";

// ESLint configuration
export default defineConfig({
  overrides: [
    {
      files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
      languageOptions: {
        globals: globals.browser, // Add browser globals
      },
    },
    {
      files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
      plugins: {
        js, // Use ESLint's JavaScript plugin
      },
      extends: [
        "plugin:js/recommended", // Use the recommended JavaScript configuration
      ],
    },
    {
      files: ["**/*.{ts,tsx}"], // TypeScript files
      parser: "@typescript-eslint/parser", // Specify the TypeScript parser
      parserOptions: {
        project: "./tsconfig.json", // Specify your TypeScript config file
      },
      extends: [
        "plugin:@typescript-eslint/recommended", // Use the recommended TypeScript rules
      ],
      plugins: ["@typescript-eslint"],
    },
    {
      files: ["**/*.{jsx,tsx}"], // JSX and TSX files
      extends: [
        "plugin:react/recommended", // Use the recommended React rules
        "plugin:react-hooks/recommended", // React Hooks rules
      ],
      plugins: ["react", "react-hooks"], // Add React and React Hooks plugin
      settings: {
        react: {
          version: "detect", // Automatically detect the version of React
        },
      },
    },
  ],
});
