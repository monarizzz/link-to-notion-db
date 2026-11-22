# CI

GitHub Actions のワークフローと、それぞれが動く条件・やること。定義は [.github/workflows/](../../.github/workflows/) にある。

## ワークフロー

| ワークフロー | ジョブ | 動く条件 |
| --- | --- | --- |
| `repo` | Format check（`pnpm format:check`）・Lint（`pnpm lint`） | 常に |
| `web` | Type check（`pnpm typecheck:web`） | `apps/web/**`・`apps/server/**`・共通ファイル |
| `storybook` | Storybook test（`pnpm test:storybook`） | `apps/web/**`・共通ファイル |
| `server` | Type check（`pnpm typecheck:server`）・Test（`pnpm test:server`） | `apps/server/**`・共通ファイル |
| `Claude Code` | `@claude` への応答 | Issue の本文・タイトル、Issue・PR のコメント、PR のレビューに `@claude` があるとき |

- 共通ファイルは `package.json`・`pnpm-lock.yaml`・`pnpm-workspace.yaml` と、そのワークフロー自身
- `web` は server の型（`AppType` など）を参照するため、server の変更でも型チェックする
- `repo`・`web`・`storybook`・`server` は PR と main への push で動く。main で作ったキャッシュしか PR から読めないため
- main に必須チェックは無い。動かなかったワークフローがあっても、PR のマージは止まらない

## 共通の構成

- 同じ PR に続けて push したときは、古い実行を打ち切る（`concurrency`）
- 権限は `contents: read` のみ
- 各ジョブが `node_modules`（ルートと `apps/*`）を自分でキャッシュする。キーは `pnpm-lock.yaml` のハッシュで、ヒットしたときは `pnpm install` を飛ばす
- install 専用の前段ジョブは置かず、ジョブ間に依存関係を作らない
- `storybook` は Playwright のブラウザ本体（`~/.cache/ms-playwright`）も別にキャッシュする

## 依存の更新

- Dependabot が GitHub Actions と npm の依存を毎週確認し、それぞれ 1 つの PR にまとめて更新する（[.github/dependabot.yml](../../.github/dependabot.yml)）

## CI で動かしていないもの

- web の単体テスト（`pnpm test:web`）
- ビルド（`pnpm build:web`・`pnpm build:server`）

## 改善の予定

- pnpm の store のキャッシュを外す（#241）
- セットアップ手順を composite action にまとめる（#242）
