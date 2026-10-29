# AGENTS.md

このリポジトリで作業するコーディングエージェント共通の指示。
指示はこのファイルに集約する。`CLAUDE.md` は本ファイルを読み込むだけで、内容を持たない。
設計の詳細は [docs/](docs/README.md) にある。

## 基本ルール

- 必ず日本語で応答すること
- thinking も日本語で行うこと

## プロジェクトの前提

- データの保存先は Notion DB だが、**別の DB へ移行する予定**。Notion 固有の構造をアプリ全体に広げない。
  Notion に依存している箇所は [docs/architecture/notion-db.md](docs/architecture/notion-db.md) にまとめている
- `.pen` ファイル（`ui.pen` など）の UI デザインは**確定ではない**。
  デザインより先に実装する機能も、デザインにあっても実装しない機能もある。
  デザインと実装が食い違っていても、それだけで実装をデザインに合わせない

## ブランチ

- 作業を始める前に毎回 `git fetch --prune` し、作業するブランチを `git pull` で最新にする
- リモートで削除済み（`git branch -vv` で `gone`）のローカルブランチは `git branch -d` で削除する
- `main` から切り、PR も `main` 宛てに作成する
- ブランチ名は `<種別>/<内容>`（例: `fix/restrict-allowed-emails`）。種別はコミットと同じ

## コミット

分け方の判断基準・並べる順序は [docs/workflow/git-commit-principles.md](docs/workflow/git-commit-principles.md) にまとめている。
コミットを作るときは、頼まれ方にかかわらず先にそれを読む。

### 粒度

**1 コミット = 1 つの論理的変更。**まとめて 1 コミットにしない。

- 新規コンポーネントは実装と `.stories.tsx` を 1 コミットにする
- 既存コンポーネントへの変更は、新規実装と別のコミットにする
- `apps/web/src/app/` の結線はコンポーネント実装と分ける
- 順序は依存の下から上へ（`libs` → `infra` → `commons` → `features` → `app`）

### メッセージ

件名は `<種別> <内容>`（例: `fix 許可したGoogleアカウントのみログインできるように制限する`）。

| 種別 | 使う場面 |
| --- | --- |
| `feat` | 機能の追加・変更 |
| `fix` | 不具合の修正 |
| `refactor` | 挙動を変えないコードの整理 |
| `docs` | ドキュメントのみの変更 |
| `ci` | CI・GitHub Actions の変更 |
| `chore` | 上のどれにも当たらない保守作業（依存更新・設定など） |

- 何を・どこに・どうしたかを書く。`fix` `修正` だけで終わらせない
- 判断を伴う変更は、本文になぜそうしたかを書く

## PR

- テンプレート（`.github/PULL_REQUEST_TEMPLATE.md`）の節をすべて埋める
- 「関連 Issue」には、閉じる Issue を `Close #123`、関連するだけの Issue を `Refs #123` と書く。無ければ「なし」
- Issue には種別に合うラベル（`enhancement` / `bug` / `refactor` / `documentation` / `ci` / `chore`）を付ける

## レビューの観点

- バグや不具合につながる実装
- セキュリティ上の懸念（認証・`ALLOWED_EMAILS` の判定・環境変数の扱い）
- 層の依存の向きを破っていないか（[docs/architecture/web-layers.md](docs/architecture/web-layers.md)）
- Notion 固有の構造を `infra` / `libs/notion` 以外へ広げていないか
- テストの不足

## worktree

作業用に worktree を作った場合、その作業が終わった時点で削除する。ブランチは残す。

```bash
git worktree remove <パス>
git worktree list
```

## Storybook

- Story を書く際は `parameters.layout` に基本的に `"fullscreen"` を設定すること（レビュー指摘としては不要）
