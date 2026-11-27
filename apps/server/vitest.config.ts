import { cloudflareTest, readD1Migrations } from "@cloudflare/vitest-plugin";
import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig(async () => {
  // migrations/ の SQL を読み込み、テスト用の D1 に適用できるよう binding として渡す
  const migrations = await readD1Migrations(
    path.join(import.meta.dirname, "migrations"),
  );

  return {
    plugins: [
      cloudflareTest({
        wrangler: { configPath: "./wrangler.jsonc" },
        miniflare: {
          bindings: {
            TEST_MIGRATIONS: migrations,
            // 手元の .dev.vars で検証を外していても、テストでは検証する
            SKIP_ACCESS_JWT: "",
          },
        },
      }),
    ],
    test: {
      setupFiles: ["./test/applyMigrations.ts", "./test/mockAccessCerts.ts"],
    },
  };
});
