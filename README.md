# link-to-notion-db

> ⚠️ 現在開発中です

Notion データベースと連携する作業管理アプリケーションです。

## 技術スタック

- **フレームワーク**: [Next.js](https://nextjs.org) 16 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS v4
- **UIコンポーネント**: shadcn/ui (Radix UI)
- **フォーム**: React Hook Form + Zod
- **外部連携**: Notion API (`@notionhq/client`)
- **API**: [Hono](https://hono.dev) (Cloudflare Workers)
- **DB**: Cloudflare D1 (SQLite)
- **テスト**: Vitest
- **Storybook**: コンポーネント開発・ドキュメント

## ディレクトリ構成

```
apps/
├── web/            # Next.js
│   └── src/
│       ├── app/        # Next.js App Router (ページ・レイアウト)
│       ├── commons/    # 共通コンポーネント・ユーティリティ
│       ├── features/   # 機能単位のモジュール
│       ├── infra/      # 外部API・インフラ層 (Notion クライアントなど)
│       └── libs/       # 汎用ライブラリ・ヘルパー
└── server/         # Hono (Cloudflare Workers)
```

pnpm workspaces で管理しています。`pnpm install` と `pnpm <script>` はリポジトリのルートで実行します。

## セットアップ

Node.js 24 系と pnpm が必要です（`package.json` の `engines` と `packageManager` で指定しています）。

```bash
pnpm install
cp apps/web/.env.example apps/web/.env.local
```

`apps/web/.env.local` に Notion と Google ログインの認証情報を設定してください。各変数の意味は `.env.example` のコメントを参照してください。

## 開発

```bash
# 開発サーバー起動
pnpm dev

# Storybook 起動
pnpm storybook
```

アプリ: [http://localhost:3000](http://localhost:3000)
Storybook: [http://localhost:6006](http://localhost:6006)

## テスト

```bash
pnpm test

# apps/server のテスト
pnpm test:server
```

## ビルド

```bash
pnpm build
pnpm start
```
