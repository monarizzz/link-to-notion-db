# server

リポジトリのルートで実行する。

```bash
# ローカルでは Access を通らないため、JWT の検証を外す設定を置く（本番・プレビューには設定しない）
cp apps/server/.dev.vars.example apps/server/.dev.vars

# 開発サーバー起動（http://localhost:8787）
pnpm dev:server

# ローカルの D1 にマイグレーションを当て、開発用の初期データ（seed.sql）を入れる
pnpm --filter server seed

# wrangler.jsonc から Bindings の型（CloudflareBindings）を生成する
pnpm --filter server cf-typegen

# Cloudflare にデプロイする
pnpm --filter server run deploy
```
