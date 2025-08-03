import js from "@eslint/js";
import tseslint from "typescript-eslint";
import nodePlugin from "eslint-plugin-n";
import security from "eslint-plugin-security";
import importPlugin from "eslint-plugin-import";
import promisePlugin from "eslint-plugin-promise";
import unicorn from "eslint-plugin-unicorn";
import prettierConfig from "eslint-config-prettier";
import globals from "globals";

export default tseslint.config(
  // Global ignores
  {
    ignores: [
      "**/node_modules/**",
      "**/dist/**",
      "**/build/**",
      "**/.turbo/**",
      "**/coverage/**",
    ],
  },

  // Base configs
  js.configs.recommended,
  nodePlugin.configs["flat/recommended"],
  security.configs.recommended,
  promisePlugin.configs["flat/recommended"],
  prettierConfig, // Disables conflicting rules with Prettier

  // TypeScript configuration
  {
    files: ["**/*.ts", "**/*.mts", "**/*.cts"],
    extends: [...tseslint.configs.recommended, ...tseslint.configs.strict],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        ...globals.node,
        ...globals.es2022,
      },
    },
    plugins: {
      import: importPlugin,
      unicorn,
    },
    settings: {
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
        },
        node: {
          extensions: [".js", ".ts", ".mts", ".cts"],
        },
      },
    },
    rules: {
      // TypeScript specific rules
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
          fixStyle: "inline-type-imports",
        },
      ],
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/await-thenable": "error",
      "@typescript-eslint/no-misused-promises": "error",
      "@typescript-eslint/require-await": "error",
      "@typescript-eslint/return-await": ["error", "in-try-catch"],

      // Node.js best practices
      "n/no-deprecated-api": "error",
      "n/prefer-node-protocol": "error",
      "n/no-process-exit": "warn",
      "n/no-sync": ["error", { allowAtRootLevel: true }],
      "n/prefer-promises/fs": "error",
      "n/prefer-promises/dns": "error",

      // Security rules for APIs
      "security/detect-object-injection": "error",
      "security/detect-non-literal-fs-filename": "error",
      "security/detect-possible-timing-attacks": "warn",
      "security/detect-child-process": "warn",
      "security/detect-eval-with-expression": "error",

      // Promise handling
      "promise/prefer-await-to-then": "warn",
      "promise/catch-or-return": "error",
      "promise/no-nesting": "warn",
      "promise/no-return-wrap": "error",

      // Import organization and validation
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
      "import/no-unresolved": "error",
      "import/no-cycle": "error",
      "import/no-duplicates": "error",
      "import/first": "error",
      "import/newline-after-import": "error",
      "import/consistent-type-specifier-style": ["error", "prefer-top-level"],

      // Modern JavaScript patterns
      "unicorn/prefer-node-protocol": "error",
      "unicorn/prefer-module": "error",
      "unicorn/prefer-top-level-await": "error",
      "unicorn/no-array-for-each": "warn",
      "unicorn/prefer-spread": "error",
      "unicorn/consistent-function-scoping": "error",
      "unicorn/no-useless-undefined": "error",

      // Code quality
      "no-console": "off",
      "prefer-const": "error",
      "no-var": "error",
      "object-shorthand": "error",
      "no-debugger": "error",
    },
  },

  // JavaScript configuration
  {
    files: ["**/*.js", "**/*.mjs", "**/*.cjs"],
    extends: [tseslint.configs.disableTypeChecked],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.es2022,
      },
    },
    plugins: {
      import: importPlugin,
      unicorn,
    },
    rules: {
      "no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "import/order": [
        "error",
        {
          groups: ["builtin", "external", "internal", "parent", "sibling"],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],
    },
  },

  // Special overrides for config files
  {
    files: [
      "**/eslint.config.{js,mjs,ts}",
      "**/vite.config.{js,mjs,ts}",
      "**/vitest.config.{js,mjs,ts}",
      "**/prisma/seed.{js,ts}",
      "**/src/server.{js,ts}",
      "**/src/app.{js,ts}",
    ],
    rules: {
      "import/no-default-export": "off",
    },
  },

  // Test files - more permissive
  {
    files: ["**/*.test.{js,ts}", "**/*.spec.{js,ts}", "**/tests/**/*.{js,ts}"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "security/detect-object-injection": "off",
      "no-console": "off",
    },
  }
);
