> ⚠️ 現在開発中です

作業時間と状態を記録し、振り返りや再開に使う作業管理アプリケーションです。

## 技術スタック

### Web（`apps/web`）

- **フレームワーク**: [Next.js](https://nextjs.org) 16 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS v4
- **UIコンポーネント**: shadcn/ui (Radix UI)
- **フォーム**: React Hook Form + Zod
- **デプロイ**: Cloudflare Workers（[OpenNext](https://opennext.js.org/cloudflare)）
- **テスト**: Vitest・Storybook

### API（`apps/server`）

- **フレームワーク**: [Hono](https://hono.dev)（Cloudflare Workers）
- **言語**: TypeScript
- **DB**: Cloudflare D1 (SQLite)
- **認証**: Cloudflare Access
- **テスト**: Vitest

## ドキュメント

- 設計・要件: [docs/](docs/README.md)
- Web のコマンド: [apps/web/README.md](apps/web/README.md)
- API のコマンド: [apps/server/README.md](apps/server/README.md)

## セットアップ

Node.js 24 系と pnpm が必要です（`package.json` の `engines` と `packageManager` で指定しています）。
pnpm workspaces で管理しているため、`pnpm install` と `pnpm <script>` はリポジトリのルートで実行します。

```bash
pnpm install
```

各アプリの準備は、それぞれの README を参照してください。

## 開発

`dev` `build` `typecheck` `test` は web と server の両方を対象にする。
片方だけ動かす場合は `:web` / `:server` を付ける（例: `pnpm dev:web`）。

```bash
# 開発サーバー起動（web: http://localhost:3000、API: http://localhost:8787）
pnpm dev

# 型チェック
pnpm typecheck

# テスト
pnpm test

# ビルド
pnpm build

# Lint・フォーマット
pnpm lint
pnpm format
```
