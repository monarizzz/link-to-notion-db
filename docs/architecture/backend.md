# バックエンド構成

Notion をやめ、Hono の API と D1 に移行したあとの構成。**実装前の設計**であり、現状のコードはまだ [data-model.md](data-model.md) の Notion 構成のまま。

## 目的

1. Notion への依存をやめ、DB 設計から見直す
2. Web 以外（Mac アプリ・CLI など）もクライアントにできるようにする
3. Next.js では曖昧だった FE と BE の境界を、分けて作ることで理解する

## 全体構成

```
[Web: Next.js / Vercel]   [Mac アプリ: Swift（将来）]
          │                        │
          └── HTTPS + API キー ─────┘
                 契約: openapi.json
                       │
          [API: Hono / Cloudflare Workers]
                       │
                 [DB: D1（SQLite）]
```

## 決定事項

| 項目 | 決定 | 理由 |
| --- | --- | --- |
| 移行の進め方 | API と新しい DB を同時に作り、機能単位で Web の接続先を切り替える | 短期間で Notion をやめるため、Notion につなぐ仮の API を作るコストが見合わない |
| API | Hono | TypeScript のまま書けるので、言語ではなく BE の設計の学習に集中できる |
| API 定義 | `@hono/zod-openapi` で `openapi.json` を出力する | Swift のクライアントを生成するため。Web も同じ仕様から生成し、仕様のファイルを FE と BE の境界にする |
| Web からの呼び出し | `openapi.json` から生成したクライアントを使う（Hono RPC は使わない） | Web と Swift を同じ立場のクライアントにし、Web が API の実装に依存しないようにする |
| リポジトリ | モノレポ | `openapi.json` を 1 か所に置き、Web からも Swift からも直接読める |
| API のデプロイ先 | Cloudflare Workers | 無料枠に収まる。コンテナの運用は今回のスコープ外 |
| Web のデプロイ先 | Vercel（現状のまま） | |
| DB | D1 | 無料。Supabase は無料プランだと 1 週間使わないとプロジェクトが停止する |
| 認証 | API はすべて API キーで守る。Web のログインは next-auth のまま | 利用者が 1 人のうちは十分。本格的な認証は後で作る |
| 公開の方法 | README のスクリーンショット・GIF と、公開した Storybook | 本物のデータを公開しない |

## ディレクトリ構成

```
apps/web          … Next.js（現在の src/ を移す）
apps/api          … Hono
packages/openapi  … openapi.json（API から出力し、各クライアントはここから型を生成する）
```

- Mac アプリは作るときに `apps/` へ追加する
- API キーは Next.js のサーバー側だけで扱い、ブラウザに渡さない

## 未決定

- ORM（Drizzle を使うか、SQL を直接書くか）
- API の中の層の構成
- API 設計（URL・エラーの形式・ページネーション）
- テストと CI
- 本格的な認証
- デモ環境（Wrangler の `[env.demo]` で、別の Worker と D1 を立てる案）
