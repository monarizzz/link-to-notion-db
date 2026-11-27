// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import { defineConfig, globalIgnores } from "eslint/config";
import importPlugin from "eslint-plugin-import";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import tseslint from "typescript-eslint";

const eslintConfig = defineConfig([
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    "apps/web/.next/**",
    "apps/web/out/**",
    "apps/web/build/**",
    "apps/web/next-env.d.ts",
    // 生成物・ローカル状態
    "apps/web/storybook-static/**",
    "apps/server/.wrangler/**",
    "apps/web/.wrangler/**",
    "apps/web/.open-next/**",
    "apps/server/worker-configuration.d.ts",
  ]),
  {
    files: ["apps/web/**"],
    // eslint-plugin-import は ESLint 10 に未対応のため、互換層を挟む
    extends: [
      fixupConfigRules([...nextVitals, ...nextTs]),
      storybook.configs["flat/recommended"],
    ],
    settings: {
      next: { rootDir: "apps/web/" },
    },
  },
  {
    files: ["apps/server/**"],
    extends: [tseslint.configs.recommended],
  },
  {
    files: ["apps/**"],
    // eslint-config-next は apps/web にしか import プラグインを登録しないため、ここで両方に登録する
    plugins: { import: fixupPluginRules(importPlugin) },
    rules: {
      "import/order": [
        "error",
        {
          groups: [
            ["builtin", "external"],
            "internal",
            ["parent", "sibling", "index"],
          ],
          pathGroups: [
            { pattern: "@/**", group: "internal" },
            { pattern: "@public/**", group: "internal" },
          ],
          pathGroupsExcludedImportTypes: ["builtin"],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],
    },
  },
]);

export default eslintConfig;
