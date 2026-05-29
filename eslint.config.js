import js from "@eslint/js";

import globals from "globals";

import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

import {
  defineConfig,
  globalIgnores
} from "eslint/config";

export default defineConfig([

  // Ignore Build Folder
  globalIgnores([
    "dist",
    "node_modules"
  ]),

  {
    files: [
      "**/*.{js,jsx}"
    ],

    extends: [

      js.configs.recommended,

      reactHooks.configs.flat.recommended,

      reactRefresh.configs.vite
    ],

    languageOptions: {

      globals: {
        ...globals.browser,
        ...globals.node
      },

      parserOptions: {

        ecmaVersion: "latest",

        sourceType: "module",

        ecmaFeatures: {
          jsx: true
        }
      }
    },

    rules: {

      // Disable unused vars warning
      "no-unused-vars": "off",

      // React Refresh Rule
      "react-refresh/only-export-components": [
        "warn",
        {
          allowConstantExport: true
        }
      ]
    }
  }
]);
