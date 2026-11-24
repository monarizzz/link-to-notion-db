# AGENTS.md

設計の詳細は [docs/](docs/README.md) にある。

## 基本ルール

- 必ず日本語で応答すること

## プロジェクトの前提

- `.pen` ファイル（`ui.pen` など）の UI デザインは**確定ではない**。
  デザインより先に実装する機能も、デザインにあっても実装しない機能もある。
  デザインと実装が食い違っていても、それだけで実装をデザインに合わせない

## ブランチ

- 作業を始める前に毎回 `git fetch --prune` し、作業するブランチを `git pull` で最新にする
- リモートで削除済み（`git branch -vv` で `gone`）のローカルブランチは `git branch -d` で削除する
- `release` は本番デプロイ用。作業ブランチは `main` から切り、基本PRは `main` 宛てに作成する
- ブランチ名は `<種別>/<内容>`（例: `fix/restrict-allowed-emails`）。種別はコミットと同じ

## コミット

分け方の判断基準・並べる順序は [docs/workflow/git-commit-principles.md](docs/workflow/git-commit-principles.md) にまとめている。
コミットする前に必ずこのファイルを読む。

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

- 件名は `<種別>(<対象>) <内容>` の形式で、72 文字以内（例: `fix(server) 許可したGoogleアカウントのみログインできるように制限する`）
  - `<対象>` は変更する `apps/` 配下のアプリ（`web` / `server`）。両方なら `web,server`、どちらでもなければ `(<対象>)` ごと省く
  - Issue の件名も同じ形式にする
- テンプレート（`.github/PULL_REQUEST_TEMPLATE.md`）の節をすべて埋める。当てはまらない節は `N/A` と書く
- 本文は箇条書きで、1 項目に 1 つの変更。各項目は体言止め（例: `- ログイン失敗時のリトライ処理を追加`）
- フォーマット修正・lockfile などの機械的な変更は 1 項目にまとめる
- 差分に無い変更・影響・確認内容を書かない
- 「関連 Issue」には、閉じる Issue を `Close #123`、関連するだけの Issue を `Refs #123` と書く。無ければ `N/A`
- Issue には種別に合うラベル（`enhancement` / `bug` / `refactor` / `documentation` / `ci` / `chore`）を付ける

## レビューの観点

- バグや不具合につながる実装
- セキュリティ上の懸念（Cloudflare Access を通らずに Web・API に届く経路・環境変数の扱い）
- 層の依存の向きを破っていないか（[docs/web/layers.md](docs/web/layers.md)）
- テストの不足

## worktree

作業用に worktree を作った場合、その作業が終わった時点で削除する。ブランチは残す。

## Storybook

- Story を書く際は `parameters.layout` に基本的に `"fullscreen"` を設定すること（レビュー指摘としては不要）
