# web

リポジトリのルートで実行する。

## 準備

```bash
cp apps/web/.env.example apps/web/.env.local
```

各変数の意味は `.env.example` のコメントを参照する。

## 開発

```bash
# 開発サーバー起動（http://localhost:3000）
pnpm dev:web

# Storybook 起動（http://localhost:6006）
pnpm storybook

# web の本番サーバー起動（事前に pnpm build:web）
pnpm start
```

## Cloudflare Workers

```bash
cp apps/web/.dev.vars.example apps/web/.dev.vars

# Workers のローカル環境（workerd）で http://localhost:3000 に起動する
pnpm --filter web preview:cf

# Cloudflare にデプロイする（事前に pnpm --filter web exec wrangler login）
pnpm --filter web deploy:cf

# wrangler.jsonc から Bindings の型（CloudflareEnv）を生成する
pnpm --filter web cf-typegen
```

- `preview:cf` は API（`pnpm dev:server`）を起動しておくと、そこへつながる
- `preview:cf` は 3000 番で起動するため、`pnpm dev:web` とは同時に動かせない
- `.dev.vars` の `NEXTJS_ENV` で、読み込む `.env` ファイルを選ぶ
