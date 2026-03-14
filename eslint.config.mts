import js from "@eslint/js"
import globals from "globals"
import tseslint from "typescript-eslint"
import { defineConfig } from "eslint/config"

export default defineConfig([
  {
    ignores: ["dist/**", "node_modules/**"]
  },

  {
    files: ["**/*.ts", "**/*.js"],
    languageOptions: {
      globals: {
        ...globals.node
      }
    }
  },

  js.configs.recommended,
  ...tseslint.configs.recommended,

  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "warn",
      "no-useless-catch": "off"
    }
  }
])