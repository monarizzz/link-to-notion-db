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
- **テスト**: Vitest
- **Storybook**: コンポーネント開発・ドキュメント

## ディレクトリ構成

```
src/
├── app/        # Next.js App Router (ページ・レイアウト)
├── commons/    # 共通コンポーネント・ユーティリティ
├── features/   # 機能単位のモジュール
├── infra/      # 外部API・インフラ層 (Notion クライアントなど)
└── libs/       # 汎用ライブラリ・ヘルパー
```

## セットアップ

```bash
npm install
```

`.env.local` を作成し、Notion の認証情報を設定してください:

```env
NOTION_API_KEY=your_notion_api_key
NOTION_DATABASE_ID=your_database_id
```

## 開発

```bash
# 開発サーバー起動
npm run dev

# Storybook 起動
npm run storybook
```

アプリ: [http://localhost:3000](http://localhost:3000)
Storybook: [http://localhost:6006](http://localhost:6006)

## テスト

```bash
npm run test
```

## ビルド

```bash
npm run build
npm run start
```
