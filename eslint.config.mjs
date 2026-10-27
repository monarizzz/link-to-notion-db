// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

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
  ]),
  {
    files: ["apps/web/**"],
    extends: [nextVitals, nextTs, storybook.configs["flat/recommended"]],
    settings: {
      next: { rootDir: "apps/web/" },
    },
  },
]);

export default eslintConfig;
