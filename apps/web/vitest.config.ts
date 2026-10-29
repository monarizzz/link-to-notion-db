import path from "node:path";
import { fileURLToPath } from "node:url";

import { defineConfig } from "vitest/config";

import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";

import { playwright } from "@vitest/browser-playwright";

const dirname =
  typeof __dirname !== "undefined"
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  test: {
    projects: [
      {
        extends: true,
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
          storybookTest({ configDir: path.join(dirname, ".storybook") }),
        ],
        // CI のようにキャッシュが無い初回実行では、Vite が Story を読み込むたびに
        // 依存の最適化をやり直してテスト途中でリロードし、多数の Story が失敗する。
        // Story が使う依存を列挙して起動時に最適化を済ませる。
        // 新しい依存を Story から使い、CI で "optimized dependencies changed" が出たら追記する
        optimizeDeps: {
          include: [
            "@storybook/addon-a11y/preview",
            "@storybook/nextjs-vite",
            "storybook/test",
            "react",
            "next/cache",
            "next/link",
            "next/navigation",
            "react-hook-form",
            "@hookform/resolvers/zod",
            "zod",
            "dayjs",
            "dayjs/plugin/utc",
            "dayjs/plugin/timezone",
            "dayjs/plugin/duration",
            "date-fns",
            "@fullcalendar/react",
            "@fullcalendar/daygrid",
            "@fullcalendar/timegrid",
            "@fullcalendar/interaction",
            "@fullcalendar/core/locales/ja",
            "lucide-react",
            "radix-ui",
            "clsx",
            "tailwind-merge",
          ],
        },
        test: {
          name: "storybook",
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [{ browser: "chromium" }],
          },
          setupFiles: [".storybook/vitest.setup.ts"],
        },
      },
      {
        test: {
          name: "node",
          include: ["src/**/*.test.ts"],
        },
      },
    ],
  },
});
