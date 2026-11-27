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
- ブランチ名は `<種別>/<内容>`（例: `fix/restrict-allowed-emails`）。種別はコミットと同じ（[git-commit-principles.md](docs/workflow/git-commit-principles.md#種別)）

## コミット・PR

- コミットする前に [docs/workflow/git-commit-principles.md](docs/workflow/git-commit-principles.md) を読む
- PR・Issue を作る前に [docs/workflow/pull-request.md](docs/workflow/pull-request.md) を読む

## レビューの観点

- バグや不具合につながる実装
- セキュリティ上の懸念（Cloudflare Access を通らずに Web・API に届く経路・環境変数の扱い）
- 層の依存の向きを破っていないか（[docs/web/layers.md](docs/web/layers.md)）
- テストの不足

## worktree

作業用に worktree を作った場合、その作業が終わった時点で削除する。ブランチは残す。

## Storybook

- Story を書く際は `parameters.layout` に基本的に `"fullscreen"` を設定すること（レビュー指摘としては不要）
