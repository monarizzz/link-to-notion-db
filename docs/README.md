# ドキュメント

設計と開発の進め方をまとめた場所。作業ルールの要点は [AGENTS.md](../AGENTS.md) にある。

## product/ — プロダクト

- [design-doc.md](product/design-doc.md) … 誰の何をどうするか・背景・ユーザーストーリー・未決定事項

## web/ — Web（`apps/web`）

- [layers.md](web/layers.md) … 層の責務・依存の向き・ディレクトリの粒度
- [notion-db.md](web/notion-db.md) … Notion DB のプロパティとアプリ側の型の対応、Notion に依存している箇所

## server/ — API（`apps/server`）

- [architecture.md](server/architecture.md) … Web・API・DB の全体構成と決定事項
- [database.md](server/database.md) … D1 のテーブル設計
- [api.md](server/api.md) … 全エンドポイントに共通する日時・エラーレスポンスの形式

## workflow/ — 開発の進め方

- [git-commit-principles.md](workflow/git-commit-principles.md) … コミットの分け方と並べる順序
- [ci.md](workflow/ci.md) … CI のワークフローと動く条件・やること
