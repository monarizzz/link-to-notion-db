# バックエンド構成

Notion をやめ、Hono の API と D1 に移行したあとの構成。**実装前の設計**であり、現状のコードはまだ [data-model.md](data-model.md) の Notion 構成のまま。

## 背景

- Next.js はフレームワークが代わりに処理する部分が大きい。Route Handler が API の定義だと意識せず、「この場所にファイルを置けば動く」という理解のまま実装できてしまっていた
- FE と BE をアプリとして分ければ、実装のたびに概念を理解する必要が出る
- 学びたいこと
  - 通信: 画面や機能ごとにどんな通信が起き、データがどこにあり、どのファイル同士がやり取りしているか
  - DB: アプリからの呼び出し方、マイグレーションの管理、整合性、どこで DB を触るか

## 目的

1. Notion への依存をやめ、DB 設計から見直す
2. 将来的に Web 以外（モバイル・デスクトップ・CLI）を主なクライアントにする。Next.js の Route Handler でも実現はできる
3. Next.js では曖昧だった FE と BE の境界を、分けて作ることで理解する。今後 Next.js は FE の責務だけを持つ

## 使用想定

- 利用者は自分 1 人
- ログインしないと閲覧できない

## 全体構成

```
[Web: Next.js / Vercel]   [Mac アプリ: Swift（将来）]
          │                        │
          └── HTTPS + ID トークン ──┘
                 契約: openapi.json
                       │
          [API: Hono / Cloudflare Workers]
                       │
                 [DB: D1（SQLite）]
```

## 決定事項

| 項目 | 決定 | 理由 |
| --- | --- | --- |
| 移行の進め方 | API と新しい DB を同時に作り、Web の接続先を一度に切り替える | 短期間で Notion をやめるため、Notion につなぐ仮の API を作るコストが見合わない |
| API | Hono | インターンで触って興味を持った。TypeScript のまま書けるので、言語ではなく BE の設計の学習に集中できる |
| API 定義 | `@hono/zod-openapi` で `openapi.json` を出力する | Swift のクライアントを生成するため。Web も同じ仕様から生成し、仕様のファイルを FE と BE の境界にする |
| Web からの呼び出し | ブラウザから、`openapi.json` から生成したクライアントで API を直接呼ぶ（Hono RPC は使わない） | Web と Swift を同じ立場のクライアントにし、Web が API の実装に依存しないようにする |
| リポジトリ | モノレポ | `openapi.json` を 1 か所に置き、Web からも Swift からも直接読める |
| API のデプロイ先 | Cloudflare Workers | 無料枠に収まる。Docker（コンテナの運用）の学習は今回のスコープ外 |
| Web のデプロイ先 | Vercel（現状のまま） | 将来は Next.js から React への移行も考えている |
| DB | D1 | 無料。Supabase は無料プランだと 1 週間使わないとプロジェクトが停止する |
| 認証 | クライアントで Google ログインし、取得した ID トークンを付けて API を呼ぶ。API はトークンを検証し、自分のアカウントだけ許可する | Web は公開し、個人データを HTML や静的ファイルに含めず、認証・認可済みの API からだけ返すため |
| 既存のデータ | Notion に残し、必要に応じて D1 へ移す | |
| 公開の方法 | README のスクリーンショット・GIF と、公開した Storybook | 本物のデータを公開しない |

## ディレクトリ構成

```
apps/web          … Next.js
apps/server       … Hono（API・認証など、サーバー側の処理）
packages/openapi  … openapi.json（API から出力し、各クライアントはここから型を生成する）
```

- Mac アプリは作るときに `apps/` へ追加する
- `apps/` の各アプリは自分の `package.json`・`tsconfig.json` を持つ。ルートの TypeScript・ESLint の設定は Next.js 用で、`apps/` を対象にしない
- Web は未ログインのときログイン画面だけを表示する

## 未決定

- ORM（Drizzle を使うか、SQL を直接書くか）
- API の中の層の構成
- API 設計（URL・エラーの形式・ページネーション）
- テストと CI
- 認証まわりの改善（ログインの維持・期限切れ時の再認証・Swift での対応）
- デモ環境（Wrangler の `[env.demo]` で、別の Worker と D1 を立てる案）
